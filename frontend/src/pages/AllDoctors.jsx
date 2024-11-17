import React, { useEffect, useState } from "react";
import axiosInstance from "../config/axiosInstance";
import { toast } from "react-toastify";
import Pagination from "../components/Pagination";

function AllDoctors() {
  const [doctors, setDoctors] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingDoctorId, setLoadingDoctorId] = useState(null);
  const [selectedDoctorId, setSelectedDoctorId] = useState(null);
  const [error, setError] = useState(false);
  const [appointmentError, setAppointmentError] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPageAppointment, setCurrentPageAppointment] = useState(1);
  const [totalPagesAppointment, setTotalPagesAppointment] = useState(1);

  const pageSize = 5;

  // Fetch doctors with pagination
  const fetchDoctors = async (page = 1) => {
    setLoading(true);
    setError(false);
    try {
      const offset = (page - 1) * pageSize;
      const { data, status } = await axiosInstance.get(
        `/admin/doctors-details?limit=${pageSize}&offset=${offset}`
      );
      if (status === 200) {
        setDoctors(data.doctors);
        setTotalPages(Math.ceil(data.totalCount / pageSize));
      }
    } catch {
      setError(true);
      toast.error("Failed to fetch doctors");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDoctors(currentPage);
  }, [currentPage]);

  // Fetch appointments for a specific doctor
  const fetchAppointments = async (doctorId, page = 1) => {
    setLoadingDoctorId(doctorId);
    setAppointmentError(false);
    try {
      const offset = (page - 1) * pageSize;
      const { data, status } = await axiosInstance.get(
        `/admin/doctor/appointment-details/${doctorId}?limit=${pageSize}&offset=${offset}`
      );
      if (status === 200) {
        setAppointments(data.appointments);
        setTotalPagesAppointment(Math.ceil(data.totalCount / pageSize));
      }
    } catch {
      setAppointmentError(true);
    } finally {
      setLoadingDoctorId(null);
    }
  };

  // Fetch appointments when doctor is selected
  useEffect(() => {
    if (selectedDoctorId) {
      fetchAppointments(selectedDoctorId, currentPageAppointment);
    }
  }, [selectedDoctorId, currentPageAppointment]);

  // Handle page changes
  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  const handlePageChangeAppointment = (page) => {
    setCurrentPageAppointment(page);
    window.scrollTo(0, 0);
  };

  const handleShowAppointments = (doctorId) => {
    setSelectedDoctorId(doctorId);
    setCurrentPageAppointment(1);
  };

  const closeAppointmentDetails = () => {
    setSelectedDoctorId(null);
    setAppointments([]);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        Oops! Unable to fetch doctor details.
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4">
      {!selectedDoctorId && (
        <p className="pb-3 mt-4 font-medium text-zinc-700 border-b text-lg">
          Doctor List
        </p>
      )}

      {/* Doctor List */}
      {!selectedDoctorId && doctors.length > 0 && (
        <div>
          {doctors.map((doctor) => (
            <div
              key={doctor._id}
              className="grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 px-2 my-2 rounded border-b bg-gray-50 items-center justify-between"
            >
              <div className="flex items-center gap-4">
                <img
                  src={
                    doctor.profileImg ||
                    "/src/assets/assets_frontend/profile_pic.jpeg"
                  }
                  alt="Profile"
                  className="w-20 h-20 bg-indigo-50 rounded-full object-cover"
                />
                <div className="flex-col text-md text-zinc-600">
                  <p className="text-neutral-800 font-semibold">
                    {doctor.name}
                  </p>
                  <p className="text-sm">Speciality: {doctor.speciality}</p>
                  <p className="text-sm">Degree: {doctor.degree}</p>
                  <p className="text-sm">Experience: {doctor.experience}</p>
                  <p className="text-sm">Fees: {`$ ${doctor.fees}`}</p>
                </div>
              </div>

              <button
                onClick={() => handleShowAppointments(doctor._id)}
                disabled={loadingDoctorId === doctor._id}
                className={`text-sm py-2 px-4 border rounded bg-slate-300 hover:bg-primary hover:text-white transition-all duration-300 ${
                  loadingDoctorId === doctor._id
                    ? "cursor-not-allowed bg-gray-300"
                    : ""
                }`}
              >
                {loadingDoctorId === doctor._id
                  ? "Loading..."
                  : "Appointment Details"}
              </button>
            </div>
          ))}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      )}

      {/* Appointments Details */}
      {selectedDoctorId && appointments.length > 0 && (
        <div className="container mx-auto px-4 my-6">
          <div className="flex justify-between border-b pb-3">
            <p className="font-medium text-zinc-700 text-lg">Appointments</p>
            <button
              onClick={closeAppointmentDetails}
              className="text-sm bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition duration-300"
            >
              Close
            </button>
          </div>

          {appointments.map((appointment) => (
            <div
              key={appointment._id}
              className="grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 px-2 my-2 rounded border-b bg-gray-50 items-center justify-between"
            >
              <div className="flex items-center gap-4">
                <img
                  src={appointment.userId?.profileImg || "/src/assets/assets_frontend/profile_pic.jpeg"}
                  alt="Patient"
                  className="w-20 h-20 bg-indigo-50 rounded-full object-cover"
                />
                <div className="flex-col text-md text-zinc-600">
                  <p className="text-neutral-800 font-semibold">
                    {appointment.userId?.name}
                  </p>
                  <p className="text-sm">
                    {appointment.userId?.email}
                  </p>
                  <p className="text-sm">
                    Date:{" "}
                    {new Date(appointment.appointmentDate).toLocaleDateString()}
                  </p>
                  <p className="text-sm">Time: {appointment.appointmentTime}</p>
                  
                </div>
              </div>
            </div>
          ))}
          <Pagination
            currentPage={currentPageAppointment}
            totalPages={totalPagesAppointment}
            onPageChange={handlePageChangeAppointment}
          />
        </div>
      )}

      {/* Display message if no appointments are found */}
      {selectedDoctorId && appointments.length === 0 && (
        <div className="flex justify-center items-center h-screen relative">
          <button
            onClick={closeAppointmentDetails}
            className="absolute top-5 left-5 text-sm bg-slate-500 text-white py-2 px-4 rounded-md hover:bg-slate-600 transition duration-300"
          >
            {"<"}
          </button>
          <div className="text-center text-xl font-semibold text-gray-600 mt-4">
            No appointments found.
          </div>
        </div>
      )}

      {selectedDoctorId && appointmentError && (
        <div className="flex justify-center items-center h-screen relative">
          <button
            onClick={closeAppointmentDetails}
            className="absolute top-5 left-5 text-sm bg-slate-500 text-white py-2 px-4 rounded-md hover:bg-slate-600 transition duration-300"
          >
            {"<"}
          </button>
          <div className="text-center text-xl font-semibold text-gray-600 mt-4">
            Oops! Unable to fetch appointment details.
          </div>
        </div>
      )}
    </div>
  );
}

export default AllDoctors;
