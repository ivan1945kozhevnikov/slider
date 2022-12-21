const slider = (nodeSlider) => {
  const backButton = document.querySelector('.slider__button--prev');
  const nextButton = document.querySelector('.slider__button--next');
  backButton.addEventListener('click', () => {
    console.log("click on prev button")
  })
  nextButton.addEventListener('click', () => {
    console.log("click on next button")
  })
}

export { slider }
