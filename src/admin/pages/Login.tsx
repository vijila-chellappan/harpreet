import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axiosInstance";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await api.post("/admin/login", {
        email,
        password,
      });

      const data = res.data;

      localStorage.setItem("admin", JSON.stringify(data.admin));
      navigate("/admin/dashboard");

    } catch (error: any) {
      alert(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div style={{ 
      display: "flex", 
      justifyContent: "center", 
      alignItems: "center", 
      height: "100vh" 
    }}>
      <div style={{
        width: "350px",
        padding: "30px",
        border: "1px solid #eee",
        borderRadius: "8px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.05)"
      }}>
        <h2 style={{ 
          textAlign: "center", 
          marginBottom: "20px",
          color: "#c40000"
        }}>
          Admin Login
        </h2>

        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "15px",
              border: "1px solid #ccc",
              borderRadius: "4px",
              outline: "none"
            }}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "20px",
              border: "1px solid #ccc",
              borderRadius: "4px",
              outline: "none"
            }}
          />

          <button
            type="submit"
            style={{
              width: "100%",
              padding: "10px",
              backgroundColor: "#c40000",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              fontWeight: "bold"
            }}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}