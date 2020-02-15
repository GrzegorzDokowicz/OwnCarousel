import defaultOptions from './_config';
import $ from 'jquery';
import Dots from './dots';
import Button from './buttons';

/**
 *Main Carousel class. 
 *
 * @class Carousel
 */
class Carousel {
  constructor(options) {
    this.options = Object.assign({}, defaultOptions, options);
    this.element = this.options.mainSelector;
    this.slides = $(this.element).children(this.options.slideSelectors);
    this.primaryClassName = 'carousel__wrapper--primary';
    this.currentPrimaryPosition = 0;
    this.moving = false;
    this.dots = null;
    this.nextButton = null;
    this.prevButton = null;

    if (this.validateArguments()) {
      this.setIntialClass();
      this.createButtons();
      this.createDots();
      this.runAutomaticSlide();
    }
  }


  setIntialClass() {
    $(this.slides[this.currentPrimaryPosition]).addClass(this.primaryClassName);
  }

  createButtons() {
    if (this.options.buttons) {
      if (!this.nextButton) {
        this.nextButton = new Button(this.element, () => this.onButtonClick(true), `btn--next`, this.options.nextButtonText);
      }
      if (!this.prevButton) {
        this.prevButton = new Button(this.element, () => this.onButtonClick(false), `btn--prev`, this.options.backButtonText);
      }
    }
  }

  /**
   * It will prepare Step for move function
   * @param {Boolean} forward 
   * @param {Number} currentStep 
   */
  prepareIndex(forward, currentStep) {
    const length = this.slides.length;
    const step = forward ? this.options.step : -this.options.step;
    let newStep = currentStep + step;

    newStep = newStep + 1 > length ? newStep - length : newStep;

    return newStep < 0 ? length + newStep : newStep;
  }


  /**
   *This function is removing primary class and add primary to new element
   *
   * @param {number} direction
   * @memberof Carousel
   */
  move(direction) {

    if (this.slides[direction]) {
      $('.' + this.primaryClassName, this.element).removeClass(this.primaryClassName);
      $(this.slides[direction]).addClass(this.primaryClassName);
      this.currentPrimaryPosition = direction;
      if (this.dots) {
        this.dots.updatePrimaryDotClass(this.currentPrimaryPosition);
      }
    }
  }


  /**
   *Activate on button click
   *
   * @param {Boolean} state - True for moving forward, false for moving backward
   * @memberof Carousel
   */
  onButtonClick(state) {
    this.move(this.prepareIndex(state, this.currentPrimaryPosition));
    clearInterval(this.moving);
    setTimeout(this.runAutomaticSlide(), 1500);
  }


  runAutomaticSlide() {
    if (this.options.autoslide) {
      this.moving = setInterval(() => this.move(this.prepareIndex(true, this.currentPrimaryPosition)), this.options.slideInterval);
    }
  }

  createDots() {
    if (this.options.dots && !this.dots) {
      this.dots = new Dots(this.element, this.slides, index => {
        this.onDotClick(index);
      });
      this.dots.updatePrimaryDotClass(0) // It sets up 1st dot as primary at the beginning
    }
  }


  /**
   *Activate on dotClick
   *
   * @param {number} index
   * @returns callback for dotClick 
   * @memberof Carousel
   */
  onDotClick(index) {
    clearInterval(this.moving);
    setTimeout(this.runAutomaticSlide(), 1500);
    return this.move(index);
  }


  /**
   * checks if slides number is greater than current step
   * @returns Boolean 
   * @memberof Carousel
   */
  checkStep() {
    const flag = this.slides.length > this.options.step
    if (!flag) {
      console.error("Your step is greater than your slides number")
    }
    return flag
  }


  /**
   * Checks if passed options parameters are valid
   *
   * @returns Boolean
   * @memberof Carousel
   */
  validateOptionsName() {
    //Check if passed config object properties are valid
    const errors = Object.keys(this.options).filter(key => !defaultOptions.hasOwnProperty(key));
    const flag = errors.length > 0

    if (flag) {
      console.error('Something was wrong with following arguments', errors);
      console.warn('Current options are:', this.options);
    }

    return !flag;
  }

  validateArguments() {
    const flag = this.checkStep() && this.validateOptionsName()
    return flag
  }
}



export default Carousel;