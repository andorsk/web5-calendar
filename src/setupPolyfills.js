/* eslint-disable no-restricted-globals */
/* eslint-disable no-undef */

// Polyfill for globalThis
if (typeof globalThis === "undefined") {
  (function () {
    if (typeof self !== "undefined") {
      self.globalThis = self;
    } else if (typeof window !== "undefined") {
      window.globalThis = window;
    } else if (typeof global !== "undefined") {
      global.globalThis = global;
    } else {
      throw new Error("Unable to locate global object");
    }
  })();
}

// Polyfill for globalThis.crypto
if (!globalThis.crypto) {
  // Webpack will provide crypto-browserify
  globalThis.crypto = require("crypto");
}

/* eslint-enable no-restricted-globals */
/* eslint-enable no-undef */
