import Head from "next/head";
import AlertDialog from "../components/AlertDialog";
import Feed from "../components/Feed";
import Header from "../components/Header";
import Modal from "../components/Modal";
export default function Home() {
  return (
    <div className="bg-gray-50 h-screen overflow-scroll scrollbar-hide">
      <Head>
        <title>Instagram</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Feed />
      <Modal />
      <AlertDialog />
    </div>
  );
}
