import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Blog from "./pages/Blog";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Blog />} />
      <Route path="/home" element={<Home />} />
    </Routes>
  );
}
