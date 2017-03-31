console.log('\033[2J\033[;H');

// Promise.resolve(arg) --> Creates a Promise
// that immediately calls good(arg);

function diet(msg, sleepyTime = 1000) {
  return new Promise((good, bad) => {
    // Synchronous work still blocks
    setTimeout(() => {
      if (sleepyTime > 1000) {
        return bad(`YOU TOOK TOO LONG WITH ${sleepyTime}ms!!!!!!!!!\n${msg}`);
      }

      good(msg)
    }, sleepyTime);
  });
}

let asyncDiet = async (msg) => diet(msg);

async function asyncDiets(msg, timeout) {
  return Promise.all([
    diet(msg, timeout),
    diet(msg, timeout + 100),
    diet('docker problems', Math.random() * 2000)
  ]);
};

async function punchlineLearnAsync() {
  try {
    let value = await asyncDiets('Hello, food!');
    console.log('value:', value);
  } catch (e) {
    console.error('ERROR AGAIN!', e);
  }
}

punchlineLearnAsync();

function goOnADiet() {
  console.log('(Am I ready for this diet?)');
  diet('Paleo is good')
    .then(msg => {
      console.log('Then1:', msg);
      return diet('Atkins more suits my taste.');
    })
    .then(msg => {
      console.log('Then2:', msg);
      return Promise.all([
        diet('But, I like corn!', 200),
        diet('And dark chocolate covered cashews!', 1001),
        diet('But, I like potatoes.', 4000),
        diet('But, I like potatoes.', 2000),
      ]);
    })
    .then(msgs => console.log('Then3:', msgs))
    .catch(err => console.error(err));
  console.log('(It was my New Years resolution...)');
}

// goOnADiet();

function runPromise() {
  Promise.resolve(new Error('ON NO!'))
    .then(msg => { throw new Error('Inside then'); })
    .then(msg => `${msg} Don't you, too?`)
    .then(msg => console.log(msg))
    .catch(e => console.error('ERROR!!!!', e));
}

// runPromise();
