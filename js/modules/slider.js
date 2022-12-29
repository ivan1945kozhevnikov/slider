import { getTranslateX } from '../utils/getTranslateX.js'
const STEP = 1;
const FORWARD_DIRECTION = -1;
const BACK_DIRECTION = 1;
const SLIDES_PAGE = 5;

const slider = (nodeSlider) => {
  const backButton = nodeSlider.querySelector('.slider__button--prev');
  const nextButton = nodeSlider.querySelector('.slider__button--next');
  const sliderList = nodeSlider.querySelector('.slider__list');
  const sliderItem = nodeSlider.querySelector('.goods__item');
  const items = nodeSlider.querySelectorAll('.goods__item');
  const sliderWidth = sliderItem.offsetWidth;
  const slidesWidth = sliderWidth * items.length;
  const startPosition = getTranslateX(nodeSlider);
  const maxPosition = slidesWidth - sliderWidth * SLIDES_PAGE;
  const stepWidth = sliderWidth * STEP;
  const minPosition = startPosition;
  let currentPosition = startPosition;

  const setCoordinate = (direction, start) => {
    const sliderCoordinate = direction * stepWidth + start;
    sliderList.style.transform += `translateX(${sliderCoordinate}px)`;
  }

  backButton.addEventListener('click', () => {
    currentPosition -= stepWidth;
    if (currentPosition === minPosition) {
      backButton.classList.add('slider__button--hidden');
    } else {
      nextButton.classList.remove('slider__button--hidden');
    }
    setCoordinate(BACK_DIRECTION, startPosition);
  })
  nextButton.addEventListener('click', () => {
    currentPosition += stepWidth;
    if (currentPosition === maxPosition) {
      nextButton.classList.add('slider__button--hidden');
    } else {
      backButton.classList.remove('slider__button--hidden');
    }
    setCoordinate(FORWARD_DIRECTION, startPosition);
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
