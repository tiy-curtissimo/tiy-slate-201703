/**
 * try to resolve a function.
 * resolve if it returns a resolved promise or value
 * reject if it returns a rejected promise or throws an error
 * @param {function} fn
 * @param {array} args
 * @returns {Promise}
 */
function tryFn(fn, args) {
  try {
    return Promise.resolve(fn.apply(null, args));
  } catch (e) {
    return Promise.reject(e);
  }
}

export default function (list, ...args) {
  if (!list || !Array.isArray(list)) {
    return Promise.reject(new Error('List must be an array'));
  }

  if (list.length === 0) {
    return Promise.reject(new Error('List must not be empty'));
  }

  if (list.filter((fn) => typeof fn !== 'function').length > 0) {
    return Promise.reject(new Error('List items must be functions'));
  }

  try {
    return list.slice(1).reduce(function (previous, fn) {
      return previous.catch(() => tryFn(fn, args));
    }, tryFn(list[0], args))
      .catch(() => Promise.reject(new Error('No items resolved')));
  } catch (e) {
    return Promise.reject(e);
  }
}
