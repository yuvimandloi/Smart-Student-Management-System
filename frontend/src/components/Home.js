import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getDashboardStats } from "../services/api";
import "./Home.css";

function Home() {
  const navigate = useNavigate();

  const [stats, setStats] = useState({
  totalStudents: 0,
  totalCourses: 0,
  paidFees: 0,
  avgAttendance: 0
});

useEffect(() => {
  console.log("Home Loaded");
  loadStats();
}, []);

const loadStats = async () => {
  try {
    const res = await getDashboardStats();

    console.log("API RESPONSE =>", res.data);

    setStats(res.data);

  } catch (error) {
    console.log("API ERROR =>", error);
  }
};

//   const [stats, setStats] = useState({
//   totalStudents: 0
// });

// useEffect(() => {
//   loadStats();
// }, []);

// const loadStats = async () => {
//   try {
//     const res = await getDashboardStats();
//     setStats(res.data);
//   } catch (error) {
//     console.log(error);
//   }
// };

console.log("CURRENT STATS =>", stats);
  return (
    <div className="home-container">

      {/* Navbar */}

      <nav className="navbar">
        <div className="logo">
          🎓 Smart Student
        </div>

        <div className="nav-links">
          <a href="/">Home</a>
          <a href="#features">Features</a>
          <a href="#portal">Portal</a>
        </div>
      </nav>

      {/* Hero */}

      <section className="hero">

        <h1>
          Smart Student
          <span> Management System</span>
        </h1>

        <p>
          A Modern Platform To Manage Students,
          Attendance, Fees and Academic Performance
          Efficiently.
        </p>

        <div className="hero-buttons">

          <button
            className="student-btn"
            onClick={() => navigate("/login")}
          >
            🎓 Student Login
          </button>

          <button
            className="admin-btn"
            onClick={() => navigate("/login")}
          >
            👨‍💼 Admin Login
          </button>

          <button
            className="register-btn"
            onClick={() => navigate("/register")}
          >
            🚀 Register
          </button>

        </div>

      </section>

      {/* Statistics */}

      <section className="stats">

        <div className="stat-card">
          <h2>{stats.totalStudents}</h2>
<p>Total Students</p>
        </div>

        <div className="stat-card">
         <h2>{stats.avgAttendance}%</h2>
<p>Average Attendance</p>
        </div>

        <div className="stat-card">
        <h2>{stats.paidFees}</h2>
<p>Fees Paid</p>
        </div>

        <div className="stat-card">
         <h2>{stats.totalCourses}</h2>
<p>Courses</p>
        </div>

      </section>

      {/* Portal */}

      <section id="portal" className="portal-section">

        <div className="portal-card">

          <h3>👨‍🎓 Student Portal</h3>

          <ul>
            <li>✔ View Attendance</li>
            <li>✔ View Marks</li>
            <li>✔ Check Fees Status</li>
            <li>✔ Track Performance</li>
          </ul>

        </div>

        <div className="portal-card">

          <h3>👨‍💼 Admin Portal</h3>

          <ul>
            <li>✔ Manage Students</li>
            <li>✔ Attendance Control</li>
            <li>✔ Reports & Analytics</li>
            <li>✔ Full Dashboard Access</li>
          </ul>

        </div>

      </section>

      {/* Features */}

      <section id="features">

        <h2 className="feature-title">
          🚀 Key Features
        </h2>

        <div className="feature-grid">

          <div className="feature-card">
            🎓 Student Management
          </div>

          <div className="feature-card">
            📅 Attendance Tracking
          </div>

          <div className="feature-card">
            💰 Fee Management
          </div>

          <div className="feature-card">
            📊 Dashboard Analytics
          </div>

          <div className="feature-card">
            📚 Academic Performance
          </div>

          <div className="feature-card">
            🔐 Secure Authentication
          </div>

        </div>

      </section>

      {/* Footer */}

      <footer className="footer">

        <h3>Smart Student Management System</h3>

        <p>Developed By Yuvraj Mandloi & Aniket Amode</p>

        <span>Manage • Track • Grow</span>

      </footer>

    </div>
  );
}

export default Home;