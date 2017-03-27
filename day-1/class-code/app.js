class Button {
  constructor() {
    this._button = document
      .createElement('button');
  }

  get text() {
    return this._button
               .innerHTML;
  }

  set text(value) {
    this._button
        .innerHTML = value;
  }

  render() {
    return this._button;
  }

  on(name, callback) {
    this._button
        .addEventListener(name, function () {
          // inside this function,
          // "this" refers to the
          // <BUTTON> element.

          // Print a message
          console.log('You pressed the button.');
          // Call the callback with "this"
          // bound appropriately
          callback.call(this);
        });
  }
}

var button = new Button();
button.text = 'Hi, Curtis';
document.body
        .appendChild(button.render());
button.on('click', function() {
  this.style.color = 'white';
});

new Ajax('http://ip.jsontest.com')
  .then(x => console.log(x))
  .then(u => console.log('undefined?', u))
  .catch(e => {
    // Multi-line arrow function has
    // curly braces and needs a return
    // statement to return a value.
    console.error(e);
    return 'I give up.';
  })
  .catch(x => alert(x))
  .get();
