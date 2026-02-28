import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const EditCourse = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [courseData, setCourseData] = useState({});
  const [thumbnail, setThumbnail] = useState(null);

  useEffect(() => {
    fetch(`https://skillmart-mern-backend.onrender.com/api/courses/${id}`)
      .then((res) => res.json())
      .then((data) => setCourseData(data));
  }, [id]);

  const handleChange = (e) => {
    setCourseData({
      ...courseData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const seller = localStorage.getItem("userId");

    const formData = new FormData();
    Object.keys(courseData).forEach((key) => {
      formData.append(key, courseData[key]);
    });

formData.append("sellerId", seller);

    if (thumbnail) {
      formData.append("thumbnail", thumbnail);
    }

    const res = await fetch(`https://skillmart-mern-backend.onrender.com/api/courses/${id}`, {
      method: "PUT",
      body: formData,
    });

    const data = await res.json();
    alert(data.message);

    if (res.ok) {
      navigate("/my-courses");
    }
  };

  return (
    <>
      <Navbar />
      <div className="max-w-2xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6">Edit Course</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="title"
            value={courseData.title || ""}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />

          <input
            name="price"
            value={courseData.price || ""}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />

          <textarea
            name="shortDesc"
            value={courseData.shortDesc || ""}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />

          <input
            type="file"
            onChange={(e) => setThumbnail(e.target.files[0])}
          />

          <button className="w-full bg-blue-600 text-white py-2 rounded">
            Update Course
          </button>
        </form>
      </div>
    </>
  );
};

export default EditCourse;
