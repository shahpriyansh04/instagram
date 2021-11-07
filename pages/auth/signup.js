import { SignUp } from "@clerk/clerk-react";
import React from "react";

function signup() {
  return (
    <div className="flex h-screen justify-center items-center">
      <SignUp />
    </div>
  );
}

export default signup;
