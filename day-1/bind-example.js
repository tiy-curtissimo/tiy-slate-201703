var booton = new Button();
var renderFn = booton.render;

// bind is a method on a
// function object that
// returns a function with
// "this" bound and
// (optionally) some
// arguments replaced

var boundRenderFn = renderFn.bind(booton);

document.body
        .appendChild(boundRenderFn());

var log = console.log.bind(console);
log('hello, this is broken');
