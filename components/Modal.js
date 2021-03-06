import React, { Fragment, useRef, useState } from "react";
import { modalState } from "../atoms/modalAtom";
import { useRecoilState } from "recoil";
import { Dialog, Transition } from "@headlessui/react";
import { CameraIcon } from "@heroicons/react/outline";
import { db, storage } from "../firebase";
import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "@firebase/firestore";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/router";
import { ref, getDownloadURL, uploadString } from "@firebase/storage";
function Modal() {
  const [open, setOpen] = useRecoilState(modalState);
  const user = useUser();
  const router = useRouter();
  const initialFocusRef = useRef();
  const filePickerRef = useRef();
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const captionRef = useRef();
  const addImageToPost = (e) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }

    reader.onload = (readerEvent) => {
      setSelectedFile(readerEvent.target.result);
    };
  };
  console.log(open);
  const uploadPost = async () => {
    if (loading) return;

    setLoading(true);
    const docRef = await addDoc(collection(db, "posts"), {
      username: user.username,
      uid: user.id,
      caption: captionRef.current.value,
      profileImg: user.profileImageUrl,
      timestamp: serverTimestamp(),
    });
    console.log("New Doc Created with ID ", docRef.id);

    const imageRef = ref(storage, `posts/${user.id}/${docRef.id}/image`);

    await uploadString(imageRef, selectedFile, "data_url").then(
      async (snapshot) => {
        const downloadURL = await getDownloadURL(imageRef);
        await updateDoc(doc(db, "posts", docRef.id), {
          image: downloadURL,
        });
        await updateDoc(doc(db, "users", user.id), {
          posts: arrayUnion(docRef.id),
        });
      }
    );
    // if (router.pathname !== "/") {
    //   router.push("/");
    // }
    setOpen(false);
    setLoading(false);
    setSelectedFile(null);
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-10 inset-0 overflow-y-auto"
        initialFocus={initialFocusRef}
        onClose={() => {
          // setOpen(false);
        }}
      >
        <div className="flex items-end justify-center min-h-[550px] sm:min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203
          </span>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div
              className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left
                overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6"
            >
              <div>
                {selectedFile ? (
                  <img
                    src={selectedFile}
                    className="inline-block "
                    onClick={() => setSelectedFile(null)}
                    className="w-full object-contain cursor-pointer"
                  />
                ) : (
                  <div
                    className="mx-auto flex items-center justify-center w-12 h-12 rounded-full bg-red-100 cursor-pointer"
                    onClick={() => {
                      filePickerRef.current.click();
                    }}
                  >
                    <CameraIcon
                      className="h-6 w-6 text-red-600"
                      aria-hidden="true"
                    />
                  </div>
                )}

                <div>
                  <div className="mt-3 text-center sm:mt-5">
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-medium leading-6 text-gray-900"
                    >
                      Upload a Photo
                    </Dialog.Title>
                  </div>

                  <div>
                    <input
                      type="file"
                      disabled={loading}
                      hidden
                      ref={filePickerRef}
                      onChange={addImageToPost}
                    />
                  </div>
                  <div className="mt-2">
                    <input
                      type="text"
                      // disabled={loading}
                      ref={captionRef}
                      placeholder="Please enter a caption ..."
                      className="border-none focus:ring-0 w-full text-center"
                    />
                  </div>
                </div>

                <div className="flex  space-x-4 mt-5 sm:mt-6">
                  <button
                    onClick={() => {
                      setOpen(false);
                    }}
                    ref={initialFocusRef}
                    type="button"
                    disabled={loading}
                    className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-2 md:px-4 py-2 
                    bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none 
                    focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:text-sm disabled:bg-gray-300
                     disabled:cursor-not-allowed disabled:hover:bg-gray-300"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={uploadPost}
                    type="button"
                    disabled={!selectedFile || loading}
                    className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-2 md:px-4 py-2 
                    bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none 
                    focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:text-sm disabled:bg-gray-300
                     disabled:cursor-not-allowed disabled:hover:bg-gray-300"
                  >
                    {loading ? "Uploading..." : "Upload Post"}
                  </button>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

export default Modal;
