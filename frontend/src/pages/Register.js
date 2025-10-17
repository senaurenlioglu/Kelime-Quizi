import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { FaUserPlus } from 'react-icons/fa';
import '../styles/main.css';

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await axios.post("/api/auth/register", { username, email, password });
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Kayıt başarısız!");
    }
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit} className="auth-card">
        <div className="auth-icon"><FaUserPlus size={40} /></div>
        <h2 className="auth-title">Kayıt Ol</h2>
        {error && <div className="auth-error">{error}</div>}
        <input className="auth-input" value={username} onChange={e => setUsername(e.target.value)} placeholder="Kullanıcı Adı" />
        <input className="auth-input" value={email} onChange={e => setEmail(e.target.value)} placeholder="E-posta" />
        <input className="auth-input" type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Şifre" />
        <button type="submit" className="auth-btn">Kayıt Ol</button>
        <p className="auth-link">Zaten hesabın var mı? <Link to="/login">Giriş Yap</Link></p>
      </form>
    </div>
  );
}