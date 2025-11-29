// import { useRef, useState, useEffect } from "react";
// import { Box } from "@chakra-ui/react";
// import { Editor } from "@monaco-editor/react";
// import type { OnMount } from "@monaco-editor/react";
// import type * as monaco from "monaco-editor";

// import LanguageSelector from "./LanguageSelector";
// import { CODE_SNIPPETS, LANGUAGE_VERSIONS } from "../constants";
// import Output from "./Output";

// import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";

// import { connectWS, sendWSMessage } from "../ws";

// type Language = keyof typeof LANGUAGE_VERSIONS;

// const CodeEditor = () => {
//   const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);

//   const [value, setValue] = useState<string>("");
//   const [language, setLanguage] = useState<Language>("python");

//   const onMount: OnMount = (editor) => {
//     editorRef.current = editor;
//     editor.focus();
//   };

//   const onSelect = (lang: Language) => {
//     setLanguage(lang);
//     setValue(CODE_SNIPPETS[lang]);
//   };

//   useEffect(() => {
//     const socket = connectWS("a1b2c3d4");

//     socket.onmessage = (event) => {
//       const data = JSON.parse(event.data);

//       if (data.type === "INIT") {
//         setValue(data.code);
//         if (editorRef.current) {
//           editorRef.current.setValue(data.code);
//         }
//         return;
//       }

//       if (data.type === "CODE_UPDATE") {
//         if (editorRef.current && data.code !== editorRef.current.getValue()) {
//           editorRef.current.setValue(data.code);
//         }
//       }
//     };

//     return () => {
//       socket.close();
//     };
//   }, []);

//   const typingTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

//   const handleChange = (val: string | undefined) => {
//     const text = val ?? "";
//     setValue(text);

//     if (typingTimeout.current) clearTimeout(typingTimeout.current);

//     typingTimeout.current = setTimeout(() => {
//       sendWSMessage({
//         type: "CODE_UPDATE",
//         code: text,
//         language,
//       });
//     }, 150);
//   };

//   return (
//     <Box>
//       {/* <HStack spacing={4}> */}
//       <PanelGroup direction="horizontal">
//         <Panel defaultSize={50} minSize={20}>
//           <Box w="95%">
//             <LanguageSelector language={language} onSelect={onSelect} />

//             <Editor
//               options={{
//                 minimap: { enabled: false },
//               }}
//               height="75vh"
//               theme="vs-dark"
//               language={language}
//               defaultValue={CODE_SNIPPETS[language]}
//               onMount={onMount}
//               value={value}
//               onChange={handleChange}
//             />
//           </Box>
//         </Panel>

//         <PanelResizeHandle className="resize-handle" />

//         <Panel defaultSize={50} minSize={20}>
//           <Output editorRef={editorRef} language={language} />
//         </Panel>
//       </PanelGroup>
//       {/* </HStack> */}
//     </Box>
//   );
// };

// export default CodeEditor;

import { useRef, useState, useEffect } from "react";
import { Box } from "@chakra-ui/react";
import { Editor } from "@monaco-editor/react";
import type { OnMount } from "@monaco-editor/react";
import type * as monaco from "monaco-editor";
import { useParams } from "react-router-dom";

import LanguageSelector from "./LanguageSelector";
import { CODE_SNIPPETS, LANGUAGE_VERSIONS } from "../constants";
import Output from "./Output";

import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";

import { connectWS, sendWSMessage } from "../ws";

type Language = keyof typeof LANGUAGE_VERSIONS;

const CodeEditor = () => {
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);

  const [value, setValue] = useState<string>("");
  const [language, setLanguage] = useState<Language>("python");

  // Monaco Editor mount
  const onMount: OnMount = (editor) => {
    editorRef.current = editor;
    editor.focus();
  };

  // When user selects a language
  const onSelect = (lang: Language) => {
    setLanguage(lang);
    const snippet = CODE_SNIPPETS[lang];
    setValue(snippet);

    if (editorRef.current) {
      editorRef.current.setValue(snippet);
    }
  };
const { roomId } = useParams();
  
  // WebSocket connection
  useEffect(() => {
    // 1. Safety check: Don't connect if roomId is missing
    if (!roomId) return; 

    // 2. Pass the dynamic roomId instead of "a1b2c3d4"
    const socket = connectWS(roomId); 

    socket.onopen = () => {
      console.log("WS Connected to room:", roomId);
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);

      if (data.type === "INIT") {
        setValue(data.code);
        editorRef.current?.setValue(data.code);
      }

      if (data.type === "CODE_UPDATE") {
        if (editorRef.current) {
          const current = editorRef.current.getValue();
          if (current !== data.code) {
            editorRef.current.setValue(data.code);
          }
        }
      }
    };

    socket.onerror = (err) => {
      console.error("WebSocket Error:", err);
    };

    return () => {
      socket.close();
    };
  }, [roomId]);

  // debounce for typing
  // const typingTimeout = useRef<NodeJS.Timeout | null>(null);
  const typingTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleChange = (val: string | undefined) => {
    const text = val ?? "";
    setValue(text);

    // clear timeout
    if (typingTimeout.current) clearTimeout(typingTimeout.current);

    // resend WS update after small delay
    typingTimeout.current = setTimeout(() => {
      sendWSMessage({
        type: "CODE_UPDATE",
        code: text,
        language,
      });
    }, 150);
  };

  return (
    <Box>
      <PanelGroup direction="horizontal">
        <Panel defaultSize={50} minSize={20}>
          <Box w="95%">
            <LanguageSelector language={language} onSelect={onSelect} />

            <Editor
              options={{
                minimap: { enabled: false },
              }}
              height="75vh"
              theme="vs-dark"
              language={language}
              value={value}
              onMount={onMount}
              onChange={handleChange}
            />
          </Box>
        </Panel>

        <PanelResizeHandle className="resize-handle" />

        <Panel defaultSize={50} minSize={20}>
          <Output editorRef={editorRef} language={language} />
        </Panel>
      </PanelGroup>
    </Box>
  );
};

export default CodeEditor;
