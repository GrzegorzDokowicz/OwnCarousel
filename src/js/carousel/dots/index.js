import $ from 'jquery';

class Dots {
  constructor($el, slides, primaryClassName, callback) {
    this.$element = $el;
    this.slides = slides;
    this.primaryClassName = primaryClassName;
    this.container = $(`<div class="carousel__dotsWrapper"></div>`)

    this.createDots(this.container);
  }

  createDots(container) {
    const numberOfDots = this.slides.length;

    for (let index = 0; index < numberOfDots; index++) {
      container.append(`<div class="carousel__dot"></div>`);
    }

    $(this.$element).append(container);
  }



  removeDotsClasses() {
    return $($('.carousel__dotsWrapper', this.element).children()).removeClass(`carousel__dotsWrapper--${this.primaryClassName}`);
  }
  updatePrimaryDotClass(position) {
    const dots = $('.carousel__dotsWrapper', this.element).children();

    this.removeDotsClasses();
    return $(dots[position]).addClass(`carousel__dotsWrapper--${this.primaryClassName}`);
  }
}

export default Dots;