import { Link, useLocation } from "react-router-dom";
import { useState, useContext } from "react";
import { FaChartBar, FaUserGraduate } from "react-icons/fa";
import { SearchContext } from "../context/SearchContext";

function Layout({ children }) {
  const [darkMode, setDarkMode] = useState(true);
  const location = useLocation();

  // 🔥 IMPORTANT FIX
  const { search, setSearch } = useContext(SearchContext);

  return (
    <div className="app-container">

      {/* 🔥 SIDEBAR */}
      <div className="sidebar">

        <h4 className="logo">🎓 Smart Student</h4>

        <button
          onClick={() => setDarkMode(!darkMode)}
          className="btn btn-light mb-4"
        >
          {darkMode ? "☀️ Light" : "🌙 Dark"}
        </button>

        <ul>
          <li>
            <Link
              to="/"
              className={location.pathname === "/" ? "active" : ""}
            >
              <FaChartBar /> Dashboard
            </Link>
          </li>

          <li>
            <Link
              to="/students"
              className={location.pathname === "/students" ? "active" : ""}
            >
              <FaUserGraduate /> Students
            </Link>
          </li>
        </ul>

      </div>

      {/* 🔥 RIGHT SIDE */}
      <div className="main-content">

        {/* 🔥 HEADER */}
        <div className="header">

          {/* 🔍 SEARCH (NOW WORKING) */}
          <input
            type="text"
            placeholder="🔍 Search..."
            className="search-box"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          {/* 🔔 PROFILE */}
          <div className="header-right">
            <span>🔔</span>

            <div className="profile">
              A
            </div>
          </div>

        </div>

        {/* 🔥 CONTENT */}
        <div
          className="content-area"
          style={{
            background: darkMode ? "#0f172a" : "#f1f5f9",
            color: darkMode ? "white" : "black"
          }}
        >
          {children}
        </div>

      </div>

    </div>
  );
}

export default Layout;