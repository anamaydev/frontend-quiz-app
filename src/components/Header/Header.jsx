import './Header.css'
import clsx from 'clsx';
import darkSunIcon from '../../assets/images/icon-sun-dark.svg';
import lightSunIcon from '../../assets/images/icon-sun-light.svg';
import darkMoonIcon from '../../assets/images/icon-moon-dark.svg';
import lightMoonIcon from '../../assets/images/icon-moon-light.svg';
import htmlIcon from '../../assets/images/icon-html.svg'
import cssIcon from '../../assets/images/icon-css.svg'
import javascriptIcon from '../../assets/images/icon-js.svg'
import accessibilityIcon from '../../assets/images/icon-accessibility.svg'

export default function Header({selectedLanguageIndex, quizData, isDarkMode, setIsDarkMode}) {
  return(
    <header className={clsx({"header":true}, {"header--light": !isDarkMode}, {"header--dark":isDarkMode})}>
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
          </>
        }

        <div className="header__mode-toggle">
          <img className="header__mode-toggle-icons header__sun-icon--dark" src={!isDarkMode ? darkSunIcon : lightSunIcon} alt="dark sun icon"/>
          <div className="header__mode-toggle-control">
            <input
              className="header__mode-toggle-checkbox"
              type="checkbox"
              id="mode-toggle"
              value={isDarkMode}
              checked={isDarkMode}
              onChange={() => {
                return setIsDarkMode(!isDarkMode);
              }}
            />
            <label className="header__mode-toggle-label" htmlFor="mode-toggle"></label>
          </div>
          <img className="header__mode-toggle-icons header__moon-icon--dark" src={!isDarkMode ? darkMoonIcon : lightMoonIcon} alt="dark sun icon"/>
        </div>
      </div>
    </header>
  )
}