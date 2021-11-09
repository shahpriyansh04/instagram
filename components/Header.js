import Image from "next/image";
import {
  SearchIcon,
  PlusCircleIcon,
  UserIcon,
  HeartIcon,
  PaperAirplaneIcon,
  MenuIcon,
  UserGroupIcon,
} from "@heroicons/react/outline";
import { HomeIcon } from "@heroicons/react/solid";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/router";
import { modalState } from "../atoms/modalAtom";
import { useRecoilState } from "recoil";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
function Header() {
  const router = useRouter();
  const user = useUser();
  const [open, setOpen] = useRecoilState(modalState);
  return (
    <div className="sticky top-0 z-50 shadow-sm border-b bg-white">
      <div className="flex justify-between bg-white max-w-6xl mx-5 lg:mx-auto">
        <div
          className="hidden lg:inline-grid relative  w-24 cursor-pointer"
          onClick={() => {
            router.push("/");
          }}
        >
          <Image
            src="https://links.papareact.com/ocw"
            layout="fill"
            objectFit="contain"
          />
        </div>
        <Link href="/">
          <div className=" lg:hidden relative  w-10 flex-shrink-0 cursor-pointer ">
            <Image
              src="https://links.papareact.com/jjm"
              layout="fill"
              objectFit="contain"
            />
          </div>
        </Link>

        <div className="max-w-xs">
          <div className="mt-1 p-3  rounded-md relative ">
            <div className="absolute inset-y-0 pl-3  flex items-center pointer-events-none">
              <SearchIcon className="h-5 w-5 text-gray-400 " />
            </div>
            <input
              type="text"
              placeholder="Search"
              className="bg-gray-50 block w-full pl-10 sm:text-sm border-gray-300 
            focus:ring-black focus:border-black rounded-md"
            />
          </div>
        </div>

        <div className="flex items-center justify-end space-x-4">
          <Link href="/">
            <HomeIcon className="navBtn" />
          </Link>
          {/* <MenuIcon className="h-6 md:hidden cursor-pointer mt-1" /> */}
          <>
            <div className="relative navBtn">
              <PaperAirplaneIcon className="navBtn rotate-45" />
              <div className="absolute -top-2 -right-2 bg-red-500 rounded-full flex items-center  justify-center animate-pulse text-white text-xs w-5 h-5">
                3
              </div>
            </div>
            <PlusCircleIcon
              className="h-6 inline-flex cursor-pointer md:hover:scale-125 transition-all duration-150 ease-out"
              onClick={() => {
                setOpen(true);
              }}
            />
            <UserGroupIcon className="navBtn" />
            <HeartIcon className="navBtn" />
            <UserButton />
          </>
        </div>
      </div>
    </div>
  );
}

export default Header;
