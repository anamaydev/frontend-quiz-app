/*ToDo:
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
*  [x] check alt for all images/icons
*  [x] work on dark-light mode
*  [ ] save mode preference in local storage
*  [x] add picture tag to decide arc based on width
*  [x] add animations to correct and incorrect options
*  [x] add sounds to correct and incorrect selections
*  [x] add shadows and hover effect to buttons
*  [x] add animation to progress bar
* */

import {useRef, useState, useEffect} from 'react';
import { nanoid } from 'nanoid'
import useSound from 'use-sound'
import { gsap } from "gsap";
import { CustomWiggle } from "gsap/CustomWiggle";
import { CustomEase } from "gsap/CustomEase";

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
import correctSfx from '../../assets/sounds/correct.mp3'
import incorrectSfx from '../../assets/sounds/incorrect.mp3'

gsap.registerPlugin(CustomEase, CustomWiggle);

// custom ease for wiggle animation
CustomWiggle.create("myWiggle", {
  wiggles: 6,
  type: "easeInOut",
});

export default function Main({selectedLanguageIndex, quizData, setSelectedLanguageIndex, questionNumber, setQuestionNumber, isDarkMode}) {
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [error, setError] = useState(false);
  const [points, setPoints] = useState(0);
  const [wrongOptionIndex, setWrongOptionIndex] = useState(null);
  const [correctOptionIndex, setCorrectOptionIndex] = useState(null);

  const errorRef = useRef(null);
  const barRef = useRef(null);
  const optionsRef = useRef([]);
  const optionLetters = "ABCD";

  const [playCorrect] = useSound(correctSfx);
  const [playIncorrect] = useSound(incorrectSfx);

  // making sure the option references are new every render
  optionsRef.current = [];

  // scroll to the displayed error
  useEffect(()=>{
    if(error){
      errorRef.current.scrollIntoView();
    }
  },[error])

  useEffect(()=>{
    let barProgress;
    const barWidth = (questionNumber * 10);

    if(barRef.current !== null){
      const target = barRef.current;
      barProgress = gsap.to(target, {
        width: `${barWidth}%`,
        duration: 0.5,
      })
    }

    return ()=> {
     if (barProgress) barProgress.kill();
    };
  },[questionNumber])

  useEffect(()=>{
    let wiggleWiggleWiggle;

    if (wrongOptionIndex !== null){
        const target = optionsRef.current[wrongOptionIndex];

        wiggleWiggleWiggle = gsap.to(target, {
          x: -10,
          ease: "myWiggle",
          duration: 0.5,
        });
    }

    return ()=> {
      if (wiggleWiggleWiggle && wiggleWiggleWiggle.kill) wiggleWiggleWiggle.kill();
    }
  }, [wrongOptionIndex]);

  useEffect(()=>{
    let scaleScaleScale;

    if(correctOptionIndex !== null){
      const target = optionsRef.current[correctOptionIndex];

      scaleScaleScale = gsap.to(target, {
        scale: 1.025,
        repeat: 1,
        yoyo: true,
        duration: 0.25,
      })
    }

    return ()=> {
      if(scaleScaleScale && scaleScaleScale.kill) scaleScaleScale.kill();
    }
  },[correctOptionIndex])


  /* Selecting question based on selected language */
  const currentQuestion = (selectedLanguageIndex !== null && questionNumber < 10) ? quizData[selectedLanguageIndex].questions[questionNumber].question: null;

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
    setWrongOptionIndex(null);
    setCorrectOptionIndex(null);
  }

  function handleSubmit(){
    if(selectedOption === null){
      setError(true);
    }else{
      const question = quizData[selectedLanguageIndex].questions[questionNumber];
      const correctAnswer = question.answer;

      setIsAnswerSubmitted(true);

      if(selectedOption === correctAnswer){
        setPoints(prevPoints => prevPoints + 1);
        // get the correct option index and update state value to trigger animation
        const correctAnswerIndex = question.options.findIndex(option => option === correctAnswer);
        setCorrectOptionIndex(correctAnswerIndex);
        playCorrect();
      }else{
        // get the incorrect option index and update state value to trigger animation
        const wrongAnswerIndex = question.options.findIndex(option => option === selectedOption);
        setWrongOptionIndex(wrongAnswerIndex);
        playIncorrect();
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
        ref={element => optionsRef.current[index] = element}
        key={nanoid()}
        className={clsx(
          {"quiz__options-label": true},
          {"quiz__options-label--light":!isDarkMode},
          {"quiz__options-label--dark":isDarkMode},
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
        {isIncorrectOption && <img className="quiz__options-correct-icon" src={incorrectIcon} alt="incorrect icon"/>}
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
            <p
              className={clsx(
                {"quiz__question-number":true},
                {"quiz__question-number--light":!isDarkMode},
                {"quiz__question-number--dark":isDarkMode}
              )}
            >
              Question {questionNumber+1} out of 10
            </p>
            <h2 className="quiz__current-question">{currentQuestion}</h2>
            <div
              className={clsx(
                {"quiz__progress-container":true},
                {"quiz__progress-container--light":!isDarkMode},
                {"quiz__progress-container--dark":isDarkMode},
              )}
            >
              <div ref={barRef} className="quiz__progress-bar"></div>
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
                <img className="quiz__error-icon" src={errorIcon} alt="error icon"/>
                <p className="quiz__error">Please select an answer</p>
              </div>
            }
          </>
        }

        {
          selectedLanguageIndex !== null && questionNumber >= 10 &&
          <>
            <div
              className={clsx(
                {"quiz__score-card":true},
                {"quiz__score-card--light":!isDarkMode},
                {"quiz__score-card--dark":isDarkMode},
              )}
            >
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
                <p
                  className={clsx(
                    {"quiz__score-out-of":true},
                    {"quiz__score-out-of--light":!isDarkMode},
                    {"quiz__score-out-of--dark":isDarkMode}
                  )}
                >
                  out of 10
                </p>
              </div>
            </div>
            <button className="quiz__next-question-button" onClick={handleRestart}>Play again</button>
          </>
        }
      </section>
    </>
  )
}