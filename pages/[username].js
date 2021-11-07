import React from "react";
import Header from "../components/Header";

function Username({ username }) {
  return (
    <div>
      <Header />
      <div></div>
    </div>
  );
}

export default Username;
export async function getServerSideProps(context) {
  const username = context.params.username;
  return {
    props: {
      username,
    },
  };
}
