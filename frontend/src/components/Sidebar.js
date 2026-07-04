import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div className="sidebar">
      <h3 className="logo">SSMS Dashboard</h3>

      <ul>
        <li><Link to="/">🏠 Dashboard</Link></li>
        <li><Link to="/students">📊 Students</Link></li>
        <li>⚙️ Settings</li>
        <li>👤 Profile</li>
      </ul>
    </div>
  );
}

export default Sidebar; 