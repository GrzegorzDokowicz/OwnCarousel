import $ from 'jquery';

class Dots {
  constructor($el, slides, clickOnDots) {
    this.$element = $el;
    this.slides = slides;
    this.container = $(`<div class="carousel__dotsWrapper"></div>`)
    this.dotsArray = null

    this.createDots(this.container);
    this.getDotsArray();

    $('.carousel__dot', $el).on('click', $event => {
      if (clickOnDots) {
        this.dotsElements.find(element => {
          if ($event.currentTarget === element.object[0]) {
            clickOnDots(element.index);
          }
        })
      }
    });
  }

  createDots(container) {
    const numberOfDots = this.slides.length;
    this.dotsElements = [];

    for (let index = 0; index < numberOfDots; index++) {
      const object = $(`<div class="carousel__dot"></div>`);

      this.dotsElements.push({
        object,
        index
      })

      container.append(object);
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
    const primaryDotClassName = `carousel__dot--primary`

    this.removeDotsClasses(primaryDotClassName);
    return $(dots[position]).addClass(primaryDotClassName);
  }
}

export default Dots;