import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import axiosInstance from "../config/axiosInstance";

function AddDoctors() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const formData = new FormData();
  
    for (const key in data) {
      formData.append(key, data[key]);
    }
  
    try {
      const response = await axiosInstance.post(
        "/admin/register-doctor",
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
  
      console.log(response);
  
      if (response.status === 201) {
        toast.success(response?.data?.message);
        window.scrollTo(0, 0);
      } else {
        toast.error(response.message || "Something went wrong");
      }
    } catch (error) {
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
      onSubmit={handleSubmit(onSubmit)}
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
            {...register("name", { required: "Name is required" })}
            className={`mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary ${
              errors.name ? "border-red-500" : ""
            }`}
          />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            {...register("email", { required: "Email is required" })}
            className={`mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary ${
              errors.email ? "border-red-500" : ""
            }`}
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Degree
          </label>
          <input
            type="text"
            {...register("degree", { required: "Degree is required" })}
            className={`mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary ${
              errors.degree ? "border-red-500" : ""
            }`}
          />
          {errors.degree && (
            <p className="text-red-500 text-sm">{errors.degree.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Speciality
          </label>
          <input
            type="text"
            {...register("speciality", { required: "Speciality is required" })}
            className={`mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary ${
              errors.speciality ? "border-red-500" : ""
            }`}
          />
          {errors.speciality && (
            <p className="text-red-500 text-sm">{errors.speciality.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Experience
          </label>
          <input
            type="text"
            {...register("experience", { required: "Experience is required" })}
            className={`mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary ${
              errors.experience ? "border-red-500" : ""
            }`}
          />
          {errors.experience && (
            <p className="text-red-500 text-sm">{errors.experience.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Fees
          </label>
          <input
            type="text"
            {...register("fees", { required: "Fees are required" })}
            className={`mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary ${
              errors.fees ? "border-red-500" : ""
            }`}
          />
          {errors.fees && (
            <p className="text-red-500 text-sm">{errors.fees.message}</p>
          )}
        </div>

        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-gray-700">
            About
          </label>
          <textarea
            rows={5}
            {...register("about", { required: "About is required" })}
            className={`mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary ${
              errors.about ? "border-red-500" : ""
            }`}
          />
          {errors.about && (
            <p className="text-red-500 text-sm">{errors.about.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Profile Image
          </label>
          <input
            type="file"
            {...register("profileImg", {
              required: "Profile image is required",
            })}
            // onChange={(e) => {
            //     const file = e.target.files[0];
            //     console.log(file);

            //     if (file) {
            //       setValue("profileImg", file);
            //     }
            //   }}
            className={`mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary ${
              errors.profileImg ? "border-red-500" : ""
            }`}
          />
          {errors.profileImg && (
            <p className="text-red-500 text-sm">{errors.profileImg.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            {...register("password", { required: "Password is required" })}
            className={`mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary ${
              errors.password ? "border-red-500" : ""
            }`}
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
        </div>
      </div>

      <button
        type="submit"
        className="mt-6 w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
      >
        Submit
      </button>
    </form>
  );
}

export default AddDoctors;
