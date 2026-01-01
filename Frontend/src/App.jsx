import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginSignup from "./components/LoginsSignup/LoginSignup";
import Dashboard from "./Pages/Dashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginSignup />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
