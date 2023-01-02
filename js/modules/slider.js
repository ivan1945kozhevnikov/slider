import { getTranslateX } from '../utils/getTranslateX.js'

//настройка слайдера по умолчанию
const DEFAULT_SETTING = {step : 1, infinite : false,}
//направление вперед
const FORWARD_DIRECTION = -1;
//направление назад
const BACK_DIRECTION = 1;
//кол-во слайдов на странице
const SLIDES_PAGE = 5;

const slider = (nodeSlider, {step, infinite} = DEFAULT_SETTING) => {
  //кнопка назад
  const backButton = nodeSlider.querySelector('.slider__button--prev');
  //кнопка вперед
  const nextButton = nodeSlider.querySelector('.slider__button--next');
  //список слайдов
  const sliderList = nodeSlider.querySelector('.slider__list');
  //слайд
  const sliderItem = nodeSlider.querySelector('.goods__item');
  //массив слайдов
  const sliderItems = nodeSlider.querySelectorAll('.goods__item');
  //ширина слайда
  const sliderWidth = sliderItem.offsetWidth;
  //ширина всех слайдов
  const slidesWidth = sliderWidth * sliderItems.length;
  //стартовая позиция
  const startPosition = getTranslateX(nodeSlider);
  //ширина слайдов на странице
  const widthSlidesPage = sliderWidth * SLIDES_PAGE;
  //максимальная позиция
  const maxPosition = -(slidesWidth - widthSlidesPage);
  //ширина одного шага пролистывания
  const stepWidth = sliderWidth * step;
  //позиция после первого пролистывания назад
  const positionFirstScrollBack = maxPosition + stepWidth;
  //позиция после первого пролистывания вперед
  const positionFirstScrollForward = startPosition - stepWidth;
  //минимальная позиция
  const minPosition = startPosition;
  //текущая позиция
  let currentPosition = startPosition;

  const setPosition = (current) => {
    sliderList.style.transform = `translateX(${current}px)`;
  }

  const calculatePosition = (direction) => {
    return direction * stepWidth;
  }

  if (!infinite && currentPosition === startPosition) {
    backButton.classList.add('slider__button--hidden')
  }

  backButton.addEventListener('click', () => {
    currentPosition += calculatePosition(BACK_DIRECTION)
    if (!infinite) {
      if (currentPosition === positionFirstScrollBack) {
      nextButton.classList.remove('slider__button--hidden');
      }
      if (currentPosition >= minPosition ) {
      currentPosition = minPosition
      backButton.classList.add('slider__button--hidden')
      }
    }
    setPosition(currentPosition);
  })

  nextButton.addEventListener('click', () => {
    currentPosition += calculatePosition(FORWARD_DIRECTION);
    if (!infinite) {
      if (currentPosition <= maxPosition ) {
      currentPosition = maxPosition
      nextButton.classList.add('slider__button--hidden');
      }
      if (currentPosition === positionFirstScrollForward) {
      backButton.classList.remove('slider__button--hidden');
      }
    }
    setPosition(currentPosition);
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
