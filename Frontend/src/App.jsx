import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginSignup from "./components/LoginSignup";
import AddCourse from "./components/AddCourse";
import Dashboard from "./Pages/Dashboard";
import Contact from "./Pages/Contact";
import PageNotFound from "./Pages/PageNotFound";
import CheckCourses from "./Pages/CheckCourses";
// import { axios } from 'axios';


function App() {

  return (
    <div>
      <Routes>
        <Route path="/login" element={<LoginSignup />} />
        <Route path="/" element={<Dashboard />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<PageNotFound />} />
        <Route path="/allcourses" element={<CheckCourses />} />
      </Routes>
    </div>
  );
}

export default App;
