import $ from 'jquery';

class Dots {
  constructor($el, slides, primaryClassName) {
    this.$element = $el;
    this.slides = slides;
    this.primaryClassName = primaryClassName;
    this.container = $(`<div class="carousel__dotsWrapper"></div>`)
    this.dotsArray = null

    this.createDots(this.container);
    this.getDotsArray()
  }

  createDots(container) {
    const numberOfDots = this.slides.length;

    for (let index = 0; index < numberOfDots; index++) {
      container.append(`<div class="carousel__dot"></div>`);
    }

    $(this.$element).append(container);
  }

  getDotsArray() {
    return this.dotsArray = $('.carousel__dotsWrapper', this.element).children()
  }

  removeDotsClasses(className) {
    return this.dotsArray.removeClass(className);
  }
  updatePrimaryDotClass(position) {
    const dots = this.dotsArray
    const primaryDotClassName = `carousel__dot--${this.primaryClassName}`

    this.removeDotsClasses(primaryDotClassName);
    return $(dots[position]).addClass(primaryDotClassName);
  }
}

export default Dots;