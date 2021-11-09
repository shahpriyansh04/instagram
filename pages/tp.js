import React from "react";
import Header from "../components/Header";

function Tp() {
  return (
    <div className="flex justify-center">
      <main className="w-3/5 ">
        <div className="flex space-x-28 ">
          <img
            src="https://www.gravatar.com/avatar?d=mp"
            className="object-contain rounded-full w-44 h-44"
          />
          <div className="flex-1">
            <h1 className="text-2xl">Username</h1>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Tp;
