/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/_config.js":
/*!***************************!*\
  !*** ./src/js/_config.js ***!
  \***************************/
/*! exports provided: defaultOptions */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "defaultOptions", function() { return defaultOptions; });
const defaultOptions = {
  step: 1,
  mainSelector: '.carousel',
  slideSelectors: '.carousel__wrapper',
  autoslide: true,
  buttons: true,
  nextButtonText: `Next`,
  backButtonText: `Back`,
  dots: true
};


/***/ }),

/***/ "./src/js/controller.js":
/*!******************************!*\
  !*** ./src/js/controller.js ***!
  \******************************/
/*! exports provided: Carousel */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Carousel", function() { return Carousel; });
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_config */ "./src/js/_config.js");
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./helpers */ "./src/js/helpers.js");
/**1. zapisz klasy jako stale
 * 2. doczytaj o Object.assign oraz wprowadz object options.
 * 3. dodaj walidacje opcji - dopisane przeze mnie po napisaniu stepów
 */



function Carousel(options) {
  this.options = Object.assign({}, _config__WEBPACK_IMPORTED_MODULE_0__["defaultOptions"], options);
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

Carousel.prototype.setIntialClasses = function() {
  $(this.slides[this.currentPrimaryPosition]).addClass(this.primaryClassName);
};
Carousel.prototype.setNewClasses = function() {
  const slides = this.slides;

  $(slides[object.primary]).addClass(this.primaryClassName);
  $(slides[object.coming]).addClass(this.comingClassName);
  $(slides[object.recent]).addClass(this.recentClassName);
};

// It have to be refactored (it should check options only once and then create(or not) the buttons)
Carousel.prototype.createButtons = function() {
  if (this.options.buttons) {
    this.prevButton = this.createButton(`btn--prev`, `${this.options.backButtonText}`);
    this.nextButton = this.createButton(`btn--next`, `${this.options.nextButtonText}`);
  }
};

Carousel.prototype.createButton = function(buttonClassName, ...buttonText) {
  const button = $(`<button class="btn ${buttonClassName}">${buttonText}</button>`);

  $(this.element).prepend(button);

  return button;
};

Carousel.prototype.attachButtonsEvents = function() {
  const self = this;
  $(function() {
    $(self.nextButton).on('click', Object(_helpers__WEBPACK_IMPORTED_MODULE_1__["debounce"])(self.onNextButtonClick(), 500, true));
    $(self.prevButton).on('click', Object(_helpers__WEBPACK_IMPORTED_MODULE_1__["debounce"])(self.onBackButtonClick(), 500, true));
  });
};

Carousel.prototype.moveForward = function() {
  this.move(true);
};
Carousel.prototype.moveBackward = function() {
  const self = this;

  return function() {
    self.move(false);
  };
};

Carousel.prototype.prepareIndex = function(forward, currentStep) {
  const length = this.slides.length;
  const step = forward ? this.options.step : -this.options.step;

  let newStep = currentStep + step;

  newStep = newStep + 1 > length ? newStep - length : newStep;

  return newStep < 0 ? length + newStep : newStep;
};

Carousel.prototype.move = function(forward) {
  const newStep = this.prepareIndex(forward, this.currentPrimaryPosition);

  if (this.slides[newStep]) {
    $('.' + this.primaryClassName, this.element).removeClass(this.primaryClassName);
    $(this.slides[newStep]).addClass(this.primaryClassName);
    this.currentPrimaryPosition = newStep;
  }
};

Carousel.prototype.onNextButtonClick = function() {
  const self = this;

  return function() {
    self.moveForward();
    clearInterval(self.moving);
    setTimeout(self.runAutomaticSlide(), 1500);
  };
};
Carousel.prototype.onBackButtonClick = function() {
  const self = this;

  return function() {
    self.moveBackward();
    clearInterval(self.moving);
    self.runAutomaticSlide();
  };
};
Carousel.prototype.runAutomaticSlide = function() {
  const self = this;

  if (this.options.autoslide) {
    this.moving = setInterval(function() {
      self.moveForward();
    }, 3000);
  }
};
Carousel.prototype.createDots = function() {
  const self = this;
  const numberOfDots = this.slides.length;

  if (this.options.dots) {
    const container = $(`<div class="carousel__dotsWrapper"></div>`);

    for (index = 0; index < numberOfDots; index++) {
      container.append(`<div class="carousel__dot"></div>`);
    }

    $(self.element).append(container);
  }
};
Carousel.prototype.removeDotsClasses = function() {
  return $($('.carousel__dotsWrapper', this.element).children()).removeClass(
    `carousel__dotsWrapper--${this.primaryClassName}`
  );
};
Carousel.prototype.updatePrimaryDotClass = function(object) {
  //do przerobienia
  let self = this;
  let primaryClassPosition = this.primary;
  let dots = $('.carousel__dotsWrapper', this.element).children();
  return $(dots[primaryClassPosition]).addClass(`carousel__dotsWrapper--${self.primaryClassName}`);
};

Carousel.prototype.validateArguments = function() {
  const errors = Object.keys(this.options).filter(function(key) {
    return !_config__WEBPACK_IMPORTED_MODULE_0__["defaultOptions"].hasOwnProperty(key);
  });
  const flag = errors.length > 0;

  if (flag) {
    console.error('Something was wrong with following arguments', errors);
    console.warn('Current options are:', this.options);
  }

  return !flag;
};


/***/ }),

/***/ "./src/js/helpers.js":
/*!***************************!*\
  !*** ./src/js/helpers.js ***!
  \***************************/
/*! exports provided: debounce */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "debounce", function() { return debounce; });
function debounce(func, wait, immediate) {
  var timeout;
  return function() {
    var context = this,
      args = arguments;
    var later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}
function throttle(callback, delay) {
  let canCall = true;
  return function(...args) {
    if (canCall) {
      callback.apply(null, args);
      canCall = false;
      setTimeout(function() {
        canCall = false;
      }, delay);
    }
  };
}


/***/ }),

/***/ "./src/js/index.js":
/*!*************************!*\
  !*** ./src/js/index.js ***!
  \*************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _controller__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./controller */ "./src/js/controller.js");


$(function() {
  let test = new _controller__WEBPACK_IMPORTED_MODULE_0__["Carousel"]({});
  console.log('Current options', test.options);
});


/***/ })

/******/ });