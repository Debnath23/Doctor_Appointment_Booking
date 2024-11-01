import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../config/axiosInstance";
import axios from "axios";

function Doctors() {
  const [filterDoc, setFilterDoc] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [doctors, setDoctors] = useState([]);
  const [searchDoctor, setSearchDoctor] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const { speciality } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const searchDoctorsDetails = async () => {
      try {
        if (!searchDoctor) {
          const allDoctorsResponse = await axiosInstance.get(
            "/doctor/all-doctors-details"
          );
          if (allDoctorsResponse.status === 200) {
            setDoctors(allDoctorsResponse.data.doctors);
          }
        } else {
          const response = await axiosInstance.get(
            `/doctor/search?name=${searchDoctor}`
          );
          if (response.status === 200) {
            setDoctors(response.data.doctors);
          }
        }
        setError(false);
      } catch (error) {
        setError(true);
      }
    };

    searchDoctorsDetails();
  }, [searchDoctor]);

  useEffect(() => {
    let cancelTokenSource;

    const debounceSearch = setTimeout(() => {
      cancelTokenSource = axiosInstance.CancelToken.source();

      const searchDoctorsDetails = async () => {
        if (!searchDoctor) return;

        try {
          setLoading(true);
          const response = await axiosInstance.get(`/doctor/search?name=${searchDoctor}`, {
            cancelToken: cancelTokenSource.token
          });

          if (response.status === 200) {
            setDoctors(response.data.doctors);
            setError(false);
          }
        } catch (error) {
          if (axios.isCancel(error)) {
            console.log("Request canceled", error.message);
          } else {
            setError(true);
          }
        }
      }

      searchDoctorsDetails();

    }, 500);

    return () => {
      clearTimeout(debounceSearch);
      if (cancelTokenSource) {
        cancelTokenSource.cancel("Canceling previous request due to new input.")
      }
    }
  }, [searchDoctor])


  const applyFilter = () => {
    if (speciality) {
      setFilterDoc(
        doctors?.filter(
          (doctor) =>
            doctor.speciality.trim().toLowerCase() ===
            speciality.trim().toLowerCase()
        )
      );
    } else {
      setFilterDoc(doctors);
    }
  };

  useEffect(() => {
    if (doctors) {
      applyFilter();
    }
  }, [doctors, speciality]);

  useEffect(() => {
    if (doctors) {
      if (!speciality) {
        setFilterDoc(doctors);
      } else {
        applyFilter();
      }
    }
  }, [doctors, speciality]);

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Opps! Unable to fetch doctors information.</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between">
        <p className="text-gray-600">Browse through the doctors specialist.</p>
        <div>
          <input
            onChange={(e) => setSearchDoctor(e.target.value)}
            type="search"
            placeholder="Search Doctors"
            className="border px-2 py-1 rounded-lg outline-none border-slate-400"
          />
        </div>
      </div>
      <div className="flex flex-col sm:flex-row items-start gap-5 mt-5">
        <button
          className={`py-1 px-3 border rounded text-sm transition-all sm:hidden ${
            showFilters ? "bg-primary text-white" : ""
          }`}
          onClick={() => setShowFilters((prev) => !prev)}
        >
          Filters
        </button>
        <div
          className={`flex flex-col gap-4 text-sm text-gray-600 ${
            showFilters ? "flex" : "hidden sm:flex"
          }`}
        >
          <p
            onClick={() =>
              speciality === "General physician"
                ? navigate("/doctors")
                : navigate("/doctors/General physician")
            }
            className={`w-[94vw] sm:w-auto py-1.5 pr-16 pl-2 border border-gray-300 rounded transition-all cursor-pointer ${
              speciality === "General physician"
                ? "bg-indigo-100 text-black"
                : ""
            }`}
          >
            General physician
          </p>
          <p
            onClick={() =>
              speciality === "Gynecologist"
                ? navigate("/doctors")
                : navigate("/doctors/Gynecologist")
            }
            className={`w-[94vw] sm:w-auto py-1.5 pr-16 pl-2 border border-gray-300 rounded transition-all cursor-pointer ${
              speciality === "Gynecologist" ? "bg-indigo-100 text-black" : ""
            }`}
          >
            Gynecologist
          </p>
          <p
            onClick={() =>
              speciality === "Dermatologist"
                ? navigate("/doctors")
                : navigate("/doctors/Dermatologist")
            }
            className={`w-[94vw] sm:w-auto py-1.5 pr-16 pl-2 border border-gray-300 rounded transition-all cursor-pointer ${
              speciality === "Dermatologist" ? "bg-indigo-100 text-black" : ""
            }`}
          >
            Dermatologist
          </p>
          <p
            onClick={() =>
              speciality === "Pediatricians"
                ? navigate("/doctors")
                : navigate("/doctors/Pediatricians")
            }
            className={`w-[94vw] sm:w-auto py-1.5 pr-16 pl-2 border border-gray-300 rounded transition-all cursor-pointer ${
              speciality === "Pediatricians" ? "bg-indigo-100 text-black" : ""
            }`}
          >
            Pediatricians
          </p>
          <p
            onClick={() =>
              speciality === "Neurologist"
                ? navigate("/doctors")
                : navigate("/doctors/Neurologist")
            }
            className={`w-[94vw] sm:w-auto py-1.5 pr-16 pl-2 border border-gray-300 rounded transition-all cursor-pointer ${
              speciality === "Neurologist" ? "bg-indigo-100 text-black" : ""
            }`}
          >
            Neurologist
          </p>
          <p
            onClick={() =>
              speciality === "Gastroenterologist"
                ? navigate("/doctors")
                : navigate("/doctors/Gastroenterologist")
            }
            className={`w-[94vw] sm:w-auto py-1.5 pr-16 pl-2 border border-gray-300 rounded transition-all cursor-pointer ${
              speciality === "Gastroenterologist"
                ? "bg-indigo-100 text-black"
                : ""
            }`}
          >
            Gastroenterologist
          </p>
        </div>
        <div className="w-full grid grid-cols-auto gap-4 pt-5 gap-y-6 px-3 sm:px-0">
          {filterDoc?.length === 0 ? (
            <div className="flex justify-center">
              <p>No doctors found in this category.</p>
            </div>
          ) : (
            filterDoc?.map((item) => (
              <div
                key={item._id}
                onClick={() => navigate(`/appointment/${item._id}`)}
                className="border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500"
              >
                <img src={item.profileImg} alt="img" className="bg-blue-50" />
                <div className="p-4">
                  <div className="flex items-center gap-2 text-sm text-center text-green-500">
                    <p className="w-2 h-2 bg-green-500 rounded-full"></p>
                    <p>Available</p>
                  </div>
                  <p className="text-gray-900 text-lg font-medium">
                    {item.name}
                  </p>
                  <p className="text-gray-600 text-sm">{item.speciality}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Doctors;
