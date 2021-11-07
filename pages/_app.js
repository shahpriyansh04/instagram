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
import Header from "../components/Header";
import Loading from "../components/Loading";
import Modal from "../components/Modal";
function MyApp({ Component, pageProps }) {
  return (
    <ClerkProvider>
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
