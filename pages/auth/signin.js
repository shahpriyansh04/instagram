import { SignIn } from "@clerk/clerk-react";
import React from "react";

function signin() {
  return (
    <div className="flex h-screen justify-center items-center">
      {" "}
      <SignIn />
    </div>
  );
}

export default signin;
