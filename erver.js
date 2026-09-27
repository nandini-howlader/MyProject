[1mdiff --git a/backend/server.js b/backend/server.js[m
[1mindex cd61eed..1e3b099 100644[m
[1m--- a/backend/server.js[m
[1m+++ b/backend/server.js[m
[36m@@ -3,16 +3,27 @@[m [mconst cors = require("cors");[m
 [m
 const app = express();[m
 [m
[31m-app.use(cors());[m
[32m+[m[32m// CORS - Allow only trusted frontend origin[m
[32m+[m[32mconst corsOptions = {[m
[32m+[m[32m    origin: "http://localhost:5173",[m
[32m+[m[32m    methods: ["GET", "POST", "PUT", "DELETE"],[m
[32m+[m[32m    allowedHeaders: ["Content-Type", "Authorization"][m
[32m+[m[32m};[m
[32m+[m
[32m+[m[32mapp.use(cors(corsOptions));[m
[32m+[m
 app.use(express.json());[m
 [m
[31m-require("./config/db");[m
[32m+[m[32m// Routes[m
 const studentRoutes = require("./routes/studentRoutes");[m
[31m-[m
 app.use("/api/students", studentRoutes);[m
 [m
[32m+[m[32mconst authRoutes = require("./routes/authRoutes");[m
[32m+[m[32mapp.use("/api/auth", authRoutes);[m
[32m+[m
[32m+[m[32m// Test route[m
 app.get("/", (req, res) => {[m
[31m-    res.json({ message: "Student Attendance API is running" });[m
[32m+[m[32m    res.send("Student Attendance API is running");[m
 });[m
 [m
 const PORT = 5000;[m
