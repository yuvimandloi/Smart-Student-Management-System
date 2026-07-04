import StudentDashboard from "./components/StudentDashboard";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import StudentList from "./components/StudentList";
import Layout from "./components/Layout";
import Login from "./components/Login";
import Home from "./components/Home";
import Register from "./components/Register";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <Router>

      <Routes>

        {/* Landing Page */}
        <Route path="/" element={<Home />} />

        {/* Login Page */}
        <Route path="/login" element={<Login />} />

        {/* Student Dashboard */}
        <Route
          path="/student-dashboard"
          element={<StudentDashboard />}
        />

        {/* Admin Dashboard */}
        <Route
          path="/dashboard"
          element={
            <Layout>
              <Dashboard />
            </Layout>
          }
        />

        {/* Student List */}
        <Route
          path="/students"
          element={
            <Layout>
              <StudentList />
            </Layout>
          }
        />

        <Route
  path="/register"
  element={<Register />}
/>

      </Routes>

      <ToastContainer />

    </Router>
  );
}

export default App;