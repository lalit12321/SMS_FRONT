import React, { useState } from "react";

const conversations = [
  { id: 1, name: "Staff Coordination", lastMessage: "Meeting at 5 PM", time: "2:30 PM" },
  { id: 2, name: "Ms. Heather Morris", lastMessage: "Submitted report", time: "1:45 PM" },
  { id: 3, name: "Mr. Franklin", lastMessage: "Shared agenda draft", time: "11:15 AM" },
];

const messages = [
  { sender: "Admin", text: "Hello team, please check the latest announcement.", time: "2:00 PM" },
  { sender: "Mr. Franklin", text: "Sure, will do that.", time: "2:10 PM" },
  { sender: "Ms. Thompson", text: "Thanks for the reminder!", time: "2:12 PM" },
];

export default function Message() {
  const [selectedChat, setSelectedChat] = useState(conversations[0]);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (input.trim()) {
      messages.push({ sender: "Admin", text: input, time: "Now" });
      setInput("");
    }
  };

  return (
    <div className="flex h-[calc(100vh-4rem)] bg-gray-50">
      {/* Left Sidebar */}
      <div className="w-1/4 border-r bg-white p-4 overflow-y-auto">
        <h2 className="text-lg font-semibold mb-4">Messages</h2>
        {conversations.map(chat => (
          <div
            key={chat.id}
            onClick={() => setSelectedChat(chat)}
            className={`p-3 rounded cursor-pointer hover:bg-blue-100 ${
              selectedChat.id === chat.id ? "bg-blue-200" : ""
            }`}
          >
            <div className="font-medium">{chat.name}</div>
            <div className="text-sm text-gray-500">{chat.lastMessage}</div>
            <div className="text-xs text-right">{chat.time}</div>
          </div>
        ))}
      </div>

      {/* Chat Box */}
      <div className="w-2/4 flex flex-col">
        <div className="bg-white p-4 border-b font-semibold text-lg">
          {selectedChat.name}
        </div>
        <div className="flex-1 p-4 space-y-3 overflow-y-auto">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${
                msg.sender === "Admin" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-xs px-4 py-2 rounded-lg ${
                  msg.sender === "Admin" ? "bg-blue-200" : "bg-gray-200"
                }`}
              >
                <p>{msg.text}</p>
                <p className="text-xs text-right text-gray-600">{msg.time}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="p-4 border-t bg-white flex items-center">
          <input
            type="text"
            className="flex-1 p-2 border rounded mr-2"
            placeholder="Type a message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <button
            onClick={sendMessage}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Send
          </button>
        </div>
      </div>

      {/* Right Panel (Group Info) */}
      <div className="w-1/4 border-l bg-white p-4 overflow-y-auto">
        <h3 className="font-semibold text-lg mb-2">Group Info</h3>
        <p className="text-sm text-gray-600 mb-4">
          This group is for staff coordination and planning. Please check updates regularly.
        </p>
        <h4 className="font-medium mb-1">Members</h4>
        <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
          <li>Admin</li>
          <li>Mr. Franklin</li>
          <li>Ms. Thompson</li>
          <li>Mr. Harris</li>
          <li>Ms. Patel</li>
        </ul>
      </div>
    </div>
  );
}
