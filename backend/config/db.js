const mysql = require("mysql2");

const db = mysql.createConnection({
    host: "localhost",
    user: "attendance_user",
    password: "attendance_pass",
    database: "attendance_db",
    port: 3308
});

db.connect((err) => {
    if (err) {
        console.error("Database connection failed:", err.message);
        return;
    }

    console.log("MySQL Database Connected Successfully!");
});

module.exports = db;