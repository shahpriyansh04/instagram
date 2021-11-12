import { doc, getDoc } from "@firebase/firestore";
import React from "react";
import { db } from "../firebase-admin";
import Header from "../components/Header";
import Userprofile from "../components/Userprofile";

function Username({ userData }) {
  document.title = `${userData.first_name} ${userData.last_name}(@${userData.username})`;

  console.log(userData);
  return (
    <div className="bg-gray-50 h-screen overflow-scroll scrollbar-hide">
      <Header />
      <Userprofile />
    </div>
  );
}

export default Username;
export async function getServerSideProps(context) {
  const username = context.params.username;
  const idRef = await db.collection("usernames").doc(username).get();
  if (!idRef.data()) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const id = idRef.data().id;
  const userData = await db.collection("users").doc(id).get();
  return {
    props: {
      userData: userData.data(),
    },
  };
}
