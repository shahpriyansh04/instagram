import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
export default NextAuth({
  //Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    // ...add more providers here  ],
  ],
  pages: {
    signIn: "/auth/signin",
  },
  callbacks: {
    async session({ session, token }) {
      let username;
      session.user.uid = token.sub;
      console.log(session);
      await fetch("http://localhost:3000/api/user/getUser", {
        params: { uid: session.user.uid },
      }).then((res) =>
        res.json().then((data) => {
          console.log(data);
        })
      );
      if (username) {
        session.user.username = username;
      } else {
        await fetch(
          `http://localhost:3000/api/user/setUse?id=${token.sub}`
        ).then((res) =>
          res.json().then((data) => {
            session.user.username = data.username;
          })
        );
      }

      return session;
    },
  },
});
