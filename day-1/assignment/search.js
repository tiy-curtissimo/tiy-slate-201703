class Search {
  constructor(id) {
    this._input = document.createElement('input');
    this._input.placeholder = 'Search';
    this._input.classList.add('search-like');

    this._suggestion = document.createElement('span');
    this._suggestion.classList.add('link-like');

    this._container = document.createElement('div');
    this._container.classList.add('span-like');
    this._container.appendChild(this._input);
    this._container.appendChild(this._suggestion);

    if (id) {
      this._container.id = id;
    }

    this
      ._suggestion
      .addEventListener('click', () => {
        this._input.value = this._suggestion.innerHTML;
        this._suggestion.innerHTML = '';
        this
          ._input
          .dispatchEvent(new Event('change'));
      });

    this
      ._input
      .addEventListener('keypress', () => {
        clearTimeout(this._debounce);
        this._debounce = setTimeout(() => {
          let evt = new Event('autocomplete');
          this._input.dispatchEvent(evt);
        }, 100);
      });
  }

  set completions(values) {
    if (values && values.length) {
      this._suggestion.innerHTML = values[0];
    }
  }

  get value() {
    return this._input.value;
  }

  render() {
    return this._container;
  }

  on(name, callback) {
    this._input
        .addEventListener(name, callback);
  }
}
