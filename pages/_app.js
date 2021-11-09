import "../styles/globals.css";
import {
  ClerkProvider,
  SignedIn,
  ClerkLoaded,
  ClerkLoading,
  SignedOut,
  RedirectToSignIn,
  SignIn,
} from "@clerk/nextjs";
import { RecoilRoot } from "recoil";
import Loading from "../components/Loading";
import Modal from "../components/Modal";
import Router from "next/router";
import ProgressBar from "@badrap/bar-of-progress";

const progress = new ProgressBar({
  size: 4,
  color: "#E1306C",
  className: "z-50",
  delay: 100,
});

Router.events.on("routeChangeStart", progress.start);
Router.events.on("routeChangeComplete", progress.finish);
Router.events.on("routeChangeError", progress.finish);

function MyApp({ Component, pageProps }) {
  return (
    <ClerkProvider frontendApi="clerk.6nk9u.5oduc.lcl.dev">
      <RecoilRoot>
        <ClerkLoading>
          <Loading />
        </ClerkLoading>
        <ClerkLoaded>
          <SignedIn>
            <Modal />
            <Component {...pageProps} />
          </SignedIn>
          <SignedOut>
            <RedirectToSignIn />
          </SignedOut>
        </ClerkLoaded>
      </RecoilRoot>
    </ClerkProvider>
  );
}

export default MyApp;
