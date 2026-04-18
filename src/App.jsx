import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Blog from "./pages/Blog";
import AkshayaTritiya from "./pages/AkshayaTritiya";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Blog />} />
      <Route path="/home" element={<Home />} />
      <Route path="/festivals/akshayatritiya" element={<AkshayaTritiya />} />
    </Routes>
  );
}
