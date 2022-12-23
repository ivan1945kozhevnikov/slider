const STEP = 1;
const FORWARD_DIRECTION = -1;
const BACK_DIRECTION = 1;

const slider = (nodeSlider) => {
  const backButton = nodeSlider.querySelector('.slider__button--prev');
  const nextButton = nodeSlider.querySelector('.slider__button--next');
  const sliderList = nodeSlider.querySelector('.slider__list');
  const sliderItem = nodeSlider.querySelector('.goods__item');
  const sliderWidth = sliderItem.offsetWidth;

  const findUseCoordinate = (step, direction) => {
   const sliderCoordinate = `${step * direction * sliderWidth}px`;
   return sliderList.style.transform += `translateX(${sliderCoordinate})`;
  }
  backButton.addEventListener('click', () => {
    findUseCoordinate(STEP, BACK_DIRECTION);
  })
  nextButton.addEventListener('click', () => {
    findUseCoordinate(STEP, FORWARD_DIRECTION);
  })
}

export { slider }
