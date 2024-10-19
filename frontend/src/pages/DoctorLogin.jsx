import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axiosInstance from "../config/axiosInstance";

function DoctorLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    const requestBody ={ email, password };

    try {
      const response = await axiosInstance.post('/doctor/login', requestBody);

      if (response.status === 201) {
        const token = response.data.accessToken;

        if (token) {
          localStorage.setItem("isLoggedIn", "true");
          window.dispatchEvent(new Event('loginStatusChanged'));
          toast.success(response?.data?.message || `Login successful!`);
          navigate("/my-appointments");
          window.scrollTo(0, 0);
        }
      } else {
        toast.error(response.message || "Something went wrong");
      }
    } catch (error) {
      if (error.response) {
        toast.error(
          error.response.data.message ||
            "An error occurred during authentication"
        );
      } else if (error.request) {
        toast.error("No response from the server. Please try again later.");
      } else {
        toast.error("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className="min-h-[80vh] flex items-center">
      <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-[320px] sm:min-w-96 border rounded-xl text-zinc-600 text-sm shadow-lg">
        <p className="text-2xl font-semibold">
          Login
        </p>
        <p>
          Please log in to get an
          appointment details
        </p>

        <div className="w-full">
          <p>Email</p>
          <input
            className="border border-zinc-300 rounded w-full p-2 mt-1 outline-none"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
          />
        </div>

        <div className="w-full">
          <p>Password</p>
          <input
            className="border border-zinc-300 rounded w-full p-2 mt-1 outline-none"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
          />
        </div>

        <button
          type="submit"
          className="bg-primary text-white w-full py-2 rounded-md text-base"
        >
          Login
        </button>
      </div>
    </form>
  );
}

export default DoctorLogin;