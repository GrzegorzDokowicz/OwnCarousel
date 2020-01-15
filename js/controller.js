/**1. zapisz klasy jako stale
 * 2. doczytaj o Object.assign oraz wprowadz object options.
 * 3. dodaj walidacje opcji - dopisane przeze mnie po napisaniu stepów
 */

function Carousel(options) {
  this.options = Object.assign({}, defaultOptions, options);
  this.element = this.options.mainSelector;
  this.primaryClassName = 'primary';
  this.recentClassName = 'recent';
  this.comingClassName = 'coming';
  this.slides = $(this.element).children(this.options.slideSelectors);
  this.moving = false; // do omowienia
  this.currentStep = 0;

  if (this.validateArguments()) {
    this.createButtons();
    this.createDots();
    this.setIntialClasses();
    this.attachButtonsEvents();
    this.runAutomaticSlide();
  }
}

Carousel.prototype.setIntialClasses = function() {
  let slides = this.slides;
  let lastElementKey = this.slides.length - 1;

  $(slides[this.currentStep]).addClass(this.primaryClassName);
  $(slides[this.currentStep + 1]).addClass(this.comingClassName);
  $(slides[lastElementKey]).addClass(this.recentClassName);
};
Carousel.prototype.setNewClasses = function(index) {
  let slides = this.slides;

  $(slides[object.primary]).addClass(this.primaryClassName);
  $(slides[object.coming]).addClass(this.comingClassName);
  $(slides[object.recent]).addClass(this.recentClassName);
};

Carousel.prototype.removeAllClasses = function() {
  return $(this.slides).removeClass(
    `${this.recentClassName} ${this.primaryClassName} ${this.comingClassName}`
  );
};

// It have to be refactored (it should check options only once and then create(or not) the buttons)
Carousel.prototype.createButtons = function(buttonClassName, ...buttonText) {
  if (this.options.buttons) {
    this.prevButton = this.createButton(`btn--prev`, 'Back');
    this.nextButton = this.createButton(`btn--next`, `Next`);
  }
};

Carousel.prototype.createButton = function(buttonClassName, ...buttonText) {
  const button = $(
    `<button class="btn ${buttonClassName}">${buttonText}</button>`
  );

  $(this.element).append(button);

  return button;
};

Carousel.prototype.attachButtonsEvents = function() {
  $(this.nextButton).on('click', debounce(this.onNextButtonClick(), 500, true));
  $(this.prevButton).on('click', debounce(this.onBackButtonClick(), 500, true));
};

Carousel.prototype.getClassesPositions = function() {
  let self = this;
  let slides = self.slides;
  let primaryElementPosition = $(slides).index(
    $(slides).filter(`.${self.primaryClassName}`)
  );
  let recentElementPosition = $(slides).index(
    $(slides).filter(`.${self.recentClassName}`)
  );
  let comingElementPosition = $(slides).index(
    $(slides).filter(`.${self.comingClassName}`)
  );
  return {
    primary: primaryElementPosition,
    recent: recentElementPosition,
    coming: comingElementPosition
  };
};

Carousel.prototype.moveForward = function() {
  this.move(true);
};
Carousel.prototype.moveBackward = function() {
  this.move(false);
};

Carousel.prototype.prepareIndex = function(forward, currentStep) {
  const length = this.slides.length;
  const step = forward ? this.options.step : -this.options.step;
  let newStep = currentStep + step;
  newStep = newStep + 1 > length ? newStep + 1 - length : newStep;

  return newStep < 0 ? length - 1 - newStep : newStep;
};

Carousel.prototype.move = function(forward) {
  const newStep = this.prepareIndex(forward, this.currentStep);

  if (this.slides[newStep]) {
    $('.' + this.primaryClassName, this.element).removeClass(
      this.primaryClassName
    );
    $(this.slides[newStep]).addClass(this.primaryClassName);
    this.currentStep = newStep;
  }
};

Carousel.prototype.onNextButtonClick = function() {
  let self = this;
  return function() {
    self.moveForward();
    clearInterval(self.moving);
    self.runAutomaticSlide();
  };
};
Carousel.prototype.onBackButtonClick = function() {
  let self = this;
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
  let self = this;
  let numberOfDots = this.slides.length;

  if (this.options.dots) {
    var container = $(`<div class="carousel__dotsWrapper"></div>`);

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
  let self = this;
  let primaryClassPosition = this.primary;
  let dots = $('.carousel__dotsWrapper', this.element).children();
  return $(dots[primaryClassPosition]).addClass(
    `carousel__dotsWrapper--${self.primaryClassName}`
  );
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

$(function() {
  let test = new Carousel();
  console.log('Current options', test.options);
});
