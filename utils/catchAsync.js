/**
 * Async RequestHandler wrapper. Catch error and pass it in the next() middleware function.
 * @param {Function} fn
 * @returns
 */
module.exports = function (fn) {
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  };
};
