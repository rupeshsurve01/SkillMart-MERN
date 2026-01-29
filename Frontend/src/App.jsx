import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginSignup from "./components/LoginSignup";
import Dashboard from "./Pages/Dashboard";
import Contact from "./Pages/Contact";
import PageNotFound from "./Pages/PageNotFound";
import CheckCourses from "./Pages/CheckCourses";
import CourseRegisterForm from "./components/CourseRegisterForm";
import MyCourses from "./Pages/MyCourses";
import ViewDetails from "./Pages/ViewDetails";
import CompareCourses from "./Pages/CompareCourses";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/login" element={<LoginSignup />} />
        <Route path="/" element={<Dashboard />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<PageNotFound />} />
        <Route path="/allcourses" element={<CheckCourses />} />
        <Route path="/register" element={<CourseRegisterForm />} />
        <Route path="/mycourses" element={<MyCourses />} />
        <Route path="/view/:id" element={<ViewDetails />} />
        <Route path="/compare" element={<CompareCourses />} />
      </Routes>
    </div>
  );
}

export default App;
