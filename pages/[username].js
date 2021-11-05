import React from "react";

function Username({ username }) {
  return <div>{username}</div>;
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
