import { Routes, Route } from "react-router-dom";
import Connect from "./pages/Connect";
import Home from "./pages/Home";

export default function App() {
  return (
    <Routes>
      <Route path="/*" element={<Connect />} />
      <Route path="/home" element={<Home />} />
    </Routes>
  );
}
