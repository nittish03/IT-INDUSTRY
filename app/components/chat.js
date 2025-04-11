
import { useState, useEffect } from "react";

export default function Chat({ mentor }) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  // Load messages from localStorage
  useEffect(() => {
    const savedMessages = JSON.parse(localStorage.getItem(`chat_${mentor.id}`)) || [];
    setMessages(savedMessages);
  }, [mentor]);

  const sendMessage = () => {
    if (!newMessage) return;
    const updatedMessages = [...messages, { user: "You", message: newMessage }];
    setMessages(updatedMessages);
    localStorage.setItem(`chat_${mentor.id}`, JSON.stringify(updatedMessages));
    setNewMessage("");
  };

  return (
    <div className="mt-6 border p-4 rounded">
      <h2 className="text-xl font-bold">Chat with {mentor.name}</h2>
      <div className="h-40 overflow-y-auto border p-2 mt-2">
        {messages.map((msg, index) => (
          <p key={index} className="mb-1"><b>{msg.user}:</b> {msg.message}</p>
        ))}
      </div>
      <div className="mt-2 flex">
        <input
          type="text"
          className="border p-2 flex-1 rounded"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button onClick={sendMessage} className="bg-blue-500 text-white px-4 py-2 ml-2 rounded">
          Send
        </button>
      </div>
    </div>
  );
}
