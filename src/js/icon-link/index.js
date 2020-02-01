import $ from 'jquery';

class IconLink {
  constructor($el, callback) {
    if ($el) {
      this.$el = $el;
      this.callback = callback;
      this.object = null;

      this.render();
      this.attachEvents();
    }
  }

  attachEvents() {
    this.object.on('click', $event => {
      if (this.callback) {
        this.callback(this.$el);
      }
    });
  }

  render() {
    const object = $('<div>Icon</div>');
    this.object = object;
    this.$el.html(object);
  }
}

export default IconLink;
