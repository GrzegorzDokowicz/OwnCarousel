/**1. zapisz klasy jako stale
 * 2. doczytaj o Object.assign oraz wprowadz object options.
 * 3. dodaj walidacje opcji - dopisane przeze mnie po napisaniu stepów
 */

import defaultOptions from './_config';
import { debounce } from 'lodash';
import $ from 'jquery';

class Carousel {
  constructor(options) {
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
      this.prevButton = this.createButton(`btn--prev`, `${this.options.backButtonText}`);
      this.nextButton = this.createButton(`btn--next`, `${this.options.nextButtonText}`);
    }
  }

  createButton(buttonClassName, ...buttonText) {
    const button = $(`<button class="btn ${buttonClassName}">${buttonText}</button>`);

    $(this.element).prepend(button);

    return button;
  }

  attachButtonsEvents() {
    $(() => {
      $(this.nextButton).on(
        'click',
        _.debounce(() => this.onNextButtonClick(), 500, { leading: true })
      );
      $(this.prevButton).on(
        'click',
        _.debounce(() => this.onBackButtonClick(), 500, { leading: true })
      );
    });
  }

  moveForward() {
    this.move(true);
  }
  moveBackward() {
    this.move(false);
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
    }
  }

  onNextButtonClick() {
    this.moveForward();
    clearInterval(this.moving);
    setTimeout(this.runAutomaticSlide(), 1500);
  }
  onBackButtonClick() {
    this.moveBackward();
    clearInterval(this.moving);
    this.runAutomaticSlide();
  }
  runAutomaticSlide() {
    if (this.options.autoslide) {
      this.moving = setInterval(() => this.moveForward(), 1500);
    }
  }
  createDots() {
    const numberOfDots = this.slides.length;

    if (this.options.dots) {
      const container = $(`<div class="carousel__dotsWrapper"></div>`);

      for (let index = 0; index < numberOfDots; index++) {
        container.append(`<div class="carousel__dot"></div>`);
      }

      $(this.element).append(container);
    }
  }
  removeDotsClasses() {
    return $($('.carousel__dotsWrapper', this.element).children()).removeClass(
      `carousel__dotsWrapper--${this.primaryClassName}`
    );
  }
  updatePrimaryDotClass(object) {
    //do przerobienia
    let primaryClassPosition = this.primary;
    let dots = $('.carousel__dotsWrapper', this.element).children();
    return $(dots[primaryClassPosition]).addClass(`carousel__dotsWrapper--${this.primaryClassName}`);
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
