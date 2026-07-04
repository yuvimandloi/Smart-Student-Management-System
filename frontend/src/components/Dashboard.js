import React, { useEffect, useState } from "react";
import { getStudents } from "../services/api";
import { Bar, Line, Pie } from "react-chartjs-2";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

function Dashboard() {
  const [students, setStudents] = useState([]);

  // 🔥 FILTER STATES
  const [courseFilter, setCourseFilter] = useState("");
  const [yearFilter, setYearFilter] = useState("");

  useEffect(() => {
    getStudents()
      .then(res => setStudents(res.data.data || []))
      .catch(() => setStudents([]));
  }, []);

  // 🔥 FILTER LOGIC
  const filteredStudents = students.filter((s) => {
    return (
      (courseFilter === "" || s.course === courseFilter) &&
      (yearFilter === "" || s.year === yearFilter)
    );
  });

  // 🔥 COUNTS (FILTER BASED)
  const coursesCount = new Set(filteredStudents.map(s => s.course)).size;
  const yearsCount = new Set(filteredStudents.map(s => s.year)).size;

  // 🔥 COURSE MAP
  const courseMap = {};
  filteredStudents.forEach(s => {
    if (s.course) {
      courseMap[s.course] = (courseMap[s.course] || 0) + 1;
    }
  });

  // 🔥 YEAR MAP
  const yearMap = {};
  filteredStudents.forEach(s => {
    if (s.year) {
      yearMap[s.year] = (yearMap[s.year] || 0) + 1;
    }
  });

  // 🔥 BAR
  const barData = {
    labels: Object.keys(courseMap),
    datasets: [
      {
        label: "Students",
        data: Object.values(courseMap),
        backgroundColor: ["#6366f1", "#22c55e", "#06b6d4", "#f59e0b"]
      }
    ]
  };

  // 🔥 LINE
  const lineData = {
    labels: Object.keys(yearMap),
    datasets: [
      {
        label: "Growth",
        data: Object.values(yearMap),
        borderColor: "#f97316",
        backgroundColor: "#f97316",
        tension: 0.4
      }
    ]
  };

  // 🔥 PIE
  const pieData = {
    labels: Object.keys(courseMap),
    datasets: [
      {
        data: Object.values(courseMap),
        backgroundColor: ["#6366f1", "#22c55e", "#06b6d4", "#f59e0b"]
      }
    ]
  };

  return (
    <div>

      <h2 className="dashboard-title">📊 Dashboard</h2>

      {/* 🔥 FILTER UI */}
      <div className="row mb-3">

        <div className="col-md-3">
          <select
            className="form-control"
            value={courseFilter}
            onChange={(e) => setCourseFilter(e.target.value)}
          >
            <option value="">All Courses</option>
            {[...new Set(students.map(s => s.course))].map((c, i) => (
              <option key={i} value={c}>{c}</option>
            ))}
          </select>
        </div>

        <div className="col-md-3">
          <select
            className="form-control"
            value={yearFilter}
            onChange={(e) => setYearFilter(e.target.value)}
          >
            <option value="">All Years</option>
            {[...new Set(students.map(s => s.year))].map((y, i) => (
              <option key={i} value={y}>{y}</option>
            ))}
          </select>
        </div>

      </div>

      {/* 🔥 CARDS */}
      <div className="row mb-4">

        <div className="col-md-4">
          <div className="card-box card1">
            <h6>Total Students</h6>
            <h2>{filteredStudents.length}</h2>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card-box card2">
            <h6>Courses</h6>
            <h2>{coursesCount}</h2>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card-box card3">
            <h6>Years</h6>
            <h2>{yearsCount}</h2>
          </div>
        </div>

      </div>

      {/* 🔥 CHARTS */}
      <div className="row">

        <div className="col-md-4">
          <div className="chart-card">
            <h6>Course Distribution</h6>
            {filteredStudents.length > 0 ? (
              <Bar data={barData} options={{ maintainAspectRatio: false }} />
            ) : "No Data"}
          </div>
        </div>

        <div className="col-md-4">
          <div className="chart-card">
            <h6>Year Growth</h6>
            {filteredStudents.length > 0 ? (
              <Line data={lineData} options={{ maintainAspectRatio: false }} />
            ) : "No Data"}
          </div>
        </div>

        <div className="col-md-4">
          <div className="chart-card">
            <h6>Course Share</h6>
            {filteredStudents.length > 0 ? (
              <Pie data={pieData} options={{ maintainAspectRatio: false }} />
            ) : "No Data"}
          </div>
        </div>

      </div>

    </div>
  );
}

export default Dashboard;