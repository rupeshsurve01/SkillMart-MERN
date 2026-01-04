import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginSignup from "./components/LoginsSignup/LoginSignup";
import AddCourse from "./components/AddCourse";
import Dashboard from "./Pages/Dashboard";

function App() {
  return (
    
    <AddCourse />
    // <BrowserRouter>
    //   <Routes>
    //     <Route path="/" element={<LoginSignup />} />
    //     <Route path="/dashboard" element={<Dashboard />} />
    //   </Routes>
    // </BrowserRouter>
    
  );
}

export default App;
