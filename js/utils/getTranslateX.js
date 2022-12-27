const sliderList = document.querySelector('.slider__list');
const getTranslateX = () => {
  const style = window.getComputedStyle(sliderList);
  const matrix = new WebKitCSSMatrix(style.transform);
  const start = matrix.m41;
  return start
}

export { getTranslateX }
