import React from "react";
import pasabuyLogo from "../assets/pasabuy-logo.svg";
import { useAuthStore } from "../stores/auth_store";

const Sidebar: React.FC = () => {
  const logout = useAuthStore((s) => s.logout);

  return (
    <div className="flex h-screen bg-gray-100 ">
      <div className="flex flex-col justify-between w-16 p-3 bg-gray-200 rounded-xl shadow-xl">
        <div className="flex flex-col items-center space-y-4">
          <div className="p-1">
            <div className="w-14 h-16 flex items-center justify-center">
              <img src={pasabuyLogo} alt="Pasabuy Logo" className="-mr-2" />
            </div>
          </div>

          <button className="p-2 rounded-lg hover:bg-gray-100 transition duration-150 shadow-sm">
            <svg
              className="w-6 h-6 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </button>
          <div className="w-full"></div>
        </div>

        {/* Bottom Section: Collapse/Logout Icon */}
        <div className="flex justify-center pb-2">
          <button
            className="p-2 rounded-lg hover:bg-gray-100 transition duration-150 shadow-sm"
            onClick={logout}
          >
            <svg
              className="w-6 h-6 text-gray-600 transform rotate-180"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M11 16l-4-4m0 0l4-4m-4 4h14"
              ></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
