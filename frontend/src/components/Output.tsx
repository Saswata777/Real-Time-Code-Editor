import { useState } from "react";
import { Box, Button, Text, useToast } from "@chakra-ui/react";
import { executeCode } from "../api";
import { LANGUAGE_VERSIONS } from "../constants";
import type * as monaco from "monaco-editor";

interface OutputProps {
  editorRef: React.MutableRefObject<monaco.editor.IStandaloneCodeEditor | null>;
  language: keyof typeof LANGUAGE_VERSIONS;
}

const Output = ({ editorRef, language }: OutputProps) => {
  const toast = useToast();

  const [output, setOutput] = useState<string[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const runCode = async () => {
    const sourceCode = editorRef.current?.getValue();
    if (!sourceCode) return;

    try {
      setIsLoading(true);
      const response = await executeCode(language, sourceCode);
      const result = response.run;

      setOutput(result.output.split("\n"));
      setIsError(Boolean(result.stderr));
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Unable to run code";

      toast({
        title: "An error occurred.",
        description: message,
        status: "error",
        duration: 6000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box w="95%">
      <Text mb={2} fontSize="lg">
        Output
      </Text>

      <Button
        variant="outline"
        colorScheme="green"
        mb={4}
        isLoading={isLoading}
        onClick={runCode}
      >
        Run Code
      </Button>

      <Box
        height="75vh"
        p={2}
        color={isError ? "red.400" : ""}
        border="1px solid"
        borderRadius={4}
        borderColor={isError ? "red.500" : "#333"}
      >
        {output
          ? output.map((line, i) => <Text key={i}>{line}</Text>)
          : 'Click "Run Code" to see the output here'}
      </Box>
    </Box>
  );
};

export default Output;
