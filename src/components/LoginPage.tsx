import { useEffect, useState } from "react";
import pasabuyLogo from "../assets/pasabuy-logo.svg";
import type { LoginRequest } from "../types/types";

export default function LoginPage() {
  const [input, setInput] = useState<LoginRequest>({
    username: "",
    password: "",
  });

  useEffect(() => {
    console.log(JSON.stringify(input));
  }, [input]);

  return (
    <div className="h-screen flex flex-col">
      <div>
        <div className="flex p-5">
          <img src={pasabuyLogo} alt="Pasabuy Logo" className="h-20 -mr-2" />
          <div className="flex justify-center items-center ">
            <p className="font-medium text-4xl">Pasa</p>
            <p className="font-medium text-[#50219F] text-4xl">Buy</p>
          </div>
        </div>
        <div className="w-full h-px bg-gray-300"></div>
      </div>
      <div className="flex-1 flex justify-center items-center bg-gray-50">
        <div className="flex flex-col items-center bg-white shadow-lg rounded-xl p-10 w-[500px] gap-6">
          <p className="font-bold text-3xl text-gray-800">Login</p>{" "}
          <div className="w-full">
            <p className="text-xl mb-2 font-medium text-gray-700">Username</p>
            <input
              value={input.username}
              onChange={(e) => setInput({ ...input, username: e.target.value })}
              className="border-2 border-[#dedfe0] rounded-lg p-3 w-full text-lg outline-none
         transition-all duration-200
         hover:border-[#b4b5b6] focus:border-[#3b43a3]"
            />
          </div>
          <div className="w-full">
            <p className="text-xl mb-2 font-medium text-gray-700">Password</p>
            <input
              type="password"
              value={input.password}
              onChange={(e) => setInput({ ...input, password: e.target.value })}
              className="border-2 border-[#dedfe0] rounded-lg p-3 w-full text-lg outline-none
         transition-all duration-200
         hover:border-[#b4b5b6] focus:border-[#3b43a3]"
            />
          </div>
          <button className="bg-[#50219F] text-white font-semibold text-lg rounded-lg p-3 w-full hover:bg-[#3b43a3] transition-colors">
            Login
          </button>
        </div>
      </div>
    </div>
  );
}
