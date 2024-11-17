import React, { useEffect, useState } from "react";
import axiosInstance from "../config/axiosInstance";
import { toast } from "react-toastify";
import Pagination from "../components/Pagination";

function AllUsers() {
  const [users, setUsers] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingUserId, setLoadingUserId] = useState(null);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [error, setError] = useState(false);
  const [appointmentError, setAppointmentError] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPageAppointment, setCurrentPageAppointment] = useState(1);
  const [totalPagesAppointment, setTotalPagesAppointment] = useState(1);

  const pageSize = 5;

  // Fetch users with pagination
  const fetchUsers = async (page = 1) => {
    setLoading(true);
    setError(false);
    try {
      const offset = (page - 1) * pageSize;
      const { data, status } = await axiosInstance.get(
        `/admin/users-details?limit=${pageSize}&offset=${offset}`
      );
      if (status === 200) {
        setUsers(data.users);
        setTotalPages(Math.ceil(data.totalCount / pageSize));
      }
    } catch {
      setError(true);
      toast.error("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers(currentPage);
  }, [currentPage]);

  // Fetch appointments for a specific user
  const fetchAppointments = async (userId, page = 1) => {
    setLoadingUserId(userId);
    setAppointmentError(false);
    try {
      const offset = (page - 1) * pageSize;
      const { data, status } = await axiosInstance.get(
        `/admin/user/appointment-details/${userId}?limit=${pageSize}&offset=${offset}`
      );
      if (status === 200) {
        setAppointments(data.appointments);
        setTotalPagesAppointment(Math.ceil(data.totalCount / pageSize));
      }
    } catch {
      setAppointmentError(true);
    } finally {
      setLoadingUserId(null);
    }
  };

  // Fetch appointments when user is selected
  useEffect(() => {
    if (selectedUserId) {
      fetchAppointments(selectedUserId, currentPageAppointment);
    }
  }, [selectedUserId, currentPageAppointment]);

  // Handle page changes
  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  const handlePageChangeAppointment = (page) => {
    setCurrentPageAppointment(page);
    window.scrollTo(0, 0);
  };

  const handleShowAppointments = (userId) => {
    setSelectedUserId(userId);
    setCurrentPageAppointment(1);
  };

  const closeAppointmentDetails = () => {
    setSelectedUserId(null);
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
        Oops! Unable to fetch user details.
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4">
      {!selectedUserId && (
        <p className="pb-3 mt-4 font-medium text-zinc-700 border-b text-lg">
          User List
        </p>
      )}

      {/* User List */}
      {!selectedUserId && users.length > 0 && (
        <div>
          {users.map((user) => (
            <div
              key={user._id}
              className="grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 px-2 my-2 rounded border-b bg-gray-50 items-center justify-between"
            >
              <div className="flex items-center gap-4">
                <img
                  src={
                    user.profileImg ||
                    "/src/assets/assets_frontend/profile_pic.jpeg"
                  }
                  alt="Profile"
                  className="w-20 h-20 bg-indigo-50 rounded-full object-cover"
                />
                <div className="flex-col text-md text-zinc-600">
                  <p className="text-neutral-800 font-semibold">{user.name}</p>
                  <p className="text-sm">Email: {user.email}</p>
                  <p className="text-sm">Phone: {user.phone || "null"}</p>
                  <p className="text-sm">Gender: {user.gender || "null"}</p>
                </div>
              </div>

              <button
                onClick={() => handleShowAppointments(user._id)}
                disabled={loadingUserId === user._id}
                className={`text-sm py-2 px-4 border rounded bg-slate-300 hover:bg-primary hover:text-white transition-all duration-300 ${
                  loadingUserId === user._id
                    ? "cursor-not-allowed bg-gray-300"
                    : ""
                }`}
              >
                {loadingUserId === user._id
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
      {selectedUserId && appointments.length > 0 && (
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
                  src={appointment.doctorId.profileImg}
                  alt="Doctor"
                  className="w-20 h-20 bg-indigo-50 rounded-full object-cover"
                />
                <div className="flex-col text-md text-zinc-600">
                  <p className="text-neutral-800 font-semibold">
                    {appointment.doctorId.name}
                  </p>
                  <p className="text-sm">
                    Speciality: {appointment.doctorId.speciality}
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
      {selectedUserId && appointments.length === 0 && (
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

      {selectedUserId && appointmentError && (
        <div className="flex justify-center items-center h-screen relative">
          <button
            onClick={closeAppointmentDetails}
            className="absolute top-5 left-5 text-sm bg-slate-500 text-white py-2 px-4 rounded-md hover:bg-slate-600 transition duration-300"
          >
            {"<"}
          </button>
          <div className="text-center text-xl font-semibold text-gray-600 mt-4">
            Opps! unable to fetch appointment details.
          </div>
        </div>
      )}
    </div>
  );
}

export default AllUsers;
