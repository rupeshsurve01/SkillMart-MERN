const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/db");
const courseRoutes = require("./routes/courseRoutes");
const enrollRoutes = require("./routes/enrollRoutes");
const adminRoutes = require("./routes/adminRoutes");
const wishlistRoutes = require("./routes/wishlistRoutes")

const app = express();

// CONNECT DATABASE
connectDB();

// middleware
app.use(cors({
  origin: [
    "http://localhost:5173", // local dev (if using Vite)
    "https://skillmart-mern-frontend.onrender.com"
  ],
  credentials: true
}));

// const allowedOrigins = [
//   "http://localhost:5173",
//   "https://skillmart-mern-frontend.onrender.com"
// ];

// app.use(cors({
//   origin: function (origin, callback) {
//     if (!origin || allowedOrigins.includes(origin)) {
//       callback(null, true);
//     } else {
//       callback(new Error("Not allowed by CORS"));
//     }
//   }
// }));
app.use(express.json());
app.use("/uploads", express.static("uploads"));

// routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/courses", courseRoutes);
app.use("/api/enroll", enrollRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/wishlist", wishlistRoutes);

app.get("/", (req, res) => {
  res.send("SkillMart Backend Running 🚀");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
