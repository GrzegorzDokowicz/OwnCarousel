/**1. zapisz klasy jako stale
 * 2. doczytaj o Object.assign oraz wprowadz object options.
 * 3. dodaj walidacje opcji - dopisane przeze mnie po napisaniu stepów
 */
import { defaultOptions } from './_config';
import { debounce } from './helpers';

export function Carousel(options) {
  this.options = Object.assign({}, defaultOptions, options);
  this.element = this.options.mainSelector;
  this.primaryClassName = 'primary';
  this.recentClassName = 'recent';
  this.comingClassName = 'coming';
  this.slides = $(this.element).children(this.options.slideSelectors);
  this.moving = false;
  this.currentPrimaryPosition = 0;

  if (this.validateArguments()) {
    this.setIntialClasses();
    this.createButtons();
    this.attachButtonsEvents();
    this.createDots();
    this.runAutomaticSlide();
  }
}

Carousel.prototype.setIntialClasses = function() {
  $(this.slides[this.currentPrimaryPosition]).addClass(this.primaryClassName);
};
Carousel.prototype.setNewClasses = function() {
  const slides = this.slides;

  $(slides[object.primary]).addClass(this.primaryClassName);
  $(slides[object.coming]).addClass(this.comingClassName);
  $(slides[object.recent]).addClass(this.recentClassName);
};

// It have to be refactored (it should check options only once and then create(or not) the buttons)
Carousel.prototype.createButtons = function() {
  if (this.options.buttons) {
    this.prevButton = this.createButton(`btn--prev`, `${this.options.backButtonText}`);
    this.nextButton = this.createButton(`btn--next`, `${this.options.nextButtonText}`);
  }
};

Carousel.prototype.createButton = function(buttonClassName, ...buttonText) {
  const button = $(`<button class="btn ${buttonClassName}">${buttonText}</button>`);

  $(this.element).prepend(button);

  return button;
};

Carousel.prototype.attachButtonsEvents = function() {
  const self = this;
  $(function() {
    $(self.nextButton).on('click', debounce(self.onNextButtonClick(), 500, true));
    $(self.prevButton).on('click', debounce(self.onBackButtonClick(), 500, true));
  });
};

Carousel.prototype.moveForward = function() {
  this.move(true);
};
Carousel.prototype.moveBackward = function() {
  const self = this;

  return function() {
    self.move(false);
  };
};

Carousel.prototype.prepareIndex = function(forward, currentStep) {
  const length = this.slides.length;
  const step = forward ? this.options.step : -this.options.step;

  let newStep = currentStep + step;

  newStep = newStep + 1 > length ? newStep - length : newStep;

  return newStep < 0 ? length + newStep : newStep;
};

Carousel.prototype.move = function(forward) {
  const newStep = this.prepareIndex(forward, this.currentPrimaryPosition);

  if (this.slides[newStep]) {
    $('.' + this.primaryClassName, this.element).removeClass(this.primaryClassName);
    $(this.slides[newStep]).addClass(this.primaryClassName);
    this.currentPrimaryPosition = newStep;
  }
};

Carousel.prototype.onNextButtonClick = function() {
  const self = this;

  return function() {
    self.moveForward();
    clearInterval(self.moving);
    setTimeout(self.runAutomaticSlide(), 1500);
  };
};
Carousel.prototype.onBackButtonClick = function() {
  const self = this;

  return function() {
    self.moveBackward();
    clearInterval(self.moving);
    self.runAutomaticSlide();
  };
};
Carousel.prototype.runAutomaticSlide = function() {
  const self = this;

  if (this.options.autoslide) {
    this.moving = setInterval(function() {
      self.moveForward();
    }, 3000);
  }
};
Carousel.prototype.createDots = function() {
  const self = this;
  const numberOfDots = this.slides.length;

  if (this.options.dots) {
    const container = $(`<div class="carousel__dotsWrapper"></div>`);

    for (index = 0; index < numberOfDots; index++) {
      container.append(`<div class="carousel__dot"></div>`);
    }

    $(self.element).append(container);
  }
};
Carousel.prototype.removeDotsClasses = function() {
  return $($('.carousel__dotsWrapper', this.element).children()).removeClass(
    `carousel__dotsWrapper--${this.primaryClassName}`
  );
};
Carousel.prototype.updatePrimaryDotClass = function(object) {
  //do przerobienia
  let self = this;
  let primaryClassPosition = this.primary;
  let dots = $('.carousel__dotsWrapper', this.element).children();
  return $(dots[primaryClassPosition]).addClass(`carousel__dotsWrapper--${self.primaryClassName}`);
};

Carousel.prototype.validateArguments = function() {
  const errors = Object.keys(this.options).filter(function(key) {
    return !defaultOptions.hasOwnProperty(key);
  });
  const flag = errors.length > 0;

  if (flag) {
    console.error('Something was wrong with following arguments', errors);
    console.warn('Current options are:', this.options);
  }

  return !flag;
};
