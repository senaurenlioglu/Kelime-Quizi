import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { FaUserAlt } from 'react-icons/fa';
import '../styles/main.css';

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await axios.post("/api/auth/login", { email, password });
      login(res.data.user);
      localStorage.setItem("token", res.data.token);
      if (res.data.user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Giriş başarısız!");
    }
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit} className="auth-card">
        <div className="auth-icon"><FaUserAlt size={40} /></div>
        <h2 className="auth-title">Giriş Yap</h2>
        {error && <div className="auth-error">{error}</div>}
        <input className="auth-input" value={email} onChange={e => setEmail(e.target.value)} placeholder="E-posta" />
        <input className="auth-input" type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Şifre" />
        <button type="submit" className="auth-btn">Giriş</button>
        <p className="auth-link">Üyeliğin yok mu? <Link to="/register">Kayıt Ol</Link></p>
      </form>
    </div>
  );
}