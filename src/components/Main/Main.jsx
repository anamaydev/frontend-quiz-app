/*ToDo:
*  [ ] fetch data from fake api
*  [x] finish css for all devices
*  [x] get user language choice
*  [x] create question element
*  [x] create options element
*     [x] options - correct selection highlight
*     [x] options - incorrect selection highlight
*     [x] selection selection highlight
*  [x] creat submit button
*  [x] creat next question button
*  [x] show score card
* */

import {useRef, useState, useEffect} from 'react';
import { nanoid } from 'nanoid'

import './Main.css'
import clsx from 'clsx';

/* importing required assets */
import correctIcon from '../../assets/images/icon-correct.svg';
import incorrectIcon from '../../assets/images/icon-incorrect.svg'
import errorIcon from '../../assets/images/icon-error.svg'
import htmlIcon from '../../assets/images/icon-html.svg'
import cssIcon from '../../assets/images/icon-css.svg'
import javascriptIcon from '../../assets/images/icon-js.svg'
import accessibilityIcon from '../../assets/images/icon-accessibility.svg'

export default function Main({selectedLanguageIndex, quizData, setSelectedLanguageIndex, questionNumber, setQuestionNumber, isDarkMode}) {
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [error, setError] = useState(false);
  const [points, setPoints] = useState(0);
  const errorRef = useRef(null);
  const optionLetters = "ABCD";

  useEffect(()=>{
    if(error){
      errorRef.current.scrollIntoView();
    }
  },[error])


  /* Selecting question based on selected language */
  const currentQuestion = (selectedLanguageIndex !== null && questionNumber < 10) ? quizData[selectedLanguageIndex].questions[questionNumber].question: null;
  console.log(currentQuestion);

  function handleNextQuestion(){
    setSelectedOption(null);
    setQuestionNumber(prevQuestionNumber => {
      if(prevQuestionNumber < 10){
        return prevQuestionNumber + 1
      }else{
        return prevQuestionNumber;
      }
    });
    setIsAnswerSubmitted(false);
    setError(false)
  }

  function handleSubmit(){
    if(selectedOption === null){
      setError(true);
      console.log(`---------- error: ${error} ----------`);
    }else{
      setIsAnswerSubmitted(true);
      const correctAnswer = quizData[selectedLanguageIndex].questions[questionNumber].answer;
      if(selectedOption === correctAnswer){
        setPoints(prevPoints => prevPoints + 1);
        console.log(`++++ Points: ${points} ++++`);
      }
    }
  }

  function handleRestart() {
    setSelectedLanguageIndex(null);
    setQuestionNumber(0);
    setPoints(0);
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
    setError(false);
  }

  const currentQuestionOptions = (selectedLanguageIndex !== null  && questionNumber < 10) ? quizData[selectedLanguageIndex].questions[questionNumber].options.map((option, index)=> {
    const correctAnswer = quizData[selectedLanguageIndex].questions[questionNumber].answer;
    const isSelected = selectedOption === option;
    const isCorrectOption = isAnswerSubmitted && option === selectedOption && selectedOption === correctAnswer;
    const isIncorrectOption = isAnswerSubmitted && option === selectedOption && selectedOption !== correctAnswer;

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
          disabled={isAnswerSubmitted}
        />
        <span
          className={clsx(
            {"quiz__options-icon-container":true},
            {"quiz__options-icon-container--correct": isCorrectOption},
            {"quiz__options-icon-container--incorrect": isIncorrectOption},
          )}
        >
          <p
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

  /* creating a language selection element */
  const languagesOptions = quizData.map((quiz, index) => (
    <label
      key={nanoid()}
      className= {clsx(
        {"quiz__options-label":true},
        {"quiz__options-label--light":!isDarkMode},
        {"quiz__options-label--dark":isDarkMode}
      )}
    >
      <img
        className={clsx(
          {"quiz__options-language-icon": true},
          {"language-html": quiz.title === 'HTML'},
          {"language-css": quiz.title === 'CSS'},
          {"language-javascript": quiz.title === 'JavaScript'},
          {"language-accessibility": quiz.title === 'Accessibility'},
        )}
        src={
          quiz.title === "HTML" ? htmlIcon :
            quiz.title === "CSS" ? cssIcon :
              quiz.title === "JavaScript" ? javascriptIcon :
                quiz.title === "Accessibility" ? accessibilityIcon :
                  null
        }
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
              <span className="quiz__welcome-message-thin">Welcome to the </span>
              <br/>
              <span>Frontend Quiz!</span></h1>

            {/*<p className="quiz__description">*/}
            <p
              className={clsx(
                {"quiz__description":true},
                {"quiz__description--light": !isDarkMode},
                {"quiz__description--dark": isDarkMode}
              )}
            >
              Pick a subject to get started
            </p>
          </>
        }

        {
          /* welcome message */
          selectedLanguageIndex !== null && questionNumber >= 10 &&
          <>
            <h1 className="quiz__welcome-message">
              <span className="quiz__welcome-message-thin">Quiz completed</span>
              <br/>
              <span>You scored...</span></h1>
          </>
        }

        {
          /* current question */
          selectedLanguageIndex !== null && questionNumber < 10 &&
          <>
            {/*<p className="quiz__question-number">*/}
            <p
              className={clsx(
                {"quiz__question-number":true},
                {"quiz__question-number":!isDarkMode},
                {"quiz__question-number":!isDarkMode}
              )}
            >
              Question {questionNumber+1} out of 10
            </p>
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
          selectedLanguageIndex !== null && questionNumber < 10 &&
          <>
            <div className="quiz__options-group">
              {currentQuestionOptions}
            </div>
            {
              !isAnswerSubmitted &&
              <button className="quiz__next-question-button" onClick={handleSubmit}>Submit</button>
            }
            {
              isAnswerSubmitted &&
              <button className="quiz__next-question-button" onClick={handleNextQuestion}>Next Question</button>
            }
            {
              error &&
              <div ref={errorRef} className="quiz__error-container">
                <img className="quiz__error-icon" src={errorIcon} alt=""/>
                <p className="quiz__error">Please select an answer</p>
              </div>
            }
          </>
        }

        {
          selectedLanguageIndex !== null && questionNumber >= 10 &&
          <>
            <div className="quiz__score-card">
              <div className="quiz__score-language">
                <img
                  className={clsx(
                    {"header__language-logo": true},
                    {"language-html": selectedLanguageIndex === 0},
                    {"language-css": selectedLanguageIndex === 1},
                    {"language-javascript": selectedLanguageIndex === 2},
                    {"language-accessibility": selectedLanguageIndex === 3},
                  )}
                  src={
                    quizData[selectedLanguageIndex].title === "HTML" ? htmlIcon  :
                      quizData[selectedLanguageIndex].title === "CSS" ? cssIcon :
                        quizData[selectedLanguageIndex].title === "JavaScript" ? javascriptIcon :
                          quizData[selectedLanguageIndex].title === "Accessibility" ? accessibilityIcon :
                            null
                  }
                  alt={
                    quizData[selectedLanguageIndex].title === "HTML" ? "HTML logo" :
                      quizData[selectedLanguageIndex].title === "CSS" ? "CSS logo" :
                        quizData[selectedLanguageIndex].title === "JavaScript" ? "JavaScript logo" :
                          quizData[selectedLanguageIndex].title === "Accessibility" ? "Accessibility logo" :
                            "Quiz logo"
                  }
                />
                <h3 className="header__selected-language">{quizData[selectedLanguageIndex].title}</h3>
              </div>
              <div className="quiz__score-container">
                <h2 className="quiz__score-points">{points}</h2>
                <p className="quiz__score-out-of">out of 10</p>
              </div>
            </div>
            <button className="quiz__next-question-button" onClick={handleRestart}>Play again</button>
          </>
        }
      </section>
    </>
  )
}