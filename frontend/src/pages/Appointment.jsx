import React, { useContext, useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import RelatedDoctors from "../components/RelatedDoctors";
import axiosInstance from "../config/axiosInstance";
import { toast } from "react-toastify";
import { debounce } from "lodash";

function Appointment() {
  const { docId } = useParams();
  const { currencySymbol } = useContext(AppContext);
  const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  const [docInfo, setDocInfo] = useState(null);
  const [docSlots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [submitButtonLoading, setSubmitButtonLoading] = useState(false);
  const [appointmentInfo, setAppointmentInfo] = useState({
    doctorId: docId,
    appointmentDate: "",
    appointmentTime: "",
  });

  const fetchDocInfo = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(`/doctor/${docId}`);
      if (response.status === 200) {
        setDocInfo(response.data.user);
      }
    } catch (error) {
      console.error("Error fetching doctor info:", error);
    } finally {
      setLoading(false);
    }
  };

  const getAvailableSlots = useCallback(
    debounce(async () => {
      setDocSlots([]);
      let today = new Date();

      for (let i = 0; i < 7; i++) {
        let currentDate = new Date(today);
        currentDate.setDate(today.getDate() + i);

        let endTime = new Date();
        endTime.setDate(today.getDate() + i);
        endTime.setHours(21, 0, 0, 0);

        if (i === 0 && today.getHours() >= 21) continue;

        if (today.getDate() === currentDate.getDate()) {
          currentDate.setHours(
            currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10
          );
          currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
        } else {
          currentDate.setHours(10);
          currentDate.setMinutes(0);
        }

        let timeSlots = [];
        while (currentDate < endTime) {
          let formattedTime = currentDate.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          });
          timeSlots.push({
            datetime: new Date(currentDate),
            time: formattedTime,
          });
          currentDate.setMinutes(currentDate.getMinutes() + 30);
        }
        setDocSlots((prev) => [...prev, timeSlots]);
      }
    }, 300),
    []
  );

  // Handler to update appointment date based on selected slot index
  const handleSlotDateSelect = (index) => {
    setSlotIndex(index);
    const selectedDate = docSlots[index][0]?.datetime;
    if (selectedDate) {
      setAppointmentInfo((prev) => ({
        ...prev,
        appointmentDate: selectedDate.toISOString().split("T")[0],
      }));
    }
  };

  // Handler to update appointment time based on selected slot time
  const handleSlotTimeSelect = (time) => {
    setSlotTime(time);
    setAppointmentInfo((prev) => ({
      ...prev,
      appointmentTime: time,
    }));
  };

  const bookAppointment = async (e) => {
    e.preventDefault();
    setSubmitButtonLoading(true);

    console.log(appointmentInfo);

    try {
      const response = await axiosInstance.post(
        `/user/book-appointment`,
        appointmentInfo,
        { withCredentials: true }
      );

      if (response.status === 200) {
        toast.success(response.data.message);
        window.scrollTo(0, 0);
        setAppointmentInfo({ appointmentDate: "", appointmentTime: "" });
      } else {
        toast.error(response.data.message || "Something went wrong");
      }
    } catch (error) {
      toast.error(
        error.response?.data.message ||
          "An error occurred during appointment booking."
      );
    } finally {
      setSubmitButtonLoading(false);
    }
  };

  useEffect(() => {
    if (docId) {
      fetchDocInfo();
      getAvailableSlots();
    }
  }, [docId, getAvailableSlots]);

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Oops! Unable to fetch doctor information.</p>
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
      <div className="flex flex-col sm:flex-row gap-4">
        <div>
          <img
            className="bg-primary w-full sm:max-w-72 rounded-lg"
            src={docInfo?.profileImg}
            alt="Doctor profile"
          />
        </div>
        <div className="flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0">
          <p className="flex item-center gap-2 text-2xl font-medium text-gray-900">
            {docInfo?.name}
            <img
              className="w-5"
              src="/src/assets/assets_frontend/verified_icon.svg"
              alt="Verified icon"
            />
          </p>
          <p className="flex items-center gap-2 text-sm mt-1 text-gray-600">
            {docInfo?.degree} - {docInfo?.speciality}
          </p>
          <p className="text-gray-500 font-medium mt-4">
            Appointment fee: {currencySymbol}
            {docInfo?.fees}
          </p>
          <p className="text-gray-500 font-medium mt-4">{docInfo?.about}</p>
        </div>
      </div>

      <div
        onSubmit={bookAppointment}
        className="sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-700"
      >
        <p>Booking slots</p>
        <div className="flex gap-3 items-center w-full overflow-x-scroll mt-4">
          {docSlots.map((item, index) => (
            <div
              key={index}
              onClick={() => handleSlotDateSelect(index)}
              className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${
                slotIndex === index
                  ? "bg-primary text-white border"
                  : "border border-gray-500"
              }`}
            >
              <p>{item[0] && daysOfWeek[item[0].datetime.getDay()]}</p>
              <p>{item[0] && item[0].datetime.getDate()}</p>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-3 w-full overflow-x-scroll mt-4">
          {docSlots[slotIndex]?.map((item, index) => (
            <p
              onClick={() => handleSlotTimeSelect(item.time)}
              key={index}
              className={`text-sm font-light mb-3 flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${
                item.time === slotTime
                  ? "bg-primary text-white"
                  : "text-gray-400 border border-gray-500"
              }`}
            >
              {item.time.toLowerCase()}
            </p>
          ))}
        </div>
        <button
          onClick={bookAppointment}
          type="submit"
          className="bg-primary text-white text-sm font-light px-14 py-3 rounded-full my-6 w-[250px] cursor-pointer hover:bg-green-500"
        >
          {submitButtonLoading ? "Loading..." : "Book An Appointment"}
        </button>
      </div>
      <RelatedDoctors docId={docId} speciality={docInfo?.speciality} />
    </div>
  );
}

export default Appointment;
