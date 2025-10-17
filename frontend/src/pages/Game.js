import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import '../styles/main.css';
import { useNavigate } from 'react-router-dom';

const correctMessages = [
  "Harika! 🎉", "Süper! 😎", "Bravo! 👏", "Mükemmel! 🥳", "Doğru bildin! ✅"
];
const wrongMessages = [
  "Üzgünüm! 😢", "Bir dahaki sefere! 💪", "Yanlış oldu! ❌", "Tekrar dene! 🔄", "Olmadı! 😬"
];

export default function Game() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [word, setWord] = useState(null);
  const [answer, setAnswer] = useState("");
  const [result, setResult] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [showSentence, setShowSentence] = useState(false);
  const [resultType, setResultType] = useState(null); // 'correct' veya 'wrong'
  const [motivation, setMotivation] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [languageChosen, setLanguageChosen] = useState(false);

  useEffect(() => {
    if (user && languageChosen && selectedLanguage) {
      axios.get(`/api/words/random?language=${selectedLanguage}`,
        { headers: { Authorization: "Bearer " + localStorage.getItem("token") } }
      ).then(res => {
        setWord(res.data);
        setResult(null);
        setAnswer("");
        setShowAnswer(false);
        setShowSentence(false);
      }).catch(() => {
        setWord(null);
      });
    }
  }, [user, languageChosen, selectedLanguage]);

  const handleCheck = async (e) => {
    e.preventDefault();
    const res = await axios.post("/api/words/check", {
      wordId: word._id,
      answer
    }, {
      headers: { Authorization: "Bearer " + localStorage.getItem("token") }
    });
    setResult(res.data.correct ? "Doğru!" : "Yanlış!");
    setResultType(res.data.correct ? "correct" : "wrong");
    setMotivation(res.data.correct
      ? correctMessages[Math.floor(Math.random() * correctMessages.length)]
      : wrongMessages[Math.floor(Math.random() * wrongMessages.length)]
    );
    setShowAnswer(true);
  };

  const handleNext = () => {
    setWord(null);
    setResult(null);
    setAnswer("");
    setShowAnswer(false);
    setShowSentence(false);
    axios.get(`/api/words/random?language=${selectedLanguage}`,
      { headers: { Authorization: "Bearer " + localStorage.getItem("token") } }
    ).then(res => setWord(res.data)).catch(() => setWord(null));
  };

  if (!user) return <div>Lütfen giriş yapın.</div>;
  if (!languageChosen) {
    return (
      <div className="quiz-container">
        <h2 className="quiz-title">Quiz Dili Seç</h2>
        <select className="quiz-input" value={selectedLanguage} onChange={e => setSelectedLanguage(e.target.value)}>
          <option value="">Dil Seçiniz</option>
          <option value="german">Almanca</option>
          <option value="english">İngilizce</option>
        </select>
        <button className="quiz-btn" disabled={!selectedLanguage} onClick={() => setLanguageChosen(true)}>Quiz Başlat</button>
      </div>
    );
  }
  if (!word) return <div>Yükleniyor...</div>;

  // Gösterilecek dil ve istenen çeviri
  let showLabel = "";
  let askLabel = "";
  if (selectedLanguage === "german") {
    showLabel = word.showLang === "german" ? "Almanca" : "Türkçe";
    askLabel = word.showLang === "german" ? "Türkçesini" : "Almancasını";
  } else if (selectedLanguage === "english") {
    showLabel = word.showLang === "english" ? "İngilizce" : "Türkçe";
    askLabel = word.showLang === "english" ? "Türkçesini" : "İngilizcesini";
  }

  return (
    <div className="quiz-container">
      <h2 className="quiz-title">Kelime Tahmin</h2>
      <div className="quiz-card">
        <div className="quiz-label">{showLabel}:</div>
        <div className="quiz-word">{word.value ? word.value : <span className="quiz-error">Kelime bulunamadı!</span>}</div>
      </div>
      <form onSubmit={handleCheck} className="quiz-form">
        <input
          className="quiz-input"
          value={answer}
          onChange={e => setAnswer(e.target.value)}
          placeholder={`${askLabel} yazın`}
          disabled={showAnswer}
        />
        <button type="submit" className="quiz-btn" disabled={!answer || showAnswer}>Kontrol Et</button>
      </form>
      {result && (
        <div className={`quiz-result ${resultType === 'correct' ? 'quiz-correct' : 'quiz-wrong'}`}>
          <span className="quiz-emoji">{resultType === 'correct' ? '🎉' : '❌'}</span>
          <span>{motivation}</span>
        </div>
      )}
      <div className="quiz-sentence">
        {!showSentence ? (
          <button onClick={() => setShowSentence(true)} type="button" className="quiz-btn quiz-sentence-btn">Cümleyi Göster</button>
        ) : (
          <div><b>Örnek Cümle:</b> {word.exampleSentence ? word.exampleSentence : <span className="quiz-error">Cümle bulunamadı!</span>}</div>
        )}
      </div>
      {showAnswer && (
        <div className="quiz-actions">
          <button onClick={handleNext} className="quiz-btn">Bitir</button>
          <button onClick={() => navigate('/dashboard')} className="quiz-btn quiz-dashboard-btn">Dashboard'a Dön</button>
        </div>
      )}
    </div>
  );
}