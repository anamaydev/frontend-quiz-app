/*ToDO
*  [ ] fetch Data only onload
*  [x] create selectedLanguage (state)
*  [ ] create basic frame header + question section + options section
*  [ ] add shadows
*  [ ] add "selected-option" to selected option
*  [ ] add "correct-option" to selected option
*  [ ] add "incorrect-option" to selected option
*  [ ] check alt for all images/icons
* */

import {useState} from 'react';
import {getIconUrl} from "./utils.js";
import clsx from "clsx";
import data from '../data.json';
import './App.css'
import correctIcon from './assets/images/icon-correct.svg'
import DarkMoonIcon from './assets/images/icon-moon-dark.svg'
import DarkSunIcon from './assets/images/icon-sun-dark.svg'

function App() {
  // state variables
  const [selectedLanguage, setSelectedLanguage] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // derived variables
  const quizData = data.quizzes;

  return (
    <>
      {
        selectedLanguage !== null &&
        <header className="header">
          <div className="header__language">
            <img
              className={clsx(
                {"header__language-logo":true},
                {"language-html":selectedLanguage===0},
                {"language-css":selectedLanguage===1},
                {"language-javascript":selectedLanguage===2},
                {"language-accessibility":selectedLanguage===3},
              )}
              src={getIconUrl(quizData[selectedLanguage].icon)} alt="icon"/>
            <h3 className="header__selected-language">{quizData[selectedLanguage].title}</h3>

            <div className="header__mode-toggle">
              <img className="header__mode-toggle-icons header__sun-icon--dark" src={DarkSunIcon} alt="dark sun icon"/>
              <div className="header__mode-toggle-control">
                <input
                  className="header__mode-toggle-checkbox"
                  type="checkbox"
                  id="mode-toggle"
                  value={isDarkMode}
                  onChange={() => {
                    return setIsDarkMode(!isDarkMode);
                  }}
                />
                <label className="header__mode-toggle-label" htmlFor="mode-toggle"></label>
              </div>
              <img className="header__mode-toggle-icons header__moon-icon--dark" src={DarkMoonIcon} alt="dark sun icon"/>
            </div>
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
          <label className="quiz__options-label">
            <input className="quiz__options-radio" type="radio" name="" value="4.5:1"/>
            <span className="quiz__options-icon-container">
              <p className="quiz__options-icon">A</p>
            </span>
            <p className="quiz__options-value">4.5:1</p>
            <img className="quiz__options-correct-icon" src={correctIcon} alt="correct icon"/>
          </label>

          <label className="quiz__options-label">
            <input className="quiz__options-radio" type="radio" name="" value="4.5:1"/>
            <span className="quiz__options-icon-container">
              <p className="quiz__options-icon">A</p>
            </span>
            <p className="quiz__options-value">4.5:1</p>
            <img className="quiz__options-correct-icon" src={correctIcon} alt="correct icon"/>
          </label>

          <label className="quiz__options-label">
            <input className="quiz__options-radio" type="radio" name="" value="4.5:1"/>
            <span className="quiz__options-icon-container">
              <p className="quiz__options-icon">A</p>
            </span>
            <p className="quiz__options-value">4.5:1</p>
            <img className="quiz__options-correct-icon" src={correctIcon} alt="correct icon"/>
          </label>

          <label className="quiz__options-label">
            <input className="quiz__options-radio" type="radio" name="" value="4.5:1"/>
            <span className="quiz__options-icon-container">
              <p className="quiz__options-icon">A</p>
            </span>
            <p className="quiz__options-value">4.5:1</p>
            <img className="quiz__options-correct-icon" src={correctIcon} alt="correct icon"/>
          </label>

          <button className="quiz__next-question-button">Next Question</button>
        </section>
      </main>
    </>
  )
}

export default App
