import { UserProfile } from "@clerk/nextjs";
import React from "react";
import Header from "../components/Header";

function profile() {
  return (
    <div>
      <Header />
      <UserProfile />
    </div>
  );
}

export default profile;
