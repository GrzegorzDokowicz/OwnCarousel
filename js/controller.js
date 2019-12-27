/**1. zapisz klasy jako stale
 * 2. doczytaj o Object.assign oraz wprowadz object options.
 */

function Carousel($element) {
  this.element = $element;
  this.primaryClassName = 'primary';
  this.recentClassName = 'recent';
  this.comingClassName = 'coming';
  this.slides = $(this.element).children('.carousel__wrapper');
  this.setIntialClasses();
  this.attachButtonsEvents();
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

Carousel.prototype.attachButtonsEvents = function() {
  let nextButton = $(this.element).children('.btn--next');
  let prevButton = $(this.element).children('.btn--prev');
  $(nextButton).on('click', this.onNextButtonClick());
  $(prevButton).on('click', this.onBackButtonClick());
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
    if (classesBeginingPositions[key] === lastArrayElementKey) {
      return (classesEndingPositions[key] = 0);
    } else return classesEndingPositions[key]++;
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
    if (classesBeginingPositions[key] === 0) {
      return (classesEndingPositions[key] = lastArrayElementKey);
    } else return classesEndingPositions[key]--;
  });

  return classesEndingPositions;
};

Carousel.prototype.onNextButtonClick = function() {
  let self = this;
  return function() {
    let newClasses = self.moveForward();
    self.removeAllClasses();
    self.setNewClasses(newClasses);
  };
};
Carousel.prototype.onBackButtonClick = function() {
  let self = this;
  return function() {
    let newClasses = self.moveBackward();
    self.removeAllClasses();
    self.setNewClasses(newClasses);
  };
};

$(function() {
  let test = new Carousel('.carousel');
});
