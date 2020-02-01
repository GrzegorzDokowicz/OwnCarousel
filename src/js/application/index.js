import Carousel from '../carousel';
import IconLink from '../icon-link';
import $ from 'jquery';

class Application {
  constructor(initCarousel = true) {
    this.carousel = null;

    if (initCarousel) {
      this.initializeCarousel();
    }

    new IconLink($('.icon'), function(value) {
      console.log('From icon link callback', value);
    });
  }

  initializeCarousel() {
    if (!this.carousel) {
      this.carousel = new Carousel({});
      console.log('Initialized carousel');
    }
  }
}

export default Application;
