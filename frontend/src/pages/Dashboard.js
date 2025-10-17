import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import '../styles/main.css';
import { FaSmileBeam, FaSignOutAlt } from 'react-icons/fa';

export default function Dashboard() {
  const { user, logout } = useContext(AuthContext);
  const [stats, setStats] = useState([]);
  const [activeTab, setActiveTab] = useState('german');
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      axios.get("/api/stats/dashboard", {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") }
      }).then(res => setStats(res.data));
    }
  }, [user]);

  if (!user) return <div>Lütfen giriş yapın.</div>;

  const filteredStats = stats.filter(s => s.language === activeTab);

  return (
    <div className="dashboard-container">
      <div className="dashboard-header" style={{ width: '100%', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span className="dashboard-emoji"><FaSmileBeam size={32} /></span>
          <h2 className="dashboard-title">Hoş geldin, <span className="dashboard-username">{user.username || 'Kullanıcı'}</span>!</h2>
        </div>
        <button
          className="dashboard-btn"
          style={{ padding: '8px 4px', fontSize: '0.98rem', minWidth: 0, width: 'auto', display: 'flex', alignItems: 'center', gap: 4 }}
          onClick={() => { logout(); navigate('/login'); }}
        >
          <FaSignOutAlt /> Çıkış
        </button>
      </div>
      <div style={{display:'flex', gap:8, marginBottom:16}}>
        <button className={`dashboard-btn${activeTab==='german' ? '' : ' dashboard-btn-outline'}`} onClick={()=>setActiveTab('german')}>Almanca</button>
        <button className={`dashboard-btn${activeTab==='english' ? '' : ' dashboard-btn-outline'}`} onClick={()=>setActiveTab('english')}>İngilizce</button>
      </div>
      <div className="dashboard-table-container">
        <table className="dashboard-table">
          <thead>
            <tr>
              <th>{activeTab === 'german' ? 'Almanca' : 'İngilizce'}</th>
              <th>Türkçe</th>
              <th>Doğru</th>
              <th>Yanlış</th>
              <th>Son Tahmin</th>
              <th>Tarih</th>
            </tr>
          </thead>
          <tbody>
            {filteredStats.map((s, i) => {
              console.log('DASHBOARD STAT:', s);
              return (
                <tr key={i}>
                  <td>{activeTab === 'german' ? s.german : s.english}</td>
                  <td>{s.turkish}</td>
                  <td>{s.correct}</td>
                  <td>{s.wrong}</td>
                  <td>{s.lastResult === "correct" ? "✅" : "❌"}</td>
                  <td>{s.lastDate && new Date(s.lastDate).toLocaleDateString()}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <button onClick={() => navigate("/quiz") } className="dashboard-btn">Quiz Başlat 🚀</button>
    </div>
  );
}