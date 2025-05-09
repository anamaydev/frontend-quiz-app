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

import Header from './components/Header/Header.jsx';
import Main from './components/Main/Main.jsx';

function App() {
  // state variables
  const [selectedLanguageIndex, setSelectedLanguageIndex] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
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
        />
      </main>
    </>
  )
}

export default App
