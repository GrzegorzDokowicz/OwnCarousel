import Carousel from '../carousel';

/**
 *It's checks if carousel was initialize. If not, it will initialize one.
 *
 * @class Application
 */
class Application {
  constructor(initCarousel = true) {
    this.carousel = null;

    if (initCarousel) {
      this.initializeCarousel();
    }
  }

  initializeCarousel() {
    if (!this.carousel) {
      //If you pass object as a new Carousel parameter, you will modify your slider.
      this.carousel = new Carousel({});
    }
  }
}

export default Application;
