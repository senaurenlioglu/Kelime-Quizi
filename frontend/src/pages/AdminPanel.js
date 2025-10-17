import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { getAllWords, addWord, updateWord, deleteWord } from "../api/admin";
import '../styles/main.css';
import { FaPlus, FaEdit, FaTrash, FaCheck, FaTimes, FaSignOutAlt } from 'react-icons/fa';

export default function AdminPanel() {
  const { user, logout } = useContext(AuthContext);
  const [words, setWords] = useState([]);
  const [form, setForm] = useState({ german: "", english: "", turkish: "", exampleSentence: "", language: "german" });
  const [editId, setEditId] = useState(null);
  const [editForm, setEditForm] = useState({ german: "", english: "", turkish: "", exampleSentence: "", language: "german" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [selectedTable, setSelectedTable] = useState('german');
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (user && user.role === "admin") fetchWords();
  }, [user]);

  const fetchWords = async () => {
    try {
      const res = await getAllWords(localStorage.getItem("token"));
      setWords(res.data);
    } catch (err) {
      setError("Kelimeler alınamadı!");
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    setError(""); setSuccess("");
    const data = {
      german: form.language === "german" ? form.german : "",
      english: form.language === "english" ? form.english : "",
      turkish: form.turkish,
      exampleSentence: form.exampleSentence,
      language: form.language
    };
    console.log("veri gönderiliyor:", data);
    
  
    try {
      await addWord(data, localStorage.getItem("token"));
      setForm({ german: "", english: "", turkish: "", exampleSentence: "", language: "german" });
      setSuccess("Kelime eklendi!");
      fetchWords();
    } catch (err) {
      setError("Kelime eklenemedi!");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Bu kelime silinsin mi?")) return;
    setError(""); setSuccess("");
    try {
      await deleteWord(id, localStorage.getItem("token"));
      setSuccess("Kelime silindi!");
      fetchWords();
    } catch (err) {
      setError("Kelime silinemedi!");
    }
  };

  const startEdit = (word) => {
    setEditId(word._id);
    setEditForm({
      german: word.german || "",
      english: word.english || "",
      turkish: word.turkish || "",
      exampleSentence: word.exampleSentence || "",
      language: word.language || "german"
    });
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    setError(""); setSuccess("");
    try {
      await updateWord(editId, editForm, localStorage.getItem("token"));
      setEditId(null);
      setSuccess("Kelime güncellendi!");
      fetchWords();
    } catch (err) {
      setError("Kelime güncellenemedi!");
    }
  };

  // Seçilen dile göre ayarlayan fonksiyon
  const getPlaceholders = (lang) => {
    if (lang === 'english') return { main: 'İngilizce', trans: 'Türkçe', example: 'Örnek Cümle' };
    return { main: 'Almanca', trans: 'Türkçe', example: 'Örnek Cümle' };
  };
  const placeholders = getPlaceholders(form.language);

  const mainField = form.language === 'english' ? 'english' : 'german';
  const mainFieldEdit = editForm.language === 'english' ? 'english' : 'german';

  // Kelimeleri dillerine göre ayır
  const germanWords = words.filter(w => w.language === 'german');
  const englishWords = words.filter(w => w.language === 'english');

  // Filtrelenmiş kelimeler
  const filteredGermanWords = germanWords.filter(word =>
    (word.german && word.german.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (word.turkish && word.turkish.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (word.english && word.english.toLowerCase().includes(searchTerm.toLowerCase()))
  );
  const filteredEnglishWords = englishWords.filter(word =>
    (word.english && word.english.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (word.turkish && word.turkish.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (word.german && word.german.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  if (!user || user.role !== "admin") {
    return <div className="dashboard-container"><h2>Bu sayfa sadece admin kullanıcılar içindir.</h2></div>;
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-header" style={{ width: '100%', justifyContent: 'space-between' }}>
        <h2 className="dashboard-title">Admin Paneli <FaPlus style={{color:'#f59e42'}} /></h2>
        <button
          className="dashboard-btn"
          style={{ padding: '8px 4px', fontSize: '0.98rem', minWidth: 0, width: 'auto', display: 'flex', alignItems: 'center', gap: 4 }}
          onClick={() => { logout(); window.location.href = '/login'; }}
        >
          <FaSignOutAlt /> Çıkış
        </button>
      </div>
      <form onSubmit={handleAdd} className="admin-form">
        <input className="auth-input" value={form[mainField]} onChange={e => setForm(f => ({ ...f, [mainField]: e.target.value }))} placeholder={placeholders.main} required />
        <input className="auth-input" value={form.turkish} onChange={e => setForm(f => ({ ...f, turkish: e.target.value }))} placeholder={placeholders.trans} required />
        <input className="auth-input" value={form.exampleSentence} onChange={e => setForm(f => ({ ...f, exampleSentence: e.target.value }))} placeholder={placeholders.example} />
        <select className="auth-input" value={form.language} onChange={e => setForm(f => ({ ...f, language: e.target.value }))}>
          <option value="german">Almanca</option>
          <option value="english">İngilizce</option>
        </select>
        <button type="submit" className="dashboard-btn" style={{marginLeft:8}}><FaPlus /> Ekle</button>
      </form>
      {error && <div className="auth-error">{error}</div>}
      {success && <div className="quiz-result quiz-correct">{success}</div>}
      <div style={{margin:'24px 0 12px 0', display:'flex', gap:8}}>
        <button type="button" className={selectedTable==='german' ? 'dashboard-btn' : 'dashboard-btn dashboard-btn-outline'} onClick={()=>setSelectedTable('german')}>Almanca Tablosu</button>
        <button type="button" className={selectedTable==='english' ? 'dashboard-btn' : 'dashboard-btn dashboard-btn-outline'} onClick={()=>setSelectedTable('english')}>İngilizce Tablosu</button>
      </div>
      <div style={{margin:'0 0 18px 0', display:'flex', justifyContent:'center'}}>
        <input
          type="text"
          className="auth-input"
          style={{minWidth:340, maxWidth:500, width:'100%'}}
          placeholder="Kelime ara (Almanca/İngilizce/Türkçe)"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="dashboard-table-container">
        {selectedTable === 'german' && (
          <>
            <h3>Almanca Kelimeler</h3>
            <table className="dashboard-table">
              <thead>
                <tr>
                  <th>Almanca</th>
                  <th>Türkçe</th>
                  <th>Örnek Cümle</th>
                  <th>Dil</th>
                  <th>İşlemler</th>
                </tr>
              </thead>
              <tbody>
                {filteredGermanWords.map(word => (
                  <tr key={word._id}>
                    {editId === word._id ? (
                      <>
                        <td><input className="auth-input" value={editForm[mainFieldEdit]} onChange={e => setEditForm(f => ({ ...f, [mainFieldEdit]: e.target.value }))} /></td>
                        <td><input className="auth-input" value={editForm.turkish} onChange={e => setEditForm(f => ({ ...f, turkish: e.target.value }))} /></td>
                        <td><input className="auth-input" value={editForm.exampleSentence} onChange={e => setEditForm(f => ({ ...f, exampleSentence: e.target.value }))} /></td>
                        <td>
                          <select className="auth-input" value={editForm.language} onChange={e => setEditForm(f => ({ ...f, language: e.target.value }))}>
                            <option value="german">Almanca</option>
                            <option value="english">İngilizce</option>
                          </select>
                        </td>
                        <td>
                          <button className="dashboard-btn" style={{padding:'6px 10px',fontSize:'1rem'}} onClick={handleEdit}><FaCheck /></button>
                          <button className="dashboard-btn" style={{padding:'6px 10px',fontSize:'1rem',background:'#fee2e2',color:'#dc2626',marginLeft:4}} onClick={()=>setEditId(null)}><FaTimes /></button>
                        </td>
                      </>
                    ) : (
                      <>
                        <td>{word.german}</td>
                        <td>{word.turkish}</td>
                        <td>{word.exampleSentence}</td>
                        <td>Almanca</td>
                        <td>
                          <button className="dashboard-btn" style={{padding:'6px 10px',fontSize:'1rem'}} onClick={()=>startEdit(word)}><FaEdit /></button>
                          <button className="dashboard-btn" style={{padding:'6px 10px',fontSize:'1rem',background:'#fee2e2',color:'#dc2626',marginLeft:4}} onClick={()=>handleDelete(word._id)}><FaTrash /></button>
                        </td>
                      </>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
        {selectedTable === 'english' && (
          <>
            <h3>İngilizce Kelimeler</h3>
            <table className="dashboard-table">
              <thead>
                <tr>
                  <th>Almanca</th>
                  <th>Türkçe</th>
                  <th>Örnek Cümle</th>
                  <th>Dil</th>
                  <th>İşlemler</th>
                </tr>
              </thead>
              <tbody>
                {filteredEnglishWords.map(word => (
                  <tr key={word._id}>
                    {editId === word._id ? (
                      <>
                        <td><input className="auth-input" value={editForm[mainFieldEdit]} onChange={e => setEditForm(f => ({ ...f, [mainFieldEdit]: e.target.value }))} /></td>
                        <td><input className="auth-input" value={editForm.turkish} onChange={e => setEditForm(f => ({ ...f, turkish: e.target.value }))} /></td>
                        <td><input className="auth-input" value={editForm.exampleSentence} onChange={e => setEditForm(f => ({ ...f, exampleSentence: e.target.value }))} /></td>
                        <td>
                          <select className="auth-input" value={editForm.language} onChange={e => setEditForm(f => ({ ...f, language: e.target.value }))}>
                            <option value="german">Almanca</option>
                            <option value="english">İngilizce</option>
                          </select>
                        </td>
                        <td>
                          <button className="dashboard-btn" style={{padding:'6px 10px',fontSize:'1rem'}} onClick={handleEdit}><FaCheck /></button>
                          <button className="dashboard-btn" style={{padding:'6px 10px',fontSize:'1rem',background:'#fee2e2',color:'#dc2626',marginLeft:4}} onClick={()=>setEditId(null)}><FaTimes /></button>
                        </td>
                      </>
                    ) : (
                      <>
                        <td>{word.english}</td>
                        <td>{word.turkish}</td>
                        <td>{word.exampleSentence}</td>
                        <td>İngilizce</td>
                        <td>
                          <button className="dashboard-btn" style={{padding:'6px 10px',fontSize:'1rem'}} onClick={()=>startEdit(word)}><FaEdit /></button>
                          <button className="dashboard-btn" style={{padding:'6px 10px',fontSize:'1rem',background:'#fee2e2',color:'#dc2626',marginLeft:4}} onClick={()=>handleDelete(word._id)}><FaTrash /></button>
                        </td>
                      </>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
      </div>
    </div>
  );
}