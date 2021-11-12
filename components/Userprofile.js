//React component with tailwindcss instagram profileimport React from "react";
import {
  CogIcon,
  ViewGridIcon,
  BookmarkIcon,
  UserGroupIcon,
} from "@heroicons/react/outline";
import { Tab } from "@headlessui/react";
import { Fragment } from "react";
function Userprofile() {
  return (
    <div className="flex items-center text-[#262626] mt-12 flex-col">
      <section className="w-2/5">
        <div className="flex  ">
          <div className="w-60">
            <img
              src="https://www.gravatar.com/avatar?d=mp"
              className="object-contain rounded-full w-36 h-36 ring-2 ring-gray-300"
            />
          </div>

          <div className="flex-1">
            <div className="flex items-center space-x-4">
              <h1 className="text-3xl font-extralight">Username</h1>
              <div className="flex items-center space-x-3">
                <p className="text-sm px-2 py-1 rounded-md border-[1px] font-semibold border-gray-300 cursor-pointer ">
                  Edit Profile
                </p>
                <CogIcon className="h-7 w-7 cursor-pointer" />
              </div>
            </div>

            <div className="flex space-x-4 mt-6">
              <p>
                <span className="font-semibold">0</span> posts
              </p>
              <p className="cursor-pointer">
                <span className="font-semibold">39</span> followers
              </p>
              <p className="cursor-pointer">
                <span className="font-semibold">71</span> following
              </p>
            </div>

            <p className="font-semibold text-base mt-6">Full name</p>
          </div>
        </div>
      </section>

      <section className="w-2/5 mt-12 border-t">
        <div className="w-full  ">
          {" "}
          <Tab.Group className="" as="div">
            <Tab.List className="flex p-1 -space-x-4 w-[50%] mx-auto rounded-xl">
              <Tab
                className={({ selected }) =>
                  `w-full flex items-center space-x-1 ${
                    selected ? "text-black" : "text-gray-500"
                  }`
                }
              >
                <ViewGridIcon className="h-4 w-4 mt-" />
                <p className="text-sm">POSTS</p>
              </Tab>
              <Tab
                className={({ selected }) =>
                  `w-full flex items-center space-x-1 ${
                    selected ? "text-black" : "text-gray-500"
                  }`
                }
              >
                <BookmarkIcon className="h-4 w-4 " />
                <p className="text-sm">Saved</p>
              </Tab>
              <Tab
                className={({ selected }) =>
                  `w-full flex items-center  space-x-1 ${
                    selected ? "text-black" : "text-gray-500"
                  }`
                }
              >
                <UserGroupIcon className="h-4 w-4 " />
                <p className="text-sm">Tagged</p>
              </Tab>
            </Tab.List>
            <Tab.Panels>
              <Tab.Panel>Content 1</Tab.Panel>
              <Tab.Panel>Content 2</Tab.Panel>
              <Tab.Panel>Content 3</Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        </div>
      </section>
    </div>
  );
}

export default Userprofile;
