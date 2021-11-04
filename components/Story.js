import React from "react";

function Story({ img, username }) {
  return (
    <div>
      <img
        src={img}
        alt=""
        className="h-14 w-14 rounded-full p-[1.5px] border-red-500 border-2 
        cursor-pointer object-contain hover:scale-110 transition transform duration-200 ease-out"
      />
      <p className="w-14 truncate text-center text-xs">{username}</p>
    </div>
  );
}

export default Story;
