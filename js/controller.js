/**1. zapisz klasy jako stale
 * 2. doczytaj o Object.assign oraz wprowadz object options.
 * 3. dodaj walidacje opcji - dopisane przeze mnie po napisaniu stepów
 */

function Carousel(options) {
  this.options = Object.assign({}, defaultOptions, options);
  this.element = this.options.selector;
  this.primaryClassName = 'primary';
  this.recentClassName = 'recent';
  this.comingClassName = 'coming';
  this.slides = $(this.element).children('.carousel__wrapper');
  this.moving = false;
  let readyToRun = this.validateArguments();
  if (readyToRun) {
    this.createButtons(`btn--next`, `Next`);
    this.createButtons(`btn--prev`, `Back`);
    this.setIntialClasses();
    this.attachButtonsEvents();
    this.autoSlide();
  }
}

Carousel.prototype.setIntialClasses = function() {
  let slides = this.slides;
  let lastElementKey = this.slides.length - 1;
  $(slides[0]).addClass(this.primaryClassName);
  $(slides[1]).addClass(this.comingClassName);
  $(slides[lastElementKey]).addClass(this.recentClassName);
};
Carousel.prototype.setNewClasses = function(object) {
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
    return $(this.element).append(
      `<button class="btn ${buttonClassName}">${buttonText}</button>`
    );
  }
};

Carousel.prototype.attachButtonsEvents = function() {
  let self = this;
  let nextButton = $(this.element).children('.btn--next');
  let prevButton = $(this.element).children('.btn--prev');
  $(nextButton).on('click', debounce(this.onNextButtonClick(), 500, true));
  $(prevButton).on('click', debounce(this.onBackButtonClick(), 500, true));
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
  let self = this;
  let lastArrayElementKey = this.slides.length - 1;
  let classesBeginingPositions = self.getClassesPositions();
  let classesEndingPositions = Object.assign({}, classesBeginingPositions);
  let classesEndingPositionsKeys = Object.keys(
    classesBeginingPositions
  ).forEach(function(key) {
    if (
      classesBeginingPositions[key] + self.options.step >
      lastArrayElementKey
    ) {
      return (classesEndingPositions[key] =
        classesBeginingPositions[key] + self.options.step - self.slides.length);
    } else return (classesEndingPositions[key] += self.options.step);
  });

  return classesEndingPositions;
};
Carousel.prototype.moveBackward = function() {
  let self = this;
  let lastArrayElementKey = this.slides.length - 1;
  let classesBeginingPositions = self.getClassesPositions();
  let classesEndingPositions = Object.assign({}, classesBeginingPositions);
  let classesEndingPositionsKeys = Object.keys(
    classesBeginingPositions
  ).forEach(function(key) {
    if (classesBeginingPositions[key] - self.options.step < 0) {
      return (classesEndingPositions[key] =
        classesBeginingPositions[key] - self.options.step + self.slides.length);
    } else return (classesEndingPositions[key] -= self.options.step);
  });

  return classesEndingPositions;
};

Carousel.prototype.onNextButtonClick = function() {
  let self = this;
  return function() {
    self.moving = true;
    let newClasses = self.moveForward();
    self.removeAllClasses();
    self.setNewClasses(newClasses);
    self.moving = false;
  };
};
Carousel.prototype.onBackButtonClick = function() {
  let self = this;
  return function() {
    self.moving = true;
    let newClasses = self.moveBackward();
    self.removeAllClasses();
    self.setNewClasses(newClasses);
    self.moving = false;
  };
};
Carousel.prototype.autoSlide = function() {
  if (this.options.autoslide) {
    if (!this.moving) {
      setInterval(this.onNextButtonClick(), 3000);
    }
  }
};
Carousel.prototype.validateArguments = function() {
  let optionsKeys = Object.keys(this.options);
  let errors = [];
  let flag = true;
  optionsKeys.filter(function(key) {
    if (!defaultOptions.hasOwnProperty(key)) {
      errors.push(key);
    }
  });
  if (errors.length > 0) {
    console.error('Something was wrong with following arguments', errors);
    flag = false;
  }
  return flag;
};

$(function() {
  let test = new Carousel();
  console.log('Current options', test.options);
});
