import './Header.css'
import clsx from 'clsx';
import {getIconUrl} from '../../utils.js';
import DarkSunIcon from '../../assets/images/icon-sun-dark.svg';
import DarkMoonIcon from '../../assets/images/icon-moon-dark.svg';

export default function Header({selectedLanguageIndex, quizData, isDarkMode, setIsDarkMode}) {
  return(
    <header className="header">
      <div className="header__language">
        {
          selectedLanguageIndex !== null &&
          <>
            <img
              className={clsx(
                {"header__language-logo": true},
                {"language-html": selectedLanguageIndex === 0},
                {"language-css": selectedLanguageIndex === 1},
                {"language-javascript": selectedLanguageIndex === 2},
                {"language-accessibility": selectedLanguageIndex === 3},
              )}
              src={getIconUrl(quizData[selectedLanguageIndex].icon)}
              alt={
                quizData[selectedLanguageIndex].title === "HTML" ? "HTML logo" :
                  quizData[selectedLanguageIndex].title === "CSS" ? "CSS logo" :
                    quizData[selectedLanguageIndex].title === "JavaScript" ? "JavaScript logo" :
                      quizData[selectedLanguageIndex].title === "Accessibility" ? "Accessibility logo" :
                        "Quiz logo"
              }
            />
            <h3 className="header__selected-language">{quizData[selectedLanguageIndex].title}</h3>
          </>
        }

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
  )
}