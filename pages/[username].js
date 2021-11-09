import { doc, getDoc } from "@firebase/firestore";
import React from "react";
import { db } from "../firebase-admin";
import Header from "../components/Header";
import Userprofile from "../components/Userprofile";

function Username({ userData }) {
  console.log(userData);
  return (
    <div>
      <Header />
      <div className="flex items-center justify-center">
        <Userprofile />
      </div>
    </div>
  );
}

export default Username;
export async function getServerSideProps(context) {
  const username = context.params.username;
  const idRef = await db.collection("usernames").doc(username).get();
  const id = idRef.data().id;
  const userData = await db.collection("users").doc(id).get();
  return {
    props: {
      userData: userData.data(),
    },
  };
}
