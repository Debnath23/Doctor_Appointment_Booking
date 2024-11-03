import React, { useEffect, useState } from "react";
import axiosInstance from "../config/axiosInstance";
import { toast } from "react-toastify";

function MyProfile() {
  const [userData, setUserData] = useState(null);
  const [canEdit, setCanEdit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get("/user", {
          withCredentials: true,
        });
        setUserData(response.data.user);
        setError(false);
      } catch (error) {
        setError(true);
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    if (!userData || canEdit === false) {
      fetchData();
    }
  }, [canEdit]);

  const updateUserDetails = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axiosInstance.patch("/user", userData, {
        withCredentials: true,
      });
      
      if (response.status === 200) {
        setUserData(response.data.updateUser);
        toast.success(response.data.message);
        setCanEdit(false);
        window.scrollTo(0, 0);
      } else {
        toast.error(response.data.message || "Something went wrong");
      }
    } catch (error) {
      toast.error(
        error.response?.data.message ||
          "An error occurred during updating user."
      );
    } finally {
      setLoading(false);
    }
  };

  if (error) return <p>Error loading profile information.</p>;
  if (loading) return <p>Loading...</p>;

  return (
    <div
      className="max-w-lg flex flex-col gap-2 text-sm">
      {/* {userData?.image && (
        <img className="w-36 rounded-full" src={userData.image} alt="Profile" />
      )} */}
      <div>
        {canEdit ? (
          <input
            className="bg-gray-50 text-3xl font-medium mt-4 outline-none"
            type="text"
            value={userData?.name || ""}
            onChange={(e) =>
              setUserData((prev) => ({ ...prev, name: e.target.value }))
            }
          />
        ) : (
          userData?.name && (
            <p className="font-medium text-3xl text-neutral-800 mt-4">
              {userData.name}
            </p>
          )
        )}

        <hr className="bg-zinc-400 h-[1px] border-none" />

        <div>
          {userData?.email && (
            <>
              <p className="text-neutral-600 underline mt-3">
                CONTACT INFORMATION
              </p>
              <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700">
                <p className="font-medium">Email id: </p>
                <p className="text-blue-600">{userData.email}</p>
              </div>
            </>
          )}
          <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700">
            <p className="font-medium">Phone: </p>
            {canEdit ? (
              <input
                className="outline-none"
                type="number"
                value={userData.phone || ""}
                onChange={(e) =>
                  setUserData((prev) => ({ ...prev, phone: e.target.value }))
                }
              />
            ) : (
              <p className="text-gray-500">(+91) {userData?.phone}</p>
            )}
          </div>

          <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700">
            <p className="font-medium">Address:</p>
            {canEdit ? (
              <input
                className="outline-none bg-gray-50"
                type="text"
                value={userData.address || ""}
                onChange={(e) =>
                  setUserData((prev) => ({
                    ...prev,
                    address: e.target.value,
                  }))
                }
              />
            ) : (
              <p className="text-gray-500">{userData?.address}</p>
            )}
          </div>
        </div>

        <div>
          <p className="text-neutral-600 underline mt-3">BASIC INFORMATION</p>
          <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700">
            <p className="font-medium">Gender:</p>
            {canEdit ? (
              <select
                className="outline-none bg-gray-50"
                onChange={(e) =>
                  setUserData((prev) => ({
                    ...prev,
                    gender: e.target.value,
                  }))
                }
                value={userData.gender || ""}
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Others">Others</option>
              </select>
            ) : (
              <p className="text-gray-500">{userData?.gender}</p>
            )}

            <p className="font-medium">DOB:</p>
            {canEdit ? (
              <input
                className="outline-none bg-gray-50"
                type="date"
                value={userData.dob || ""}
                onChange={(e) =>
                  setUserData((prev) => ({ ...prev, dob: e.target.value }))
                }
              />
            ) : (
              <p className="text-gray-500">{userData?.dob}</p>
            )}
          </div>
        </div>

        <div className="mt-6 flex justify-center">
          {canEdit ? (
            <button
              onClick={updateUserDetails}
              className="border border-primary px-8 py-2 rounded-full hover:bg-primary hover:text-white transition-all duration-500"
            >
              Save Information
            </button>
          ) : (
            <button
              type="button"
              className="border border-primary px-8 py-2 rounded-full hover:bg-primary hover:text-white transition-all duration-500"
              onClick={() => setCanEdit(true)}
            >
              Edit
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default MyProfile;
