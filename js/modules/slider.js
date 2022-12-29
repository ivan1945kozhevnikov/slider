import { getTranslateX } from '../utils/getTranslateX.js'
const STEP = 1;  //шаг перелистования
const FORWARD_DIRECTION = -1;  //направление вперед
const BACK_DIRECTION = 1; //направление назад
const SLIDES_PAGE = 5;  //кол-во слайдов на странице

const slider = (nodeSlider) => {
  const backButton = nodeSlider.querySelector('.slider__button--prev'); //кнопка назад
  const nextButton = nodeSlider.querySelector('.slider__button--next'); //кнопка вперед
  const sliderList = nodeSlider.querySelector('.slider__list'); //список слайдов
  const sliderItem = nodeSlider.querySelector('.goods__item');  //слайд
  const sliderItems = nodeSlider.querySelectorAll('.goods__item');  //массив слайдов
  const sliderWidth = sliderItem.offsetWidth; //ширина слайда
  const slidesWidth = sliderWidth * sliderItems.length; //ширина всех слайдов
  const startPosition = getTranslateX(nodeSlider);  //стартовая позиция
  const width = sliderWidth * SLIDES_PAGE;  //ширина слайдов на странице
  const maxPosition = -(slidesWidth - width);  //максимальная позиция
  const stepWidth = sliderWidth * STEP; //ширина пролистования
  const stepWidthBefor = maxPosition + sliderWidth; //ширина пролистования до предпоследнего слайда
  const stepWidthAfter = startPosition - sliderWidth;  //ширина пролистования до 2-ого слайда
  const minPosition = startPosition;  //минимальная позиция
  let currentPosition = startPosition;  //текущая позиция

  const setCoordinate = (current) => {
    sliderList.style.transform = `translateX(${current}px)`;
  }

  backButton.addEventListener('click', () => {
    currentPosition += stepWidth;
    if (currentPosition === minPosition) {
      backButton.classList.add('slider__button--hidden');
    } if (currentPosition === stepWidthBefor) {
       nextButton.classList.remove('slider__button--hidden');
     }
    setCoordinate(currentPosition);
  })
  nextButton.addEventListener('click', () => {
    currentPosition -= stepWidth;
    if (currentPosition === maxPosition) {
      nextButton.classList.add('slider__button--hidden');
    } if (currentPosition === stepWidthAfter) {
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
