"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";

const Peer = dynamic(() => import("peerjs"), { ssr: false });

const mentors = [
  {
    id: "mentor1",
    name: "Vrinda",
    linkedin: "https://www.linkedin.com/in/vrinda-bindal-55b645349/",
    Designation: "Software Engineer",
  },
  {
    id: "mentor2",
    name: "Pulkit",
    linkedin: "https://www.linkedin.com/in/pulkit-arora-92502321a/",
    Designation: "Reserach Intern",
  },
  {
    id: "mentor3",
    name: "Kartikey",
    linkedin: "https://www.linkedin.com/in/kartikey-srivastava-8b9139252/",
    Designation: "Business Aanlyst",
  },
];

export default function VideoCall() {
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const [peerId, setPeerId] = useState("");
  const [otherPeerId, setOtherPeerId] = useState("");
  const peerInstance = useRef(null);

  useEffect(() => {
    const initializePeer = async () => {
      const PeerJS = (await import("peerjs")).default;
      peerInstance.current = new PeerJS();

      peerInstance.current.on("open", (id) => {
        setPeerId(id);
        console.log("Your Peer ID:", id);
      });

      peerInstance.current.on("call", async (call) => {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
        localVideoRef.current.srcObject = stream;
        call.answer(stream);

        call.on("stream", (remoteStream) => {
          remoteVideoRef.current.srcObject = remoteStream;
        });
      });
    };

    initializePeer();
  }, []);

  const startCall = async () => {
    if (!otherPeerId) return alert("Enter a valid Peer ID!");

    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });
    localVideoRef.current.srcObject = stream;

    const call = peerInstance.current.call(otherPeerId, stream);

    call.on("stream", (remoteStream) => {
      remoteVideoRef.current.srcObject = remoteStream;
    });
  };

  return (
    <div className="text-center p-6 mt-20">
      <h1 className="text-3xl font-bold mb-4"> Mentor-User Video Call</h1>
      <h3 className="text-xl font-semibold">
        Your Peer ID: <b>{peerId}</b>
      </h3>
      <p className="text-gray-600">🔗 Share this ID to receive calls</p>

      <h2 className="text-2xl font-semibold mt-6">
        🔹 Connect to a Mentor/User
      </h2>
      <input
        type="text"
        placeholder="Enter Peer ID to call"
        value={otherPeerId}
        onChange={(e) => setOtherPeerId(e.target.value)}
        className="p-2 m-3 w-80 border rounded-md"
      />
      <button
        onClick={startCall}
        className="p-2 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600"
      >
        📞 Start Call
      </button>

      <h2 className="text-2xl font-semibold mt-6">🔹 Available Mentors</h2>
      <ul className="flex flex-wrap justify-center gap-4 mt-4">
        {mentors.map((mentor) => (
          <li
            key={mentor.id}
            className="p-4 border rounded-lg shadow-lg w-80 text-center"
          >
            <h3 className="text-xl font-bold">{mentor.name}</h3>
            <h2 className="text-lg font-semibold">{mentor.Designation}</h2>
            <a
              href={mentor.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline block mt-2 mb-3"
            >
              🔗 LinkedIn
            </a>
            <button
              onClick={() => setOtherPeerId(mentor.id)}
              className="p-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600"
            >
              📞 Copy ID to Call
            </button>
          </li>
        ))}
      </ul>

      <div className="mt-6">
        <h2 className="text-2xl font-semibold">📹 Video Call</h2>
        <div className="flex justify-center gap-4 mt-4">
          <video
            ref={localVideoRef}
            autoPlay
            playsInline
            muted
            className="w-1/2 border rounded-lg"
          />
          <video
            ref={remoteVideoRef}
            autoPlay
            playsInline
            className="w-1/2 border rounded-lg"
          />
        </div>
      </div>
    </div>
  );
}
