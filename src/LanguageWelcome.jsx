import React, { useState } from 'react';
import { preferredWelcomeLanguage, welcomeNarration, welcomes } from './narration.js';
import { SpeechReader } from './SpeechReader.jsx';

export default function LanguageWelcome() {
  const [language, setLanguage] = useState(() => preferredWelcomeLanguage(
    typeof navigator !== 'undefined' ? navigator.language : 'en'
  ));
  const welcome = welcomes[language];

  return (
    <section className="section welcome-language-section" id="welcome-languages" aria-labelledby="language-welcome-title">
      <div className="container welcome-language-layout">
        <div className="welcome-language-aside">
          <span className="eyebrow"><span className="eyebrow-line" />A WELCOME IN MORE THAN ONE LANGUAGE</span>
          <span className="welcome-language-decoration" aria-hidden="true">◎</span>
          <p>Words change across languages. The invitation remains: you have a place here, whether you agree with us or not.</p>
          <p className="welcome-language-scope">This introductory welcome is translated into three languages. The main learning lessons and Living Library remain in English while further translations are reviewed.</p>
        </div>
        <div className="welcome-language-main">
          <div className="welcome-language-tabs" role="group" aria-label="Choose a language for this welcome">
            {Object.entries(welcomes).map(([key, value]) => (
              <button type="button" key={key} className={language === key ? 'welcome-language-tab active' : 'welcome-language-tab'}
                aria-pressed={language === key} onClick={() => setLanguage(key)} lang={value.lang}>{value.name}</button>
            ))}
          </div>
          <div key={language} lang={welcome.lang} className="welcome-language-copy">
            <h2 id="language-welcome-title">{welcome.heading}</h2>
            <p>{welcome.lead}</p>
            <p>{welcome.body}</p>
            <blockquote>{welcome.quote}</blockquote>
          </div>
          <SpeechReader key={'welcome-'+language} owner={'welcome-'+language}
            lang={welcome.lang} label="this welcome" segments={welcomeNarration(welcome)} />
        </div>
      </div>
    </section>
  );
}
