import React, { Fragment, useRef, useState } from "react";
import { alertState, alertData } from "../atoms/alertAtom";
import { useRecoilState, useRecoilValue } from "recoil";
import { Dialog, Transition } from "@headlessui/react";
import { CameraIcon } from "@heroicons/react/outline";
import { db, storage } from "../firebase";
import {
  addDoc,
  arrayRemove,
  collection,
  deleteDoc,
  doc,
  serverTimestamp,
  updateDoc,
} from "@firebase/firestore";
import { useUser } from "@clerk/clerk-react";
import {
  ref,
  getDownloadURL,
  uploadString,
  deleteObject,
} from "@firebase/storage";
function AlertDialog() {
  const [open, setOpen] = useRecoilState(alertState);
  const [data, setData] = useRecoilState(alertData);
  console.log(data);

  const user = useUser();
  console.log(user);
  const [loading, setLoading] = useState(false);

  const deletePost = async () => {
    setLoading(true);
    const deleteRef = ref(storage, `posts/${user.id}/${data.postId}/image`);
    await deleteObject(deleteRef).then(async () => {
      await deleteDoc(doc(db, "posts", data.postId)).then(async () => {
        await updateDoc(doc(db, "users", user.id), {
          posts: arrayRemove(data.postId), 
        })
        setOpen(false);
        setLoading(false);
        setData({ postId: null, title: "", description: "", type: "" });
      });
    });
  };

  const cancelDeletePost = async () => {
    await setOpen(false);
    await setLoading(false);
    setData({ postId: null, title: "", description: "", type: "" });
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-10 inset-0 overflow-y-auto"
        onClose={() => {}
          //cancelDeletePost()
        }
      >
        <div className="flex items-end justify-center min-h-[600px] sm:min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
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
                <div>
                  <div className="mt-3 text-center sm:mt-5">
                    <Dialog.Title
                      as="h3"
                      className="text-xl  leading-6  text-gray-900 font-semibold"
                    >
                      {data.title}
                    </Dialog.Title>
                  </div>
                  <p className="text-center mt-4">{data.description}</p>
                </div>

                <div className="flex space-x-4 rounded-lg mt-5 sm:mt-6">
                  <button
                    onClick={cancelDeletePost}
                    type="button"
                    disabled={loading}
                    className="inline-flex justify-center w-full rounded-md border border-transparent bg-gray-100 shadow-sm px-4 py-2 
                     text-base font-medium  focus:outline-none active:scale-90 transition-all duration-200 ease-out
                   text-black sm:text-sm disabled:cursor-not-allowed disabled:transform-none"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={deletePost}
                    type="button"
                    disabled={loading}
                    className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 
                    bg-red-600 text-base font-medium text-white focus:outline-none active:scale-90 transition-all duration-200 ease-out
                     sm:text-sm disabled:cursor-not-allowed disabled:transform-none"
                  >
                    {!loading ? "Delete" : "Deleting..."}
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

export default AlertDialog;
