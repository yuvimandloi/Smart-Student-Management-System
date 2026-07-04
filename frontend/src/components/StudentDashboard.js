import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function StudentDashboard() {

  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const [student, setStudent] = useState(null);

useEffect(() => {
  loadStudentData();
}, []);

const loadStudentData = async () => {
  try {

    const res = await axios.get(
      `http://localhost:8089/students/profile/${user.username}`
    );

    setStudent(res.data);

  } catch (error) {
    console.log(error);
  }
};

  const logout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  if (!student) {
  return (
    <h2
      style={{
        color: "white",
        textAlign: "center",
        marginTop: "100px"
      }}
    >
      Loading...
    </h2>
  );
}

  return (
    
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg,#0f172a,#1e3a8a,#312e81)",
        color: "white",
        padding: "30px"
      }}
    >

      {/* Header */}

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px"
        }}
      >
        <div>
          <h1 style={{ margin: 0 }}>
            🎓 Student Dashboard
          </h1>

          <p
            style={{
              color: "#cbd5e1",
              marginTop: "10px"
            }}
          >
            Welcome Back, {user?.username}
          </p>
        </div>

        <button
          onClick={logout}
          style={{
            background: "#ef4444",
            border: "none",
            padding: "12px 22px",
            borderRadius: "10px",
            color: "white",
            cursor: "pointer",
            fontWeight: "bold"
          }}
        >
          Logout
        </button>
      </div>

      {/* Top Cards */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(220px,1fr))",
          gap: "20px",
          marginTop: "30px"
        }}
      >

        <div style={attendanceCard}>
          <h3>📅 Attendance</h3>
         <h1>{student.attendance}</h1>
        </div>

        <div style={marksCard}>
          <h3>📚 Marks</h3>
         <h1>{student.marks}</h1>
        </div>

        <div style={feesCard}>
          <h3>💰 Fees</h3>
       <h1>{student.feesStatus}</h1>
        </div>

        <div style={courseCard}>
          <h3>🎓 Course</h3>
       <h1>{student.course}</h1>
        </div>

      </div>

      {/* Profile */}

      <div
        style={{
          marginTop: "40px",
          background: "rgba(255,255,255,0.08)",
          backdropFilter: "blur(10px)",
          padding: "25px",
          borderRadius: "20px"
        }}
      >
        <h2>👤 Student Profile</h2>

        <p><b>Username:</b> {user?.username}</p>

        <p><b>Role:</b> {user?.role}</p>

        <p><b>Name:</b> {student.name}</p>

<p><b>Course:</b> {student.course}</p>

<p><b>Year:</b> {student.year}</p>

<p><b>Email:</b> {student.email}</p>
      </div>

      {/* Academic Progress */}

      <div
        style={{
          marginTop: "30px",
          background: "rgba(255,255,255,0.08)",
          backdropFilter: "blur(10px)",
          padding: "25px",
          borderRadius: "20px"
        }}
      >
        <h2>📈 Academic Progress</h2>

        <p>Attendance Progress</p>

        <div
          style={{
            background: "#1e293b",
            borderRadius: "20px",
            overflow: "hidden"
          }}
        >
          <div
            style={{
             width: student.attendance,
              background: "#22c55e",
              height: "16px"
            }}
          />
        </div>

        <br />

        <p>Marks Progress</p>

        <div
          style={{
            background: "#1e293b",
            borderRadius: "20px",
            overflow: "hidden"
          }}
        >
          <div
            style={{
              width: `${student.marks}%`,
              background: "#3b82f6",
              height: "16px"
            }}
          />
        </div>
      </div>

      {/* Academic Status */}

      <div
        style={{
          marginTop: "30px",
          background: "rgba(255,255,255,0.08)",
          backdropFilter: "blur(10px)",
          padding: "25px",
          borderRadius: "20px"
        }}
      >
        <h2>📌 Academic Status</h2>

        <p>✅ Attendance Good</p>

        <p>✅ Fees Cleared</p>

        <p>✅ Performance Above Average</p>

        <p>🎯 Keep Maintaining Your Progress</p>
      </div>

    </div>
  );
}

/* Card Styles */

const attendanceCard = {
  background:
    "linear-gradient(135deg,#22c55e,#16a34a)",
  padding: "20px",
  borderRadius: "20px",
  textAlign: "center",
  color: "white"
};

const marksCard = {
  background:
    "linear-gradient(135deg,#3b82f6,#2563eb)",
  padding: "20px",
  borderRadius: "20px",
  textAlign: "center",
  color: "white"
};

const feesCard = {
  background:
    "linear-gradient(135deg,#f59e0b,#ea580c)",
  padding: "20px",
  borderRadius: "20px",
  textAlign: "center",
  color: "white"
};

const courseCard = {
  background:
    "linear-gradient(135deg,#9333ea,#7c3aed)",
  padding: "20px",
  borderRadius: "20px",
  textAlign: "center",
  color: "white"
};

export default StudentDashboard;