const db = require("../config/db");

const Student = {
    // CREATE
    create: (student, callback) => {
        const sql = `
            INSERT INTO students
            (name, student_id, email, department, attendance)
            VALUES (?, ?, ?, ?, ?)
        `;

        const values = [
            student.name,
            student.student_id,
            student.email,
            student.department,
            student.attendance
        ];

        db.query(sql, values, callback);
    },

    // READ ALL
    getAll: (callback) => {
        const sql = "SELECT * FROM students";
        db.query(sql, callback);
    },

    // READ BY ID
    getById: (id, callback) => {
        const sql = "SELECT * FROM students WHERE id = ?";
        db.query(sql, [id], callback);
    },

    // UPDATE
    update: (id, student, callback) => {
        const sql = `
            UPDATE students
            SET name = ?, student_id = ?, email = ?, department = ?, attendance = ?
            WHERE id = ?
        `;

        const values = [
            student.name,
            student.student_id,
            student.email,
            student.department,
            student.attendance,
            id
        ];

        db.query(sql, values, callback);
    },

    // DELETE
    delete: (id, callback) => {
        const sql = "DELETE FROM students WHERE id = ?";
        db.query(sql, [id], callback);
    }
};

module.exports = Student;