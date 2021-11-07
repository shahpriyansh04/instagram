import Head from "next/head";
import AlertDialog from "../components/AlertDialog";
import Feed from "../components/Feed";
import Header from "../components/Header";
import Modal from "../components/Modal";
import { useUser } from "@clerk/nextjs";
export default function Home() {
  const user = useUser();
  return (
    <div className="bg-gray-50 h-screen overflow-scroll scrollbar-hide">
      <Head>
        <title>Instagram</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Feed />
      <Modal />
      <button onClick={async () => await user.delete()}>Delete</button>
      <AlertDialog />
    </div>
  );
}
