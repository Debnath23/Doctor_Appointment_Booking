import React, { useEffect, useState } from "react";
import axiosInstance from '../config/axiosInstance'

function MyAppointments() {
  const [appointments, setAppointments] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchAppointmentDetails = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get("/user/appointment-details");
        console.log(response);
        
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

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Opps! Unable to fetch appointment details.</p>
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
            className="grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b"
          >
            <div>
              <img src={item?.doctorId.profileImg} className="w-32 bg-indigo-50" />
            </div>
            <div className="flex-1 text-sm text-zinc-600">
              <p className="text-neutral-800 font-semibold">{item?.doctorId.name}</p>
              <p>{item?.doctorId.speciality}</p>
              {/* <p className="text-zinc-700 font-medium mt-1">Address:</p> */}
              {/* <p className="text-xs">{item?.address.line1}</p>
              <p className="text-xs">{item?.address.line2}</p> */}
              <p className="text-xs mt-1">
                <span className="text-sm text-neutral-700 font-medium">
                  Date & Time:
                </span>{" "}
                {item.appointmentDate} | {item.appointmentTime}
              </p>
            </div>
            <div></div>
            <div className="flex flex-col ga-2 justify-end gap-y-2">
              <button className="text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-primary hover:text-white transition-all duration-300">
                Pay Online
              </button>
              <button className="text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-red-600 hover:text-white transition-all duration-300">
                Cancel Appointment
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyAppointments;
