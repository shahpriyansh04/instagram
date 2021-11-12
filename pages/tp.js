import React from "react";
import Header from "../components/Header";
import { CogIcon } from "@heroicons/react/outline";
function Tp() {
  return (
    <div className="flex justify-center text-[#262626]">
      <main className="w-3/5 ">
        <div className="flex  ">
          <div className="w-60">
            <img
              src="https://www.gravatar.com/avatar?d=mp"
              className="object-contain rounded-full w-36 h-36 ring-2 ring-gray-300"
            />
          </div>

          <div className="flex-1">
            <div className="flex items-center space-x-4">
              <h1 className="text-3xl font-extralight">Username</h1>
              <div className="flex items-center space-x-3">
                <p className="text-sm px-2 py-1 rounded-md border-[1px] font-semibold border-gray-300 cursor-pointer ">
                  Edit Profile
                </p>
                <CogIcon className="h-7 w-7 hover:rotate-45" />
              </div>
            </div>

            <div className="flex space-x-4 mt-6">
              <p>
                <span className="font-semibold">0</span> posts
              </p>
              <p>
                <span className="font-semibold">39</span> followers
              </p>
              <p>
                <span className="font-semibold">71</span> following
              </p>
            </div>

            <p className="font-semibold text-base mt-6">Full name</p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Tp;
