import React from "react";
import { IoMdSend } from "react-icons/io";

const Chat = () => {
  return (
    <div className="bg-gray-500 h-full p-4 flex flex-col">
      <h1 className="text-white text-2xl font-semibold">Room1</h1>
      <div className="flex-grow overflow-y-auto mb-4">
        <div className="text-right">
          <div className="bg-blue-500 inline-block boder rounded-lg px-4 py-2 mb-2">
            <p className="text-white font-medium">Hello</p>
          </div>
        </div>
        <div className="text-left">
          <div className="bg-green-500 inline-block boder rounded-lg px-4 py-2 mb-2">
            <p className="text-white font-medium">Hello</p>
          </div>
        </div>
      </div>
      <div className="flex-shrink-0 relative">
        <input
          type="text"
          placeholder="send a message"
          className="border-2 rounded w-full p-4 outline-none"
        />
        <button className="absolute right-5 top-4 text-3xl">
          <IoMdSend />
        </button>
      </div>
    </div>
  );
};

export default Chat;
