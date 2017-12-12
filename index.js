"use strict";

const instanceFunction = (name) =>
  (item, ...args) => item[name](...args)
;

module.exports = function pipe(item, defs) {
  return defs
  .map(def => Array.isArray(def) ? def : [ def ])
  .map(([ func, ...args ]) => {
    if (typeof(func) === "string") {
      return { func: instanceFunction(func), args };
    } else {
      return { func, args };
    }
  })
  .reduce(
    (acc, { func, args }) => func(...[acc, ...args]),
    item
  );
};
