import React from "react";
export default function StatsTable({ stats, language = 'german' }) {
  return (
    <table>
      <thead>
        <tr>
          <th>{language === 'german' ? 'Almanca' : 'İngilizce'}</th>
          <th>Türkçe</th>
          <th>Doğru</th>
          <th>Yanlış</th>
          <th>Son Tahmin</th>
          <th>Tarih</th>
        </tr>
      </thead>
      <tbody>
        {stats.map((s, i) => (
          <tr key={i}>
            <td>{language === 'german' ? s.german : s.english}</td>
            <td>{s.turkish}</td>
            <td>{s.correct}</td>
            <td>{s.wrong}</td>
            <td>{s.lastResult === "correct" ? "✅" : "❌"}</td>
            <td>{s.lastDate && new Date(s.lastDate).toLocaleDateString()}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}