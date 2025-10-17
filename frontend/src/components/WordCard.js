import React from "react";
export default function WordCard({ word, language = 'german' }) {
  return (
    <div>
      {language === 'german' && <><b>Almanca:</b> {word.german} <br /></>}
      {language === 'english' && <><b>İngilizce:</b> {word.english} <br /></>}
      <b>Türkçe:</b> {word.turkish} <br />
      <b>Örnek:</b> {word.exampleSentence}
    </div>
  );
}