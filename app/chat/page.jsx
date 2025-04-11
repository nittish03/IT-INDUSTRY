"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";

const Peer = dynamic(() => import("peerjs"), { ssr: false });

const mentors = [
  { id: "mentor1", name: "Vrinda", linkedin: "https://www.linkedin.com/in/vrinda-bindal-55b645349/",Designation: "Software Engineer" },
  { id: "mentor2", name: "Ravi", linkedin: "https://www.linkedin.com/in/ravi-beniwal-342906274/",Designation: "Reserach Intern" },
  { id: "mentor3", name: "Nittish", linkedin: "https://www.linkedin.com/in/nittish-baboria/", Designation: "Businexx Aanlyst" },
];

export default function VideoCall() {
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const [peerId, setPeerId] = useState("");
  const [otherPeerId, setOtherPeerId] = useState("");
  const peerInstance = useRef(null);
  const connRef = useRef(null);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const initializePeer = async () => {
      const PeerJS = (await import("peerjs")).default;
      peerInstance.current = new PeerJS();

      peerInstance.current.on("open", (id) => {
        setPeerId(id);
        console.log("Your Peer ID:", id);
      });

      peerInstance.current.on("call", async (call) => {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        localVideoRef.current.srcObject = stream;
        call.answer(stream);

        call.on("stream", (remoteStream) => {
          remoteVideoRef.current.srcObject = remoteStream;
        });
      });

      peerInstance.current.on("connection", (conn) => {
        connRef.current = conn;
        conn.on("data", (data) => {
          setMessages((prev) => [...prev, { sender: "Peer", text: data }]);
        });
      });
    };

    initializePeer();
  }, []);

  const connectToPeer = () => {
    if (!otherPeerId) return alert("Enter a valid Peer ID!");
    const conn = peerInstance.current.connect(otherPeerId);
    connRef.current = conn;
    conn.on("data", (data) => {
      setMessages((prev) => [...prev, { sender: "Peer", text: data }]);
    });
  };

  const sendMessage = () => {
    if (message.trim() !== "" && connRef.current) {
      connRef.current.send(message);
      setMessages([...messages, { sender: "You", text: message }]);
      setMessage("");
    }
  };

  return (
    <div className="min-h-screen bg-black mt-18 text-white flex flex-col items-center justify-center p-8">
      <h1 className="text-3xl font-bold mb-4"> Mentor-User Video Call</h1>
      <h3 className="text-lg mb-2">Your Peer ID: <b className="text-blue-400">{peerId}</b></h3>
      <p className="text-gray-400 mb-6">🔗 Share this ID to receive calls</p>

      <h2 className="text-xl mb-2">🔹 Connect to a Mentor/User</h2>
      <input 
        type="text" 
        placeholder="Enter Peer ID to call/chat" 
        value={otherPeerId} 
        onChange={(e) => setOtherPeerId(e.target.value)} 
        className="p-4 w-80 text-white rounded-2xl border-2 border-white"
      />
      <button 
        onClick={connectToPeer} 
        className="p-3 bg-blue-600 hover:bg-blue-500 text-white rounded-md mt-4"
      >
        💬 Start Chat
      </button>

      <h2 className="text-xl mt-6">🔹 Available Mentors</h2>
      <ul className="flex flex-wrap justify-center gap-4 mt-4">
        {mentors.map((mentor) => (
          <li key={mentor.id} className="p-4 border border-gray-600 rounded-lg w-64 text-center">
            
            <h3 className="text-lg font-semibold">{mentor.name}</h3>
            <h2 className="text-lg font-semibold">{mentor.Designation}</h2>
            <a 
              href={mentor.linkedin} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-blue-400 underline block mb-2"
            >
              🔗 LinkedIn
            </a>
            <button 
              onClick={() => setOtherPeerId(mentor.id)} 
              className="p-2 bg-green-600 hover:bg-green-500 text-white rounded-md"
            >
              📞 Copy ID to Call
            </button>
          </li>
        ))}
      </ul>

      <h2 className="text-xl mt-8">💬 Chat</h2>
      <div className="w-96 bg-gray-900 p-4 rounded-md mt-4">
        <div className="h-40 overflow-y-auto border-b border-gray-700 p-2 mb-4">
          {messages.map((msg, index) => (
            <p key={index}><b>{msg.sender}:</b> {msg.text}</p>
          ))}
        </div>
        <div className="flex">
          <input 
            type="text" 
            value={message} 
            onChange={(e) => setMessage(e.target.value)} 
            placeholder="Type a message..." 
            className="flex-grow p-2 text-white rounded-md"
          />
          <button 
            onClick={sendMessage} 
            className="ml-2 p-2 bg-blue-600 hover:bg-blue-500 text-white rounded-md"
          >
            ➤ Send
          </button>
        </div>
      </div>
    </div>
  );
}
