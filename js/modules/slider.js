import { getTranslateX } from '../utils/getTranslateX.js'

//настройка слайдера по умолчанию
const DEFAULT_SETTING = {step : 1}
//направление вперед
const FORWARD_DIRECTION = -1;
//направление назад
const BACK_DIRECTION = 1;
//кол-во слайдов на странице
const SLIDES_PAGE = 5;

const slider = (nodeSlider, {step} = DEFAULT_SETTING) => {
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
  const positionFirstScrollBack = maxPosition + sliderWidth;
  //позиция после первого пролистывания вперед
  const positionFirstScrollForward = startPosition - sliderWidth;
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

  backButton.addEventListener('click', () => {
    currentPosition += calculatePosition(BACK_DIRECTION)
    setPosition(currentPosition);
    if (currentPosition >= positionFirstScrollBack) {
    nextButton.classList.remove('slider__button--hidden');
    }
    if (currentPosition === minPosition) {
      backButton.classList.add('slider__button--hidden')
    }
    if (currentPosition > minPosition ) {
      sliderList.style.transform = `translateX(${minPosition}px)`
      nextButton.classList.remove('slider__button--hidden');
    }
  })

  nextButton.addEventListener('click', () => {
    currentPosition += calculatePosition(FORWARD_DIRECTION);
    setPosition(currentPosition);
    if (currentPosition < maxPosition ) {
      sliderList.style.transform = `translateX(${maxPosition}px)`
      backButton.classList.remove('slider__button--hidden');
      nextButton.classList.add('slider__button--hidden');
    }
    if (currentPosition === maxPosition) {
      nextButton.classList.add('slider__button--hidden');
    }
    if (currentPosition <= positionFirstScrollForward) {
      backButton.classList.remove('slider__button--hidden');
    }
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
