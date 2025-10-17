import React, { useState } from "react";
export default function WordForm({ onSubmit, language = 'german' }) {
  const [german, setGerman] = useState("");
  const [english, setEnglish] = useState("");
  const [turkish, setTurkish] = useState("");
  const [exampleSentence, setExampleSentence] = useState("");
  return (
    <form onSubmit={e => { e.preventDefault(); onSubmit({ german, english, turkish, exampleSentence, language }); }}>
      {language === 'german' && (
        <input value={german} onChange={e => setGerman(e.target.value)} placeholder="Almanca" />
      )}
      {language === 'english' && (
        <input value={english} onChange={e => setEnglish(e.target.value)} placeholder="İngilizce" />
      )}
      <input value={turkish} onChange={e => setTurkish(e.target.value)} placeholder="Türkçe" />
      <input value={exampleSentence} onChange={e => setExampleSentence(e.target.value)} placeholder="Örnek Cümle" />
      <button type="submit">Kaydet</button>
    </form>
  );
}