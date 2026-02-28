import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const CompareCourses = () => {
  const [courses, setCourses] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    

    const ids = JSON.parse(localStorage.getItem("compareCourses")) || [];


    Promise.all(
      ids.map((id) => axios.get(`https://skillmart-mern-backend.onrender.com/api/courses/${id}`)),
    ).then((responses) => {
      setCourses(responses.map((res) => res.data));
    });
  }, [token]);

  if (courses.length === 0) {
    return (
      <div className="min-h-screen p-0 bg-gray-200">
        <Navbar />

        <p className="text-center mt-20 text-xl h-screen">
          No courses selected for comparison
        </p>
          <Footer />
        </div>

    );
  }

  return (
   
    <div className="bg-gray-200 min-h-screen">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold mb-8 text-center">Compare Courses</h1>

        <div className="overflow-x-auto">
          <table className="w-full border border-gray-200 text-center">
            <thead className="bg-gray-300">
              <tr>
                <th className="p-4 border">Feature</th>
                {courses.map((c) => (
                  <th key={c._id} className="p-4 border">
                    {c.title}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {[
                ["Price", (c) => `₹ ${c.price}`],
                ["Language", (c) => c.language],
                ["Level", (c) => c.level],
                ["Duration", (c) => c.duration],
                ["Lectures", (c) => c.lectures],
                ["Institute", (c) => c.firm],
              ].map(([label, value]) => (
                <tr key={label}>
                  <td className="p-4 border font-semibold">{label}</td>
                  {courses.map((c) => (
                    <td key={c._id} className="p-4 border">
                      {value(c)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <button
          onClick={() => {
            localStorage.removeItem("compareCourses");
            setCourses([]);
          }}
          className="mt-6 bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600"
        >
          Clear Compare
        </button>
      </div>

      <Footer />
    </div>

  );
};

export default CompareCourses;
