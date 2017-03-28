function hoist() {
  var msg;
  console.log(msg);
  msg = 'Hello, Curtis';
}

function goodLet() {
  let msg = 'Hello, Curtis';
  console.log(msg);
  msg = 'Good-bye, Curtis';
  console.log(msg);
}

goodLet();

function badConst() {
  const msg = 'Hello, Curtis';
  console.log(msg);
  msg = 'Good-bye, Curtis';
  console.log(msg);
}

// badConst();

function goodConstReassignInnerValue() {
  const o = {
    msg: 'Hello, Kate'
  };
  console.log(o);
  o.msg = 'Good-bye, Kate';
  console.log(o);
}
goodConstReassignInnerValue();

function notHoisted() {
  console.log(msg);
  let msg = 'Hello, Curtis';
}

function scoped() {
  if (true) {
    let msg = 'Hello, Curtis';
  }
  console.log(msg);
}

function forLoops() {
  for (let i = 0; i < 5; i += 1) {
    for (let j = i; j < 5; j += 1) {

    }
    // j is not defined
  }
  // i and j are not defined
}

hoist();
// notHoisted();
// scoped();