const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

require("./config/db");
const studentRoutes = require("./routes/studentRoutes");

app.use("/api/students", studentRoutes);

app.get("/", (req, res) => {
    res.json({ message: "Student Attendance API is running" });
});

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});