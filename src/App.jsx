/*ToDO
*  [ ] fetch Data only onload
*  [x] create selectedLanguage (state)
*  [x] create separate Header component
*  [ ] create basic frame header + question section + options section
*  [ ] add shadows
*  [ ] add "selected-option" to selected option
*  [ ] add "correct-option" to selected option
*  [ ] add "incorrect-option" to selected option
*  [ ] check alt for all images/icons
* */

import {useState} from 'react';

import data from '../data.json';
import './App.css'
import correctIcon from './assets/images/icon-correct.svg'

import Header from "./components/Header/Header.jsx";


function App() {
  // state variables
  const [selectedLanguage, setSelectedLanguage] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(false);
  console.log(isDarkMode)

  // derived variables
  const quizData = data.quizzes;

  return (
    <>
      <Header
        selectedLanguage={selectedLanguage}
        quizData={quizData}
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
      />

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
