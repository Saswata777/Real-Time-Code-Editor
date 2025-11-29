import { Box, HStack } from "@chakra-ui/react";
import Sidebar from "./Sidebar";
import CodeEditor from "./CodeEditor";

const EditorPage = () => {
  return (
    <Box minH="100vh" bg="#0f0a19" color="gray.500">
      <HStack spacing={0} align="stretch">
        <Sidebar />
        <Box flex={1} p={4}>
          <CodeEditor />
        </Box>
      </HStack>
    </Box>
  );
};

export default EditorPage;
