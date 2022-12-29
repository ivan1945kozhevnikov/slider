import { getTranslateX } from '../utils/getTranslateX.js'
//шаг пролистывания
const STEP = 1;
//направление вперед
const FORWARD_DIRECTION = -1;
//направление назад
const BACK_DIRECTION = 1;
//кол-во слайдов на странице
const SLIDES_PAGE = 5;

const slider = (nodeSlider) => {
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
  const stepWidth = sliderWidth * STEP;
  //позиция после первого пролистывания назад
  const positionAfter1SwipeBack = maxPosition + sliderWidth;
  //позиция после первого пролистывания вперед
  const positionAfter1SwipeForwaard = startPosition - sliderWidth;
  //минимальная позиция
  const minPosition = startPosition;
  //текущая позиция
  let currentPosition = startPosition;

  const setCoordinate = (current) => {
    sliderList.style.transform = `translateX(${current}px)`;
  }

  backButton.addEventListener('click', () => {
    currentPosition += stepWidth;
    if (currentPosition === minPosition) {
      backButton.classList.add('slider__button--hidden');
    } if (currentPosition === positionAfter1SwipeBack) {
       nextButton.classList.remove('slider__button--hidden');
     }
    setCoordinate(currentPosition);
  })

  nextButton.addEventListener('click', () => {
    currentPosition -= stepWidth;
    if (currentPosition === maxPosition) {
      nextButton.classList.add('slider__button--hidden');
    } if (currentPosition === positionAfter1SwipeForwaard) {
      backButton.classList.remove('slider__button--hidden');
    }
    setCoordinate(currentPosition);
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
