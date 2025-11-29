// import { Box, VStack, Heading, Text, Button, HStack, Avatar, Divider } from "@chakra-ui/react";
// import { useParams, useSearchParams } from "react-router-dom";

// const Sidebar = () => {
//   return (
//     <Box
//       w="20%" 
//       h="100vh"
//       bg="#0f0a19" 
//       color="gray.400"
//       p={4}
//       borderRight="1px solid"
//       borderColor="gray.700"
//     >
//       <VStack align="stretch" spacing={6}>
       
//         <Heading size="md" color="white">
//           CodeCollab
//         </Heading>

//         <Divider borderColor="gray.700" />

//         {/* Room Actions */}
//         <VStack align="stretch" spacing={3}>
//           <Text fontSize="sm" fontWeight="bold">Room ID: a1b2c3d4</Text>
//           <HStack>
//             <Button colorScheme="blue" size="sm" width="full">
//               New Room
//             </Button>
//             <Button variant="outline" size="sm" width="full" colorScheme="gray">
//               Join Room
//             </Button>
//           </HStack>
//         </VStack>

//         <Divider borderColor="gray.700" />

//         {/* Connected Users List */}
//         <VStack align="stretch" spacing={4}>
//           <Text fontSize="sm" fontWeight="bold" color="white">Connected Users</Text>
          
//           {/* User 1 */}
//           <HStack>
//             <Avatar size="sm" name="Alice" src="https://bit.ly/dan-abramov" />
//             <Text fontSize="sm" fontWeight="bold">Alice (You)</Text>
//           </HStack>

//           {/* User 2 */}
//           <HStack>
//             <Avatar size="sm" name="Bob" bg="teal.500" />
//             <Text fontSize="sm" fontWeight="bold">Bob</Text>
//           </HStack>
//         </VStack>
//       </VStack>
//     </Box>
//   );
// };

// export default Sidebar;

// import React from "react";
import { 
  Box, 
  VStack, 
  Heading, 
  Text, 
  Button, 
  HStack, 
  Avatar, 
  Divider,
  useToast
} from "@chakra-ui/react";
import { useParams, useSearchParams } from "react-router-dom"; // 1. Import hooks

const Sidebar = () => {
  // 2. Get roomId from the URL path (assuming route is /editor/:roomId)
  const { roomId } = useParams();

  // 3. Get username from the URL query parameter (?u=username)
  const [searchParams] = useSearchParams();
  const username = searchParams.get("u") || "Guest"; 

  const toast = useToast();

  const copyRoomId = () => {
    if (roomId) {
      navigator.clipboard.writeText(roomId);
      toast({
        title: "Room ID copied.",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  return (
    <Box
      w="20%" 
      h="100vh"
      bg="#0f0a19" 
      color="gray.400"
      p={4}
      borderRight="1px solid"
      borderColor="gray.700"
    >
      <VStack align="stretch" spacing={6}>
       
        <Heading size="md" color="white">
          CodeCollab
        </Heading>

        <Divider borderColor="gray.700" />

        {/* Room Actions */}
        <VStack align="stretch" spacing={3}>
          {/* 4. Display the dynamic Room ID */}
          <Text fontSize="sm" fontWeight="bold">
            Room ID: <Text as="span" color="white">{roomId}</Text>
          </Text>
          
          <HStack>
            <Button colorScheme="blue" size="sm" width="full" onClick={copyRoomId}>
              Copy ID
            </Button>
            <Button variant="outline" size="sm" width="full" colorScheme="gray">
              Leave
            </Button>
          </HStack>
        </VStack>

        <Divider borderColor="gray.700" />

        {/* Connected Users List */}
        <VStack align="stretch" spacing={4}>
          <Text fontSize="sm" fontWeight="bold" color="white">Connected Users</Text>
          
          {/* 5. Display the current user dynamically */}
          <HStack>
            {/* Using name prop generates initials automatically */}
            <Avatar size="sm" name={username} src="" bg="teal.500" />
            <Text fontSize="sm" fontWeight="bold" color="white">
              {username} <Text as="span" color="gray.500">(You)</Text>
            </Text>
          </HStack>

          {/* Placeholder for other users (This usually comes from your WebSocket list later) */}
          <HStack opacity={0.5}>
            <Avatar size="sm" name="Bob Smith" src="https://bit.ly/dan-abramov" />
            <Text fontSize="sm" fontWeight="bold">Bob</Text>
          </HStack>
        </VStack>
      </VStack>
    </Box>
  );
};

export default Sidebar;