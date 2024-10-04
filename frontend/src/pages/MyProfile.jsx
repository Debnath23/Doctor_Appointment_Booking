import React, { useState } from "react";

function MyProfile() {
  const [userData, setUserData] = useState({
    name: "Debnath Mahapatra",
    image: "/src/assets/assets_frontend/profile_pic.jpeg",
    email: "debnathmahapatra740@gmail.com",
    phone: 1234567890,
    address: "Kolkata, India, 700001",
    gender: "male",
    dob: "2003-02-12",
  });
  const [canEdit, setCanEdit] = useState(false);

  return (
    <div className="max-w-lg flex flex-col gap-2 text-sm">
      <img className="w-36 rounded-full" src={userData?.image} alt="" />
      <div>
        {canEdit ? (
          <input
            className="bg-gray-50 text-3xl font-medium max-w-80 mt-4 outline-none"
            type="text"
            value={userData?.name}
            onChange={(e) =>
              setUserData((prev) => ({ ...prev, name: e.target.value }))
            }
          />
        ) : (
          <p className="font-medium text-3xl text-neutral-800 mt-4">
            {userData?.name}
          </p>
        )}

        <hr className="bg-zinc-400 h-[1px] border-none" />
        <div>
          <p className="text-neutral-600 underline mt-3">CONTACT INFORMATION</p>
          <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700">
            <p className="font-medium">Email id: </p>
            <p className="text-blue-600">{userData?.email}</p>
            <p className="font-medium">Phone: </p>
            {canEdit ? (
              <input
                className="outline-none"
                type="number"
                value={userData?.phone}
                onChange={(e) =>
                  setUserData((prev) => ({ ...prev, phone: e.target.value }))
                }
              />
            ) : (
              <p className="text-gray-500">(+91) {userData?.phone}</p>
            )}
            <p className="font-medium">Address:</p>
            {canEdit ? (
              <input
                className="outline-none bg-gray-50"
                type="text"
                value={userData?.address}
                onChange={(e) =>
                  setUserData((prev) => ({ ...prev, address: e.target.value }))
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
                  setUserData((prev) => ({ ...prev, gender: e.target.value }))
                }
                value={userData?.gender}
              >
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
                value={userData?.dob}
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
              className="border border-primary px-8 py-2 rounded-full hover:bg-primary hover:text-white transition-all duration-500"
              onClick={() => setCanEdit(false)}
            >
              Save Information
            </button>
          ) : (
            <button
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
