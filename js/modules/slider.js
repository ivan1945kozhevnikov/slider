const STEP = 1;
const FORWARD_DIRECTION = -1;
const BACK_DIRECTION = 1;
const START_POSITION = 0;

const slider = (nodeSlider) => {
  const backButton = nodeSlider.querySelector('.slider__button--prev');
  const nextButton = nodeSlider.querySelector('.slider__button--next');
  const sliderList = nodeSlider.querySelector('.slider__list');
  const sliderItem = nodeSlider.querySelector('.goods__item');
  const sliderWidth = sliderItem.offsetWidth;

  const setCoordinate = (step, direction, position) => {
     const sliderCoordinate = `${step * direction * sliderWidth + position * direction}px`;
     return sliderList.style.transform += `translateX(${sliderCoordinate})`;
  }

  backButton.addEventListener('click', () => {
    setCoordinate(STEP, BACK_DIRECTION, START_POSITION);
  })
  nextButton.addEventListener('click', () => {
    setCoordinate(STEP, FORWARD_DIRECTION, START_POSITION);
  })
  sliderList.addEventListener('transitionstart', () => {
    backButton.setAttribute('disabled', 'disabled')
    backButton.classList.add('slider__button--disabled')
    nextButton.setAttribute('disabled', 'disabled')
    nextButton.classList.add('slider__button--disabled')
  })
  sliderList.addEventListener('transitionend', () => {
    backButton.removeAttribute('disabled')
    backButton.classList.remove('slider__button--disabled')
    nextButton.removeAttribute('disabled')
    nextButton.classList.remove('slider__button--disabled')
  })
}

export { slider }
