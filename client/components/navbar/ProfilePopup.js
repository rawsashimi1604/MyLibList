import React, { useState, useEffect } from "react";
import Link from "next/link";
import { BsFillGearFill } from "react-icons/bs";
import { IoMdExit } from "react-icons/io";
import useLocalStorage from "../../hooks/useLocalStorage";
import { useRouter } from "next/router";
import AuthService from "../../requests/services/AuthService";

function ProfilePopup() {
  const router = useRouter();
  const [user, setUser] = useLocalStorage("user", null);

  // Functions
  async function handleLogout() {
    // Remove JWT refresh_token (backend)
    const res = await AuthService.logout({ token: user.refreshToken });

    // Redirect to login page...
    router.push("/login");

    // Remove user data from localStorage
    setUser(null);
  }

  return (
    <div
      className={`
        bg-white dropdown-menu overflow-hidden text-black shadow-lg shadow-slate-400 max-w-xs
        animate__animated animate__fadeIn animate__slow
      }`}
    >
      {/* Top Notification Header */}
      <header className="bg-cyan-800 text-white text-center px-2 py-4 font-Raleway font-md">
        <h3 className="font-bold text-md">
          Hello, {user?.data.first_name + " " + user?.data.last_name}
        </h3>
      </header>

      {/* Bottom Notification Section */}
      <section className="flex flex-col">
        {/* Edit Profile */}
        <Link href="/editprofile">
          <div className="flex items-center gap-4 px-4 py-3 transition-all ease-in duration-75 hover:bg-gray-100">
            <BsFillGearFill className="h-5 w-5" />
            <span>Edit Profile</span>
          </div>
        </Link>

        {/* Logout */}

        <div
          className="flex items-center gap-4 px-4 py-3 transition-all ease-in duration-75 hover:bg-gray-100 cursor-pointer"
          onClick={handleLogout}
        >
          <IoMdExit className="h-5 w-5" />
          <span>Logout</span>
        </div>
      </section>
    </div>
  );
}

export default ProfilePopup;
