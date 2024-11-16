import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Doctors from "./pages/Doctors";
import Login from "./pages/Login";
import About from "./pages/About";
import Contact from "./pages/Contact";
import MyProfile from "./pages/MyProfile";
import MyAppointments from "./pages/MyAppointments";
import Appointment from "./pages/Appointment";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AddDoctors from "./pages/AddDoctors";
import DoctorLogin from "./pages/DoctorLogin";
import DoctorProfile from "./pages/DoctorProfile";
import AllDoctors from "./pages/AllDoctors";
import AllUsers from "./pages/AllUsers";

function App() {
  return (
    <div className="mx-4 sm:mx-[10%]">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/doctors" element={<Doctors />} />
        <Route path="/doctors/:speciality" element={<Doctors />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/my-profile" element={<MyProfile />} />
        <Route path="/my-appointments" element={<MyAppointments />} />
        <Route path="/appointment/:docId" element={<Appointment />} />
        <Route path="/add-doctors" element={<AddDoctors />} />
        <Route path="/doctor-login" element={<DoctorLogin />} />
        <Route path="/doctor-profile" element={<DoctorProfile />} />
        <Route path="/all-doctors" element={<AllDoctors />} />
        <Route path="/all-users" element={<AllUsers />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
