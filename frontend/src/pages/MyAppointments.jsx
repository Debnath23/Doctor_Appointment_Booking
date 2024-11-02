import React, { useEffect, useState } from "react";
import axiosInstance from "../config/axiosInstance";
import { toast } from "react-toastify";

function MyAppointments() {
  const [appointments, setAppointments] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [loadingCancelation, setLoadingCancelation] = useState(false);

  useEffect(() => {
    const fetchAppointmentDetails = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get("/user/appointment-details");
        if (response.status === 200) {
          setAppointments(response.data.appointments);
          setLoading(false);
          setError(false);
        }
      } catch (error) {
        setLoading(false);
        setError(true);
      }
    };

    fetchAppointmentDetails();
  }, []);

  const handleCancelAppointment = async (appointmentId, doctorId) => {
    if (!appointmentId || !doctorId) {
      toast.error(
        "Unable to cancel: Missing appointment or doctor information."
      );
      return;
    }

    setLoadingCancelation(true);

    try {
      const response = await axiosInstance.delete(
        `/user/cancel-appointment?appointment_id=${appointmentId}&doctor_id=${doctorId}`,
        { withCredentials: true }
      );

      if (response.status === 200) {
        toast.success(response.data.message);
        setAppointments((prev) =>
          prev.filter((item) => item._id !== appointmentId)
        );
      } else {
        toast.error(response.data.message || "Something went wrong");
      }
    } catch (error) {
      toast.error(
        error.response?.data.message ||
          "An error occurred during appointment cancelation."
      );
    } finally {
      setLoadingCancelation(false);
    }
  };

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Oops! Unable to fetch appointment details.</p>
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
      <p className="pb-3 mt-12 font-medium text-zinc-700 border-b">
        My Appointments
      </p>
      <div>
        {appointments?.map((item) => (
          <div
            key={item._id}
            className={`grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 px-2 my-2 rounded border-b 
              ${
                Date.now() > new Date(item.appointmentDate).getTime()
                  ? "bg-gray-50"
                  : "bg-blue-50"
              }`}
          >
            <div>
              <img
                src={item?.doctorId.profileImg}
                className="w-32 bg-indigo-50 rounded"
              />
            </div>
            <div className="flex-1 text-sm text-zinc-600">
              <p className="text-neutral-800 font-semibold">
                {item?.doctorId.name}
              </p>
              <p>{item?.doctorId.speciality}</p>
              <p className="text-xs mt-1">
                <span className="text-sm text-neutral-700 font-medium">
                  Date & Time:
                </span>{" "}
                {item.appointmentDate.split("T")[0]} | {item.appointmentTime}
              </p>
            </div>
            <div className="flex md:flex-col md:gap-y-2 justify-end gap-x-2">
              <button className="text-sm text-stone-500 py-2 border border-slate-300 rounded hover:bg-primary hover:text-white transition-all duration-300">
                Pay Online
              </button>
              <button
                onClick={() =>
                  handleCancelAppointment(item._id, item.doctorId._id)
                }
                className="text-sm text-stone-500 p-2 border border-slate-300 rounded hover:bg-red-600 hover:text-white transition-all duration-300"
              >
                {loadingCancelation ? "Loading..." : "Cancel Appointment"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyAppointments;
