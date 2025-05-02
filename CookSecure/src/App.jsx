import { Routes, Route } from "react-router-dom";
import Connect from "./pages/Connect";
import Header from "./components/Header";
import Home from "./pages/Home";

export default function App() {
  return (
    <>
      <Header onSearch={(term) => console.log("Searching:", term)} />

      <Routes>
        <Route path="/*" element={<Connect />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </>
  );
}
