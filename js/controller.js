function Carousel($element) {
  this.element = $element;
  this.slides = $(this.element).children('.carousel__wrapper');
  this.setIntialClasses();
  this.attachButtonsEvents();
}

/**
 *it sets classses at the init
 */
Carousel.prototype.setIntialClasses = function() {
  let slides = this.slides;
  let lastEl = this.slides.length - 1;
  $(slides[0]).addClass('primary');
  $(slides[1]).addClass('coming');
  $(slides[lastEl]).addClass('recent');
};
Carousel.prototype.removeAllClasses = function() {
  return $(this.slides).removeClass('recent primary coming');
};

Carousel.prototype.attachButtonsEvents = function() {
  let nextButton = $(this.element).children('.btn--next');
  let prevButton = $(this.element).children('.btn--prev');
  $(nextButton).on('click', this.onNextButtonClick());
};

Carousel.prototype.onNextButtonClick = function() {
  let self = this;
  return function() {
    let slides = self.slides;
    let primaryElementPosition = 0;

    for (index = 0; index < slides.length; index++) {
      if ($(slides[index]).hasClass('primary')) {
        primaryElementPosition = index;
      }
    }
    self.removeAllClasses();
    console.log(primaryElementPosition);
    console.log('click');
  };
};

$(function() {
  let test = new Carousel('.carousel');
});
