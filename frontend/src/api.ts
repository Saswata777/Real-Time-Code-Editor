// import axios from "axios";
// import { LANGUAGE_VERSIONS } from "./constants";

// const API = axios.create({
//   baseURL: "https://emkc.org/api/v2/piston",
// });

// export const executeCode = async (language, sourceCode) => {
//   const response = await API.post("/execute", {
//     language: language,
//     version: LANGUAGE_VERSIONS[language],
//     files: [
//       {
//         content: sourceCode,
//       },
//     ],
//   });
//   return response.data;
// };


import axios from "axios";
import { LANGUAGE_VERSIONS } from "./constants";

export interface ExecuteResult {
  run: {
    stdout: string;
    stderr: string;
    output: string;
    code: number;
  };
}

const API = axios.create({
  baseURL: "https://emkc.org/api/v2/piston",
});

export const executeCode = async (
  language: keyof typeof LANGUAGE_VERSIONS,
  sourceCode: string
): Promise<ExecuteResult> => {
  const response = await API.post("/execute", {
    language,
    version: LANGUAGE_VERSIONS[language],
    files: [{ content: sourceCode }],
  });

  return response.data;
};
