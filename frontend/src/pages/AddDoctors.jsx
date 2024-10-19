import React, { useState } from "react";
import { toast } from "react-toastify";
import axiosInstance from "../config/axiosInstance";

function AddDoctors() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    degree: "",
    speciality: "",
    experience: "",
    fees: "",
    about: "",
    profileImg: null,
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      profileImg: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    const data = new FormData();
    for (const key in formData) {
      data.append(key, formData[key]);
    }

    try {
      const response = await axiosInstance.post(
        "/admin/register-doctor",
        data,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (response.status === 201) {
        toast.success(response?.data?.message);
        window.scrollTo(0, 0);
        setFormData({
          name: "",
          email: "",
          degree: "",
          speciality: "",
          experience: "",
          fees: "",
          about: "",
          profileImg: null,
          password: "",
        });
        document.querySelector('input[type="file"]').value = "";
        setLoading(false);
      } else {
        toast.error(response.message || "Something went wrong");
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      if (error.response) {
        toast.error(
          error.response.data.message ||
            "An error occurred during adding a doctor"
        );
      } else if (error.request) {
        toast.error("No response from the server. Please try again later.");
      } else {
        toast.error("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg mt-8"
    >
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">
        Add New Doctor
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Degree
          </label>
          <input
            type="text"
            name="degree"
            required
            value={formData.degree}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Speciality
          </label>
          <input
            type="text"
            name="speciality"
            required
            value={formData.speciality}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Experience
          </label>
          <input
            type="text"
            name="experience"
            required
            value={formData.experience}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Fees
          </label>
          <input
            type="text"
            name="fees"
            required
            value={formData.fees}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
          />
        </div>

        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-gray-700">
            About
          </label>
          <textarea
            rows={5}
            name="about"
            required
            value={formData.about}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Profile Image
          </label>
          <input
            type="file"
            name="profileImg"
            required
            onChange={handleFileChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            name="password"
            required
            value={formData.password}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
          />
        </div>
      </div>

      <button
        type="submit"
        className="mt-6 w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
      >
        {
          loading ? 'Loading...' : 'Submit'
        }
      </button>
    </form>
  );
}

export default AddDoctors;
