import $ from 'jquery';

class Dots {
  constructor($el, slides, clickOnDots) {
    this.$element = $el;
    this.slides = slides;
    this.containerClassName = `carousel__dotsWrapper`
    this.container = $(`<div class="${this.containerClassName}"></div>`)
    this.singleDotClassName = 'carousel__dot'
    this.dotsArray = null

    this.createDots(this.container);
    this.getDotsArray();
    this.onDotClick(clickOnDots)

  }

  createDots(container) {
    const numberOfDots = this.slides.length;
    this.dotsElements = [];

    for (let index = 0; index < numberOfDots; index++) {
      const object = $(`<div class="${this.singleDotClassName}"></div>`);

      this.dotsElements.push({
        object,
        index
      })

      container.append(object);
    }
    $(this.$element).append(container);
  }

  getDotsArray() {
    return this.dotsArray = $(`.${this.containerClassName}`, this.element).children()
  }

  removeDotsClasses(className) {
    return this.dotsArray.removeClass(className);
  }
  updatePrimaryDotClass(position) {
    const dots = this.dotsArray
    const primaryDotClassName = `${this.singleDotClassName}--primary`

    this.removeDotsClasses(primaryDotClassName);
    return $(dots[position]).addClass(primaryDotClassName);
  }
  onDotClick(callback) {
    $(`.${this.singleDotClassName}`, this.$element).on('click', $event => {
      if (callback) {
        this.dotsElements.find(element => {
          if ($event.currentTarget === element.object[0]) {
            callback(element.index);
          }
        })
      }
    });
  }

}

export default Dots;