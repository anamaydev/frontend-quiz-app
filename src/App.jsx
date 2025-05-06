/*ToDO
*  [ ] fetch Data only onload
*  [ ] create selectedLanguage (state) initialise with empty string
*  [ ] create basic frame header + question section + options section
* */

import {useState} from 'react';
import {getIconUrl} from "./utils.js";
import data from '../data.json';
import './App.css'

function App() {
  // state variables
  const [selectedLanguage, setSelectedLanguage] = useState(3);

  // derived variables
  const quizData = data.quizzes;
  const iconPath = quizData[selectedLanguage].icon;
  console.log(`iconPath: ${iconPath}`);

  return (
    <>
      {
        selectedLanguage >= 0 &&
        <header className="header">
          <div className="header__language">
            <img className="header__language-logo language-accessibility" src={getIconUrl(iconPath)} alt="icon"/>
            <h3 className="header__selected-language">{quizData[selectedLanguage].title}</h3>
          </div>
        </header>
      }
      <main className="quiz">
        <section className="quiz__question-container">
          <p className="quiz__question-number">Question 6 out of 10</p>
          <h2 className="quiz__current-question">Which of these color contrast ratios defines the minimum WCAG 2.1 Level AA requirement for normal text?</h2>
          <div className="quiz__progress-container">
            <div className="quiz__progress-bar"></div>
          </div>
        </section>
        <section className="quiz__options-container">

        </section>
      </main>
    </>
  )
}

export default App
