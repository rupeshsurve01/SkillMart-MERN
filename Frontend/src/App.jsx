import { Routes, Route } from "react-router-dom";
import LoginSignup from "./components/LoginSignup";
import Dashboard from "./Pages/Dashboard";
import Contact from "./Pages/Contact";
import PageNotFound from "./Pages/PageNotFound";
import CheckCourses from "./Pages/CheckCourses";
import CourseRegisterForm from "./components/CourseRegisterForm";
import MyCourses from "./Pages/MyCourses";
import ViewDetails from "./Pages/ViewDetails";
import CompareCourses from "./Pages/CompareCourses";
import MyLearning from "./Pages/MyLearning";
import EditCourse from "./Pages/EditCourse";
import PrivateRoute from "./components/PrivateRoute";
import AdminDashboard from "./Pages/AdminDashboard";
import ViewForAdmin from "./Pages/ViewForAdmin";
import About from "./Pages/About";
import Wishlist from "./Pages/Wishlist";
import { ToastProvider } from "./components/ToastProvider";

function App() {
  return (
    <ToastProvider>
      <div>
        <Routes>
        <Route path="/login" element={<LoginSignup />} />
        <Route path="/" element={<Dashboard />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<PageNotFound />} />
        <Route path="/allcourses" element={<CheckCourses />} />
        <Route path="/about" element={<About />} />
        <Route path = "/wishlist" element={<Wishlist/>}/>

        <Route
          path="/register"
          element={
            <PrivateRoute>
              <CourseRegisterForm />
            </PrivateRoute>
          }
        />
        <Route
          path="/my-courses"
          element={
            <PrivateRoute>
              <MyCourses />
            </PrivateRoute>
          }
        />
        <Route
          path="/my-learning"
          element={
            <PrivateRoute>
              <MyLearning />
            </PrivateRoute>
          }
        />

        <Route path="/view/:id" element={<ViewDetails />} />
        <Route path="/compare" element={<CompareCourses />} />
        <Route
          path="/edit/:id"
          element={
            <PrivateRoute>
              <EditCourse />
            </PrivateRoute>
          }
        />

        <Route
          path="/admin"
          element={
            <PrivateRoute role="admin">
              <AdminDashboard />
            </PrivateRoute>
          }
        />

        <Route
          path="/admin/:id"
          element={
            <PrivateRoute role="admin">
              <ViewForAdmin />
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
    </ToastProvider>
  );
}

export default App;
