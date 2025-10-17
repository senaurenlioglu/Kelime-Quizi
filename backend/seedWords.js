const mongoose = require('mongoose');
const Word = require('./models/Word');

// Buraya kelime listesini yapıştır
const words = [
  {
  "german": "annehmen",
      "turkish": "Kabul etmek, varsaymak",
      "exampleSentence": "Ich nehme an, dass er heute Abend kommt."
    },
    {
      "german": "anpassen",
      "turkish": "Uyarlamak, adapte etmek",
      "exampleSentence": "Man muss sich den neuen Gegebenheiten anpassen."
    },
    {
      "german": "ausüben",
      "turkish": "İcra etmek, yapmak",
      "exampleSentence": "Er übt seinen Beruf mit großer Leidenschaft aus."
    },
    {
      "german": "beitragen",
      "turkish": "Katkıda bulunmak",
      "exampleSentence": "Jeder sollte seinen Teil zum Umweltschutz beitragen."
    },
    {
      "german": "berücksichtigen",
      "turkish": "Dikkate almak",
      "exampleSentence": "Sie sollten alle Aspekte berücksichtigen, bevor Sie eine Entscheidung treffen."
    },
    {
      "german": "bewältigen",
      "turkish": "Üstesinden gelmek, başarmak",
      "exampleSentence": "Er hat die schwierige Aufgabe erfolgreich bewältigt."
    },
    {
      "german": "durchsetzen",
      "turkish": "Başarıya ulaşmak, kabul ettirmek",
      "exampleSentence": "Sie konnte ihre Ideen gegen Widerstände durchsetzen."
    },
    {
      "german": "erfassen",
      "turkish": "Kavramak, kaydetmek",
      "exampleSentence": "Es ist wichtig, die komplexen Zusammenhänge schnell zu erfassen."
    },
    {
      "german": "erwerben",
      "turkish": "Edinmek, kazanmak",
      "exampleSentence": "Man kann im Laufe des Lebens viel Wissen erwerben."
    },
    {
      "german": "fördern",
      "turkish": "Teşvik etmek, desteklemek",
      "exampleSentence": "Die Regierung fördert Bildung und Forschung."
    },
    {
      "german": "gewährleisten",
      "turkish": "Garanti etmek, sağlamak",
      "exampleSentence": "Die Sicherheit der Daten muss stets gewährleistet sein."
    },
    {
      "german": "hervorheben",
      "turkish": "Vurgulamak, öne çıkarmak",
      "exampleSentence": "Er hob die Bedeutung der Zusammenarbeit hervor."
    },
    {
      "german": "prägen",
      "turkish": "Şekillendirmek, damgasını vurmak",
      "exampleSentence": "Seine Kindheit hat ihn stark geprägt."
    },
    {
      "german": "schildern",
      "turkish": "Tanımlamak, tasvir etmek",
      "exampleSentence": "Er schilderte die Ereignisse sehr detailliert."
    },
    {
      "german": "umsetzen",
      "turkish": "Uygulamak, hayata geçirmek",
      "exampleSentence": "Die neuen Pläne müssen schnell umgesetzt werden."
    },
    {
      "german": "verzichten",
      "turkish": "Vazgeçmek, feragat etmek",
      "exampleSentence": "Ich verzichte auf mein Recht zu sprechen."
    },
    {
      "german": "vorwerfen",
      "turkish": "Suçlamak, itham etmek",
      "exampleSentence": "Man kann ihm keine Unehrlichkeit vorwerfen."
    },
    {
      "german": "zustimmen",
      "turkish": "Onaylamak, katılmak",
      "exampleSentence": "Ich stimme Ihrer Meinung vollkommen zu."
    },
    {
      "german": "abweichen",
      "turkish": "Sapmak, farklılık göstermek",
      "exampleSentence": "Unsere Ansichten weichen stark voneinander ab."
    },
    {
      "german": "sich auseinandersetzen",
      "turkish": "Uğraşmak, yüzleşmek, tartışmak",
      "exampleSentence": "Er setzt sich intensiv mit dem Thema auseinander."
    },
    {
      "german": "beinhalten",
      "turkish": "İçermek, kapsamak",
      "exampleSentence": "Das Dokument beinhaltet alle wichtigen Informationen."
    },
    {
      "german": "darstellen",
      "turkish": "Temsil etmek, göstermek",
      "exampleSentence": "Das Bild stellt eine Szene aus dem Alltag dar."
    },
    {
      "german": "ermitteln",
      "turkish": "Tespit etmek, belirlemek, araştırmak",
      "exampleSentence": "Die Polizei ermittelt in dem Fall."
    },
    {
      "german": "festlegen",
      "turkish": "Belirlemek, saptamak",
      "exampleSentence": "Wir müssen einen Termin für das Treffen festlegen."
    },
    {
      "german": "gestalten",
      "turkish": "Şekillendirmek, tasarlamak",
      "exampleSentence": "Sie hat den Garten sehr schön gestaltet."
    },
    {
      "german": "nachweisen",
      "turkish": "Kanıtlamak, ispatlamak",
      "exampleSentence": "Er konnte seine Unschuld nachweisen."
    },
    {
      "german": "schlussfolgern",
      "turkish": "Sonuç çıkarmak",
      "exampleSentence": "Daraus lässt sich schlussfolgern, dass..."
    },
    {
      "german": "verfassen",
      "turkish": "Kaleme almak, yazmak",
      "exampleSentence": "Sie hat einen interessanten Artikel verfasst."
    },
    {
      "german": "verknüpfen",
      "turkish": "Bağlamak, birleştirmek",
      "exampleSentence": "Man kann verschiedene Daten miteinander verknüpfen."
    },
    {
      "german": "wiedergeben",
      "turkish": "Aktarmak, yansıtmak",
      "exampleSentence": "Er konnte das Gespräch Wort für Wort wiedergeben."
    },
    {
      "german": "die Absicht",
      "turkish": "Niyet, amaç",
      "exampleSentence": "Er hatte gute Absichten."
    },
    {
      "german": "der Ansatz",
      "turkish": "Yaklaşım, deneme",
      "exampleSentence": "Das ist ein vielversprechender Ansatz."
    },
    {
      "german": "die Auswirkung",
      "turkish": "Etki, sonuç",
      "exampleSentence": "Die Klimaerwärmung hat globale Auswirkungen."
    },
    {
      "german": "der Bedarf",
      "turkish": "İhtiyaç, gereksinim",
      "exampleSentence": "Es gibt einen hohen Bedarf an qualifizierten Fachkräften."
    },
    {
      "german": "die Bedingung",
      "turkish": "Koşul, şart",
      "exampleSentence": "Unter diesen Bedingungen kann ich nicht arbeiten."
    },
    {
      "german": "der Beitrag",
      "turkish": "Katkı, yazı",
      "exampleSentence": "Sein Beitrag zur Forschung war entscheidend."
    },
    {
      "german": "der Bezug",
      "turkish": "İlişki, bağlantı",
      "exampleSentence": "Der Film hat einen direkten Bezug zur Realität."
    },
    {
      "german": "die Darstellung",
      "turkish": "Temsil, sunum",
      "exampleSentence": "Die detaillierte Darstellung der Fakten ist wichtig."
    },
    {
      "german": "die Erfassung",
      "turkish": "Kaydetme, anlama",
      "exampleSentence": "Die Erfassung der Daten erfolgte elektronisch."
    },
    {
      "german": "die Erkenntnis",
      "turkish": "Bilgi, kavrayış, sonuç",
      "exampleSentence": "Diese Erkenntnis hat alles verändert."
    },
    {
      "german": "die Entwicklung",
      "turkish": "Gelişim, ilerleme",
      "exampleSentence": "Die technologische Entwicklung schreitet rasant voran."
    },
    {
      "german": "die Erwartung",
      "turkish": "Beklenti",
      "exampleSentence": "Er hat die Erwartungen übertroffen."
    },
    {
      "german": "der Fortschritt",
      "turkish": "İlerleme, gelişme",
      "exampleSentence": "Es wurden große Fortschritte erzielt."
    },
    {
      "german": "die Grundlage",
      "turkish": "Temel, esas",
      "exampleSentence": "Das Buch bildet die Grundlage für meine Arbeit."
    },
    {
      "german": "die Haltung",
      "turkish": "Duruş, tavır",
      "exampleSentence": "Sie zeigte eine sehr professionelle Haltung."
    },
    {
      "german": "die Herausforderung",
      "turkish": "Zorluk, meydan okuma",
      "exampleSentence": "Das Projekt ist eine große Herausforderung."
    },
    {
      "german": "der Kontext",
      "turkish": "Bağlam",
      "exampleSentence": "Man muss den Satz im richtigen Kontext betrachten."
    },
    {
      "german": "die Möglichkeit",
      "turkish": "İmkan, olasılık",
      "exampleSentence": "Es gibt viele Möglichkeiten, das Problem zu lösen."
    },
    {
      "german": "die Perspektive",
      "turkish": "Bakış açısı, perspektif",
      "exampleSentence": "Er hat eine interessante Perspektive auf das Thema."
    },
    {
      "german": "der Prozess",
      "turkish": "Süreç",
      "exampleSentence": "Der Lernprozess erfordert Geduld."
    },
    {
      "german": "die Rolle",
      "turkish": "Rol",
      "exampleSentence": "Sie spielt eine wichtige Rolle in der Firma."
    },
    {
      "german": "die Stellungnahme",
      "turkish": "Görüş, açıklama",
      "exampleSentence": "Die Regierung gab eine offizielle Stellungnahme ab."
    },
    {
      "german": "der Überblick",
      "turkish": "Genel bakış, özet",
      "exampleSentence": "Verschaffen Sie sich zuerst einen Überblick."
    },
    {
      "german": "die Umsetzung",
      "turkish": "Uygulama, hayata geçirme",
      "exampleSentence": "Die Umsetzung des Plans verlief reibungslos."
    },
    {
      "german": "die Ursache",
      "turkish": "Neden, sebep",
      "exampleSentence": "Die Ursache des Problems ist noch unklar."
    },
    {
      "german": "die Verantwortung",
      "turkish": "Sorumluluk",
      "exampleSentence": "Jeder trägt die Verantwortung für sein Handeln."
    },
    {
      "german": "der Zusammenhang",
      "turkish": "İlişki, bağlantı",
      "exampleSentence": "Es gibt einen direkten Zusammenhang zwischen diesen Ereignissen."
    },
    {
      "german": "der Zugang",
      "turkish": "Erişim, giriş",
      "exampleSentence": "Der Zugang zu Informationen ist heutzutage sehr einfach."
    },
    {
      "german": "die Bedeutung",
      "turkish": "Anlam, önem",
      "exampleSentence": "Die Bedeutung dieser Entdeckung ist enorm."
    },
    {
      "german": "die Debatte",
      "turkish": "Tartışma",
      "exampleSentence": "Die politische Debatte war sehr hitzig."
    },
    {
      "german": "die Ebene",
      "turkish": "Düzey, seviye",
      "exampleSentence": "Wir müssen auf einer anderen Ebene diskutieren."
    },
    {
      "german": "die Grundlage",
      "turkish": "Temel, baz",
      "exampleSentence": "Das ist die Grundlage unserer Zusammenarbeit."
    },
    {
      "german": "die Initiative",
      "turkish": "Girişim",
      "exampleSentence": "Sie ergriff die Initiative, um das Problem zu lösen."
    },
    {
      "german": "die Konsequenz",
      "turkish": "Sonuç, netice",
      "exampleSentence": "Die Konsequenzen seines Handelns waren gravierend."
    },
    {
      "german": "die Leistung",
      "turkish": "Başarı, performans",
      "exampleSentence": "Er zeigte eine hervorragende Leistung."
    },
    {
      "german": "die Maßnahme",
      "turkish": "Tedbir, önlem",
      "exampleSentence": "Es müssen sofortige Maßnahmen ergriffen werden."
    },
    {
      "german": "der Nachweis",
      "turkish": "Kanıt, delil",
      "exampleSentence": "Für die Behauptung gibt es keinen Nachweis."
    },
    {
      "german": "die Orientierung",
      "turkish": "Yönelim, oryantasyon",
      "exampleSentence": "Wir brauchen eine bessere Orientierung in dieser Situation."
    },
    {
      "german": "die Priorität",
      "turkish": "Öncelik",
      "exampleSentence": "Sicherheit hat oberste Priorität."
    },
    {
      "german": "die Relevanz",
      "turkish": "Alaka, önem",
      "exampleSentence": "Die Relevanz dieser Studie ist unbestreitbar."
    },
    {
      "german": "die Ressource",
      "turkish": "Kaynak",
      "exampleSentence": "Wasser ist eine knappe Ressource."
    },
    {
      "german": "die Struktur",
      "turkish": "Yapı",
      "exampleSentence": "Die Struktur des Unternehmens ist komplex."
    },
    {
      "german": "der Umstand",
      "turkish": "Durum, koşul",
      "exampleSentence": "Unter diesen Umständen ist das nicht möglich."
    },
    {
      "german": "die Vereinbarung",
      "turkish": "Anlaşma, mutabakat",
      "exampleSentence": "Wir haben eine schriftliche Vereinbarung getroffen."
    },
    {
      "german": "die Verfügbarkeit",
      "turkish": "Mevcudiyet, erişilebilirlik",
      "exampleSentence": "Die Verfügbarkeit der Produkte ist begrenzt."
    },
    {
      "german": "das Verhalten",
      "turkish": "Davranış",
      "exampleSentence": "Sein Verhalten war unprofessionell."
    },
    {
      "german": "der Verlust",
      "turkish": "Kayıp",
      "exampleSentence": "Der Verlust war für alle schmerzhaft."
    },
    {
      "german": "der Wandel",
      "turkish": "Değişim, dönüşüm",
      "exampleSentence": "Der gesellschaftliche Wandel ist deutlich spürbar."
    },
    {
      "german": "die Wirkung",
      "turkish": "Etki, tesir",
      "exampleSentence": "Die Wirkung des Medikaments trat schnell ein."
    },
    {
      "german": "der Zustand",
      "turkish": "Durum, hal",
      "exampleSentence": "Der gesundheitliche Zustand des Patienten hat sich verbessert."
    },
    {
      "german": "Auseinandersetzung",
      "turkish": "Tartışma, yüzleşme",
      "exampleSentence": "Es gab eine heftige Auseinandersetzung."
    },
    {
      "german": "Bewusstsein",
      "turkish": "Bilinç",
      "exampleSentence": "Das Bewusstsein für Umweltschutz wächst."
    },
    {
      "german": "Einschätzung",
      "turkish": "Değerlendirme, tahmin",
      "exampleSentence": "Meine Einschätzung der Lage ist positiv."
    },
    {
      "german": "Entfaltung",
      "turkish": "Gelişim, açığa çıkma",
      "exampleSentence": "Die persönliche Entfaltung ist wichtig."
    },
    {
      "german": "Erörterung",
      "turkish": "Münazara, tartışma",
      "exampleSentence": "Das Thema bedarf einer ausführlichen Erörterung."
    },
    {
      "german": "Erwartungshaltung",
      "turkish": "Beklenti",
      "exampleSentence": "Er hat eine hohe Erwartungshaltung."
    },
    {
      "german": "Herangehensweise",
      "turkish": "Yaklaşım tarzı",
      "exampleSentence": "Wir brauchen eine neue Herangehensweise an das Problem."
    },
    {
      "german": "Kompetenz",
      "turkish": "Yetkinlik, yeterlilik",
      "exampleSentence": "Sie verfügt über hohe soziale Kompetenzen."
    },
    {
      "german": "Konsequenz",
      "turkish": "Sonuç, tutarlılık",
      "exampleSentence": "Seine Handlungen hatten weitreichende Konsequenzen."
    },
    {
      "german": "Leitlinie",
      "turkish": "Yol gösterici ilke",
      "exampleSentence": "Diese Leitlinien sollen uns helfen."
    },
    {
      "german": "Perspektive",
      "turkish": "Bakış açısı",
      "exampleSentence": "Aus meiner Perspektive ist das anders."
    },
    {
      "german": "Priorität",
      "turkish": "Öncelik",
      "exampleSentence": "Das hat höchste Priorität."
    },
    {
      "german": "Realisierung",
      "turkish": "Gerçekleşme, hayata geçirme",
      "exampleSentence": "Die Realisierung des Projekts dauert lange."
    },
    {
      "german": "Reflexion",
      "turkish": "Yansıma, düşünce",
      "exampleSentence": "Er ist in tiefer Reflexion versunken."
    },
    {
      "german": "Relevanz",
      "turkish": "Alaka, önem",
      "exampleSentence": "Die Relevanz dieser Studie ist unbestreitbar."
    },
    {
      "german": "Verfahren",
      "turkish": "Yöntem, prosedür",
      "exampleSentence": "Das Verfahren ist sehr komplex."
    },
    {
      "german": "Verständnis",
      "turkish": "Anlayış",
      "exampleSentence": "Für diese Situation habe ich kein Verständnis."
    },
    {
      "german": "Voraussetzung",
      "turkish": "Ön koşul",
      "exampleSentence": "Gute Sprachkenntnisse sind eine Voraussetzung für diesen Job."
    },
    {
      "german": "Wahrnehmung",
      "turkish": "Algı",
      "exampleSentence": "Unsere Wahrnehmung der Welt ist subjektiv."
    },
    {
      "german": "Wechselwirkung",
      "turkish": "Etkileşim",
      "exampleSentence": "Es gibt eine Wechselwirkung zwischen beiden Faktoren."
    },
    {
      "german": "Wertschätzung",
      "turkish": "Takdir, değer verme",
      "exampleSentence": "Er empfindet große Wertschätzung für seine Kollegen."
    },
    {
      "german": "Zusammenhang",
      "turkish": "İlişki, bağlantı",
      "exampleSentence": "Es gibt einen klaren Zusammenhang zwischen den Ereignissen."
    },
    {
      "german": "Zugrunde legen",
      "turkish": "Temel almak",
      "exampleSentence": "Wir müssen die neuesten Daten zugrunde legen."
    },
    {
      "german": "Anerkennung",
      "turkish": "Tanıma, takdir",
      "exampleSentence": "Er erhielt große Anerkennung für seine Arbeit."
    },
    {
      "german": "Ausmaß",
      "turkish": "Boyut, kapsam",
      "exampleSentence": "Das Ausmaß des Schadens ist noch unklar."
    },
    {
      "german": "Beurteilung",
      "turkish": "Değerlendirme",
      "exampleSentence": "Die Beurteilung der Leistung ist fair."
    },
    {
      "german": "Durchführung",
      "turkish": "Uygulama, icra",
      "exampleSentence": "Die Durchführung des Experiments war erfolgreich."
    },
    {
      "german": "Einfluss",
      "turkish": "Etki",
      "exampleSentence": "Er hat großen Einfluss auf die Entscheidung."
    },
    {
      "german": "Engagement",
      "turkish": "Bağlılık, katılım",
      "exampleSentence": "Sein Engagement für das Projekt ist bemerkenswert."
    },
    {
      "german": "Erhebung",
      "turkish": "Toplama, anket",
      "exampleSentence": "Die Erhebung der Daten dauerte lange."
    },
    {
      "german": "Forschung",
      "turkish": "Araştırma",
      "exampleSentence": "Die Forschung in diesem Bereich ist sehr aktiv."
    },
    {
      "german": "Gerechtigkeit",
      "turkish": "Adalet",
      "exampleSentence": "Wir streben nach Gerechtigkeit für alle."
    },
    {
      "german": "Gestaltung",
      "turkish": "Tasarım, şekillendirme",
      "exampleSentence": "Die Gestaltung der Website ist sehr ansprechend."
    },
    {
      "german": "Glaubwürdigkeit",
      "turkish": "Güvenilirlik",
      "exampleSentence": "Die Glaubwürdigkeit der Quelle ist fraglich."
    },
    {
      "german": "Herausforderung",
      "turkish": "Zorluk",
      "exampleSentence": "Die neue Aufgabe ist eine große Herausforderung."
    },
    {
      "german": "Implementierung",
      "turkish": "Uygulama",
      "exampleSentence": "Die Implementierung des Systems dauert noch."
    },
    {
      "german": "Integration",
      "turkish": "Entegrasyon",
      "exampleSentence": "Die Integration neuer Mitarbeiter ist wichtig."
    },
    {
      "german": "Interaktion",
      "turkish": "Etkileşim",
      "exampleSentence": "Die Interaktion zwischen den Schülern ist gut."
    },
    {
      "german": "Konzept",
      "turkish": "Konsept, fikir",
      "exampleSentence": "Das neue Konzept wurde gut angenommen."
    },
    {
      "german": "Legitimität",
      "turkish": "Meşruiyet",
      "exampleSentence": "Die Legitimität der Entscheidung wurde angezweifelt."
    },
    {
      "german": "Methode",
      "turkish": "Metot, yöntem",
      "exampleSentence": "Wir verwenden eine bewährte Methode."
    },
    {
      "german": "Modell",
      "turkish": "Model",
      "exampleSentence": "Das neue Modell ist sehr effizient."
    },
    {
      "german": "Nachhaltigkeit",
      "turkish": "Sürdürülebilirlik",
      "exampleSentence": "Nachhaltigkeit ist ein wichtiges Thema."
    },
    {
      "german": "Optimierung",
      "turkish": "Optimizasyon",
      "exampleSentence": "Wir arbeiten an der Optimierung der Prozesse."
    },
    {
      "german": "Partizipation",
      "turkish": "Katılım",
      "exampleSentence": "Die Partizipation der Bürger ist erwünscht."
    },
    {
      "german": "Phänomen",
      "turkish": "Fenomen",
      "exampleSentence": "Das ist ein interessantes Phänomen."
    },
    {
      "german": "Präzision",
      "turkish": "Hassasiyet, doğruluk",
      "exampleSentence": "Die Präzision der Messungen ist beeindruckend."
    },
    {
      "german": "Qualifizierung",
      "turkish": "Nitelik, vasıf",
      "exampleSentence": "Die Qualifizierung der Mitarbeiter ist entscheidend."
    },
    {
      "german": "Regulierung",
      "turkish": "Düzenleme",
      "exampleSentence": "Die Regulierung des Marktes ist notwendig."
    },
    {
      "german": "Strategie",
      "turkish": "Strateji",
      "exampleSentence": "Wir brauchen eine neue Strategie."
    },
    {
      "german": "Synthese",
      "turkish": "Sentez",
      "exampleSentence": "Das Buch ist eine Synthese aus verschiedenen Theorien."
    },
    {
      "german": "Tendenz",
      "turkish": "Eğilim, trend",
      "exampleSentence": "Es gibt eine Tendenz zu mehr Online-Shopping."
    },
    {
      "german": "Transformation",
      "turkish": "Dönüşüm",
      "exampleSentence": "Die digitale Transformation ist in vollem Gange."
    },
    {
      "german": "Transparenz",
      "turkish": "Şeffaflık",
      "exampleSentence": "Transparenz ist in der Politik wichtig."
    },
    {
      "german": "Validierung",
      "turkish": "Doğrulama, geçerlilik onayı",
      "exampleSentence": "Die Validierung der Daten ist abgeschlossen."
    },
    {
      "german": "Vielfalt",
      "turkish": "Çeşitlilik",
      "exampleSentence": "Die Vielfalt der Kulturen bereichert uns."
    },
    {
      "german": "Vorgehen",
      "turkish": "Prosedür, hareket tarzı",
      "exampleSentence": "Das Vorgehen war sehr systematisch."
    },
    {
      "german": "Wertung",
      "turkish": "Değerlendirme, puanlama",
      "exampleSentence": "Die Wertung der Jury war einstimmig."
    },
    {
      "german": "Zielsetzung",
      "turkish": "Hedef belirleme",
      "exampleSentence": "Die Zielsetzung ist klar definiert."
    },
    {
      "german": "Zusammenarbeit",
      "turkish": "İşbirliği",
      "exampleSentence": "Die Zusammenarbeit mit Partnern ist essenziell."
    },
    {
      "german": "angemessen",
      "turkish": "Uygun, makul",
      "exampleSentence": "Die Belohnung war nicht angemessen."
    },
    {
      "german": "ausschließlich",
      "turkish": "Sadece, yalnızca",
      "exampleSentence": "Dies ist ausschließlich für unsere Mitglieder."
    },
    {
      "german": "bedeutsam",
      "turkish": "Önemli, anlamlı",
      "exampleSentence": "Das war ein bedeutsamer Moment in ihrer Karriere."
    },
    {
      "german": "beträchtlich",
      "turkish": "Önemli ölçüde, kayda değer",
      "exampleSentence": "Die Kosten sind beträchtlich gestiegen."
    },
    {
      "german": "eindeutig",
      "turkish": "Açık, net",
      "exampleSentence": "Das Ergebnis ist eindeutig."
    },
    {
      "german": "erheblich",
      "turkish": "Önemli, kayda değer",
      "exampleSentence": "Es gab eine erhebliche Verbesserung."
    },
    {
      "german": "gezielt",
      "turkish": "Hedefli, amaca yönelik",
      "exampleSentence": "Die Maßnahmen wurden gezielt eingesetzt."
    },
    {
      "german": "grundlegend",
      "turkish": "Temel, esaslı",
      "exampleSentence": "Es gab eine grundlegende Veränderung."
    },
    {
      "german": "hinsichtlich",
      "turkish": "Bakımından, açısından",
      "exampleSentence": "Hinsichtlich der Qualität gibt es keine Kompromisse."
    },
    {
      "german": "insbesondere",
      "turkish": "Özellikle",
      "exampleSentence": "Er mag alle Sportarten, insbesondere Fußball."
    },
    {
      "german": "kritisch",
      "turkish": "Eleştirel, kritik",
      "exampleSentence": "Er äußerte sich kritisch zu dem Vorschlag."
    },
    {
      "german": "maßgeblich",
      "turkish": "Belirleyici, esaslı",
      "exampleSentence": "Seine Entscheidung war maßgeblich für den Erfolg."
    },
    {
      "german": "offensichtlich",
      "turkish": "Açıkça, belli ki",
      "exampleSentence": "Das Problem ist offensichtlich."
    },
    {
      "german": "relevant",
      "turkish": "İlgili, alakalı",
      "exampleSentence": "Diese Information ist nicht relevant für den Fall."
    },
    {
      "german": "umfassend",
      "turkish": "Kapsamlı",
      "exampleSentence": "Er hat ein umfassendes Wissen über das Thema."
    },
    {
      "german": "unzureichend",
      "turkish": "Yetersiz",
      "exampleSentence": "Die Informationen waren unzureichend."
    },
    {
      "german": "verbindlich",
      "turkish": "Bağlayıcı, zorunlu",
      "exampleSentence": "Diese Regeln sind verbindlich."
    },
    {
      "german": "wesentlich",
      "turkish": "Önemli, esaslı",
      "exampleSentence": "Es gibt wesentliche Unterschiede zwischen den beiden."
    },
    {
      "german": "zahlreich",
      "turkish": "Çok sayıda",
      "exampleSentence": "Es gab zahlreiche Besucher auf der Messe."
    },
    {
      "german": "zweifellos",
      "turkish": "Şüphesiz",
      "exampleSentence": "Er ist zweifellos der beste Spieler."
    },
    {
      "german": "aktuell",
      "turkish": "Güncel",
      "exampleSentence": "Die aktuellen Nachrichten sind besorgniserregend."
    },
    {
      "german": "ausreichend",
      "turkish": "Yeterli",
      "exampleSentence": "Das Budget ist nicht ausreichend."
    },
    {
      "german": "derzeit",
      "turkish": "Şu anda, halen",
      "exampleSentence": "Derzeit sind alle Leitungen besetzt."
    },
    {
      "german": "durchaus",
      "turkish": "Kesinlikle, elbette",
      "exampleSentence": "Das ist durchaus möglich."
    },
    {
      "german": "eigentlich",
      "turkish": "Aslında",
      "exampleSentence": "Eigentlich wollte ich heute früher gehen."
    },
    {
      "german": "einschlägig",
      "turkish": "İlgili, yetkili",
      "exampleSentence": "Er hat einschlägige Erfahrungen in diesem Bereich."
    },
    {
      "german": "fortlaufend",
      "turkish": "Sürekli, aralıksız",
      "exampleSentence": "Die Daten werden fortlaufend aktualisiert."
    },
    {
      "german": "gegebenenfalls",
      "turkish": "Gerekirse, icabında",
      "exampleSentence": "Gegebenenfalls müssen wir den Plan ändern."
    },
    {
      "german": "gemeinsam",
      "turkish": "Birlikte, ortak",
      "exampleSentence": "Wir haben gemeinsam an dem Projekt gearbeitet."
    },
    {
      "german": "gleichzeitig",
      "turkish": "Aynı anda",
      "exampleSentence": "Sie sangen und tanzten gleichzeitig."
    },
    {
      "german": "gleichwohl",
      "turkish": "Bununla birlikte, yine de",
      "exampleSentence": "Er war müde, gleichwohl arbeitete er weiter."
    },
    {
      "german": "lediglich",
      "turkish": "Sadece, yalnızca",
      "exampleSentence": "Er hat lediglich versucht zu helfen."
    },
    {
      "german": "mutmaßlich",
      "turkish": "Muhtemel, varsayılan",
      "exampleSentence": "Der mutmaßliche Täter wurde festgenommen."
    },
    {
      "german": "nachträglich",
      "turkish": "Sonradan, ek olarak",
      "exampleSentence": "Die Rechnung wurde nachträglich geschickt."
    },
    {
      "german": "notwendig",
      "turkish": "Gerekli",
      "exampleSentence": "Diese Schritte sind notwendig."
    },
    {
      "german": "offenbar",
      "turkish": "Açıktır ki, görünüşe göre",
      "exampleSentence": "Offenbar hat er die Nachricht nicht erhalten."
    },
    {
      "german": "partiell",
      "turkish": "Kısmen",
      "exampleSentence": "Der Erfolg war nur partiell."
    },
    {
      "german": "schließlich",
      "turkish": "Sonunda, nihayetinde",
      "exampleSentence": "Schließlich hat er es doch geschafft."
    },
    {
      "german": "somit",
      "turkish": "Böylece, dolayısıyla",
      "exampleSentence": "Er war krank, somit konnte er nicht kommen."
    },
    {
      "german": "tatsächlich",
      "turkish": "Gerçekten, aslında",
      "exampleSentence": "Ist das tatsächlich passiert?"
    },
    {
      "german": "umfassend",
      "turkish": "Kapsamlı",
      "exampleSentence": "Er hat umfassende Kenntnisse."
    },
    {
      "german": "unmittelbar",
      "turkish": "Doğrudan, hemen",
      "exampleSentence": "Die Auswirkungen waren unmittelbar spürbar."
    },
    {
      "german": "ursprünglich",
      "turkish": "Başlangıçta, orijinal",
      "exampleSentence": "Das war der ursprüngliche Plan."
    },
    {
      "german": "verhältnismäßig",
      "turkish": "Orantılı, nispeten",
      "exampleSentence": "Die Aufgabe war verhältnismäßig einfach."
    },
    {
      "german": "vermeintlich",
      "turkish": "Sözde, güya",
      "exampleSentence": "Der vermeintliche Experte lag falsch."
    },
    {
      "german": "vollständig",
      "turkish": "Tamamen, eksiksiz",
      "exampleSentence": "Der Bericht ist vollständig."
    },
    {
      "german": "vorwiegend",
      "turkish": "Ağırlıklı olarak, çoğunlukla",
      "exampleSentence": "Das Publikum bestand vorwiegend aus jungen Leuten."
    },
    {
      "german": "zunehmend",
      "turkish": "Giderek artan",
      "exampleSentence": "Die Probleme werden zunehmend komplexer."
    },
    {
      "german": "zugleich",
      "turkish": "Aynı zamanda",
      "exampleSentence": "Er war müde und zugleich glücklich."
    },
    {
      "german": "zusätzlich",
      "turkish": "Ek olarak",
      "exampleSentence": "Wir brauchen zusätzliche Informationen."
    },
    {
      "german": "zweifelhaft",
      "turkish": "Şüpheli",
      "exampleSentence": "Sein Verhalten war zweifelhaft."
    },
    {
      "german": "abgesehen von",
      "turkish": "Dışında, haricinde",
      "exampleSentence": "Abgesehen von einigen Ausnahmen war alles perfekt."
    },
    {
      "german": "aufgrund",
      "turkish": "Nedeniyle, yüzünden",
      "exampleSentence": "Aufgrund des schlechten Wetters wurde das Spiel abgesagt."
    },
    {
      "german": "bezüglich",
      "turkish": "İle ilgili olarak",
      "exampleSentence": "Bezüglich Ihrer Anfrage möchte ich Ihnen mitteilen..."
    },
    {
      "german": "einschließlich",
      "turkish": "Dahil",
      "exampleSentence": "Der Preis ist inklusive Mehrwertsteuer."
    },
    {
      "german": "infolge",
      "turkish": "Sonucunda",
      "exampleSentence": "Infolge des Unfalls gab es lange Staus."
    },
    {
      "german": "insofern",
      "turkish": "Bu bakımdan, bu açıdan",
      "exampleSentence": "Insofern haben Sie Recht."
    },
    {
      "german": "sowie",
      "turkish": "Ve, ile birlikte",
      "exampleSentence": "Wir laden Sie sowie Ihre Familie herzlich ein."
    },
    {
      "german": "ungeachtet",
      "turkish": "Rağmen",
      "exampleSentence": "Ungeachtet der Schwierigkeiten hat er es geschafft."
    },
    {
      "german": "vielmehr",
      "turkish": "Daha ziyade, aksine",
      "exampleSentence": "Das ist nicht schlecht, vielmehr sehr gut."
    },
    {
      "german": "während",
      "turkish": "Sırasında, iken",
      "exampleSentence": "Während des Essens sprach niemand."
    },
    {
      "german": "wogegen",
      "turkish": "Oysa, karşın",
      "exampleSentence": "Er ist sehr fleißig, wogegen sein Bruder faul ist."
    },
    {
      "german": "zumal",
      "turkish": "Özellikle de, hele ki",
      "exampleSentence": "Ich bin enttäuscht, zumal ich ihm vertraut habe."
    },
    {
      "german": "zudem",
      "turkish": "Ayrıca, üstelik",
      "exampleSentence": "Das Essen war lecker, zudem preiswert."
    },
    {
      "german": "zuzüglich",
      "turkish": "Artı, ek olarak",
      "exampleSentence": "Der Preis ist zuzüglich Versandkosten."
    },
    {
      "german": "ansonsten",
      "turkish": "Aksi takdirde, yoksa",
      "exampleSentence": "Beeilen Sie sich, ansonsten verpassen Sie den Zug."
    },
    {
      "german": "demnach",
      "turkish": "Buna göre, dolayısıyla",
      "exampleSentence": "Demnach ist die Theorie widerlegt."
    },
    {
      "german": "folglich",
      "turkish": "Sonuç olarak, dolayısıyla",
      "exampleSentence": "Er war krank, folglich konnte er nicht zur Arbeit."
    },
    {
      "german": "insofern",
      "turkish": "Bu bakımdan, bu ölçüde",
      "exampleSentence": "Insofern ist Ihre Kritik berechtigt."
    },
    {
      "german": "mithin",
      "turkish": "Bu nedenle, dolayısıyla",
      "exampleSentence": "Er hat seine Prüfung bestanden, mithin kann er studieren."
    },
    {
      "german": "somit",
      "turkish": "Böylece, dolayısıyla",
      "exampleSentence": "Er war krank, somit konnte er nicht kommen."
    },
    {
      "german": "trotzdem",
      "turkish": "Yine de, buna rağmen",
      "exampleSentence": "Es regnete, trotzdem gingen wir spazieren."
    },
    {
      "german": "unterdessen",
      "turkish": "Bu arada",
      "exampleSentence": "Ich koche das Essen, unterdessen kannst du den Tisch decken."
    },
    {
      "german": "vielmehr",
      "turkish": "Daha ziyade, aksine",
      "exampleSentence": "Er hat nicht geschlafen, vielmehr die ganze Nacht gearbeitet."
    },
    {
      "german": "wobei",
      "turkish": "Bu arada, ki bu da",
      "exampleSentence": "Er erzählte eine Geschichte, wobei er viel lachte."
    },
    {
      "german": "abgesehen von",
      "turkish": "Haricinde",
      "exampleSentence": "Abgesehen von einigen Kleinigkeiten ist alles in Ordnung."
    },
    {
      "german": "einerseits ... andererseits",
      "turkish": "Bir yandan ... diğer yandan",
      "exampleSentence": "Einerseits ist es teuer, andererseits ist die Qualität sehr gut."
    },
    {
      "german": "im Allgemeinen",
      "turkish": "Genel olarak",
      "exampleSentence": "Im Allgemeinen bin ich mit dem Ergebnis zufrieden."
    },
    {
      "german": "in der Regel",
      "turkish": "Genellikle, kural olarak",
      "exampleSentence": "In der Regel arbeite ich bis 17 Uhr."
    },
    {
      "german": "im Hinblick auf",
      "turkish": "Bakımından, açısından",
      "exampleSentence": "Im Hinblick auf die Zukunft müssen wir planen."
    },
    {
      "german": "im Rahmen",
      "turkish": "Çerçevesinde, kapsamında",
      "exampleSentence": "Die Veranstaltung findet im Rahmen des Festivals statt."
    },
    {
      "german": "im Zusammenhang mit",
      "turkish": "İle ilgili olarak",
      "exampleSentence": "Im Zusammenhang mit dem Vorfall ermittelt die Polizei."
    },
    {
      "german": "im Wesentlichen",
      "turkish": "Esas olarak, özünde",
      "exampleSentence": "Die Änderungen betreffen im Wesentlichen die Struktur."
    },
    {
      "german": "in Bezug auf",
      "turkish": "İle ilgili olarak",
      "exampleSentence": "In Bezug auf Ihre Frage kann ich Ihnen sagen..."
    },
    {
      "german": "von Bedeutung",
      "turkish": "Önemli",
      "exampleSentence": "Das ist von großer Bedeutung für uns."
    },
    {
      "german": "zur Verfügung stehen",
      "turkish": "Mevcut olmak, hazır olmak",
      "exampleSentence": "Die Informationen stehen Ihnen zur Verfügung."
    },
    {
      "german": "zur Kenntnis nehmen",
      "turkish": "Bilgisine sunmak, dikkate almak",
      "exampleSentence": "Ich habe Ihre Nachricht zur Kenntnis genommen."
    },
    {
      "german": "zurückführen auf",
      "turkish": "Dayandırmak, atfetmek",
      "exampleSentence": "Man kann den Erfolg auf harte Arbeit zurückführen."
    },
    {
      "german": "achten auf",
      "turkish": "Dikkat etmek, özen göstermek",
      "exampleSentence": "Bitte achten Sie auf die Verkehrszeichen."
    },
    {
      "german": "ändern",
      "turkish": "Değiştirmek",
      "exampleSentence": "Wir müssen den Plan ändern."
    },
    {
      "german": "anfangen",
      "turkish": "Başlamak",
      "exampleSentence": "Wann fängt der Film an?"
    },
    {
      "german": "ankommen",
      "turkish": "Varmak",
      "exampleSentence": "Wann kommst du an?"
    },
    {
      "german": "annehmen",
      "turkish": "Kabul etmek, varsaymak",
      "exampleSentence": "Ich nehme das Geschenk an."
    },
    {
      "german": "antworten",
      "turkish": "Cevap vermek",
      "exampleSentence": "Bitte antworte mir schnell."
    },
    {
      "german": "arbeiten",
      "turkish": "Çalışmak",
      "exampleSentence": "Ich arbeite als Lehrer."
    },
    {
      "german": "aufhören",
      "turkish": "Bırakmak, sona ermek",
      "exampleSentence": "Hören Sie bitte auf zu rauchen."
    },
    {
      "german": "aufnehmen",
      "turkish": "Kaydetmek, kabul etmek",
      "exampleSentence": "Er wurde in die Partei aufgenommen."
    },
    {
      "german": "ausdrücken",
      "turkish": "İfade etmek",
      "exampleSentence": "Wie drückt man das auf Deutsch aus?"
    },
    {
      "german": "ausgehen",
      "turkish": "Dışarı çıkmak, tükenmek",
      "exampleSentence": "Gehen wir heute Abend aus?"
    },
    {
      "german": "bekommen",
      "turkish": "Almak, elde etmek",
      "exampleSentence": "Ich habe einen Brief bekommen."
    },
    {
      "german": "berichten",
      "turkish": "Bildirmek, rapor etmek",
      "exampleSentence": "Er berichtet über die Neuigkeiten."
    },
    {
      "german": "bestehen",
      "turkish": "Var olmak, başarmak (sınavda), oluşmak",
      "exampleSentence": "Das Problem besteht immer noch."
    },
    {
      "german": "betonen",
      "turkish": "Vurgulamak",
      "exampleSentence": "Er betonte die Wichtigkeit der Sache."
    },
    {
      "german": "beziehen",
      "turkish": "İlişkilendirmek, almak (gelir)",
      "exampleSentence": "Worauf bezieht sich diese Aussage?"
    },
    {
      "german": "bieten",
      "turkish": "Sunmak, teklif etmek",
      "exampleSentence": "Wir bieten Ihnen einen guten Service."
    },
    {
      "german": "brauchen",
      "turkish": "İhtiyaç duymak",
      "exampleSentence": "Ich brauche deine Hilfe."
    },
    {
      "german": "denken",
      "turkish": "Düşünmek",
      "exampleSentence": "Was denkst du darüber?"
    },
    {
      "german": "diskutieren",
      "turkish": "Tartışmak",
      "exampleSentence": "Wir müssen über dieses Thema diskutieren."
    },
    {
      "german": "einigen sich",
      "turkish": "Anlaşmak",
      "exampleSentence": "Wir konnten uns einigen."
    },
    {
      "german": "einschätzen",
      "turkish": "Tahmin etmek, değerlendirmek",
      "exampleSentence": "Wie schätzt du die Lage ein?"
    },
    {
      "german": "entscheiden",
      "turkish": "Karar vermek",
      "exampleSentence": "Ich muss mich entscheiden."
    },
    {
      "german": "entwickeln",
      "turkish": "Geliştirmek",
      "exampleSentence": "Die Firma entwickelt neue Produkte."
    },
    {
      "german": "erfahren",
      "turkish": "Tecrübe etmek, öğrenmek",
      "exampleSentence": "Ich habe es heute erfahren."
    },
    {
      "german": "erhöhen",
      "turkish": "Artırmak, yükseltmek",
      "exampleSentence": "Die Preise wurden erhöht."
    },
    {
      "german": "erklären",
      "turkish": "Açıklamak",
      "exampleSentence": "Kannst du mir das erklären?"
    },
    {
      "german": "erlauben",
      "turkish": "İzin vermek",
      "exampleSentence": "Erlauben Sie mir eine Frage?"
    },
    {
      "german": "erreichen",
      "turkish": "Ulaşmak, elde etmek",
      "exampleSentence": "Wir haben unser Ziel erreicht."
    },
    {
      "german": "erwähnen",
      "turkish": "Bahsetmek",
      "exampleSentence": "Erwähn das bitte nicht."
    },
    {
      "german": "fehlen",
      "turkish": "Eksik olmak, yok olmak",
      "exampleSentence": "Mir fehlt die nötige Erfahrung."
    },
    {
      "german": "feststellen",
      "turkish": "Tespit etmek, belirlemek",
      "exampleSentence": "Wir haben festgestellt, dass..."
    },
    {
      "german": "folgen",
      "turkish": "Takip etmek, izlemek",
      "exampleSentence": "Bitte folgen Sie mir."
    },
    {
      "german": "führen",
      "turkish": "Yönetmek, götürmek",
      "exampleSentence": "Wer führt das Unternehmen?"
    },
    {
      "german": "gelten",
      "turkish": "Geçerli olmak, sayılmak",
      "exampleSentence": "Diese Regel gilt für alle."
    },
    {
      "german": "handeln",
      "turkish": "Hareket etmek, ticaret yapmak",
      "exampleSentence": "Er handelt im Interesse der Firma."
    },
    {
      "german": "hinweisen",
      "turkish": "İşaret etmek, dikkat çekmek",
      "exampleSentence": "Ich möchte Sie auf etwas hinweisen."
    },
    {
      "german": "hoffen",
      "turkish": "Ummak",
      "exampleSentence": "Ich hoffe, du kommst."
    },
    {
      "german": "informieren",
      "turkish": "Bilgilendirmek",
      "exampleSentence": "Ich informiere Sie über die Änderungen."
    },
    {
      "german": "kennen",
      "turkish": "Tanımak, bilmek",
      "exampleSentence": "Ich kenne diesen Mann nicht."
    },
    {
      "german": "klären",
      "turkish": "Aydınlatmak, açıklığa kavuşturmak",
      "exampleSentence": "Wir müssen das Missverständnis klären."
    },
    {
      "german": "kommen",
      "turkish": "Gelmek",
      "exampleSentence": "Kommt ihr mit?"
    },
    {
      "german": "können",
      "turkish": "Yapabilmek, edebilmek",
      "exampleSentence": "Ich kann gut Deutsch sprechen."
    },
    {
      "german": "lösen",
      "turkish": "Çözmek",
      "exampleSentence": "Wir müssen das Problem lösen."
    },
    {
      "german": "machen",
      "turkish": "Yapmak",
      "exampleSentence": "Was machst du gerade?"
    },
    {
      "german": "meinen",
      "turkish": "Demek istemek, kastetmek",
      "exampleSentence": "Was meinst du damit?"
    },
    {
      "german": "nehmen",
      "turkish": "Almak",
      "exampleSentence": "Ich nehme den Bus."
    },
    {
      "german": "nennen",
      "turkish": "Adlandırmak, söylemek",
      "exampleSentence": "Wie nennen Sie dieses Gericht?"
    },
    {
      "german": "nutzen",
      "turkish": "Kullanmak, faydalanmak",
      "exampleSentence": "Ich nutze die Gelegenheit."
    },
    {
      "german": "passen",
      "turkish": "Uymak, yakışmak",
      "exampleSentence": "Diese Schuhe passen mir nicht."
    },
    {
      "german": "reden",
      "turkish": "Konuşmak",
      "exampleSentence": "Wir müssen reden."
    },
    {
      "german": "sagen",
      "turkish": "Söylemek",
      "exampleSentence": "Was hast du gesagt?"
    },
    {
      "german": "schreiben",
      "turkish": "Yazmak",
      "exampleSentence": "Schreibst du mir eine E-Mail?"
    },
    {
      "german": "sehen",
      "turkish": "Görmek",
      "exampleSentence": "Hast du das gesehen?"
    },
    {
      "german": "senden",
      "turkish": "Göndermek",
      "exampleSentence": "Ich sende dir ein Paket."
    },
    {
      "german": "setzen",
      "turkish": "Koymak, oturmak",
      "exampleSentence": "Setz dich bitte."
    },
    {
      "german": "sprechen",
      "turkish": "Konuşmak",
      "exampleSentence": "Sprichst du Englisch?"
    },
    {
      "german": "stehen",
      "turkish": "Durmak",
      "exampleSentence": "Das Buch steht im Regal."
    },
    {
      "german": "stellen",
      "turkish": "Koymak, yerleştirmek",
      "exampleSentence": "Stell die Vase auf den Tisch."
    },
    {
      "german": "suchen",
      "turkish": "Aramak",
      "exampleSentence": "Ich suche meinen Schlüssel."
    },
    {
      "german": "teilen",
      "turkish": "Paylaşmak",
      "exampleSentence": "Kannst du das mit mir teilen?"
    },
    {
      "german": "treffen",
      "turkish": "Bulmak, karşılaşmak, isabet etmek",
      "exampleSentence": "Wir treffen uns um 7 Uhr."
    },
    {
      "german": "tun",
      "turkish": "Yapmak",
      "exampleSentence": "Was tust du gerade?"
    },
    {
      "german": "umgehen",
      "turkish": "Başa çıkmak, ele almak",
      "exampleSentence": "Wie gehst du mit Stress um?"
    },
    {
      "german": "unternehmen",
      "turkish": "Girişimde bulunmak, yapmak (eğlence)",
      "exampleSentence": "Was unternehmen wir am Wochenende?"
    },
    {
      "german": "unterstützen",
      "turkish": "Desteklemek",
      "exampleSentence": "Ich unterstütze deine Entscheidung."
    },
    {
      "german": "verbinden",
      "turkish": "Bağlamak, birleştirmek",
      "exampleSentence": "Verbinden Sie mich bitte mit Herrn Müller."
    },
    {
      "german": "verbessern",
      "turkish": "İyileştirmek",
      "exampleSentence": "Ich möchte meine Deutschkenntnisse verbessern."
    },
    {
      "german": "vereinfachen",
      "turkish": "Basitleştirmek",
      "exampleSentence": "Wir sollten den Prozess vereinfachen."
    },
    {
      "german": "vergleichen",
      "turkish": "Karşılaştırmak",
      "exampleSentence": "Vergleiche die beiden Angebote."
    },
    {
      "german": "verlangen",
      "turkish": "Talep etmek, istemek",
      "exampleSentence": "Er verlangt zu viel."
    },
    {
      "german": "verlieren",
      "turkish": "Kaybetmek",
      "exampleSentence": "Ich habe meinen Schlüssel verloren."
    },
    {
      "german": "vermeiden",
      "turkish": "Kaçınmak, engellemek",
      "exampleSentence": "Wir sollten Fehler vermeiden."
    },
    {
      "german": "veröffentlichen",
      "turkish": "Yayımlamak",
      "exampleSentence": "Der Artikel wurde veröffentlicht."
    },
    {
      "german": "verstehen",
      "turkish": "Anlamak",
      "exampleSentence": "Verstehst du das?"
    },
    {
      "german": "verursachen",
      "turkish": "Neden olmak, yol açmak",
      "exampleSentence": "Der Unfall hat großen Schaden verursacht."
    },
    {
      "german": "verwalten",
      "turkish": "Yönetmek, idare etmek",
      "exampleSentence": "Er verwaltet die Finanzen."
    },
    {
      "german": "verwenden",
      "turkish": "Kullanmak, uygulamak",
      "exampleSentence": "Welches Material wird hier verwendet?"
    },
    {
      "german": "vorbereiten",
      "turkish": "Hazırlamak",
      "exampleSentence": "Ich bereite das Abendessen vor."
    },
    {
      "german": "vorkommen",
      "turkish": "Meydana gelmek, olmak",
      "exampleSentence": "Das kommt häufig vor."
    },
    {
      "german": "vorschlagen",
      "turkish": "Teklif etmek",
      "exampleSentence": "Ich schlage vor, dass wir uns treffen."
    },
    {
      "german": "vorstellen",
      "turkish": "Tanıtmak, hayal etmek",
      "exampleSentence": "Ich möchte mich kurz vorstellen."
    },
    {
      "german": "wählen",
      "turkish": "Seçmek",
      "exampleSentence": "Wen willst du wählen?"
    },
    {
      "german": "warten",
      "turkish": "Beklemek",
      "exampleSentence": "Ich warte auf dich."
    },
    {
      "german": "werden",
      "turkish": "Olmak",
      "exampleSentence": "Er wird Arzt."
    },
    {
      "german": "wissen",
      "turkish": "Bilmek",
      "exampleSentence": "Ich weiß es nicht."
    },
    {
      "german": "zeigen",
      "turkish": "Göstermek",
      "exampleSentence": "Kannst du mir den Weg zeigen?"
    },
    {
      "german": "ziehen",
      "turkish": "Çekmek, taşınmak",
      "exampleSentence": "Er zieht nach Berlin."
    },
    {
      "german": "zwingen",
      "turkish": "Zorlamak",
      "exampleSentence": "Ich zwinge dich nicht dazu."
    },
    {
      "german": "der Abschied",
      "turkish": "Veda",
      "exampleSentence": "Der Abschied fiel mir schwer."
    },
    {
      "german": "die Abteilung",
      "turkish": "Bölüm, departman",
      "exampleSentence": "Er arbeitet in der Marketingabteilung."
    },
    {
      "german": "die Angelegenheit",
      "turkish": "Mesele, konu",
      "exampleSentence": "Das ist eine private Angelegenheit."
    },
    {
      "german": "der Anspruch",
      "turkish": "Hak, talep",
      "exampleSentence": "Jeder hat Anspruch auf Bildung."
    },
    {
      "german": "der Aufwand",
      "turkish": "Çaba, masraf",
      "exampleSentence": "Der Aufwand hat sich gelohnt."
    },
    {
      "german": "der Begriff",
      "turkish": "Kavram, terim",
      "exampleSentence": "Erkläre mir diesen Begriff."
    },
    {
      "german": "der Bereich",
      "turkish": "Alan, bölge",
      "exampleSentence": "Das ist mein Arbeitsbereich."
    },
    {
      "german": "der Betrag",
      "turkish": "Miktar, tutar",
      "exampleSentence": "Bitte überweisen Sie den Betrag."
    },
    {
      "german": "die Beziehung",
      "turkish": "İlişki",
      "exampleSentence": "Unsere Beziehung ist gut."
    },
    {
      "german": "der Bürger",
      "turkish": "Vatandaş",
      "exampleSentence": "Die Rechte der Bürger sind wichtig."
    },
    {
      "german": "der Einfluss",
      "turkish": "Etki",
      "exampleSentence": "Er hat großen Einfluss auf mich."
    },
    {
      "german": "die Einstellung",
      "turkish": "Tutum, bakış açısı",
      "exampleSentence": "Sie hat eine positive Einstellung zum Leben."
    },
    {
      "german": "die Entscheidung",
      "turkish": "Karar",
      "exampleSentence": "Das ist eine wichtige Entscheidung."
    },
    {
      "german": "die Entwicklung",
      "turkish": "Gelişim",
      "exampleSentence": "Die Entwicklung des Projekts ist positiv."
    },
    {
      "german": "das Ergebnis",
      "turkish": "Sonuç",
      "exampleSentence": "Das Ergebnis der Prüfung ist gut."
    },
    {
      "german": "die Erfahrung",
      "turkish": "Tecrübe",
      "exampleSentence": "Ich habe viel Erfahrung in diesem Bereich."
    },
    {
      "german": "die Fähigkeit",
      "turkish": "Yetenek",
      "exampleSentence": "Sie hat eine besondere Fähigkeit."
    },
    {
      "german": "die Folge",
      "turkish": "Sonuç, dizi",
      "exampleSentence": "Was ist die Folge davon?"
    },
    {
      "german": "die Freiheit",
      "turkish": "Özgürlük",
      "exampleSentence": "Die Freiheit ist ein hohes Gut."
    },
    {
      "german": "die Gelegenheit",
      "turkish": "Fırsat",
      "exampleSentence": "Nutzen Sie die Gelegenheit."
    },
    {
      "german": "die Gesellschaft",
      "turkish": "Toplum, şirket",
      "exampleSentence": "Wir leben in einer freien Gesellschaft."
    },
    {
      "german": "die Gewissheit",
      "turkish": "Kesinlik",
      "exampleSentence": "Ich habe die Gewissheit, dass alles gut wird."
    },
    {
      "german": "die Grundlage",
      "turkish": "Temel",
      "exampleSentence": "Das ist die Grundlage für unseren Erfolg."
    },
    {
      "german": "die Herausforderung",
      "turkish": "Zorluk",
      "exampleSentence": "Das ist eine große Herausforderung."
    },
    {
      "german": "der Hintergrund",
      "turkish": "Arka plan",
      "exampleSentence": "Was steckt im Hintergrund?"
    },
    {
      "german": "das Interesse",
      "turkish": "İlgi",
      "exampleSentence": "Ich habe großes Interesse daran."
    },
    {
      "german": "die Kenntnis",
      "turkish": "Bilgi",
      "exampleSentence": "Er hat gute Kenntnisse in Mathematik."
    },
    {
      "german": "die Kommunikation",
      "turkish": "İletişim",
      "exampleSentence": "Gute Kommunikation ist wichtig."
    },
    {
      "german": "die Konsequenz",
      "turkish": "Sonuç, tutarlılık",
      "exampleSentence": "Die Konsequenzen waren schwerwiegend."
    },
    {
      "german": "der Kontext",
      "turkish": "Bağlam",
      "exampleSentence": "Verstehst du den Kontext?"
    },
    {
      "german": "die Kraft",
      "turkish": "Güç, kuvvet",
      "exampleSentence": "Ich habe keine Kraft mehr."
    },
    {
      "german": "die Lage",
      "turkish": "Durum, konum",
      "exampleSentence": "Die politische Lage ist ernst."
    },
    {
      "german": "die Leistung",
      "turkish": "Başarı, performans",
      "exampleSentence": "Das ist eine beeindruckende Leistung."
    },
    {
      "german": "die Lösung",
      "turkish": "Çözüm",
      "exampleSentence": "Wir suchen eine Lösung für das Problem."
    },
    {
      "german": "die Macht",
      "turkish": "Güç, iktidar",
      "exampleSentence": "Die Macht liegt beim Volk."
    },
    {
      "german": "die Maßnahme",
      "turkish": "Tedbir, önlem",
      "exampleSentence": "Wir müssen Maßnahmen ergreifen."
    },
    {
      "german": "die Meinung",
      "turkish": "Fikir",
      "exampleSentence": "Meine Meinung ist anders."
    },
    {
      "german": "die Möglichkeit",
      "turkish": "İmkan, olasılık",
      "exampleSentence": "Es gibt viele Möglichkeiten."
    },
    {
      "german": "die Notwendigkeit",
      "turkish": "Gereklilik",
      "exampleSentence": "Die Notwendigkeit einer Veränderung ist klar."
    },
    {
      "german": "der Plan",
      "turkish": "Plan",
      "exampleSentence": "Hast du einen Plan?"
    },
    {
      "german": "das Prinzip",
      "turkish": "Prensip",
      "exampleSentence": "Das ist ein wichtiges Prinzip."
    },
    {
      "german": "das Risiko",
      "turkish": "Risk",
      "exampleSentence": "Gehen wir das Risiko ein?"
    },
    {
      "german": "die Rolle",
      "turkish": "Rol",
      "exampleSentence": "Sie spielt eine wichtige Rolle."
    },
    {
      "german": "die Sicherheit",
      "turkish": "Güvenlik",
      "exampleSentence": "Die Sicherheit der Daten ist wichtig."
    },
    {
      "german": "die Stellung",
      "turkish": "Konum, pozisyon",
      "exampleSentence": "Er hat eine gute Stellung in der Firma."
    },
    {
      "german": "die Strategie",
      "turkish": "Strateji",
      "exampleSentence": "Unsere Strategie ist erfolgreich."
    },
    {
      "german": "das System",
      "turkish": "Sistem",
      "exampleSentence": "Das System funktioniert nicht."
    },
    {
      "german": "das Thema",
      "turkish": "Konu",
      "exampleSentence": "Das ist ein interessantes Thema."
    },
    {
      "german": "die Teilnahme",
      "turkish": "Katılım",
      "exampleSentence": "Ihre Teilnahme ist erwünscht."
    },
    {
      "german": "der Umgang",
      "turkish": "Davranış, kullanım",
      "exampleSentence": "Der Umgang mit Kunden ist wichtig."
    },
    {
      "german": "die Umsetzung",
      "turkish": "Uygulama",
      "exampleSentence": "Die Umsetzung des Plans ist schwierig."
    },
    {
      "german": "die Ursache",
      "turkish": "Neden, sebep",
      "exampleSentence": "Was ist die Ursache des Problems?"
    },
    {
      "german": "die Verantwortung",
      "turkish": "Sorumluluk",
      "exampleSentence": "Übernehmen Sie die Verantwortung!"
    },
    {
      "german": "die Vereinbarung",
      "turkish": "Anlaşma",
      "exampleSentence": "Wir haben eine Vereinbarung getroffen."
    },
    {
      "german": "das Verfahren",
      "turkish": "Yöntem, prosedür",
      "exampleSentence": "Das Verfahren ist komplex."
    },
    {
      "german": "das Verhalten",
      "turkish": "Davranış",
      "exampleSentence": "Sein Verhalten war unprofessionell."
    },
    {
      "german": "der Vergleich",
      "turkish": "Karşılaştırma",
      "exampleSentence": "Im Vergleich zu letztem Jahr..."
    },
    {
      "german": "das Verhältnis",
      "turkish": "İlişki, oran",
      "exampleSentence": "Das Verhältnis ist gut."
    },
    {
      "german": "der Vorschlag",
      "turkish": "Teklif",
      "exampleSentence": "Ich habe einen Vorschlag."
    },
    {
      "german": "der Vorteil",
      "turkish": "Avantaj",
      "exampleSentence": "Das hat viele Vorteile."
    },
    {
      "german": "der Wandel",
      "turkish": "Değişim",
      "exampleSentence": "Der Wandel ist spürbar."
    },
    {
      "german": "die Weise",
      "turkish": "Tarz, yol",
      "exampleSentence": "Auf diese Weise können wir es schaffen."
    },
    {
      "german": "die Wirkung",
      "turkish": "Etki",
      "exampleSentence": "Die Wirkung des Medikaments ist stark."
    },
    {
      "german": "das Wissen",
      "turkish": "Bilgi",
      "exampleSentence": "Sein Wissen ist beeindruckend."
    },
    {
      "german": "der Zweck",
      "turkish": "Amaç, gaye",
      "exampleSentence": "Was ist der Zweck dieser Reise?"
    },
    {
      "german": "der Zustand",
      "turkish": "Durum",
      "exampleSentence": "Der Zustand des Hauses ist schlecht."
    },
    {
      "german": "der Zusammenhang",
      "turkish": "İlişki, bağlantı",
      "exampleSentence": "Es gibt einen Zusammenhang."
    },
    {
      "german": "der Zugang",
      "turkish": "Erişim",
      "exampleSentence": "Der Zugang ist beschränkt."
    },
    {
      "german": "die Zustimmung",
      "turkish": "Onay",
      "exampleSentence": "Ich brauche Ihre Zustimmung."
    },
    {
      "german": "Annahme",
      "turkish": "Varsayım",
      "exampleSentence": "Das ist nur eine Annahme."
    },
    {
      "german": "Anspruch",
      "turkish": "Hak, iddia",
      "exampleSentence": "Ich habe keinen Anspruch darauf."
    },
    {
      "german": "Beurteilung",
      "turkish": "Değerlendirme",
      "exampleSentence": "Die Beurteilung der Situation ist schwierig."
    },
    {
      "german": "Bilanz",
      "turkish": "Bilanço, denge",
      "exampleSentence": "Wir ziehen eine positive Bilanz."
    },
    {
      "german": "Konzept",
      "turkish": "Konsept, kavram",
      "exampleSentence": "Das ist ein neues Konzept."
    },
    {
      "german": "Kriterium",
      "turkish": "Kriter",
      "exampleSentence": "Was sind die Kriterien?"
    },
    {
      "german": "Prozess",
      "turkish": "Süreç",
      "exampleSentence": "Der Prozess dauert lange."
    },
    {
      "german": "These",
      "turkish": "Tez, iddia",
      "exampleSentence": "Das ist eine interessante These."
    },
    {
      "german": "Umgang",
      "turkish": "Davranış, kullanma",
      "exampleSentence": "Der Umgang mit Kunden ist wichtig."
    },
    {
      "german": "Umstand",
      "turkish": "Durum, koşul",
      "exampleSentence": "Unter diesen Umständen ist das nicht möglich."
    },
    {
      "german": "Verständnis",
      "turkish": "Anlayış",
      "exampleSentence": "Ich habe volles Verständnis."
    },
    {
      "german": "Vorgehen",
      "turkish": "Yöntem, prosedür",
      "exampleSentence": "Das Vorgehen war sehr systematisch."
    },
    {
      "german": "aktuell",
      "turkish": "Güncel",
      "exampleSentence": "Das ist ein aktuelles Thema."
    },
    {
      "german": "allgemein",
      "turkish": "Genel",
      "exampleSentence": "Das ist eine allgemeine Regel."
    },
    {
      "german": "angeblich",
      "turkish": "Sözde, iddiaya göre",
      "exampleSentence": "Der angebliche Täter wurde gefasst."
    },
    {
      "german": "angenehm",
      "turkish": "Hoş, keyifli",
      "exampleSentence": "Das Wetter ist angenehm."
    },
    {
      "german": "anscheinend",
      "turkish": "Görünüşe göre",
      "exampleSentence": "Anscheinend hat er es vergessen."
    },
    {
      "german": "ausreichend",
      "turkish": "Yeterli",
      "exampleSentence": "Das ist nicht ausreichend."
    },
    {
      "german": "bedeutend",
      "turkish": "Önemli, anlamlı",
      "exampleSentence": "Das ist ein bedeutender Schritt."
    },
    {
      "german": "bestimmte",
      "turkish": "Belirli",
      "exampleSentence": "Es gibt bestimmte Regeln."
    },
    {
      "german": "deutlich",
      "turkish": "Açık, belirgin",
      "exampleSentence": "Das ist deutlich zu sehen."
    },
    {
      "german": "direkt",
      "turkish": "Doğrudan",
      "exampleSentence": "Er kommt direkt von der Arbeit."
    },
    {
      "german": "eigentlich",
      "turkish": "Aslında",
      "exampleSentence": "Eigentlich wollte ich etwas anderes sagen."
    },
    {
      "german": "eindeutig",
      "turkish": "Açık, net",
      "exampleSentence": "Das Ergebnis ist eindeutig."
    },
    {
      "german": "einfach",
      "turkish": "Basit, kolay",
      "exampleSentence": "Das ist ganz einfach."
    },
    {
      "german": "einzeln",
      "turkish": "Tek tek, ayrı ayrı",
      "exampleSentence": "Wir müssen jeden einzelnen Fall prüfen."
    },
    {
      "german": "entscheidend",
      "turkish": "Belirleyici",
      "exampleSentence": "Das ist der entscheidende Punkt."
    },
    {
      "german": "erheblich",
      "turkish": "Önemli, kayda değer",
      "exampleSentence": "Es gab erhebliche Mängel."
    },
    {
      "german": "erstmalig",
      "turkish": "İlk kez",
      "exampleSentence": "Das geschieht erstmalig."
    },
    {
      "german": "etwa",
      "turkish": "Yaklaşık, örneğin",
      "exampleSentence": "Es dauert etwa eine Stunde."
    },
    {
      "german": "eventuell",
      "turkish": "Belki, muhtemelen",
      "exampleSentence": "Eventuell komme ich später."
    },
    {
      "german": "exakt",
      "turkish": "Tam, kesin",
      "exampleSentence": "Das ist die exakte Zahl."
    },
    {
      "german": "folgend",
      "turkish": "Sonraki, aşağıdaki",
      "exampleSentence": "Bitte lesen Sie den folgenden Text."
    },
    {
      "german": "formal",
      "turkish": "Resmi",
      "exampleSentence": "Das ist eine formale Angelegenheit."
    },
    {
      "german": "freiwillig",
      "turkish": "Gönüllü",
      "exampleSentence": "Ich habe das freiwillig gemacht."
    },
    {
      "german": "generell",
      "turkish": "Genel olarak",
      "exampleSentence": "Generell stimme ich zu."
    },
    {
      "german": "gewiss",
      "turkish": "Kesin, belli",
      "exampleSentence": "Ich bin gewiss, dass..."
    },
    {
      "german": "gleichzeitig",
      "turkish": "Aynı anda",
      "exampleSentence": "Sie kamen gleichzeitig an."
    },
    {
      "german": "grundsätzlich",
      "turkish": "Prensip olarak, temelde",
      "exampleSentence": "Grundsätzlich bin ich einverstanden."
    },
    {
      "german": "häufig",
      "turkish": "Sıkça",
      "exampleSentence": "Das kommt häufig vor."
    },
    {
      "german": "herausragend",
      "turkish": "Olağanüstü, seçkin",
      "exampleSentence": "Er hat eine herausragende Leistung gezeigt."
    },
    {
      "german": "hinsichtlich",
      "turkish": "Bakımından, açısından",
      "exampleSentence": "Hinsichtlich der Kosten gibt es Probleme."
    },
    {
      "german": "immerhin",
      "turkish": "Yine de, en azından",
      "exampleSentence": "Immerhin hat er es versucht."
    },
    {
      "german": "insbesondere",
      "turkish": "Özellikle",
      "exampleSentence": "Ich mag alle Früchte, insbesondere Äpfel."
    },
    {
      "german": "irgendwann",
      "turkish": "Bir ara, bir gün",
      "exampleSentence": "Wir sehen uns irgendwann wieder."
    },
    {
      "german": "komplex",
      "turkish": "Karmaşık",
      "exampleSentence": "Das Problem ist sehr komplex."
    },
    {
      "german": "konsequent",
      "turkish": "Tutarlı",
      "exampleSentence": "Sie ist sehr konsequent in ihren Entscheidungen."
    },
    {
      "german": "konstant",
      "turkish": "Sabit, sürekli",
      "exampleSentence": "Die Temperatur bleibt konstant."
    },
    {
      "german": "kritisch",
      "turkish": "Eleştirel",
      "exampleSentence": "Sein Blick war kritisch."
    },
    {
      "german": "letztendlich",
      "turkish": "Sonuç olarak",
      "exampleSentence": "Letztendlich hat er gewonnen."
    },
    {
      "german": "mangels",
      "turkish": "Yokluğundan dolayı",
      "exampleSentence": "Mangels Beweisen wurde er freigesprochen."
    },
    {
      "german": "mittlerweile",
      "turkish": "Bu arada, artık",
      "exampleSentence": "Mittlerweile geht es mir besser."
    },
    {
      "german": "nachhaltig",
      "turkish": "Sürdürülebilir",
      "exampleSentence": "Wir brauchen nachhaltige Lösungen."
    },
    {
      "german": "namentlich",
      "turkish": "Özellikle (isim belirtmek için)",
      "exampleSentence": "Namentlich möchte ich Herrn Müller danken."
    },
    {
      "german": "notwendig",
      "turkish": "Gerekli",
      "exampleSentence": "Das ist absolut notwendig."
    },
    {
      "german": "offensichtlich",
      "turkish": "Açıkça, belli ki",
      "exampleSentence": "Offensichtlich hat er recht."
    },
    {
      "german": "permanent",
      "turkish": "Sürekli",
      "exampleSentence": "Er klagt permanent über Schmerzen."
    },
    {
      "german": "persönlich",
      "turkish": "Kişisel",
      "exampleSentence": "Das ist meine persönliche Meinung."
    },
    {
      "german": "praktisch",
      "turkish": "Pratik",
      "exampleSentence": "Das ist eine sehr praktische Lösung."
    },
    {
      "german": "präzise",
      "turkish": "Kesin, doğru",
      "exampleSentence": "Bitte gib präzise Anweisungen."
    },
    {
      "german": "relevant",
      "turkish": "İlgili, alakalı",
      "exampleSentence": "Diese Information ist nicht relevant."
    },
    {
      "german": "schließlich",
      "turkish": "Sonunda",
      "exampleSentence": "Schließlich hat er doch zugestimmt."
    },
    {
      "german": "sensibel",
      "turkish": "Hassas, duyarlı",
      "exampleSentence": "Das ist ein sehr sensibles Thema."
    },
    {
      "german": "sicherlich",
      "turkish": "Kesinlikle",
      "exampleSentence": "Sicherlich wird er kommen."
    },
    {
      "german": "sofort",
      "turkish": "Hemen",
      "exampleSentence": "Ich brauche Hilfe sofort."
    },
    {
      "german": "sozial",
      "turkish": "Sosyal",
      "exampleSentence": "Er engagiert sich sozial."
    },
    {
      "german": "spezifisch",
      "turkish": "Özel, belirli",
      "exampleSentence": "Das ist eine spezifische Anforderung."
    },
    {
      "german": "ständig",
      "turkish": "Sürekli",
      "exampleSentence": "Er ist ständig unterwegs."
    },
    {
      "german": "statistisch",
      "turkish": "İstatistiksel",
      "exampleSentence": "Statistisch gesehen ist das unwahrscheinlich."
    },
    {
      "german": "strukturell",
      "turkish": "Yapısal",
      "exampleSentence": "Es gibt strukturelle Probleme."
    },
    {
      "german": "subjektiv",
      "turkish": "Sübjektif",
      "exampleSentence": "Das ist eine subjektive Einschätzung."
    },
    {
      "german": "tatsächlich",
      "turkish": "Gerçekten, aslında",
      "exampleSentence": "Ist das tatsächlich wahr?"
    },
    {
      "german": "umfassend",
      "turkish": "Kapsamlı",
      "exampleSentence": "Er hat umfassendes Wissen."
    },
    {
      "german": "unabhängig",
      "turkish": "Bağımsız",
      "exampleSentence": "Ich bin unabhängig."
    },
    {
      "german": "unbedingt",
      "turkish": "Mutlaka",
      "exampleSentence": "Das musst du unbedingt sehen."
    },
    {
      "german": "ungefähr",
      "turkish": "Yaklaşık",
      "exampleSentence": "Es sind ungefähr 100 Leute."
    },
    {
      "german": "unmittelbar",
      "turkish": "Doğrudan, hemen",
      "exampleSentence": "Die Auswirkungen waren unmittelbar."
    },
    {
      "german": "ursprünglich",
      "turkish": "Aslen, başlangıçta",
      "exampleSentence": "Das war der ursprüngliche Plan."
    },
    {
      "german": "vergleichsweise",
      "turkish": "Karşılaştırmalı olarak",
      "exampleSentence": "Vergleichsweise ist das günstig."
    },
    {
      "german": "verschieden",
      "turkish": "Farklı",
      "exampleSentence": "Wir haben verschiedene Meinungen."
    },
    {
      "german": "voraussichtlich",
      "turkish": "Tahminen, muhtemelen",
      "exampleSentence": "Der Zug kommt voraussichtlich um 10 Uhr an."
    },
    {
      "german": "vor allem",
      "turkish": "Her şeyden önce, özellikle",
      "exampleSentence": "Ich mag Sport, vor allem Fußball."
    },
    {
      "german": "vorhanden",
      "turkish": "Mevcut, var olan",
      "exampleSentence": "Alle notwendigen Unterlagen sind vorhanden."
    },
    {
      "german": "wichtig",
      "turkish": "Önemli",
      "exampleSentence": "Das ist sehr wichtig."
    },
    {
      "german": "wirksam",
      "turkish": "Etkili",
      "exampleSentence": "Das Medikament ist sehr wirksam."
    },
    {
      "german": "zahlreich",
      "turkish": "Çok sayıda",
      "exampleSentence": "Es gab zahlreiche Besucher."
    },
    {
      "german": "zentral",
      "turkish": "Merkezi",
      "exampleSentence": "Das ist der zentrale Punkt."
    },
    {
      "german": "zunehmend",
      "turkish": "Giderek artan",
      "exampleSentence": "Die Probleme werden zunehmend größer."
    },
    {
      "german": "zusätzlich",
      "turkish": "Ek olarak",
      "exampleSentence": "Ich habe zusätzliche Informationen."
    },
    {
      "german": "zweifelsfrei",
      "turkish": "Şüphesiz",
      "exampleSentence": "Das ist zweifelsfrei bewiesen."
    },
    {
      "german": "abgesehen von",
      "turkish": "Dışında",
      "exampleSentence": "Abgesehen von der Farbe gefällt es mir."
    },
    {
      "german": "anstatt",
      "turkish": "Yerine",
      "exampleSentence": "Anstatt zu lernen, spielt er."
    },
    {
      "german": "aufgrund",
      "turkish": "Nedeniyle",
      "exampleSentence": "Aufgrund des Wetters bleiben wir zu Hause."
    },
    {
      "german": "bezüglich",
      "turkish": "İle ilgili olarak",
      "exampleSentence": "Bezueglich Ihrer Anfrage..."
    },
    {
      "german": "demzufolge",
      "turkish": "Buna göre",
      "exampleSentence": "Demzufolge ist es nicht möglich."
    },
    {
      "german": "einschließlich",
      "turkish": "Dahil",
      "exampleSentence": "Der Preis ist einschließlich Steuern."
    },
    {
      "german": "entgegen",
      "turkish": "Aksine, karşı",
      "exampleSentence": "Entgegen meiner Erwartung war es gut."
    },
    {
      "german": "infolge",
      "turkish": "Sonucunda",
      "exampleSentence": "Infolge des Unfalls gab es Stau."
    },
    {
      "german": "insofern",
      "turkish": "Bu bakımdan",
      "exampleSentence": "Insofern haben Sie Recht."
    },
    {
      "german": "sowie",
      "turkish": "Ve, ile birlikte",
      "exampleSentence": "Wir laden Sie sowie Ihre Familie ein."
    },
    {
      "german": "trotz",
      "turkish": "Rağmen",
      "exampleSentence": "Trotz des Regens gingen wir spazieren."
    },
    {
      "german": "ungeachtet",
      "turkish": "Rağmen",
      "exampleSentence": "Ungeachtet der Umstände hat er es geschafft."
    },
    {
      "german": "während",
      "turkish": "Sırasında",
      "exampleSentence": "Während des Films bin ich eingeschlafen."
    },
    {
      "german": "weder ... noch",
      "turkish": "Ne ... ne de",
      "exampleSentence": "Er isst weder Fleisch noch Fisch."
    },
    {
      "german": "zumal",
      "turkish": "Özellikle de",
      "exampleSentence": "Es war schwierig, zumal ich allein war."
    },
    {
      "german": "zudem",
      "turkish": "Ayrıca",
      "exampleSentence": "Das Essen war lecker, zudem preiswert."
    },
    {
      "german": "im Allgemeinen",
      "turkish": "Genel olarak",
      "exampleSentence": "Im Allgemeinen bin ich zufrieden."
    },
    {
      "german": "in der Regel",
      "turkish": "Genellikle",
      "exampleSentence": "In der Regel stehe ich um 7 Uhr auf."
    },
    {
      "german": "im Hinblick auf",
      "turkish": "Bakımından, açısından",
      "exampleSentence": "Im Hinblick auf die Zukunft ist das wichtig."
    },
    {
      "german": "im Rahmen von",
      "turkish": "Kapsamında",
      "exampleSentence": "Im Rahmen des Projekts haben wir viel gelernt."
    },
    {
      "german": "in Bezug auf",
      "turkish": "İle ilgili olarak",
      "exampleSentence": "In Bezug auf Ihre Frage..."
    },
    {
      "german": "zur Verfügung stellen",
      "turkish": "Temin etmek",
      "exampleSentence": "Wir stellen Ihnen die Daten zur Verfügung."
    },
    {
      "german": "zur Kenntnis nehmen",
      "turkish": "Bilgi edinmek",
      "exampleSentenceSentence": "Ich habe Ihre Beschwerde zur Kenntnis genommen."
    },
    {
      "german": "zurückführen auf",
      "turkish": "Dayandırmak",
      "exampleSentenceSentence": "Den Erfolg führe ich auf harte Arbeit zurück."
    },
    {
    "german": "",
    "english": "adopt",
    "turkish": "benimsemek  , çalmak  , evlat edinmek  ",
    "exampleSentence": "The family decided to adopt a child.",
    "language": "english"
  },
  {
    "german": "",
    "english": "abandon",
    "turkish": "vazgeçmek  , bırakmak  , terk etmek  ",
    "exampleSentence": "They had to abandon the sinking ship.",
    "language": "english"
  },
  {
    "german": "",
    "english": "absolute",
    "turkish": "mutlak  , tam  , salt  ",
    "exampleSentence": "He has absolute confidence in his abilities.",
    "language": "english"
  },
  {
    "german": "",
    "english": "absorb",
    "turkish": "almak (dikkati/enerjiyi/zamanı/parayı)  , kavramak (anlamak)  , emmek  ",
    "exampleSentence": "The sponge can absorb a lot of water.",
    "language": "english"
  },
  {
    "german": "",
    "english": "abstract",
    "turkish": "soyutlamak  , soyut  , özet  ",
    "exampleSentence": "The artist is known for his abstract paintings.",
    "language": "english"
  },
  {
    "german": "",
    "english": "academic",
    "turkish": "akademik  , üniversite öğretim görevlisi  , öğretim görevlisi  ",
    "exampleSentence": "She has a strong academic background in physics.",
    "language": "english"
  },
  {
    "german": "",
    "english": "accent",
    "turkish": "aksan  , vurgulamak  , şive  ",
    "exampleSentence": "He spoke with a thick French accent.",
    "language": "english"
  },
  {
    "german": "",
    "english": "acceptable",
    "turkish": "kabul edilir  , makbul  , kabul edilebilir  ",
    "exampleSentence": "His behavior was not acceptable.",
    "language": "english"
  },
  {
    "german": "",
    "english": "accidentally",
    "turkish": "kazara [zf.], hasbelkader [zf.], tesadüfen [zf.]",
    "exampleSentence": "I accidentally broke the vase.",
    "language": "english"
  },
  {
    "german": "",
    "english": "accommodate",
    "turkish": "yaşayacak yer temin etmek  , telif etmek  , kalacak yer vermek  ",
    "exampleSentence": "The hotel can accommodate up to 200 guests.",
    "language": "english"
  },
  {
    "german": "",
    "english": "accompany",
    "turkish": "eşlik etmek  , katılmak  , refakat etmek  ",
    "exampleSentence": "Children must be accompanied by an adult.",
    "language": "english"
  },
  {
    "german": "",
    "english": "accomplish",
    "turkish": "başarıyla tamamlamak  , sonuçlandırmak  , sonunu getirmek  ",
    "exampleSentence": "She managed to accomplish all her goals.",
    "language": "english"
  },
  {
    "german": "",
    "english": "account",
    "turkish": "hesap  , avlamak  , açıklamasını yapmak  ",
    "exampleSentence": "She gave a detailed account of what happened.",
    "language": "english"
  },
  {
    "german": "",
    "english": "accountant",
    "turkish": "hesap uzmanı  , sayışman  , muhasebeci  ",
    "exampleSentence": "The accountant is responsible for the company's finances.",
    "language": "english"
  },
  {
    "german": "",
    "english": "accounting",
    "turkish": "muhasebe  , saymanlık  , hesap verme  ",
    "exampleSentence": "He is studying accounting at the university.",
    "language": "english"
  },
  {
    "german": "",
    "english": "accuracy",
    "turkish": "incelik  , kesinlik  , doğruluk  ",
    "exampleSentence": "The accuracy of the data is crucial for the research.",
    "language": "english"
  },
  {
    "german": "",
    "english": "accurate",
    "turkish": "kesin  , dakik  , doğru  ",
    "exampleSentence": "The report provides an accurate description of the events.",
    "language": "english"
  },
  {
    "german": "",
    "english": "accurately",
    "turkish": "tam olarak [zf.], doğru olarak [zf.], kesin olarak [zf.]",
    "exampleSentence": "The machine can accurately measure the temperature.",
    "language": "english"
  },
  {
    "german": "",
    "english": "accuse",
    "turkish": "itham etmek  , suçlamak  ",
    "exampleSentence": "He was accused of stealing the money.",
    "language": "english"
  },
  {
    "german": "",
    "english": "acid",
    "turkish": "asit  , iğneleyici eleştiri veya dalga geçme  , ekşime  ",
    "exampleSentence": "The lemon juice is very acid.",
    "language": "english"
  },
  {
    "german": "",
    "english": "acknowledge",
    "turkish": "kabul etmek  , doğruluğunu kabul etmek  , kabullenmek  ",
    "exampleSentence": "She acknowledged his contribution to the project.",
    "language": "english"
  },
  {
    "german": "",
    "english": "acquire",
    "turkish": "edinmek  , iktisap etmek , elde etmek  ",
    "exampleSentence": "He managed to acquire the necessary skills for the job.",
    "language": "english"
  },
  {
    "german": "",
    "english": "activate",
    "turkish": "etkinleştirmek  , etkin kılmak  , çalıştırmak  ",
    "exampleSentence": "You need to activate your new credit card.",
    "language": "english"
  },
  {
    "german": "",
    "english": "actual",
    "turkish": "gerçek  , aktüel  , fiili  ",
    "exampleSentence": "The actual cost was higher than we expected.",
    "language": "english"
  },
  {
    "german": "",
    "english": "adapt",
    "turkish": "uyarlamak  , uymak  , adapte etmek  ",
    "exampleSentence": "It took him a while to adapt to the new environment.",
    "language": "english"
  },
  {
    "german": "",
    "english": "addiction",
    "turkish": "bağımlılık  , hastalık  , düşkünlük  ",
    "exampleSentence": "He is struggling with an addiction to gambling.",
    "language": "english"
  },
  {
    "german": "",
    "english": "additional",
    "turkish": "ek  , ilave  , fazladan  ",
    "exampleSentence": "There is an additional charge for a sea view room.",
    "language": "english"
  },
  {
    "german": "",
    "english": "additionally",
    "turkish": "ilaveten [zf.], ayrıca [zf.], bundan başka [zf.]",
    "exampleSentence": "Additionally, we will need to hire more staff.",
    "language": "english"
  },
  {
    "german": "",
    "english": "address",
    "turkish": "adres  , söylev  , hitap etmek  ",
    "exampleSentence": "The president will address the nation tonight.",
    "language": "english"
  },
  {
    "german": "",
    "english": "adequate",
    "turkish": "kafi  , yeterli  , elverişli  ",
    "exampleSentence": "The food was adequate for the number of guests.",
    "language": "english"
  },
  {
    "german": "",
    "english": "adequately",
    "turkish": "yeterince [zf.], yeterli olarak [zf.], layıkıyle [zf.]",
    "exampleSentence": "The problem has not been adequately addressed.",
    "language": "english"
  },
  {
    "german": "",
    "english": "adjust",
    "turkish": "ayarlamak  , hizaya getirmek  , alıştırmak  ",
    "exampleSentence": "You need to adjust the mirror to see clearly.",
    "language": "english"
  },
  {
    "german": "",
    "english": "administration",
    "turkish": "idare  , yönetim  ",
    "exampleSentence": "The new administration has promised to lower taxes.",
    "language": "english"
  },
  {
    "german": "",
    "english": "advance",
    "turkish": "terfi ettirmek  , geliştirmek  , avans vermek  ",
    "exampleSentence": "Recent advances in technology have changed our lives.",
    "language": "english"
  },
  {
    "german": "",
    "english": "affair",
    "turkish": "mesele  , iş  , şey  ",
    "exampleSentence": "The company's financial affairs are in order.",
    "language": "english"
  },
  {
    "german": "",
    "english": "affordable",
    "turkish": "ekonomik  , bütçeye uygun  , düşük maliyetli  ",
    "exampleSentence": "They offer affordable housing for low-income families.",
    "language": "english"
  },
  {
    "german": "",
    "english": "afterwards",
    "turkish": "sonra [zf.], sonradan [zf.], sonraları [zf.]",
    "exampleSentence": "Let's go to the cinema first and eat afterwards.",
    "language": "english"
  },
  {
    "german": "",
    "english": "agency",
    "turkish": "acente  , ajans  , acenta  ",
    "exampleSentence": "She works for a travel agency.",
    "language": "english"
  },
  {
    "german": "",
    "english": "agenda",
    "turkish": "ajanda  , gündem  , görüşülecek işler  ",
    "exampleSentence": "The first item on the agenda is the budget.",
    "language": "english"
  },
  {
    "german": "",
    "english": "aggressive",
    "turkish": "agresif  , kavgacı  , saldırgan  ",
    "exampleSentence": "He has a very aggressive style of playing.",
    "language": "english"
  },
  {
    "german": "",
    "english": "agriculture",
    "turkish": "tarım  , çiftçilik  , ziraat  ",
    "exampleSentence": "The country's economy is based on agriculture.",
    "language": "english"
  },
  {
    "german": "",
    "english": "AIDS",
    "turkish": "aids  ",
    "exampleSentence": "AIDS is a serious disease that affects the immune system.",
    "language": "english"
  },
  {
    "german": "",
    "english": "aid",
    "turkish": "yardım  , yardımcı olmak  , yardım etmek  ",
    "exampleSentence": "They sent humanitarian aid to the victims of the earthquake.",
    "language": "english"
  },
  {
    "german": "",
    "english": "aircraft",
    "turkish": "uçaklar  , uçak  , hava taşıtı  ",
    "exampleSentence": "The aircraft is ready for takeoff.",
    "language": "english"
  },
  {
    "german": "",
    "english": "alarm",
    "turkish": "alarm  , korkutmak  , telaşa düşürmek  ",
    "exampleSentence": "The fire alarm went off in the middle of the night.",
    "language": "english"
  },
  {
    "german": "",
    "english": "alien",
    "turkish": "yabancı kelime  , yabancı uyruklu kimse  , uzaylı  ",
    "exampleSentence": "The movie is about an alien from another planet.",
    "language": "english"
  },
  {
    "german": "",
    "english": "alongside",
    "turkish": "yanına [zf.], yanı sıra [zf.], yan yana [zf.]",
    "exampleSentence": "A police car pulled up alongside us.",
    "language": "english"
  },
  {
    "german": "",
    "english": "alter",
    "turkish": "değiştirmek  , değişiklik yapmak  , hadım etmek  ",
    "exampleSentence": "They had to alter their plans because of the bad weather.",
    "language": "english"
  },
  {
    "german": "",
    "english": "altogether",
    "turkish": "hep beraber [zf.], büsbütün [zf.], tümüyle [zf.]",
    "exampleSentence": "The show was altogether a great success.",
    "language": "english"
  },
  {
    "german": "",
    "english": "ambulance",
    "turkish": "ambulans  , cankurtaran  , ambülans  ",
    "exampleSentence": "The ambulance arrived at the scene of the accident within minutes.",
    "language": "english"
  },
  {
    "german": "",
    "english": "amount",
    "turkish": "miktar  , tutar  , meblağ  ",
    "exampleSentence": "A large amount of money was stolen.",
    "language": "english"
  },
  {
    "german": "",
    "english": "amusing",
    "turkish": "eğlenceli  , zevkli  , komik  ",
    "exampleSentence": "He told us an amusing story about his childhood.",
    "language": "english"
  },
  {
    "german": "",
    "english": "analyst",
    "turkish": "çözümlemeci  , analist  , araştırmacı  ",
    "exampleSentence": "A financial analyst predicted a rise in the stock market.",
    "language": "english"
  },
  {
    "german": "",
    "english": "ancestor",
    "turkish": "ata  , nesep  , soy  ",
    "exampleSentence": "His ancestors came to America from Ireland.",
    "language": "english"
  },
  {
    "german": "",
    "english": "anger",
    "turkish": "kızdırmak  , sinir  , hiddet  ",
    "exampleSentence": "She could not hide her anger at the situation.",
    "language": "english"
  },
  {
    "german": "",
    "english": "angle",
    "turkish": "açı  , olta ile balık tutmak  , saptırmak  ",
    "exampleSentence": "Let's look at the problem from a different angle.",
    "language": "english"
  },
  {
    "german": "",
    "english": "animation",
    "turkish": "çizgi film yapma  , canlılık  , şevk  ",
    "exampleSentence": "The new Disney animation is a must-see.",
    "language": "english"
  },
  {
    "german": "",
    "english": "anniversary",
    "turkish": "yıl dönümü  , yıl dönümü kutlaması  ",
    "exampleSentence": "They celebrated their 25th wedding anniversary.",
    "language": "english"
  },
  {
    "german": "",
    "english": "annual",
    "turkish": "senelik  , yıllık  , bir yıllık ömrü olan bitki  ",
    "exampleSentence": "The company holds an annual meeting for its shareholders.",
    "language": "english"
  },
  {
    "german": "",
    "english": "annually",
    "turkish": "yılda bir [zf.], her yıl [zf.], yıllık olarak [zf.]",
    "exampleSentence": "The festival is held annually in the summer.",
    "language": "english"
  },
  {
    "german": "",
    "english": "anticipate",
    "turkish": "beklemek  , ummak  , sezmek  ",
    "exampleSentence": "We anticipate that the project will be completed on time.",
    "language": "english"
  },
  {
    "german": "",
    "english": "anxiety",
    "turkish": "endişe  , kaygı  , tasa  ",
    "exampleSentence": "She suffers from anxiety and panic attacks.",
    "language": "english"
  },
  {
    "german": "",
    "english": "anxious",
    "turkish": "endişeli  , kaygılı  , huzursuz  ",
    "exampleSentence": "He was anxious about the results of the exam.",
    "language": "english"
  },
  {
    "german": "",
    "english": "apology",
    "turkish": "özür  , itizar  , özür dileme  ",
    "exampleSentence": "He made a public apology for his remarks.",
    "language": "english"
  },
  {
    "german": "",
    "english": "apparent",
    "turkish": "aşikar  , ortada  , belirgin  ",
    "exampleSentence": "It was apparent that she was not happy.",
    "language": "english"
  },
  {
    "german": "",
    "english": "apparently",
    "turkish": "görünüşte [zf.], belli ki [zf.], anlaşılan [zf.]",
    "exampleSentence": "Apparently, he is not coming to the party.",
    "language": "english"
  },
  {
    "german": "",
    "english": "appeal",
    "turkish": "başvurmak  , çağrı  , cazibe  ",
    "exampleSentence": "The charity made an appeal for donations.",
    "language": "english"
  },
  {
    "german": "",
    "english": "applicant",
    "turkish": "aday  , başvuran kimse  , namzet  ",
    "exampleSentence": "There were over 100 applicants for the job.",
    "language": "english"
  },
  {
    "german": "",
    "english": "approach",
    "turkish": "yanaşmak  , yaklaşmak  , yaklaşım  ",
    "exampleSentence": "We need to find a new approach to the problem.",
    "language": "english"
  },
  {
    "german": "",
    "english": "appropriate",
    "turkish": "el koymak  , münasip  , uygun  ",
    "exampleSentence": "Please wear appropriate clothing for the occasion.",
    "language": "english"
  },
  {
    "german": "",
    "english": "appropriately",
    "turkish": "uygun olarak [zf.], uygun bir şekilde [zf.], gereğine uygun [zf.]",
    "exampleSentence": "She was dressed appropriately for the funeral.",
    "language": "english"
  },
  {
    "german": "",
    "english": "approval",
    "turkish": "tasvip  , onaylama  , onay  ",
    "exampleSentence": "The project has received official approval.",
    "language": "english"
  },
  {
    "german": "",
    "english": "approve",
    "turkish": "onaylamak  , beğenmek  , kabul etmek  ",
    "exampleSentence": "The committee approved the new budget.",
    "language": "english"
  },
  {
    "german": "",
    "english": "arise",
    "turkish": "kaynaklanmak  , kalkmak  , arose - arisen  ",
    "exampleSentence": "A new problem has arisen.",
    "language": "english"
  },
  {
    "german": "",
    "english": "armed",
    "turkish": "ateşli  , zırhlı  , silahlandırılmış  ",
    "exampleSentence": "The police were heavily armed during the raid.",
    "language": "english"
  },
  {
    "german": "",
    "english": "arms",
    "turkish": "koyun  , kucak  , silahlar  ",
    "exampleSentence": "He held the baby in his arms.",
    "language": "english"
  },
  {
    "german": "",
    "english": "arrow",
    "turkish": "ok  , temren  , ok işareti",
    "exampleSentence": "Follow the arrow to the exit.",
    "language": "english"
  },
  {
    "german": "",
    "english": "artificial",
    "turkish": "yapma  , yapay  , suni  ",
    "exampleSentence": "The plant has artificial flowers.",
    "language": "english"
  },
  {
    "german": "",
    "english": "artistic",
    "turkish": "sanatçı ruhuna sahip  , artistik  , sanatsal yönü olan  ",
    "exampleSentence": "She has a very artistic temperament.",
    "language": "english"
  },
  {
    "german": "",
    "english": "artwork",
    "turkish": "sanat eseri  , çizim  , sanat çalışması",
    "exampleSentence": "The museum has an impressive collection of modern artwork.",
    "language": "english"
  },
  {
    "german": "",
    "english": "ashamed",
    "turkish": "mahcup  , utanmış  , utandırılmış  ",
    "exampleSentence": "He was ashamed of his bad behavior.",
    "language": "english"
  },
  {
    "german": "",
    "english": "aside",
    "turkish": "bertaraf  , ayrı  , bir kenara [zf.]",
    "exampleSentence": "She pulled him aside to have a private word.",
    "language": "english"
  },
  {
    "german": "",
    "english": "aspect",
    "turkish": "hal  , taraf  , yön  ",
    "exampleSentence": "We must consider every aspect of the problem.",
    "language": "english"
  },
  {
    "german": "",
    "english": "assess",
    "turkish": "değer biçmek  , hesaplamak  , incelemek  ",
    "exampleSentence": "The insurance company will assess the damage to the car.",
    "language": "english"
  },
  {
    "german": "",
    "english": "assessment",
    "turkish": "değerlendirme  , değerleme  , tayin etme (para miktarını)  ",
    "exampleSentence": "The teacher's assessment of the student's progress was positive.",
    "language": "english"
  },
  {
    "german": "",
    "english": "asset",
    "turkish": "varlık  , kazanç  , değerli bir nitelik  ",
    "exampleSentence": "Her language skills are a great asset to the company.",
    "language": "english"
  },
  {
    "german": "",
    "english": "assign",
    "turkish": "devretmek  , atamak  , tahsis etmek  ",
    "exampleSentence": "The teacher will assign a different task to each group.",
    "language": "english"
  },
  {
    "german": "",
    "english": "assistance",
    "turkish": "yardım  , imdat  , destek  ",
    "exampleSentence": "He offered his assistance with the project.",
    "language": "english"
  },
  {
    "german": "",
    "english": "associate",
    "turkish": "ilişkilendirmek  , birleştirmek  , iş arkadaşı  ",
    "exampleSentence": "I always associate the smell of cinnamon with Christmas.",
    "language": "english"
  },
  {
    "german": "",
    "english": "associated",
    "turkish": "birleşmiş  , bağlantılı  , ilişkili  ",
    "exampleSentence": "There are many risks associated with this type of investment.",
    "language": "english"
  },
  {
    "german": "",
    "english": "association",
    "turkish": "birlik  , dernek  , birleşme  ",
    "exampleSentence": "He is a member of the local residents' association.",
    "language": "english"
  },
  {
    "german": "",
    "english": "assume",
    "turkish": "üstlenmek  , saymak  , farz etmek  ",
    "exampleSentence": "I assume you know why you are here.",
    "language": "english"
  },
  {
    "german": "",
    "english": "assumption",
    "turkish": "sanı  , farzetme  , varsayım  ",
    "exampleSentence": "His actions were based on a false assumption.",
    "language": "english"
  },
  {
    "german": "",
    "english": "assure",
    "turkish": "temin etmek (rahatlatıcı/ikna edici sözlerle)  , garanti etmek  , sigorta etmek  ",
    "exampleSentence": "I can assure you that you will not be disappointed.",
    "language": "english"
  },
  {
    "german": "",
    "english": "astonishing",
    "turkish": "hayrette bırakan  , şaşılacak  , şaşırtıcı  ",
    "exampleSentence": "The magician performed an astonishing trick.",
    "language": "english"
  },
  {
    "german": "",
    "english": "attachment",
    "turkish": "muhabbet  , ilgi  , bağlılık  ",
    "exampleSentence": "Please find the report as an attachment to this email.",
    "language": "english"
  },
  {
    "german": "",
    "english": "attempt",
    "turkish": "girişimde bulunmak  , kalkışmak  , teşebbüs etmek  ",
    "exampleSentence": "He made an attempt to climb the mountain.",
    "language": "english"
  },
  {
    "german": "",
    "english": "auction",
    "turkish": "mezat  , açık artırma  , müzayede  ",
    "exampleSentence": "The famous painting was sold at auction for a record price.",
    "language": "english"
  },
  {
    "german": "",
    "english": "audio",
    "turkish": "ses  , audio  , ses işitme  ",
    "exampleSentence": "The audio quality of the recording was very poor.",
    "language": "english"
  },
  {
    "german": "",
    "english": "automatic",
    "turkish": "otomatik tabanca  , otomatik  , otomatik tabanca/tüfek  ",
    "exampleSentence": "The doors are automatic and open when you approach.",
    "language": "english"
  },
  {
    "german": "",
    "english": "automatically",
    "turkish": "istemsiz olarak [zf.], kendiliğinden [zf.], özdevimlice [zf.]",
    "exampleSentence": "The lights turn off automatically after 10 minutes.",
    "language": "english"
  },
  {
    "german": "",
    "english": "awareness",
    "turkish": "bilinçlenme  , farkında olma  , farkındalık  ",
    "exampleSentence": "There is a growing awareness of environmental issues.",
    "language": "english"
  },
  {
    "german": "",
    "english": "awkward",
    "turkish": "hantal  , zorluk çıkaran  , beceriksiz  ",
    "exampleSentence": "There was an awkward silence when he walked into the room.",
    "language": "english"
  },
  {
    "german": "",
    "english": "back",
    "turkish": "arkalık  , sırt  , art  ",
    "exampleSentence": "He hurt his back playing football.",
    "language": "english"
  },
  {
    "german": "",
    "english": "bacteria",
    "turkish": "bakteriler  , bakteri  ",
    "exampleSentence": "Some bacteria are harmful, but others are essential for life.",
    "language": "english"
  },
  {
    "german": "",
    "english": "badge",
    "turkish": "rozet takmak  , rozet  , işaretlemek  ",
    "exampleSentence": "All employees must wear their security badge at all times.",
    "language": "english"
  },
  {
    "german": "",
    "english": "balanced",
    "turkish": "dengelenmiş  , muvazeneli  , dengeli  ",
    "exampleSentence": "A balanced diet is important for good health.",
    "language": "english"
  },
  {
    "german": "",
    "english": "ballet",
    "turkish": "bale grubu  , bale  ",
    "exampleSentence": "She has been dancing ballet since she was five.",
    "language": "english"
  },
  {
    "german": "",
    "english": "balloon",
    "turkish": "şişmek  , balon  , şişirmek  ",
    "exampleSentence": "The child was holding a big red balloon.",
    "language": "english"
  },
  {
    "german": "",
    "english": "bar",
    "turkish": "demir çubuk  , baro  , çubuk  ",
    "exampleSentence": "Let's meet at the bar for a drink.",
    "language": "english"
  },
  {
    "german": "",
    "english": "barely",
    "turkish": "zar zor [zf.], ancak [zf.], dar [zf.]",
    "exampleSentence": "He was barely alive when they found him.",
    "language": "english"
  },
  {
    "german": "",
    "english": "bargain",
    "turkish": "pazarlık  , kelepir  , değiş tokuş etmek  ",
    "exampleSentence": "I got a real bargain at the sales.",
    "language": "english"
  },
  {
    "german": "",
    "english": "barrier",
    "turkish": "bariyer  , set  , hail  ",
    "exampleSentence": "Lack of confidence can be a barrier to success.",
    "language": "english"
  },
  {
    "german": "",
    "english": "basement",
    "turkish": "taban  , bodrum  , oturtmalık  ",
    "exampleSentence": "They converted the basement into a playroom.",
    "language": "english"
  },
  {
    "german": "",
    "english": "basically",
    "turkish": "kökünden [zf.], aslen [zf.], temelde [zf.]",
    "exampleSentence": "Basically, the plan is to start early and finish by noon.",
    "language": "english"
  },
  {
    "german": "",
    "english": "basket",
    "turkish": "sepetlemek  , sepet  , küfe  ",
    "exampleSentence": "She carried a basket full of apples.",
    "language": "english"
  },
  {
    "german": "",
    "english": "bat",
    "turkish": "kırpmak (göz)  , yarasa  , sopa ile vurmak  ",
    "exampleSentence": "A bat flew in through the open window.",
    "language": "english"
  },
  {
    "german": "",
    "english": "battle",
    "turkish": "savaş  , muharebe  , dövüşmek  ",
    "exampleSentence": "The two armies fought a fierce battle.",
    "language": "english"
  },
  {
    "german": "",
    "english": "bear",
    "turkish": "katlanmak  , dayanmak  , taşımak  ",
    "exampleSentence": "I can't bear the thought of leaving.",
    "language": "english"
  },
  {
    "german": "",
    "english": "beat",
    "turkish": "dövmek  , yenmek  , vurmak  ",
    "exampleSentence": "Our team beat the champions by two goals.",
    "language": "english"
  },
  {
    "german": "",
    "english": "beg",
    "turkish": "dilenmek  , dilemek  ",
    "exampleSentence": "He had to beg for money on the streets.",
    "language": "english"
  },
  {
    "german": "",
    "english": "being",
    "turkish": "tanrı  , yapı  , varlık  ",
    "exampleSentence": "A human being is a complex creature.",
    "language": "english"
  },
  {
    "german": "",
    "english": "beneficial",
    "turkish": "yararlı  , kazançlı  ",
    "exampleSentence": "Regular exercise is beneficial to your health.",
    "language": "english"
  },
  {
    "german": "",
    "english": "bent",
    "turkish": "bükük  , bükülmüş  , azmetmek  ",
    "exampleSentence": "He had a bent for mechanics from an early age.",
    "language": "english"
  },
  {
    "german": "",
    "english": "beside",
    "turkish": "yanında [ed.]",
    "exampleSentence": "He sat beside her all evening.",
    "language": "english"
  },
  {
    "german": "",
    "english": "besides",
    "turkish": "üstelik [zf.], diğer taraftan [zf.], ayrıca [zf.]",
    "exampleSentence": "Besides being a great teacher, she is also a talented musician.",
    "language": "english"
  },
  {
    "german": "",
    "english": "bet",
    "turkish": "iddia  , bahis  , iddiaya girmek  ",
    "exampleSentence": "I bet you can't eat all of that pizza.",
    "language": "english"
  },
  {
    "german": "",
    "english": "beyond",
    "turkish": "ötede [zf.], öte  , ötesi [ed.]",
    "exampleSentence": "The village is just beyond those hills.",
    "language": "english"
  },
  {
    "german": "",
    "english": "bias",
    "turkish": "aklı çelmek  , önyargı  , bir tarafa etki etmek  ",
    "exampleSentence": "The news report showed a clear bias towards the government.",
    "language": "english"
  },
  {
    "german": "",
    "english": "bid",
    "turkish": "teklif etmek  , bid - bid  , teklif",
    "exampleSentence": "She made a bid of $500 for the antique table.",
    "language": "english"
  },
  {
    "german": "",
    "english": "bill",
    "turkish": "fatura  , senet  , ilan etmek  ",
    "exampleSentence": "Have you paid the electricity bill yet?",
    "language": "english"
  },
  {
    "german": "",
    "english": "biological",
    "turkish": "dirimbilimsel  , yaşambilimsel  , biyolojik  ",
    "exampleSentence": "She is his biological mother, but he was raised by his aunt.",
    "language": "english"
  },
  {
    "german": "",
    "english": "bitter",
    "turkish": "acı (tat)  , acı  , bitter (çikolata)  ",
    "exampleSentence": "The coffee has a bitter taste.",
    "language": "english"
  },
  {
    "german": "",
    "english": "blame",
    "turkish": "ayıplamak  , suçlamak  , kabahat  ",
    "exampleSentence": "Don't blame me for your mistakes.",
    "language": "english"
  },
  {
    "german": "",
    "english": "blanket",
    "turkish": "battaniye ile örtmek  , battaniye  , battaniye ile zıplatmak  ",
    "exampleSentence": "I need an extra blanket because it's cold tonight.",
    "language": "english"
  },
  {
    "german": "",
    "english": "blind",
    "turkish": "kör etmek  , kör  , körletmek  ",
    "exampleSentence": "He went blind after the accident.",
    "language": "english"
  },
  {
    "german": "",
    "english": "blow",
    "turkish": "esmek  , darbe  , üflemek  ",
    "exampleSentence": "The wind was blowing hard all night.",
    "language": "english"
  },
  {
    "german": "",
    "english": "bold",
    "turkish": "gözüpek  , cesur  , cüretkar  ",
    "exampleSentence": "It was a bold move to start her own business.",
    "language": "english"
  },
  {
    "german": "",
    "english": "bombing",
    "turkish": "bombalı eylem  , bombalama eylemi  , graffiti yapmak",
    "exampleSentence": "The city suffered heavy bombing during the war.",
    "language": "english"
  },
  {
    "german": "",
    "english": "bond",
    "turkish": "birleştirmek  , bağ  , tutturmak  ",
    "exampleSentence": "There is a strong bond between the two sisters.",
    "language": "english"
  },
  {
    "german": "",
    "english": "booking",
    "turkish": "rezervasyon yapma  , rezervasyon  , yazma (bir kimsenin hesabına)  ",
    "exampleSentence": "I need to make a hotel booking for my trip.",
    "language": "english"
  },
  {
    "german": "",
    "english": "boost",
    "turkish": "alttan yukarıya ittirmek  , yardım için itmek  , kuvvetini artırmak  ",
    "exampleSentence": "The new advertisement campaign will boost sales.",
    "language": "english"
  },
  {
    "german": "",
    "english": "border",
    "turkish": "kenar  , hudut  , kenarlık  ",
    "exampleSentence": "They crossed the border into Canada.",
    "language": "english"
  },
  {
    "german": "",
    "english": "bound",
    "turkish": "sıçramak  , zıplaya zıplaya gitmek  , zıplamak  ",
    "exampleSentence": "He was bound to find out the truth eventually.",
    "language": "english"
  },
  {
    "german": "",
    "english": "breast",
    "turkish": "meme  , göğüs germek  , göğüs  ",
    "exampleSentence": "Breast cancer is a common disease among women.",
    "language": "english"
  },
  {
    "german": "",
    "english": "brick",
    "turkish": "tuğla  , tuğla döşemek  , tuğla ile örmek  ",
    "exampleSentence": "The house was built with red brick.",
    "language": "english"
  },
  {
    "german": "",
    "english": "brief",
    "turkish": "kısa  , kısa ve öz  , talimat veya bilgi vermek  ",
    "exampleSentence": "He gave a brief summary of the report.",
    "language": "english"
  },
  {
    "german": "",
    "english": "briefly",
    "turkish": "kısaca [zf.], muhtasar biçimde [zf.]",
    "exampleSentence": "She spoke briefly about her experience.",
    "language": "english"
  },
  {
    "german": "",
    "english": "broad",
    "turkish": "engin  , geniş  , liberal  ",
    "exampleSentence": "The river is very broad at this point.",
    "language": "english"
  },
  {
    "german": "",
    "english": "broadcast",
    "turkish": "yayın  , broadcast/broadcasted - broadcast/broadcasted  , saçmak (tohum)  ",
    "exampleSentence": "The news will be broadcast live at 6 pm.",
    "language": "english"
  },
  {
    "german": "",
    "english": "broadcaster",
    "turkish": "televizyoncu  , yayın yapan (radyo, televizyon)  , yayıncı",
    "exampleSentence": "He is a well-known sports broadcaster.",
    "language": "english"
  },
  {
    "german": "",
    "english": "broadly",
    "turkish": "açık olarak [zf.], belli [zf.], geniş [zf.]",
    "exampleSentence": "Broadly speaking, the project was a success.",
    "language": "english"
  },
  {
    "german": "",
    "english": "budget",
    "turkish": "bütçe  , bütçelemek  , bütçeye uygun  ",
    "exampleSentence": "We need to create a budget for our monthly expenses.",
    "language": "english"
  },
  {
    "german": "",
    "english": "bug",
    "turkish": "böcek  , can sıkmak  , canını sıkmak  ",
    "exampleSentence": "There's a bug in the software that needs to be fixed.",
    "language": "english"
  },
  {
    "german": "",
    "english": "bullet",
    "turkish": "mermi  , kurşun  , im  ",
    "exampleSentence": "The police found a bullet at the crime scene.",
    "language": "english"
  },
  {
    "german": "",
    "english": "bunch",
    "turkish": "salkım  , demet  , toplamak  ",
    "exampleSentence": "He bought her a bunch of flowers.",
    "language": "english"
  },
  {
    "german": "",
    "english": "burn",
    "turkish": "yakmak  , yanmak  , burned/burnt - burned/burnt  ",
    "exampleSentence": "Be careful not to burn the toast.",
    "language": "english"
  },
  {
    "german": "",
    "english": "bush",
    "turkish": "çalı  , kaplamak  , çalıyla örtmek  ",
    "exampleSentence": "The garden was full of beautiful roses and bushes.",
    "language": "english"
  },
  {
    "german": "",
    "english": "but",
    "turkish": "ancak [bağ.], fakat [bağ.], itiraz  ",
    "exampleSentence": "I want to go, but I'm too tired.",
    "language": "english"
  },
  {
    "german": "",
    "english": "cabin",
    "turkish": "kabin  , tahdit etmek  , küçük bir yere kapamak  ",
    "exampleSentence": "They stayed in a small cabin in the woods.",
    "language": "english"
  },
  {
    "german": "",
    "english": "cable",
    "turkish": "kablo  , kablo ile bağlamak  , telgraf çekmek  ",
    "exampleSentence": "The television needs a new cable to work properly.",
    "language": "english"
  },
  {
    "german": "",
    "english": "calculate",
    "turkish": "hesap etmek  , hesaplamak  , endazeye vurmak  ",
    "exampleSentence": "Can you calculate the total cost of the trip?",
    "language": "english"
  },
  {
    "german": "",
    "english": "canal",
    "turkish": "kanal  , içinden sıvı geçen yol  , suyolu  ",
    "exampleSentence": "They took a boat trip along the canal.",
    "language": "english"
  },
  {
    "german": "",
    "english": "cancel",
    "turkish": "feshetmek  , iptal etmek  , iptal  ",
    "exampleSentence": "They had to cancel the meeting due to unforeseen circumstances.",
    "language": "english"
  },
  {
    "german": "",
    "english": "cancer",
    "turkish": "kanser  , yengeç burcu  , kötü şey  ",
    "exampleSentence": "He was diagnosed with lung cancer.",
    "language": "english"
  },
  {
    "german": "",
    "english": "candle",
    "turkish": "mum  , kandil  , muma benzeyen madde  ",
    "exampleSentence": "The room was lit only by a single candle.",
    "language": "english"
  },
  {
    "german": "",
    "english": "capable",
    "turkish": "yetenekli  , becerikli  , kabiliyetli  ",
    "exampleSentence": "She is a very capable and experienced manager.",
    "language": "english"
  },
  {
    "german": "",
    "english": "capacity",
    "turkish": "kapasite  , iktidar  , yeterlik  ",
    "exampleSentence": "The stadium has a seating capacity of 50,000.",
    "language": "english"
  },
  {
    "german": "",
    "english": "capture",
    "turkish": "esir almak  , ele geçirmek  , tutsak etmek  ",
    "exampleSentence": "The photographer managed to capture the beauty of the sunset.",
    "language": "english"
  },
  {
    "german": "",
    "english": "carbon",
    "turkish": "karbon  , karbon kağıdı  , karbon kömür  ",
    "exampleSentence": "Carbon dioxide is a greenhouse gas.",
    "language": "english"
  },
  {
    "german": "",
    "english": "cast",
    "turkish": "dökmek  , döküm  , cast - cast  ",
    "exampleSentence": "The director has cast an unknown actor in the lead role.",
    "language": "english"
  },
  {
    "german": "",
    "english": "casual",
    "turkish": "gündelik  , gündelikçi  , gündelik giysi  ",
    "exampleSentence": "The company has a casual dress code on Fridays.",
    "language": "english"
  },
  {
    "german": "",
    "english": "catch",
    "turkish": "enselemek  , yakalamak  , yetişmek  ",
    "exampleSentence": "Try to catch the ball with both hands.",
    "language": "english"
  },
  {
    "german": "",
    "english": "cave",
    "turkish": "mağara  , in  , oymak  ",
    "exampleSentence": "They explored the dark cave with torches.",
    "language": "english"
  },
  {
    "german": "",
    "english": "cell",
    "turkish": "hücre  , hücrelemek  , hücreye kapatmak  ",
    "exampleSentence": "The human body is made up of billions of cells.",
    "language": "english"
  },
  {
    "german": "",
    "english": "certainty",
    "turkish": "kesinlik  , muhakkak  , katiyet  ",
    "exampleSentence": "I can't say with any certainty what will happen.",
    "language": "english"
  },
  {
    "german": "",
    "english": "certificate",
    "turkish": "sertifika  , belgelemek  , belge vermek  ",
    "exampleSentence": "She received a certificate for completing the course.",
    "language": "english"
  },
  {
    "german": "",
    "english": "chain",
    "turkish": "zincir  , zincirle bağlamak  , kayıt altına almak  ",
    "exampleSentence": "He wore a silver chain around his neck.",
    "language": "english"
  },
  {
    "german": "",
    "english": "chair",
    "turkish": "koltuk  , sandalye  , iskemle  ",
    "exampleSentence": "Please take a seat in that chair.",
    "language": "english"
  },
  {
    "german": "",
    "english": "chairman",
    "turkish": "başkan (yönetim kurulu)  , başkan  , başkan olarak görev yapmak  ",
    "exampleSentence": "The chairman of the board addressed the shareholders.",
    "language": "english"
  },
  {
    "german": "",
    "english": "challenge",
    "turkish": "düelloya davet etmek  , karşı çıkmak  , meydan okumak  ",
    "exampleSentence": "Climbing Mount Everest is a great challenge.",
    "language": "english"
  },
  {
    "german": "",
    "english": "challenging",
    "turkish": "dürtücü  , zorlu  , meydan okuma  ",
    "exampleSentence": "This is a challenging time for our company.",
    "language": "english"
  },
  {
    "german": "",
    "english": "championship",
    "turkish": "şampiyona  , üstünlük  , şampiyonluk  ",
    "exampleSentence": "The team won the national championship.",
    "language": "english"
  },
  {
    "german": "",
    "english": "characteristic",
    "turkish": "özellik  , nitelik  , alamet  ",
    "exampleSentence": "A characteristic of the bird is its bright red feathers.",
    "language": "english"
  },
  {
    "german": "",
    "english": "charming",
    "turkish": "cazibeli  , alımlı  , çekici  ",
    "exampleSentence": "He has a charming personality.",
    "language": "english"
  },
  {
    "german": "",
    "english": "chart",
    "turkish": "Çizelge  , göstermek  , haritaya almak  ",
    "exampleSentence": "The chart shows the company's sales performance over the last year.",
    "language": "english"
  },
  {
    "german": "",
    "english": "chase",
    "turkish": "peşinde olmak  , kovalamak  , takip etmek  ",
    "exampleSentence": "The police car was chasing the stolen vehicle.",
    "language": "english"
  },
  {
    "german": "",
    "english": "cheek",
    "turkish": "yanak  , küstahlık etmek  , arsızca konuşmak  ",
    "exampleSentence": "The baby has rosy cheeks.",
    "language": "english"
  },
  {
    "german": "",
    "english": "cheer",
    "turkish": "neşelendirmek  , neşe  , şenlendirmek  ",
    "exampleSentence": "The crowd cheered as the team scored a goal.",
    "language": "english"
  },
  {
    "german": "",
    "english": "chief",
    "turkish": "şef  , amir  , ana  ",
    "exampleSentence": "He is the chief executive officer of the company.",
    "language": "english"
  },
  {
    "german": "",
    "english": "choir",
    "turkish": "koro  , koroda şarkı söylemek  , kilise korosu [i]",
    "exampleSentence": "She sings in the church choir.",
    "language": "english"
  },
  {
    "german": "",
    "english": "chop",
    "turkish": "doğramak  , kırmak (balta ile)  , balta ile kesmek  ",
    "exampleSentence": "Please chop the onions for the salad.",
    "language": "english"
  },
  {
    "german": "",
    "english": "circuit",
    "turkish": "çevrim  , devretmek  , dolaşmak  ",
    "exampleSentence": "An electrical circuit was damaged during the storm.",
    "language": "english"
  },
  {
    "german": "",
    "english": "circumstance",
    "turkish": "durum  , hal  , vaziyet  ",
    "exampleSentence": "Under the circumstances, we have decided to cancel the event.",
    "language": "english"
  },
  {
    "german": "",
    "english": "cite",
    "turkish": "aktarmak  , bahsetmek  , anmak  ",
    "exampleSentence": "He was cited for his bravery.",
    "language": "english"
  },
   {
    "german": "",
    "english": "commitment",
    "turkish": "taahhüt  , söz  ",
    "exampleSentence": "Playing for a team requires a big commitment of time and energy.",
    "language": "english"
  },
  {
    "german": "",
    "english": "citizen",
    "turkish": "vatandaş  , yurttaş  , bir devlet ya da ulusa mensup kişi  ",
    "exampleSentence": "He became a U.S. citizen after living there for ten years.",
    "language": "english"
  },
  {
    "german": "",
    "english": "civil",
    "turkish": "sivil  , kamu  , nezaketli  ",
    "exampleSentence": "The country is facing a civil war.",
    "language": "english"
  },
  {
    "german": "",
    "english": "civilization",
    "turkish": "uygarlık  , medeniyet  , uygarlaşma  ",
    "exampleSentence": "Ancient Egypt was one of the world's oldest civilizations.",
    "language": "english"
  },
  {
    "german": "",
    "english": "clarify",
    "turkish": "berraklaşmak  , açıklamak  , aydınlığa kavuşturmak  ",
    "exampleSentence": "Could you please clarify what you mean by that?",
    "language": "english"
  },
  {
    "german": "",
    "english": "classic",
    "turkish": "klasik  , klas  , değerini kanıtlamış yapıt  ",
    "exampleSentence": "His first novel has become a modern classic.",
    "language": "english"
  },
  {
    "german": "",
    "english": "classify",
    "turkish": "sınıflandırmak  , ayırmak  , kategorilere ayırmak  ",
    "exampleSentence": "The books in the library are classified by subject.",
    "language": "english"
  },
  {
    "german": "",
    "english": "cleaning",
    "turkish": "temizlik  , arıtma  , paklama  ",
    "exampleSentence": "I have to do the cleaning this weekend.",
    "language": "english"
  },
  {
    "german": "",
    "english": "clerk",
    "turkish": "yazman  , tezgahtar  , katip  ",
    "exampleSentence": "The hotel clerk gave us our room key.",
    "language": "english"
  },
  {
    "german": "",
    "english": "cliff",
    "turkish": "uçurum  , falez  , kepez  ",
    "exampleSentence": "The village is perched on the edge of a cliff.",
    "language": "english"
  },
  {
    "german": "",
    "english": "clinic",
    "turkish": "klinik  , muayenehane  , çözüm toplantısı  ",
    "exampleSentence": "She works at a dental clinic.",
    "language": "english"
  },
  {
    "german": "",
    "english": "clip",
    "turkish": "kırkmak  , kırpmak  , makasla kesmek  ",
    "exampleSentence": "He showed a short clip from the new movie.",
    "language": "english"
  },
  {
    "german": "",
    "english": "close",
    "turkish": "kapamak  , kapatmak  , yakın  ",
    "exampleSentence": "Please close the door behind you.",
    "language": "english"
  },
  {
    "german": "",
    "english": "closely",
    "turkish": "yakından [zf.], Sıkı Sıkı [zf.]",
    "exampleSentence": "The police are monitoring the situation closely.",
    "language": "english"
  },
  {
    "german": "",
    "english": "coincidence",
    "turkish": "rastlantı  , tesadüf  ",
    "exampleSentence": "What a coincidence! I was just about to call you.",
    "language": "english"
  },
  {
    "german": "",
    "english": "collapse",
    "turkish": "yığılmak  , çökmek  , çöküş  ",
    "exampleSentence": "The old building suddenly collapsed.",
    "language": "english"
  },
  {
    "german": "",
    "english": "collector",
    "turkish": "toplaç  , koleksiyoncu  , yardım toplayan kimse  ",
    "exampleSentence": "He is a famous art collector.",
    "language": "english"
  },
  {
    "german": "",
    "english": "colony",
    "turkish": "sömürge  , müstemleke  , bir ülkede bulunan küçük yabancı topluluğu  ",
    "exampleSentence": "Australia was once a British colony.",
    "language": "english"
  },
  {
    "german": "",
    "english": "colourful",
    "turkish": "rengarenk  , renkli  , canlı  ",
    "exampleSentence": "She has a very colourful personality.",
    "language": "english"
  },
  {
    "german": "",
    "english": "combination",
    "turkish": "birleştirme  , kombinasyon  , uyuşma  ",
    "exampleSentence": "The combination of flavors in this dish is amazing.",
    "language": "english"
  },
  {
    "german": "",
    "english": "comfort",
    "turkish": "rahatlık  , konfor  , rahat  ",
    "exampleSentence": "He is living in comfort now after years of hard work.",
    "language": "english"
  },
  {
    "german": "",
    "english": "comic",
    "turkish": "komik  , komedi oyuncusu, mizah dergisi  ",
    "exampleSentence": "He is a famous stand-up comic.",
    "language": "english"
  },
  {
    "german": "",
    "english": "command",
    "turkish": "emretmek  , buyurmak  , kumanda  ",
    "exampleSentence": "The officer gave the command to fire.",
    "language": "english"
  },
  {
    "german": "",
    "english": "commander",
    "turkish": "komutan  , kumandan  , baş  ",
    "exampleSentence": "The commander ordered his troops to advance.",
    "language": "english"
  },
  {
    "german": "",
    "english": "commission",
    "turkish": "komisyon  , yıkmak  , sipariş vermek  ",
    "exampleSentence": "The artist was given a commission to paint the portrait.",
    "language": "english"
  },
  {
    "german": "",
    "english": "committee",
    "turkish": "kurul  , komisyon  , komite  ",
    "exampleSentence": "The committee will meet next week to discuss the proposals.",
    "language": "english"
  },
  {
    "german": "",
    "english": "commonly",
    "turkish": "ortak olarak, sıradan biçimde [zf.], bayağıca [zf.]",
    "exampleSentence": "This species of bird is commonly found in North America.",
    "language": "english"
  },
  {
    "german": "",
    "english": "comparative",
    "turkish": "karşılaştırmalı  , karşılaştırma yoluyla yapılan  ",
    "exampleSentence": "She did a comparative study of the two novels.",
    "language": "english"
  },
  {
    "german": "",
    "english": "completion",
    "turkish": "bitirme  , bitme  , ikmal  ",
    "exampleSentence": "The completion of the project is expected next month.",
    "language": "english"
  },
  {
    "german": "",
    "english": "complex",
    "turkish": "karışık  , blok  , bileşik şey  ",
    "exampleSentence": "The instructions for the machine are very complex.",
    "language": "english"
  },
  {
    "german": "",
    "english": "complicated",
    "turkish": "çetrefil  , komplike  , çetrefilli  ",
    "exampleSentence": "The situation is more complicated than we thought.",
    "language": "english"
  },
  {
    "german": "",
    "english": "component",
    "turkish": "bileşen  , (tamamlayıcı) parça  , cüz  ",
    "exampleSentence": "Trust is a vital component of any relationship.",
    "language": "english"
  },
  {
    "german": "",
    "english": "compose",
    "turkish": "bestelemek  , oluşturmak  , (aralarındaki anlaşmazlıkları) gidermek  ",
    "exampleSentence": "Mozart began to compose music at a very young age.",
    "language": "english"
  },
  {
    "german": "",
    "english": "composer",
    "turkish": "yazar  , bestekar  , yaratıcı  ",
    "exampleSentence": "Beethoven is one of the most famous classical composers.",
    "language": "english"
  },
  {
    "german": "",
    "english": "compound",
    "turkish": "şiddetlendirmek  , birleştirmek  , yoğunlaştırmak  ",
    "exampleSentence": "Water is a compound of hydrogen and oxygen.",
    "language": "english"
  },
  {
    "german": "",
    "english": "comprehensive",
    "turkish": "etraflı  , kapsamlı  , tam veya her şey dahil  ",
    "exampleSentence": "The book provides a comprehensive guide to the city.",
    "language": "english"
  },
  {
    "german": "",
    "english": "comprise",
    "turkish": "kapsamak  , içermek  , içine almak  ",
    "exampleSentence": "The team comprises four Europeans and two Americans.",
    "language": "english"
  },
  {
    "german": "",
    "english": "compulsory",
    "turkish": "zorunlu  , yükümlü  , zorlayıcı  ",
    "exampleSentence": "Education is compulsory for all children up to the age of 16.",
    "language": "english"
  },
  {
    "german": "",
    "english": "concentration",
    "turkish": "yığma  , dikkati bir noktada toplama  , teksif  ",
    "exampleSentence": "This task requires a high level of concentration.",
    "language": "english"
  },
  {
    "german": "",
    "english": "concept",
    "turkish": "konsept  , kavram  , görüş  ",
    "exampleSentence": "It is a difficult concept to understand.",
    "language": "english"
  },
  {
    "german": "",
    "english": "concern",
    "turkish": "ilgilendirmek  , kaygı  , endişe  ",
    "exampleSentence": "The main concern is the safety of the workers.",
    "language": "english"
  },
  {
    "german": "",
    "english": "concerned",
    "turkish": "ilgili  , endişeli  ",
    "exampleSentence": "I am very concerned about her health.",
    "language": "english"
  },
  {
    "german": "",
    "english": "concrete",
    "turkish": "beton  , somut  , katılaşmak  ",
    "exampleSentence": "We need concrete evidence to support our claims.",
    "language": "english"
  },
  {
    "german": "",
    "english": "conduct",
    "turkish": "yönetmek  , yürütmek  , idare etmek  ",
    "exampleSentence": "The orchestra was conducted by a famous musician.",
    "language": "english"
  },
  {
    "german": "",
    "english": "confess",
    "turkish": "itiraf etmek  , günah çıkartmak  , kabullenmek  ",
    "exampleSentence": "He finally confessed to stealing the money.",
    "language": "english"
  },
  {
    "german": "",
    "english": "confidence",
    "turkish": "güven  , mahremiyet  , itimat  ",
    "exampleSentence": "She has a lot of confidence in her own abilities.",
    "language": "english"
  },
  {
    "german": "",
    "english": "conflict",
    "turkish": "çekişmek  , anlaşmazlığa düşmek  , çekişme  ",
    "exampleSentence": "There is a major conflict between the two countries.",
    "language": "english"
  },
  {
    "german": "",
    "english": "confusing",
    "turkish": "şaşırtma  , çetrefil  , kafa karıştırıcı  ",
    "exampleSentence": "The instructions were very confusing.",
    "language": "english"
  },
  {
    "german": "",
    "english": "confusion",
    "turkish": "karmaşa  , kargaşa  , şaşkınlık  ",
    "exampleSentence": "There was some confusion about who was supposed to be at the meeting.",
    "language": "english"
  },
  {
    "german": "",
    "english": "conscious",
    "turkish": "bilinçli  , uyanık  , farkında olan  ",
    "exampleSentence": "He was conscious of the fact that he was being watched.",
    "language": "english"
  },
  {
    "german": "",
    "english": "consequently",
    "turkish": "sonuç olarak [zf.], haliyle [zf.], bu/o yüzden [zf.]",
    "exampleSentence": "She failed her exams and consequently was unable to go to university.",
    "language": "english"
  },
  {
    "german": "",
    "english": "conservation",
    "turkish": "koruma  , muhafaza  , doğal kaynakları koruma  ",
    "exampleSentence": "Wildlife conservation is very important for the planet's future.",
    "language": "english"
  },
  {
    "german": "",
    "english": "conservative",
    "turkish": "muhafazakar  , tutucu  , tutucu kimse  ",
    "exampleSentence": "He has very conservative views on social issues.",
    "language": "english"
  },
  {
    "german": "",
    "english": "considerable",
    "turkish": "hatırı sayılır derecede  , kaydadeğer  , hatırı sayılır  ",
    "exampleSentence": "The project required a considerable amount of time and effort.",
    "language": "english"
  },
  {
    "german": "",
    "english": "considerably",
    "turkish": "oldukça [zf.], epeyce [zf.], çok [zf.]",
    "exampleSentence": "The new system is considerably better than the old one.",
    "language": "english"
  },
  {
    "german": "",
    "english": "consideration",
    "turkish": "düşünce  , değerlendirme  , düşünme  ",
    "exampleSentence": "After careful consideration, we have decided to accept your offer.",
    "language": "english"
  },
  {
    "german": "",
    "english": "consistent",
    "turkish": "istikrarlı  , tutarlı  , bağıntılı  ",
    "exampleSentence": "His work has been of a consistent high quality.",
    "language": "english"
  },
  {
    "german": "",
    "english": "consistently",
    "turkish": "sürekli olarak [zf.], mütemadiyen [zf.], tutarlı olarak [zf.]",
    "exampleSentence": "She has consistently achieved excellent results.",
    "language": "english"
  },
  {
    "german": "",
    "english": "conspiracy",
    "turkish": "komplo  , gizli anlaşma  , suikast  ",
    "exampleSentence": "They were accused of conspiracy to overthrow the government.",
    "language": "english"
  },
  {
    "german": "",
    "english": "constant",
    "turkish": "sabit  , durağan  , değişmez  ",
    "exampleSentence": "The machine needs a constant supply of power.",
    "language": "english"
  },
  {
    "german": "",
    "english": "constantly",
    "turkish": "ikide bir [zf.], sürekli [zf.], sabit düzeyde [zf.]",
    "exampleSentence": "He is constantly changing his mind.",
    "language": "english"
  },
  {
    "german": "",
    "english": "construct",
    "turkish": "inşa etmek  , dikmek  , resmetmek  ",
    "exampleSentence": "They plan to construct a new bridge over the river.",
    "language": "english"
  },
  {
    "german": "",
    "english": "construction",
    "turkish": "yapı  , inşaat  , inşa  ",
    "exampleSentence": "The construction of the new school is expected to be finished next year.",
    "language": "english"
  },
  {
    "german": "",
    "english": "consult",
    "turkish": "başvurmak  , danışmak  , görüş alışverişinde bulunmak  ",
    "exampleSentence": "You should consult a doctor if the symptoms persist.",
    "language": "english"
  },
  {
    "german": "",
    "english": "consultant",
    "turkish": "danışman  , konsültan  , iki yüzlü  ",
    "exampleSentence": "She works as a financial consultant for a major bank.",
    "language": "english"
  },
  {
    "german": "",
    "english": "consumption",
    "turkish": "tüketim  , yoğaltma  , sarf  ",
    "exampleSentence": "The country's energy consumption has increased significantly.",
    "language": "english"
  },
  {
    "german": "",
    "english": "contemporary",
    "turkish": "modern  , çağdaş  , günümüze ait  ",
    "exampleSentence": "The gallery specializes in contemporary art.",
    "language": "english"
  },
  {
    "german": "",
    "english": "contest",
    "turkish": "yarışma  , karşı koymak  , itiraz etmek  ",
    "exampleSentence": "She won first prize in the singing contest.",
    "language": "english"
  },
  {
    "german": "",
    "english": "contract",
    "turkish": "(hastalığa) yakalanmak  , sözleşme  , kontrat  ",
    "exampleSentence": "You should read the contract carefully before signing it.",
    "language": "english"
  },
  {
    "german": "",
    "english": "contribute",
    "turkish": "katkı yapmak  , katkıda bulunmak  , vermek (bağış olarak)  ",
    "exampleSentence": "Everyone was asked to contribute to the charity.",
    "language": "english"
  },
  {
    "german": "",
    "english": "contribution",
    "turkish": "katkı  , bağış  , aidat  ",
    "exampleSentence": "He made a significant contribution to the project.",
    "language": "english"
  },
  {
    "german": "",
    "english": "controversial",
    "turkish": "çekişmeli  , anlaşmazlığa neden olan  , tartışmaya yol açan  ",
    "exampleSentence": "The government's new policy is highly controversial.",
    "language": "english"
  },
  {
    "german": "",
    "english": "controversy",
    "turkish": "ihtilaf  , münakaşa  , mücadele  ",
    "exampleSentence": "The new law has caused a great deal of controversy.",
    "language": "english"
  },
  {
    "german": "",
    "english": "convenience",
    "turkish": "kolaylık  , elverişlilik  , müsait oluş  ",
    "exampleSentence": "For your convenience, the hotel offers a free shuttle service.",
    "language": "english"
  },
  {
    "german": "",
    "english": "convention",
    "turkish": "düzen  , toplama  , gelenek  ",
    "exampleSentence": "It is a convention for men to wear a suit and tie at formal events.",
    "language": "english"
  },
  {
    "german": "",
    "english": "conventional",
    "turkish": "geleneksel  , itibari  , basmakalıp  ",
    "exampleSentence": "She prefers conventional methods of teaching.",
    "language": "english"
  },
  {
    "german": "",
    "english": "convert",
    "turkish": "dönüştürmek  , arıtmak  , evirmek  ",
    "exampleSentence": "They converted the old barn into a beautiful house.",
    "language": "english"
  },
  {
    "german": "",
    "english": "convey",
    "turkish": "iletmek  , geçirmek  , ulaştırmak  ",
    "exampleSentence": "Please convey my apologies to your wife.",
    "language": "english"
  },
  {
    "german": "",
    "english": "convinced",
    "turkish": "inandırılan  , inandırılmış  , kani  ",
    "exampleSentence": "I am convinced that he is telling the truth.",
    "language": "english"
  },
  {
    "german": "",
    "english": "convincing",
    "turkish": "inandırıcı  , ikna edici  , ikna  ",
    "exampleSentence": "He gave a convincing performance as the villain.",
    "language": "english"
  },
  {
    "german": "",
    "english": "cope",
    "turkish": "başa çıkmak  , çare bulmak  , başarmak  ",
    "exampleSentence": "It must be difficult to cope with three young children and a full-time job.",
    "language": "english"
  },
  {
    "german": "",
    "english": "core",
    "turkish": "göbek  , öz  , çekirdek  ",
    "exampleSentence": "The core of the problem is a lack of funding.",
    "language": "english"
  },
  {
    "german": "",
    "english": "corporate",
    "turkish": "şirkete ait  , kurumsal  , tüzel  ",
    "exampleSentence": "The company is moving to a new corporate headquarters.",
    "language": "english"
  },
  {
    "german": "",
    "english": "corporation",
    "turkish": "kurum  , dernek  ",
    "exampleSentence": "He works for a large multinational corporation.",
    "language": "english"
  },
  {
    "german": "",
    "english": "corridor",
    "turkish": "koridor  , aralık  , bir yapıya girmeyi sağlayan veya odaları birleştiren genellikle dar geçit  ",
    "exampleSentence": "His office is at the end of the corridor.",
    "language": "english"
  },
  {
    "german": "",
    "english": "council",
    "turkish": "meclis  , kurul  , divan  ",
    "exampleSentence": "The city council has approved the plans for the new park.",
    "language": "english"
  },
  {
    "german": "",
    "english": "counter",
    "turkish": "tezgah  , sayaç  , karşılık vermek  ",
    "exampleSentence": "She was standing behind the counter of the bakery.",
    "language": "english"
  },
  {
    "german": "",
    "english": "county",
    "turkish": "ilçe  , idari bölge  , yerel idarelerin en küçük birimleri  ",
    "exampleSentence": "They live in a small town in a rural county.",
    "language": "english"
  },
  {
    "german": "",
    "english": "courage",
    "turkish": "cesurluk  , yüreklilik  , cesaret  ",
    "exampleSentence": "It takes courage to admit your mistakes.",
    "language": "english"
  },
  {
    "german": "",
    "english": "coverage",
    "turkish": "kapsam  , olay kaydı  , yayın alanı  ",
    "exampleSentence": "The news provided extensive coverage of the election.",
    "language": "english"
  },
  {
    "german": "",
    "english": "crack",
    "turkish": "yarılmak  , çatlamak  , çatırtı  ",
    "exampleSentence": "There is a crack in the mirror.",
    "language": "english"
  },
  {
    "german": "",
    "english": "craft",
    "turkish": "esnaf  , zanaat  , ustalıkla işlemek  ",
    "exampleSentence": "She sells traditional crafts at the local market.",
    "language": "english"
  },
  {
    "german": "",
    "english": "crash",
    "turkish": "çarpışmak  , çarpmak  , kırılma  ",
    "exampleSentence": "He was injured in a car crash.",
    "language": "english"
  },
  {
    "german": "",
    "english": "creation",
    "turkish": "kreasyon  , icat  , yaratma  ",
    "exampleSentence": "The creation of the universe is a mystery.",
    "language": "english"
  },
  {
    "german": "",
    "english": "creativity",
    "turkish": "yaratıcılık  ",
    "exampleSentence": "The job requires a high level of creativity.",
    "language": "english"
  },
  {
    "german": "",
    "english": "creature",
    "turkish": "varlık  , yaratık  , mahluk  ",
    "exampleSentence": "The ocean is full of strange and wonderful creatures.",
    "language": "english"
  }
  ]

mongoose.connect('mongodb+srv://miabella13456:yRYzMl2EsTrTrinp@cluster0.vfgnyji.mongodb.net/kelimeler?retryWrites=true&w=majority&appName=Cluster0', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    await Word.insertMany(words);
    console.log("Kelimeler başarıyla eklendi!");
    mongoose.disconnect();
  })
  .catch(err => {
    console.error(err);
    mongoose.disconnect();
  });