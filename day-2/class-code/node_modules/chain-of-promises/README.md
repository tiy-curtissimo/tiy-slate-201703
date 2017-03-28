# chain-of-promises
Run through a list of functions sequentially, returning the first one that resolves

The [Chain of Responsibility](https://sourcemaking.com/design_patterns/chain_of_responsibility) pattern is very useful when passing something into a list of "processing elements," but it isn't the most intuitive when using promises to do api calls. This library introduces a similar pattern I'm calling "reject quickly/resolve slowly," in which each "processing element" should reject if it doesn't match and resolve if it does.

# Install

```
npm install --save chain-of-promises
```

# Usage

Call the chain with an array of functions (which should return promises or values) as well as any extra arguments you want to pass to those functions. The chain will resolve to the result of the first resolved function. If all of the functions reject or throw errors, the chain will reject with those errors.

A good use case for this is generating urls using various rules for different bits of data.

```js
import chain from 'chain-of-promises';

function publish(data) {
  return chain([
    (data, currentUrl, defaultUrl) => publishByCurrentUrl(data, currentUrl),
    publishByDataAttribute, // `data` argument will be passed into this function
    (data, currentUrl, defaultUrl) => publishByDefaultUrl(data, defaultUrl)
  ], data, currentUrl, defaultUrl);
}
```

# Contribution

Create a pull request with a failing unit test, and I'll gladly help fix it.
