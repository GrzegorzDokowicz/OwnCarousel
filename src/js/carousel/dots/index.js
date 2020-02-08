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

  removeDotsClasses() {
    return this.dotsArray.removeClass(`carousel__dotsWrapper--${this.primaryClassName}`);
  }
  updatePrimaryDotClass(position) {
    const dots = this.dotsArray

    this.removeDotsClasses();
    return $(dots[position]).addClass(`carousel__dotsWrapper--${this.primaryClassName}`);
  }
}

export default Dots;