// import React, { useState } from "react";
// import {
//   Box,
//   Button,
//   Flex,
//   Input,
//   Text,
//   VStack,
//   useColorModeValue,
//   Link,
// } from "@chakra-ui/react";

// const JoinRoom: React.FC = () => {
//   const [roomId, setRoomId] = useState("");
//   const [username, setUsername] = useState("");

//   const handleJoin = () => {
//     if (!roomId || !username) return;
//     console.log("Joining room:", roomId, "User:", username);

//     // Navigate to /editor/:roomId
//     window.location.href = `/editor/${roomId}?u=${username}`;
//   };

//   return (
//     <Flex
//       height="100vh"
//       alignItems="center"
//       justifyContent="center"
//       bg="#0f172a" // dark background
//     >
//       <Box
//         bg={useColorModeValue("#1e293b", "#1e293b")}
//         p={8}
//         rounded="lg"
//         shadow="lg"
//         width="350px"
//       >
//         <VStack spacing={4} align="stretch">
//           <Text
//             fontSize="2xl"
//             color="white"
//             fontWeight="bold"
//             textAlign="center"
//             mb={4}
//           >
//             SYNC CODE
//           </Text>

//           <Input
//             placeholder="ROOM ID"
//             value={roomId}
//             onChange={(e) => setRoomId(e.target.value)}
//             bg="#334155"
//             border="none"
//             color="white"
//             _placeholder={{ color: "gray.400" }}
//           />

//           <Input
//             placeholder="USERNAME"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//             bg="#334155"
//             border="none"
//             color="white"
//             _placeholder={{ color: "gray.400" }}
//           />

//           <Button
//             bg="#38bdf8"
//             color="black"
//             _hover={{ bg: "#0ea5e9" }}
//             onClick={handleJoin}
//           >
//             JOIN
//           </Button>

//           <Text textAlign="center" color="gray.400" fontSize="sm">
//             If you don't have an invite code then create{" "}
//             <Link href="/new-room" color="#22c55e">
//               new room
//             </Link>
//           </Text>
//         </VStack>
//       </Box>
//     </Flex>
//   );
// };

// export default JoinRoom;

// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";

// const JoinRoom: React.FC = () => {
//   const [roomId, setRoomId] = useState("");
//   const [username, setUsername] = useState("");

//   const navigate = useNavigate();

//   const handleJoin = () => {
//     if (!roomId || !username) return;
//     navigate(`/editor/${roomId}?u=${username}`);
//   };

//   return (
//     <div className="h-screen flex items-center justify-center bg-[#0f172a]">
//       <div className="bg-[#1e293b] p-8 rounded-lg shadow-lg w-[350px]">
//         <div className="flex flex-col space-y-4">
//           <h1 className="text-2xl text-white font-bold text-center mb-4">
//             SYNC CODE
//           </h1>

//           {/* ROOM ID */}
//           <input
//             className="bg-[#334155] text-white border-none px-3 py-2 rounded placeholder-gray-400 outline-none"
//             placeholder="ROOM ID"
//             value={roomId}
//             onChange={(e) => setRoomId(e.target.value)}
//           />

//           {/* USERNAME */}
//           <input
//             className="bg-[#334155] text-white border-none px-3 py-2 rounded placeholder-gray-400 outline-none"
//             placeholder="USERNAME"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//           />

//           {/* JOIN BUTTON */}
//           <button
//             onClick={handleJoin}
//             className="bg-[#38bdf8] hover:bg-[#0ea5e9] text-black font-semibold py-2 rounded"
//           >
//             JOIN
//           </button>

//           {/* NEW ROOM LINK */}
//           <p className="text-center text-gray-400 text-sm">
//             If you don't have an invite code then create{" "}
//             <a href="/new-room" className="text-[#22c55e] hover:underline">
//               new room
//             </a>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default JoinRoom;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import NewRoomPopover from "./NewRoomPopover"; // Import the component above

const JoinRoom: React.FC = () => {
  const [roomId, setRoomId] = useState("");
  const [username, setUsername] = useState("");

  const navigate = useNavigate();

  const handleJoin = () => {
    if (!roomId || !username) return;
    navigate(`/editor/${roomId}?u=${username}`);
  };

  const handleEnter = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleJoin();
  };

  return (
    <div className="h-screen flex items-center justify-center bg-[#0f172a] text-white">
      <div className="bg-[#1e293b] p-8 rounded-lg shadow-xl w-full max-w-[400px]">
        {/* HEADER SECTION */}
        <div className="flex items-center justify-center mb-4">
          {/* Vertical Divider */}
          <div className="bg-gray-500"></div>

          <h1 className="text-xl font-bold tracking-widest uppercase">
            SYNC CODE
          </h1>
        </div>

        {/* FORM SECTION */}
        <div className="flex flex-col items-center justify-center w-full">
          <div className="bg-slate-400 shadow-md rounded-lg px-8 pt-6 pb-8 w-full max-w-md">
            <h2 className="text-xl font-bold text-gray-800 mb-6 text-center">
              Join a Room
            </h2>

            {/* ROOM ID */}
            <div className="mb-5">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Room ID
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter Room ID"
                value={roomId}
                onChange={(e) => setRoomId(e.target.value)}
                onKeyUp={handleEnter}
              />
            </div>

            {/* USERNAME */}
            <div className="mb-5">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Username
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onKeyUp={handleEnter}
              />
            </div>

            {/* JOIN BUTTON */}
            <div className="flex items-center justify-center mt-6 rounded-lg bg-blue-500 hover:bg-blue-600">
              <button
                onClick={handleJoin}
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded focus:outline-none focus:shadow-outline"
              >
                Join Room
              </button>
            </div>

            {/* NEW ROOM LINK */}
            <p className="text-center text-gray-500 text-sm mt-4">
              Don’t have a Room ID? Create one{" "}
              <span className="text-blue-500 cursor-pointer hover:underline">
                <NewRoomPopover />
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JoinRoom;
