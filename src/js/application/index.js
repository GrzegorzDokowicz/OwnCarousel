import Carousel from '../carousel';

class Application {
  constructor(initCarousel = true) {
    this.carousel = null;

    if (initCarousel) {
      this.initializeCarousel();
    }
  }

  initializeCarousel() {
    if (!this.carousel) {
      this.carousel = new Carousel();
    }
  }
}

export default Application;
