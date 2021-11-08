import { doc, getDoc } from "@firebase/firestore";
import React from "react";
import { db } from "../firebase-admin";
import Header from "../components/Header";

function Username({ username, id, userData }) {
  console.log(userData);
  return (
    <div>
      <Header />
      {username}
      {id}
    </div>
  );
}

export default Username;
export async function getServerSideProps(context) {
  const username = context.params.username;
  const id = await db.collection("usernames").doc(username).get();
  console.log(id.data());
  const userData = await db.collection("users").doc(id.data().id).get();
  console.log(userData.data());
  return {
    props: {
      username,
      id: id.data().id,
      userData: userData.data(),
    },
  };
}
