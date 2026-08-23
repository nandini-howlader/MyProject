import { useEffect, useState } from "react";
import "./App.css";

const API_URL = "http://localhost:5000/api/students";

function App() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    student_id: "",
    email: "",
    department: "",
    attendance: 0,
  });

  const [editingId, setEditingId] = useState(null);

  // =========================
  // GET - Read Students
  // =========================
  const fetchStudents = async () => {
    try {
      setLoading(true);

      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error("Failed to fetch students");
      }

      const data = await response.json();

      setStudents(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("GET Error:", error);
      alert(
        "Cannot connect to backend!\nMake sure backend is running on port 5000."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  // =========================
  // Handle Input
  // =========================
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // =========================
  // POST - Create
  // PUT - Update
  // =========================
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const url = editingId
        ? `${API_URL}/${editingId}`
        : API_URL;

      const method = editingId ? "PUT" : "POST";

      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: form.name,
          student_id: form.student_id,
          email: form.email,
          department: form.department,
          attendance: Number(form.attendance),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Operation failed");
        return;
      }

      if (editingId) {
        alert("Student updated successfully!");
      } else {
        alert("Student added successfully!");
      }

      resetForm();

      fetchStudents();

    } catch (error) {
      console.error("POST/PUT Error:", error);

      alert(
        "Cannot connect to backend!\nMake sure backend is running on port 5000."
      );
    }
  };

  // =========================
  // Edit Student
  // =========================
  const handleEdit = (student) => {
    setEditingId(student.id);

    setForm({
      name: student.name || "",
      student_id: student.student_id || "",
      email: student.email || "",
      department: student.department || "",
      attendance: student.attendance ?? 0,
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // =========================
  // DELETE Student
  // =========================
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this student?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Delete failed");
        return;
      }

      alert("Student deleted successfully!");

      fetchStudents();

    } catch (error) {
      console.error("DELETE Error:", error);

      alert(
        "Cannot connect to backend!\nMake sure backend is running on port 5000."
      );
    }
  };

  // =========================
  // Reset Form
  // =========================
  const resetForm = () => {
    setForm({
      name: "",
      student_id: "",
      email: "",
      department: "",
      attendance: 0,
    });

    setEditingId(null);
  };

  return (
    <div className="app">

      {/* HEADER */}
      <header className="header">

        <div>
          <h1>Student Attendance Management System</h1>

          <p>
            Manage students and attendance records
          </p>
        </div>

      </header>

      <main className="container">

        {/* STATISTICS */}
        <div className="stats">

          <div className="stat-card">
            <h3>Total Students</h3>
            <p>{students.length}</p>
          </div>

          <div className="stat-card">
            <h3>Good Attendance</h3>

            <p>
              {
                students.filter(
                  (student) =>
                    Number(student.attendance) >= 75
                ).length
              }
            </p>

          </div>

          <div className="stat-card">
            <h3>Low Attendance</h3>

            <p>
              {
                students.filter(
                  (student) =>
                    Number(student.attendance) < 75
                ).length
              }
            </p>

          </div>

        </div>

        {/* ADD / UPDATE FORM */}
        <section className="card">

          <h2>
            {editingId
              ? "Update Student"
              : "Add New Student"}
          </h2>

          <form onSubmit={handleSubmit}>

            <div className="form-grid">

              <div>
                <label>Student Name</label>

                <input
                  type="text"
                  name="name"
                  placeholder="Enter student name"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label>Student ID</label>

                <input
                  type="text"
                  name="student_id"
                  placeholder="Enter student ID"
                  value={form.student_id}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label>Email</label>

                <input
                  type="email"
                  name="email"
                  placeholder="Enter email"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label>Department</label>

                <input
                  type="text"
                  name="department"
                  placeholder="Enter department"
                  value={form.department}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label>Attendance (%)</label>

                <input
                  type="number"
                  name="attendance"
                  min="0"
                  max="100"
                  value={form.attendance}
                  onChange={handleChange}
                />
              </div>

            </div>

            <div className="form-buttons">

              <button
                type="submit"
                className="btn-primary"
              >
                {editingId
                  ? "Update Student"
                  : "Add Student"}
              </button>

              {editingId && (

                <button
                  type="button"
                  className="btn-cancel"
                  onClick={resetForm}
                >
                  Cancel
                </button>

              )}

            </div>

          </form>

        </section>

        {/* STUDENT TABLE */}
        <section className="card">

          <div className="table-header">

            <div>

              <h2>Student Records</h2>

              <p>
                Data retrieved from MySQL database
              </p>

            </div>

            <button
              className="btn-refresh"
              onClick={fetchStudents}
            >
              Refresh
            </button>

          </div>

          {loading ? (

            <div className="empty">
              <h3>Loading students...</h3>
            </div>

          ) : students.length === 0 ? (

            <div className="empty">

              <h3>No Students Found</h3>

              <p>
                Add a student using the form above.
              </p>

            </div>

          ) : (

            <div className="table-container">

              <table>

                <thead>

                  <tr>

                    <th>ID</th>

                    <th>Name</th>

                    <th>Student ID</th>

                    <th>Email</th>

                    <th>Department</th>

                    <th>Attendance</th>

                    <th>Actions</th>

                  </tr>

                </thead>

                <tbody>

                  {students.map((student) => (

                    <tr key={student.id}>

                      <td>{student.id}</td>

                      <td>
                        <strong>
                          {student.name}
                        </strong>
                      </td>

                      <td>
                        {student.student_id}
                      </td>

                      <td>
                        {student.email}
                      </td>

                      <td>
                        {student.department}
                      </td>

                      <td>

                        <span
                          className={
                            Number(student.attendance) >= 75
                              ? "attendance good"
                              : "attendance low"
                          }
                        >
                          {student.attendance}%
                        </span>

                      </td>

                      <td>

                        <button
                          className="btn-edit"
                          onClick={() =>
                            handleEdit(student)
                          }
                        >
                          Edit
                        </button>

                        <button
                          className="btn-delete"
                          onClick={() =>
                            handleDelete(student.id)
                          }
                        >
                          Delete
                        </button>

                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          )}

        </section>

      </main>

    </div>
  );
}

export default App;