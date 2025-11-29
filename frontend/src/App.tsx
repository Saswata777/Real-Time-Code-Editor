import { BrowserRouter, Routes, Route } from "react-router-dom";
import JoinRoom from "./components/JoinRoom";
import EditorPage from "./components/EditorPage";
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<JoinRoom />} />
        <Route path="/editor/:roomId" element={<EditorPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
