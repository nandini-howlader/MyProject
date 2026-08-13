const Student = require("../models/studentModel");

// CREATE
const createStudent = (req, res) => {
    const student = {
        name: req.body.name,
        student_id: req.body.student_id,
        email: req.body.email,
        department: req.body.department,
        attendance: req.body.attendance
    };

    Student.create(student, (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({
                message: "Failed to create student"
            });
        }

        res.status(201).json({
            message: "Student created successfully",
            id: result.insertId
        });
    });
};

// READ ALL
const getAllStudents = (req, res) => {
    Student.getAll((err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({
                message: "Failed to get students"
            });
        }

        res.status(200).json(results);
    });
};

// READ BY ID
const getStudentById = (req, res) => {
    const id = req.params.id;

    Student.getById(id, (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({
                message: "Failed to get student"
            });
        }

        if (results.length === 0) {
            return res.status(404).json({
                message: "Student not found"
            });
        }

        res.status(200).json(results[0]);
    });
};

// UPDATE
const updateStudent = (req, res) => {
    const id = req.params.id;

    const student = {
        name: req.body.name,
        student_id: req.body.student_id,
        email: req.body.email,
        department: req.body.department,
        attendance: req.body.attendance
    };

    Student.update(id, student, (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({
                message: "Failed to update student"
            });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: "Student not found"
            });
        }

        res.status(200).json({
            message: "Student updated successfully"
        });
    });
};

// DELETE
const deleteStudent = (req, res) => {
    const id = req.params.id;

    Student.delete(id, (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({
                message: "Failed to delete student"
            });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: "Student not found"
            });
        }

        res.status(200).json({
            message: "Student deleted successfully"
        });
    });
};

module.exports = {
    createStudent,
    getAllStudents,
    getStudentById,
    updateStudent,
    deleteStudent
};