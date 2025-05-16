# Frontend quiz app 

## Table of contents

- [Overview](#overview)
    - [Screenshot](#screenshot)
- [My process](#my-process)
    - [Built with](#built-with)
    - [What I learned](#what-i-learned)


## Overview

### Screenshot

![Desktop View](./screenshots/frontend-quiz-app-desktop.png)

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- CSS Grid
- Mobile-first workflow
- [React](https://reactjs.org/) - JS library

### What I learned

- Storing and Fetching local storage
  - local storage came handy to store the user preference for website theme
```jsx
  // getting user preference from localStorage is exist
  const [isDarkMode, setIsDarkMode] = useState(()=>{
    const storedValue = localStorage.getItem('isDarkMode');
    if(storedValue === null){
      return true;
    }
    return !(storedValue === 'false');
  })

  useEffect(()=>{
    const root = document.getElementById('root');
    localStorage.setItem('isDarkMode', isDarkMode);

    // changing background color based on user preference
    if(!isDarkMode){
      root.style.backgroundColor = "hsla(220, 38%, 97%, 1)";
    }else{
      root.style.backgroundColor = "hsla(216, 25%, 25%, 1)";
    }
  },[isDarkMode])
```

- Since React JS follows Imperative programming, implementing GSAP to animate DOM nodes is different in React JS.
  - GSAP can be implemented using useRef() and useEffect() Hooks to manipulate the DOM nodes. There are other hooks like
    useLayoutEffect() and useGSAP() crated by GSAP but to strengthen my useEffect() and useRef() hooks understanding I 
    decided to go with useRef() and useEffect()
  - While using useEffect() for GSAP I leaned in order to avoid memory leaks we need to kill the animation, since the DOM
    element might be unmounted which could result in stale reference and animation linked to it can cause unwanted bugs
  
- Since React JS follows declarative programming, I realized integrating GSAP to animate DOM nodes works a bit differently
  in React.
- GSAP can be implemented using the `useRef()` and `useEffect()` hooks to directly manipulate DOM nodes. Although there are 
  other options like `useLayoutEffect()` and the `useGSAP()` hook provided by GSAP, I chose to use useRef() and useEffect() 
  to strengthen my understanding of these core React hooks.
- While using `useEffect()` with GSAP, I learned that to avoid memory leaks,
  it's important to kill the animation when the component unmounts.
  This prevents stale references to unmounted DOM elements, which could otherwise lead to bugs.
```jsx
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
```
  - I learned that I need to check if the GSAP object (wiggleWiggleWiggle) exists, and also ensure that the `.kill()`
    method is available before calling wiggleWiggleWiggle.kill() in the cleanup function.