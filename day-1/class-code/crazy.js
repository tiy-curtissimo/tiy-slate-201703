function printThis() {
  console.log('printThis says this is', this);
  this.message = 'I am a good person';
}

function myNew(fnCtor) {
  var o = {};
  // 3 ways: call/apply, bind
  fnCtor.call(o);
  return o;
}

console.log(typeof printThis);
printThis();
var o = new printThis();
console.log(o);

var otherO = myNew(printThis);
console.log(otherO);



