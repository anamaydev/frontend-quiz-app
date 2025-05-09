/*ToDo:
*  [x] finish css for all devices
*  [x] get user language choice
*  [x] create question element
*  [x] create options element
*     [x] options - correct selection highlight
*     [ ] options - incorrect selection highlight
*     [ ] options - hover / selection selection highlight
*  [ ] creat submit button
*  [ ] creat next question button
*  [ ] show score card
* */

import {useState} from 'react';
import './Main.css'
import {getIconUrl} from '../../utils.js'
import clsx from 'clsx';
import { nanoid } from 'nanoid'
import correctIcon from '../../assets/images/icon-correct.svg';
import incorrectIcon from '../../assets/images/icon-incorrect.svg'

export default function Main({selectedLanguageIndex, quizData, setSelectedLanguageIndex}) {

  const [questionNumber, setQuestionNumber] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const optionLetters = "ABCD";
  /* Selecting question based on selected language */
  const currentQuestion = selectedLanguageIndex !== null ? quizData[selectedLanguageIndex].questions[questionNumber].question: null;
  console.log(currentQuestion);

  function handleNextQuestion(){
    setQuestionNumber(prevQuestionNumber => prevQuestionNumber + 1);
    setIsAnswerSubmitted(false);
  }

  const currentQuestionOptions = selectedLanguageIndex !== null ? quizData[selectedLanguageIndex].questions[questionNumber].options.map((option, index)=> {
    const correctAnswer = quizData[selectedLanguageIndex].questions[questionNumber].answer;
    const isSelected = selectedOption === option;
    const isCorrectOption = isAnswerSubmitted && option === selectedOption && selectedOption === correctAnswer;
    const isIncorrectOption = isAnswerSubmitted && option === selectedOption && selectedOption !== correctAnswer;

    console.log(`correctAnswer: ${correctAnswer}`);
    console.log(`isAnswerSubmitted: ${isAnswerSubmitted}`);
    console.log(`selectedOption: ${selectedOption}`);
    console.log(`selectedOption === correctAnswer: ${selectedOption === correctAnswer}`);
    console.log(`umm check: ${isAnswerSubmitted && selectedOption === correctAnswer}`);
    return(
      <label
        key={nanoid()}
        className={clsx(
          {"quiz__options-label": true},
          {"quiz__options-label--selected": isSelected},
          {"quiz__options-label--correct": isCorrectOption},
          {"quiz__options-label--incorrect": isIncorrectOption},
        )}
      >
        <input
          className="quiz__options-radio"
          type="radio"
          name="options"
          value={option}
          checked={selectedOption === option}
          onChange={() => setSelectedOption(option)}
        />
        <span
          // className="quiz__options-icon-container"

          className={clsx(
            {"quiz__options-icon-container":true},
            {"quiz__options-icon-container--correct": isCorrectOption},
            {"quiz__options-icon-container--incorrect": isIncorrectOption},
          )}
        >
          <p
            // className="quiz__options-icon"
            className={clsx(
              {"quiz__options-icon": true},
              {"quiz__options-icon--correct": isCorrectOption},
              {"quiz__options-icon--incorrect": isIncorrectOption},
            )}
          >
            {optionLetters[index]}
          </p>
        </span>
        <p className="quiz__options-value">{option}</p>
        {(isCorrectOption || isAnswerSubmitted && option === correctAnswer) && <img className="quiz__options-correct-icon" src={correctIcon} alt="correct icon"/>}
        {isIncorrectOption && <img className="quiz__options-correct-icon" src={incorrectIcon} alt="correct icon"/>}
      </label>
    )
  }) : null;
  console.log(`currentQuestionOptions: ${currentQuestionOptions}`);
  console.log(`selectedOption: ${selectedOption}`)

  /* creating a language selection element */
  const languagesOptions = quizData.map((quiz, index) => (
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
        checked={selectedLanguageIndex === quiz.title}
        onChange={() => setSelectedLanguageIndex(index)}
      />
      <p className="quiz__options-value">{quiz.title}</p>
    </label>
  ));


  return (
    <>
      <section className="quiz__question-container">
        {
        /* welcome message */
        selectedLanguageIndex === null &&
          <>
            <h1 className="quiz__welcome-message">
              <span className="quiz__welcome-message-light">Welcome to the </span>
              <br/>
              <span>Frontend Quiz!</span></h1>
            <p className="quiz__description">Pick a subject to get started</p>
          </>
        }

        {
          /* current question */
          selectedLanguageIndex !== null &&
          <>
            <p className="quiz__question-number">Question {questionNumber+1} out of 10</p>
            <h2 className="quiz__current-question">{currentQuestion}</h2>
            <div className="quiz__progress-container">
              <div className="quiz__progress-bar"></div>
            </div>
          </>
        }
      </section>

      <section className="quiz__options-container">
        {
          /* language options */
          selectedLanguageIndex === null && languagesOptions
        }

        {
          // current question options
          selectedLanguageIndex !== null &&
          <>
            <div className="quiz__options-group">
              {currentQuestionOptions}
            </div>
            {!isAnswerSubmitted && <button className="quiz__next-question-button" onClick={()=>setIsAnswerSubmitted(true)}>Submit</button>}
            {isAnswerSubmitted && <button className="quiz__next-question-button" onClick={handleNextQuestion}>Next Question</button>}
          </>
        }
      </section>
    </>
  )
}