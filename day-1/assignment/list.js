class List {
  constructor(id) {
    this._list = document.createElement('ul');
    if (id) {
      this._list.id = id;
    }
  }

  render() {
    return this._list;
  }

  on(name, fn) {
    this._list
        .addEventListener(name, fn, false);
  }

  renderData(arr = []) {
    this._list.innerHTML = '';
    let lis = [];
    for (let a of arr) {
      let evt = new CustomEvent('itemRendering', {
        detail: {
          data: a,
          html: null
        },
        cancelable: true
      });
      if (this._list.dispatchEvent(evt) && evt.detail.html) {
        let li = document.createElement('li');
        li.classList.add((this._list.id || 'list') + '-entry');
        li.innerHTML = evt.detail.html;
        lis.push(li);
      }
    }
    for (var li of lis) {
      this._list.appendChild(li);
    }
  }
}
