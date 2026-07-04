import { toast } from "react-toastify";
import React, { useEffect, useState, useContext } from "react";
import {
  getStudents,
  deleteStudent,
  updateStudent,
  addStudent
} from "../services/api";

// 🔥 EXPORT LIBRARIES
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import "jspdf-autotable";

// 🔥 CONTEXT
import { SearchContext } from "../context/SearchContext";

function StudentList() {
  const [students, setStudents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null);

  // ❌ REMOVE LOCAL SEARCH
  // const [search, setSearch] = useState("");

  // ✅ USE GLOBAL SEARCH
  const { search } = useContext(SearchContext);

  const [currentPage, setCurrentPage] = useState(1);
  const studentsPerPage = 5;

 const [formData, setFormData] = useState({
  name: "",
  email: "",
  course: "",
  year: "",
  attendance: "",
  feesStatus: "",
  marks: ""
});

  const fetchStudents = async () => {
    const res = await getStudents();
    setStudents(res.data.data || []);
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  // 🔥 DELETE
  const handleDelete = async (id) => {
    if (!window.confirm("Delete student?")) return;
    await deleteStudent(id);
    toast.success("Student Deleted Successfully");
    fetchStudents();
  };

  // 🔥 EDIT
  const handleEdit = (student) => {
    setEditId(student.id);
    setFormData(student);
    setShowModal(true);
  };

 const handleSubmit = async () => {
  if (
    !formData.name ||
    !formData.email ||
    !formData.course ||
    !formData.year ||
    !formData.attendance ||
    !formData.feesStatus ||
    !formData.marks
  ) {
    alert("All fields required");
    return;
  }

  try {
    if (editId) {
      await updateStudent(editId, formData);
      toast.success("Student Updated Successfully");
    } else {
      await addStudent(formData);
      toast.success("Student Added Successfully");
    }

    setShowModal(false);
    setEditId(null);

    setFormData({
      name: "",
      email: "",
      course: "",
      year: "",
      attendance: "",
      feesStatus: "",
      marks: ""
    });

    fetchStudents();
  } catch (error) {
    console.error(error);
    toast.error("Operation Failed");
  }
};

  // 🔍 GLOBAL SEARCH FILTER (FIXED)
  const filteredStudents = students.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase())
  );

  // 📄 PAGINATION
  const indexOfLast = currentPage * studentsPerPage;
  const indexOfFirst = indexOfLast - studentsPerPage;
  const currentStudents = filteredStudents.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredStudents.length / studentsPerPage);

  // 🔥 EXPORT EXCEL
  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(students);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Students");

    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const file = new Blob([excelBuffer], { type: "application/octet-stream" });

    saveAs(file, "students.xlsx");
  };

  // 🔥 EXPORT PDF
  const exportToPDF = () => {
    const doc = new jsPDF();

    doc.text("Student List", 14, 10);

    const tableData = students.map((s) => [
      s.id,
      s.name,
      s.email,
      s.course,
      s.year
    ]);

    doc.autoTable({
      head: [["ID", "Name", "Email", "Course", "Year"]],
      body: tableData,
    });

    doc.save("students.pdf");
  };

  return (
    <div>

      {/* 🔥 HEADER */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>🎓 Student Management</h3>

        <div>
          <button className="btn btn-success me-2" onClick={exportToExcel}>
            Export Excel
          </button>

          <button className="btn btn-danger me-2" onClick={exportToPDF}>
            Export PDF
          </button>

          <button
            className="btn btn-primary"
            onClick={() => setShowModal(true)}
          >
            ➕ Add Student
          </button>
        </div>
      </div>

      {/* ❌ REMOVE THIS SEARCH INPUT (HEADER USE KAR RAHE HAI) */}

      {/* 🔥 TABLE */}
      <div className="chart-card">
        <table className="table table-hover">
          <thead>
  <tr>
    <th>ID</th>
    <th>Name</th>
    <th>Email</th>
    <th>Course</th>
    <th>Year</th>
    <th>Attendance</th>
    <th>Fees</th>
    <th>Marks</th>
    <th>Actions</th>
  </tr>
</thead>

          <tbody>
            {currentStudents.length > 0 ? (
              currentStudents.map((s) => (
                <tr key={s.id}>
                  <td>{s.id}</td>
<td>{s.name}</td>
<td>{s.email}</td>
<td>{s.course}</td>
<td>{s.year}</td>
<td>{s.attendance}</td>
<td>{s.feesStatus}</td>
<td>{s.marks}</td>

                  <td>
                    <button
                      className="btn btn-warning btn-sm me-2"
                      onClick={() => handleEdit(s)}
                    >
                      Edit
                    </button>

                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(s.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
              <td colSpan="9" className="text-center">
                  No Students Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* 📄 PAGINATION */}
      <div className="d-flex justify-content-center mt-3">

        <button
          className="btn btn-secondary me-2"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          Prev
        </button>

        <span style={{ padding: "8px" }}>
          Page {currentPage} of {totalPages || 1}
        </span>

        <button
          className="btn btn-secondary ms-2"
          disabled={currentPage === totalPages || totalPages === 0}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          Next
        </button>

      </div>

 {showModal && (
  <div className="modal-overlay">
    <div className="modal-box">

      <h4>
        {editId ? "Update Student" : "Add Student"}
      </h4>

      <input
        className="form-control mb-2"
        placeholder="Name"
        value={formData.name}
        onChange={(e) =>
          setFormData({
            ...formData,
            name: e.target.value
          })
        }
      />

      <input
        className="form-control mb-2"
        placeholder="Email"
        value={formData.email}
        onChange={(e) =>
          setFormData({
            ...formData,
            email: e.target.value
          })
        }
      />

      <input
        className="form-control mb-2"
        placeholder="Course"
        value={formData.course}
        onChange={(e) =>
          setFormData({
            ...formData,
            course: e.target.value
          })
        }
      />

      <input
        className="form-control mb-2"
        placeholder="Year"
        value={formData.year}
        onChange={(e) =>
          setFormData({
            ...formData,
            year: e.target.value
          })
        }
      />

      <input
        className="form-control mb-2"
        placeholder="Attendance (Example: 85%)"
        value={formData.attendance}
        onChange={(e) =>
          setFormData({
            ...formData,
            attendance: e.target.value
          })
        }
      />

      <select
        className="form-control mb-2"
        value={formData.feesStatus}
        onChange={(e) =>
          setFormData({
            ...formData,
            feesStatus: e.target.value
          })
        }
      >
        <option value="">Select Fees Status</option>
        <option value="Paid">Paid</option>
        <option value="Pending">Pending</option>
      </select>

      <input
        className="form-control mb-3"
        placeholder="Marks"
        value={formData.marks}
        onChange={(e) =>
          setFormData({
            ...formData,
            marks: e.target.value
          })
        }
      />

      <button
        className="btn btn-primary me-2"
        onClick={handleSubmit}
      >
        Save
      </button>

      <button
        className="btn btn-secondary"
        onClick={() => {
          setShowModal(false);
          setEditId(null);
        }}
      >
        Cancel
      </button>

    </div>
  </div>
)}

    </div>
  );
}

export default StudentList;