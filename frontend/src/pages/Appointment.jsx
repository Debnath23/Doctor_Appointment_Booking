import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";

function Appointment() {
  const { docId } = useParams();
  const { doctors, currencySymbol } = useContext(AppContext);
  const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  const [docInfo, setDocInfo] = useState(null);
  const [docSlots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState("");

  const fetchDocInfo = async () => {
    const docInfo = doctors.find((doc) => doc._id === docId);
    setDocInfo(docInfo);
  };

  // const getAvailableSlots = async () => {
  //   setDocSlots([]);

  //   let today = new Date();

  //   for (let i = 0; i < 7; i++) {
  //     let currentDate = new Date(today);
  //     currentDate.setDate(today.getDate() + i);

  //     let endTime = new Date();
  //     endTime.setDate(today.getDate() + i);
  //     endTime.setHours(21, 0, 0, 0);

  //     if (today.getDate() === currentDate.getDate()) {
  //       currentDate.setHours(
  //         currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10
  //       );
  //       currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
  //     } else {
  //       currentDate.setHours(10);
  //       currentDate.setMinutes(0);
  //     }

  //     let timeSlots = [];

  //     while (currentDate < endTime) {
  //       let formattedTime = currentDate.toLocaleTimeString([], {
  //         hour: "2-digit",
  //         minute: "2-digit",
  //       });

  //       timeSlots.push({
  //         datetime: new Date(currentDate),
  //         time: formattedTime,
  //       });

  //       currentDate.setMinutes(currentDate.getMinutes() + 30);
  //     }

  //     setDocSlots((prev) => [...prev, timeSlots]);
  //   }
  // };


  const getAvailableSlots = async () => {
    setDocSlots([]);  // Clear slots initially
  
    const today = new Date();  // Get current date and time
    const generateSlots = (startDate) => {
      const slots = [];
      const endTime = new Date(startDate);
      endTime.setHours(21, 0, 0, 0);  // Set end time to 9:00 PM
  
      while (startDate < endTime) {
        slots.push({
          datetime: new Date(startDate),
          time: startDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        });
        startDate.setMinutes(startDate.getMinutes() + 30);  // Increment by 30 minutes
      }
  
      return slots;
    };
  
    for (let i = 0; i < 7; i++) {
      const currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);  // Adjust for each day
  
      if (i === 0) {
        // For the current day, start from the next available hour or 10:00 AM
        currentDate.setHours(Math.max(currentDate.getHours() + 1, 10));
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
      } else {
        // For future days, start at 10:00 AM
        currentDate.setHours(10, 0, 0, 0);
      }
  
      const timeSlots = generateSlots(currentDate);  // Generate slots for the day
      setDocSlots((prev) => [...prev, timeSlots]);
    }
  };
  
  useEffect(() => {
    fetchDocInfo();
  }, [doctors, docId]);

  useEffect(() => {
    getAvailableSlots();
  }, [doctors]);

  useEffect(() => {
    console.log(docSlots);
  }, [doctors]);

  return (
    <div>
      <div className="flex flex-col sm:flex-row gap-4">
        <div>
          <img
            className="bg-primary w-full sm:max-w-72 rounded-lg"
            src={docInfo?.image}
            alt="img"
          />
        </div>
        <div className="flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0">
          <p className="flex item-center gap-2 text-2xl font-medium text-gray-900">
            {docInfo?.name}
            <img
              className="w-5"
              src="/src/assets/assets_frontend/verified_icon.svg"
              alt=""
            />
          </p>
          <div className="flex items-center gap-2 text-sm mt-1 text-gray-600">
            <p>
              {docInfo?.degree} - {docInfo?.speciality}
            </p>
            <button className="py-0.5 px-2 border text-xs rounded-full">
              {docInfo?.experience}
            </button>
          </div>
          <div>
            <p className="flex items-center gap-1 text-sm font-medium text-gray-900 mt-3">
              About{" "}
              <img src="/src/assets/assets_frontend/info_icon.svg" alt="" />
            </p>
            <p className="text-sm text-gray-500 max-w-[700px] mt-1">
              {docInfo?.about}
            </p>
          </div>
          <p className="text-gray-500 font-medium mt-4">
            Appointment fee:{" "}
            <span className="text-gray-600">
              {currencySymbol}
              {docInfo?.fees}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Appointment;
