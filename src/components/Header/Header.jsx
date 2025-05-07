import './Header.css'
import clsx from "clsx";
import {getIconUrl} from "../../utils.js";
import DarkSunIcon from "../../assets/images/icon-sun-dark.svg";
import DarkMoonIcon from "../../assets/images/icon-moon-dark.svg";

export default function Header({selectedLanguage, quizData, isDarkMode, setIsDarkMode}) {
  return(
    <header className="header">
      <div className="header__language">
        {
          selectedLanguage !== null &&
          <>
            <img
              className={clsx(
                {"header__language-logo": true},
                {"language-html": selectedLanguage === 0},
                {"language-css": selectedLanguage === 1},
                {"language-javascript": selectedLanguage === 2},
                {"language-accessibility": selectedLanguage === 3},
              )}
              src={getIconUrl(quizData[selectedLanguage].icon)} alt="icon"/>
            <h3 className="header__selected-language">{quizData[selectedLanguage].title}</h3>
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