import { getTranslateX } from '../utils/getTranslateX.js'

//настройка слайдера по умолчанию
const DEFAULT_SETTING = {step : 1, infinite : false};
//направление вперед
const FORWARD_DIRECTION = -1;
//направление назад
const BACK_DIRECTION = 1;
//кол-во слайдов на странице
const SLIDES_PAGE = 5;

const slider = (nodeSlider, {step = 1, infinite = true} = DEFAULT_SETTING) => {
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
  const arr = Array.from(sliderItems);

  const setPosition = (current) => {
    sliderList.style.transform = `translateX(${current}px)`;
  }

  const calculatePosition = (direction) => {
    return direction * stepWidth;
  }

  const toggleControlVisibility = (control) => {
    control.classList.toggle('slider__button--hidden');
  }
  //если infinite = false, тогда переключает видимость кнопки назад
  if (!infinite) {
    toggleControlVisibility(backButton);
  }

  backButton.addEventListener('click', () => {
    currentPosition += calculatePosition(BACK_DIRECTION);
    //если infinite = false
    if (!infinite) {
      //если currentPosition = positionFirstScrollBack, тогда переключает видимость кнопки вперед
      if(currentPosition === positionFirstScrollBack) {
        toggleControlVisibility(nextButton);
      }
      //если currentPosition >= minPosition, тогда currentPosition = minPosition и переключает видимость кнопки вперед
      if (currentPosition >= minPosition) {
        currentPosition = minPosition;
        toggleControlVisibility(backButton);
      }
    }
    console.log(currentPosition)
    setPosition(currentPosition);
  })

  nextButton.addEventListener('click', () => {
 //если infinite = false
    if (!infinite) {
      currentPosition += calculatePosition(FORWARD_DIRECTION);
      setPosition(currentPosition);
      //если currentPosition = positionFirstScrollForward, тогда переключает видимость кнопки назад
      if (currentPosition === positionFirstScrollForward) {
        toggleControlVisibility(backButton);
      }
      //если currentPosition <= maxPosition, тогда currentPosition = maxPosition и переключает видимость кнопки вперед
      if (currentPosition <= maxPosition) {
        currentPosition = maxPosition;
        toggleControlVisibility(nextButton);
      }
    }
    if (infinite) {
      console.log(currentPosition)
      currentPosition += calculatePosition(FORWARD_DIRECTION);
      console.log(currentPosition)
      setPosition(currentPosition);
      // const newArr = arr.slice(0, step);
      // for (let i = 0; i < newArr.length; i+=1){
      //   sliderList.removeChild(newArr[i]);
      //   sliderList.appendChild(newArr[i]);
      // }
      setTimeout(()=>{
      currentPosition =0;
      setPosition(currentPosition);
      }, 10000)
    }
    // if (infinite) {
    //   currentPosition += calculatePosition(FORWARD_DIRECTION);
    //   setPosition(currentPosition);
    //   const removeArr = arr.slice(0, step);
    //   for (let i = 0; i < removeArr.length; i+=1){
    //     sliderList.removeChild(removeArr[i]);
    //     sliderList.appendChild(removeArr[i]);
    //   }
    //   currentPosition = 0;
    //   setPosition(currentPosition);
    // }
  })

  sliderList.addEventListener('transitionstart', () => {
    backButton.setAttribute('disabled', '');
    backButton.classList.add('slider__button--disabled');
    nextButton.setAttribute('disabled', '');
    nextButton.classList.add('slider__button--disabled');
    console.log(currentPosition)
  })
  sliderList.addEventListener('transitionend', () => {
    backButton.removeAttribute('disabled');
    backButton.classList.remove('slider__button--disabled');
    nextButton.removeAttribute('disabled');
    nextButton.classList.remove('slider__button--disabled');
    console.log(currentPosition)
  })
}

export { slider }
