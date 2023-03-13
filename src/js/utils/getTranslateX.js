const getTranslateX = (nodeSlider) => {
  const sliderList = nodeSlider.querySelector(".slider__list");
  const style = getComputedStyle(sliderList);
  const matrix = new WebKitCSSMatrix(style.transform);
  return matrix.m41;
}

export { getTranslateX }
