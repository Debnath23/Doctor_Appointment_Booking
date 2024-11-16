import React, { useEffect, useState } from "react";
import axiosInstance from "../config/axiosInstance";
import { toast } from "react-toastify";
import Pagination from "../components/Pagination";

function AllUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 5;

  const fetchUsers = async (page) => {
    setLoading(true);
    setError(false);
    try {
      const response = await axiosInstance.get(
        `/admin/users-details?limit=${pageSize}&offset=${page}`
      );
      if (response.status === 200) {
        setUsers(response.data.users);
        setTotalPages(Math.ceil(response.data.totalCount / pageSize));
      }
    } catch (error) {
      setError(true);
      toast.error("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const offset = (currentPage - 1) * pageSize;
    fetchUsers(offset);
  }, [currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    scrollTo(0, 0);
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
        Error loading users.
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4">
      <p className="pb-3 mt-4 font-medium text-zinc-700 border-b text-lg">
        User List
      </p>

      <div>
        {users.map((user) => (
          <div
            key={user._id}
            className="grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 px-2 my-2 rounded border-b bg-gray-50 items-center justify-between"
          >
            {/* User Info Section */}
            <div className="flex items-center gap-4">
              <div>
                <img
                  src={
                    user.profileImg ||
                    "/src/assets/assets_frontend/profile_pic.jpeg"
                  }
                  alt="Profile"
                  className="w-20 h-20 bg-indigo-50 rounded-full object-cover"
                />
              </div>
              <div className="flex-col text-md text-zinc-600">
                <p className="text-neutral-800 font-semibold">{user.name}</p>
                <p className="text-sm">Email: {user.email}</p>
                <p className="text-sm">Phone: {user.phone || "null"}</p>
                <p className="text-sm">Gender: {user.gender || "null"}</p>
              </div>
            </div>

            {/* Button Section aligned to the right */}
            <div className="flex justify-end items-center">
              <button className="text-sm text-stone-500 py-2 px-4 border border-slate-300 rounded bg-slate-300 hover:bg-primary hover:text-white transition-all duration-300">
                Appointment Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-8">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}

export default AllUsers;
