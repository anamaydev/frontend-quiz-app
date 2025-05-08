/*ToDo:
*  [x] finish css for all devices
* */

import './Main.css'
import {getIconUrl} from '../../utils.js'
import clsx from 'clsx';
import { nanoid } from 'nanoid'
import correctIcon from '../../assets/images/icon-correct.svg';

export default function Main({selectedLanguage, quizData, setSelectedLanguage}) {
  console.log(quizData)

  const languagesOptions = quizData.map((quiz, index)=> (
    <label key={nanoid()} className="quiz__options-label">
      <img
        className={clsx(
          {"quiz__options-language-icon": true},
          {"language-html": quiz.title === 'HTML'},
          {"language-css": quiz.title === 'CSS'},
          {"language-javascript": quiz.title === 'JavaScript'},
          {"language-accessibility": quiz.title === 'Accessibility'},
        )}
        src={getIconUrl(quiz.icon)}
        alt={
          quiz.title === "HTML" ? "HTML logo" :
            quiz.title === "CSS" ? "CSS logo" :
              quiz.title === "JavaScript" ? "JavaScript logo" :
                quiz.title === "Accessibility" ? "Accessibility logo" :
                  "Quiz logo"
        }
      />
      <input
        className="quiz__options-radio"
        type="radio"
        name="language-radio"
        value={quiz.title}
        onChange={() => setSelectedLanguage(index)}
      />
      <p className="quiz__options-value">{quiz.title}</p>
    </label>
  ));

  return (
    <>
      <section className="quiz__question-container">
        {
        selectedLanguage === null &&
          <>
            <h1 className="quiz__welcome-message">
              <span className="quiz__welcome-message-light">Welcome to the </span>
              <br/>
              <span>Frontend Quiz!</span></h1>
            <p className="quiz__description">Pick a subject to get started</p>
          </>
        }

        {
          selectedLanguage !== null &&
          <>
            <p className="quiz__question-number">Question 6 out of 10</p>
            <h2 className="quiz__current-question">Which of these color contrast ratios defines the minimum WCAG 2.1 Level AA requirement for normal text?</h2>
            <div className="quiz__progress-container">
              <div className="quiz__progress-bar"></div>
            </div>
          </>
        }
      </section>

      <section className="quiz__options-container">
        {
          selectedLanguage === null && languagesOptions
          // <div className="quiz__options-label">
          //   <img src="" alt=""/>
          //   <p className="quiz__options-value">HTML</p>
          // </div>
        }
        {
          selectedLanguage !== null &&
          <>
            <div className="quiz__options-group">
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
            </div>
            <button className="quiz__next-question-button">Next Question</button>
          </>
        }
      </section>
    </>
  )
}