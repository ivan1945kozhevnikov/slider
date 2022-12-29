import { getTranslateX } from '../utils/getTranslateX.js'
const STEP = 1;
const FORWARD_DIRECTION = -1;
const BACK_DIRECTION = 1;

const slider = (nodeSlider) => {
  const backButton = nodeSlider.querySelector('.slider__button--prev');
  const nextButton = nodeSlider.querySelector('.slider__button--next');
  const sliderList = nodeSlider.querySelector('.slider__list');
  const sliderItem = nodeSlider.querySelector('.goods__item');
  const sliderWidth = sliderItem.offsetWidth;
  const startPosition = getTranslateX(nodeSlider);
  const maxPosition = sliderWidth * 15;
  const minPosition = startPosition;
  let position = startPosition;

  const setCoordinate = (step, direction, start) => {
    const sliderCoordinate = step * direction * sliderWidth + start;
    sliderList.style.transform += `translateX(${sliderCoordinate}px)`;
  }

  backButton.addEventListener('click', () => {
    position -= sliderWidth * STEP;
    if (position === minPosition) {
      backButton.classList.add('slider__button--hidden');
    }
    nextButton.classList.remove('slider__button--hidden');
    setCoordinate(STEP, BACK_DIRECTION, startPosition);
  })
  nextButton.addEventListener('click', () => {
    position += sliderWidth * STEP;
    if (position === maxPosition) {
      nextButton.classList.add('slider__button--hidden');
    }
    backButton.classList.remove('slider__button--hidden');
    setCoordinate(STEP, FORWARD_DIRECTION, startPosition);
  })
  sliderList.addEventListener('transitionstart', () => {
    backButton.setAttribute('disabled', '');
    backButton.classList.add('slider__button--disabled');
    nextButton.setAttribute('disabled', '');
    nextButton.classList.add('slider__button--disabled');
  })
  sliderList.addEventListener('transitionend', () => {
    backButton.removeAttribute('disabled');
    backButton.classList.remove('slider__button--disabled');
    nextButton.removeAttribute('disabled');
    nextButton.classList.remove('slider__button--disabled');
  })
}

export { slider }
