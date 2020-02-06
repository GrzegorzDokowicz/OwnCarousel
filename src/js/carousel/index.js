import defaultOptions from './_config';
import $ from 'jquery';
import Dots from './dots';
import Button from './buttons';

class Carousel {
  constructor(options) {
    this.options = Object.assign({}, defaultOptions, options);
    this.element = this.options.mainSelector;
    this.slides = $(this.element).children(this.options.slideSelectors);
    this.primaryClassName = 'primary';
    this.recentClassName = 'recent';
    this.comingClassName = 'coming';
    this.currentPrimaryPosition = 0;
    this.moving = false;
    this.dots = null;
    this.nextButton = null;
    this.prevButton = null;

    if (this.validateArguments()) {
      console.log('Current options', this.options);
      this.setIntialClasses();
      this.createButtons();
      this.runAutomaticSlide();
      this.createDots();
    }
  }

  setIntialClasses() {
    $(this.slides[this.currentPrimaryPosition]).addClass(this.primaryClassName);
  }
  setNewClasses() {
    const slides = this.slides;

    $(slides[object.primary]).addClass(this.primaryClassName);
    $(slides[object.coming]).addClass(this.comingClassName);
    $(slides[object.recent]).addClass(this.recentClassName);
  }

  // It have to be refactored (it should check options only once and then create(or not) the buttons)
  createButtons() {
    if (this.options.buttons) {
      if (!this.nextButton) {
        this.nextButton = new Button(
          this.element,
          () => this.onButtonClick(true),
          `btn--next`,
          this.options.nextButtonText
        );
      }
      if (!this.prevButton) {
        this.prevButton = new Button(
          this.element,
          () => this.onButtonClick(false),
          `btn--prev`,
          this.options.backButtonText
        );
      }
    }
  }
  prepareIndex(forward, currentStep) {
    const length = this.slides.length;
    const step = forward ? this.options.step : -this.options.step;

    let newStep = currentStep + step;

    newStep = newStep + 1 > length ? newStep - length : newStep;

    return newStep < 0 ? length + newStep : newStep;
  }

  move(forward) {
    const newStep = this.prepareIndex(forward, this.currentPrimaryPosition);

    if (this.slides[newStep]) {
      $('.' + this.primaryClassName, this.element).removeClass(this.primaryClassName);
      $(this.slides[newStep]).addClass(this.primaryClassName);
      this.currentPrimaryPosition = newStep;
      if (this.dots) {
        this.dots.updatePrimaryDotClass(this.currentPrimaryPosition);
      }
    }
  }

  onButtonClick(state) {
    this.move(state);
    clearInterval(this.moving);
    setTimeout(this.runAutomaticSlide(), 1500);
  }

  runAutomaticSlide() {
    if (this.options.autoslide) {
      this.moving = setInterval(() => this.move(true), 1500);
    }
  }

  createDots() {
    if (this.options.dots && !this.dots) {
      this.dots = new Dots(this.element, this.slides, this.primaryClassName, this.currentPrimaryPosition);
      console.log('Dots created');
    }
  }

  validateArguments() {
    const errors = Object.keys(this.options).filter(key => !defaultOptions.hasOwnProperty(key));
    const flag = errors.length > 0;

    if (flag) {
      console.error('Something was wrong with following arguments', errors);
      console.warn('Current options are:', this.options);
    }

    return !flag;
  }
}

export default Carousel;
