import React, { useState, useEffect } from "react";
import {
  BookmarkIcon,
  ChatIcon,
  DotsHorizontalIcon,
  HeartIcon,
  EmojiHappyIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/outline";
import { HeartIcon as HeartIconFilled } from "@heroicons/react/solid";
import { useUser } from "@clerk/clerk-react";
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  doc,
  deleteDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "@firebase/firestore";
import { db } from "../firebase";
import Moment from "react-moment";
import Dropdown from "./Dropdown";
import Link from "next/link";
function Post({ id, username, caption, userImg, img, uid }) {
  const user = useUser();
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [likes, setLikes] = useState([]);
  const [hasLiked, setHasLiked] = useState(false);

  useEffect(
    () =>
      onSnapshot(
        query(
          collection(db, "posts", id, "comments"),
          orderBy("timeStamp", "desc")
        ),
        (snapshot) => {
          setComments(snapshot.docs);
        }
      ),
    [db, id]
  );

  useEffect(
    () =>
      onSnapshot(collection(db, "posts", id, "likes"), (snapshot) => {
        setLikes(snapshot.docs);
      }),

    [db, id]
  );

  useEffect(
    () => setHasLiked(likes.findIndex((like) => like.id === user.id) !== -1),
    [likes]
  );

  const likePost = async () => {
    if (hasLiked) {
      const likeRef = await deleteDoc(doc(db, "posts", id, "likes", user.id));
      await updateDoc(doc(db, "users", user.id), {
        likes: arrayRemove(id),
      });
    } else {
      const likeRef = await setDoc(doc(db, "posts", id, "likes", user.id), {
        username: user.username,
      });
      await updateDoc(doc(db, "users", user.id), {
        likes: arrayUnion(id),
      });
    }
  };

  const sendComment = async (e) => {
    e.preventDefault();

    const commentToSend = comment;
    setComment("");

    const commentRef = await addDoc(collection(db, "posts", id, "comments"), {
      comment: commentToSend,
      username: user.username,
      userImg: user.profileImageUrl,
      timeStamp: serverTimestamp(),
    });
    await updateDoc(doc(db, "users", user.id), {
      comments: arrayUnion(commentRef.id),
    });
  };
  return (
    <div className="bg-white my-7 rounded-sm border">
      <div className="flex items-center  p-5">
        <img
          src={userImg}
          className="rounded-full h-12 w-12 object-contain border p-1 mr-3"
          alt=""
        />
        <Link href={`${username}`}>
          <p className="flex-1 font-bold cursor-pointer">{username}</p>
        </Link>
        {user.id === uid && <Dropdown id={id}></Dropdown>}
      </div>
      <img src={img} className="w-full object-cover" />

      <div className="flex justify-between px-4 pt-4">
        <div className="flex space-x-4">
          {hasLiked ? (
            <HeartIconFilled onClick={likePost} className="btn text-red-500" />
          ) : (
            <HeartIcon onClick={likePost} className="btn" />
          )}
          <ChatIcon className="btn" />
          <PaperAirplaneIcon className="btn" />
        </div>
        <BookmarkIcon className="btn" />
      </div>

      <p className="p-5 truncate ">
        {likes.length > 0 && (
          <p className="font-bold mb-1">{likes.length} likes</p>
        )}
        <span className="font-bold mr-1">{username} </span>
        {caption}
      </p>

      {comments.length > 0 && (
        <div className="ml-10 h-20 overflow-y-scroll  scrollbar-thumb-black scrollbar-thin">
          {comments.map((comment) => (
            <div
              key={comment.id}
              className="flex items-center space-x-2 mb-3 w-full"
            >
              <img src={comment.data().userImg} className="h-7 rounded-full" />
              <p className="text-sm flex-1">
                <span className="font-bold">{comment.data().username}</span>{" "}
                {comment.data().comment}
              </p>
              <Moment className="pr-5 text-xs" fromNow>
                {comment.data().timeStamp?.toDate()}
              </Moment>
            </div>
          ))}
        </div>
      )}

      <form className="flex items-center p-4 " onSubmit={sendComment}>
        <EmojiHappyIcon className="h-7" />
        <input
          type="text"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="border-none flex-1 focus:ring-0  outline-none
          "
          placeholder="Add a comment..."
        />
        <button
          className="font-semibold text-blue-400 disabled:cursor-not-allowed"
          type="submit"
          disabled={!comment.trim()}
        >
          Post
        </button>
      </form>
      <div className="relative"></div>
    </div>
  );
}

export default Post;
