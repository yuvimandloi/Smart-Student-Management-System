import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8089/api/auth/login",
        {
          username,
          password,
        },
      );

      alert("Login Successful");
const user = response.data.data;

localStorage.setItem(
  "user",
  JSON.stringify(user)
);

if (user.role === "ADMIN") {
  navigate("/dashboard");
} else if (user.role === "STUDENT") {
  navigate("/student-dashboard");
}
    } catch (error) {
      alert("Invalid Username or Password");
    }
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#0f172a",
      }}
    >
      <form
        onSubmit={handleLogin}
        style={{
          width: "350px",
          padding: "30px",
          borderRadius: "10px",
          background: "#1e293b",
          color: "white",
        }}
      >
        <h2 style={{ textAlign: "center" }}>Student Portal Login</h2>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            marginTop: "20px",
          }}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            marginTop: "10px",
          }}
        />

        <button
          type="submit"
          style={{
            width: "100%",
            marginTop: "20px",
            padding: "10px",
          }}
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
