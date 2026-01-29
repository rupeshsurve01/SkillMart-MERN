const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/db");
const courseRoutes = require("./routes/courseRoutes");

const app = express();

// CONNECT DATABASE
connectDB();

// middleware
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));


// routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/courses", require("./routes/courseRoutes"));
app.use("/api/courses", courseRoutes);

app.get("/", (req, res) => {
  res.send("SkillMart Backend Running 🚀");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
