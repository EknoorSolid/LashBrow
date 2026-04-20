import { BrowserRouter, Routes, Route } from "react-router-dom";

import Form from "./Form"; // your existing form (rename if needed)
import Login from "./admin/Login";
import AdminDashboard from "./admin/AdminDashboard";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Form />} />
        <Route path="/admin/login" element={<Login />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}