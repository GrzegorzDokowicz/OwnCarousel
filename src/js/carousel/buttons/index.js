import $ from 'jquery';
import {
  debounce
} from 'lodash';

class Button {
  constructor(element, callback, buttonClassName, ...buttonText) {
    this.button = null;
    this.element = element;
    this.callback = callback;
    this.buttonClass = buttonClassName;
    this.buttonText = buttonText;

    this.createButton();
    this.attachButtonEvent();
  }

  createButton() {
    const button = $(`<button class="btn ${this.buttonClass}">${this.buttonText}</button>`);

    $(this.element).prepend(button);

    return (this.button = button);
  }



  attachButtonEvent() {
    $(() => {
      $(this.button).on('click',
        debounce(() => this.callback(), 500, {
          leading: true
        })
      );
    });
  }
}

export default Button;