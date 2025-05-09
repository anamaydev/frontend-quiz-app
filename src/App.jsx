/*ToDO
*  [ ] fetch Data only onload
*  [ ] add shadows
*  [ ] check alt for all images/icons
* */

import {useState} from 'react';

import data from '../data.json';
import './App.css'

import Header from './components/Header/Header.jsx';
import Main from './components/Main/Main.jsx';

function App() {
  // state variables
  const [selectedLanguageIndex, setSelectedLanguageIndex] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [questionNumber, setQuestionNumber] = useState(0);
  console.log(`isDarkMode: ${isDarkMode}`)
  console.log(`selectedLanguage: ${selectedLanguageIndex}`)

  // derived variables
  const quizData = data.quizzes;

  return (
    <>
      <Header
        selectedLanguageIndex={selectedLanguageIndex}
        quizData={quizData}
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
      />

      <main className="quiz">
        <Main
          selectedLanguageIndex={selectedLanguageIndex}
          quizData={quizData}
          setSelectedLanguageIndex={setSelectedLanguageIndex}
          questionNumber={questionNumber}
          setQuestionNumber={setQuestionNumber}
        />
      </main>
    </>
  )
}

export default App
