function Carousel($element) {
  this.element = $element;
  this.setIntialClasses();
  this.attachButtonsEvents();
}

/**
 * @returns array of childrens elements
 */
Carousel.prototype.getSlidesNodes = function() {
  let slides = $(this.element).children('.carousel__wrapper');
  return slides;
};

/**
 *it sets classses at the init
 */
Carousel.prototype.setIntialClasses = function() {
  let slides = this.getSlidesNodes();
  let lastEl = slides.length - 1;
  $(slides[0]).addClass('primary');
  $(slides[1]).addClass('coming');
  $(slides[lastEl]).addClass('recent');
};

Carousel.prototype.attachButtonsEvents = function() {
  let nextButton = $(this.element).children('.btn--next');
  let prevButton = $(this.element).children('.btn--prev');
};
Carousel.prototype.onNextButtonClick = function(button) {
  let slides = this.getSlidesNodes();
  let primaryElementPosition = 0;
  for (index = 0; index < slides.length; index++) {
    if ($(slides[index]).hasClass('primary')) {
      return (primaryElementPosition = index);
    }
  }
  return primaryElementPosition;
};

let test = new Carousel($('.carousel'));
console.log(test.onNextButtonClick());
