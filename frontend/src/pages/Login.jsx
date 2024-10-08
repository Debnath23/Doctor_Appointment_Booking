// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";

// function Login() {
//   const [state, setState] = useState("Sign Up");

//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const navigate = useNavigate()

//   const onSubmitHandler = async (event) => {
//     event.preventDefault();
//     navigate('/');
//     screenTop(0,0)
//   };

//   return (
//     <form onSubmit={onSubmitHandler} className="min-h-[80vh] flex items-center">
//       <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-[320px] sm:min-w-96 border rounded-xl text-zinc-600 text-sm shadow-lg">
//         <p className="text-2xl font-semibold">
//           {state === "Sign Up" ? "Create Account" : "Login"}
//         </p>
//         <p>
//           Please {state === "Sign Up" ? "sign up" : "log in"} to book
//           appointment
//         </p>
//         {state === "Sign Up" && (
//           <div className="w-full">
//             <p>Full Name</p>
//             <input
//               className="border border-zinc-300 rounded w-full p-2 mt-1 outline-none"
//               type="text"
//               onChange={(e) => setName(e.target.value)}
//               value={name}
//               required
//             />
//           </div>
//         )}
//         <div className="w-full">
//           <p>Email</p>
//           <input
//             className="border border-zinc-300 rounded w-full p-2 mt-1 outline-none"
//             type="email"
//             onChange={(e) => setEmail(e.target.value)}
//             value={email}
//             required
//           />
//         </div>
//         <div className="w-full">
//           <p>Password</p>
//           <input
//             className="border border-zinc-300 rounded w-full p-2 mt-1 outline-none"
//             type="password"
//             onChange={(e) => setPassword(e.target.value)}
//             value={password}
//             required
//           />
//         </div>
//         <button type="submit" className="bg-primary text-white w-full py-2 rounded-md text-base">
//           {state === "Sign Up" ? "Create Account" : "Login"}
//         </button>
//         {state === "Sign Up" ? (
//           <p>
//             Already have an account?{" "}
//             <span
//               onClick={() => setState("Login")}
//               className="text-primary underline cursor-pointer"
//             >
//               login here
//             </span>
//           </p>
//         ) : (
//           <p>
//             Create an new account?{" "}
//             <span
//               onClick={() => setState("Sign Up")}
//               className="text-primary underline cursor-pointer"
//             >
//               click here
//             </span>
//           </p>
//         )}
//       </div>
//     </form>
//   );
// }

// export default Login;


import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import axiosInstance from "../config/axiosInstance";

function Login() {
  const [state, setState] = useState("Sign Up");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      const requestBody = state === "Sign Up" ? { name, email, password } : { email, password };
      const url = `/auth/${state === "Sign Up" ? "signup" : "login"}`;

      const response = await axiosInstance.post(url, requestBody);

      if (response.data.status === 200) {
        toast.success(response.data.message || `${state} successful!`);
        navigate("/");
        window.scrollTo(0, 0);
      } else {
        toast.error(response.data.message || "Something went wrong");
        console.log(response);
      }
    } catch (error) {
      console.error("Error during authentication:", error.response || error.message);
      toast.error(error.message);
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className="min-h-[80vh] flex items-center">
      <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-[320px] sm:min-w-96 border rounded-xl text-zinc-600 text-sm shadow-lg">
        <p className="text-2xl font-semibold">
          {state === "Sign Up" ? "Create Account" : "Login"}
        </p>
        <p>
          Please {state === "Sign Up" ? "sign up" : "log in"} to book an appointment
        </p>

        {state === "Sign Up" && (
          <div className="w-full">
            <p>Full Name</p>
            <input
              className="border border-zinc-300 rounded w-full p-2 mt-1 outline-none"
              type="text"
              onChange={(e) => setName(e.target.value)}
              value={name}
              required
            />
          </div>
        )}

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

        <button type="submit" className="bg-primary text-white w-full py-2 rounded-md text-base">
          {state === "Sign Up" ? "Create Account" : "Login"}
        </button>

        {state === "Sign Up" ? (
          <p>
            Already have an account?{" "}
            <span
              onClick={() => setState("Login")}
              className="text-primary underline cursor-pointer"
            >
              Login here
            </span>
          </p>
        ) : (
          <p>
            Create a new account?{" "}
            <span
              onClick={() => setState("Sign Up")}
              className="text-primary underline cursor-pointer"
            >
              Click here
            </span>
          </p>
        )}
      </div>
    </form>
  );
}

export default Login;
