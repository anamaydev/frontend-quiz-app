import {useState, useEffect} from 'react';
import clsx from "clsx";
import data from '../data.json';
import './App.css'

import Header from './components/Header/Header.jsx';
import Main from './components/Main/Main.jsx';

import mobileArcLight from './assets/images/pattern-background-mobile-light.svg'
import mobileArcDark from './assets/images/pattern-background-mobile-dark.svg'
import tabletArcLight from './assets/images/pattern-background-tablet-light.svg'
import tabletArcDark from './assets/images/pattern-background-tablet-dark.svg'
import desktopArcLight from './assets/images/pattern-background-desktop-light.svg'
import desktopArcDark from './assets/images/pattern-background-desktop-dark.svg'

function App() {
  const [selectedLanguageIndex, setSelectedLanguageIndex] = useState(null);
  const [questionNumber, setQuestionNumber] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(()=>{
    const storedValue = localStorage.getItem('isDarkMode');
    if(storedValue === null){
      return true;
    }
    return !(storedValue === 'false');
  });

  // get quiz data
  const quizData = data.quizzes;

  // set mode preference to local storage and update the styling accordingly
  useEffect(()=>{
    const root = document.getElementById('root');
    localStorage.setItem('isDarkMode', isDarkMode);
    console.log(isDarkMode);
    if(!isDarkMode){
      root.style.backgroundColor = "hsla(220, 38%, 97%, 1)";
    }else{
      root.style.backgroundColor = "hsla(216, 25%, 25%, 1)";
    }
  },[isDarkMode])

  return (
    <>
      {
        /* isDarkMode === false : Light */
        !isDarkMode &&
        <div className="background-arc">
          <picture>
            <source media="(min-width: 64rem)" srcSet={desktopArcLight}/>
            <source media="(min-width: 37.5rem)" srcSet={tabletArcLight}/>
            <source srcSet={mobileArcLight}/>
            <img className="mobile-arc" src={mobileArcLight} alt=""/>
          </picture>
        </div>
      }

      {
        /* isDarkMode === true : Light */
        isDarkMode &&
        <div className="background-arc">
          <picture>
            <source media="(min-width: 64rem)" srcSet={desktopArcDark}/>
            <source media="(min-width: 37.5rem)" srcSet={tabletArcDark}/>
            <source srcSet={mobileArcDark}/>
            <img className="mobile-arc" src={mobileArcDark} alt=""/>
          </picture>
        </div>
      }
      <Header
        selectedLanguageIndex={selectedLanguageIndex}
        quizData={quizData}
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
      />

      {/*<main className="quiz">*/}
      <main className={clsx({"quiz": true}, {"quiz--light": !isDarkMode}, {"quiz--dark": isDarkMode})}>
        <Main
          selectedLanguageIndex={selectedLanguageIndex}
          quizData={quizData}
          setSelectedLanguageIndex={setSelectedLanguageIndex}
          questionNumber={questionNumber}
          setQuestionNumber={setQuestionNumber}
          isDarkMode={isDarkMode}
        />
      </main>
    </>
  )
}

export default App