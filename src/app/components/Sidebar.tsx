"use client";
import {
  Timestamp,
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { IoIosLogOut } from "react-icons/io";
import { db } from "../firebase";
import { unsubscribe } from "diagnostics_channel";
import { useAppContext } from "../context/AppContext";

/**
 * [CSS補足]
 * overflow-y-auto：高さがいっぱいになった時にスクロールバーを表示
 * flex-grow：余白を引き延ばす
 */

type Room = {
  userId: string;
  name: string;
  createdAt: Timestamp;
};

const Sidebar = () => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const { user, userId } = useAppContext();

  useEffect(() => {
    const fetchRooms = async () => {
      const roomCollectionRef = collection(db, "rooms");
      const q = query(
        roomCollectionRef,
        where("userId", "==", userId),
        orderBy("createdAt")
      );
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const newRooms: Room[] = snapshot.docs.map((doc) => ({
          userId: doc.data().docId,
          name: doc.data().name,
          createdAt: doc.data().createdAt,
          // ...doc.data(), // コレクション内のデータを全て取得する書き方
        }));
        setRooms(newRooms);
        return () => {
          unsubscribe();
        };
      });
    };
    fetchRooms();
  }, [userId]);

  return (
    <div className="bg-custom-blue h-full overflow-y-auto px-5 flex-col flex">
      <div className="flex-grow">
        <div className="flex justify-evenly items-center border mt-2 rounded-md cursor-pointer hover:bg-blue-800 duration-100">
          <span className="text-white p-4 text-2xl">＋</span>
          <h1 className="text-white text-xl font-semibold p-4">New Chat</h1>
        </div>
        <ul>
          {rooms.map((room) => (
            <li
              key={room.userId}
              className="cursor-pointer border-b p-4 text-slate-100 hover:bg-blue-800 duration-200"
            >
              {room.name}
            </li>
          ))}
        </ul>
      </div>

      <div className="mb-2 cursor-pointer p-4 text-slate-100 hover:bg-slate-700 duration-200 flex items-center justify-evenly text-lg">
        <IoIosLogOut />
        <span>ログアウト</span>
      </div>
    </div>
  );
};

export default Sidebar;
