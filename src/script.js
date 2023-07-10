document.addEventListener("DOMContentLoaded", function() {
  const slider = document.querySelector(".slider");
  let isDragging = false;
  let startPosition = 0;
  let currentTranslate = 0;
  let previousTranslate = 0;

  slider.addEventListener("mousedown", dragStart);
  slider.addEventListener("touchstart", dragStart);
  slider.addEventListener("mouseup", dragEnd);
  slider.addEventListener("touchend", dragEnd);
  slider.addEventListener("mousemove", drag);
  slider.addEventListener("touchmove", drag);

  function dragStart(event) {
    event.preventDefault();
    startPosition = getPositionX(event);
    isDragging = true;

    requestAnimationFrame(animation);
  }

  function dragEnd() {
    isDragging = false;
    currentPosition = getPositionX(event);

    if (currentPosition - startPosition < -100) {
      slideRight();
    } else if (currentPosition - startPosition > 100) {
      slideLeft();
    } else {
      slideBack();
    }
  }

  function drag(event) {
    if (isDragging) {
      const currentPosition = getPositionX(event);
      currentTranslate = previousTranslate + currentPosition - startPosition;
    }
  }

  function animation() {
    setSliderPosition();
    if (isDragging) {
      requestAnimationFrame(animation);
    }
  }

  function getPositionX(event) {
    return event.type.includes("mouse") ? event.pageX : event.touches[0].clientX;
  }

  function setSliderPosition() {
    slider.style.transform = `translateX(${currentTranslate}px)`;
  }

  function slideLeft() {
    if (currentTranslate === 0) return;
    previousTranslate = currentTranslate;
    currentTranslate += sliderWidth();
  }

  function slideRight() {
    if (currentTranslate === -sliderWidth() * (slider.children.length - 1)) return;
    previousTranslate = currentTranslate;
    currentTranslate -= sliderWidth();
  }

  function slideBack() {
    previousTranslate = currentTranslate;
  }

  function sliderWidth() {
    return slider.clientWidth;
  }
  const prevButton = document.querySelector(".prev-button");
  const nextButton = document.querySelector(".next-button");

  prevButton.addEventListener("click", slideLeft);
  nextButton.addEventListener("click", slideRight);


});