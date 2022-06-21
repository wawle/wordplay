// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"node_modules/axios/lib/helpers/bind.js":[function(require,module,exports) {
'use strict';

module.exports = function bind(fn, thisArg) {
  return function wrap() {
    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }
    return fn.apply(thisArg, args);
  };
};

},{}],"node_modules/axios/lib/utils.js":[function(require,module,exports) {
'use strict';

var bind = require('./helpers/bind');

// utils is a library of generic helper functions non-specific to axios

var toString = Object.prototype.toString;

// eslint-disable-next-line func-names
var kindOf = (function(cache) {
  // eslint-disable-next-line func-names
  return function(thing) {
    var str = toString.call(thing);
    return cache[str] || (cache[str] = str.slice(8, -1).toLowerCase());
  };
})(Object.create(null));

function kindOfTest(type) {
  type = type.toLowerCase();
  return function isKindOf(thing) {
    return kindOf(thing) === type;
  };
}

/**
 * Determine if a value is an Array
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Array, otherwise false
 */
function isArray(val) {
  return Array.isArray(val);
}

/**
 * Determine if a value is undefined
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if the value is undefined, otherwise false
 */
function isUndefined(val) {
  return typeof val === 'undefined';
}

/**
 * Determine if a value is a Buffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Buffer, otherwise false
 */
function isBuffer(val) {
  return val !== null && !isUndefined(val) && val.constructor !== null && !isUndefined(val.constructor)
    && typeof val.constructor.isBuffer === 'function' && val.constructor.isBuffer(val);
}

/**
 * Determine if a value is an ArrayBuffer
 *
 * @function
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an ArrayBuffer, otherwise false
 */
var isArrayBuffer = kindOfTest('ArrayBuffer');


/**
 * Determine if a value is a view on an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
 */
function isArrayBufferView(val) {
  var result;
  if ((typeof ArrayBuffer !== 'undefined') && (ArrayBuffer.isView)) {
    result = ArrayBuffer.isView(val);
  } else {
    result = (val) && (val.buffer) && (isArrayBuffer(val.buffer));
  }
  return result;
}

/**
 * Determine if a value is a String
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a String, otherwise false
 */
function isString(val) {
  return typeof val === 'string';
}

/**
 * Determine if a value is a Number
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Number, otherwise false
 */
function isNumber(val) {
  return typeof val === 'number';
}

/**
 * Determine if a value is an Object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Object, otherwise false
 */
function isObject(val) {
  return val !== null && typeof val === 'object';
}

/**
 * Determine if a value is a plain Object
 *
 * @param {Object} val The value to test
 * @return {boolean} True if value is a plain Object, otherwise false
 */
function isPlainObject(val) {
  if (kindOf(val) !== 'object') {
    return false;
  }

  var prototype = Object.getPrototypeOf(val);
  return prototype === null || prototype === Object.prototype;
}

/**
 * Determine if a value is a Date
 *
 * @function
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Date, otherwise false
 */
var isDate = kindOfTest('Date');

/**
 * Determine if a value is a File
 *
 * @function
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a File, otherwise false
 */
var isFile = kindOfTest('File');

/**
 * Determine if a value is a Blob
 *
 * @function
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Blob, otherwise false
 */
var isBlob = kindOfTest('Blob');

/**
 * Determine if a value is a FileList
 *
 * @function
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a File, otherwise false
 */
var isFileList = kindOfTest('FileList');

/**
 * Determine if a value is a Function
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Function, otherwise false
 */
function isFunction(val) {
  return toString.call(val) === '[object Function]';
}

/**
 * Determine if a value is a Stream
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Stream, otherwise false
 */
function isStream(val) {
  return isObject(val) && isFunction(val.pipe);
}

/**
 * Determine if a value is a FormData
 *
 * @param {Object} thing The value to test
 * @returns {boolean} True if value is an FormData, otherwise false
 */
function isFormData(thing) {
  var pattern = '[object FormData]';
  return thing && (
    (typeof FormData === 'function' && thing instanceof FormData) ||
    toString.call(thing) === pattern ||
    (isFunction(thing.toString) && thing.toString() === pattern)
  );
}

/**
 * Determine if a value is a URLSearchParams object
 * @function
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a URLSearchParams object, otherwise false
 */
var isURLSearchParams = kindOfTest('URLSearchParams');

/**
 * Trim excess whitespace off the beginning and end of a string
 *
 * @param {String} str The String to trim
 * @returns {String} The String freed of excess whitespace
 */
function trim(str) {
  return str.trim ? str.trim() : str.replace(/^\s+|\s+$/g, '');
}

/**
 * Determine if we're running in a standard browser environment
 *
 * This allows axios to run in a web worker, and react-native.
 * Both environments support XMLHttpRequest, but not fully standard globals.
 *
 * web workers:
 *  typeof window -> undefined
 *  typeof document -> undefined
 *
 * react-native:
 *  navigator.product -> 'ReactNative'
 * nativescript
 *  navigator.product -> 'NativeScript' or 'NS'
 */
function isStandardBrowserEnv() {
  if (typeof navigator !== 'undefined' && (navigator.product === 'ReactNative' ||
                                           navigator.product === 'NativeScript' ||
                                           navigator.product === 'NS')) {
    return false;
  }
  return (
    typeof window !== 'undefined' &&
    typeof document !== 'undefined'
  );
}

/**
 * Iterate over an Array or an Object invoking a function for each item.
 *
 * If `obj` is an Array callback will be called passing
 * the value, index, and complete array for each item.
 *
 * If 'obj' is an Object callback will be called passing
 * the value, key, and complete object for each property.
 *
 * @param {Object|Array} obj The object to iterate
 * @param {Function} fn The callback to invoke for each item
 */
function forEach(obj, fn) {
  // Don't bother if no value provided
  if (obj === null || typeof obj === 'undefined') {
    return;
  }

  // Force an array if not already something iterable
  if (typeof obj !== 'object') {
    /*eslint no-param-reassign:0*/
    obj = [obj];
  }

  if (isArray(obj)) {
    // Iterate over array values
    for (var i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    // Iterate over object keys
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        fn.call(null, obj[key], key, obj);
      }
    }
  }
}

/**
 * Accepts varargs expecting each argument to be an object, then
 * immutably merges the properties of each object and returns result.
 *
 * When multiple objects contain the same key the later object in
 * the arguments list will take precedence.
 *
 * Example:
 *
 * ```js
 * var result = merge({foo: 123}, {foo: 456});
 * console.log(result.foo); // outputs 456
 * ```
 *
 * @param {Object} obj1 Object to merge
 * @returns {Object} Result of all merge properties
 */
function merge(/* obj1, obj2, obj3, ... */) {
  var result = {};
  function assignValue(val, key) {
    if (isPlainObject(result[key]) && isPlainObject(val)) {
      result[key] = merge(result[key], val);
    } else if (isPlainObject(val)) {
      result[key] = merge({}, val);
    } else if (isArray(val)) {
      result[key] = val.slice();
    } else {
      result[key] = val;
    }
  }

  for (var i = 0, l = arguments.length; i < l; i++) {
    forEach(arguments[i], assignValue);
  }
  return result;
}

/**
 * Extends object a by mutably adding to it the properties of object b.
 *
 * @param {Object} a The object to be extended
 * @param {Object} b The object to copy properties from
 * @param {Object} thisArg The object to bind function to
 * @return {Object} The resulting value of object a
 */
function extend(a, b, thisArg) {
  forEach(b, function assignValue(val, key) {
    if (thisArg && typeof val === 'function') {
      a[key] = bind(val, thisArg);
    } else {
      a[key] = val;
    }
  });
  return a;
}

/**
 * Remove byte order marker. This catches EF BB BF (the UTF-8 BOM)
 *
 * @param {string} content with BOM
 * @return {string} content value without BOM
 */
function stripBOM(content) {
  if (content.charCodeAt(0) === 0xFEFF) {
    content = content.slice(1);
  }
  return content;
}

/**
 * Inherit the prototype methods from one constructor into another
 * @param {function} constructor
 * @param {function} superConstructor
 * @param {object} [props]
 * @param {object} [descriptors]
 */

function inherits(constructor, superConstructor, props, descriptors) {
  constructor.prototype = Object.create(superConstructor.prototype, descriptors);
  constructor.prototype.constructor = constructor;
  props && Object.assign(constructor.prototype, props);
}

/**
 * Resolve object with deep prototype chain to a flat object
 * @param {Object} sourceObj source object
 * @param {Object} [destObj]
 * @param {Function} [filter]
 * @returns {Object}
 */

function toFlatObject(sourceObj, destObj, filter) {
  var props;
  var i;
  var prop;
  var merged = {};

  destObj = destObj || {};

  do {
    props = Object.getOwnPropertyNames(sourceObj);
    i = props.length;
    while (i-- > 0) {
      prop = props[i];
      if (!merged[prop]) {
        destObj[prop] = sourceObj[prop];
        merged[prop] = true;
      }
    }
    sourceObj = Object.getPrototypeOf(sourceObj);
  } while (sourceObj && (!filter || filter(sourceObj, destObj)) && sourceObj !== Object.prototype);

  return destObj;
}

/*
 * determines whether a string ends with the characters of a specified string
 * @param {String} str
 * @param {String} searchString
 * @param {Number} [position= 0]
 * @returns {boolean}
 */
function endsWith(str, searchString, position) {
  str = String(str);
  if (position === undefined || position > str.length) {
    position = str.length;
  }
  position -= searchString.length;
  var lastIndex = str.indexOf(searchString, position);
  return lastIndex !== -1 && lastIndex === position;
}


/**
 * Returns new array from array like object
 * @param {*} [thing]
 * @returns {Array}
 */
function toArray(thing) {
  if (!thing) return null;
  var i = thing.length;
  if (isUndefined(i)) return null;
  var arr = new Array(i);
  while (i-- > 0) {
    arr[i] = thing[i];
  }
  return arr;
}

// eslint-disable-next-line func-names
var isTypedArray = (function(TypedArray) {
  // eslint-disable-next-line func-names
  return function(thing) {
    return TypedArray && thing instanceof TypedArray;
  };
})(typeof Uint8Array !== 'undefined' && Object.getPrototypeOf(Uint8Array));

module.exports = {
  isArray: isArray,
  isArrayBuffer: isArrayBuffer,
  isBuffer: isBuffer,
  isFormData: isFormData,
  isArrayBufferView: isArrayBufferView,
  isString: isString,
  isNumber: isNumber,
  isObject: isObject,
  isPlainObject: isPlainObject,
  isUndefined: isUndefined,
  isDate: isDate,
  isFile: isFile,
  isBlob: isBlob,
  isFunction: isFunction,
  isStream: isStream,
  isURLSearchParams: isURLSearchParams,
  isStandardBrowserEnv: isStandardBrowserEnv,
  forEach: forEach,
  merge: merge,
  extend: extend,
  trim: trim,
  stripBOM: stripBOM,
  inherits: inherits,
  toFlatObject: toFlatObject,
  kindOf: kindOf,
  kindOfTest: kindOfTest,
  endsWith: endsWith,
  toArray: toArray,
  isTypedArray: isTypedArray,
  isFileList: isFileList
};

},{"./helpers/bind":"node_modules/axios/lib/helpers/bind.js"}],"node_modules/axios/lib/helpers/buildURL.js":[function(require,module,exports) {
'use strict';

var utils = require('./../utils');

function encode(val) {
  return encodeURIComponent(val).
    replace(/%3A/gi, ':').
    replace(/%24/g, '$').
    replace(/%2C/gi, ',').
    replace(/%20/g, '+').
    replace(/%5B/gi, '[').
    replace(/%5D/gi, ']');
}

/**
 * Build a URL by appending params to the end
 *
 * @param {string} url The base of the url (e.g., http://www.google.com)
 * @param {object} [params] The params to be appended
 * @returns {string} The formatted url
 */
module.exports = function buildURL(url, params, paramsSerializer) {
  /*eslint no-param-reassign:0*/
  if (!params) {
    return url;
  }

  var serializedParams;
  if (paramsSerializer) {
    serializedParams = paramsSerializer(params);
  } else if (utils.isURLSearchParams(params)) {
    serializedParams = params.toString();
  } else {
    var parts = [];

    utils.forEach(params, function serialize(val, key) {
      if (val === null || typeof val === 'undefined') {
        return;
      }

      if (utils.isArray(val)) {
        key = key + '[]';
      } else {
        val = [val];
      }

      utils.forEach(val, function parseValue(v) {
        if (utils.isDate(v)) {
          v = v.toISOString();
        } else if (utils.isObject(v)) {
          v = JSON.stringify(v);
        }
        parts.push(encode(key) + '=' + encode(v));
      });
    });

    serializedParams = parts.join('&');
  }

  if (serializedParams) {
    var hashmarkIndex = url.indexOf('#');
    if (hashmarkIndex !== -1) {
      url = url.slice(0, hashmarkIndex);
    }

    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
  }

  return url;
};

},{"./../utils":"node_modules/axios/lib/utils.js"}],"node_modules/axios/lib/core/InterceptorManager.js":[function(require,module,exports) {
'use strict';

var utils = require('./../utils');

function InterceptorManager() {
  this.handlers = [];
}

/**
 * Add a new interceptor to the stack
 *
 * @param {Function} fulfilled The function to handle `then` for a `Promise`
 * @param {Function} rejected The function to handle `reject` for a `Promise`
 *
 * @return {Number} An ID used to remove interceptor later
 */
InterceptorManager.prototype.use = function use(fulfilled, rejected, options) {
  this.handlers.push({
    fulfilled: fulfilled,
    rejected: rejected,
    synchronous: options ? options.synchronous : false,
    runWhen: options ? options.runWhen : null
  });
  return this.handlers.length - 1;
};

/**
 * Remove an interceptor from the stack
 *
 * @param {Number} id The ID that was returned by `use`
 */
InterceptorManager.prototype.eject = function eject(id) {
  if (this.handlers[id]) {
    this.handlers[id] = null;
  }
};

/**
 * Iterate over all the registered interceptors
 *
 * This method is particularly useful for skipping over any
 * interceptors that may have become `null` calling `eject`.
 *
 * @param {Function} fn The function to call for each interceptor
 */
InterceptorManager.prototype.forEach = function forEach(fn) {
  utils.forEach(this.handlers, function forEachHandler(h) {
    if (h !== null) {
      fn(h);
    }
  });
};

module.exports = InterceptorManager;

},{"./../utils":"node_modules/axios/lib/utils.js"}],"node_modules/axios/lib/helpers/normalizeHeaderName.js":[function(require,module,exports) {
'use strict';

var utils = require('../utils');

module.exports = function normalizeHeaderName(headers, normalizedName) {
  utils.forEach(headers, function processHeader(value, name) {
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = value;
      delete headers[name];
    }
  });
};

},{"../utils":"node_modules/axios/lib/utils.js"}],"node_modules/axios/lib/core/AxiosError.js":[function(require,module,exports) {
'use strict';

var utils = require('../utils');

/**
 * Create an Error with the specified message, config, error code, request and response.
 *
 * @param {string} message The error message.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [config] The config.
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The created error.
 */
function AxiosError(message, code, config, request, response) {
  Error.call(this);
  this.message = message;
  this.name = 'AxiosError';
  code && (this.code = code);
  config && (this.config = config);
  request && (this.request = request);
  response && (this.response = response);
}

utils.inherits(AxiosError, Error, {
  toJSON: function toJSON() {
    return {
      // Standard
      message: this.message,
      name: this.name,
      // Microsoft
      description: this.description,
      number: this.number,
      // Mozilla
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      columnNumber: this.columnNumber,
      stack: this.stack,
      // Axios
      config: this.config,
      code: this.code,
      status: this.response && this.response.status ? this.response.status : null
    };
  }
});

var prototype = AxiosError.prototype;
var descriptors = {};

[
  'ERR_BAD_OPTION_VALUE',
  'ERR_BAD_OPTION',
  'ECONNABORTED',
  'ETIMEDOUT',
  'ERR_NETWORK',
  'ERR_FR_TOO_MANY_REDIRECTS',
  'ERR_DEPRECATED',
  'ERR_BAD_RESPONSE',
  'ERR_BAD_REQUEST',
  'ERR_CANCELED'
// eslint-disable-next-line func-names
].forEach(function(code) {
  descriptors[code] = {value: code};
});

Object.defineProperties(AxiosError, descriptors);
Object.defineProperty(prototype, 'isAxiosError', {value: true});

// eslint-disable-next-line func-names
AxiosError.from = function(error, code, config, request, response, customProps) {
  var axiosError = Object.create(prototype);

  utils.toFlatObject(error, axiosError, function filter(obj) {
    return obj !== Error.prototype;
  });

  AxiosError.call(axiosError, error.message, code, config, request, response);

  axiosError.name = error.name;

  customProps && Object.assign(axiosError, customProps);

  return axiosError;
};

module.exports = AxiosError;

},{"../utils":"node_modules/axios/lib/utils.js"}],"node_modules/axios/lib/defaults/transitional.js":[function(require,module,exports) {
'use strict';

module.exports = {
  silentJSONParsing: true,
  forcedJSONParsing: true,
  clarifyTimeoutError: false
};

},{}],"../../../../../usr/local/lib/node_modules/parcel-bundler/node_modules/base64-js/index.js":[function(require,module,exports) {
'use strict'

exports.byteLength = byteLength
exports.toByteArray = toByteArray
exports.fromByteArray = fromByteArray

var lookup = []
var revLookup = []
var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array

var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
for (var i = 0, len = code.length; i < len; ++i) {
  lookup[i] = code[i]
  revLookup[code.charCodeAt(i)] = i
}

// Support decoding URL-safe base64 strings, as Node.js does.
// See: https://en.wikipedia.org/wiki/Base64#URL_applications
revLookup['-'.charCodeAt(0)] = 62
revLookup['_'.charCodeAt(0)] = 63

function getLens (b64) {
  var len = b64.length

  if (len % 4 > 0) {
    throw new Error('Invalid string. Length must be a multiple of 4')
  }

  // Trim off extra bytes after placeholder bytes are found
  // See: https://github.com/beatgammit/base64-js/issues/42
  var validLen = b64.indexOf('=')
  if (validLen === -1) validLen = len

  var placeHoldersLen = validLen === len
    ? 0
    : 4 - (validLen % 4)

  return [validLen, placeHoldersLen]
}

// base64 is 4/3 + up to two characters of the original data
function byteLength (b64) {
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function _byteLength (b64, validLen, placeHoldersLen) {
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function toByteArray (b64) {
  var tmp
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]

  var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen))

  var curByte = 0

  // if there are placeholders, only get up to the last complete 4 chars
  var len = placeHoldersLen > 0
    ? validLen - 4
    : validLen

  var i
  for (i = 0; i < len; i += 4) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 18) |
      (revLookup[b64.charCodeAt(i + 1)] << 12) |
      (revLookup[b64.charCodeAt(i + 2)] << 6) |
      revLookup[b64.charCodeAt(i + 3)]
    arr[curByte++] = (tmp >> 16) & 0xFF
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 2) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 2) |
      (revLookup[b64.charCodeAt(i + 1)] >> 4)
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 1) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 10) |
      (revLookup[b64.charCodeAt(i + 1)] << 4) |
      (revLookup[b64.charCodeAt(i + 2)] >> 2)
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  return arr
}

function tripletToBase64 (num) {
  return lookup[num >> 18 & 0x3F] +
    lookup[num >> 12 & 0x3F] +
    lookup[num >> 6 & 0x3F] +
    lookup[num & 0x3F]
}

function encodeChunk (uint8, start, end) {
  var tmp
  var output = []
  for (var i = start; i < end; i += 3) {
    tmp =
      ((uint8[i] << 16) & 0xFF0000) +
      ((uint8[i + 1] << 8) & 0xFF00) +
      (uint8[i + 2] & 0xFF)
    output.push(tripletToBase64(tmp))
  }
  return output.join('')
}

function fromByteArray (uint8) {
  var tmp
  var len = uint8.length
  var extraBytes = len % 3 // if we have 1 byte left, pad 2 bytes
  var parts = []
  var maxChunkLength = 16383 // must be multiple of 3

  // go through the array every three bytes, we'll deal with trailing stuff later
  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
    parts.push(encodeChunk(uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)))
  }

  // pad the end with zeros, but make sure to not forget the extra bytes
  if (extraBytes === 1) {
    tmp = uint8[len - 1]
    parts.push(
      lookup[tmp >> 2] +
      lookup[(tmp << 4) & 0x3F] +
      '=='
    )
  } else if (extraBytes === 2) {
    tmp = (uint8[len - 2] << 8) + uint8[len - 1]
    parts.push(
      lookup[tmp >> 10] +
      lookup[(tmp >> 4) & 0x3F] +
      lookup[(tmp << 2) & 0x3F] +
      '='
    )
  }

  return parts.join('')
}

},{}],"../../../../../usr/local/lib/node_modules/parcel-bundler/node_modules/ieee754/index.js":[function(require,module,exports) {
/*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> */
exports.read = function (buffer, offset, isLE, mLen, nBytes) {
  var e, m
  var eLen = (nBytes * 8) - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var nBits = -7
  var i = isLE ? (nBytes - 1) : 0
  var d = isLE ? -1 : 1
  var s = buffer[offset + i]

  i += d

  e = s & ((1 << (-nBits)) - 1)
  s >>= (-nBits)
  nBits += eLen
  for (; nBits > 0; e = (e * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  m = e & ((1 << (-nBits)) - 1)
  e >>= (-nBits)
  nBits += mLen
  for (; nBits > 0; m = (m * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  if (e === 0) {
    e = 1 - eBias
  } else if (e === eMax) {
    return m ? NaN : ((s ? -1 : 1) * Infinity)
  } else {
    m = m + Math.pow(2, mLen)
    e = e - eBias
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
}

exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c
  var eLen = (nBytes * 8) - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
  var i = isLE ? 0 : (nBytes - 1)
  var d = isLE ? 1 : -1
  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0

  value = Math.abs(value)

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0
    e = eMax
  } else {
    e = Math.floor(Math.log(value) / Math.LN2)
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--
      c *= 2
    }
    if (e + eBias >= 1) {
      value += rt / c
    } else {
      value += rt * Math.pow(2, 1 - eBias)
    }
    if (value * c >= 2) {
      e++
      c /= 2
    }

    if (e + eBias >= eMax) {
      m = 0
      e = eMax
    } else if (e + eBias >= 1) {
      m = ((value * c) - 1) * Math.pow(2, mLen)
      e = e + eBias
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
      e = 0
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

  e = (e << mLen) | m
  eLen += mLen
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

  buffer[offset + i - d] |= s * 128
}

},{}],"../../../../../usr/local/lib/node_modules/parcel-bundler/node_modules/isarray/index.js":[function(require,module,exports) {
var toString = {}.toString;

module.exports = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};

},{}],"../../../../../usr/local/lib/node_modules/parcel-bundler/node_modules/buffer/index.js":[function(require,module,exports) {

var global = arguments[3];
/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <http://feross.org>
 * @license  MIT
 */
/* eslint-disable no-proto */

'use strict'

var base64 = require('base64-js')
var ieee754 = require('ieee754')
var isArray = require('isarray')

exports.Buffer = Buffer
exports.SlowBuffer = SlowBuffer
exports.INSPECT_MAX_BYTES = 50

/**
 * If `Buffer.TYPED_ARRAY_SUPPORT`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Use Object implementation (most compatible, even IE6)
 *
 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
 * Opera 11.6+, iOS 4.2+.
 *
 * Due to various browser bugs, sometimes the Object implementation will be used even
 * when the browser supports typed arrays.
 *
 * Note:
 *
 *   - Firefox 4-29 lacks support for adding new properties to `Uint8Array` instances,
 *     See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
 *
 *   - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
 *
 *   - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
 *     incorrect length in some situations.

 * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they
 * get the Object implementation, which is slower but behaves correctly.
 */
Buffer.TYPED_ARRAY_SUPPORT = global.TYPED_ARRAY_SUPPORT !== undefined
  ? global.TYPED_ARRAY_SUPPORT
  : typedArraySupport()

/*
 * Export kMaxLength after typed array support is determined.
 */
exports.kMaxLength = kMaxLength()

function typedArraySupport () {
  try {
    var arr = new Uint8Array(1)
    arr.__proto__ = {__proto__: Uint8Array.prototype, foo: function () { return 42 }}
    return arr.foo() === 42 && // typed array instances can be augmented
        typeof arr.subarray === 'function' && // chrome 9-10 lack `subarray`
        arr.subarray(1, 1).byteLength === 0 // ie10 has broken `subarray`
  } catch (e) {
    return false
  }
}

function kMaxLength () {
  return Buffer.TYPED_ARRAY_SUPPORT
    ? 0x7fffffff
    : 0x3fffffff
}

function createBuffer (that, length) {
  if (kMaxLength() < length) {
    throw new RangeError('Invalid typed array length')
  }
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = new Uint8Array(length)
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    if (that === null) {
      that = new Buffer(length)
    }
    that.length = length
  }

  return that
}

/**
 * The Buffer constructor returns instances of `Uint8Array` that have their
 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
 * returns a single octet.
 *
 * The `Uint8Array` prototype remains unmodified.
 */

function Buffer (arg, encodingOrOffset, length) {
  if (!Buffer.TYPED_ARRAY_SUPPORT && !(this instanceof Buffer)) {
    return new Buffer(arg, encodingOrOffset, length)
  }

  // Common case.
  if (typeof arg === 'number') {
    if (typeof encodingOrOffset === 'string') {
      throw new Error(
        'If encoding is specified then the first argument must be a string'
      )
    }
    return allocUnsafe(this, arg)
  }
  return from(this, arg, encodingOrOffset, length)
}

Buffer.poolSize = 8192 // not used by this implementation

// TODO: Legacy, not needed anymore. Remove in next major version.
Buffer._augment = function (arr) {
  arr.__proto__ = Buffer.prototype
  return arr
}

function from (that, value, encodingOrOffset, length) {
  if (typeof value === 'number') {
    throw new TypeError('"value" argument must not be a number')
  }

  if (typeof ArrayBuffer !== 'undefined' && value instanceof ArrayBuffer) {
    return fromArrayBuffer(that, value, encodingOrOffset, length)
  }

  if (typeof value === 'string') {
    return fromString(that, value, encodingOrOffset)
  }

  return fromObject(that, value)
}

/**
 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
 * if value is a number.
 * Buffer.from(str[, encoding])
 * Buffer.from(array)
 * Buffer.from(buffer)
 * Buffer.from(arrayBuffer[, byteOffset[, length]])
 **/
Buffer.from = function (value, encodingOrOffset, length) {
  return from(null, value, encodingOrOffset, length)
}

if (Buffer.TYPED_ARRAY_SUPPORT) {
  Buffer.prototype.__proto__ = Uint8Array.prototype
  Buffer.__proto__ = Uint8Array
  if (typeof Symbol !== 'undefined' && Symbol.species &&
      Buffer[Symbol.species] === Buffer) {
    // Fix subarray() in ES2016. See: https://github.com/feross/buffer/pull/97
    Object.defineProperty(Buffer, Symbol.species, {
      value: null,
      configurable: true
    })
  }
}

function assertSize (size) {
  if (typeof size !== 'number') {
    throw new TypeError('"size" argument must be a number')
  } else if (size < 0) {
    throw new RangeError('"size" argument must not be negative')
  }
}

function alloc (that, size, fill, encoding) {
  assertSize(size)
  if (size <= 0) {
    return createBuffer(that, size)
  }
  if (fill !== undefined) {
    // Only pay attention to encoding if it's a string. This
    // prevents accidentally sending in a number that would
    // be interpretted as a start offset.
    return typeof encoding === 'string'
      ? createBuffer(that, size).fill(fill, encoding)
      : createBuffer(that, size).fill(fill)
  }
  return createBuffer(that, size)
}

/**
 * Creates a new filled Buffer instance.
 * alloc(size[, fill[, encoding]])
 **/
Buffer.alloc = function (size, fill, encoding) {
  return alloc(null, size, fill, encoding)
}

function allocUnsafe (that, size) {
  assertSize(size)
  that = createBuffer(that, size < 0 ? 0 : checked(size) | 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) {
    for (var i = 0; i < size; ++i) {
      that[i] = 0
    }
  }
  return that
}

/**
 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
 * */
Buffer.allocUnsafe = function (size) {
  return allocUnsafe(null, size)
}
/**
 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
 */
Buffer.allocUnsafeSlow = function (size) {
  return allocUnsafe(null, size)
}

function fromString (that, string, encoding) {
  if (typeof encoding !== 'string' || encoding === '') {
    encoding = 'utf8'
  }

  if (!Buffer.isEncoding(encoding)) {
    throw new TypeError('"encoding" must be a valid string encoding')
  }

  var length = byteLength(string, encoding) | 0
  that = createBuffer(that, length)

  var actual = that.write(string, encoding)

  if (actual !== length) {
    // Writing a hex string, for example, that contains invalid characters will
    // cause everything after the first invalid character to be ignored. (e.g.
    // 'abxxcd' will be treated as 'ab')
    that = that.slice(0, actual)
  }

  return that
}

function fromArrayLike (that, array) {
  var length = array.length < 0 ? 0 : checked(array.length) | 0
  that = createBuffer(that, length)
  for (var i = 0; i < length; i += 1) {
    that[i] = array[i] & 255
  }
  return that
}

function fromArrayBuffer (that, array, byteOffset, length) {
  array.byteLength // this throws if `array` is not a valid ArrayBuffer

  if (byteOffset < 0 || array.byteLength < byteOffset) {
    throw new RangeError('\'offset\' is out of bounds')
  }

  if (array.byteLength < byteOffset + (length || 0)) {
    throw new RangeError('\'length\' is out of bounds')
  }

  if (byteOffset === undefined && length === undefined) {
    array = new Uint8Array(array)
  } else if (length === undefined) {
    array = new Uint8Array(array, byteOffset)
  } else {
    array = new Uint8Array(array, byteOffset, length)
  }

  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = array
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    that = fromArrayLike(that, array)
  }
  return that
}

function fromObject (that, obj) {
  if (Buffer.isBuffer(obj)) {
    var len = checked(obj.length) | 0
    that = createBuffer(that, len)

    if (that.length === 0) {
      return that
    }

    obj.copy(that, 0, 0, len)
    return that
  }

  if (obj) {
    if ((typeof ArrayBuffer !== 'undefined' &&
        obj.buffer instanceof ArrayBuffer) || 'length' in obj) {
      if (typeof obj.length !== 'number' || isnan(obj.length)) {
        return createBuffer(that, 0)
      }
      return fromArrayLike(that, obj)
    }

    if (obj.type === 'Buffer' && isArray(obj.data)) {
      return fromArrayLike(that, obj.data)
    }
  }

  throw new TypeError('First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.')
}

function checked (length) {
  // Note: cannot use `length < kMaxLength()` here because that fails when
  // length is NaN (which is otherwise coerced to zero.)
  if (length >= kMaxLength()) {
    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
                         'size: 0x' + kMaxLength().toString(16) + ' bytes')
  }
  return length | 0
}

function SlowBuffer (length) {
  if (+length != length) { // eslint-disable-line eqeqeq
    length = 0
  }
  return Buffer.alloc(+length)
}

Buffer.isBuffer = function isBuffer (b) {
  return !!(b != null && b._isBuffer)
}

Buffer.compare = function compare (a, b) {
  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
    throw new TypeError('Arguments must be Buffers')
  }

  if (a === b) return 0

  var x = a.length
  var y = b.length

  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i]
      y = b[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

Buffer.isEncoding = function isEncoding (encoding) {
  switch (String(encoding).toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'latin1':
    case 'binary':
    case 'base64':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return true
    default:
      return false
  }
}

Buffer.concat = function concat (list, length) {
  if (!isArray(list)) {
    throw new TypeError('"list" argument must be an Array of Buffers')
  }

  if (list.length === 0) {
    return Buffer.alloc(0)
  }

  var i
  if (length === undefined) {
    length = 0
    for (i = 0; i < list.length; ++i) {
      length += list[i].length
    }
  }

  var buffer = Buffer.allocUnsafe(length)
  var pos = 0
  for (i = 0; i < list.length; ++i) {
    var buf = list[i]
    if (!Buffer.isBuffer(buf)) {
      throw new TypeError('"list" argument must be an Array of Buffers')
    }
    buf.copy(buffer, pos)
    pos += buf.length
  }
  return buffer
}

function byteLength (string, encoding) {
  if (Buffer.isBuffer(string)) {
    return string.length
  }
  if (typeof ArrayBuffer !== 'undefined' && typeof ArrayBuffer.isView === 'function' &&
      (ArrayBuffer.isView(string) || string instanceof ArrayBuffer)) {
    return string.byteLength
  }
  if (typeof string !== 'string') {
    string = '' + string
  }

  var len = string.length
  if (len === 0) return 0

  // Use a for loop to avoid recursion
  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'ascii':
      case 'latin1':
      case 'binary':
        return len
      case 'utf8':
      case 'utf-8':
      case undefined:
        return utf8ToBytes(string).length
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return len * 2
      case 'hex':
        return len >>> 1
      case 'base64':
        return base64ToBytes(string).length
      default:
        if (loweredCase) return utf8ToBytes(string).length // assume utf8
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}
Buffer.byteLength = byteLength

function slowToString (encoding, start, end) {
  var loweredCase = false

  // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
  // property of a typed array.

  // This behaves neither like String nor Uint8Array in that we set start/end
  // to their upper/lower bounds if the value passed is out of range.
  // undefined is handled specially as per ECMA-262 6th Edition,
  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
  if (start === undefined || start < 0) {
    start = 0
  }
  // Return early if start > this.length. Done here to prevent potential uint32
  // coercion fail below.
  if (start > this.length) {
    return ''
  }

  if (end === undefined || end > this.length) {
    end = this.length
  }

  if (end <= 0) {
    return ''
  }

  // Force coersion to uint32. This will also coerce falsey/NaN values to 0.
  end >>>= 0
  start >>>= 0

  if (end <= start) {
    return ''
  }

  if (!encoding) encoding = 'utf8'

  while (true) {
    switch (encoding) {
      case 'hex':
        return hexSlice(this, start, end)

      case 'utf8':
      case 'utf-8':
        return utf8Slice(this, start, end)

      case 'ascii':
        return asciiSlice(this, start, end)

      case 'latin1':
      case 'binary':
        return latin1Slice(this, start, end)

      case 'base64':
        return base64Slice(this, start, end)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return utf16leSlice(this, start, end)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = (encoding + '').toLowerCase()
        loweredCase = true
    }
  }
}

// The property is used by `Buffer.isBuffer` and `is-buffer` (in Safari 5-7) to detect
// Buffer instances.
Buffer.prototype._isBuffer = true

function swap (b, n, m) {
  var i = b[n]
  b[n] = b[m]
  b[m] = i
}

Buffer.prototype.swap16 = function swap16 () {
  var len = this.length
  if (len % 2 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 16-bits')
  }
  for (var i = 0; i < len; i += 2) {
    swap(this, i, i + 1)
  }
  return this
}

Buffer.prototype.swap32 = function swap32 () {
  var len = this.length
  if (len % 4 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 32-bits')
  }
  for (var i = 0; i < len; i += 4) {
    swap(this, i, i + 3)
    swap(this, i + 1, i + 2)
  }
  return this
}

Buffer.prototype.swap64 = function swap64 () {
  var len = this.length
  if (len % 8 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 64-bits')
  }
  for (var i = 0; i < len; i += 8) {
    swap(this, i, i + 7)
    swap(this, i + 1, i + 6)
    swap(this, i + 2, i + 5)
    swap(this, i + 3, i + 4)
  }
  return this
}

Buffer.prototype.toString = function toString () {
  var length = this.length | 0
  if (length === 0) return ''
  if (arguments.length === 0) return utf8Slice(this, 0, length)
  return slowToString.apply(this, arguments)
}

Buffer.prototype.equals = function equals (b) {
  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
  if (this === b) return true
  return Buffer.compare(this, b) === 0
}

Buffer.prototype.inspect = function inspect () {
  var str = ''
  var max = exports.INSPECT_MAX_BYTES
  if (this.length > 0) {
    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ')
    if (this.length > max) str += ' ... '
  }
  return '<Buffer ' + str + '>'
}

Buffer.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
  if (!Buffer.isBuffer(target)) {
    throw new TypeError('Argument must be a Buffer')
  }

  if (start === undefined) {
    start = 0
  }
  if (end === undefined) {
    end = target ? target.length : 0
  }
  if (thisStart === undefined) {
    thisStart = 0
  }
  if (thisEnd === undefined) {
    thisEnd = this.length
  }

  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
    throw new RangeError('out of range index')
  }

  if (thisStart >= thisEnd && start >= end) {
    return 0
  }
  if (thisStart >= thisEnd) {
    return -1
  }
  if (start >= end) {
    return 1
  }

  start >>>= 0
  end >>>= 0
  thisStart >>>= 0
  thisEnd >>>= 0

  if (this === target) return 0

  var x = thisEnd - thisStart
  var y = end - start
  var len = Math.min(x, y)

  var thisCopy = this.slice(thisStart, thisEnd)
  var targetCopy = target.slice(start, end)

  for (var i = 0; i < len; ++i) {
    if (thisCopy[i] !== targetCopy[i]) {
      x = thisCopy[i]
      y = targetCopy[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
//
// Arguments:
// - buffer - a Buffer to search
// - val - a string, Buffer, or number
// - byteOffset - an index into `buffer`; will be clamped to an int32
// - encoding - an optional encoding, relevant is val is a string
// - dir - true for indexOf, false for lastIndexOf
function bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {
  // Empty buffer means no match
  if (buffer.length === 0) return -1

  // Normalize byteOffset
  if (typeof byteOffset === 'string') {
    encoding = byteOffset
    byteOffset = 0
  } else if (byteOffset > 0x7fffffff) {
    byteOffset = 0x7fffffff
  } else if (byteOffset < -0x80000000) {
    byteOffset = -0x80000000
  }
  byteOffset = +byteOffset  // Coerce to Number.
  if (isNaN(byteOffset)) {
    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
    byteOffset = dir ? 0 : (buffer.length - 1)
  }

  // Normalize byteOffset: negative offsets start from the end of the buffer
  if (byteOffset < 0) byteOffset = buffer.length + byteOffset
  if (byteOffset >= buffer.length) {
    if (dir) return -1
    else byteOffset = buffer.length - 1
  } else if (byteOffset < 0) {
    if (dir) byteOffset = 0
    else return -1
  }

  // Normalize val
  if (typeof val === 'string') {
    val = Buffer.from(val, encoding)
  }

  // Finally, search either indexOf (if dir is true) or lastIndexOf
  if (Buffer.isBuffer(val)) {
    // Special case: looking for empty string/buffer always fails
    if (val.length === 0) {
      return -1
    }
    return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
  } else if (typeof val === 'number') {
    val = val & 0xFF // Search for a byte value [0-255]
    if (Buffer.TYPED_ARRAY_SUPPORT &&
        typeof Uint8Array.prototype.indexOf === 'function') {
      if (dir) {
        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
      } else {
        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)
      }
    }
    return arrayIndexOf(buffer, [ val ], byteOffset, encoding, dir)
  }

  throw new TypeError('val must be string, number or Buffer')
}

function arrayIndexOf (arr, val, byteOffset, encoding, dir) {
  var indexSize = 1
  var arrLength = arr.length
  var valLength = val.length

  if (encoding !== undefined) {
    encoding = String(encoding).toLowerCase()
    if (encoding === 'ucs2' || encoding === 'ucs-2' ||
        encoding === 'utf16le' || encoding === 'utf-16le') {
      if (arr.length < 2 || val.length < 2) {
        return -1
      }
      indexSize = 2
      arrLength /= 2
      valLength /= 2
      byteOffset /= 2
    }
  }

  function read (buf, i) {
    if (indexSize === 1) {
      return buf[i]
    } else {
      return buf.readUInt16BE(i * indexSize)
    }
  }

  var i
  if (dir) {
    var foundIndex = -1
    for (i = byteOffset; i < arrLength; i++) {
      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
        if (foundIndex === -1) foundIndex = i
        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize
      } else {
        if (foundIndex !== -1) i -= i - foundIndex
        foundIndex = -1
      }
    }
  } else {
    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength
    for (i = byteOffset; i >= 0; i--) {
      var found = true
      for (var j = 0; j < valLength; j++) {
        if (read(arr, i + j) !== read(val, j)) {
          found = false
          break
        }
      }
      if (found) return i
    }
  }

  return -1
}

Buffer.prototype.includes = function includes (val, byteOffset, encoding) {
  return this.indexOf(val, byteOffset, encoding) !== -1
}

Buffer.prototype.indexOf = function indexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
}

Buffer.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
}

function hexWrite (buf, string, offset, length) {
  offset = Number(offset) || 0
  var remaining = buf.length - offset
  if (!length) {
    length = remaining
  } else {
    length = Number(length)
    if (length > remaining) {
      length = remaining
    }
  }

  // must be an even number of digits
  var strLen = string.length
  if (strLen % 2 !== 0) throw new TypeError('Invalid hex string')

  if (length > strLen / 2) {
    length = strLen / 2
  }
  for (var i = 0; i < length; ++i) {
    var parsed = parseInt(string.substr(i * 2, 2), 16)
    if (isNaN(parsed)) return i
    buf[offset + i] = parsed
  }
  return i
}

function utf8Write (buf, string, offset, length) {
  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
}

function asciiWrite (buf, string, offset, length) {
  return blitBuffer(asciiToBytes(string), buf, offset, length)
}

function latin1Write (buf, string, offset, length) {
  return asciiWrite(buf, string, offset, length)
}

function base64Write (buf, string, offset, length) {
  return blitBuffer(base64ToBytes(string), buf, offset, length)
}

function ucs2Write (buf, string, offset, length) {
  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
}

Buffer.prototype.write = function write (string, offset, length, encoding) {
  // Buffer#write(string)
  if (offset === undefined) {
    encoding = 'utf8'
    length = this.length
    offset = 0
  // Buffer#write(string, encoding)
  } else if (length === undefined && typeof offset === 'string') {
    encoding = offset
    length = this.length
    offset = 0
  // Buffer#write(string, offset[, length][, encoding])
  } else if (isFinite(offset)) {
    offset = offset | 0
    if (isFinite(length)) {
      length = length | 0
      if (encoding === undefined) encoding = 'utf8'
    } else {
      encoding = length
      length = undefined
    }
  // legacy write(string, encoding, offset, length) - remove in v0.13
  } else {
    throw new Error(
      'Buffer.write(string, encoding, offset[, length]) is no longer supported'
    )
  }

  var remaining = this.length - offset
  if (length === undefined || length > remaining) length = remaining

  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
    throw new RangeError('Attempt to write outside buffer bounds')
  }

  if (!encoding) encoding = 'utf8'

  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'hex':
        return hexWrite(this, string, offset, length)

      case 'utf8':
      case 'utf-8':
        return utf8Write(this, string, offset, length)

      case 'ascii':
        return asciiWrite(this, string, offset, length)

      case 'latin1':
      case 'binary':
        return latin1Write(this, string, offset, length)

      case 'base64':
        // Warning: maxLength not taken into account in base64Write
        return base64Write(this, string, offset, length)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return ucs2Write(this, string, offset, length)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}

Buffer.prototype.toJSON = function toJSON () {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  }
}

function base64Slice (buf, start, end) {
  if (start === 0 && end === buf.length) {
    return base64.fromByteArray(buf)
  } else {
    return base64.fromByteArray(buf.slice(start, end))
  }
}

function utf8Slice (buf, start, end) {
  end = Math.min(buf.length, end)
  var res = []

  var i = start
  while (i < end) {
    var firstByte = buf[i]
    var codePoint = null
    var bytesPerSequence = (firstByte > 0xEF) ? 4
      : (firstByte > 0xDF) ? 3
      : (firstByte > 0xBF) ? 2
      : 1

    if (i + bytesPerSequence <= end) {
      var secondByte, thirdByte, fourthByte, tempCodePoint

      switch (bytesPerSequence) {
        case 1:
          if (firstByte < 0x80) {
            codePoint = firstByte
          }
          break
        case 2:
          secondByte = buf[i + 1]
          if ((secondByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F)
            if (tempCodePoint > 0x7F) {
              codePoint = tempCodePoint
            }
          }
          break
        case 3:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F)
            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
              codePoint = tempCodePoint
            }
          }
          break
        case 4:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          fourthByte = buf[i + 3]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F)
            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
              codePoint = tempCodePoint
            }
          }
      }
    }

    if (codePoint === null) {
      // we did not generate a valid codePoint so insert a
      // replacement char (U+FFFD) and advance only 1 byte
      codePoint = 0xFFFD
      bytesPerSequence = 1
    } else if (codePoint > 0xFFFF) {
      // encode to utf16 (surrogate pair dance)
      codePoint -= 0x10000
      res.push(codePoint >>> 10 & 0x3FF | 0xD800)
      codePoint = 0xDC00 | codePoint & 0x3FF
    }

    res.push(codePoint)
    i += bytesPerSequence
  }

  return decodeCodePointsArray(res)
}

// Based on http://stackoverflow.com/a/22747272/680742, the browser with
// the lowest limit is Chrome, with 0x10000 args.
// We go 1 magnitude less, for safety
var MAX_ARGUMENTS_LENGTH = 0x1000

function decodeCodePointsArray (codePoints) {
  var len = codePoints.length
  if (len <= MAX_ARGUMENTS_LENGTH) {
    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
  }

  // Decode in chunks to avoid "call stack size exceeded".
  var res = ''
  var i = 0
  while (i < len) {
    res += String.fromCharCode.apply(
      String,
      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
    )
  }
  return res
}

function asciiSlice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i] & 0x7F)
  }
  return ret
}

function latin1Slice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i])
  }
  return ret
}

function hexSlice (buf, start, end) {
  var len = buf.length

  if (!start || start < 0) start = 0
  if (!end || end < 0 || end > len) end = len

  var out = ''
  for (var i = start; i < end; ++i) {
    out += toHex(buf[i])
  }
  return out
}

function utf16leSlice (buf, start, end) {
  var bytes = buf.slice(start, end)
  var res = ''
  for (var i = 0; i < bytes.length; i += 2) {
    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256)
  }
  return res
}

Buffer.prototype.slice = function slice (start, end) {
  var len = this.length
  start = ~~start
  end = end === undefined ? len : ~~end

  if (start < 0) {
    start += len
    if (start < 0) start = 0
  } else if (start > len) {
    start = len
  }

  if (end < 0) {
    end += len
    if (end < 0) end = 0
  } else if (end > len) {
    end = len
  }

  if (end < start) end = start

  var newBuf
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    newBuf = this.subarray(start, end)
    newBuf.__proto__ = Buffer.prototype
  } else {
    var sliceLen = end - start
    newBuf = new Buffer(sliceLen, undefined)
    for (var i = 0; i < sliceLen; ++i) {
      newBuf[i] = this[i + start]
    }
  }

  return newBuf
}

/*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */
function checkOffset (offset, ext, length) {
  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
}

Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }

  return val
}

Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    checkOffset(offset, byteLength, this.length)
  }

  var val = this[offset + --byteLength]
  var mul = 1
  while (byteLength > 0 && (mul *= 0x100)) {
    val += this[offset + --byteLength] * mul
  }

  return val
}

Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  return this[offset]
}

Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return this[offset] | (this[offset + 1] << 8)
}

Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return (this[offset] << 8) | this[offset + 1]
}

Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return ((this[offset]) |
      (this[offset + 1] << 8) |
      (this[offset + 2] << 16)) +
      (this[offset + 3] * 0x1000000)
}

Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] * 0x1000000) +
    ((this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    this[offset + 3])
}

Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var i = byteLength
  var mul = 1
  var val = this[offset + --i]
  while (i > 0 && (mul *= 0x100)) {
    val += this[offset + --i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  if (!(this[offset] & 0x80)) return (this[offset])
  return ((0xff - this[offset] + 1) * -1)
}

Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset] | (this[offset + 1] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset + 1] | (this[offset] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset]) |
    (this[offset + 1] << 8) |
    (this[offset + 2] << 16) |
    (this[offset + 3] << 24)
}

Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] << 24) |
    (this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    (this[offset + 3])
}

Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, true, 23, 4)
}

Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, false, 23, 4)
}

Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, true, 52, 8)
}

Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, false, 52, 8)
}

function checkInt (buf, value, offset, ext, max, min) {
  if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds')
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
}

Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var mul = 1
  var i = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var i = byteLength - 1
  var mul = 1
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  this[offset] = (value & 0xff)
  return offset + 1
}

function objectWriteUInt16 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; ++i) {
    buf[offset + i] = (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
      (littleEndian ? i : 1 - i) * 8
  }
}

Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

function objectWriteUInt32 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffffffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; ++i) {
    buf[offset + i] = (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff
  }
}

Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset + 3] = (value >>> 24)
    this[offset + 2] = (value >>> 16)
    this[offset + 1] = (value >>> 8)
    this[offset] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = 0
  var mul = 1
  var sub = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = byteLength - 1
  var mul = 1
  var sub = 0
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  if (value < 0) value = 0xff + value + 1
  this[offset] = (value & 0xff)
  return offset + 1
}

Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
    this[offset + 2] = (value >>> 16)
    this[offset + 3] = (value >>> 24)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (value < 0) value = 0xffffffff + value + 1
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

function checkIEEE754 (buf, value, offset, ext, max, min) {
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
  if (offset < 0) throw new RangeError('Index out of range')
}

function writeFloat (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
  }
  ieee754.write(buf, value, offset, littleEndian, 23, 4)
  return offset + 4
}

Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
  return writeFloat(this, value, offset, true, noAssert)
}

Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
  return writeFloat(this, value, offset, false, noAssert)
}

function writeDouble (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
  }
  ieee754.write(buf, value, offset, littleEndian, 52, 8)
  return offset + 8
}

Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
  return writeDouble(this, value, offset, true, noAssert)
}

Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
  return writeDouble(this, value, offset, false, noAssert)
}

// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function copy (target, targetStart, start, end) {
  if (!start) start = 0
  if (!end && end !== 0) end = this.length
  if (targetStart >= target.length) targetStart = target.length
  if (!targetStart) targetStart = 0
  if (end > 0 && end < start) end = start

  // Copy 0 bytes; we're done
  if (end === start) return 0
  if (target.length === 0 || this.length === 0) return 0

  // Fatal error conditions
  if (targetStart < 0) {
    throw new RangeError('targetStart out of bounds')
  }
  if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds')
  if (end < 0) throw new RangeError('sourceEnd out of bounds')

  // Are we oob?
  if (end > this.length) end = this.length
  if (target.length - targetStart < end - start) {
    end = target.length - targetStart + start
  }

  var len = end - start
  var i

  if (this === target && start < targetStart && targetStart < end) {
    // descending copy from end
    for (i = len - 1; i >= 0; --i) {
      target[i + targetStart] = this[i + start]
    }
  } else if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
    // ascending copy from start
    for (i = 0; i < len; ++i) {
      target[i + targetStart] = this[i + start]
    }
  } else {
    Uint8Array.prototype.set.call(
      target,
      this.subarray(start, start + len),
      targetStart
    )
  }

  return len
}

// Usage:
//    buffer.fill(number[, offset[, end]])
//    buffer.fill(buffer[, offset[, end]])
//    buffer.fill(string[, offset[, end]][, encoding])
Buffer.prototype.fill = function fill (val, start, end, encoding) {
  // Handle string cases:
  if (typeof val === 'string') {
    if (typeof start === 'string') {
      encoding = start
      start = 0
      end = this.length
    } else if (typeof end === 'string') {
      encoding = end
      end = this.length
    }
    if (val.length === 1) {
      var code = val.charCodeAt(0)
      if (code < 256) {
        val = code
      }
    }
    if (encoding !== undefined && typeof encoding !== 'string') {
      throw new TypeError('encoding must be a string')
    }
    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
      throw new TypeError('Unknown encoding: ' + encoding)
    }
  } else if (typeof val === 'number') {
    val = val & 255
  }

  // Invalid ranges are not set to a default, so can range check early.
  if (start < 0 || this.length < start || this.length < end) {
    throw new RangeError('Out of range index')
  }

  if (end <= start) {
    return this
  }

  start = start >>> 0
  end = end === undefined ? this.length : end >>> 0

  if (!val) val = 0

  var i
  if (typeof val === 'number') {
    for (i = start; i < end; ++i) {
      this[i] = val
    }
  } else {
    var bytes = Buffer.isBuffer(val)
      ? val
      : utf8ToBytes(new Buffer(val, encoding).toString())
    var len = bytes.length
    for (i = 0; i < end - start; ++i) {
      this[i + start] = bytes[i % len]
    }
  }

  return this
}

// HELPER FUNCTIONS
// ================

var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g

function base64clean (str) {
  // Node strips out invalid characters like \n and \t from the string, base64-js does not
  str = stringtrim(str).replace(INVALID_BASE64_RE, '')
  // Node converts strings with length < 2 to ''
  if (str.length < 2) return ''
  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
  while (str.length % 4 !== 0) {
    str = str + '='
  }
  return str
}

function stringtrim (str) {
  if (str.trim) return str.trim()
  return str.replace(/^\s+|\s+$/g, '')
}

function toHex (n) {
  if (n < 16) return '0' + n.toString(16)
  return n.toString(16)
}

function utf8ToBytes (string, units) {
  units = units || Infinity
  var codePoint
  var length = string.length
  var leadSurrogate = null
  var bytes = []

  for (var i = 0; i < length; ++i) {
    codePoint = string.charCodeAt(i)

    // is surrogate component
    if (codePoint > 0xD7FF && codePoint < 0xE000) {
      // last char was a lead
      if (!leadSurrogate) {
        // no lead yet
        if (codePoint > 0xDBFF) {
          // unexpected trail
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        } else if (i + 1 === length) {
          // unpaired lead
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        }

        // valid lead
        leadSurrogate = codePoint

        continue
      }

      // 2 leads in a row
      if (codePoint < 0xDC00) {
        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
        leadSurrogate = codePoint
        continue
      }

      // valid surrogate pair
      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000
    } else if (leadSurrogate) {
      // valid bmp char, but last char was a lead
      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
    }

    leadSurrogate = null

    // encode utf8
    if (codePoint < 0x80) {
      if ((units -= 1) < 0) break
      bytes.push(codePoint)
    } else if (codePoint < 0x800) {
      if ((units -= 2) < 0) break
      bytes.push(
        codePoint >> 0x6 | 0xC0,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x10000) {
      if ((units -= 3) < 0) break
      bytes.push(
        codePoint >> 0xC | 0xE0,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x110000) {
      if ((units -= 4) < 0) break
      bytes.push(
        codePoint >> 0x12 | 0xF0,
        codePoint >> 0xC & 0x3F | 0x80,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else {
      throw new Error('Invalid code point')
    }
  }

  return bytes
}

function asciiToBytes (str) {
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF)
  }
  return byteArray
}

function utf16leToBytes (str, units) {
  var c, hi, lo
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    if ((units -= 2) < 0) break

    c = str.charCodeAt(i)
    hi = c >> 8
    lo = c % 256
    byteArray.push(lo)
    byteArray.push(hi)
  }

  return byteArray
}

function base64ToBytes (str) {
  return base64.toByteArray(base64clean(str))
}

function blitBuffer (src, dst, offset, length) {
  for (var i = 0; i < length; ++i) {
    if ((i + offset >= dst.length) || (i >= src.length)) break
    dst[i + offset] = src[i]
  }
  return i
}

function isnan (val) {
  return val !== val // eslint-disable-line no-self-compare
}

},{"base64-js":"../../../../../usr/local/lib/node_modules/parcel-bundler/node_modules/base64-js/index.js","ieee754":"../../../../../usr/local/lib/node_modules/parcel-bundler/node_modules/ieee754/index.js","isarray":"../../../../../usr/local/lib/node_modules/parcel-bundler/node_modules/isarray/index.js","buffer":"../../../../../usr/local/lib/node_modules/parcel-bundler/node_modules/buffer/index.js"}],"node_modules/axios/lib/helpers/toFormData.js":[function(require,module,exports) {
var Buffer = require("buffer").Buffer;
'use strict';

var utils = require('../utils');

/**
 * Convert a data object to FormData
 * @param {Object} obj
 * @param {?Object} [formData]
 * @returns {Object}
 **/

function toFormData(obj, formData) {
  // eslint-disable-next-line no-param-reassign
  formData = formData || new FormData();

  var stack = [];

  function convertValue(value) {
    if (value === null) return '';

    if (utils.isDate(value)) {
      return value.toISOString();
    }

    if (utils.isArrayBuffer(value) || utils.isTypedArray(value)) {
      return typeof Blob === 'function' ? new Blob([value]) : Buffer.from(value);
    }

    return value;
  }

  function build(data, parentKey) {
    if (utils.isPlainObject(data) || utils.isArray(data)) {
      if (stack.indexOf(data) !== -1) {
        throw Error('Circular reference detected in ' + parentKey);
      }

      stack.push(data);

      utils.forEach(data, function each(value, key) {
        if (utils.isUndefined(value)) return;
        var fullKey = parentKey ? parentKey + '.' + key : key;
        var arr;

        if (value && !parentKey && typeof value === 'object') {
          if (utils.endsWith(key, '{}')) {
            // eslint-disable-next-line no-param-reassign
            value = JSON.stringify(value);
          } else if (utils.endsWith(key, '[]') && (arr = utils.toArray(value))) {
            // eslint-disable-next-line func-names
            arr.forEach(function(el) {
              !utils.isUndefined(el) && formData.append(fullKey, convertValue(el));
            });
            return;
          }
        }

        build(value, fullKey);
      });

      stack.pop();
    } else {
      formData.append(parentKey, convertValue(data));
    }
  }

  build(obj);

  return formData;
}

module.exports = toFormData;

},{"../utils":"node_modules/axios/lib/utils.js","buffer":"../../../../../usr/local/lib/node_modules/parcel-bundler/node_modules/buffer/index.js"}],"node_modules/axios/lib/core/settle.js":[function(require,module,exports) {
'use strict';

var AxiosError = require('./AxiosError');

/**
 * Resolve or reject a Promise based on response status.
 *
 * @param {Function} resolve A function that resolves the promise.
 * @param {Function} reject A function that rejects the promise.
 * @param {object} response The response.
 */
module.exports = function settle(resolve, reject, response) {
  var validateStatus = response.config.validateStatus;
  if (!response.status || !validateStatus || validateStatus(response.status)) {
    resolve(response);
  } else {
    reject(new AxiosError(
      'Request failed with status code ' + response.status,
      [AxiosError.ERR_BAD_REQUEST, AxiosError.ERR_BAD_RESPONSE][Math.floor(response.status / 100) - 4],
      response.config,
      response.request,
      response
    ));
  }
};

},{"./AxiosError":"node_modules/axios/lib/core/AxiosError.js"}],"node_modules/axios/lib/helpers/cookies.js":[function(require,module,exports) {
'use strict';

var utils = require('./../utils');

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs support document.cookie
    (function standardBrowserEnv() {
      return {
        write: function write(name, value, expires, path, domain, secure) {
          var cookie = [];
          cookie.push(name + '=' + encodeURIComponent(value));

          if (utils.isNumber(expires)) {
            cookie.push('expires=' + new Date(expires).toGMTString());
          }

          if (utils.isString(path)) {
            cookie.push('path=' + path);
          }

          if (utils.isString(domain)) {
            cookie.push('domain=' + domain);
          }

          if (secure === true) {
            cookie.push('secure');
          }

          document.cookie = cookie.join('; ');
        },

        read: function read(name) {
          var match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
          return (match ? decodeURIComponent(match[3]) : null);
        },

        remove: function remove(name) {
          this.write(name, '', Date.now() - 86400000);
        }
      };
    })() :

  // Non standard browser env (web workers, react-native) lack needed support.
    (function nonStandardBrowserEnv() {
      return {
        write: function write() {},
        read: function read() { return null; },
        remove: function remove() {}
      };
    })()
);

},{"./../utils":"node_modules/axios/lib/utils.js"}],"node_modules/axios/lib/helpers/isAbsoluteURL.js":[function(require,module,exports) {
'use strict';

/**
 * Determines whether the specified URL is absolute
 *
 * @param {string} url The URL to test
 * @returns {boolean} True if the specified URL is absolute, otherwise false
 */
module.exports = function isAbsoluteURL(url) {
  // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
  // by any combination of letters, digits, plus, period, or hyphen.
  return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(url);
};

},{}],"node_modules/axios/lib/helpers/combineURLs.js":[function(require,module,exports) {
'use strict';

/**
 * Creates a new URL by combining the specified URLs
 *
 * @param {string} baseURL The base URL
 * @param {string} relativeURL The relative URL
 * @returns {string} The combined URL
 */
module.exports = function combineURLs(baseURL, relativeURL) {
  return relativeURL
    ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '')
    : baseURL;
};

},{}],"node_modules/axios/lib/core/buildFullPath.js":[function(require,module,exports) {
'use strict';

var isAbsoluteURL = require('../helpers/isAbsoluteURL');
var combineURLs = require('../helpers/combineURLs');

/**
 * Creates a new URL by combining the baseURL with the requestedURL,
 * only when the requestedURL is not already an absolute URL.
 * If the requestURL is absolute, this function returns the requestedURL untouched.
 *
 * @param {string} baseURL The base URL
 * @param {string} requestedURL Absolute or relative URL to combine
 * @returns {string} The combined full path
 */
module.exports = function buildFullPath(baseURL, requestedURL) {
  if (baseURL && !isAbsoluteURL(requestedURL)) {
    return combineURLs(baseURL, requestedURL);
  }
  return requestedURL;
};

},{"../helpers/isAbsoluteURL":"node_modules/axios/lib/helpers/isAbsoluteURL.js","../helpers/combineURLs":"node_modules/axios/lib/helpers/combineURLs.js"}],"node_modules/axios/lib/helpers/parseHeaders.js":[function(require,module,exports) {
'use strict';

var utils = require('./../utils');

// Headers whose duplicates are ignored by node
// c.f. https://nodejs.org/api/http.html#http_message_headers
var ignoreDuplicateOf = [
  'age', 'authorization', 'content-length', 'content-type', 'etag',
  'expires', 'from', 'host', 'if-modified-since', 'if-unmodified-since',
  'last-modified', 'location', 'max-forwards', 'proxy-authorization',
  'referer', 'retry-after', 'user-agent'
];

/**
 * Parse headers into an object
 *
 * ```
 * Date: Wed, 27 Aug 2014 08:58:49 GMT
 * Content-Type: application/json
 * Connection: keep-alive
 * Transfer-Encoding: chunked
 * ```
 *
 * @param {String} headers Headers needing to be parsed
 * @returns {Object} Headers parsed into an object
 */
module.exports = function parseHeaders(headers) {
  var parsed = {};
  var key;
  var val;
  var i;

  if (!headers) { return parsed; }

  utils.forEach(headers.split('\n'), function parser(line) {
    i = line.indexOf(':');
    key = utils.trim(line.substr(0, i)).toLowerCase();
    val = utils.trim(line.substr(i + 1));

    if (key) {
      if (parsed[key] && ignoreDuplicateOf.indexOf(key) >= 0) {
        return;
      }
      if (key === 'set-cookie') {
        parsed[key] = (parsed[key] ? parsed[key] : []).concat([val]);
      } else {
        parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
      }
    }
  });

  return parsed;
};

},{"./../utils":"node_modules/axios/lib/utils.js"}],"node_modules/axios/lib/helpers/isURLSameOrigin.js":[function(require,module,exports) {
'use strict';

var utils = require('./../utils');

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs have full support of the APIs needed to test
  // whether the request URL is of the same origin as current location.
    (function standardBrowserEnv() {
      var msie = /(msie|trident)/i.test(navigator.userAgent);
      var urlParsingNode = document.createElement('a');
      var originURL;

      /**
    * Parse a URL to discover it's components
    *
    * @param {String} url The URL to be parsed
    * @returns {Object}
    */
      function resolveURL(url) {
        var href = url;

        if (msie) {
        // IE needs attribute set twice to normalize properties
          urlParsingNode.setAttribute('href', href);
          href = urlParsingNode.href;
        }

        urlParsingNode.setAttribute('href', href);

        // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils
        return {
          href: urlParsingNode.href,
          protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
          host: urlParsingNode.host,
          search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
          hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
          hostname: urlParsingNode.hostname,
          port: urlParsingNode.port,
          pathname: (urlParsingNode.pathname.charAt(0) === '/') ?
            urlParsingNode.pathname :
            '/' + urlParsingNode.pathname
        };
      }

      originURL = resolveURL(window.location.href);

      /**
    * Determine if a URL shares the same origin as the current location
    *
    * @param {String} requestURL The URL to test
    * @returns {boolean} True if URL shares the same origin, otherwise false
    */
      return function isURLSameOrigin(requestURL) {
        var parsed = (utils.isString(requestURL)) ? resolveURL(requestURL) : requestURL;
        return (parsed.protocol === originURL.protocol &&
            parsed.host === originURL.host);
      };
    })() :

  // Non standard browser envs (web workers, react-native) lack needed support.
    (function nonStandardBrowserEnv() {
      return function isURLSameOrigin() {
        return true;
      };
    })()
);

},{"./../utils":"node_modules/axios/lib/utils.js"}],"node_modules/axios/lib/cancel/CanceledError.js":[function(require,module,exports) {
'use strict';

var AxiosError = require('../core/AxiosError');
var utils = require('../utils');

/**
 * A `CanceledError` is an object that is thrown when an operation is canceled.
 *
 * @class
 * @param {string=} message The message.
 */
function CanceledError(message) {
  // eslint-disable-next-line no-eq-null,eqeqeq
  AxiosError.call(this, message == null ? 'canceled' : message, AxiosError.ERR_CANCELED);
  this.name = 'CanceledError';
}

utils.inherits(CanceledError, AxiosError, {
  __CANCEL__: true
});

module.exports = CanceledError;

},{"../core/AxiosError":"node_modules/axios/lib/core/AxiosError.js","../utils":"node_modules/axios/lib/utils.js"}],"node_modules/axios/lib/helpers/parseProtocol.js":[function(require,module,exports) {
'use strict';

module.exports = function parseProtocol(url) {
  var match = /^([-+\w]{1,25})(:?\/\/|:)/.exec(url);
  return match && match[1] || '';
};

},{}],"node_modules/axios/lib/adapters/xhr.js":[function(require,module,exports) {
'use strict';

var utils = require('./../utils');
var settle = require('./../core/settle');
var cookies = require('./../helpers/cookies');
var buildURL = require('./../helpers/buildURL');
var buildFullPath = require('../core/buildFullPath');
var parseHeaders = require('./../helpers/parseHeaders');
var isURLSameOrigin = require('./../helpers/isURLSameOrigin');
var transitionalDefaults = require('../defaults/transitional');
var AxiosError = require('../core/AxiosError');
var CanceledError = require('../cancel/CanceledError');
var parseProtocol = require('../helpers/parseProtocol');

module.exports = function xhrAdapter(config) {
  return new Promise(function dispatchXhrRequest(resolve, reject) {
    var requestData = config.data;
    var requestHeaders = config.headers;
    var responseType = config.responseType;
    var onCanceled;
    function done() {
      if (config.cancelToken) {
        config.cancelToken.unsubscribe(onCanceled);
      }

      if (config.signal) {
        config.signal.removeEventListener('abort', onCanceled);
      }
    }

    if (utils.isFormData(requestData) && utils.isStandardBrowserEnv()) {
      delete requestHeaders['Content-Type']; // Let the browser set it
    }

    var request = new XMLHttpRequest();

    // HTTP basic authentication
    if (config.auth) {
      var username = config.auth.username || '';
      var password = config.auth.password ? unescape(encodeURIComponent(config.auth.password)) : '';
      requestHeaders.Authorization = 'Basic ' + btoa(username + ':' + password);
    }

    var fullPath = buildFullPath(config.baseURL, config.url);

    request.open(config.method.toUpperCase(), buildURL(fullPath, config.params, config.paramsSerializer), true);

    // Set the request timeout in MS
    request.timeout = config.timeout;

    function onloadend() {
      if (!request) {
        return;
      }
      // Prepare the response
      var responseHeaders = 'getAllResponseHeaders' in request ? parseHeaders(request.getAllResponseHeaders()) : null;
      var responseData = !responseType || responseType === 'text' ||  responseType === 'json' ?
        request.responseText : request.response;
      var response = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config: config,
        request: request
      };

      settle(function _resolve(value) {
        resolve(value);
        done();
      }, function _reject(err) {
        reject(err);
        done();
      }, response);

      // Clean up request
      request = null;
    }

    if ('onloadend' in request) {
      // Use onloadend if available
      request.onloadend = onloadend;
    } else {
      // Listen for ready state to emulate onloadend
      request.onreadystatechange = function handleLoad() {
        if (!request || request.readyState !== 4) {
          return;
        }

        // The request errored out and we didn't get a response, this will be
        // handled by onerror instead
        // With one exception: request that using file: protocol, most browsers
        // will return status as 0 even though it's a successful request
        if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
          return;
        }
        // readystate handler is calling before onerror or ontimeout handlers,
        // so we should call onloadend on the next 'tick'
        setTimeout(onloadend);
      };
    }

    // Handle browser request cancellation (as opposed to a manual cancellation)
    request.onabort = function handleAbort() {
      if (!request) {
        return;
      }

      reject(new AxiosError('Request aborted', AxiosError.ECONNABORTED, config, request));

      // Clean up request
      request = null;
    };

    // Handle low level network errors
    request.onerror = function handleError() {
      // Real errors are hidden from us by the browser
      // onerror should only fire if it's a network error
      reject(new AxiosError('Network Error', AxiosError.ERR_NETWORK, config, request, request));

      // Clean up request
      request = null;
    };

    // Handle timeout
    request.ontimeout = function handleTimeout() {
      var timeoutErrorMessage = config.timeout ? 'timeout of ' + config.timeout + 'ms exceeded' : 'timeout exceeded';
      var transitional = config.transitional || transitionalDefaults;
      if (config.timeoutErrorMessage) {
        timeoutErrorMessage = config.timeoutErrorMessage;
      }
      reject(new AxiosError(
        timeoutErrorMessage,
        transitional.clarifyTimeoutError ? AxiosError.ETIMEDOUT : AxiosError.ECONNABORTED,
        config,
        request));

      // Clean up request
      request = null;
    };

    // Add xsrf header
    // This is only done if running in a standard browser environment.
    // Specifically not if we're in a web worker, or react-native.
    if (utils.isStandardBrowserEnv()) {
      // Add xsrf header
      var xsrfValue = (config.withCredentials || isURLSameOrigin(fullPath)) && config.xsrfCookieName ?
        cookies.read(config.xsrfCookieName) :
        undefined;

      if (xsrfValue) {
        requestHeaders[config.xsrfHeaderName] = xsrfValue;
      }
    }

    // Add headers to the request
    if ('setRequestHeader' in request) {
      utils.forEach(requestHeaders, function setRequestHeader(val, key) {
        if (typeof requestData === 'undefined' && key.toLowerCase() === 'content-type') {
          // Remove Content-Type if data is undefined
          delete requestHeaders[key];
        } else {
          // Otherwise add header to the request
          request.setRequestHeader(key, val);
        }
      });
    }

    // Add withCredentials to request if needed
    if (!utils.isUndefined(config.withCredentials)) {
      request.withCredentials = !!config.withCredentials;
    }

    // Add responseType to request if needed
    if (responseType && responseType !== 'json') {
      request.responseType = config.responseType;
    }

    // Handle progress if needed
    if (typeof config.onDownloadProgress === 'function') {
      request.addEventListener('progress', config.onDownloadProgress);
    }

    // Not all browsers support upload events
    if (typeof config.onUploadProgress === 'function' && request.upload) {
      request.upload.addEventListener('progress', config.onUploadProgress);
    }

    if (config.cancelToken || config.signal) {
      // Handle cancellation
      // eslint-disable-next-line func-names
      onCanceled = function(cancel) {
        if (!request) {
          return;
        }
        reject(!cancel || (cancel && cancel.type) ? new CanceledError() : cancel);
        request.abort();
        request = null;
      };

      config.cancelToken && config.cancelToken.subscribe(onCanceled);
      if (config.signal) {
        config.signal.aborted ? onCanceled() : config.signal.addEventListener('abort', onCanceled);
      }
    }

    if (!requestData) {
      requestData = null;
    }

    var protocol = parseProtocol(fullPath);

    if (protocol && [ 'http', 'https', 'file' ].indexOf(protocol) === -1) {
      reject(new AxiosError('Unsupported protocol ' + protocol + ':', AxiosError.ERR_BAD_REQUEST, config));
      return;
    }


    // Send the request
    request.send(requestData);
  });
};

},{"./../utils":"node_modules/axios/lib/utils.js","./../core/settle":"node_modules/axios/lib/core/settle.js","./../helpers/cookies":"node_modules/axios/lib/helpers/cookies.js","./../helpers/buildURL":"node_modules/axios/lib/helpers/buildURL.js","../core/buildFullPath":"node_modules/axios/lib/core/buildFullPath.js","./../helpers/parseHeaders":"node_modules/axios/lib/helpers/parseHeaders.js","./../helpers/isURLSameOrigin":"node_modules/axios/lib/helpers/isURLSameOrigin.js","../defaults/transitional":"node_modules/axios/lib/defaults/transitional.js","../core/AxiosError":"node_modules/axios/lib/core/AxiosError.js","../cancel/CanceledError":"node_modules/axios/lib/cancel/CanceledError.js","../helpers/parseProtocol":"node_modules/axios/lib/helpers/parseProtocol.js"}],"node_modules/axios/lib/helpers/null.js":[function(require,module,exports) {
// eslint-disable-next-line strict
module.exports = null;

},{}],"../../../../../usr/local/lib/node_modules/parcel-bundler/node_modules/process/browser.js":[function(require,module,exports) {

// shim for using process in browser
var process = module.exports = {}; // cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
  throw new Error('setTimeout has not been defined');
}

function defaultClearTimeout() {
  throw new Error('clearTimeout has not been defined');
}

(function () {
  try {
    if (typeof setTimeout === 'function') {
      cachedSetTimeout = setTimeout;
    } else {
      cachedSetTimeout = defaultSetTimout;
    }
  } catch (e) {
    cachedSetTimeout = defaultSetTimout;
  }

  try {
    if (typeof clearTimeout === 'function') {
      cachedClearTimeout = clearTimeout;
    } else {
      cachedClearTimeout = defaultClearTimeout;
    }
  } catch (e) {
    cachedClearTimeout = defaultClearTimeout;
  }
})();

function runTimeout(fun) {
  if (cachedSetTimeout === setTimeout) {
    //normal enviroments in sane situations
    return setTimeout(fun, 0);
  } // if setTimeout wasn't available but was latter defined


  if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
    cachedSetTimeout = setTimeout;
    return setTimeout(fun, 0);
  }

  try {
    // when when somebody has screwed with setTimeout but no I.E. maddness
    return cachedSetTimeout(fun, 0);
  } catch (e) {
    try {
      // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
      return cachedSetTimeout.call(null, fun, 0);
    } catch (e) {
      // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
      return cachedSetTimeout.call(this, fun, 0);
    }
  }
}

function runClearTimeout(marker) {
  if (cachedClearTimeout === clearTimeout) {
    //normal enviroments in sane situations
    return clearTimeout(marker);
  } // if clearTimeout wasn't available but was latter defined


  if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
    cachedClearTimeout = clearTimeout;
    return clearTimeout(marker);
  }

  try {
    // when when somebody has screwed with setTimeout but no I.E. maddness
    return cachedClearTimeout(marker);
  } catch (e) {
    try {
      // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
      return cachedClearTimeout.call(null, marker);
    } catch (e) {
      // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
      // Some versions of I.E. have different rules for clearTimeout vs setTimeout
      return cachedClearTimeout.call(this, marker);
    }
  }
}

var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
  if (!draining || !currentQueue) {
    return;
  }

  draining = false;

  if (currentQueue.length) {
    queue = currentQueue.concat(queue);
  } else {
    queueIndex = -1;
  }

  if (queue.length) {
    drainQueue();
  }
}

function drainQueue() {
  if (draining) {
    return;
  }

  var timeout = runTimeout(cleanUpNextTick);
  draining = true;
  var len = queue.length;

  while (len) {
    currentQueue = queue;
    queue = [];

    while (++queueIndex < len) {
      if (currentQueue) {
        currentQueue[queueIndex].run();
      }
    }

    queueIndex = -1;
    len = queue.length;
  }

  currentQueue = null;
  draining = false;
  runClearTimeout(timeout);
}

process.nextTick = function (fun) {
  var args = new Array(arguments.length - 1);

  if (arguments.length > 1) {
    for (var i = 1; i < arguments.length; i++) {
      args[i - 1] = arguments[i];
    }
  }

  queue.push(new Item(fun, args));

  if (queue.length === 1 && !draining) {
    runTimeout(drainQueue);
  }
}; // v8 likes predictible objects


function Item(fun, array) {
  this.fun = fun;
  this.array = array;
}

Item.prototype.run = function () {
  this.fun.apply(null, this.array);
};

process.title = 'browser';
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues

process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) {
  return [];
};

process.binding = function (name) {
  throw new Error('process.binding is not supported');
};

process.cwd = function () {
  return '/';
};

process.chdir = function (dir) {
  throw new Error('process.chdir is not supported');
};

process.umask = function () {
  return 0;
};
},{}],"node_modules/axios/lib/defaults/index.js":[function(require,module,exports) {
var process = require("process");
'use strict';

var utils = require('../utils');
var normalizeHeaderName = require('../helpers/normalizeHeaderName');
var AxiosError = require('../core/AxiosError');
var transitionalDefaults = require('./transitional');
var toFormData = require('../helpers/toFormData');

var DEFAULT_CONTENT_TYPE = {
  'Content-Type': 'application/x-www-form-urlencoded'
};

function setContentTypeIfUnset(headers, value) {
  if (!utils.isUndefined(headers) && utils.isUndefined(headers['Content-Type'])) {
    headers['Content-Type'] = value;
  }
}

function getDefaultAdapter() {
  var adapter;
  if (typeof XMLHttpRequest !== 'undefined') {
    // For browsers use XHR adapter
    adapter = require('../adapters/xhr');
  } else if (typeof process !== 'undefined' && Object.prototype.toString.call(process) === '[object process]') {
    // For node use HTTP adapter
    adapter = require('../adapters/http');
  }
  return adapter;
}

function stringifySafely(rawValue, parser, encoder) {
  if (utils.isString(rawValue)) {
    try {
      (parser || JSON.parse)(rawValue);
      return utils.trim(rawValue);
    } catch (e) {
      if (e.name !== 'SyntaxError') {
        throw e;
      }
    }
  }

  return (encoder || JSON.stringify)(rawValue);
}

var defaults = {

  transitional: transitionalDefaults,

  adapter: getDefaultAdapter(),

  transformRequest: [function transformRequest(data, headers) {
    normalizeHeaderName(headers, 'Accept');
    normalizeHeaderName(headers, 'Content-Type');

    if (utils.isFormData(data) ||
      utils.isArrayBuffer(data) ||
      utils.isBuffer(data) ||
      utils.isStream(data) ||
      utils.isFile(data) ||
      utils.isBlob(data)
    ) {
      return data;
    }
    if (utils.isArrayBufferView(data)) {
      return data.buffer;
    }
    if (utils.isURLSearchParams(data)) {
      setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');
      return data.toString();
    }

    var isObjectPayload = utils.isObject(data);
    var contentType = headers && headers['Content-Type'];

    var isFileList;

    if ((isFileList = utils.isFileList(data)) || (isObjectPayload && contentType === 'multipart/form-data')) {
      var _FormData = this.env && this.env.FormData;
      return toFormData(isFileList ? {'files[]': data} : data, _FormData && new _FormData());
    } else if (isObjectPayload || contentType === 'application/json') {
      setContentTypeIfUnset(headers, 'application/json');
      return stringifySafely(data);
    }

    return data;
  }],

  transformResponse: [function transformResponse(data) {
    var transitional = this.transitional || defaults.transitional;
    var silentJSONParsing = transitional && transitional.silentJSONParsing;
    var forcedJSONParsing = transitional && transitional.forcedJSONParsing;
    var strictJSONParsing = !silentJSONParsing && this.responseType === 'json';

    if (strictJSONParsing || (forcedJSONParsing && utils.isString(data) && data.length)) {
      try {
        return JSON.parse(data);
      } catch (e) {
        if (strictJSONParsing) {
          if (e.name === 'SyntaxError') {
            throw AxiosError.from(e, AxiosError.ERR_BAD_RESPONSE, this, null, this.response);
          }
          throw e;
        }
      }
    }

    return data;
  }],

  /**
   * A timeout in milliseconds to abort a request. If set to 0 (default) a
   * timeout is not created.
   */
  timeout: 0,

  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',

  maxContentLength: -1,
  maxBodyLength: -1,

  env: {
    FormData: require('./env/FormData')
  },

  validateStatus: function validateStatus(status) {
    return status >= 200 && status < 300;
  },

  headers: {
    common: {
      'Accept': 'application/json, text/plain, */*'
    }
  }
};

utils.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {
  defaults.headers[method] = {};
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);
});

module.exports = defaults;

},{"../utils":"node_modules/axios/lib/utils.js","../helpers/normalizeHeaderName":"node_modules/axios/lib/helpers/normalizeHeaderName.js","../core/AxiosError":"node_modules/axios/lib/core/AxiosError.js","./transitional":"node_modules/axios/lib/defaults/transitional.js","../helpers/toFormData":"node_modules/axios/lib/helpers/toFormData.js","../adapters/xhr":"node_modules/axios/lib/adapters/xhr.js","../adapters/http":"node_modules/axios/lib/adapters/xhr.js","./env/FormData":"node_modules/axios/lib/helpers/null.js","process":"../../../../../usr/local/lib/node_modules/parcel-bundler/node_modules/process/browser.js"}],"node_modules/axios/lib/core/transformData.js":[function(require,module,exports) {
'use strict';

var utils = require('./../utils');
var defaults = require('../defaults');

/**
 * Transform the data for a request or a response
 *
 * @param {Object|String} data The data to be transformed
 * @param {Array} headers The headers for the request or response
 * @param {Array|Function} fns A single function or Array of functions
 * @returns {*} The resulting transformed data
 */
module.exports = function transformData(data, headers, fns) {
  var context = this || defaults;
  /*eslint no-param-reassign:0*/
  utils.forEach(fns, function transform(fn) {
    data = fn.call(context, data, headers);
  });

  return data;
};

},{"./../utils":"node_modules/axios/lib/utils.js","../defaults":"node_modules/axios/lib/defaults/index.js"}],"node_modules/axios/lib/cancel/isCancel.js":[function(require,module,exports) {
'use strict';

module.exports = function isCancel(value) {
  return !!(value && value.__CANCEL__);
};

},{}],"node_modules/axios/lib/core/dispatchRequest.js":[function(require,module,exports) {
'use strict';

var utils = require('./../utils');
var transformData = require('./transformData');
var isCancel = require('../cancel/isCancel');
var defaults = require('../defaults');
var CanceledError = require('../cancel/CanceledError');

/**
 * Throws a `CanceledError` if cancellation has been requested.
 */
function throwIfCancellationRequested(config) {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested();
  }

  if (config.signal && config.signal.aborted) {
    throw new CanceledError();
  }
}

/**
 * Dispatch a request to the server using the configured adapter.
 *
 * @param {object} config The config that is to be used for the request
 * @returns {Promise} The Promise to be fulfilled
 */
module.exports = function dispatchRequest(config) {
  throwIfCancellationRequested(config);

  // Ensure headers exist
  config.headers = config.headers || {};

  // Transform request data
  config.data = transformData.call(
    config,
    config.data,
    config.headers,
    config.transformRequest
  );

  // Flatten headers
  config.headers = utils.merge(
    config.headers.common || {},
    config.headers[config.method] || {},
    config.headers
  );

  utils.forEach(
    ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],
    function cleanHeaderConfig(method) {
      delete config.headers[method];
    }
  );

  var adapter = config.adapter || defaults.adapter;

  return adapter(config).then(function onAdapterResolution(response) {
    throwIfCancellationRequested(config);

    // Transform response data
    response.data = transformData.call(
      config,
      response.data,
      response.headers,
      config.transformResponse
    );

    return response;
  }, function onAdapterRejection(reason) {
    if (!isCancel(reason)) {
      throwIfCancellationRequested(config);

      // Transform response data
      if (reason && reason.response) {
        reason.response.data = transformData.call(
          config,
          reason.response.data,
          reason.response.headers,
          config.transformResponse
        );
      }
    }

    return Promise.reject(reason);
  });
};

},{"./../utils":"node_modules/axios/lib/utils.js","./transformData":"node_modules/axios/lib/core/transformData.js","../cancel/isCancel":"node_modules/axios/lib/cancel/isCancel.js","../defaults":"node_modules/axios/lib/defaults/index.js","../cancel/CanceledError":"node_modules/axios/lib/cancel/CanceledError.js"}],"node_modules/axios/lib/core/mergeConfig.js":[function(require,module,exports) {
'use strict';

var utils = require('../utils');

/**
 * Config-specific merge-function which creates a new config-object
 * by merging two configuration objects together.
 *
 * @param {Object} config1
 * @param {Object} config2
 * @returns {Object} New object resulting from merging config2 to config1
 */
module.exports = function mergeConfig(config1, config2) {
  // eslint-disable-next-line no-param-reassign
  config2 = config2 || {};
  var config = {};

  function getMergedValue(target, source) {
    if (utils.isPlainObject(target) && utils.isPlainObject(source)) {
      return utils.merge(target, source);
    } else if (utils.isPlainObject(source)) {
      return utils.merge({}, source);
    } else if (utils.isArray(source)) {
      return source.slice();
    }
    return source;
  }

  // eslint-disable-next-line consistent-return
  function mergeDeepProperties(prop) {
    if (!utils.isUndefined(config2[prop])) {
      return getMergedValue(config1[prop], config2[prop]);
    } else if (!utils.isUndefined(config1[prop])) {
      return getMergedValue(undefined, config1[prop]);
    }
  }

  // eslint-disable-next-line consistent-return
  function valueFromConfig2(prop) {
    if (!utils.isUndefined(config2[prop])) {
      return getMergedValue(undefined, config2[prop]);
    }
  }

  // eslint-disable-next-line consistent-return
  function defaultToConfig2(prop) {
    if (!utils.isUndefined(config2[prop])) {
      return getMergedValue(undefined, config2[prop]);
    } else if (!utils.isUndefined(config1[prop])) {
      return getMergedValue(undefined, config1[prop]);
    }
  }

  // eslint-disable-next-line consistent-return
  function mergeDirectKeys(prop) {
    if (prop in config2) {
      return getMergedValue(config1[prop], config2[prop]);
    } else if (prop in config1) {
      return getMergedValue(undefined, config1[prop]);
    }
  }

  var mergeMap = {
    'url': valueFromConfig2,
    'method': valueFromConfig2,
    'data': valueFromConfig2,
    'baseURL': defaultToConfig2,
    'transformRequest': defaultToConfig2,
    'transformResponse': defaultToConfig2,
    'paramsSerializer': defaultToConfig2,
    'timeout': defaultToConfig2,
    'timeoutMessage': defaultToConfig2,
    'withCredentials': defaultToConfig2,
    'adapter': defaultToConfig2,
    'responseType': defaultToConfig2,
    'xsrfCookieName': defaultToConfig2,
    'xsrfHeaderName': defaultToConfig2,
    'onUploadProgress': defaultToConfig2,
    'onDownloadProgress': defaultToConfig2,
    'decompress': defaultToConfig2,
    'maxContentLength': defaultToConfig2,
    'maxBodyLength': defaultToConfig2,
    'beforeRedirect': defaultToConfig2,
    'transport': defaultToConfig2,
    'httpAgent': defaultToConfig2,
    'httpsAgent': defaultToConfig2,
    'cancelToken': defaultToConfig2,
    'socketPath': defaultToConfig2,
    'responseEncoding': defaultToConfig2,
    'validateStatus': mergeDirectKeys
  };

  utils.forEach(Object.keys(config1).concat(Object.keys(config2)), function computeConfigValue(prop) {
    var merge = mergeMap[prop] || mergeDeepProperties;
    var configValue = merge(prop);
    (utils.isUndefined(configValue) && merge !== mergeDirectKeys) || (config[prop] = configValue);
  });

  return config;
};

},{"../utils":"node_modules/axios/lib/utils.js"}],"node_modules/axios/lib/env/data.js":[function(require,module,exports) {
module.exports = {
  "version": "0.27.2"
};
},{}],"node_modules/axios/lib/helpers/validator.js":[function(require,module,exports) {
'use strict';

var VERSION = require('../env/data').version;
var AxiosError = require('../core/AxiosError');

var validators = {};

// eslint-disable-next-line func-names
['object', 'boolean', 'number', 'function', 'string', 'symbol'].forEach(function(type, i) {
  validators[type] = function validator(thing) {
    return typeof thing === type || 'a' + (i < 1 ? 'n ' : ' ') + type;
  };
});

var deprecatedWarnings = {};

/**
 * Transitional option validator
 * @param {function|boolean?} validator - set to false if the transitional option has been removed
 * @param {string?} version - deprecated version / removed since version
 * @param {string?} message - some message with additional info
 * @returns {function}
 */
validators.transitional = function transitional(validator, version, message) {
  function formatMessage(opt, desc) {
    return '[Axios v' + VERSION + '] Transitional option \'' + opt + '\'' + desc + (message ? '. ' + message : '');
  }

  // eslint-disable-next-line func-names
  return function(value, opt, opts) {
    if (validator === false) {
      throw new AxiosError(
        formatMessage(opt, ' has been removed' + (version ? ' in ' + version : '')),
        AxiosError.ERR_DEPRECATED
      );
    }

    if (version && !deprecatedWarnings[opt]) {
      deprecatedWarnings[opt] = true;
      // eslint-disable-next-line no-console
      console.warn(
        formatMessage(
          opt,
          ' has been deprecated since v' + version + ' and will be removed in the near future'
        )
      );
    }

    return validator ? validator(value, opt, opts) : true;
  };
};

/**
 * Assert object's properties type
 * @param {object} options
 * @param {object} schema
 * @param {boolean?} allowUnknown
 */

function assertOptions(options, schema, allowUnknown) {
  if (typeof options !== 'object') {
    throw new AxiosError('options must be an object', AxiosError.ERR_BAD_OPTION_VALUE);
  }
  var keys = Object.keys(options);
  var i = keys.length;
  while (i-- > 0) {
    var opt = keys[i];
    var validator = schema[opt];
    if (validator) {
      var value = options[opt];
      var result = value === undefined || validator(value, opt, options);
      if (result !== true) {
        throw new AxiosError('option ' + opt + ' must be ' + result, AxiosError.ERR_BAD_OPTION_VALUE);
      }
      continue;
    }
    if (allowUnknown !== true) {
      throw new AxiosError('Unknown option ' + opt, AxiosError.ERR_BAD_OPTION);
    }
  }
}

module.exports = {
  assertOptions: assertOptions,
  validators: validators
};

},{"../env/data":"node_modules/axios/lib/env/data.js","../core/AxiosError":"node_modules/axios/lib/core/AxiosError.js"}],"node_modules/axios/lib/core/Axios.js":[function(require,module,exports) {
'use strict';

var utils = require('./../utils');
var buildURL = require('../helpers/buildURL');
var InterceptorManager = require('./InterceptorManager');
var dispatchRequest = require('./dispatchRequest');
var mergeConfig = require('./mergeConfig');
var buildFullPath = require('./buildFullPath');
var validator = require('../helpers/validator');

var validators = validator.validators;
/**
 * Create a new instance of Axios
 *
 * @param {Object} instanceConfig The default config for the instance
 */
function Axios(instanceConfig) {
  this.defaults = instanceConfig;
  this.interceptors = {
    request: new InterceptorManager(),
    response: new InterceptorManager()
  };
}

/**
 * Dispatch a request
 *
 * @param {Object} config The config specific for this request (merged with this.defaults)
 */
Axios.prototype.request = function request(configOrUrl, config) {
  /*eslint no-param-reassign:0*/
  // Allow for axios('example/url'[, config]) a la fetch API
  if (typeof configOrUrl === 'string') {
    config = config || {};
    config.url = configOrUrl;
  } else {
    config = configOrUrl || {};
  }

  config = mergeConfig(this.defaults, config);

  // Set config.method
  if (config.method) {
    config.method = config.method.toLowerCase();
  } else if (this.defaults.method) {
    config.method = this.defaults.method.toLowerCase();
  } else {
    config.method = 'get';
  }

  var transitional = config.transitional;

  if (transitional !== undefined) {
    validator.assertOptions(transitional, {
      silentJSONParsing: validators.transitional(validators.boolean),
      forcedJSONParsing: validators.transitional(validators.boolean),
      clarifyTimeoutError: validators.transitional(validators.boolean)
    }, false);
  }

  // filter out skipped interceptors
  var requestInterceptorChain = [];
  var synchronousRequestInterceptors = true;
  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
    if (typeof interceptor.runWhen === 'function' && interceptor.runWhen(config) === false) {
      return;
    }

    synchronousRequestInterceptors = synchronousRequestInterceptors && interceptor.synchronous;

    requestInterceptorChain.unshift(interceptor.fulfilled, interceptor.rejected);
  });

  var responseInterceptorChain = [];
  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
    responseInterceptorChain.push(interceptor.fulfilled, interceptor.rejected);
  });

  var promise;

  if (!synchronousRequestInterceptors) {
    var chain = [dispatchRequest, undefined];

    Array.prototype.unshift.apply(chain, requestInterceptorChain);
    chain = chain.concat(responseInterceptorChain);

    promise = Promise.resolve(config);
    while (chain.length) {
      promise = promise.then(chain.shift(), chain.shift());
    }

    return promise;
  }


  var newConfig = config;
  while (requestInterceptorChain.length) {
    var onFulfilled = requestInterceptorChain.shift();
    var onRejected = requestInterceptorChain.shift();
    try {
      newConfig = onFulfilled(newConfig);
    } catch (error) {
      onRejected(error);
      break;
    }
  }

  try {
    promise = dispatchRequest(newConfig);
  } catch (error) {
    return Promise.reject(error);
  }

  while (responseInterceptorChain.length) {
    promise = promise.then(responseInterceptorChain.shift(), responseInterceptorChain.shift());
  }

  return promise;
};

Axios.prototype.getUri = function getUri(config) {
  config = mergeConfig(this.defaults, config);
  var fullPath = buildFullPath(config.baseURL, config.url);
  return buildURL(fullPath, config.params, config.paramsSerializer);
};

// Provide aliases for supported request methods
utils.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, config) {
    return this.request(mergeConfig(config || {}, {
      method: method,
      url: url,
      data: (config || {}).data
    }));
  };
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  /*eslint func-names:0*/

  function generateHTTPMethod(isForm) {
    return function httpMethod(url, data, config) {
      return this.request(mergeConfig(config || {}, {
        method: method,
        headers: isForm ? {
          'Content-Type': 'multipart/form-data'
        } : {},
        url: url,
        data: data
      }));
    };
  }

  Axios.prototype[method] = generateHTTPMethod();

  Axios.prototype[method + 'Form'] = generateHTTPMethod(true);
});

module.exports = Axios;

},{"./../utils":"node_modules/axios/lib/utils.js","../helpers/buildURL":"node_modules/axios/lib/helpers/buildURL.js","./InterceptorManager":"node_modules/axios/lib/core/InterceptorManager.js","./dispatchRequest":"node_modules/axios/lib/core/dispatchRequest.js","./mergeConfig":"node_modules/axios/lib/core/mergeConfig.js","./buildFullPath":"node_modules/axios/lib/core/buildFullPath.js","../helpers/validator":"node_modules/axios/lib/helpers/validator.js"}],"node_modules/axios/lib/cancel/CancelToken.js":[function(require,module,exports) {
'use strict';

var CanceledError = require('./CanceledError');

/**
 * A `CancelToken` is an object that can be used to request cancellation of an operation.
 *
 * @class
 * @param {Function} executor The executor function.
 */
function CancelToken(executor) {
  if (typeof executor !== 'function') {
    throw new TypeError('executor must be a function.');
  }

  var resolvePromise;

  this.promise = new Promise(function promiseExecutor(resolve) {
    resolvePromise = resolve;
  });

  var token = this;

  // eslint-disable-next-line func-names
  this.promise.then(function(cancel) {
    if (!token._listeners) return;

    var i;
    var l = token._listeners.length;

    for (i = 0; i < l; i++) {
      token._listeners[i](cancel);
    }
    token._listeners = null;
  });

  // eslint-disable-next-line func-names
  this.promise.then = function(onfulfilled) {
    var _resolve;
    // eslint-disable-next-line func-names
    var promise = new Promise(function(resolve) {
      token.subscribe(resolve);
      _resolve = resolve;
    }).then(onfulfilled);

    promise.cancel = function reject() {
      token.unsubscribe(_resolve);
    };

    return promise;
  };

  executor(function cancel(message) {
    if (token.reason) {
      // Cancellation has already been requested
      return;
    }

    token.reason = new CanceledError(message);
    resolvePromise(token.reason);
  });
}

/**
 * Throws a `CanceledError` if cancellation has been requested.
 */
CancelToken.prototype.throwIfRequested = function throwIfRequested() {
  if (this.reason) {
    throw this.reason;
  }
};

/**
 * Subscribe to the cancel signal
 */

CancelToken.prototype.subscribe = function subscribe(listener) {
  if (this.reason) {
    listener(this.reason);
    return;
  }

  if (this._listeners) {
    this._listeners.push(listener);
  } else {
    this._listeners = [listener];
  }
};

/**
 * Unsubscribe from the cancel signal
 */

CancelToken.prototype.unsubscribe = function unsubscribe(listener) {
  if (!this._listeners) {
    return;
  }
  var index = this._listeners.indexOf(listener);
  if (index !== -1) {
    this._listeners.splice(index, 1);
  }
};

/**
 * Returns an object that contains a new `CancelToken` and a function that, when called,
 * cancels the `CancelToken`.
 */
CancelToken.source = function source() {
  var cancel;
  var token = new CancelToken(function executor(c) {
    cancel = c;
  });
  return {
    token: token,
    cancel: cancel
  };
};

module.exports = CancelToken;

},{"./CanceledError":"node_modules/axios/lib/cancel/CanceledError.js"}],"node_modules/axios/lib/helpers/spread.js":[function(require,module,exports) {
'use strict';

/**
 * Syntactic sugar for invoking a function and expanding an array for arguments.
 *
 * Common use case would be to use `Function.prototype.apply`.
 *
 *  ```js
 *  function f(x, y, z) {}
 *  var args = [1, 2, 3];
 *  f.apply(null, args);
 *  ```
 *
 * With `spread` this example can be re-written.
 *
 *  ```js
 *  spread(function(x, y, z) {})([1, 2, 3]);
 *  ```
 *
 * @param {Function} callback
 * @returns {Function}
 */
module.exports = function spread(callback) {
  return function wrap(arr) {
    return callback.apply(null, arr);
  };
};

},{}],"node_modules/axios/lib/helpers/isAxiosError.js":[function(require,module,exports) {
'use strict';

var utils = require('./../utils');

/**
 * Determines whether the payload is an error thrown by Axios
 *
 * @param {*} payload The value to test
 * @returns {boolean} True if the payload is an error thrown by Axios, otherwise false
 */
module.exports = function isAxiosError(payload) {
  return utils.isObject(payload) && (payload.isAxiosError === true);
};

},{"./../utils":"node_modules/axios/lib/utils.js"}],"node_modules/axios/lib/axios.js":[function(require,module,exports) {
'use strict';

var utils = require('./utils');
var bind = require('./helpers/bind');
var Axios = require('./core/Axios');
var mergeConfig = require('./core/mergeConfig');
var defaults = require('./defaults');

/**
 * Create an instance of Axios
 *
 * @param {Object} defaultConfig The default config for the instance
 * @return {Axios} A new instance of Axios
 */
function createInstance(defaultConfig) {
  var context = new Axios(defaultConfig);
  var instance = bind(Axios.prototype.request, context);

  // Copy axios.prototype to instance
  utils.extend(instance, Axios.prototype, context);

  // Copy context to instance
  utils.extend(instance, context);

  // Factory for creating new instances
  instance.create = function create(instanceConfig) {
    return createInstance(mergeConfig(defaultConfig, instanceConfig));
  };

  return instance;
}

// Create the default instance to be exported
var axios = createInstance(defaults);

// Expose Axios class to allow class inheritance
axios.Axios = Axios;

// Expose Cancel & CancelToken
axios.CanceledError = require('./cancel/CanceledError');
axios.CancelToken = require('./cancel/CancelToken');
axios.isCancel = require('./cancel/isCancel');
axios.VERSION = require('./env/data').version;
axios.toFormData = require('./helpers/toFormData');

// Expose AxiosError class
axios.AxiosError = require('../lib/core/AxiosError');

// alias for CanceledError for backward compatibility
axios.Cancel = axios.CanceledError;

// Expose all/spread
axios.all = function all(promises) {
  return Promise.all(promises);
};
axios.spread = require('./helpers/spread');

// Expose isAxiosError
axios.isAxiosError = require('./helpers/isAxiosError');

module.exports = axios;

// Allow use of default import syntax in TypeScript
module.exports.default = axios;

},{"./utils":"node_modules/axios/lib/utils.js","./helpers/bind":"node_modules/axios/lib/helpers/bind.js","./core/Axios":"node_modules/axios/lib/core/Axios.js","./core/mergeConfig":"node_modules/axios/lib/core/mergeConfig.js","./defaults":"node_modules/axios/lib/defaults/index.js","./cancel/CanceledError":"node_modules/axios/lib/cancel/CanceledError.js","./cancel/CancelToken":"node_modules/axios/lib/cancel/CancelToken.js","./cancel/isCancel":"node_modules/axios/lib/cancel/isCancel.js","./env/data":"node_modules/axios/lib/env/data.js","./helpers/toFormData":"node_modules/axios/lib/helpers/toFormData.js","../lib/core/AxiosError":"node_modules/axios/lib/core/AxiosError.js","./helpers/spread":"node_modules/axios/lib/helpers/spread.js","./helpers/isAxiosError":"node_modules/axios/lib/helpers/isAxiosError.js"}],"node_modules/axios/index.js":[function(require,module,exports) {
module.exports = require('./lib/axios');
},{"./lib/axios":"node_modules/axios/lib/axios.js"}],"src/models/ApiSync.ts":[function(require,module,exports) {
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ApiSync = void 0;

var axios_1 = __importDefault(require("axios"));

var ApiSync = /*#__PURE__*/function () {
  function ApiSync(resource) {
    _classCallCheck(this, ApiSync);

    this.resource = resource;
    this.rootUrl = 'http://localhost:3000';
  }

  _createClass(ApiSync, [{
    key: "fetch",
    value: function fetch(id) {
      return axios_1.default.get("".concat(this.rootUrl, "/").concat(this.resource, "/").concat(id));
    }
  }, {
    key: "save",
    value: function save(data) {
      return axios_1.default.post("".concat(this.rootUrl, "/").concat(this.resource), data);
    }
  }]);

  return ApiSync;
}();

exports.ApiSync = ApiSync;
},{"axios":"node_modules/axios/index.js"}],"src/models/Attributes.ts":[function(require,module,exports) {
"use strict";

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Attributes = void 0;

var Attributes = /*#__PURE__*/_createClass(function Attributes(data) {
  var _this = this;

  _classCallCheck(this, Attributes);

  this.data = data;

  this.get = function (key) {
    return _this.data[key];
  };

  this.set = function (updateData) {
    Object.assign(_this.data, updateData);
  };

  this.setProp = function (key, value) {
    _this.data[key] = value;
  };

  this.getAll = function () {
    return _this.data;
  };
});

exports.Attributes = Attributes;
},{}],"src/models/Events.ts":[function(require,module,exports) {
"use strict";

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Events = void 0;

var Events = /*#__PURE__*/_createClass(function Events() {
  var _this = this;

  _classCallCheck(this, Events);

  this.events = {};

  this.on = function (eventName, callback) {
    var handlers = _this.events[eventName] || [];
    handlers.push(callback);
    _this.events[eventName] = handlers;
  };

  this.trigger = function (eventName) {
    var handlers = _this.events[eventName] || [];

    if (!handlers || handlers.length === 0) {
      return;
    }

    handlers.forEach(function (callback) {
      return callback();
    });
  };
});

exports.Events = Events;
},{}],"src/models/Model.ts":[function(require,module,exports) {
"use strict";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Model = void 0;

var Model = /*#__PURE__*/function () {
  function Model(attrs, events, sync) {
    _classCallCheck(this, Model);

    this.attrs = attrs;
    this.events = events;
    this.sync = sync;
    this.on = this.events.on;
    this.trigger = this.events.trigger;
    this.get = this.attrs.get;
  }

  _createClass(Model, [{
    key: "set",
    value: function set(update) {
      this.attrs.set(update);
      this.events.trigger('change');
    }
  }, {
    key: "setProp",
    value: function setProp(key, value) {
      this.attrs.set(Object.assign(Object.assign({}, this.attrs.getAll()), _defineProperty({}, key, value)));
      this.events.trigger('change');
    }
  }, {
    key: "fetch",
    value: function fetch() {// const id = this.get('id');
      // if (typeof id !== 'number') {
      //   throw new Error('User must have an id');
      // }
      // this.sync.fetch(id).then((response: AxiosResponse): void => {
      //   this.set(response.data);
      // });
    }
  }, {
    key: "save",
    value: function save() {
      var _this = this;

      this.sync.save(this.attrs.getAll()).then(function (response) {
        _this.trigger('save');
      }).catch(function () {
        _this.trigger('error');
      });
    }
  }]);

  return Model;
}();

exports.Model = Model;
},{}],"src/models/Game.ts":[function(require,module,exports) {
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Game = void 0;

var ApiSync_1 = require("./ApiSync");

var Attributes_1 = require("./Attributes");

var Events_1 = require("./Events");

var Model_1 = require("./Model");

var Game = /*#__PURE__*/function (_Model_1$Model) {
  _inherits(Game, _Model_1$Model);

  var _super = _createSuper(Game);

  function Game() {
    _classCallCheck(this, Game);

    return _super.apply(this, arguments);
  }

  _createClass(Game, null, [{
    key: "build",
    value: function build(attrs) {
      return new Game(new Attributes_1.Attributes(attrs), new Events_1.Events(), new ApiSync_1.ApiSync('games'));
    }
  }]);

  return Game;
}(Model_1.Model);

exports.Game = Game;
},{"./ApiSync":"src/models/ApiSync.ts","./Attributes":"src/models/Attributes.ts","./Events":"src/models/Events.ts","./Model":"src/models/Model.ts"}],"src/utils/enum.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Type = exports.Language = exports.Level = void 0;
var Level;

(function (Level) {
  Level[Level["Easy"] = 30] = "Easy";
  Level[Level["Medium"] = 20] = "Medium";
  Level[Level["Hard"] = 10] = "Hard";
})(Level = exports.Level || (exports.Level = {}));

var Language;

(function (Language) {
  Language["English"] = "en-US";
  Language["Turkish"] = "tr-TR";
})(Language = exports.Language || (exports.Language = {}));

var Type;

(function (Type) {
  Type[Type["Computer"] = 0] = "Computer";
  Type[Type["User"] = 1] = "User";
})(Type = exports.Type || (exports.Type = {}));
},{}],"src/views/View.ts":[function(require,module,exports) {
"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.View = void 0;

var View = /*#__PURE__*/function () {
  function View(parent, model) {
    _classCallCheck(this, View);

    this.parent = parent;
    this.model = model;
    this.regions = {};
    this.bindModel();
  }

  _createClass(View, [{
    key: "regionsMap",
    value: function regionsMap() {
      return {};
    }
  }, {
    key: "eventsMap",
    value: function eventsMap() {
      return {};
    }
  }, {
    key: "bindModel",
    value: function bindModel() {// this.model.on('change', () => {
      //   this.render();
      // });
    }
  }, {
    key: "bindEvents",
    value: function bindEvents(fragment) {
      var eventsMap = this.eventsMap();

      var _loop = function _loop(eventName) {
        var _eventName$split = eventName.split(':'),
            _eventName$split2 = _slicedToArray(_eventName$split, 2),
            eventType = _eventName$split2[0],
            selector = _eventName$split2[1];

        fragment.querySelectorAll(selector).forEach(function (element) {
          element.addEventListener(eventType, eventsMap[eventName]);
        });
      };

      for (var eventName in eventsMap) {
        _loop(eventName);
      }
    }
  }, {
    key: "mapRegions",
    value: function mapRegions(fragment) {
      var regionsMap = this.regionsMap();

      for (var key in regionsMap) {
        var selector = regionsMap[key];
        var element = fragment.querySelector(selector);

        if (element) {
          this.regions[key] = element;
        }
      }
    }
  }, {
    key: "onRender",
    value: function onRender() {}
  }, {
    key: "render",
    value: function render() {
      this.parent.innerHTML = '';
      var templateElement = document.createElement('template');
      templateElement.innerHTML = this.template();
      this.bindEvents(templateElement.content);
      this.mapRegions(templateElement.content);
      this.onRender();
      this.parent.append(templateElement.content);
    }
  }]);

  return View;
}();

exports.View = View;
},{}],"data/names.json":[function(require,module,exports) {
module.exports = ["aba", "abaca", "abacan", "abaç", "abay", "abayhan", "abaza", "abbas", "abdal", "abdi", "abdullah", "abdurrahman", "abdülâlim", "abdülazim", "abdülaziz", "abdülbaki", "abdülbari", "abdülbasir", "abdülbasit", "abdülcabbar", "abdülcebbar", "abdülcelil", "abdülcemal", "abdülcevat", "abdülezel", "abdülferit", "abdülfettah", "abdülgaffar", "abdülgaffur", "abdülgafur", "abdülgani", "abdülhadi", "abdülhak", "abdülhakim", "abdülhalik", "abdülhalim", "abdülhamit", "abdülkadir", "abdülkahhar", "abdülkerim", "abdüllâtif", "abdülmecit", "abdülmelik", "abdülmennan", "abdülmetin", "abdülnasır", "abdülvahap", "abdülvahit", "abdürrahim", "abdürrahman", "abdürrauf", "abdürreşit", "abdürrezzak", "abdüssamet", "abdüssami", "abdüsselâm", "abdüssemi", "abdüssettar", "abdüzzeki", "abgül", "abher", "abıhayat", "abır", "abıru", "abid", "abide", "abidin", "abil", "abir", "abit", "abiye", "ablak", "abraş", "abruy", "abuşka", "abuzer", "abuzettin", "acabay", "acabey", "ağabay", "ağcabey", "akabay", "akabey", "akçabay", "alabaş", "alabay", "alabegim", "alabegüm", "alabezek", "almabanu", "anabacı", "anabörü", "atabay", "atabek", "atabey", "atabörü", "ayaba", "babacan", "babaç", "babayiğit", "babür", "babürşah", "balaban", "cabbar", "cabir", "çaba", "çabar", "farabi", "gültab", "hicabi", "isabet", "kabadayı", "kaban", "kabil", "kamertab", "karabaş", "karabatak", "karabay", "karabet", "karabey", "karaboğa", "karabörü", "karabudun", "karabuğday", "karabuğra", "karabulut", "karabükey", "karacabey", "kayrabay", "kocabaş", "kocabey", "mehabet", "muhabbet", "nabi", "nabia", "nabiye", "necabet", "necabettin", "nursabah", "nuşabe", "olcabay", "rabbani", "rabi", "rabia", "rabih", "saba", "sabah", "sabahat", "sabahattin", "sabahnur", "sabar", "sabbar", "sabıka", "sabır", "sabih", "sabiha", "sabir", "sabire", "sabit", "sabite", "sabiye", "sabri", "sabrinnisa", "sabriye", "sabur", "sabutay", "sahabi", "sarıcabay", "şaban", "şahabettin", "tabende", "tabgaç", "türabi", "yabalak", "yaban", "yabar", "yabgu", "yabız", "yalabuk", "yalazabay", "zabit", "zeynelabidin", "aca", "acahan", "acar", "acaralp", "acarbegüm", "acarbey", "acarbike", "acarbüke", "acarer", "acarhatun", "acarkan", "acarkatun", "acarman", "acaröz", "acarsoy", "acartürk", "acatay", "acıdaş", "aclan", "acun", "acunal", "acunalan", "acunalp", "acunbegim", "acunbegüm", "acunbike", "acunbüke", "acuner", "acungüneş", "acunışık", "acunman", "acunseven", "aça", "açalya", "açangül", "açelya", "açıkalın", "açıkel", "açıker", "açıkgün", "açıl", "açılay", "açine", "açkıngül", "adahan", "adak", "adal", "adalan", "adalet", "adalettin", "adam", "adamış", "adanan", "adanır", "adar", "adarkan", "adasal", "adaş", "aday", "adeviye", "adıbelli", "adıgün", "adıgüzel", "adın", "adısanlı", "adısönmez", "adışah", "adıvar", "adıyahşi", "adıyaman", "adil", "adile", "adilhan", "adlan", "adlı", "adlığ", "adli", "adnan", "adni", "adniye", "adsız", "adsoy", "adviye", "afacan", "afak", "afer", "afet", "affan", "afi", "afif", "afife", "afitap", "afiye", "afiyet", "afra", "afşar", "afşin", "agâh", "agil", "aguş", "ağa", "ağacan", "ağahan", "ağahanım", "ağahatun", "ağakan", "ağakatun", "ağan", "ağanbegim", "ağanbegüm", "ağanbike", "ağanbüke", "ağaner", "ağaoğlu", "ağar", "ağarantan", "ağaverdi", "ağbacı", "ağbegim", "ağbegüm", "ağbet", "ağbilek", "ağca", "ağça", "ağçelik", "ağer", "ağgül", "ağın", "ağırtaş", "ağış", "ağkız", "ağnak", "ağyar", "ahen", "ahenk", "ahfeş", "ahıska", "ahi", "ahmet", "ahsen", "ahter", "ahu", "aişe", "ajda", "ajlan", "ak", "aka", "akad", "akadlı", "akağan", "akal", "akalan", "akalın", "akalp", "akaltan", "akan", "akanay", "akaner", "akansu", "akant", "akanyıldız", "akarca", "akarçay", "akarsel", "akarsu", "akartuna", "akartürk", "akasma", "akasoy", "akata", "akatay", "akay", "akaydın", "akbacı", "akbal", "akbaran", "akbaş", "akbaşak", "akbatu", "akbatur", "akbay", "akbayar", "akbek", "akbel", "akbet", "akbey", "akbil", "akbilge", "akboğa", "akbora", "akboy", "akbörü", "akbudun", "akbuğ", "akbulut", "akburak", "akburç", "akburçak", "akcan", "akcebe", "akcivan", "akça", "akçael", "akçagül", "akçakan", "akçakaya", "akçakıl", "akçakoca", "akçal", "akçalı", "akçam", "akçan", "akçasu", "akçay", "akçer", "akçığır", "akçıl", "akçınar", "akçiçek", "akçit", "akçora", "akdağ", "akdal", "akdamar", "akdemir", "akdeniz", "akdes", "akdik", "akdiken", "akdil", "akdoğ", "akdoğan", "akdoğdu", "akdoğmuş", "akdoğu", "akdolun", "akdora", "akdoru", "akdoruk", "akdöl", "akduman", "akdur", "akdurmuş", "akel", "aker", "akergin", "akerman", "akersan", "akersoy", "akgil", "akgiray", "akgöl", "akgöze", "akgüç", "akgül", "akgün", "akgündüz", "akgüner", "akgüneş", "akgüngör", "akhan", "akhanım", "akhun", "akı", "akıalp", "akıl", "akılbek", "akıllı", "akıman", "akın", "akınal", "akınalp", "akıncı", "akıncıbay", "akıner", "akıneri", "akıntan", "akibe", "akide", "akif", "akife", "akil", "akile", "akinci", "akip", "akipek", "akkadın", "akkan", "akkar", "akkaş", "akkaya", "akkaynak", "akkemik", "akkerman", "akkılıç", "akkın", "akkız", "akkor", "akköz", "akkurt", "akkuş", "akkutlu", "akkuyaş", "aklan", "akmaç", "akman", "akmanalp", "akmaner", "akmaral", "akmeriç", "aknur", "akol", "akozan", "akönder", "akören", "aköz", "akpay", "akpınar", "akpolat", "akpulat", "aksal", "aksan", "aksarı", "aksay", "aksel", "aksen", "akser", "akses", "akseven", "aksevil", "aksın", "aksoy", "aksöğüt", "aksu", "aksun", "aksuna", "aksunar", "aksuner", "aksungur", "aksülün", "aksüyek", "akşın", "akşit", "aktaç", "aktalay", "aktan", "aktar", "aktaş", "aktay", "aktekin", "aktemür", "aktı", "aktimur", "aktolga", "aktolun", "aktuğ", "aktuna", "aktunç", "aktün", "aktürk", "akün", "akünal", "akvarol", "akyel", "akyıldız", "akyiğit", "akyipek", "akyol", "akyön", "akyurt", "akyürek", "akyüz", "ala", "alâaddin", "alaca", "alacan", "alaçam", "alaçuk", "aladoğan", "alageyik", "alagöz", "alagün", "alahan", "alakız", "alakoç", "alakurt", "alakuş", "alâmet", "alan", "alanalp", "alanay", "alanbay", "alaner", "alangoya", "alangu", "alanur", "alapınar", "alat", "alatan", "alataş", "alatay", "alay", "alaybey", "alayunt", "alaz", "albayrak", "albeni", "albora", "alburak", "alcan", "alçık", "alçın", "alçınsu", "alçiçek", "alçin", "aldemir", "aldeniz", "aldoğan", "alem", "alemdar", "alemşah", "âlemşah", "âlemtap", "alev", "alevnaz", "algan", "algın", "algış", "algu", "algun", "algur", "algül", "algün", "alhan", "alıcı", "alım", "alımlı", "alıncak", "alışık", "alışın", "ali", "alican", "alihan", "alika", "alim", "alime", "alipek", "alisa", "alise", "aliş", "alişah", "alişan", "aliyar", "aliye", "alkan", "alkaş", "alkılıç", "alkım", "alkın", "alkış", "alkoç", "alkor", "alköz", "alkun", "allahverdi", "allı", "allıkız", "almagül", "almıla", "almila", "almile", "almula", "alnar", "alnıaçık", "alnıak", "alp", "alpagu", "alpağan", "alpak", "alpar", "alparslan", "alpartun", "alpaslan", "alpat", "alpata", "alpay", "alpaydın", "alpayer", "alpbilge", "alpçetin", "alpdemir", "alpdoğan", "alper", "alperen", "alpergin", "alpermiş", "alpertunga", "alpgiray", "alphan", "alpkan", "alpkanat", "alpkartal", "alpkın", "alpkutlu", "alpkülük", "alpman", "alpnur", "alpoğan", "alpsoy", "alpsü", "alptekin", "alptoğan", "alptuğ", "alpyürek", "alpyürük", "alsan", "alsancak", "alsevin", "alsoy", "alsu", "altaç", "altan", "altaner", "altaş", "altav", "altay", "altemür", "alten", "altın", "altınay", "altınbaran", "altınbaş", "altınbaşak", "altınbay", "altınbike", "altınçiçek", "altındal", "altınel", "altıner", "altıngül", "altınhan", "altınhanım", "altınhatun", "altınışık", "altınışın", "altıniz", "altınkaya", "altınkılıç", "altınkız", "altınnur", "altınok", "altınöz", "altınsaç", "altınsoy", "altıntaç", "altıntaş", "altıntop", "altıntuğ", "altoğan", "altop", "altuğ", "altun", "altuna", "altunay", "altunbaş", "altuncan", "altunç", "altunçağ", "altuner", "altunhan", "altuntaş", "alyipek", "amaç", "amanullah", "amber", "amil", "amile", "amine", "amir", "amiran", "amire", "amre", "anadolu", "anahanım", "anakadın", "anakız", "anar", "anargül", "anber", "ancı", "ançıbay", "andaç", "andak", "andelip", "andıç", "andiç", "angı", "angıl", "angın", "angış", "angıt", "anı", "anık", "anıl", "anıt", "anka", "anlı", "annak", "ant", "apa", "apak", "apakhan", "apaydın", "aracı", "arafat", "aral", "aran", "aras", "arat", "araz", "arbaş", "arbay", "arbek", "arca", "arcan", "arda", "ardahan", "ardemir", "ardıç", "ardıl", "arefe", "arel", "arer", "argana", "argın", "argu", "arguç", "argüden", "argüder", "argün", "arhan", "arı", "arıbal", "arıbaş", "arıboğa", "arıca", "arıcan", "arıç", "arıel", "arıer", "arığ", "arıhan", "arık", "arıkal", "arıkan", "arıkboğa", "arıker", "arıkhan", "arıkiz", "arıkol", "arıkut", "arıl", "arıman", "arın", "arınç", "arınık", "arıpınar", "arısal", "arısan", "arısoy", "arısu", "arış", "arıtan", "arıtaş", "arıyüz", "ari", "arif", "arife", "arik", "arkadaş", "arkan", "arkay", "arkın", "arkış", "arkoç", "arkun", "arkut", "arlan", "armağan", "arman", "armanç", "arna", "arol", "arpad", "arpağ", "arpak", "arpınar", "arsal", "arsan", "arslan", "arslaner", "arsoy", "artaç", "artam", "artan", "artık", "artuç", "artuk", "artun", "artunç", "artut", "aru", "arukan", "arukız", "aryüz", "arzık", "arziye", "arzu", "arzugül", "arzuhan", "arzum", "asaf", "asal", "asalbegim", "asalbegüm", "asalet", "asan", "âsan", "asena", "asfer", "ası", "asıf", "asılbanu", "asılgül", "asım", "asıma", "asil", "asile", "asime", "asimegül", "asiye", "aslan", "aslaner", "aslanhan", "aslı", "aslıbey", "aslıgül", "aslıhan", "aslım", "aslınur", "asliye", "asma", "asri", "asu", "asude", "asuman", "asutay", "asya", "asye", "aşa", "aşan", "aşcır", "aşır", "aşina", "aşir", "aşkan", "aşkım", "aşkın", "aşkınay", "aşkıner", "ata", "atâ", "ataan", "atacan", "ataç", "atadan", "ataergin", "atagül", "atagün", "atahan", "atak", "atakan", "ataker", "atakul", "atakurt", "atakut", "atalan", "atalay", "atalmış", "ataman", "atambay", "atamer", "atamtürk", "ataner", "atanur", "ataol", "ataöv", "atasagun", "atasan", "atasay", "atasev", "ataseven", "atasever", "atasevin", "atasoy", "atasü", "atatöre", "atatuğ", "atatüre", "atatürk", "ataullah", "ataün", "atay", "ateş", "atfi", "atgun", "atıf", "atıfa", "atıfe", "atıl", "atılay", "atılgan", "atız", "atik", "atila", "atilla", "atime", "atiye", "atlan", "atlas", "atlı", "atlığ", "atlıhan", "atmaca", "atom", "attilâ", "atuf", "avar", "avcı", "avhan", "avkan", "avni", "avniye", "avşar", "avunç", "ay", "aya", "ayaça", "ayal", "ayalp", "ayaltın", "ayana", "ayanç", "ayanfer", "ayas", "ayasun", "ayaşan", "ayata", "ayataç", "ayaydın", "ayaz", "aybala", "aybanu", "aybar", "aybars", "aybaş", "aybay", "aybegim", "aybegüm", "aybek", "ayben", "aybeniz", "ayberk", "aybet", "aybey", "aybige", "aybike", "aybir", "aybirgen", "ayboğa", "aybora", "aybüge", "aybüke", "ayca", "aycagül", "aycahan", "aycan", "aycennet", "ayceren", "aycıl", "aycihan", "ayça", "ayçağ", "ayçetin", "ayçıl", "ayçiçek", "ayçil", "ayçolpan", "ayçulpan", "ayda", "aydagül", "aydan", "aydanarı", "aydanur", "aydar", "aydemir", "aydeniz", "aydenk", "aydın", "aydınalp", "aydınay", "aydınbay", "aydınbey", "aydınel", "aydıner", "aydınol", "aydıntan", "aydıntuğ", "aydınyol", "aydil", "aydilek", "aydinç", "aydoğan", "aydoğdu", "aydoğmuş", "aydolu", "aydolun", "aydonat", "ayduru", "ayet", "ayetullah", "ayfer", "ayferi", "ayferim", "aygen", "aygerim", "aygök", "aygöl", "aygönenç", "aygönül", "aygut", "aygutalp", "aygül", "aygüler", "aygülhan", "aygümüş", "aygün", "aygüner", "aygünkız", "aygür", "aygüzel", "ayhan", "ayhanım", "ayhatun", "ayık", "ayım", "ayımbet", "ayımşa", "ayışığı", "ayışını", "ayilkin", "aykaç", "aykal", "aykan", "aykaş", "aykatun", "aykın", "aykız", "aykönül", "aykul", "aykurt", "aykut", "aykutalp", "aykutlu", "aykün", "ayla", "aylan", "aylanur", "aylin", "ayman", "aymaral", "aymelek", "aymete", "aymutlu", "ayna", "aynagül", "aynıfer", "aynımah", "ayni", "aynisa", "aynişah", "ayniye", "aynur", "aypar", "aypare", "aypars", "ayperi", "aypınar", "aypolat", "ayral", "ayrıl", "aysal", "aysan", "aysel", "ayselen", "aysema", "aysen", "ayser", "aysere", "ayseren", "aysev", "ayseven", "aysever", "aysevil", "aysevim", "aysevin", "aysılu", "aysın", "aysim", "aysima", "aysine", "aysoy", "aysu", "aysuda", "aysultan", "aysun", "aysuna", "aysunar", "aysunay", "aysungur", "aysü", "ayşan", "ayşe", "ayşecan", "ayşedudu", "ayşegül", "ayşehan", "ayşen", "ayşenur", "ayşıl", "ayşın", "ayşim", "ayşin", "ayşirin", "ayşöhret", "aytaç", "aytan", "aytar", "aytek", "aytekin", "aytemiz", "aytemur", "ayten", "ayterim", "aytış", "aytigin", "aytimur", "aytirim", "aytok", "aytolun", "aytop", "aytöre", "aytöz", "aytuğ", "aytuna", "aytunca", "aytunç", "aytunga", "aytutkun", "aytül", "aytün", "aytürk", "ayulduz", "ayülger", "ayülker", "ayün", "ayvaz", "ayver", "ayverdi", "ayyalap", "ayyalın", "ayyarkın", "ayyaruk", "ayyıldız", "ayyuca", "ayyüce", "ayyüz", "ayzıt", "ayzühre", "azade", "azadi", "azam", "azamet", "azamettin", "azat", "azelya", "azer", "azim", "azime", "aziz", "azize", "azmi", "azmidil", "azmun", "aznavur", "azra", "azrak", "azze", "bacı", "bade", "badegül", "badiye", "bağatur", "bağdaç", "bağdagül", "bağdaş", "bağır", "bağış", "bağışhan", "bağlan", "baha", "bahadır", "bahadırhan", "bahai", "bahar", "bahattin", "bahir", "bahise", "bahri", "bahriye", "bahşı", "bahtınur", "bahtıser", "bahtışen", "bahti", "bahtiyar", "bakanay", "bakır", "bakırhan", "baki", "bakinaz", "bakiye", "baksı", "bala", "balâ", "balâbey", "balaman", "balamir", "balatekin", "balatürk", "balaz", "balbal", "balbay", "balbey", "balca", "balcan", "baldan", "baldemir", "baler", "balhan", "balı", "balıbaş", "balıbey", "balım", "balın", "balibey", "balk", "balkan", "balkı", "balkın", "balkır", "balkış", "balkız", "balkoç", "ballı", "balsan", "balsarı", "balşeker", "baltaş", "bandak", "bangu", "banu", "banuhan", "barak", "baran", "baranalp", "baranbilge", "baransel", "baray", "barbaros", "barça", "barçak", "barçın", "barım", "barın", "barış", "barışcan", "baria", "barik", "barika", "bariz", "barkan", "barkın", "barlas", "barlık", "bars", "barsbay", "barsbey", "bartu", "basa", "basak", "basım", "basıra", "basir", "basiret", "baskak", "baskan", "baskın", "basri", "basriye", "basut", "başağa", "başak", "başal", "başar", "başargan", "başarman", "başat", "başay", "başaydın", "başbay", "başbuğ", "başçık", "başdemir", "başdoğan", "başeğmez", "başel", "başer", "başhan", "başkal", "başkan", "başkara", "başkaya", "başkaynak", "başkur", "başkurt", "başkut", "başman", "başok", "başol", "başöz", "başsoy", "baştaş", "baştemir", "baştugay", "baştuğ", "baştürk", "batı", "batıbay", "batıbey", "batıcan", "batıhan", "batır", "batıray", "batırhan", "battal", "batu", "batucem", "batuhan", "batur", "baturalp", "baturay", "baturhan", "bayar", "baybars", "baybaş", "baybek", "baybora", "baybörü", "baycan", "bayça", "baydoğan", "baydu", "baydur", "bayduralp", "bayer", "bayezit", "baygüç", "bayhan", "bayhun", "bayık", "bayın", "bayındır", "bayır", "bayırhan", "baykal", "baykam", "baykan", "baykara", "baykır", "baykoca", "baykor", "baykul", "baykurt", "baykut", "baykutay", "baylan", "bayman", "bayol", "bayrak", "bayraktar", "bayram", "bayrı", "bayru", "bayrualp", "bayrubay", "bayruhan", "bayruk", "baysal", "baysan", "baysoy", "baysu", "baysungur", "baytal", "baytaş", "baytekin", "baytimur", "baytok", "baytugay", "baytüze", "baytüzün", "bayuk", "bayülken", "bayyiğit", "bedia", "bedirhan", "bedirnisa", "bedreka", "behnan", "behnane", "behram", "behzat", "bekata", "bekbars", "bekbay", "beksan", "bektaş", "beleda", "bellisan", "belma", "benal", "benam", "benan", "benay", "benazir", "bengialp", "bengibay", "bengisan", "bengitaş", "bengühan", "benian", "berat", "bergüzar", "beria", "berkal", "berkan", "berkant", "berkay", "berkkan", "berkman", "berksal", "berksan", "berksay", "berktan", "berna", "berrak", "berran", "bertan", "besalet", "besamet", "besat", "beşaret", "beşarettin", "betülay", "beyaz", "beyazıt", "beybars", "beybolat", "beycan", "beyda", "beydağ", "beydaş", "beyhan", "beyhatun", "beykal", "beykan", "beykara", "beylan", "beysan", "beytullah", "beyza", "beyzade", "beyzat", "bican", "bidar", "bidayet", "bihan", "bilan", "bilay", "bilbaşar", "bilbay", "bileda", "bilgealp", "bilgebay", "bilgecan", "bilgehan", "bilgekağan", "bilgekan", "bilgetay", "bilgihan", "bilgivar", "bilgütay", "bilhan", "bilkan", "bilsay", "biltaş", "biltay", "bilyap", "binal", "binali", "binalp", "binan", "binat", "binay", "binbaşar", "binbay", "bindal", "binhan", "binkan", "binnaz", "binyaşar", "biran", "birant", "biray", "bircan", "birdal", "birhan", "birkan", "birnaz", "birsan", "birtan", "birtane", "boğa", "boğaç", "boğaçhan", "boğahan", "boğataş", "boğatay", "boğatekin", "boğatır", "boğatimur", "bolat", "bolcan", "bolgan", "bolhan", "bolkan", "bora", "borahan", "borak", "borakan", "borakhan", "boran", "boranalp", "boranbay", "boransü", "borataş", "boratav", "boratay", "boray", "borkan", "boyar", "boydak", "boydaş", "boylan", "boynak", "boyraz", "boysal", "boysan", "bozan", "bozat", "bozay", "bozbağ", "bozbala", "bozbaş", "bozbay", "bozbora", "bozca", "bozdağ", "bozdoğan", "bozhan", "bozkan", "bozkara", "bozkaya", "bozlak", "bozokay", "boztaş", "bölükbaşı", "börübars", "börübay", "börühan", "börükan", "bucak", "budak", "budunal", "budunalp", "buğday", "buğra", "buğrahan", "bukay", "bulak", "bulgan", "bulgubay", "bulgucan", "bulgunoyan", "bulutay", "buminhan", "burak", "burçak", "burçhan", "burhan", "burhanettin", "burkay", "burukbay", "buyan", "buyrukalp", "buyrukata", "buyrukbay", "buyrukhan", "bükay", "büldan", "bünyamin", "büran", "bürkan", "bürran", "büşra", "cafer", "cahide", "cahit", "caize", "calibe", "calp", "can", "cana", "canal", "canalp", "canaltay", "canan", "canane", "canaş", "canat", "canay", "canaydın", "canbay", "canbek", "canberk", "canbey", "canbolat", "canbulat", "canda", "candan", "candaner", "candar", "candaş", "candeğer", "candemir", "candoğan", "canel", "caner", "canfeda", "canfer", "canfes", "canfeza", "canfidan", "canfide", "cangiray", "cangül", "cangün", "cangür", "canhanım", "canıpek", "canik", "canip", "canipek", "cankan", "cankat", "cankaya", "cankılıç", "cankız", "cankoç", "cankorur", "cankurt", "cankut", "cannur", "canol", "canören", "canöz", "canözen", "canözlem", "canperver", "canpolat", "canrüba", "cansal", "cansay", "cansel", "cansen", "canser", "canses", "cansev", "canseven", "cansever", "cansın", "cansoy", "cansu", "cansun", "cansunar", "cansunay", "cansuner", "cantaş", "cantekin", "canten", "cantez", "cantürk", "canyurt", "caran", "carim", "carullah", "cavidan", "cavit", "cavlı", "cavuldur", "caymaz", "cazibe", "cazim", "cazip", "cebbar", "cebealp", "cebrail", "cefa", "celilay", "cemal", "cemaleddin", "cemalettin", "cemalullah", "cemşah", "cenan", "cenani", "cenap", "cengizhan", "cerullah", "cevahir", "cevat", "cevval", "cevza", "ceyda", "ceydahan", "ceyhan", "cezayir", "cihan", "cihanbanu", "cihandar", "cihandide", "cihanefruz", "cihaner", "cihanfer", "cihangir", "cihangül", "cihani", "cihanmert", "cihannur", "cihanşah", "cihat", "cilvenaz", "cilvesaz", "civan", "civanbaht", "civanmert", "civanşir", "coşan", "coşar", "coşkunay", "cuma", "cumali", "cura", "cündullah", "çadır", "çağ", "çağa", "çağaçan", "çağaçar", "çağakan", "çağan", "çağanak", "çağatay", "çağay", "çağbay", "çağdaş", "çağıl", "çağıltı", "çağın", "çağır", "çağkan", "çağla", "çağlak", "çağlam", "çağlan", "çağlar", "çağlasın", "çağlayan", "çağlayangil", "çağlayantürk", "çağlı", "çağman", "çağnur", "çağrı", "çağrıbey", "çağrınur", "çağveren", "çakan", "çakar", "çakıl", "çakım", "çakın", "çakır", "çakırbey", "çakırca", "çakırer", "çakmak", "çakman", "çakmur", "çalapkulu", "çalapöver", "çalapverdi", "çalgan", "çalıkbey", "çalıkuşu", "çalım", "çalın", "çalış", "çalışkan", "çalkan", "çalkara", "çalkın", "çaltı", "çam", "çamak", "çambel", "çamer", "çamok", "çandar", "çandarlı", "çanga", "çangal", "çankara", "çankaya", "çapan", "çapaner", "çapar", "çapın", "çapkan", "çarlan", "çarman", "çav", "çavaş", "çavdar", "çavdur", "çavlan", "çavlı", "çavuldur", "çavuş", "çaydam", "çaydamar", "çayhan", "çaykara", "çaylak", "çaylan", "çaynak", "çelikbaş", "çelikhan", "çelikkan", "çelikkanat", "çelikkaya", "çeliktan", "çeliktaş", "çelikyay", "çeşminaz", "çetinalp", "çetinay", "çetinkaya", "çetintaş", "çevikcan", "çıda", "çıdal", "çıdam", "çıdamlı", "çığa", "çığal", "çınak", "çınar", "çınay", "çıray", "çıtak", "çıtanak", "çilhan", "çilhanım", "çiltay", "çimnaz", "çintan", "çintay", "çiray", "çoban", "çobanyıldızı", "çoğa", "çoğahan", "çoğan", "çoğaş", "çoğay", "çokan", "çokar", "çokay", "çokman", "çolak", "çolpan", "çopar", "çopuralp", "çora", "çorak", "çoturay", "çuğa", "çulpan", "çuvaş", "dadak", "dadaş", "dağ", "dağa", "dağaşan", "dağdelen", "dağhan", "dağtekin", "dai", "daim", "daime", "dal", "dalan", "dalay", "dalayer", "dalbaş", "dalboğa", "dalda", "daldal", "daldiken", "dalgıç", "dalım", "dalkılıç", "dalkoç", "dalokay", "daltekin", "dalyan", "damar", "damla", "danış", "danışman", "daniş", "danişment", "danyal", "dara", "darcan", "darga", "daver", "davran", "davut", "daya", "dayahatun", "dayanç", "dayar", "daye", "dayı", "daylak", "deha", "dehan", "delikan", "delikanlı", "demirağ", "demiralp", "demiray", "demirbağ", "demirbaş", "demirboğa", "demircan", "demirçay", "demirhan", "demirkan", "demirkaya", "demirkıran", "demirman", "demirşah", "demirtaş", "demirtav", "demirtay", "demokan", "denizalp", "denizcan", "denizhan", "denizman", "denktaş", "derman", "dervişani", "dervişhan", "derya", "deryadil", "deryanur", "devran", "diba", "diclehan", "didar", "dikalp", "dikay", "dikbaş", "dikbay", "dikboğa", "dikçam", "dikdal", "diktaş", "dila", "dilâra", "dilay", "dilbaz", "dildade", "dildar", "dilercan", "dilferah", "dilfeza", "dilhan", "dilhayat", "dilmaç", "dilman", "dilrüba", "dilsafa", "dilsaz", "dilsitan", "dilşah", "dilşat", "dinçalp", "dinçay", "dinççağ", "dinçkal", "dinçkaya", "dinçsan", "dinçsav", "dinçsay", "dinçtaş", "dindar", "dirahşan", "dirayet", "diribaş", "dirican", "dirsehan", "dizdar", "doğa", "doğan", "doğanalp", "doğanay", "doğanbaş", "doğanbey", "doğanbike", "doğaner", "doğangün", "doğanhan", "doğannur", "doğanşah", "doğantan", "doğantimur", "doğay", "doğudan", "doğuhan", "doğukan", "dolan", "dolaner", "dolay", "dolunay", "domaniç", "donat", "dora", "dorak", "dorukhan", "dorukkan", "dölaslan", "dönmezcan", "duduhan", "duhan", "duman", "dumanbey", "dura", "duracan", "durak", "dural", "duran", "duranay", "duraner", "duransoy", "durantekin", "duray", "durcan", "durhan", "durkadın", "durkaya", "durualp", "durubay", "durucan", "duruhan", "durukadın", "durukal", "durukan", "durusan", "duysal", "dündar", "dündaralp", "dürdane", "dürefşan", "dürrüşehvar", "düşvar", "ebrak", "ecebay", "ecehan", "ecekan", "eda", "edadil", "edagül", "edgüalp", "edgübay", "edgükan", "efdal", "efekan", "efgan", "efnan", "efrasiyap", "efza", "ejderhan", "elaldı", "elfaz", "elhan", "eliaçık", "elitaş", "elmas", "elvan", "elveda", "emanet", "emanullah", "embiya", "emetullah", "emirhan", "emirşah", "emrah", "emran", "emrullah", "emsal", "enbiya", "enfal", "enginalp", "enginay", "engintalay", "enhar", "ensar", "ensari", "eracar", "erakalın", "erakıncı", "eraksan", "eral", "eralkan", "eralp", "eraltay", "erandaç", "eranıl", "eraslan", "eratlı", "eray", "eraydın", "erbaş", "erbaşat", "erbatur", "erbay", "erboğa", "ercan", "ercihan", "ercivan", "erdağ", "erdal", "erdemalp", "erdemay", "erdenalp", "erdenay", "erdibay", "erdoğan", "erduran", "erenalp", "erenay", "erencan", "erenkara", "ergalip", "ergazi", "erginal", "erginalp", "erginay", "erginbay", "ergincan", "ergunalp", "erguvan", "ergünay", "erhan", "erimşah", "erkal", "erkan", "erkarslan", "erkaş", "erkaya", "erkınay", "erkıral", "erkman", "erkoçak", "erksal", "erksan", "erkutay", "erman", "erna", "ernoyan", "eroğan", "erokay", "eronat", "erozan", "ersagun", "ersal", "ersalmış", "ersan", "ersav", "ersavaş", "ersay", "ersayın", "ersunal", "erşahan", "erşan", "erşat", "ertaç", "ertan", "ertaş", "ertay", "ertaylan", "ertepınar", "ertugay", "ertuna", "ertunca", "ertuncay", "ertunga", "erturan", "erünal", "eryalçın", "eryaman", "eryavuz", "eryılmaz", "erzade", "erzan", "esat", "esedullah", "esenbay", "esenboğa", "esendağ", "esendal", "esenkal", "esertaş", "eskinalp", "esma", "esmahan", "esmeray", "esna", "esra", "eşay", "eşfak", "eşraf", "evcan", "evhat", "evliya", "evran", "evrenata", "eyyam", "ezelhan", "fadıl", "fadıla", "fadik", "fadile", "fadim", "fadime", "fahim", "fahime", "fahir", "fahire", "fahrettin", "fahri", "fahriye", "fahrünnisa", "faik", "faika", "faiz", "faize", "fakih", "fakihe", "fakir", "fakirullah", "falih", "fani", "fariha", "farik", "faris", "farise", "faruk", "fasih", "fasihe", "fatih", "fatin", "fatine", "fatma", "fatmagül", "fatmanur", "fato", "fatoş", "faysal", "fazıl", "fazıla", "fazilet", "fazlı", "fazlullah", "feda", "fedai", "fedakâr", "fehamet", "fehamettin", "fehimdar", "fekahet", "feragat", "ferah", "ferahet", "ferahfeza", "ferahi", "ferahnisa", "ferahnur", "ferahnüma", "ferahru", "feramuş", "feramuz", "feraset", "feray", "feraye", "fercan", "ferda", "ferdal", "ferdane", "ferdaniye", "ferdar", "ferhan", "ferhat", "ferhattin", "ferican", "feriha", "feritkan", "ferkan", "ferman", "fermani", "fersan", "feruzat", "ferzan", "ferzane", "fetanet", "fethullah", "fettah", "fevzullah", "feyha", "feyman", "feyyaz", "feyza", "feyzan", "feyzullah", "feza", "fezahan", "fezai", "fezanur", "fırat", "fıtnat", "fidan", "fidangül", "figan", "filbahar", "firaz", "firkat", "firuzan", "fitnat", "fuat", "fulya", "funda", "furkan", "füruzan", "gaffar", "gafir", "gafur", "galibe", "galip", "gamze", "gani", "ganime", "ganimet", "ganiye", "garibe", "garip", "gavsi", "gaye", "gayret", "gayur", "gazal", "gazale", "gazanfer", "gazel", "gazi", "gedikbaş", "gedikbay", "gediktaş", "gelenay", "gencal", "gencalp", "gencaslan", "gencay", "gençağa", "gençalp", "gençaslan", "gençay", "gençkal", "gençsav", "gençtan", "geray", "german", "gezenay", "gıyas", "gıyasettin", "gıyasi", "giray", "girayalp", "girayer", "girayhan", "girginalp", "girizan", "gizay", "gonca", "goncafem", "goncafer", "goncagül", "goncater", "gökalp", "gökay", "gökbaran", "gökbay", "gökbayrak", "gökbora", "gökbudak", "gökcan", "gökçebala", "gökçebalan", "gökdal", "gökdoğan", "gökduman", "gökhan", "gökmenalp", "göksal", "göksaltuk", "göksan", "göksav", "göksay", "gökşan", "göktalay", "göktan", "göktaş", "göktay", "göktulga", "göktuna", "gökyay", "gönülay", "göral", "görgünay", "görgüncan", "gözal", "gözalan", "gözay", "gözaydın", "gücal", "gücalp", "güçal", "güçalp", "güçhan", "güçkan", "güçkanat", "güçlübay", "güçlühan", "güçlükhan", "güçsal", "güçsalan", "güçsan", "gülaç", "gülaçtı", "gülal", "gülara", "gülaslı", "gülasya", "gülay", "gülaydın", "gülayım", "gülayşe", "gülbadem", "gülbağ", "gülbahar", "gülbanu", "gülbay", "gülbeyaz", "gülcan", "gülcanan", "gülcemal", "gülcihan", "güldal", "güldalı", "güldan", "güldane", "güldehan", "güldoğan", "güldünya", "güleda", "gülefşan", "gülenay", "gülendam", "güleray", "gülercan", "gülerman", "gülertan", "gülfam", "gülfeda", "gülferah", "gülfeşan", "gülfeza", "gülfidan", "gülgonca", "gülhan", "gülhanım", "gülhatır", "gülhatun", "gülhayat", "gülinaz", "gülistan", "gülizar", "gülkadın", "gülkan", "güllühan", "güllüşah", "güllüşan", "gülmisal", "gülnar", "gülnare", "gülnazik", "gülnihal", "gülsalın", "gülsan", "gülsanem", "gülsay", "gülsefa", "gülsema", "gülsima", "gülsuna", "gülsunam", "gülsunan", "gülsunar", "gülşad", "gülşadiye", "gülşah", "gülşahin", "gülşan", "gültaç", "gültan", "gültane", "gültaş", "gültaze", "gülümay", "gülzar", "gülziba", "güman", "gümüşhatun", "gümüştan", "gümüştay", "günaç", "günak", "günal", "günalan", "günalp", "günaltan", "günaltay", "günan", "günana", "günay", "günaydın", "günbatu", "günbay", "günçağ", "gündal", "gündaş", "gündoğan", "gündoğar", "gündüzalp", "gündüzhan", "günebakan", "güneral", "güneralp", "güneray", "günerkan", "günerman", "güneşhan", "güneşhanım", "günhan", "günkan", "günkaya", "günkutan", "günnar", "günnaz", "günsar", "günsav", "günşah", "günşıray", "güntan", "günvar", "günyaruk", "gürak", "gürakan", "gürakın", "güral", "güran", "gürarda", "gürata", "güray", "gürbaş", "gürbaşkan", "gürbay", "gürboğa", "gürcan", "gürdal", "gürhan", "gürkan", "güvenay", "güzay", "güzelay", "güzelcan", "güzinay", "hacer", "hacergül", "hacıgül", "hacıhanım", "hacıkadın", "hadiye", "hadra", "hafıza", "hafide", "hafize", "hakan", "hakikat", "hakkı", "haktan", "hakverdi", "halâs", "halâskâr", "halâvet", "haldun", "hale", "halef", "halenur", "halide", "halife", "halil", "halile", "halilullah", "halim", "halime", "halis", "halise", "halit", "halittin", "halûk", "hamaset", "hamdi", "hamdiye", "hamdullah", "hami", "hamide", "hamil", "hamis", "hamise", "hamit", "hamiye", "hamiyet", "hamra", "hamza", "han", "hanalp", "hanbegüm", "hanbeğendi", "hanbek", "hanbey", "hanbike", "hanbiken", "handan", "hande", "hanedan", "hanefi", "hanım", "hanımkız", "hanif", "hanife", "hankan", "hankız", "hansoy", "hansultan", "hanüman", "hanzade", "harbiye", "hare", "harika", "harun", "hasan", "hasanalp", "hasane", "hasay", "hasbek", "hasbi", "hasefe", "hasene", "hasgül", "hasibe", "hasip", "haskız", "haslet", "hasna", "haspolat", "hasret", "haşim", "haşmet", "haşmettin", "hatem", "hatemî", "hatıra", "hatice", "haticenur", "hatif", "hatife", "hatim", "hatime", "hatip", "hattat", "hatun", "hatunana", "hava", "haver", "havi", "havva", "hayal", "hayalî", "hayat", "hayati", "haydar", "hayır", "hayırgül", "hayran", "hayrani", "hayret", "hayrettin", "hayri", "hayriye", "hayrullah", "hayrünnisa", "hazal", "hazan", "hazar", "hazel", "hazık", "hazım", "hazime", "hazin", "hazine", "hazret", "hemta", "heyecan", "hezarfen", "hıfzırrahman", "hıfzullah", "hıncal", "hıraman", "hızlan", "hicap", "hicran", "hiçyılmaz", "hidayet", "hidayettin", "hikmetullah", "hilkat", "hisar", "hitam", "hoşeda", "hoşfidan", "hoşkadem", "huban", "hudavendigâr", "hudavent", "hudaverdi", "hudayi", "hulagu", "hulya", "hunalp", "hurican", "hüdavendigâr", "hüdavent", "hüdaver", "hüdaverdi", "hüdayi", "hükminaz", "hükümdar", "hülya", "hüma", "hümayun", "hümeyra", "hüray", "hürcan", "hürdoğan", "hürkal", "hürkan", "hürnaz", "hüryaşar", "hüsam", "hüsamettin", "hüsna", "hüveyda", "hüzzam", "ılgar", "ılgarlı", "ılgaz", "ılgazcan", "ılgazer", "ılıcak", "ılıcan", "ıra", "ıraz", "ırmak", "ışıkal", "ışıkalp", "ışıkay", "ışıkhan", "ışıkkan", "ışıktaş", "ışılak", "ışılar", "ışılay", "ışıldar", "ışıltan", "ışıman", "ışınay", "ışınbay", "ışınhan", "ışınkan", "ışınsal", "ışıtan", "iba", "ibad", "ibadet", "ibadullah", "ibat", "ibrahim", "içaçan", "ifakat", "ihsan", "ihvan", "ihya", "ikbal", "ikram", "ikrami", "ilal", "ilalan", "ilaldı", "ilalmış", "ilarslan", "ilay", "ilayda", "ilaydın", "ilbars", "ilbasan", "ilbasmış", "ilbastı", "ilbaş", "ilbay", "ilboğa", "ilbozan", "ilcan", "ilgar", "ilgazi", "ilginay", "ilham", "ilhami", "ilhan", "ilimdar", "ilkan", "ilkay", "ilkbahar", "ilkbal", "ilkcan", "ilkehan", "ilknaz", "ilkutay", "ilkünsal", "ilkyaz", "ilpars", "ilsavaş", "ilsavun", "iltan", "iltaş", "iltay", "ilvan", "ilyas", "imadettin", "imam", "imamettin", "iman", "imat", "imbat", "imdat", "inak", "inal", "inalbey", "inalcık", "inalkut", "inaltekin", "inan", "inanç", "inançlı", "inanır", "inanöz", "inayet", "incebay", "insaf", "ipar", "irfan", "irfani", "irfaniye", "irfat", "irşat", "isa", "isfendiyar", "ishak", "ismail", "ismican", "ismihan", "isminaz", "israfil", "istemihan", "istikbal", "isvan", "işcan", "işman", "itibar", "iyidoğan", "iyisan", "izboğa", "izbudak", "jale", "kaan", "kadagan", "kadam", "kadem", "kader", "kadın", "kadınana", "kadıncık", "kadife", "kadim", "kadime", "kadir", "kadire", "kadrettin", "kadri", "kadrihan", "kadriye", "kafar", "kağan", "kahir", "kahraman", "kaim", "kakınç", "kala", "kalagay", "kalender", "kalgay", "kalkan", "kalmık", "kalmuk", "kam", "kamacı", "kaman", "kamanbay", "kamar", "kambay", "kamber", "kamer", "kamet", "kâmran", "kamu", "kâmuran", "kanağan", "kanak", "kanat", "kanbay", "kanber", "kandemir", "kaner", "kanık", "kanıkor", "kanıt", "kani", "kaniye", "kanpolat", "kanpulat", "kansu", "kansun", "kanturalı", "kantürk", "kanun", "kanver", "kapagan", "kapar", "kapçak", "kapkın", "kaplan", "kaptan", "kara", "karaalp", "karaca", "karacakurt", "karacan", "karacı", "karaçar", "karaçay", "karaçelik", "karadağ", "karademir", "karadeniz", "karadoğan", "karaduman", "karadut", "karaer", "karagöz", "karahan", "karakalpak", "karakan", "karakaş", "karakaya", "karakız", "karakoca", "karakoç", "karakoyun", "karakucak", "karakurt", "karakuş", "karaman", "karamık", "karamuk", "karamut", "karamürsel", "karan", "karanalp", "karanbay", "karanfil", "karaoğlan", "karaörs", "karapars", "karasal", "karasu", "karasungur", "karasüyek", "karaşın", "karatan", "karataş", "karatay", "karatekin", "karatün", "karayağız", "karayel", "karcan", "kardan", "kardelen", "kardeş", "kargı", "kargın", "kargınalp", "karhan", "karık", "karındaş", "karlık", "karlu", "karluk", "karlukhan", "karsel", "kartal", "kartay", "kartekin", "karyağdı", "kasal", "kasar", "kasım", "kasırga", "kaşka", "katı", "katıhan", "katun", "kavas", "kavçın", "kavruk", "kavurt", "kavurtbey", "kavurthan", "kavvas", "kay", "kaya", "kayaalp", "kayacan", "kayaer", "kayagün", "kayagündüz", "kayahan", "kayan", "kayansel", "kayar", "kayaş", "kayatekin", "kayatimur", "kayatürk", "kaygısız", "kaygusuz", "kayhan", "kayı", "kayıbay", "kayıhan", "kayın", "kayıt", "kayıtmış", "kaymak", "kaymas", "kaymaz", "kaynak", "kaynar", "kaynarkan", "kayra", "kayraalp", "kayrahan", "kayral", "kayran", "kayser", "kayyum", "kazak", "kazakhan", "kazan", "kazanhan", "kazgan", "keleşbay", "keleşhan", "kemal", "kemalettin", "kemandar", "kenan", "keramet", "keramettin", "kerami", "keremşah", "keriman", "kerimhan", "kerman", "kervan", "keskinay", "keyhan", "kezban", "keziban", "kılavuz", "kılıçal", "kılıçalp", "kılıçaslan", "kılıçbay", "kılıçhan", "kınalp", "kınay", "kınayman", "kınaytürk", "kınıkaslan", "kıpçak", "kıraç", "kıralp", "kıran", "kıranalp", "kıraner", "kırat", "kıratlı", "kıray", "kırbay", "kırboğa", "kırca", "kırdar", "kırdarlı", "kırhan", "kırman", "kırtay", "kıvanç", "kıvançer", "kıvançlı", "kıyam", "kıyan", "kıyas", "kızan", "kızhanım", "kızılaslan", "kızılateş", "kızılbars", "kızılboğa", "kızılelma", "kızılpars", "kızılyalım", "kızımay", "kızkına", "kibar", "kibare", "kibariye", "kiçialp", "kiçihan", "kifaye", "kifayet", "kimya", "kinaş", "kinyas", "kipcan", "kiram", "kiramettin", "kirami", "kiraz", "kirman", "kirmanşah", "kişihan", "koca", "kocaalp", "kocademir", "kocagöz", "kocaman", "kocataş", "kocatay", "kocatürk", "kocaün", "koçak", "koçakalp", "koçakaslan", "koçaker", "koçaş", "koçay", "koçboğa", "koçhan", "koçkan", "koçkar", "kolat", "kolçak", "koldan", "koldaş", "koman", "komutan", "konak", "konan", "konca", "koncagül", "kongar", "kongarata", "konguralp", "kongurtay", "konrat", "konuralp", "konurata", "konuray", "kopan", "koparal", "kora", "koral", "koralp", "koraltan", "koramaz", "koraslan", "koray", "korcan", "korçak", "korçan", "korday", "korgan", "korhan", "korkan", "korkmaz", "korkutalp", "korkutata", "korman", "kortak", "kortan", "kortaş", "kortay", "korugan", "koryak", "koryay", "koşal", "koşukhan", "kotuzhan", "koyak", "koyaş", "koytak", "koytan", "kozak", "köksal", "köksan", "köktan", "köktaş", "köktay", "közcan", "kubat", "kubilay", "kuday", "kudayberdi", "kudretullah", "kulan", "kumral", "kutal", "kutan", "kutay", "kutlay", "kutluay", "kutsal", "kutsalan", "kutsalar", "kutsan", "kuyaş", "kuzay", "kübra", "kürşad", "kürşat", "lala", "lâlehan", "lâlezar", "lâmia", "lâmiha", "lema", "leman", "lerzan", "letafet", "leyan", "liyakat", "liyan", "maarif", "macide", "macit", "madelet", "mağfiret", "mağrip", "mağrur", "mahbube", "mahbup", "mahçiçek", "mahfer", "mahfi", "mahfuz", "mahınev", "mahi", "mahinur", "mahir", "mahire", "mahizar", "mahizer", "mahmude", "mahmur", "mahmure", "mahmut", "mahnur", "mahpare", "mahperi", "mahpeyker", "mahra", "mahru", "mahrur", "mahser", "mahsun", "mahsure", "mahsut", "mahten", "mahter", "mahya", "maide", "mail", "makal", "makbul", "makbule", "maklûbe", "maksude", "maksum", "maksume", "maksur", "maksure", "maksut", "makul", "malik", "malike", "malkoç", "malkoçoğlu", "mançer", "manço", "mançu", "mançuhan", "manga", "mangalay", "manolya", "mansur", "mansure", "manzur", "maral", "marifet", "martı", "maruf", "marufe", "marziye", "masum", "masume", "maşallah", "maşuk", "maşuka", "matlup", "matuk", "mavi", "mavisel", "maviş", "maya", "mazhar", "mazlum", "mazlume", "medar", "medayin", "mediha", "mefhar", "mefharet", "mehlika", "mehpare", "mehtap", "melâhat", "melda", "meleknaz", "melekşah", "meliha", "melikhan", "melikşah", "melisa", "melissa", "memduha", "menaf", "mengüalp", "mengübay", "mengütaş", "mengütay", "mennan", "meral", "meram", "mercan", "merdan", "mertkal", "mertkan", "merzuka", "mesadet", "mestan", "mestinaz", "meşahir", "meşale", "metehan", "metinkaya", "meva", "mevlâna", "meyransa", "meyyal", "mısra", "midhat", "mihman", "mihriban", "mihrican", "mihrimah", "mihrinaz", "mihrinisa", "mihrişah", "mimoza", "mina", "miraç", "miran", "miranmir", "mirat", "miray", "mircan", "mirhan", "mirza", "mirzat", "misal", "mithat", "miyase", "mocan", "moran", "moray", "muadelet", "muaffak", "muallâ", "muallim", "muammer", "muarra", "muattar", "muazzam", "muazzez", "mubahat", "muğdat", "muhacir", "muhaddere", "muhammed", "muhammet", "muhar", "muharrem", "muhtar", "mukaddem", "mukadder", "mukaddes", "munar", "mungan", "murat", "murathan", "murtaza", "musa", "musaddık", "musafat", "musaffa", "mustafa", "mutahhar", "mutarra", "mutasım", "mutena", "mutia", "mutlualp", "mutluay", "mutlubay", "mutluhan", "mutlukan", "mutlukhan", "muvaffak", "muvahhide", "muvahhit", "muvakkar", "muzaffer", "mübahat", "mübarek", "mübareke", "müberra", "mücahit", "mücahittin", "mücap", "müçteba", "müheyya", "mühürdar", "müjdat", "mükâfat", "müminhan", "mümtaz", "mümtaze", "münasip", "münteha", "müsemma", "müstakim", "müstakime", "müstecap", "müstesna", "müşahit", "müşfika", "müştak", "müşteba", "müzahir", "müzdat", "naci", "nacil", "naciye", "nadi", "nadide", "nadim", "nadime", "nadir", "nadire", "nadiye", "nafi", "nafia", "nafile", "nafiye", "nafiz", "nafize", "nagehan", "nağme", "nahide", "nahire", "nahit", "naibe", "nail", "naile", "naim", "naime", "naip", "naire", "nakıp", "naki", "nakip", "nakiye", "nakşıdil", "nalân", "namal", "namdar", "isimler", "namık", "namıka", "nami", "namiye", "nardan", "nardane", "nargül", "narhanım", "narin", "nariye", "narkadın", "nart", "narter", "nas", "nasfet", "nasıf", "nasır", "nasıra", "nasibe", "nasih", "nasiha", "nasip", "nasir", "nasiye", "nasrettin", "nasri", "nasrullah", "nasuh", "nasuhi", "naşide", "naşir", "naşire", "naşit", "natık", "natıka", "natuk", "natuvan", "nayman", "naz", "nazan", "nazar", "nazbike", "nazende", "nazenin", "nazhanım", "nazıdil", "nazım", "nazıma", "nazır", "nazif", "nazife", "nazik", "nazir", "nazire", "nazlan", "nazlı", "nazlıcan", "nazlıgül", "nazlıhan", "nazlım", "nazmi", "nazmiye", "nebahat", "nebahattin", "necat", "necati", "neccar", "nefaset", "nehar", "nejat", "neriman", "neslihan", "neslişah", "neşat", "neşecan", "neva", "neval", "nevale", "nevbahar", "nevcan", "nevcivan", "neveda", "nevnihal", "nevra", "nevsal", "nevsale", "nevvare", "nevzat", "neyran", "nezafet", "nezahat", "nezahattin", "nezahet", "nezaket", "nida", "nidai", "nihade", "nihai", "nihal", "nihan", "nihat", "nihayet", "nilay", "nilhan", "nimetullah", "niran", "nisa", "nisan", "nisani", "nisvan", "nişan", "nişanbay", "niyaz", "niyazi", "nizam", "nizamettin", "nizami", "nizar", "nogay", "noyan", "nuhcan", "nuhkan", "numan", "nural", "nuralp", "nuran", "nurani", "nuratay", "nuray", "nuraydın", "nurbaki", "nurbanu", "nurbay", "nurcan", "nurcihan", "nurdağ", "nurdal", "nurdan", "nurdanay", "nurdane", "nurdoğan", "nurefşan", "nurfeza", "nurfidan", "nurhan", "nurhanım", "nurhayal", "nurhayat", "nurihak", "nurinisa", "nurkadın", "nurkan", "nurlan", "nurmah", "nursaç", "nursal", "nursan", "nursema", "nursima", "nurşah", "nurtaç", "nurtan", "nurtane", "nurullah", "nurzat", "nuyan", "oba", "ocak", "ocan", "odhan", "odkan", "odkanlı", "odman", "odyak", "odyakar", "odyakmaz", "oflas", "oflaz", "oflazer", "ogan", "oganalp", "oganer", "ogansoy", "ogeday", "oğan", "oğanalp", "oğaner", "oğansoy", "oğanverdi", "oğulbalı", "oğulbaş", "oğulbay", "oğulcan", "oğulçak", "oğultan", "oğuralp", "oğurata", "oğuzalp", "oğuzata", "oğuzbala", "oğuzbay", "oğuzcan", "oğuzhan", "oğuzkan", "oğuzman", "oğuztan", "okakın", "okal", "okan", "okanalp", "okanay", "okandan", "okaner", "okar", "okat", "okatan", "okatar", "okatay", "okay", "okayer", "okbaş", "okbay", "okboğa", "okcan", "okdağ", "okhan", "okkan", "okman", "oksal", "oksaldı", "oksalmış", "oksar", "oksay", "okşak", "okşan", "okşar", "oktan", "oktar", "oktaş", "oktay", "okutan", "okuyan", "okyalaz", "okyan", "okyanus", "okyar", "okyay", "olca", "olcan", "olcay", "olcayhan", "olcayto", "olcaytu", "olcaytuğ", "olcaytürk", "oldaç", "oldağ", "olgaç", "olgunay", "olkıvanç", "olpak", "olsan", "omaca", "omaç", "omay", "omurca", "omurtak", "onan", "onar", "onaran", "onart", "onat", "onatkan", "onatkut", "onatsü", "onay", "onbulak", "ongan", "ongay", "ongunalp", "onuktan", "onultan", "onurad", "onural", "onuralp", "onurhan", "onurkan", "onursal", "onursan", "onursay", "opak", "orak", "orakay", "oral", "oralmış", "oran", "oranlı", "oray", "orbay", "orcan", "orcaner", "orgunalp", "orguntay", "orgünalp", "orhan", "orkan", "orkutay", "orman", "ortaç", "ortak", "ortan", "ortanca", "oskan", "oskay", "osman", "otacı", "otağ", "otak", "otakçı", "otamış", "otaran", "otay", "oya", "oyaçiçek", "oyal", "oyalı", "oyalp", "oybozan", "oyhan", "oykan", "oymak", "oyman", "ozan", "ozanalp", "ozanay", "ozaner", "ozansoy", "ozansü", "ozgan", "öcal", "öçal", "ögeday", "öğütal", "ömüral", "ömürcan", "önad", "önal", "önalan", "önay", "önaydın", "öncübay", "öngay", "önkal", "önsal", "önsav", "öntaş", "örsan", "örsay", "örskan", "örtan", "örtaş", "örtay", "övünal", "özak", "özakan", "özakar", "özakay", "özakın", "özakıncı", "özaktuğ", "özal", "özalp", "özalpman", "özalpsan", "özaltan", "özaltay", "özaltın", "özaltuğ", "özan", "özant", "özarda", "özarı", "özark", "özarkın", "özaslan", "özata", "özatay", "özay", "özaydın", "özayhan", "özaytan", "özbağ", "özbal", "özbala", "özbaş", "özbaşak", "özbatu", "özbay", "özbaydar", "özbekkan", "özboğa", "özcan", "özcanan", "özçam", "özçınar", "özdağ", "özdal", "özdamar", "özdilmaç", "özdoğa", "özdoğal", "özdoğan", "özduran", "özekan", "özenay", "özercan", "özerdal", "özerhan", "özerman", "özertan", "özgebay", "özgenalp", "özgenay", "özgiray", "özgülay", "özgünay", "özgürcan", "özhakan", "özhan", "özilhan", "özinal", "özinan", "özkal", "özkan", "özkar", "özkaya", "özkayra", "özkerman", "özkınal", "özkınay", "özkula", "özkutal", "özkutay", "özkutsal", "özman", "özoktay", "özozan", "özpala", "özpınar", "özpolat", "özpulat", "özsan", "özsanlı", "özşahin", "özşan", "öztan", "öztanır", "öztarhan", "öztaş", "öztay", "öztaylan", "öztoygar", "öztuna", "özüak", "özyay", "özyuva", "padişah", "pak", "pakalın", "pakân", "pakbaz", "pakel", "paker", "paki", "pakize", "pakkan", "pakman", "paksan", "paksu", "paksüt", "pamir", "pamuk", "papatya", "parla", "parlak", "parlanur", "parlar", "payan", "paye", "payende", "payidar", "pekak", "pekay", "pekbal", "pekkan", "perican", "perihan", "perinişan", "perizat", "perran", "pervane", "peyman", "pınar", "pırlanta", "pıtırca", "pıtrak", "piran", "piraye", "polat", "poyraz", "punar", "pürşan", "raci", "racih", "raciye", "radi", "radife", "radiye", "rafet", "rafettin", "rafi", "rafia", "rafih", "ragıp", "ragibe", "rağbet", "rahi", "rahile", "rahim", "rahime", "rahiye", "rahman", "rahmani", "rahmet", "rahmeti", "rahmetullah", "rahmi", "rahmiye", "rahşan", "rahşende", "raif", "raife", "raik", "raika", "rakım", "rakıme", "rakibe", "rakide", "rakime", "rakip", "ramazan", "rami", "ramis", "ramiye", "ramiz", "rana", "rasih", "rasiha", "rasim", "rasime", "rasin", "rasiye", "raşide", "raşit", "ratibe", "ratip", "rauf", "raufe", "ravza", "rayet", "rayıhan", "rayiha", "razı", "razi", "raziye", "rebia", "reca", "recai", "refah", "refahet", "refhan", "refia", "refika", "reftar", "regaip", "reha", "rehayeddin", "renan", "renginar", "resai", "resane", "resulhan", "reşat", "revan", "revza", "reyhan", "reyya", "reyyan", "rezan", "rezzak", "rezzan", "rıdvan", "rıfat", "rıza", "rızkullah", "rızvan", "rical", "rifat", "rikap", "rikkat", "rindan", "risalet", "risalettin", "ruat", "ruhan", "ruhani", "ruhcan", "ruhfeza", "ruhsal", "ruhsar", "ruhsare", "ruhsat", "ruhşan", "ruhullah", "rüçhan", "rüksan", "rümeysa", "rüveyda", "rüveyha", "rüya", "saadet", "saadettin", "sacide", "sacit", "saçı", "sada", "sadak", "sadakat", "sadberk", "sadedil", "sadegül", "sadettin", "sadhezar", "sadık", "sadıka", "sadi", "sadice", "sadir", "sadiye", "sadrettin", "sadri", "sadriye", "sadullah", "sadun", "safa", "safder", "safer", "saffet", "safıgül", "safi", "safinaz", "safinur", "safir", "safire", "safiye", "safiyet", "safiyüddin", "safter", "sağan", "sağanak", "sağanalp", "sağbilge", "sağbudun", "sağcan", "sağdıç", "sağın", "sağınç", "sağıt", "sağlam", "sağlamer", "sağlar", "sağlık", "sağman", "sağun", "sahavet", "sahba", "sahibe", "sahil", "sahip", "sahir", "sahire", "sahra", "sahure", "saibe", "saide", "saika", "saim", "saime", "saip", "sair", "saire", "sait", "sak", "saka", "sakın", "sakıp", "saki", "sakibe", "sakin", "sakine", "sakman", "sal", "sala", "salâh", "salâhattin", "salâhi", "salan", "salâr", "salcan", "saldam", "salgur", "salık", "salıkbey", "salıkbike", "salınbike", "salih", "saliha", "salim", "salime", "salis", "salise", "salkım", "salkın", "salman", "saltan", "saltanat", "saltı", "saltık", "saltuk", "saltukalp", "salur", "salurbay", "samahat", "samanur", "samet", "sami", "samih", "samiha", "samim", "samime", "samimi", "samin", "samir", "samire", "samiye", "samur", "samuray", "samurtay", "san", "sanaç", "sanak", "sanal", "sanalp", "sanat", "sanavber", "sanay", "sanbay", "sanberk", "sancak", "sancaktar", "sancar", "sancarhan", "sançar", "sanduç", "sanem", "sanemnur", "saner", "sanevber", "sani", "sania", "sanih", "saniha", "saniye", "sanlı", "sannur", "sanşın", "sanver", "sar", "sara", "saraç", "saral", "saran", "sarbek", "sare", "sargan", "sargın", "sargınal", "sargut", "sarıalp", "sarıbay", "sarıca", "sarıçam", "sarıçiçek", "sarıer", "sarıgül", "sarıgüzel", "sarıhan", "sarıkaya", "sarıkız", "sarıtaş", "sarim", "sarkan", "sarmaşık", "sarp", "sarper", "sarphan", "sarpkan", "sarpkın", "sarpkoç", "sart", "sartık", "saru", "saruca", "saruhan", "sarvan", "satı", "satıa", "satıbey", "satıgül", "satıhanım", "satılmış", "satu", "satuk", "satukbuğra", "satvet", "sav", "sava", "savacı", "savak", "savaş", "savaşan", "savaşer", "savaşkan", "savat", "saver", "savgat", "savlet", "savni", "savniye", "savran", "savtekin", "savtunç", "savtur", "savun", "say", "saya", "sayan", "sayar", "saybay", "saydam", "saygı", "saygılı", "saygın", "saygun", "saygül", "sayhan", "sayıl", "sayılbay", "sayılgan", "sayım", "sayın", "sayınberk", "sayınbey", "sayıner", "saykal", "saykut", "saylam", "saylan", "saylav", "saylu", "sayman", "saymaner", "saynur", "sayraç", "sayrak", "sayran", "sayrı", "sayru", "sayvan", "sayyat", "sazak", "seba", "sebahat", "sebahattin", "sebat", "sebati", "sebükalp", "secahat", "seçilay", "seda", "sedanur", "sedat", "sefa", "seha", "sehavet", "sehernaz", "sehhar", "sehhare", "sehran", "selâhattin", "selâmullah", "selay", "selcan", "selçukkan", "selda", "seldağ", "selekman", "selhan", "selkan", "selma", "selman", "selva", "selvican", "selvihan", "selvinaz", "sema", "semagül", "semahat", "semai", "semanur", "semavi", "semiha", "semiramis", "semiray", "semra", "sena", "senai", "senal", "senar", "senay", "sencan", "seniha", "sera", "serad", "seralp", "seran", "serap", "seray", "serazat", "serbay", "sercan", "sercihan", "serdal", "serdar", "serdarhan", "serfiraz", "serhan", "serhas", "serhat", "serkan", "serma", "sernaz", "sernevaz", "serra", "sertaç", "sertap", "servinaz", "settar", "seval", "sevan", "sevay", "sevcan", "sevda", "sevdakâr", "sevenay", "sevencan", "severcan", "sevgican", "sevgihan", "sevginaz", "sevican", "sevilay", "sevilcan", "sevinay", "sevkal", "sevkan", "sevnaz", "sevsay", "sevtap", "seyda", "seyfali", "seyfullah", "seyhan", "seyithan", "seyran", "seyyal", "seyyare", "seza", "sezai", "sezal", "sezan", "sezay", "sezginay", "sezginbaş", "sıba", "sıdal", "sıdam", "sıdar", "sıddıka", "sıdıka", "sıla", "sılan", "sıral", "sıralp", "sırat", "sırga", "sırma", "sırmahan", "sıylıhan", "sima", "simavi", "simay", "simayişems", "simhan", "sina", "sinan", "sincan", "sipahi", "siracettin", "siraç", "sirap", "sitare", "siva", "siyavuş", "solmaz", "somay", "sonad", "sonalp", "sonat", "sonay", "sonbahar", "sonbay", "sondal", "songurhan", "songurkan", "sontaç", "soral", "soyak", "soyalp", "soydan", "soydaner", "soydaş", "soyhan", "soykal", "soykan", "soylubay", "soysal", "soysaldı", "soysaltürk", "soysan", "soyupak", "soyurgal", "sönmezalp", "sönmezay", "sözal", "sualp", "suat", "suavi", "suay", "subaşı", "subay", "subutay", "suca", "sudan", "suhan", "suka", "sukat", "sultan", "suna", "sunal", "sunalp", "sunar", "sunay", "sunguralp", "sungurbay", "sunullah", "suyurgal", "suyurgamış", "suyurgan", "suzan", "süalp", "sübaş", "sübaşı", "sübitay", "südaş", "süeda", "süerkan", "süersan", "süha", "sühan", "sühandan", "sükan", "süleyman", "sülünay", "sümerkan", "sümeyra", "süngütay", "süphan", "süreyya", "süvari", "süveyda", "süzülay", "şad", "şadan", "şader", "şadıman", "şadi", "şadiye", "şaduman", "şafak", "şafaknur", "şafi", "şafiye", "şah", "şahadet", "şahadettin", "şahamet", "şahan", "şahane", "şahap", "şahat", "şahbanu", "şahbaz", "şahbey", "şahdane", "şahdar", "şahende", "şaheser", "şahhanım", "şahıgül", "şahika", "şahin", "şahinalp", "şahinbay", "şahinbey", "şahiner", "şahinhan", "şahinkan", "şahinter", "şahistan", "şahittin", "şahlan", "şahmelek", "şahnaz", "şahnisa", "şahnur", "şahruh", "şahsınur", "şahsüvar", "şahvar", "şahvelet", "şahver", "şahzade", "şahzat", "şaik", "şaika", "şair", "şaire", "şakar", "şakayık", "şakir", "şakire", "şamih", "şamiha", "şamil", "şamile", "şan", "şanal", "şanalp", "şaner", "şanlı", "şanlıbay", "şansal", "şansel", "şanser", "şanver", "şar", "şarbay", "şarık", "şarika", "şatır", "şayan", "şayegân", "şayeste", "şaylan", "şazi", "şaziment", "şaziye", "şebap", "şecaat", "şefaat", "şefaattin", "şefika", "şefkat", "şehadet", "şehadettin", "şehamet", "şehbal", "şehinşah", "şehnaz", "şehrazat", "şehriban", "şehrinaz", "şehsüvar", "şehvar", "şehzade", "şehzat", "şekernaz", "şekerpare", "şemail", "şemsinisa", "şenal", "şenalp", "şenaltan", "şenay", "şenbay", "şencan", "şendağ", "şendoğan", "şenkal", "şensal", "şenyaşar", "şerafet", "şerafettin", "şerefhan", "şerefnaz", "şetaret", "şevketfeza", "şevkinaz", "şevval", "şeyda", "şeydagül", "şeydanur", "şeyma", "şeyyat", "şıray", "şifa", "şimşad", "şimşekhan", "şimşekkan", "şinasi", "şinaver", "şipal", "şirinşah", "şirvan", "şirzat", "şuayp", "şungar", "şükran", "tacal", "tacettin", "tacızer", "taci", "tacim", "tacir", "taciser", "tacver", "taç", "taçeser", "taçkın", "taçlı", "taçlıyıldız", "taçnur", "taflan", "tagan", "tagangül", "tagay", "tağ", "tağalp", "tağar", "tağay", "tağman", "taha", "tahir", "tahire", "tahsin", "tahsine", "taibe", "taip", "takdir", "taki", "takiye", "takiyettin", "talas", "talât", "talay", "talayer", "talayhan", "talaykan", "talaykoç", "talaykurt", "talaykut", "talayman", "talaz", "talha", "tali", "talia", "talibe", "talih", "taliha", "talip", "taliye", "talu", "taluy", "taluyhan", "tamal", "tamam", "tamar", "tamay", "tamaydın", "tamçelik", "tamer", "tamerk", "tamgül", "tamkan", "tamkoç", "tamkurt", "tamkut", "tamtürk", "tan", "tanaçan", "tanaçar", "tanağar", "tanak", "tanal", "tanalp", "tanaltan", "tanaltay", "tanay", "tanaydın", "tanbay", "tanbek", "tanberk", "tanbey", "tanboğa", "tanbolat", "tancan", "tandan", "tandoğan", "tandoğdu", "tandoğmuş", "tandoruk", "tanegül", "tanel", "tanelgin", "taner", "tanerk", "tanfer", "tangör", "tangüç", "tangül", "tangülü", "tangün", "tangüner", "tanhan", "tanhatun", "tanık", "tanın", "tanır", "tanırcan", "tanırer", "tanış", "tanju", "tankan", "tankoç", "tankurt", "tankut", "tankutlu", "tanla", "tanlak", "tanman", "tanören", "tanpınar", "tanrıkorur", "tanrıkul", "tanrıkulu", "tanrıöver", "tansal", "tansan", "tansel", "tanseli", "tansen", "tanser", "tanses", "tansev", "tanseven", "tansever", "tansı", "tansığ", "tansık", "tansoy", "tansu", "tansuğ", "tansuk", "tantuğ", "tantürk", "tanuğur", "tanver", "tanyel", "tanyeli", "tanyer", "tanyeri", "tanyıldız", "tanyol", "tanyolaç", "tanyolu", "tanyu", "tanyücel", "tanyüz", "tanzer", "tapduk", "tapgaç", "tapık", "tapınç", "taplı", "taptuk", "tarancı", "tarçın", "tardu", "tarduk", "targan", "tarhan", "tarhun", "tarı", "tarık", "tarım", "tarıman", "tarımbike", "tarımer", "tarik", "tarkan", "tarman", "tartış", "taru", "tasvir", "taşan", "taşar", "taşboğa", "taşbudak", "taşcan", "taşdemir", "taşdöven", "taşel", "taşer", "taşgan", "taşhan", "taşkan", "taşkent", "taşkın", "taşkınel", "taşkıner", "taşkıran", "taştan", "taştekin", "tatar", "tatarhan", "tatarkan", "tatlı", "tatu", "tav", "tavgaç", "tavlan", "tavlı", "tavus", "tavuş", "tay", "taya", "tayak", "tayanç", "tayaydın", "taybars", "taybek", "tayberk", "tayboğa", "taycan", "taydaş", "taydemir", "tayfun", "tayfur", "taygan", "taygun", "tayguner", "tayhan", "taykara", "taykoç", "taykurt", "taykut", "tayla", "taylak", "taylan", "taylaner", "tayman", "taymaz", "taypars", "tayuk", "tayyar", "tayyibe", "tayyip", "taze", "tazegül", "teberdar", "tekal", "tekalp", "tekant", "tekay", "tekbay", "tekcan", "tekdoğan", "tekebaş", "tekebay", "tekecan", "tekinal", "tekinalp", "tekinay", "tekindağ", "tekinhan", "tekyay", "temirbay", "temircan", "temirhan", "temirkan", "temirtaş", "temizalp", "temizcan", "temizhan", "temizkal", "temizkan", "temizsan", "temürhan", "temürşah", "tenay", "tendübay", "tengizalp", "teoman", "tercan", "terlan", "tevfika", "tevrat", "tezal", "tezalp", "tezay", "tezcan", "tezcanlı", "tezkan", "tınal", "tınaz", "tilmaç", "timurcan", "timurhan", "timurkan", "timurtaş", "tiraje", "toğan", "toğay", "tokal", "tokalan", "tokalp", "tokay", "tokcan", "tokhan", "tokkan", "tokta", "toktahan", "toktamış", "toktaş", "tokuşhan", "tokyay", "tola", "tolay", "tolga", "tolgahan", "tolgan", "tolgay", "tolgunay", "tolonay", "tolonbay", "tolunay", "tolunbay", "tongal", "tongar", "topa", "topaç", "topak", "topay", "topaz", "topçam", "topçay", "toprak", "toralp", "toraman", "toran", "torcan", "torgay", "torhan", "torkal", "torkan", "torlak", "torumtay", "toyboğa", "toycan", "toygar", "toyka", "tozan", "törehan", "tuba", "tufan", "tugay", "tuğal", "tuğalp", "tuğaltan", "tuğaltay", "tuğba", "tuğbay", "tuğhan", "tuğkan", "tuğra", "tuğsan", "tuğsav", "tuğsavaş", "tuğsavul", "tuğsavun", "tuğtaş", "tuğtay", "tuğyan", "tulca", "tulga", "tulgar", "tuman", "tumay", "tuna", "tunacan", "tunaer", "tunahan", "tunakan", "tunay", "tunca", "tuncal", "tuncalp", "tuncay", "tunçal", "tunçalın", "tunçalp", "tunçaral", "tunçaslan", "tunçay", "tunçbay", "tunçboğa", "tunççağ", "tunçhan", "tunçkan", "tunçkaya", "tunçtan", "tunga", "tura", "turaç", "tural", "turalp", "turan", "turatekin", "turay", "turbay", "turcan", "turfa", "turgay", "turhan", "turhatun", "turkan", "turna", "tutuhan", "tuvana", "tuyan", "tükelalp", "tükelay", "tülay", "tülcan", "tülinay", "tümay", "tümbay", "tümcan", "tümenbay", "tümenboğa", "tümerkan", "tümhan", "tümkal", "tümkan", "tünak", "tünal", "tünay", "tünaydın", "türehan", "türkalp", "türkaslan", "türkay", "türkcan", "türkdoğan", "türkkan", "türksan", "türkyılmaz", "tüzünalp", "tüzünkan", "ubeydullah", "uca", "ucaer", "ucatekin", "uça", "uçan", "uçanay", "uçanok", "uçantekin", "uçantürk", "uçar", "uçarer", "uçarlı", "uçay", "uçbay", "uçhan", "uçkan", "uçkara", "uçma", "uçmak", "uçman", "uflaz", "ufukay", "ufuktan", "ugan", "uğan", "uğanbike", "uğural", "uğuralp", "uğurata", "uğuray", "uğurcan", "uğurhan", "uğurlubay", "uğursal", "uğursan", "uğursay", "uğurtan", "uğurtay", "ulaç", "ulaçhan", "ulaçkan", "ulak", "ulakbey", "ulam", "ular", "ulaş", "ulcan", "ulcay", "ulualp", "uluant", "ulubaş", "ulubay", "uluca", "ulucan", "uluçağ", "uluçam", "uluçkan", "uludağ", "uludoğan", "uluerkan", "uluhan", "ulukaan", "ulukan", "ulukaya", "uluman", "ulunay", "ulusal", "ulusan", "uluşahin", "uluşan", "ulutan", "ulutaş", "ulutay", "ulya", "uma", "umaç", "umak", "uman", "umar", "umay", "umman", "umran", "umural", "umuralp", "umurbay", "unan", "unat", "ungan", "ural", "uralp", "uraltan", "uraltay", "uram", "uran", "uras", "uraz", "uraza", "urazlı", "urhan", "urkan", "usal", "usalan", "usalp", "usbay", "ushan", "uskan", "usman", "usta", "uşak", "utkan", "utman", "uyar", "uyaralp", "uyarel", "uyarer", "uygan", "uygar", "uyguralp", "uysal", "uzalp", "uzay", "uzbay", "uzcan", "uzhan", "uzkan", "uzman", "uzsan", "uztan", "uztaş", "uztav", "uztay", "übeydullah", "üftade", "ükkaşe", "ülgenalp", "ülkühan", "ülkütan", "ümmühan", "ümran", "ünal", "ünalan", "ünaldı", "ünalmış", "ünalp", "ünay", "ünkan", "ünkaya", "ünsaç", "ünsal", "ünsan", "ünsay", "ünüvar", "ünyay", "ürünay", "üründübay", "üstat", "üstay", "üstünbay", "vacibe", "vacide", "vacip", "vacit", "vafi", "vafir", "vafit", "vaha", "vahap", "vahdet", "vahdettin", "vahibe", "vahide", "vahip", "vahit", "vahittin", "vaiz", "vakkas", "vakur", "vâlâşan", "valide", "vamık", "vamıka", "varal", "varaş", "vardar", "vargın", "varlık", "varol", "vasfi", "vasfiye", "vasıf", "vasıl", "vasıla", "vassaf", "vatan", "vataner", "vecahet", "vecahettin", "veciha", "veda", "vedat", "vedia", "vefa", "vefai", "vefakâr", "vefia", "vefika", "velican", "veliyullah", "veral", "verda", "verdinaz", "verşan", "vesamet", "vicdan", "vicdani", "vildan", "visali", "visam", "volkan", "vural", "vuslat", "yada", "yadacı", "yadigâr", "yafes", "yağan", "yağın", "yağınalp", "yağısıyan", "yağış", "yağız", "yağızalp", "yağızbay", "yağızboğa", "yağızer", "yağızhan", "yağızkan", "yağızkurt", "yağıztekin", "yağmanaz", "yağmur", "yağmurca", "yahşi", "yahşibay", "yahşiboğa", "yahşihan", "yahşikan", "yahşitay", "yahya", "yakup", "yakut", "yalap", "yalav", "yalavaç", "yalaz", "yalaza", "yalazahan", "yalazakan", "yalazalp", "yalazan", "yalazay", "yalçın", "yalçıner", "yalçınkaya", "yalçuk", "yaldırak", "yaldırım", "yaldız", "yalgı", "yalgın", "yalgınay", "yalım", "yalın", "yalınalp", "yalınay", "yalkı", "yalkın", "yalmaç", "yalman", "yalt", "yaltır", "yaltırak", "yaltıray", "yalvaç", "yamaç", "yaman", "yamaner", "yamanöz", "yamansoy", "yamantürk", "yamanyiğit", "yamçı", "yanaç", "yanal", "yanar", "yanbek", "yanbey", "yandil", "yangâr", "yanık", "yanıker", "yankı", "yapalak", "yapıncak", "yaprak", "yararer", "yaraşık", "yârcan", "yardak", "yargan", "yargı", "yarkan", "yarkaya", "yarkın", "yarlık", "yarluk", "yarpuz", "yaruk", "yasa", "yasan", "yasavul", "yasemin", "yaser", "yasin", "yasun", "yaşa", "yaşam", "yaşanur", "yaşar", "yaşartürk", "yaşdaş", "yaşık", "yaşıl", "yaşın", "yaşıyan", "yaşlak", "yatman", "yatuk", "yavaş", "yaver", "yavuz", "yavuzalp", "yavuzay", "yavuzbay", "yavuzboğa", "yavuzcan", "yavuzer", "yavuzhan", "yavuzsoy", "yay", "yayak", "yayalp", "yaybörü", "yaybüke", "yaygır", "yayla", "yaylagül", "yaylak", "yazan", "yazar", "yazgan", "yazganalp", "yazgı", "yazgül", "yazgülü", "yazık", "yazır", "yekta", "yelal", "yelbay", "yelboğa", "yelda", "yeldan", "yenal", "yenay", "yeneral", "yertan", "yesari", "yetişal", "yezdan", "yıbar", "yılay", "yılbay", "yıldanur", "yıldıralp", "yıldıran", "yıldıraner", "yıldıray", "yıldızhan", "yılhan", "yılkan", "yılma", "yılmaz", "yılmazok", "yıpar", "yiğitcan", "yiğithan", "yiğitkan", "yinanç", "yoğunay", "yola", "yolaç", "yolal", "yoldaş", "yoma", "yonca", "yordam", "yordamlı", "yosma", "yönal", "yula", "yura", "yurdaal", "yurdaay", "yurdacan", "yurdaer", "yurdagül", "yurdakul", "yurdal", "yurdanur", "yurdaser", "yurdaşen", "yurdatap", "yurday", "yurtal", "yurtbay", "yurtcan", "yurtkuran", "yurtman", "yurtsal", "yurtsan", "yurtsay", "yurttaş", "yücealp", "yücebaş", "yücedağ", "yücelay", "yücesan", "yüzüak", "zade", "zafer", "zafir", "zafire", "zağnos", "zahide", "zahir", "zahire", "zahit", "zaide", "zaik", "zaika", "zaim", "zait", "zaki", "zakir", "zakire", "zaman", "zambak", "zamir", "zamire", "zarif", "zarife", "zati", "zatinur", "zatiye", "zehra", "zekeriya", "zeliha", "zennişan", "zerafet", "zerefşan", "zeria", "zernişan", "zerrintaç", "zeycan", "zeynullah", "zeyyat", "ziba", "zican", "zikrullah", "zişan", "ziya", "ziyaeddin", "ziyaettin", "ziyafet", "ziyat", "ziynetullah", "zoral", "zuhal", "zühal", "züleyha", "zülfibar", "zülfikar", "zülfiyar", "zülfizar", "zülfübar", "zülfüyar", "zülfüzar", "zülkarneyn", "zümra", "bâhir", "bâhire", "bedel", "beder", "bedi", "bedih", "bedihe", "bedir", "bedis", "bediz", "bedrettin", "bedri", "bedriye", "bedük", "begim", "begüm", "beğenç", "behçet", "behice", "behiç", "behin", "behire", "behiye", "behlül", "behmen", "bek", "bekâm", "bekdemir", "bekdil", "bekem", "beken", "beker", "bekir", "bektöre", "bektürk", "belek", "belen", "belge", "belgi", "belgin", "beliğ", "belik", "belin", "beliz", "belkıs", "bellek", "belmen", "bender", "bendeş", "benek", "bener", "benevşe", "bengi", "bengigül", "bengisoy", "bengisu", "bengü", "bengül", "benice", "benli", "benligül", "bennur", "benol", "bensu", "benşen", "bent", "bentürk", "benzer", "berceste", "bercis", "bereket", "beren", "berfin", "berfu", "berge", "bergin", "beri", "berin", "beriye", "berk", "berke", "berkel", "berker", "berki", "berkin", "berkiye", "berkmen", "berkok", "berkol", "berköz", "berksoy", "berksu", "berksun", "berktin", "berkün", "bermude", "berrin", "berşe", "berter", "besen", "besim", "besime", "beste", "bestegül", "beşer", "beşgül", "beşir", "beşire", "betigül", "betik", "betil", "betim", "betül", "beygu", "beylem", "beyrek", "beysun", "beytekin", "beytemir", "beytöre", "bezek", "bezen", "bezmiâlem", "bige", "bigüm", "bihin", "bihine", "bihter", "bihterin", "bike", "bilâl", "bilek", "bilen", "bilender", "bilge", "bilgeer", "bilgekurt", "bilgekut", "bilgen", "bilgenur", "bilger", "bilgetürk", "bilgi", "bilgiç", "bilgin", "bilginer", "bilginur", "bilgiser", "bilgü", "bilgün", "bilik", "bilir", "biliş", "billûr", "bilmen", "bilnur", "bilsen", "bilsev", "bilsin", "biner", "bingöl", "bingül", "bingün", "binışık", "biniz", "binnur", "bintuğ", "binzet", "birben", "birbenek", "birce", "birçek", "birge", "birgen", "birgi", "birgit", "birgül", "birgün", "biricik", "birim", "biriz", "birke", "birkök", "birmen", "birnur", "birol", "birsel", "birsen", "birsin", "birsoy", "birşen", "birtek", "birten", "bitek", "bitengül", "bitim", "boncuk", "bor", "boy", "boyer", "boylu", "boz", "bozbey", "bozçin", "bozdemir", "bozdeniz", "bozer", "bozerk", "bozkır", "bozkurt", "bozok", "boztepe", "boztimur", "bozyel", "bozyiğit", "böget", "böğrek", "böğürtlen", "böke", "böken", "börçek", "börk", "börteçin", "börü", "börübey", "budun", "bugül", "buket", "bulgu", "buluç", "bulunç", "buluş", "bulut", "buluttekin", "bumin", "burcu", "burç", "burçin", "buruk", "buruktekin", "buse", "buyruk", "buyrukçu", "büge", "büget", "büğdüz", "bük", "büke", "büklüm", "bülbül", "bülent", "bürçe", "bürçin", "bürge", "bürgü", "bürküt", "bürümcek", "büte", "bütün", "cebe", "ceben", "cebesoy", "çeber", "çelebi", "çelikbilek", "çitlembik", "çölbey", "demirbüken", "dilbent", "dilber", "dilbeste", "dilbu", "dudubikem", "ebecen", "ebed", "ebet", "ebru", "ebubekir", "ecebey", "edibe", "ekber", "elbek", "elbeyi", "elbirle", "elbirlik", "elçibey", "elibol", "erbelgin", "erben", "erberk", "erbey", "erbil", "erbilek", "erbilen", "erbilir", "erboy", "erdibek", "erdibey", "erdibike", "erdibikem", "eribe", "feribe", "gökbel", "gökbelen", "gökben", "gökberk", "gökbey", "gökbörü", "gökbudun", "gökbulut", "gökçebel", "gökçebey", "görbil", "gurbet", "gülbeden", "gülbek", "gülben", "gülbende", "gülbeniz", "gülberk", "gülbeşeker", "gülbey", "gülbeyi", "gülbike", "gülbikem", "gülbil", "gülbin", "gülbitti", "gülbiz", "gülboy", "gülbu", "gülbün", "gülbüz", "gülebetin", "gülengübin", "gülpembe", "gümberk", "günbek", "günbey", "gündüzbey", "güngörbey", "gürbüz", "heybet", "hürbey", "ışınbike", "ibik", "ibili", "ibiş", "ibo", "içimbike", "ilbeg", "ilbek", "ilbey", "ilbeyi", "ilbike", "ilbilge", "ilbozdu", "ilbudun", "incebey", "isenbike", "izbörü", "izbudun", "izbul", "kâtibe", "kebir", "kebire", "kebuter", "kelebek", "kırbörü", "kızgınbey", "kızılbörü", "kiçkinebike", "koçbörü", "koçubey", "konurbey", "kutbiye", "lebibe", "lebip", "lebriz", "mebruk", "mebruke", "mebrur", "mebrure", "mebus", "mebuse", "mengüberti", "mergube", "mevhibe", "muhibbe", "muhibbi", "mukbil", "mukbile", "muştubey", "muteber", "mübeccel", "mübeyyen", "mübin", "mübine", "mühibe", "münibe", "nebi", "nebih", "nebihe", "nebil", "nebile", "nebiye", "necibe", "nesibe", "nevber", "nilberk", "nuhbe", "nurben", "nurbige", "oben", "obuz", "oğulbey", "okbudun", "orbek", "öbek", "ölmezbey", "özbek", "özben", "özberk", "özbey", "özbil", "özbilek", "özbilen", "özbilge", "özbilgin", "özbilir", "özbir", "özcebe", "pembe", "pembegül", "rebi", "rebii", "rebiyye", "rehber", "sebih", "sebil", "sebile", "seblâ", "sebu", "sebük", "sebüktekin", "serbülent", "sibel", "simber", "soylubey", "subegi", "subhi", "subhiye", "sulbiye", "sülünbike", "sümbül", "sümbülveş", "sünbüle", "şebnem", "şebnur", "şekibe", "şerbet", "şirinbegim", "şirinbige", "teber", "teberhun", "teberrük", "tebessüm", "tebrik", "tekbek", "tekbey", "tekbir", "tekebey", "tellibey", "tibet", "tilbe", "tolunbike", "tosunbey", "tunçbilek", "tunçbörü", "tüblek", "ubeyde", "ubeyt", "uçbeyi", "uğurlubey", "ulubek", "uluberk", "ulubey", "uluğbey", "umurbey", "urbeyi", "usberk", "usbey", "usunbike", "übeyd", "übeyde", "übeyt", "übük", "ünübol", "vecibe", "vehbi", "vehbiye", "yolbul", "zebercet", "zobu", "zorbey", "zübeyde", "zübeyr", "cedide", "celâdet", "celâl", "celâlettin", "celâli", "celâsun", "celâyir", "celil", "celile", "cem", "cemi", "cemil", "cemile", "ceminur", "cemre", "cemşir", "cemşit", "cengâver", "cenger", "cengiz", "cenk", "cenker", "cennet", "ceren", "cerit", "cesim", "cesur", "cevdet", "cevher", "cevheri", "cevri", "cevriye", "ceyhun", "ceylân", "cezlân", "cezmi", "cilvekâr", "cimşit", "cindoruk", "coşku", "coşkun", "coşkuner", "coşkunsu", "cömert", "cuci", "cudi", "cudiye", "culduz", "cumhur", "cumhuriyet", "cündi", "cüneyt", "delice", "dicle", "domurcuk", "ece", "ecegül", "ecemiş", "ecenur", "ecer", "ecevit", "ecir", "ecmel", "ecvet", "ekinci", "emcet", "erce", "erciyes", "ercüment", "erincek", "erincik", "evcil", "evcimen", "evecen", "fecir", "fecri", "fecriye", "gelincik", "gence", "gencel", "gencer", "genco", "gonce", "göcek", "gökcen", "gücel", "gücer", "gücümen", "gülce", "gülece", "gülinci", "güvercin", "güzelce", "hicret", "huceste", "hüccet", "hüceste", "iclâl", "imece", "ince", "incesu", "inci", "inciden", "incifem", "incifer", "incigül", "incilâ", "incilây", "incinur", "incisel", "inciser", "ivecen", "iyicil", "kıvılcım", "korucu", "mecdi", "mecdut", "mecide", "mecit", "mecittin", "mecnun", "mehcur", "mehcure", "mengücek", "mescur", "mevcude", "mevcut", "mucide", "mucip", "mucit", "mucize", "müceddet", "mücellâ", "mücessem", "mücevher", "münci", "münciye", "necdet", "necile", "necip", "neclâ", "necmi", "necmiye", "necve", "netice", "öncel", "öncü", "öncüer", "özgeci", "recep", "selcen", "sencer", "tecelli", "tecen", "tecer", "teceren", "tecim", "tecimen", "tecimer", "tecir", "ticen", "tomurcuk", "tuğcu", "tuncel", "tuncer", "ülkücü", "vecdet", "vecdi", "vechi", "vechiye", "vecih", "vecihe", "vecihi", "vecit", "yüce", "yüceer", "yücel", "yücelen", "yücelt", "yücelten", "yücenur", "yücesoy", "yücetekin", "yücetürk", "çeçen", "çekik", "çekim", "çekin", "çelem", "çelen", "çelenk", "çelik", "çelikel", "çeliker", "çelikiz", "çelikkol", "çeliköz", "çeliksu", "çelikten", "çeliktürk", "çelikyürek", "çelim", "çeltik", "çender", "çengiz", "çepni", "çerçi", "çeri", "çerkez", "çerme", "çetik", "çetin", "çetinel", "çetiner", "çetinok", "çetinöz", "çetinsoy", "çetinsu", "çetintürk", "çetinyiğit", "çevik", "çevikel", "çeviker", "çeviköz", "çevrim", "çeyiz", "çığ", "çığıl", "çığır", "çıngı", "çıvgın", "çiçek", "çiftçi", "çiğdem", "çiğil", "çiğlez", "çilek", "çilen", "çilenti", "çiler", "çimen", "çin", "çinel", "çiner", "çinerk", "çingiz", "çinkılıç", "çinuçin", "çisen", "çisil", "çoker", "çoku", "çopur", "çotuk", "çotur", "çökermiş", "çöyür", "demirgüç", "demirkoç", "demirpençe", "dikeç", "dinç", "dinçel", "dinçer", "dinçerk", "dinçkol", "dinçkök", "dinçmen", "dinçok", "dinçol", "dinçöz", "dinçsel", "dinçsoy", "dinçsü", "dinçtürk", "direnç", "elçi", "elçim", "elçin", "emeç", "enç", "eneç", "erçelik", "erçetin", "erçevik", "erçil", "erdinç", "erengüç", "ergenç", "ergüç", "ergüleç", "ergüvenç", "erinç", "erinçer", "erkılıç", "erkoç", "erseç", "ersevinç", "ertunç", "fereç", "genç", "gençel", "gençer", "gençsoy", "gençsu", "gençtürk", "gerçek", "gerçeker", "girginkoç", "göçen", "göçer", "göçmen", "göğünç", "gökçe", "gökçeer", "gökçek", "gökçel", "gökçem", "gökçen", "gökçer", "gökçesu", "gökçil", "gökçin", "gökçül", "gökçün", "göktunç", "gönç", "gönenç", "görgüç", "göyünç", "gözenç", "güç", "güçel", "güçeren", "güçermiş", "güçlü", "güçlüer", "güçlütürk", "güçmen", "güçsel", "güçyener", "güçyeter", "gülçe", "gülçehre", "gülçiçek", "gülçimen", "gülçin", "gülçün", "güleç", "güleçer", "gümeç", "günçe", "günçiçeği", "günçiçek", "güneç", "güvenç", "hiçsönmez", "içim", "içli", "içöz", "içten", "ilçi", "ilginç", "kılıç", "kılıçel", "kılıçer", "kılınç", "kırçiçek", "kızıltunç", "kiçi", "koç", "koçer", "koçsoy", "koçtuğ", "koçtürk", "koçu", "koçyiğit", "konçuy", "köçeri", "lâçin", "mehmetçik", "mengüç", "meriç", "nurçin", "okçun", "okgüç", "okgüçlü", "oktunç", "olçun", "opçin", "orçun", "ortunç", "oruç", "oytunç", "öğrünç", "öğünç", "ölçüm", "ölçün", "öndünç", "öveç", "övgünç", "övünç", "özçelik", "özçevik", "özçın", "özdinç", "özdinçer", "özenç", "özerdinç", "özerinç", "özgenç", "özgüç", "özgüleç", "özkoç", "özokçu", "öztunç", "perçem", "periçehre", "pürçek", "seçen", "seçgül", "seçik", "seçil", "seçim", "seçkin", "seçkiner", "seçme", "seçmeer", "seçmen", "seçmener", "selçuk", "selçuker", "selgüç", "serdengeçti", "serdinç", "sevinç", "sonuç", "sorguç", "soydinç", "soydinçer", "soyselçuk", "tekçe", "temuçin", "timuçin", "tonguç", "tuğçe", "tunç", "tunçdemir", "tunçel", "tunçer", "tunçkılıç", "tunçkol", "tunçkurt", "tunçok", "tunçöven", "tunçsoy", "tunçtürk", "tunguç", "tümkoç", "uç", "uçkun", "uçuk", "uçur", "uluç", "ulumeriç", "üçe", "üçel", "üçer", "üçgül", "üçışık", "üçkök", "üçok", "üçük", "ünüçok", "yoruç", "âdem", "dâhi", "dânâ", "dede", "define", "defne", "değer", "değmeer", "dehri", "delâl", "demet", "demhoş", "demir", "demirdelen", "demirdöven", "demirel", "demirer", "demirezen", "demirgülle", "demiriz", "demirkol", "demirkök", "demirkurt", "demirkut", "demirok", "demirol", "demiröz", "demirsoy", "demirtekin", "demirtuğ", "demirtürk", "demiryürek", "demren", "dengiz", "dengizer", "deniz", "denizel", "denizer", "denizmen", "deniztekin", "denk", "denkel", "denker", "denli", "denlisoy", "deren", "derenel", "derin", "derinkök", "derinöz", "derlen", "derviş", "deste", "destegül", "devin", "deviner", "devlet", "devlettin", "devrim", "devrimer", "didem", "didim", "dik", "dikel", "diken", "diker", "dikey", "dikmen", "diksoy", "dil", "dilâ", "dilân", "dilâşup", "dilâver", "dilderen", "dilefruz", "dilege", "dilek", "dilem", "dilemre", "diler", "dilfigâr", "dilfiruz", "dilge", "dilhun", "dilhuş", "dilmen", "dilnişin", "dilnur", "dilsuz", "dilşen", "dilşikâr", "dilyâr", "diren", "diri", "dirik", "diriker", "dirikök", "diril", "dirim", "dirimtekin", "dirin", "diriner", "dirisoy", "dirlik", "doğru", "doğruel", "doğruer", "doğruol", "doğruöz", "doğu", "doğuer", "doğuş", "dolun", "doru", "doruk", "dorukkurt", "dorukkut", "doruktekin", "doruktepe", "dost", "dölek", "dölen", "dölensoy", "döndü", "döne", "dönmez", "dönmezer", "dönmezsoy", "dönmeztekin", "dönü", "dönüş", "dudu", "duhter", "dumlu", "dumrul", "durdu", "durgun", "durguner", "durgunsu", "durkız", "durmuş", "dursun", "dursune", "durşen", "duru", "durugül", "duruiz", "duruk", "durul", "duruöz", "durusel", "durusoy", "durusu", "durutekin", "durutürk", "duşize", "duygu", "duygun", "duyu", "dülge", "dülger", "düri", "düriye", "dürnev", "dürri", "düşün", "düşünsel", "düzel", "düzey", "düzgün", "ede", "edgü", "edgüer", "edhem", "edip", "edis", "ediz", "efendi", "efgende", "ehed", "ejder", "eldem", "eldemir", "elidemir", "elverdi", "ender", "erdem", "erdemer", "erdemir", "erdemli", "erden", "erdener", "erdeniz", "erdeşir", "erdi", "erdil", "erdilek", "erdin", "erdiner", "erdoğ", "erdoğdu", "erdoğmuş", "erdöl", "erdölek", "erdönmez", "erdur", "erdurdu", "erdurmuş", "erdursun", "erduru", "erendemir", "erendiz", "ergüden", "ergüder", "eryıldız", "esendemir", "evdegül", "ferdi", "ferdiye", "ferhunde", "feride", "feridun", "fermude", "ferzend", "fide", "firdevs", "firdevsi", "füruzende", "gedik", "gediz", "gökdemir", "gökdeniz", "göndem", "gönder", "gönülden", "gönüldeş", "gözde", "güdek", "güder", "güldeğer", "güldehen", "güldem", "güldemet", "gülden", "güldeniz", "güldenur", "gülder", "gülderen", "güldermiş", "güldeste", "güldilek", "güldöne", "güldüren", "gülender", "gülfide", "gündemir", "günden", "gündeniz", "günder", "gündeş", "gündoğdu", "gündoğmuş", "gündöndü", "gündüz", "güngördü", "güzide", "hediye", "hemdem", "hıdır", "hurşide", "ıdık", "ıdıkut", "ıldır", "ıldız", "idi", "idikurt", "idikut", "idil", "idris", "iğdemir", "ildem", "ildemer", "ildemir", "ilden", "ildeniz", "ildeş", "iskender", "işgüden", "işgüder", "jülide", "kızıldemir", "kuddus", "kuddusi", "kudret", "kudsiye", "ledün", "medeni", "medet", "medide", "medih", "medine", "medit", "mehdi", "mehdiye", "melodi", "memduh", "menderes", "merdi", "mesude", "mevdut", "mevlide", "mevlûde", "mevlüde", "mezide", "muktedir", "muslihiddin", "müderris", "müdrik", "müdrike", "müeddep", "müfide", "müjde", "müldür", "müride", "mürşide", "müveddet", "nedim", "nedime", "nedret", "neşide", "nevide", "nurdide", "nurdil", "nurdoğdu", "nurfide", "nüvide", "od", "oder", "okdemir", "okverdi", "orkide", "ödül", "önder", "önderol", "öndeş", "öründü", "özdeğer", "özdek", "özdel", "özdemir", "özden", "özdener", "özderen", "özdeş", "özdil", "özdilek", "özdoğdu", "özdoğmuş", "özdoğru", "özdoru", "özdoruk", "özdurdu", "özduru", "özdurul", "özdurum", "özender", "özerdem", "özerdim", "özönder", "özüdoğru", "özverdi", "pekdeğer", "peride", "remide", "reside", "reşide", "reşididdin", "rüveyde", "rüvide", "sedef", "seden", "sedit", "semender", "serdil", "sevde", "sevdiye", "sevgideğer", "sevindik", "seydi", "seyyide", "sıddık", "sıdkı", "sıdkıye", "sidre", "simden", "sude", "sudi", "sudiye", "suudi", "suzidil", "süerdem", "süerden", "sündüs", "süveyde", "şemdin", "şendeniz", "şendil", "şendur", "şengeldi", "şermende", "şevkidil", "şide", "tedü", "tendü", "tendürek", "tepedelen", "tevhiddin", "tevhide", "tokdemir", "topdemir", "toydemir", "toydeniz", "tümerdem", "türkdoğdu", "ufukdeniz", "uldız", "umdu", "urundu", "ülküdeş", "üngördü", "ünüdeğer", "ünverdi", "üründü", "vedi", "vedide", "vedit", "velide", "veliyüddin", "verdî", "yârıdil", "yedier", "yediger", "yediveren", "yıldıku", "yıldır", "yıldırer", "yıldırım", "yıldız", "yurdum", "yurdusev", "yurduşen", "zeyneddin", "zühdi", "âlem", "âsiye", "âtike", "âtiye", "âzime", "efe", "efgen", "efkâr", "eflâtun", "efruz", "efser", "efsun", "ege", "egemen", "egenur", "egesel", "eğilmez", "eğrek", "ehil", "ehlimen", "eke", "ekemen", "eken", "ekenel", "ekener", "ekim", "ekin", "ekiner", "ekmel", "ekrem", "elâ", "elânur", "elgin", "elif", "elife", "elik", "elitez", "eliuz", "eliüstün", "elöve", "elöver", "elver", "elveren", "emek", "emel", "emet", "emin", "emine", "eminel", "emir", "emoş", "emre", "emri", "emriye", "ener", "eneren", "energin", "enes", "enfes", "engin", "enginel", "enginer", "enginiz", "enginsoy", "enginsu", "engiz", "engür", "enis", "enise", "enmutlu", "enver", "er", "erek", "ereken", "erel", "erem", "eren", "erenel", "erengül", "erengün", "erenler", "erenöz", "erensoy", "erensü", "erentürk", "erenuluğ", "erer", "erge", "ergem", "ergen", "ergenekon", "ergener", "ergi", "ergil", "ergin", "erginel", "erginer", "erginsoy", "ergintuğ", "ergök", "ergökmen", "ergönen", "ergönül", "ergör", "ergun", "erguner", "ergül", "ergülen", "ergüler", "ergümen", "ergün", "ergüner", "ergüneş", "ergüney", "ergüven", "erhun", "erışık", "erik", "eriker", "erim", "erimel", "erimer", "erin", "erip", "eripek", "eriş", "erişen", "erişkin", "eriz", "erk", "erke", "erkel", "erker", "erkın", "erkınel", "erkış", "erkin", "erkinel", "erkiner", "erkmen", "erkmenol", "erkol", "erksoy", "erksun", "erktin", "erkul", "erkunt", "erkurt", "erkuş", "erkut", "erkutlu", "erlik", "ermiş", "ermiye", "ermutlu", "ernur", "eroğlu", "eroğul", "eroğuz", "erol", "eröge", "eröz", "ersel", "ersen", "erserim", "ersev", "erseven", "ersever", "ersevin", "ersezen", "ersezer", "ersin", "erson", "ersoy", "ersöz", "ersu", "ersun", "ersü", "erşen", "erşet", "erte", "ertek", "erteke", "ertekin", "ertem", "erten", "ertim", "ertin", "ertingü", "ertok", "ertop", "ertöre", "ertuğ", "ertuğrul", "ertut", "ertün", "ertüre", "ertürk", "ertüze", "ertüzün", "erülgen", "erün", "erüstün", "ervin", "eryetiş", "eryiğit", "erzi", "ese", "esen", "esenel", "esener", "esengül", "esengün", "esenkul", "esentimur", "esentürk", "eser", "esergül", "esim", "esin", "esiner", "eskin", "eslek", "esmer", "esvet", "eşe", "eşim", "eşin", "eşit", "eşkin", "eşmen", "eşref", "ethem", "eti", "etik", "etike", "evgin", "evin", "evirgen", "evnur", "evren", "evrensel", "evrim", "evrimer", "evsen", "evşen", "eylem", "eylül", "eymen", "eyüp", "ezel", "ezelî", "ezgi", "ezgin", "ezgü", "ezgüer", "ezgütekin", "fâkihe", "fehim", "fehime", "fehmi", "fehmiye", "felât", "felek", "fenni", "fenniye", "fer", "fergün", "ferhun", "feri", "ferih", "feriser", "ferişte", "ferit", "feriz", "fernur", "ferruh", "fersoy", "feruze", "ferve", "fesih", "fethi", "fethiye", "fetih", "fevzi", "fevziye", "feyiz", "feyzettin", "feyzi", "feyziye", "figen", "fikret", "fikrettin", "fikriye", "filizer", "firuze", "fügen", "fütüvvet", "gelener", "gelengül", "gelin", "gelinkız", "genez", "gevher", "gevheri", "gezer", "gezgin", "gezginer", "girginer", "gizem", "gizer", "gizmen", "göğem", "göğen", "gökel", "göken", "göker", "gökmen", "gökmener", "gökmete", "göknel", "gökperi", "göksel", "gökselen", "göksen", "göksenin", "gökser", "göksev", "gökseven", "göksever", "gökşen", "gökten", "göktöre", "gölge", "gönen", "gönener", "görez", "görkel", "görkem", "görkemli", "görker", "görkey", "görkmen", "görksev", "görsev", "gövem", "gövez", "göymen", "göze", "gözegir", "gözem", "gözlem", "güfte", "güher", "gülâfet", "gülâver", "güleğen", "gülek", "gülel", "gülen", "gülener", "gülengül", "gülennur", "güler", "güleren", "gülergin", "gülergün", "gülersin", "güleryüz", "gülesen", "güleser", "gülesin", "gülev", "gülfem", "gülfer", "gülgen", "gülgez", "gülgûne", "gülgüney", "gülgüzel", "gülipek", "gülmen", "gülneşe", "gülören", "gülözer", "gülperi", "gülrenk", "gülsel", "gülseli", "gülselin", "gülsemin", "gülsen", "gülser", "gülseren", "gülserim", "gülsev", "gülseven", "gülsever", "gülsevi", "gülsevil", "gülsevin", "gülsezer", "gülsezin", "gülsinem", "gülsüme", "gülşehri", "gülşeker", "gülşen", "gülşeref", "gülşerif", "gültekin", "gülten", "gülter", "gülümser", "gülümşen", "gülver", "gülveren", "gülzemin", "gümüştekin", "günel", "güner", "güneren", "günergin", "güneri", "günerim", "güneş", "güneşen", "güney", "günfer", "güngören", "güngöze", "günsel", "günseli", "günsenin", "günser", "günseren", "günşen", "güntekin", "günten", "güntöre", "günver", "günyeli", "gürel", "gürer", "gürsel", "gürselin", "gürsen", "gürses", "gürsev", "gürsevil", "gürşen", "gürten", "güven", "güze", "güzel", "güzey", "hâkime", "hâlet", "hekim", "heper", "hepgül", "hepşen", "hepyener", "hepyüksel", "heves", "hıfziye", "hızlıer", "hikmet", "hikmettin", "hilmiye", "himmet", "hoşsel", "hoşsen", "hoşses", "hoşten", "hulkiye", "hurisel", "huriser", "huriye", "hurrem", "hükmiye", "hüner", "hürmet", "hürrem", "hürriyet", "hürsel", "hürsen", "hürsev", "hürşen", "hüseyin", "hüsmen", "hüsne", "hüsniye", "hüsnügüzel", "hüsnüye", "hüsrev", "ışıker", "ışıner", "iffet", "ilergin", "ileri", "ilerigün", "ilke", "ilker", "ilksel", "ilksen", "ilksev", "ilkşen", "ilmen", "ilmiye", "ilsev", "ilseven", "ilsever", "ilşen", "iltekin", "iltemir", "iltemiz", "iltemür", "ilter", "ilteriş", "iltüze", "ime", "imer", "imge", "imre", "imren", "ipek", "ipekel", "ipekten", "irem", "iren", "irtek", "isen", "isenkutluğ", "ismet", "işmen", "işseven", "işsever", "işvekâr", "ivegen", "iyem", "iyimser", "iyiyürek", "izel", "izem", "izzet", "izzettin", "kâmile", "kâşife", "kâzime", "kekik", "keklik", "kelâmi", "keleş", "keleştimur", "kemter", "kent", "kenter", "kepez", "kerem", "kerim", "kerime", "kermen", "kesek", "kesim", "keskin", "keskinel", "keskiner", "keşfi", "keşfiye", "kete", "keven", "kevkep", "kevnî", "kevser", "key", "keyfi", "kezer", "kınel", "kıner", "kırteke", "kırtekin", "kısmet", "kıymet", "kiper", "kirmen", "korel", "korer", "koryürek", "koşuktekin", "kökel", "köken", "köker", "köklem", "kökten", "kömen", "körnes", "körpe", "köse", "kösem", "kösemen", "kösten", "köşek", "köşker", "köymen", "közer", "kumriye", "kutsel", "kutseli", "kuzey", "lâle", "lâlegül", "lâleruh", "lâmiye", "lâtife", "lemi", "lemiye", "lerze", "lerziş", "levent", "levin", "leylâ", "leylâgül", "leyli", "leylifer", "leylüfer", "leziz", "lezize", "lütfiye", "mefkûre", "meftun", "meftune", "mehip", "mehir", "mehmet", "mehru", "mehti", "mehtiye", "mehveş", "mekin", "mekki", "melek", "meleknur", "melekper", "melekru", "melen", "melih", "melik", "melike", "melis", "meliz", "meltem", "melûl", "memik", "memiş", "memnun", "memnune", "memo", "memun", "menekşe", "menevşe", "mengi", "mengli", "mengûş", "mengü", "mengüer", "mengütekin", "mensup", "mensur", "mensure", "menşur", "menşure", "menzur", "menzure", "mergen", "mergup", "merih", "mersin", "mert", "mertel", "merter", "mertkol", "mertol", "merttürk", "merve", "meryem", "merziye", "merzuk", "meserret", "mesih", "mesrur", "mesrure", "mestur", "mesture", "mesure", "mesut", "meşhur", "meşkûr", "meşkûre", "meşru", "mete", "methiye", "metin", "metine", "metiner", "mevlit", "mevlût", "mevlüt", "mevsim", "mevzun", "mevzune", "meyil", "meymun", "meymune", "mezit", "meziyet", "mezun", "mihine", "mihriye", "mine", "minnet", "mirkelâm", "muhlise", "muhsine", "muhterem", "muhteşem", "muine", "mukime", "munise", "muslihe", "mutluer", "mutlutekin", "mutver", "müesser", "müeyyet", "müferrih", "müge", "mükerrem", "mükevven", "mükremin", "mükrime", "mülhime", "mülket", "mümine", "münevver", "münife", "münime", "münire", "müren", "mürsel", "mürüvvet", "müsevver", "müslime", "müslüme", "müstenir", "müstenire", "müşerref", "müşküle", "müştehir", "müyesser", "müzehher", "müzekker", "müzeyyen", "nefer", "nefi", "nefis", "nefise", "nehip", "nehir", "nehire", "nehri", "nejlâ", "nemutlu", "neptün", "nergis", "nergise", "nerim", "nermi", "nermin", "nesil", "nesim", "nesime", "nesimi", "nesip", "nesli", "nesligül", "nesrin", "nesteren", "neşe", "neşegül", "neşem", "neşenur", "neşet", "neşever", "neşit", "neşve", "neveser", "nevfel", "nevgül", "nevhiz", "nevin", "nevinur", "nevir", "nevit", "nevres", "nevreste", "nevrettin", "nevri", "nevriye", "nevruz", "neyire", "neyyire", "neyyiri", "neyzen", "nezih", "nezihe", "nezihi", "nezir", "nezire", "nilüfer", "nimet", "niyet", "nurâlem", "nurel", "nurer", "nurersin", "nurettin", "nurfer", "nuriye", "nurmelek", "nurper", "nurperi", "nursel", "nurselen", "nurseli", "nursen", "nursenin", "nurser", "nurseren", "nursev", "nurseven", "nursevil", "nursevim", "nursevin", "nursine", "nurşen", "nurtek", "nurtekin", "nurten", "nurver", "nurveren", "nurzen", "nurzer", "nusret", "nusrettin", "nükhet", "nüzhet", "oğultekin", "oğuzer", "oker", "okergin", "oksev", "okseven", "oksever", "oktüre", "oktüremiş", "okver", "olguner", "onel", "oner", "onerim", "onguner", "ongüner", "ongüneş", "onuker", "onuktekin", "onursev", "onurseven", "öge", "öger", "öget", "ögetürk", "öğe", "öğet", "öğmen", "öke", "ökeer", "ökelik", "öker", "ökkeş", "ökmen", "ökmener", "ökte", "öktem", "öktemer", "ökten", "öktener", "ölen", "ölmez", "ömer", "önel", "önemli", "önen", "öner", "öneri", "öneş", "öney", "öngel", "öngen", "öngören", "önsel", "ören", "örenel", "örengül", "örfiye", "örge", "örgen", "örnek", "örsel", "örüner", "öryürek", "öşme", "ötleğen", "ötüken", "övet", "öymen", "özek", "özel", "özen", "özengin", "özengül", "özenir", "özenli", "özer", "özerek", "özerk", "özerkin", "özerkmen", "özerol", "özertem", "özge", "özgeer", "özgen", "özgener", "özger", "özgünel", "özgüner", "özgüneş", "özgüney", "özgürel", "özgüven", "özilter", "özipek", "özke", "özkent", "özker", "özlek", "özlem", "özlen", "özlenen", "özler", "özleyiş", "özlüer", "özmen", "özmert", "özöğe", "özpeker", "özpetek", "özsel", "özselen", "özsevi", "özsüer", "özşen", "öztek", "öztekin", "özten", "öztinel", "öztiner", "özüpek", "özver", "özveren", "özveri", "özvermiş", "pek", "peköz", "peksu", "pekşen", "pelin", "pelit", "peren", "peri", "perinur", "periru", "periveş", "perize", "permun", "pertev", "peruze", "perver", "pervin", "perviz", "pesen", "pesent", "petek", "peyker", "piruze", "prenses", "püren", "pürfer", "pürşen", "refet", "refettin", "refi", "refiğ", "refih", "refihe", "refii", "refik", "refiye", "reis", "rekin", "rekine", "remzi", "remziye", "rengin", "reset", "resmî", "resmigül", "resmiye", "resul", "reşik", "reşit", "reviş", "rezin", "rıfkıye", "ruhişen", "ruhiye", "ruhsen", "ruhşen", "rukiye", "ruşen", "ruziye", "rüknettin", "rüstem", "rüştiye", "sefer", "seferî", "seğmen", "seher", "sehergül", "sehi", "sekine", "sel", "selâh", "selâhi", "selâm", "selâmet", "selâmettin", "selâmi", "selâtin", "selek", "selekmen", "selen", "seler", "selışık", "selışıl", "selışın", "selim", "selime", "selin", "selmi", "selmin", "selnur", "selok", "selvet", "selvi", "semen", "semih", "semin", "semine", "semir", "semire", "semiye", "semuh", "senem", "sener", "senger", "sengül", "sengün", "senî", "senih", "seniye", "sennur", "senol", "seren", "serener", "serengül", "sergen", "sergin", "sergül", "sergün", "serhenk", "serhun", "serim", "serimer", "serin", "seringül", "serkut", "sermelek", "sermet", "sermin", "sernur", "serol", "serpil", "serpin", "sertel", "serter", "sertuğ", "server", "servet", "servi", "seven", "sevener", "sevengül", "sevengün", "sever", "sevgen", "sevgi", "sevgili", "sevgim", "sevginur", "sevgisun", "sevgül", "sevgün", "sevgür", "sevi", "seviğ", "sevik", "sevil", "sevilen", "sevilsen", "sevim", "sevimgül", "sevin", "sevnur", "sevsen", "sevsevil", "sevük", "sevüktekin", "seyfettin", "seyfi", "seyfiye", "seyhun", "seyit", "seylân", "seylâp", "seymen", "sezek", "sezel", "sezen", "sezer", "sezgen", "sezgi", "sezgin", "sezi", "sezim", "sezin", "seziş", "sezmen", "sırriye", "sıtkıye", "simge", "simten", "simüzer", "sine", "sinem", "siper", "siren", "sirer", "siret", "sirmen", "siyret", "somel", "somer", "sonel", "soner", "sonsen", "sonten", "sonver", "soyer", "soygüven", "soyluer", "soytekin", "soyuer", "sökmen", "sökmener", "sökmensü", "sökmensüer", "sönmez", "sönmezer", "sözen", "sözer", "sözmen", "suheyp", "sulhiye", "sumer", "sunel", "suner", "sungurtekin", "suphiye", "süel", "süer", "süeren", "süergin", "süheyl", "süheylâ", "sülemiş", "sümer", "sümeyre", "sünter", "sürmeli", "süsen", "süyek", "süzen", "şefik", "şeh", "şehâlem", "şehim", "şehime", "şehlevent", "şehmuz", "şehper", "şehriyâr", "şehriye", "şeker", "şekime", "şekip", "şekûr", "şekûre", "şelâle", "şemi", "şemim", "şemime", "şeminur", "şems", "şemsettin", "şemsi", "şemsifer", "şemsiye", "şen", "şenel", "şener", "şengil", "şengönül", "şengül", "şengün", "şeniz", "şenlen", "şenlik", "şennur", "şenol", "şenöz", "şensen", "şensoy", "şensu", "şentürk", "şenyer", "şenyıl", "şenyurt", "şenyüz", "şeref", "şerefnur", "şeremet", "şeren", "şerif", "şerife", "şermin", "şeşen", "şevket", "şevki", "şevkinur", "şevkiye", "şimşek", "şimşeker", "şive", "şivekâr", "şöhret", "şölen", "şule", "şükrettin", "şükriye", "şükûfe", "tegin", "tek", "teke", "teker", "tekeş", "tekgül", "tekil", "tekin", "tekinel", "tekiner", "tekinsoy", "tekir", "tekiş", "tekiz", "tekmil", "tekmile", "teknur", "tekok", "tekol", "teköktem", "teköz", "teközer", "teksen", "teksoy", "tekün", "tekünlü", "telek", "telim", "telimer", "telli", "telmize", "telvin", "temel", "temelli", "temenni", "temime", "temir", "temirkut", "temiz", "temizel", "temizer", "temizol", "temizöz", "temizsoy", "temre", "temren", "temürlenk", "tengir", "tengiz", "tenigül", "tennur", "tennure", "tenvir", "tepegöz", "tepel", "tepir", "terek", "terem", "terim", "terken", "teşrif", "teşrife", "tetik", "tetiker", "tevekkül", "tevfik", "tevhit", "tevil", "tevir", "tevs", "tevsen", "teymur", "tez", "tezel", "tezelli", "tezer", "tezeren", "tezerol", "tezgül", "tezok", "tezol", "tezveren", "tijen", "timurlenk", "tiner", "titizer", "tokel", "toker", "tokuzer", "tokyürek", "topel", "toper", "torel", "tökel", "tölek", "tömek", "töre", "töregün", "törel", "töreli", "tören", "tuğrultekin", "tuğsel", "tuğser", "tuğtekin", "tuhfe", "tutel", "tuter", "tuzer", "tükel", "tülek", "tülen", "tümel", "tümen", "tümer", "tümerk", "tümerkin", "tüner", "tüney", "türe", "türek", "türel", "türeli", "türemen", "türev", "türker", "türkine", "türkiye", "türkmen", "türksel", "türkşen", "tüze", "tüzeer", "tüzel", "tüzemen", "tüzenur", "tüzmen", "tüzüner", "uğurel", "uğursel", "uğurser", "uhuvvet", "uluer", "ulufer", "ulutekin", "ulviye", "umnise", "user", "usluer", "uygunel", "uyguner", "uzel", "uzer", "uzgören", "uzmen", "uztekin", "üge", "üke", "üleş", "ülez", "ülfer", "ülfet", "ülgen", "ülgener", "ülger", "ülke", "ülkem", "ülken", "ülkenur", "ülker", "ülkümen", "ülküsel", "ülküye", "ülmen", "ümek", "ümmet", "ümmiye", "ümniye", "ünek", "üner", "üngören", "ünlem", "ünlen", "ünlüer", "ünsel", "ünsev", "ünseven", "ünsever", "ünsevin", "ünsiye", "ünver", "ünveren", "ünvermiş", "ünzile", "ürek", "ürem", "üren", "üresin", "ürkmez", "ürmegül", "ürpek", "ürper", "üsgen", "üstek", "üstel", "üster", "üstüner", "ütügen", "üveys", "üye", "üzek", "üzer", "üzeyir", "vefi", "vefik", "vefki", "vehip", "vekil", "velet", "veli", "velit", "veliye", "venüs", "vergi", "vergili", "vergin", "verim", "vesik", "vesim", "veyis", "veysel", "veysi", "yâren", "yegâh", "yegân", "yegâne", "yeğin", "yeğiner", "yeğrek", "yel", "yelen", "yeler", "yelesen", "yeleser", "yeliz", "yeltekin", "yemen", "yenel", "yenen", "yener", "yenerol", "yengi", "yenigül", "yenin", "yenisu", "yenisü", "yepelek", "yerel", "yergin", "yerik", "yersel", "yesügey", "yeşil", "yeşim", "yeşne", "yeten", "yetener", "yeter", "yeterkız", "yetik", "yetim", "yetiş", "yetişen", "yetkin", "yetkiner", "yılşen", "yiğitel", "yiğiter", "yipek", "yöner", "yönet", "yönetken", "yönetmen", "yöntem", "yurter", "yurtgüven", "yurtsev", "yurtseven", "yurtsever", "yurtsevil", "yurtsevin", "yüksel", "yükselen", "yümniye", "yürekli", "yürüker", "zekâi", "zekâvet", "zeki", "zekire", "zekiye", "zemin", "zemzem", "zengin", "zennur", "zeren", "zergûn", "zerin", "zerrin", "zerrinkâr", "zerrişte", "zeynel", "zeynep", "zeyni", "zeyniye", "zeyno", "zeynur", "zeyrek", "zihniye", "zinet", "zinnure", "ziver", "ziynet", "ziyneti", "züheyr", "zühre", "zühtiye", "zülfiye", "zülfüye", "zürriyet", "fikir", "fikri", "filiz", "firuz", "ful", "fuzuli", "füsun", "füsunkâr", "hıfzı", "kâşif", "lâtif", "lütfi", "lütuf", "lütufkâr", "müfit", "müftü", "münif", "müşfik", "örfi", "rıfkı", "tıflıgül", "ufuk", "vâkıf", "yusuf", "zülfi", "zülfü", "zülkif", "zülküf", "girgin", "giz", "göğüş", "gök", "gökgöl", "gökhun", "göknil", "göknur", "göksoy", "göksu", "göksun", "gökşin", "göktuğ", "göktürk", "gönül", "görgü", "görgün", "görk", "görklü", "göyük", "gözütok", "gül", "gülân", "gülgönül", "gülgûn", "gülgün", "gülhiz", "gülhuri", "güliz", "gülkız", "güllü", "gülmüş", "gülnur", "gülnuş", "gülöz", "gülriz", "gülru", "gülruh", "gülsim", "gülsimin", "gülsoy", "gülsu", "gülsüm", "gülsün", "gültop", "gülüm", "gülüstü", "gülüş", "gülyüz", "gümüş", "gümüşkurt", "gümüşkut", "gün", "güngör", "güngörmüş", "güngül", "günışık", "güniz", "günizi", "günizli", "günkurt", "günkut", "günkutlu", "günmutlu", "günnur", "günol", "günsili", "günsu", "güntimur", "güntülü", "güntürk", "güntürkün", "günyıl", "günyol", "günyüz", "gür", "gürgân", "gürsu", "güz", "güzin", "güzingül", "hoşgör", "hoşnigâr", "hülâgü", "hürgül", "hüsnügül", "ılgı", "ılgım", "ılgın", "ırısgül", "ilgi", "ilgin", "ilgü", "ilgül", "ilgün", "ilig", "ilkgül", "irgün", "ismigül", "iyigün", "izgi", "izgü", "izgül", "izgün", "kırgız", "kızgın", "kızgınok", "kızgınyiğit", "kongur", "korgün", "koygun", "kutgün", "lâlgûn", "morgül", "mutlugün", "müjgân", "nigâr", "nilgûn", "nilgün", "nurgök", "nurgül", "nurgün", "nurnigâr", "oguş", "ogül", "ogün", "olgun", "olgunsoy", "olgunsu", "ongu", "ongun", "ongunsu", "ongur", "ongün", "orgun", "orgül", "orgün", "öngör", "öngü", "öngül", "öngün", "öngüt", "övgü", "övgül", "övgün", "özgü", "özgül", "özgülüm", "özgün", "özgür", "özsungur", "ruhugül", "rüzgâr", "sılgın", "sıngın", "singin", "songun", "songur", "songül", "sorgun", "soyugür", "sungu", "sungun", "sungur", "süngür", "tokgöz", "tongur", "toygun", "turgut", "tuygun", "tüngür", "türgün", "uguz", "urgun", "urungu", "uygu", "uygun", "uygur", "ügü", "ülgü", "ülgür", "üngörmüş", "üngün", "üngür", "ünügür", "ürgün", "üstüngü", "vurgun", "yılgül", "yılgün", "kızıltuğ", "koryiğit", "köroğlu", "kuğu", "mutluğ", "oğul", "oğultürk", "oğur", "oğuş", "oğuz", "oğuztüzün", "oktuğ", "onuğ", "öğün", "öğür", "öğüş", "öğüt", "özoğul", "özoğuz", "sığın", "söğüt", "tiğin", "toğuş", "toktuğ", "tokuztuğ", "toluntiğin", "tuğ", "tuğkun", "tuğlu", "tuğluk", "tuğrul", "tuyuğ", "türkoğlu", "uğur", "uğurlu", "uğurol", "uğursoy", "uğuş", "uğut", "uğuz", "uluğ", "yiğit", "yoğun", "yuluğ", "yüğrük", "hâlinur", "hızır", "hızlı", "hilâl", "hilâlî", "hilmi", "hoşnur", "hoşnut", "hoşsun", "hulki", "hulûsi", "huri", "hurşit", "huzur", "hünkâr", "hür", "hürmüz", "hürol", "hüsnü", "hüsnühâl", "hüsün", "ihlâs", "lâhik", "lâhut", "lâmih", "mihin", "mihri", "mihrinur", "mirrih", "muhip", "muhittin", "muhlis", "muhsin", "muhyi", "muslih", "mühip", "mülhim", "nuh", "nurhilâl", "orhun", "ruhi", "ruhinur", "ruhittin", "ruhunur", "rüsuhi", "sulhi", "suphi", "zihni", "zuhur", "zuhuri", "zühtü", "âşık", "ırıs", "ırız", "ırkıl", "ısmık", "ışık", "ışıklı", "ışıl", "ışıltı", "ışım", "ışın", "ışınsu", "ışıt", "ışkın", "ıtır", "ıtri", "ilkışık", "inkılâp", "kâzım", "kımız", "kın", "kınık", "kınış", "kızık", "kızıl", "kızılkurt", "lâyık", "mısır", "mülâzım", "nurışık", "özkın", "pırıl", "pırıltı", "sâtı", "sırrı", "sıtkı", "sıylı", "sıylıkız", "şınık", "tın", "urı", "âtik", "âzim", "ikiz", "iklil", "iklim", "il", "ilim", "ilki", "ilkim", "ilkin", "ilkiz", "ilknur", "ilksoy", "ilkut", "ilkutlu", "ilkün", "ilsu", "iltutmuş", "iltüzün", "inönü", "iris", "iskit", "islâm", "islim", "islimî", "isminur", "istiklâl", "işkur", "iyiol", "iyisoy", "kâmil", "kâni", "kâtip", "kip", "kipkurt", "kişi", "kökşin", "köni", "lâmi", "limon", "mikâil", "mir", "mirnur", "misli", "muin", "mukim", "munis", "muti", "mükrim", "mükrimin", "mülâyim", "mümin", "münim", "münip", "münir", "mürit", "mürşit", "müslim", "müşir", "nil", "nili", "nilsu", "nuri", "nuriş", "nursim", "nuşin", "nüvit", "öniz", "örik", "özil", "öziş", "öznil", "öztimur", "öztin", "rükni", "sili", "sim", "simin", "simruy", "sitti", "suzi", "sükûti", "süruri", "şiir", "şirin", "timur", "timuröz", "tin", "tinkut", "tipi", "titiz", "toktimur", "tomris", "tulûi", "tuti", "tülin", "türkili", "türkiz", "ulvi", "ümit", "ünsi", "yümni", "zikir", "zikri", "zinnur", "konuk", "konur", "konuröz", "kopuz", "kor", "korkut", "koşuk", "kotuz", "koytuk", "köksoy", "molu", "nurol", "nurtop", "oksu", "oktürk", "okumuş", "okur", "okuş", "okuşlu", "oluk", "oluş", "omur", "onuk", "onul", "onur", "onurlu", "onursoy", "onursu", "onursü", "orkun", "orkuş", "orkut", "ortun", "oruk", "orum", "orun", "orus", "oruz", "otuk", "oy", "oykut", "oylum", "oytun", "önol", "önsoy", "özok", "özol", "özsoy", "öztoklu", "özütok", "som", "somnur", "sonnur", "sonol", "sonsuz", "sorkun", "soykök", "soykurt", "soykut", "soylu", "soyöz", "sürsoy", "tok", "toköz", "toku", "tokuş", "tokuz", "tokyüz", "tolon", "tolun", "topuz", "tor", "toros", "torun", "tosun", "totuk", "toy", "tozun", "tümkor", "türkol", "ulusoy", "uzsoy", "ünlüol", "ünlüsoy", "ünsoy", "üstol", "yomut", "yosun", "zorlu", "kök", "köklü", "köksu", "köksür", "köktürk", "körklü", "köz", "nuröz", "ök", "öklü", "öktürk", "ömür", "ömürlü", "önnur", "önür", "örs", "örük", "örün", "ötnü", "ötün", "övül", "övün", "öykü", "öz", "özkök", "özkul", "özkurt", "özkut", "özkutlu", "özlü", "özlütürk", "özmut", "öznur", "özön", "özsözlü", "özsu", "özsun", "özsü", "özsüt", "öztürk", "özü", "özüm", "özün", "özyörük", "özyurt", "sözüsöz", "tör", "törü", "törüm", "töz", "tözüm", "türköz", "uluöz", "yön", "yörük", "pullu", "pütün", "kumru", "kurtuluş", "nur", "nurkut", "nurlu", "nursu", "nursun", "rüknü", "rüştü", "sumru", "şükrü", "tur", "tümkurt", "türk", "türkân", "türknur", "türkü", "tüzüntürk", "ulutürk", "umur", "ur", "urluk", "uruk", "urun", "uruş", "uruz", "uztürk", "üntürk", "ürkün", "ürün", "yâr", "yurt", "yurtkulu", "yürük", "zümrüt", "kukus", "müslüm", "sâmân", "su", "sukuşu", "sun", "sunu", "suut", "sü", "sükûn", "sükût", "sülü", "sülün", "süslü", "ulus", "ulusu", "us", "uslu", "usuk", "usum", "usun", "üs", "üstün", "yunus", "muştu", "tutuş", "ukuş", "yumuş", "kutlu", "kutluk", "kutun", "lut", "mut", "mutlu", "mutluk", "tulû", "tuluk", "tulum", "tulun", "tun", "tutku", "tutkun", "tutu", "tutuk", "tutun", "tuyuk", "tuz", "tülün", "tümkut", "tün", "tüzün", "ulukut", "umut", "umutlu", "utku", "uytun", "yunt", "uz", "üz", "zülâl", "ulu", "ulum", "ulun", "umu", "yumlu", "yumuk", "yümun", "vâlâ", "lülü", "yülük", "ülkü", "ülkülü", "ülküm", "ün", "ünlü", "abdil", "abdilkadir", "abdilkerim", "abdin", "abdiş", "abdo", "abdu", "abdul", "abdülahat", "abdulalim", "abdulazim", "abdulaziz", "abdulbaki", "abdulbakir", "abdulbari", "abdulbekir", "abdulcabbar", "abdulcebar", "abdulcebbar", "abdulcelal", "abdulcelil", "abdulferit", "abdulfettah", "abdülgadir", "abdulgaffar", "abdulgafur", "abdulğani", "abdulgazi", "abdulhadi", "abdulhafiz", "abdulhakim", "abdulhalik", "abdulhalim", "abdulhamid", "abdulhamit", "abdulhaşim", "abdulhekim", "abdülhizak", "abdulkadir", "abdülkadirhan", "abdulkahir", "abdulkani", "abdulkerim", "abdulla", "abdullatif", "abdulmecit", "abdulmelek", "abdulmelik", "abdulmenaf", "abdulmenav", "abdulmennan", "abdulmuhsin", "abdülmuhtalif", "abdülmuhtalip", "abdulmutalip", "abdulmuttalip", "abdülrahim", "abdulrahman", "abdulrazzak", "abdulriza", "abdulsabir", "abdülsamed", "abdülsamet", "abdülselam", "abdulsemet", "abdulvahap", "abdulvahit", "abdulvasih", "abdulvehap", "abdurahim", "abdurahman", "abdurha", "abdurrahim", "abdurrazak", "abdurrazzak", "abdurrehim", "abdurrezak", "abdurrezzak", "abduş", "abdusamet", "abdussamed", "abdussamet", "abdüsselam", "abdylla", "abeş", "abeydullah", "abtullah", "abubekir", "abutalip", "abutel", "abuzar", "abüzeyt", "acibe", "adder", "addule", "adelet", "adeli", "adem", "adife", "adigüzel", "adik", "adike", "adila", "adim", "adivye", "adiye", "adla", "adle", "adlen", "adliye", "adul", "adulle", "afe", "afettin", "afide", "ağagül", "agah", "ağakişi", "agit", "ağmur", "agnieszka", "ahat", "ahdettin", "ahet", "ahizer", "ahmed", "ahmetali", "ahmetcan", "ahunur", "aile", "akar", "akgüllü", "akimhan", "akin", "akin", "akise", "akizer", "akkadin", "akkiz", "aklime", "akver", "alaaddin", "alaadin", "alaatdin", "alaattin", "aladdin", "alaeddin", "alaetdin", "alaettin", "alaiddin", "alaittin", "alatin", "alattin", "alayittin", "aleddin", "aleksandra", "aleksey", "alen", "aletdin", "alettin", "alexandru", "aleyna", "algin", "aliabbas", "alibaran", "alibey", "aliekber", "alierk", "alifer", "aligül", "alihsan", "aliihsan", "alikadir", "aliksan", "aliman", "alimen", "alin", "aliosman", "aliriza", "alirza", "alis", "alisevim", "aliseydi", "aliya", "alize", "alkame", "alkim", "alkim", "alkin", "allattin", "almast", "almazbek", "almes", "almus", "alo", "alpcan", "alperin", "alpin", "alptunga", "altin", "altingül", "alvi", "alye", "ambere", "amina", "amirhamza", "ammar", "amşe", "anakadin", "anakiz", "anayasa", "andim", "ani", "anil", "anil", "anilcan", "aniş", "anita", "anna", "anşa", "anşe", "antika", "anzel", "anzilha", "apdil", "apdullah", "apdurrahman", "aptil", "aptülkadir", "aptullah", "arabi", "arafa", "arap", "arapcan", "ardil", "argon", "argun", "arifcan", "arikan", "arin", "arinç", "ariz", "arkin", "armahan", "arne", "arsen", "arsevi", "arsunar", "artemiz", "artur", "arzi", "asamettin", "aşhan", "asif", "asife", "aşik", "asim", "asiman", "asip", "aşire", "asiya", "aşiyan", "asker", "aşkim", "aşkin", "aşkin", "aşkiner", "asli", "asli", "aslican", "asligül", "aslihan", "aslinbey", "aslinur", "asriye", "assiya", "assiye", "asuhan", "aşur", "atal", "atanail", "ati", "ati", "atie", "atif", "atife", "atifet", "atika", "atike", "atike", "atil", "atilay", "atile", "atile", "atilgan", "atilhan", "atilim", "atilkan", "atiyye", "atman", "atman", "atnan", "atra", "attila", "attilla", "aura", "avna", "avşin", "avvat", "ayan", "ayatin", "ayatullah", "aybaba", "aybilge", "ayca", "ayçan", "ayçe", "ayçin", "aydin", "aydin", "aydiner", "ayişe", "aykiz", "aykutcan", "aylar", "ayle", "aylen", "aylil", "ayliz", "ayne", "aynel", "aynil", "aynilhayat", "aynimah", "ayno", "aynulhayat", "aynullah", "aynurisa", "ayper", "ayşali", "ayşana", "ayşeana", "ayşekadin", "ayşeli", "aysemin", "aysen", "ayşena", "ayşene", "ayşete", "ayşi", "ayşil", "aysin", "aytel", "ayter", "ayton", "aytümen", "ayvas", "ayzer", "ayzin", "azad", "azaniye", "azap", "azbiye", "azdin", "azem", "azettin", "azima", "azimenur", "aziza", "aznür", "azrail", "baattin", "baba", "babek", "badel", "badem", "badet", "badiru", "bağda", "bağdat", "bager", "bahaddin", "bahadir", "bahaettin", "bahaittin", "bahatdin", "bahdişen", "bahire", "bahittin", "bahman", "bahrettin", "bahşi", "bahtinur", "bahtinur", "bahtişen", "baise", "bakir", "bakiş", "bali", "balkir", "balkis", "balkiyan", "balkiz", "balli", "bani", "banihan", "banü", "banur", "barboros", "bariş", "bariş", "barişcan", "barişhan", "bariye", "barsen", "bartosz", "bartuğ", "başaran", "baskin", "basra", "batdal", "batikan", "batun", "batun", "batyr", "baver", "baydan", "bayramali", "bayramettin", "baysar", "baysat", "bayse", "bayzettin", "bediha", "bedii", "bedirittin", "bediriye", "bedirnaz", "bediya", "bedran", "bedreddin", "bedrivan", "begihan", "beğler", "begün", "behcet", "behican", "behide", "behime", "behiza", "behman", "behra", "behre", "behrem", "behriye", "behsat", "behyeddin", "bejdar", "bekan", "bekirhan", "beklem", "bektaşi", "belda", "belde", "belemir", "belgizar", "belgüzar", "belhizar", "belkis", "belkisa", "belkiz", "belkizan", "belkize", "benazil", "bendegül", "bendihan", "benefşi", "benhar", "benhür", "benisan", "benna", "bennuray", "benzegül", "beran", "berati", "beratiye", "beray", "beray", "berda", "berfiye", "berfo", "bergen", "bergün", "bergün", "berhan", "berho", "berhude", "beride", "beridiye", "beril", "berivan", "berkcan", "berkehan", "berkem", "berken", "berkkalp", "berktuğ", "berlin", "berre", "berru", "bersan", "bersu", "bertal", "bervan", "berzor", "beşbin", "beşbinaz", "besdemin", "beser", "beşeriye", "besey", "besi", "besin", "beslan", "besna", "besne", "besra", "besrai", "besravi", "besrayi", "bessi", "bestami", "beyazit", "beyce", "beyhani", "beyice", "beykut", "beyler", "beynun", "beynur", "beysim", "beytiye", "beytül", "beytüllah", "beyzanur", "bezgin", "bhekumusa", "bido", "bilal", "bilcan", "bildan", "bilgesu", "bilgül", "bilican", "bilihan", "bilkay", "billur", "bilmez", "bilnaz", "bilor", "bilun", "binevş", "binyami", "binyamin", "birand", "birdane", "birdesen", "birgul", "birgüzel", "birkay", "birön", "birsele", "birseren", "birsev", "birtekin", "bişar", "bitül", "bonci", "boracan", "böre", "bubo", "buğse", "buğu", "buhari", "buhide", "bukan", "bulca", "bülend", "bulent", "bulunmaz", "bünyami", "bünyamil", "bünyamün", "burakbey", "burakhan", "buray", "burçay", "burçe", "burcuhan", "bürdem", "büreyre", "bürhan", "burhaneddin", "burtay", "burtay", "buson", "buşra", "büşranur", "caferiye", "cafet", "çagatay", "çağda", "çağdan", "çağdan", "çağil", "çağil", "çağin", "çağin", "çağri", "çağri", "çağtay", "cahid", "cahti", "caide", "cait", "çakir", "çakir", "çaliş", "camal", "camia", "canali", "candeniz", "candirem", "cangir", "canseli", "çanser", "canset", "cansin", "cansin", "cansukan", "canur", "casim", "cavat", "cavide", "cayide", "cazime", "cebli", "cefahir", "cefair", "cefer", "celal", "celaleddin", "celaletdin", "celalettin", "cemale", "cemali", "cemide", "cemiliye", "cemine", "cemiyle", "cemocan", "cenay", "cenkoğlu", "cenneti", "cerasela", "cercis", "cerem", "ceride", "cesarettin", "çetine", "çetmen", "cevale", "çevregül", "cevrinaz", "cevzet", "ceydanur", "ceykan", "ceyla", "ceylan", "ceylan", "ceylani", "ceylin", "ceynur", "cezair", "cezair", "cezanur", "cezminur", "cezo", "cida", "çidem", "çidem", "ciden", "çiğ", "çiğse", "cihad", "cihadi", "cihanber", "çile", "çilem", "çilga", "çili", "çinar", "çinar", "çise", "çisel", "çisem", "civeyra", "çiydem", "çollu", "coşgun", "coşkan", "çoşkun", "cüferiye", "cuheyna", "cülye", "cumaali", "cuman", "cumazel", "cumaziye", "cüneyd", "cüneyit", "cunfer", "curabey", "curiye", "dağcan", "dağistan", "dağittin", "dahar", "dahil", "daimi", "damlagül", "damlanur", "dane", "daniyer", "darçin", "darin", "dawid", "daylan", "deham", "delal", "delale", "delali", "delel", "delfin", "delil", "delila", "demirali", "denis", "denizgülü", "denizhun", "dergi", "derkay", "derle", "deryal", "destan", "destan", "destina", "deva", "devriş", "devr˜m", "deyer", "diğdem", "dijle", "dilan", "dilara", "dilare", "dilaver", "dilaver", "dilazer", "dilcan", "dilder", "dilfuraz", "dilfuruz", "dilfuzar", "dilihan", "dilruba", "dilşa", "dilşad", "dilşer", "dilvin", "dinara", "dincer", "direncan", "direniş", "divan", "diyaddin", "diyar", "dizem", "di¦dem", "doğaç", "doğacan", "doğancan", "doğcan", "doğuşcan", "dolat", "dolgun", "dona", "dönay", "döndühan", "döner", "dönsün", "dorukan", "dudhan", "dudugül", "duduşen", "duha", "duhan", "dünya", "dünya", "dünyale", "dünyamin", "durali", "durana", "durangül", "durdali", "durdane", "durdaniye", "durdiye", "durgadin", "durgül", "durgut", "durhasan", "duriye", "durkadin", "durmuşali", "durna", "durnel", "durri", "dursade", "dursadiye", "dursan", "dürsef", "dürsel", "dursen", "dursine", "dürsiye", "dursunali", "dursuniye", "dürüye", "duryan", "duyal", "duyğu", "duyguhan", "eba", "ebazel", "ebedin", "ebide", "ebilfez", "ebişe", "eblike", "ebozeyt", "ebu", "ebuakil", "ebülfet", "ebutalip", "ebuzer", "ecem", "edanur", "edaviye", "edaye", "edebiye", "edep", "edeviye", "edib", "edibiye", "edizhun", "ednan", "efaket", "efecan", "efil", "efkan", "eflatun", "efrahim", "efrail", "efraim", "eframil", "efrayim", "efsel", "efsunkar", "eftal", "eftal", "egecan", "egem", "eğemen", "ehad", "ehlem", "ehliiman", "ela", "elame", "elamiye", "elanur", "elay", "eldar", "eleddin", "elem", "elfazi", "elfide", "elfize", "elgiz", "elham", "elide", "elifana", "elifgizem", "elifgül", "elifhan", "elifnur", "elifsena", "elis", "eliz", "ellez", "elmar", "elmaze", "elnara", "elnaz", "elnur", "elvadiye", "elvida", "elvin", "elvin", "elyasa", "elzem", "ema", "emal", "embiye", "emeriç", "emeti", "emile", "emina", "emincan", "emine", "emineeylem", "eminei", "eminhan", "emini", "eminkadin", "eminoş", "emirali", "emiray", "emiray", "emirayşe", "emircan", "emire", "emirnaz", "emirşan", "emiş", "emişe", "emra", "emra", "emrahcan", "emral", "emrecan", "emrehan", "emru", "emsel", "emür", "enbiye", "encan", "enercin", "enez", "engin", "engül", "enser", "enüş", "enzile", "enzüle", "erap", "eraycan", "ercet", "erchan", "erçin", "erda", "erdar", "erdim", "erdinay", "erdogan", "erdost", "erebiye", "erencem", "erep", "ergülü", "erife", "erince", "erişcan", "erkam", "erkay", "erkil", "ermin", "ernes", "erşafak", "erşah", "ersan", "ersi", "ertural", "erturul", "eruze", "erva", "ervaniye", "erzem", "esad", "esalettin", "esame", "esef", "eşefatma", "eşem", "esenay", "eset", "eshabi", "eshat", "eşiana", "esil", "esiye", "eşkan", "eslem", "esmanperi", "esmanur", "esme", "esmecan", "eşmegül", "esmehan", "esmerhan", "esmin", "eşmine", "esmiye", "espir", "esranur", "esrin", "eşşe", "etem", "etkin", "eva", "evde", "evenur", "evinç", "evlim", "evra", "evrin", "evsun", "eyne", "eysel", "eyüb", "eyup", "eyüpcan", "eyvaz", "eyves", "eyyüp", "eyyüpcan", "ezaettin", "ezet", "ezher", "ezime", "ezine", "eznur", "ezo", "faakim", "faali", "faden", "fadil", "fadima", "fadimana", "fadimeana", "fadimehanim", "fadiya", "fadiye", "fadliye", "fagat", "fahreddin", "fahrittin", "fahrullah", "faide", "faike", "faime", "faki", "fakiri", "fakiye", "fakriye", "fakrullah", "fami", "famile", "fanambinana", "faniye", "faraç", "fariz", "fati", "fatigül", "fatik", "fatim", "fatima", "fatima", "fatimana", "fatimatüzzehra", "fatime", "fatimet", "fatimetözehra", "fatinur", "fatiş", "fatiye", "fatmaana", "fatmadudu", "fatmakadin", "fatmana", "fatmanim", "fatmasu", "fatmatül", "fatme", "fatou", "fatuma", "fatümatüzzehra", "fayik", "fayika", "fayize", "faysel", "fazil", "fazila", "fazile", "fazli", "fazul", "fedakar", "fedan", "fedayi", "feden", "fedile", "fedim", "fedime", "fedriye", "fefharet", "fehiman", "fehire", "fehmettin", "feki", "fekrullah", "felekferz", "feleknaz", "felekşan", "felemez", "fendal", "fendiye", "fener", "fensur", "ferahdiba", "ferahiye", "feramüz", "feran", "ferat", "ferayi", "ferayi", "ferdağ", "ferdin", "ferdun", "feremez", "ferfuri", "fergal", "fergül", "ferid", "ferihan", "ferihan", "ferik", "ferik", "ferime", "ferinaz", "feriş", "feriştah", "feriya", "ferizan", "ferize", "fermin", "fermuta", "ferrah", "ferru", "ferşat", "fersun", "ferudun", "feruz", "feruza", "feruzan", "ferüze", "ferya", "feryal", "feryas", "feryat", "ferzende", "ferzender", "ferzi", "ferziye", "fetane", "fetdah", "feti", "fetiye", "fettullah", "fetullah", "fevvaz", "fevzettin", "feyat", "feyaz", "feyfuri", "feyime", "feyiznur", "feyme", "feyruz", "feyruz", "feyruze", "feysal", "feysel", "feyyat", "feyz", "feyzanur", "feyzin", "fezal", "fezaye", "fezayi", "fezile", "fidaniye", "fidaye", "fidel", "fidelya", "fideyl", "fikrat", "filay", "fildan", "filis", "filit", "fincan", "finci", "findik", "findika", "firat", "firathan", "firdes", "firdest", "firdevis", "firiha", "firke", "firüzan", "firyaset", "fisun", "fitnet", "fuad", "fulden", "fulten", "fülya", "fundagül", "furat", "fürgan", "fürkan", "fürüzan", "fussulet", "füsün", "gabel", "gabil", "gabriela", "gadiriye", "gafure", "gahraman", "galib", "galiya", "gamzegül", "gassan", "gayet", "gazap", "geji", "georgeta", "gevi", "gevrin", "geylani", "gilman", "ginyas", "giryan", "gişver", "giyasettin", "giymet", "gizemnur", "gizemsu", "göçeri", "gögercin", "göher", "gökan", "gökbuke", "gökçay", "gökce", "gökçekalp", "gökiş", "göksemin", "gölgen", "göli", "gölkem", "goncay", "gönlüm", "görgen", "görkan", "govercin", "gözdehan", "gözdem", "gözdenur", "gözel", "gözel", "gözen", "grzegorz", "gübra", "gülabi", "gülabiye", "güladin", "gülafer", "gülağa", "gülali", "gülamiye", "gülan", "gülaver", "gülaydin", "gülban", "gülbani", "gülbarin", "gülbeddin", "gülbeg", "gülberat", "gülbettin", "gülbeyan", "gülbeyde", "gülbie", "gülbiye", "gülcay", "gülçe", "gülcegün", "gülcehal", "gülcema", "gülcemile", "gülçerek", "gülceylan", "güldali", "güldam", "güldiz", "güldurdu", "güle", "gülefer", "gülem", "gülemir", "gülendem", "gülendiye", "gülengün", "gülenser", "güley", "güleycan", "güleyda", "gülezgi", "gülfadim", "gülfami", "gülfan", "gülfari", "gülfatma", "gülfen", "gülferi", "gülferide", "gülfethiye", "gülfikar", "gülfire", "gülfiye", "gülfizar", "gülfüzar", "gülfüze", "gülgiz", "gülgül", "gülhanim", "gülhaniye", "gülhat", "gülhis", "gülhisar", "gülhizar", "gülhuriye", "gülhüzar", "güli", "güli", "gülice", "gülihsan", "gülin", "gülişa", "gülişan", "gülisraf", "gülkadin", "gülkiz", "güllabiye", "gülleman", "güller", "gülli", "gülliya", "güllizar", "güllünar", "güllünaz", "güllüzar", "gülmehmet", "gülmenevşe", "gülmez", "gülmine", "gülminnet", "gulmirace", "gulmustafa", "gülnade", "gülnam", "gülisimler", "gülnara", "gülnarin", "gülnaz", "gülnaziye", "gülnigar", "gülnihan", "gülorya", "gülözge", "gülpaşa", "gülper", "gülpinar", "gülrengin", "gülşa", "gülsabiya", "gülsade", "gülsaran", "gülşat", "gülseda", "gülseher", "gülşehriye", "gülsem", "gülsen", "gülsena", "gülsenem", "gülsepen", "gülseri", "gülserin", "gülseval", "gülsevdi", "gülsevim", "gülşifa", "gülsin", "gülsiye", "gülsü", "gülsultan", "gülsum", "gülsun", "gültülin", "gülü", "gülüfer", "gülümse", "gülün", "gülünay", "gülüs", "gülüşan", "gülüsen", "gülüser", "gülüstan", "gülüsün", "gülüz", "gülüzar", "gülyar", "gülyaz", "gülyeter", "gülzade", "gülzadiye", "gülzide", "gülziye", "gümrah", "gümrah", "günar", "günaydin", "güncel", "güncel", "günday", "günğör", "güngöre", "günnür", "günrem", "günşiray", "güntaç", "güralp", "gürani", "gürçağ", "gürçay", "gürçim", "gürcü", "gürcüye", "gürelcem", "gürgan", "gürkay", "gürler", "gürman", "gürol", "gürsal", "gürşat", "gürser", "gürsoy", "gurur", "güssüm", "güssün", "güsüm", "güverçin", "güyhan", "güzella", "güzeyde", "güzgül", "güzüde", "h", "h", "habeş", "habib", "habiba", "habibe", "habil", "habip", "habiybe", "hacar", "hacere", "haci", "haci", "haciali", "hacibey", "hacice", "hacihanim", "hacikadin", "hacile", "hacili", "haciosman", "hacire", "haco", "hadi", "hadice", "hadime", "hadis", "hadrey", "hafife", "hafir", "hafise", "hafit", "hafiye", "hafiz", "hafiza", "hafset", "hafside", "hafza", "hajarat", "hakife", "hakik", "hakim", "hakime", "hakiye", "hakki", "hakki", "haldün", "halid", "halidiye", "halidun", "halilibrahim", "halilurrahman", "halimedudu", "halimi", "halimser", "halisa", "haliye", "haluk", "hal˜l", "hamail", "hamayil", "hamdin", "hamdune", "hamet", "hamid", "hamire", "hamma", "hamsa", "hamse", "hamsiye", "hanasli", "handenur", "hanen", "haney", "hangül", "hani", "hanifi", "hanik", "hanim", "hanime", "hanimi", "hanimkiz", "hanimşah", "hanimzer", "hanperi", "hansa", "hanse", "hanume", "hanze", "hanzey", "hapa", "hapiç", "harabi", "harbinaz", "harip", "haris", "harise", "haritdin", "hariye", "hariz", "hasalettin", "hasamittin", "hasanali", "hasangazi", "hasanhilmi", "hasbiye", "haşem", "hasgüllü", "hasi", "hasib", "hasine", "hasivet", "haskar", "haskiz", "hasrettin", "hassi", "hassiye", "hata", "hatay", "hatiçe", "hatike", "hatimet", "hatin", "hatira", "hatiyce", "hattap", "havadudu", "havagül", "havali", "havana", "havane", "havanim", "havanur", "havar", "havelya", "havil", "havize", "havşar", "havse", "havser", "havsun", "havvagül", "havvana", "havvane", "havvanur", "havvas", "hayali", "hayas", "hayel", "hayirli", "haymil", "hayreddin", "hayredin", "hayrinisa", "hayrinnusa", "hayrittin", "hayrun", "hayrunisa", "hayrunnas", "hayrunnisa", "hazarcan", "hazari", "hazbiye", "hazim", "haziret", "hazna", "hazni", "hazrat", "hecide", "heday", "hediyegül", "hedla", "hedle", "hefin", "hefit", "hekime", "hekmet", "helen", "helim", "helime", "helin", "heman", "hemi", "hemide", "hemrevin", "hena", "henda", "henife", "henzede", "herdem", "herdemcan", "hergül", "hesibe", "hesna", "hetike", "heva", "heval", "hevin", "hevzi", "heybetullah", "heyfhilat", "heyvetullah", "hezal", "hezare", "hezel", "hezniye", "hibe", "hicazi", "hicaziye", "hicri", "hicrigül", "hidaye", "hidir", "hifzullah", "hikmiye", "hilal", "hilal", "hilayda", "hilin", "hilman", "hilvan", "hilye", "hinar", "hindal", "hinet", "hino", "hişar", "hisemiddin", "hitit", "hiva", "hivda", "hizir", "hizlan", "hizni", "hizniye", "hocamurat", "hogir", "hökkeş", "homayi", "hopan", "horasanli", "hori", "horiye", "hörü", "hoşgün", "hoşnaz", "hozan", "hšlya", "hübriye", "huccet", "hüda", "hüdai", "hüdakar", "hüdanur", "hüdaye", "huldiye", "hulisi", "hulku", "hulusi", "hulusu", "hülye", "huma", "humayun", "humeyin", "humeyra", "hünkar", "hürdünya", "hüreyra", "hürgazi", "hüri", "hurinaz", "hüriye", "hüriyet", "huriyet", "hurizad", "hürküş", "hurma", "hürmüs", "hurriyet", "hürşehit", "hurşitedip", "hürü", "hürüle", "hürüyet", "huryeddin", "hüsameddin", "hüsametdin", "hüsammeddin", "hüsem", "huseyin", "hüseyn", "husna", "hüsnem", "hüsni", "hüsni", "husnigül", "hüsnüce", "hüsnüer", "hüsref", "hüsrem", "husret", "hussaini", "hüssam", "huzam", "hüzeyca", "huzeyfe", "hüzni", "hüzüme", "huzuri", "ibadiye", "iban", "ibrahimethem", "ibrahimhalil", "ibrahimilker", "ibrail", "içil", "iclal", "iclal", "idan", "ide", "idiris", "ıdris", "ifagat", "ifaget", "ifaze", "ifdadiye", "iftade", "iftar", "ihram", "ihsane", "ihtişam", "ijla", "ijlal", "ikbale", "ikilem", "iklama", "iklime", "ikrameddin", "ikrar", "ilavet", "ilbeği", "ilfar", "ılgahan", "ilgihan", "ılgim", "ılgin", "ılgin", "ilhamettin", "ilkat", "ilkel", "ilkem", "ilkem", "ilklima", "illettin", "ilmafer", "ilmi", "ilmiddin", "ilper", "ilten", "ilyaz", "imaddin", "imahan", "imatullah", "imhan", "imihan", "imirza", "immigülsüm", "immihan", "immühan", "imral", "imran", "imran", "imrana", "imrel", "imrihan", "inancan", "incifir", "incihan", "incil", "incilay", "intihap", "intimas", "inzile", "iran", "iremnur", "irfide", "ırzavan", "isa", "isak", "ışik", "ışik", "ışil", "ışilay", "ışilay", "ışin", "ışin", "ışinsu", "iskan", "islam", "islime", "ısmahan", "ismailhakki", "ismehan", "ismetullah", "ismi", "ısmihan", "isra", "ıssa", "istem", "istiham", "isvendi", "isvendiyar", "ıtir", "itris", "ivyek", "iyam", "ızaura", "izetin", "izettin", "izlem", "izlifet", "iznihar", "izzeddin", "izzetin", "jacub", "jalen", "jalile", "jan", "jankat", "jaruthip", "jefide", "jiyan", "joanna", "julide", "julude", "kabile", "kablan", "kaddafi", "kadircan", "kadirgin", "kadiriye", "kadirye", "kadişah", "kafiye", "kafur", "kahamurat", "kahriman", "kakil", "kalem", "kalo", "kamal", "kamelya", "kameriye", "kamil", "kamila", "kamilcan", "kamile", "kamiren", "kamuran", "kamuran", "kanaat", "kanco", "kandef", "kania", "karafil", "karani", "kardoğan", "karer", "kargül", "karip", "karol", "kaside", "kaşif", "kasim", "kasimhan", "kassim", "katarzyna", "katibe", "katife", "katip", "kaver", "kazanfer", "kazi", "kazim", "kazime", "kebira", "kefaattin", "kefser", "kehribar", "kelami", "kelcik", "kelem", "kemaleddin", "kenanbey", "kendal", "kendi", "keremhan", "kerima", "kerziban", "kerzik", "keser", "kesire", "kesra", "ketayi", "ketibe", "kevi", "kevni", "kezibe", "kezziban", "kibriya", "kibriye", "kiliç", "kilman", "kimet", "kinem", "kini", "kiral", "kirez", "kismet", "kismet", "kişmiş", "kitan", "kivanç", "kivanç", "kivilcim", "kivilcim", "kiyafet", "kiyas", "kiyasettin", "kiyasi", "kiymaz", "kiymet", "kiymetli", "koblay", "köçer", "koka", "kömeç", "korçay", "korkmazalp", "korşah", "kotas", "kral", "krzysztof", "kuaybe", "kübar", "kublay", "kübran", "kübranur", "küçük", "küçük", "kudiret", "kuduret", "külter", "kültigin", "kumaş", "kumray", "kumri", "kuntay", "kuntsav", "küpra", "küpriye", "kural", "kurban", "kurbani", "kürciye", "kurultay", "küsün", "kutbettin", "kütezziban", "kütfettin", "kutluğhan", "kutluhan", "kutret", "kutret", "kutsi", "kuzeyde", "kuzidiye", "kuzudiye", "laden", "ladiker", "ladin", "laika", "lale", "lalegül", "lalever", "lalezar", "lalifer", "lalihan", "lami", "lamia", "lamih", "lamiye", "latif", "latife", "latifhan", "laze", "lazgin", "lebude", "lemangül", "lemye", "letife", "levend", "levize", "levziye", "leyla", "leylan", "leylanur", "leylufer", "leymun", "leyzan", "lezgin", "lezgin", "libas", "lida", "lider", "lifar", "ligar", "lilianna", "lilifer", "lilüfer", "lilve", "liman", "limun", "lina", "linda", "lisa", "lisan", "lokman", "lüfen", "lukasz", "lülgün", "lülüfer", "lutfi", "lutfiye", "lutfü", "lutfullah", "lütfüye", "lütviye", "luup", "m", "m", "maciej", "mafak", "mafiret", "mafiye", "mafuzer", "mağbule", "mağgül", "mahfuza", "mahfuze", "mahide", "mahigül", "mahiner", "mahiye", "mahli", "mahmud", "mahmudiye", "mahnaz", "mahpus", "mahsubiye", "mahşuk", "mahsul", "mahsum", "mahyettin", "maigül", "makhaddin", "maksüde", "mamo", "mansurali", "marcin", "marek", "mariama", "masar", "mashar", "maşide", "matan", "matem", "mateusz", "maver", "mavuş", "mayide", "mayile", "mayir", "maynur", "mayşeker", "maysel", "mazen", "mazes", "maziye", "mazlüme", "mebrule", "mebure", "mecbure", "mecburiye", "mecdulin", "mecra", "mecrum", "medhat", "media", "mediye", "mefal", "mefaret", "mefarettin", "mefide", "mefkure", "mefküre", "mehbare", "mehbup", "mehdiyar", "mehemmed", "meherrrem", "mehlibar", "mehman", "mehmed", "mehmetali", "mehmetcan", "mehmetemin", "mehmethalit", "mehmethan", "mehmethanifi", "mehmetnesim", "mehmetsait", "mehmetzahir", "mehmüre", "mehnur", "mehri", "mehriban", "mehrican", "mehrigül", "mehtun", "mekail", "mekan", "mekbule", "mekiya", "mekiye", "mekkiye", "mektup", "melaha", "melahat", "meldanur", "meleha", "melehat", "melekey", "meleki", "melihan", "melihat", "melihcan", "melihe", "melika", "melikkan", "meliknur", "melul", "memet", "memetali", "memetcan", "memihan", "memili", "memnuniye", "menci", "mendo", "mendufa", "menduh", "menduha", "menendi", "menfeat", "menfiye", "menhur", "menica", "menice", "menife", "meniş", "menişan", "menşür", "menşüre", "menzil", "merali", "meray", "merba", "merban", "merda", "merdali", "merdane", "merdiye", "mergüze", "merhuze", "merim", "meriman", "merime", "meriş", "merivan", "meriyem", "mermi", "mernur", "mernuş", "mertali", "mertay", "mertcan", "mertullah", "merva", "mervan", "mervane", "mervem", "mervenur", "mervil", "merya", "meryam", "meryemana", "meryeme", "merzuh", "mesdan", "meşgule", "meşhut", "meşküre", "meşküriye", "meslihan", "mesni", "mesret", "mesrule", "messud", "messut", "mesud", "mesüde", "mesudiye", "mesuriye", "mesüt", "mesuthan", "metecan", "mettin", "meveddet", "mevlana", "mevlida", "mevlidiye", "mevliya", "mevliye", "mevlüd", "mevlude", "mevlüdiye", "mevlut", "mevra", "mevre", "mevriye", "mevtun", "mevziye", "meyase", "meydin", "meyese", "meyhanim", "meyhati", "meyli", "meymene", "meyram", "meyrem", "meyser", "mezhar", "mezher", "miat", "michal", "midi", "mihail", "mihdi", "mihdiye", "mihrab", "mihraç", "mihraç", "mihrap", "mihsin", "mikail", "mikdat", "mikolaj", "miktat", "milay", "milayim", "milazim", "milid", "milyel", "mimar", "minel", "minever", "minevver", "minibe", "minire", "minnaz", "mintaha", "minteha", "mirac", "mirac", "mirace", "miradiye", "miralp", "mirbadin", "mirbek", "mireş", "mirhasan", "miriye", "mirsat", "mirze", "miseyne", "mishat", "misra", "misri", "misriye", "mistan", "mitad", "mitat", "miyasa", "miyaser", "miyasi", "miyasser", "miyese", "miyeser", "miyesser", "mizgin", "mizirap", "mohammad", "möhsim", "mola", "molla", "monika", "monis", "mualla", "muamber", "muamer", "muazez", "muazzen", "muazzes", "mubarek", "muberra", "müberrah", "müberya", "mübetcel", "mücade", "mücahid", "mücahide", "mucahit", "mücait", "mücayit", "mücdet", "mücella", "mücellib", "mücelta", "mucib", "mücibe", "mücteba", "mücteba", "müdavim", "müddesir", "müeser", "müessere", "müferra", "müfid", "mufide", "müftah", "mugaddes", "mügan", "mugatter", "müğber", "muhamet", "muhammad", "muhammedali", "muhammer", "muhammeriye", "muhammetali", "muharem", "muhazim", "muhbet", "muhbet", "muhdiye", "muhib", "muhibe", "muhiddin", "mühide", "muhiye", "mühreli", "mühşide", "mühsine", "mühteber", "muhtereme", "muhteşemen", "muhubbet", "muhubet", "muhutdin", "muhuttin", "muhyedin", "muhyettin", "muhyiddin", "muhyittin", "mujde", "müjden", "müjgan", "müjgehan", "müjgen", "mukaddere", "mukaddez", "mukader", "mukades", "mükafat", "mükail", "mukatder", "mukatdes", "mukattere", "mükayil", "mükramin", "mukrayil", "mükrüme", "mülayim", "mülcem", "mulfer", "mülkicihan", "mülkinaz", "mülkiye", "mülkü", "mulla", "mülüfe", "mülüfer", "mümeşir", "mumine", "mumtas", "mümün", "mümüne", "münacettin", "münadiye", "münasiye", "müne", "münever", "münevir", "münevvere", "münezzer", "münib", "munife", "münik", "munip", "munir", "münircan", "münise", "müntez", "münüp", "münür", "münüre", "munzire", "murad", "muradiye", "muratcan", "murathanabdu", "mürcan", "müret", "müreyya", "mürfide", "mürivvet", "mursel", "mürselin", "mürşid", "mursine", "mürşüt", "mürten", "mürteza", "mürüfet", "mürüvet", "murvet", "musab", "musaburak", "musafet", "musamettin", "müşaret", "müseddin", "müselahattin", "müsemme", "müşerrefe", "müşkan", "müşkünaz", "muslu", "müslum", "müslümet", "muştak", "mustakiyma", "mustan", "müstecef", "müşter", "müşüde", "müşüre", "mutait", "mütalip", "mutlucan", "muttalip", "müttezim", "mutullah", "mutuş", "müveyla", "muzafer", "muzafer", "müzaffer", "muzameddin", "müzdelife", "müzet", "müzeyen", "müzeyme", "müzüde", "nabahat", "nabil", "nacide", "nacifer", "nadan", "nades", "nadiha", "nadik", "nadile", "nadiriye", "nafel", "nafer", "nafier", "nafii", "nafizenur", "nagihan", "nahizer", "nahsen", "naide", "naif", "naife", "naima", "najeti", "nalan", "nalin", "isimlergül", "isimlert", "namik", "namike", "namuk", "nanifer", "narcan", "nargehan", "narhanim", "narhatun", "nari", "narinç", "narmine", "naşat", "nasiba", "nasif", "nasihat", "nasihe", "nasim", "nasimi", "nasire", "nasiybe", "nasuf", "natalia", "natik", "natike", "navruz", "navruze", "nayet", "naygihan", "nayif", "nayil", "nayile", "nayim", "nayime", "nayliye", "nazander", "nazangül", "nazcan", "nazdar", "nazefet", "nazegül", "nazen", "nazengül", "nazeni", "nazente", "nazenti", "nazez", "nazgül", "nazgüle", "nazi", "nazide", "nazifer", "nazike", "naziker", "nazile", "nazilet", "nazim", "nazime", "nazimet", "nazimi", "nazira", "naziriye", "naziye", "naziyfe", "nazli", "nazli", "nazlican", "nazligül", "nazlihan", "nazlim", "nazlim", "nazliye", "nazrife", "nebat", "nebattin", "nebia", "nebibe", "nebide", "nebiha", "nebihat", "necah", "necai", "necasi", "necattin", "necbiye", "necdat", "necet", "necibullah", "necife", "necilal", "necim", "necima", "necime", "necip", "neçir", "necla", "necla", "neclat", "neclay", "necle", "necmeddin", "necmettin", "necmiddin", "necmittin", "necser", "necüde", "necva", "nedibe", "nedife", "nedriye", "nedve", "nedye", "nefaret", "nefes", "nefide", "nefiga", "nefika", "nefire", "nefiya", "nefiye", "nefize", "nefya", "negihan", "negül", "nehari", "nehide", "nehime", "nejdat", "nejdet", "nejdet", "nejdi", "nejdiye", "nejla", "nejmettin", "nejmi", "nejmiye", "nelahat", "nelda", "nelli", "nemrun", "nerfide", "nergahan", "nergihan", "nergiz", "nergiz", "nergül", "nergün", "nergüzel", "neriban", "neriç", "nerkiz", "nerman", "nerman", "nermiye", "nerve", "nervis", "nerzan", "nesai", "nesfe", "nesife", "nesih", "nesij", "nesin", "nesirin", "neslahan", "neslican", "neslinur", "nesra", "nesrihan", "nesrim", "neşrin", "neşriye", "netife", "nevaf", "nevcihan", "nevc˜han", "nevel", "nevgin", "nevgün", "nevil", "nevim", "nevise", "nevraz", "nevrim", "nevrize", "nevse", "nevsi", "nevzer", "nevzet", "nevzete", "nevziye", "neyfinur", "neysen", "neytüllah", "nezafettin", "nezafiye", "nezan", "nezehat", "nezengül", "nezif", "nezife", "neziha", "nezihan", "nezihat", "nezihet", "neziye", "neziyet", "nezize", "nezmi", "nezrife", "nice", "nidal", "nigar", "nige", "niğmet", "nihari", "nihaye", "nikar", "nikat", "nila", "nilcan", "nilda", "nildem", "nilden", "nilfer", "nilgül", "nilgun", "nilifer", "nilşah", "nilsen", "nilufer", "nimetiye", "nirgül", "nisficihan", "nispahi", "nisret", "niyase", "nizameddin", "nizgin", "nofe", "nofel", "noman", "noran", "növfel", "nuber", "nudet", "nudiye", "nüdret", "nüfer", "nüfide", "nuğman", "nuhal", "nuhi", "nuhiye", "nuhtullah", "nüket", "nükte", "nülfer", "nülgün", "nülifer", "nülüfer", "nupelda", "nura", "nurale", "nurali", "nurane", "nuraniye", "nurat", "nurayan", "nurayi", "nurbanü", "nurberat", "nurbetül", "nurbolat", "nurcay", "nurcin", "nurda", "nurdagül", "nurdamla", "nurdaniye", "nurdanur", "nurdeniz", "nurdöken", "nureddin", "nuren", "nuretdin", "nürettin", "nurevşan", "nurey", "nurfatma", "nurfen", "nurfet", "nurfiye", "nurgen", "nurgil", "nurgüzel", "nurhak", "nürhan", "nurhat", "nurhayet", "nurhuda", "nurhun", "nurican", "nürice", "nuriddin", "nurihayat", "nurisan", "nurişen", "nuristan", "nuritdin", "nurittin", "nuriya", "nuriyet", "nurkadin", "nurnisa", "nurşa", "nurşan", "nurşat", "nurseda", "nürsel", "nurselin", "nursemi", "nursenim", "nursevcan", "nursever", "nurşide", "nursifa", "nursin", "nursin", "nursiye", "nursuman", "nürten", "nurufe", "nurus", "nuruşah", "nurva", "nurven", "nurya", "nurziye", "nüset", "nüshet", "nusrat", "nusreddin", "nüsret", "nusur", "nutfiye", "nüveyde", "nuveyre", "nuzret", "ny", "n˜zamett˜n", "oana", "öbeydullah", "oğulkan", "oguzhan", "oğuzorhan", "ökkaş", "olay", "olçay", "olga", "olgacan", "olgay", "olgu", "olgu", "olgül", "olğun", "oliver", "olkan", "ömercan", "ömerul", "ömiriye", "ömlüye", "ömran", "ömriye", "ömrüm", "ömrüye", "ömürden", "ömürhan", "ömüriya", "ömürnaz", "önday", "önder", "önem", "önem", "onuray", "onurcan", "orçin", "ordunç", "orlinda", "öskan", "östürk", "över", "özali", "ozan", "özaydin", "özcem", "özde", "özdem", "özgecan", "özgehan", "özgenaz", "özgenur", "özgücan", "özgünalp", "özkay", "özkenan", "özlemin", "öznür", "pakizer", "paşa", "paşali", "paşey", "pawel", "pehlil", "pehlivan", "pehlül", "pehman", "pektaş", "pelda", "pelinsu", "pelir", "pembesin", "pembi", "pembiş", "pempe", "penbe", "penpe", "peral", "peray", "percihan", "perdane", "peria", "perihannur", "perim", "perinaz", "periş", "perişan", "perizade", "perizan", "pernur", "pevrül", "pevziye", "peyami", "peyda", "peyran", "peyruze", "piltan", "pinar", "pinar", "piotr", "pirahmet", "pirhasan", "piril", "polatkan", "pori", "przemyslaw", "pusat", "r", "rabbiye", "rabiha", "rabike", "rabiya", "rabiye", "radim", "radiye", "rafal", "rafig", "rafika", "rafike", "rafiye", "ragayip", "ragib", "ragip", "ragup", "rahan", "rahcan", "rahide", "raime", "rais", "raize", "rakife", "rakite", "rakiye", "ramadan", "rametullah", "ramize", "ramona", "ramziye", "raniya", "raşan", "raşen", "rasik", "raşike", "rasul", "ravent", "raviye", "rayat", "rayif", "rayim", "rayla", "raz", "razinan", "rebihat", "rebiş", "recail", "recayi", "receb", "recepali", "recudiye", "redda", "redife", "refa", "refahattin", "refail", "refan", "refat", "refike", "refiya", "regaib", "rehim", "rehime", "rekiya", "remazan", "remezan", "remiha", "remus", "renan", "renata", "rengül", "renin", "reşalet", "resmi", "resül", "resulcan", "revaha", "revasiye", "revhi", "revşi", "revzete", "reyide", "reyis", "reyzan", "rezge", "ridvan", "ridvane", "rifa", "rifki", "rihan", "rime", "riskiye", "rivayet", "riyad", "riyat", "riyhane", "riza", "rizan", "rizgar", "rizk", "rizkiye", "rizvan", "robert", "rohat", "rohat", "rojbin", "rojda", "rojdiyar", "rojin", "rojnu", "rolkay", "romulus", "roşan", "rowena", "rozan", "rozcan", "rubaşa", "rüçan", "ruçhan", "rufat", "rüfet", "rufi", "rüfiye", "rüğzan", "ruhat", "ruhevza", "ruhide", "ruhser", "ruhyete", "rüjdiye", "ruken", "ruken", "rukhiya", "rukide", "rukkiye", "ruknettin", "rukuya", "rüküye", "rükye", "rumeysa", "rumi", "rurten", "rüsan", "ruşan", "rüşdi", "rüşen", "rustem", "saadin", "sabahatdin", "sabahettin", "sabahi", "sabahittin", "sabahiye", "şabanül", "sabattin", "şabettin", "sabihat", "sabihe", "sabike", "sabile", "sadat", "sade", "sadeddin", "şadem", "saden", "sadenur", "sadet", "sadet", "sadetdin", "sadeti", "şadettin", "sadi", "sadife", "sadik", "sadika", "sadikar", "sadike", "şadiman", "şadime", "sadin", "sadinaz", "sadise", "sadittin", "sadiye", "sadulla", "şafaat", "safaniye", "safariye", "şafer", "safet", "safetullah", "safide", "şafii", "safikar", "safile", "safine", "safinez", "safiya", "safiyye", "safura", "safure", "safvet", "sagip", "şaha", "şahab", "sahabe", "şahabeddin", "sahare", "şahdiye", "şahender", "şaheste", "şahhüseyin", "şahide", "şahidi", "sahife", "şahimerdan", "şahinaz", "şahinde", "şahinder", "şahine", "şahiser", "şahismail", "şahiye", "şahize", "şahizer", "şahmar", "şahmettin", "şahnuray", "sahre", "şahriban", "sahriye", "şahsene", "şahsenem", "şahsine", "şahzende", "şahziye", "said", "şaide", "şaile", "şaizer", "sakime", "sakip", "salahaddin", "salahattin", "salahettin", "salahittin", "salami", "salen", "salha", "şali", "saliç", "salice", "salif", "salihcan", "salihe", "salimet", "saliya", "saliye", "salli", "salper", "şamazet", "samed", "sametcan", "samia", "samican", "şamili", "samittin", "şammas", "samra", "sandra", "şanize", "şanli", "sanur", "şara", "şarafettin", "saray", "sarayi", "sargin", "sari", "sari", "sarigül", "sariye", "sarya", "sascha", "satan", "sati", "sati", "satia", "satilmiş", "şatir", "satiye", "satrettin", "savci", "şavki", "şayda", "sayeddin", "sayfe", "saygin", "şayibe", "sayid", "sayile", "sayim", "sayime", "sayin", "şayip", "şayiste", "sayit", "şayizar", "sayme", "sayre", "sayriye", "şayzar", "şazie", "şazime", "şazimet", "sead", "seadet", "sebahaddin", "sebahatdin", "sebahiddin", "sebahittin", "sebahiye", "sebahniye", "sebahnur", "sebaittin", "sebattin", "sebaye", "sebehat", "sebğet", "sebgetullah", "sebigül", "sebiha", "sebihat", "sebila", "sebilay", "sebir", "sebiyha", "sebla", "secaattin", "seçgin", "seçgün", "seçin", "sedahat", "sedaket", "seday", "sedefye", "sedife", "sedika", "sedirye", "sediye", "sedrettin", "sefade", "sefadiye", "sefagül", "sefanur", "sefayin", "sefegül", "seferiye", "seffannur", "şefi", "şefie", "şefike", "sefil", "sefilay", "sefine", "sefiyan", "şefiye", "sefkan", "şefket", "şefki", "sefuriye", "segah", "şehabettin", "şehali", "sehel", "sehergülü", "şehide", "şehinaz", "sehirnaz", "şehmus", "sehne", "şehnur", "sehra", "şehreban", "şehri", "şehristan", "şehruban", "şehrüzan", "sehure", "şehza", "seithan", "sejda", "şekim", "şekir", "şeküre", "sekvan", "selahaddin", "selahatdin", "selahatin", "selahattin", "selaheddin", "selahi", "selahiddin", "selahittin", "şelale", "selam", "selamet", "selamet", "selametdin", "selamettin", "selami", "selamik", "selatin", "selattin", "selbi", "selbin", "selbinaz", "selbiye", "selçen", "selçin", "selcuk", "selden", "selehattin", "selemin", "selenay", "selfinaz", "selhaddin", "seliha", "selima", "selimiye", "selimşah", "selinay", "selincan", "selmaye", "selme", "selmihan", "selnay", "selsebil", "selvan", "selvane", "selvent", "selver", "selver", "selvim", "selvinas", "selviye", "semaha", "semahir", "semal", "şemam", "semat", "sematin", "semehet", "semia", "semihan", "semihe", "semilay", "semina", "semira", "şemiran", "şemistan", "semiya", "şemiye", "semiz", "semral", "semran", "semrin", "semriye", "şemsa", "şemse", "şemseddin", "şemsihan", "şemsinur", "şemsittin", "semyan", "senadin", "senan", "şenbahar", "sencar", "sencay", "sendur", "şengezer", "şenil", "şennaz", "şenül", "seraceddin", "seracettin", "şerafeddin", "seral", "seral", "şerban", "serbent", "sercay", "serçim", "serçin", "serçin", "serda", "serda", "serdaç", "serdarbey", "serdegül", "serdihan", "şerefbey", "şerefetdin", "şerefettin", "serem", "serenay", "serep", "serezli", "şerfe", "serfet", "serfin", "serfinaz", "serfirat", "sergey", "sergünay", "serhad", "serhatmehmet", "şerifegül", "şerifnur", "seriha", "serihan", "şerine", "seriye", "şerize", "serkant", "sermail", "şerman", "sermil", "sermin", "sermiye", "serper", "serrap", "sertan", "sertaş", "servan", "şervim", "servin", "serya", "sesil", "setenay", "seva", "sevban", "sevcihan", "sevcin", "sevdagül", "sevdakar", "sevdal", "sevdanur", "sevdegül", "sevdi", "sevdinar", "seve", "sevgil", "sevgin", "sevginar", "sevgiser", "sevgison", "sevgizar", "sevgünar", "sevibe", "sevider", "şevika", "şevike", "sevila", "sevile", "sevilnur", "sevim", "şevin", "seviye", "şevkan", "şevke", "sevkiyat", "şevkiyet", "sevla", "sevlan", "şevle", "sevli", "sevligül", "sevliye", "şevma", "sevra", "seyahat", "şeyba", "seybe", "seycan", "seyde", "seydihan", "seydiye", "seydo", "seydullah", "seyfa", "seyfeddin", "seyfet", "seyfetullah", "seyfiddin", "seyfittin", "seyfun", "şeyhamit", "şeyhmus", "şeyhmuz", "şeyho", "seyid", "seyide", "seyidhan", "seyifali", "seyir", "seyitahmet", "seyitali", "şeyman", "şeymanur", "şeyme", "şeynaz", "seynur", "seyra", "şeyva", "seyyane", "seyyar", "seyyat", "seyyid", "seyyidullah", "sezair", "sezaner", "sezanur", "sezar", "sezayi", "sezcan", "sezihan", "sezilan", "shahram", "siber", "sida", "sidar", "sidar", "siddi", "siddik", "siddika", "side", "sidem", "sidik", "sidika", "sidika", "sidiret", "sidki", "sidret", "siğnem", "şih", "siham", "şihmehmet", "şihmus", "sila", "şilan", "silanur", "silay", "silay", "silma", "silver", "şima", "simamperi", "simel", "şimet", "simgenur", "simla", "simnare", "simon", "sinangül", "sinanperi", "şinay", "sinef", "sinemis", "sino", "sipan", "şipir", "şirinaz", "şirinnaz", "şirivan", "sirma", "sirmahan", "sirri", "sisan", "sisi", "sitdik", "sitdika", "sitem", "sitem", "siti", "sitizübeyda", "sitki", "sittik", "sittika", "sittike", "sitto", "siyahi", "siyami", "şiyar", "şiyar", "siyaset", "siyasi", "siyen", "şöhrat", "solma", "sona", "şöret", "sosi", "söylemez", "söyler", "sšheyla", "stefan", "stephanie", "suad", "suada", "suade", "suadiye", "şüal", "şuap", "şuayb", "şuayben", "şuayip", "şüayp", "şuayüp", "süber", "subhani", "subutiye", "sücaattin", "sücaettin", "sucan", "südiye", "südriye", "süeyla", "sugat", "suhal", "süham", "şüheda", "şuheda", "sühem", "süheyda", "suheyl", "süheyla", "şuhule", "şükren", "şükret", "şükri", "şükriyen", "şükrüye", "şüküfe", "şükür", "sülahi", "sülbiye", "sülbüye", "şüle", "şulehan", "süleybe", "süleyha", "süleyla", "suleyman", "sülfidan", "sulhattin", "sulhuye", "sullhattin", "sultane", "sultani", "sultaniye", "sümeray", "sümerra", "sümerya", "sümeye", "sumeyra", "sümeyya", "sümeyye", "sümeyye", "summani", "sümra", "sunacan", "sündüz", "süner", "suphan", "süphiye", "supho", "şura", "surahanim", "sürahi", "suray", "surayye", "sürbüye", "sürecettin", "suret", "sureyya", "süreyye", "sürhap", "süriye", "surreya", "sürün", "susam", "susan", "süsdem", "süsenber", "susin", "süsli", "sütya", "şuule", "süveyla", "süyer", "şüyüp", "süzan", "suzay", "süzem", "süzer", "süziyen", "svetlana", "tabip", "tabire", "tacdin", "taceddin", "taciddin", "tacider", "tacittin", "taçlan", "tahayasin", "tahide", "tahip", "tahsime", "takittin", "talan", "talat", "talet", "taleyha", "tamara", "tamarya", "tamcihan", "tancu", "tanem", "tannur", "tansuhan", "tanya", "tarfa", "tarika", "tarjan", "taş", "tasie", "taşkin", "taşkinege", "tasvire", "taumani", "taybet", "tayibe", "tayip", "tayiva", "tayyer", "tayyib", "tayyibet", "tayyübe", "teberik", "tefekkül", "tefik", "teknaz", "telat", "telnur", "temami", "temim", "temmuz", "temraz", "temur", "tenzile", "tenzire", "tercen", "teslim", "teslime", "tesmiye", "tevfide", "teybet", "teycan", "teyfik", "teyibe", "teyup", "teyyar", "tezebey", "timsal", "tinmaz", "tohit", "tokhtaubai", "tolğa", "tomasz", "topi", "tüba", "tübe", "tüberk", "tubiye", "tuce", "tuğbahan", "tuğbanur", "tuğberk", "tuğça", "tuğcan", "tuğce", "tuğçehan", "tügen", "tuğmen", "tuğnil", "tuğrulhan", "tulay", "tule", "tulin", "tülü", "tumen", "tüncay", "tunçtugay", "türab", "turabi", "turafiye", "türcan", "turcayin", "turcein", "turceun", "turcihan", "türciye", "turğay", "turğut", "türkan", "turkay", "turkay", "türken", "türkşan", "türküler", "türkün", "türkyilmaz", "turnel", "tursun", "tursun", "tutkucan", "tüzen", "tüzin", "tzemile", "ubeyit", "üçler", "ufeyra", "uğraş", "ugur", "uğurkan", "uhut", "ükke", "ülbiye", "ülfani", "ülfiye", "ülgar", "ülkay", "ülki", "ülki", "ülkinar", "ülkiye", "ülküme", "ülküsen", "ülmiye", "ülvi", "ülviye", "ülya", "umahan", "ümeysa", "ümgül", "ümithan", "ümmahan", "ummahani", "ummani", "ümmehan", "ümmen", "ümmihan", "ümmü", "ümmügül", "ümmügülsüm", "ümmügülsün", "ümmuhan", "ummuhani", "ümmülü", "ümmünihan", "ümmüran", "ümmüşan", "ümmüsü", "ümmüsün", "ümmüye", "umran", "ümray", "ümre", "ümşan", "ümsel", "ümügül", "umuhan", "ümülgülsüm", "umurhan", "ümüş", "umuşan", "ümüşen", "ümüsün", "ümüt", "ümüt", "umutcan", "ünlühan", "unur", "ünzüle", "urakkuş", "urartu", "ürfet", "ürfet", "ürfettin", "ürfi", "urkiya", "urkiye", "urkuş", "ürküye", "uruç", "ürüşan", "üryan", "üsame", "usamettin", "useme", "üseyin", "üseyt", "utkucan", "üveyda", "üveyis", "uyanser", "uyariş", "üzeme", "üzeybe", "üzlife", "uzlufe", "üzüme", "u¦ur", "vadedin", "vadha", "vahdeddin", "vahdi", "vaide", "vali", "validiye", "vargin", "varlik", "vasif", "vasile", "vasiyle", "vatangül", "vaysal", "vecdan", "veciben", "vecide", "veciye", "vedad", "vediha", "vehide", "vehiye", "veis", "vejdi", "velaattin", "velat", "velattin", "velitdin", "velittin", "verdal", "verde", "verdi", "verdiat", "vesile", "vesiyle", "vesme", "vethan", "veysal", "veyseddin", "veysiye", "vezat", "vezir", "veznegül", "vezrife", "vicidan", "vidat", "vidayet", "videt", "vige", "vijdan", "vilayet", "vildane", "viyan", "wioletta", "wojciech", "yadigar", "yadigar", "yadikar", "yadikar", "yadiker", "yadin", "yağfes", "yağiz", "yağizcan", "yakub", "yalçin", "yalçinkaya", "yalgin", "yalim", "yalin", "yamin", "yanki", "yanki", "yansi", "yardim", "yaren", "yarkin", "yaşaddin", "yaşagül", "yasal", "yaşariye", "yaşarnuri", "yaşat", "yaşattin", "yaşegül", "yasemen", "yasevil", "yasime", "yasir", "yasmin", "yavize", "yaze", "yazgi", "yazi", "yeda", "yekbun", "yekcan", "yekda", "yektacan", "yelim", "yelis", "yelsu", "yemliha", "yeniay", "yerkyegul", "yerkyejan", "yeşer", "yeşeren", "yeşilay", "yesire", "yeteriye", "yetgin", "yigit", "yiğitalp", "yigitcan", "yigiter", "yihya", "yilay", "yildan", "yildir", "yildiran", "yildiray", "yildiray", "yildirim", "yildiz", "yildiz", "yilmaz", "yilmaz", "yonis", "yonus", "yosif", "yudum", "yunis", "yunise", "yünüs", "yunusemre", "yurda", "yurda", "yurdun", "yurtsenin", "yuşa", "yusna", "yüsra", "yüsuf", "yusufhan", "zadife", "zafercan", "zafiye", "zahfer", "zahi", "zahid", "zahtinur", "zahure", "zakine", "zale", "zaliha", "zaliha", "zana", "zari", "zariye", "zayide", "zebirce", "zede", "zedef", "zeha", "zeher", "zehide", "zehni", "zehni", "zehniye", "zehragül", "zehranur", "zehre", "zekai", "zekariya", "zekariye", "zekayi", "zekeriye", "zekeriyya", "zekerya", "zekine", "zeko", "zelal", "zelen", "zeleyha", "zelha", "zelife", "zelihan", "zelihe", "zelika", "zemhanur", "zemide", "zemine", "zemirhan", "zemiya", "zemzema", "zemzeme", "zenibe", "zenife", "zennun", "zennure", "zennuriye", "zenure", "zercan", "zerdi", "zere", "zerfinaz", "zerga", "zeride", "zerife", "zero", "zeruk", "zevcan", "zevlüde", "zeydan", "zeydin", "zeyican", "zeynal", "zeynalabidin", "zeynap", "zeyneb", "zeynebe", "zeynet", "zeyneti", "zeynettin", "zeynettin", "zeynittin", "zeytin", "zeytun", "zeyyad", "zhamshitbek", "zihnet", "zihrelcebin", "zihriye", "zikret", "zilfa", "zilfi", "zilha", "zilife", "zimet", "zineti", "zini", "zinnet", "zinnete", "zino", "zivre", "ziyacan", "ziyaddin", "ziyafer", "ziyafettin", "ziyaittin", "ziyamet", "ziyattin", "ziyettin", "zöhra", "zöhre", "zöhrehan", "zöhtü", "zozan", "zübede", "züberbariş", "zübeybe", "zübeyda", "zubeyde", "zübeyir", "zübeyra", "zübüde", "züeyda", "züfer", "zuhal", "zuhat", "zühdü", "zühel", "züheyla", "züheyla", "zuhra", "zühriye", "zührü", "zuka", "zülahi", "zülal", "zülale", "zülay", "zülbiya", "zülbiye", "zülfinaz", "zulfiye", "zülfizer", "zülfükar", "zülgarni", "zulihe", "zülkade", "zülkar", "zülkarneyin", "zülker", "zümbül", "zümrah", "zümral", "zümran", "zümray", "zümre", "zümrete", "zumrettar", "zümriye", "zümrüye", "züray", "zürbiye", "zürha", "züriye", "zürtüllah", "zürüye"];
},{}],"src/views/GameStart.ts":[function(require,module,exports) {
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GameStart = void 0;

var Game_1 = require("../models/Game");

var enum_1 = require("../utils/enum");

var GameInitUI_1 = require("./GameInitUI");

var View_1 = require("./View");

var names_json_1 = __importDefault(require("../../data/names.json"));

var GameStart = /*#__PURE__*/function (_View_1$View) {
  _inherits(GameStart, _View_1$View);

  var _super = _createSuper(GameStart);

  function GameStart() {
    var _this;

    _classCallCheck(this, GameStart);

    _this = _super.apply(this, arguments);

    _this.onGameStartClick = function () {
      var computerAnswer = _this.pickRandomWord();

      _this.answerListHandler(computerAnswer, enum_1.Type.Computer);

      console.log(computerAnswer);
      console.log(_this.model);
    };

    _this.onPlayAgainClick = function () {
      var newGame = Game_1.Game.build({
        level: enum_1.Level.Easy,
        answers: []
      });
      var gameInitUI = new GameInitUI_1.GameInitUI(_this.parent, newGame);
      gameInitUI.render();
    };

    return _this;
  }

  _createClass(GameStart, [{
    key: "eventsMap",
    value: function eventsMap() {
      return {
        'click:.play-again-btn': this.onPlayAgainClick,
        'click:.game-start-btn': this.onGameStartClick
      };
    }
  }, {
    key: "answerListHandler",
    value: function answerListHandler(answer, type) {
      var currentAnswer = {
        word: answer,
        type: type
      };
      var answerList = this.model.get('answers');
      answerList.push(currentAnswer);
      this.model.set({
        answers: answerList
      });
      this.createNewLine(answer, type);
    }
  }, {
    key: "createNewLine",
    value: function createNewLine(value, type) {
      var userAnswersList = document.querySelector('.user-answers-list');
      var computerAnswersList = document.querySelector('.computer-answers-list');
      var li = document.createElement('li');
      li.textContent = value;

      if (type === enum_1.Type.User) {
        userAnswersList.appendChild(li);
      }

      if (type === enum_1.Type.Computer) {
        computerAnswersList.appendChild(li);
      }
    }
  }, {
    key: "answerIsCorrect",
    value: function answerIsCorrect(answer) {
      // get last word from answers
      var answers = this.model.get('answers');
      var lastAnswer = answers[answers.length - 1]; // check last char of answer and first char of last answer is the same

      return answer.charAt(answer.length - 1) === lastAnswer.word.charAt(0);
    }
  }, {
    key: "pickRandomWord",
    value: function pickRandomWord() {
      var words = names_json_1.default;
      var randomIndex = Math.floor(Math.random() * words.length);
      return words[randomIndex];
    }
  }, {
    key: "template",
    value: function template() {
      return "\n    <div> \n      <button class=\"play-again-btn\">Play Again</button>\n      <h1 id=\"title\">Word Play</h1>\n      <input type=\"text\" value=\"-\" name=\"user-input\" id=\"user-input\" />\n      <br />\n      <button class=\"game-start-btn\">Start Game</button>\n      <br />\n      <input type=\"text\" value=\"-\" name=\"computer-input\" id=\"computer-input\" />\n      <ol class=\"user-answers-list\"></ol>\n      <ol class=\"computer-answers-list\"></ol>\n    </div>";
    }
  }]);

  return GameStart;
}(View_1.View);

exports.GameStart = GameStart;
},{"../models/Game":"src/models/Game.ts","../utils/enum":"src/utils/enum.ts","./GameInitUI":"src/views/GameInitUI.ts","./View":"src/views/View.ts","../../data/names.json":"data/names.json"}],"src/views/GameInitUI.ts":[function(require,module,exports) {
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GameInitUI = void 0;

var Game_1 = require("../models/Game");

var GameStart_1 = require("./GameStart");

var View_1 = require("./View");

var GameInitUI = /*#__PURE__*/function (_View_1$View) {
  _inherits(GameInitUI, _View_1$View);

  var _super = _createSuper(GameInitUI);

  function GameInitUI() {
    var _this;

    _classCallCheck(this, GameInitUI);

    _this = _super.apply(this, arguments);

    _this.onReadyClick = function () {
      var checkedLevel = _this.parent.querySelector('input[name="level"]:checked');

      var speaker = document.getElementById('speaker');

      if (!checkedLevel || !speaker) {
        throw new Error('Missing required fields ( level or speaker )');
      }

      var language = speaker.options[speaker.selectedIndex].value;
      var level = parseInt(checkedLevel.value, 10);

      var recognition = _this.onInitSpeechRecognition(language);

      var newGame = Game_1.Game.build({
        level: level,
        recognition: recognition,
        answers: []
      });
      var gameStartUI = new GameStart_1.GameStart(_this.parent, newGame);
      gameStartUI.render();
    };

    return _this;
  }

  _createClass(GameInitUI, [{
    key: "eventsMap",
    value: function eventsMap() {
      return {
        'click:.ready-btn': this.onReadyClick
      };
    }
  }, {
    key: "onInitSpeechRecognition",
    value: function onInitSpeechRecognition(language) {
      var speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

      if (!speechRecognition) {
        throw new Error('Speech recognition not available');
      }

      var recognition = new speechRecognition({
        continuous: false,
        interimResults: false,
        maxAlternatives: 1
      }); // configure language

      recognition.lang = language;
      return recognition;
    }
  }, {
    key: "template",
    value: function template() {
      return "\n      <form name=\"form\" class=\"form\">\n        <label for=\"level\">Level: </label>\n        <input class=\"level-radio\" type=\"radio\" name=\"level\" value=30 data-level=\"easy\" checked>Easy</input>\n        <input class=\"level-radio\" type=\"radio\" name=\"level\" value=20 data-level=\"medium\">Medium</input>\n        <input class=\"level-radio\" type=\"radio\" name=\"level\" value=10 data-level=\"hard\">Hard</input>\n        <br />\n        <label for=\"level\">Speaker Language: </label>\n        <select name=\"speaker\" id=\"speaker\">\n          <option value=\"en-US\">English</option>\n          <option value=\"tr-TR\">Turkish</option>\n        </select>\n         <br />\n        <button class=\"ready-btn\">Ready</button>\n      </form> \n    ";
    }
  }]);

  return GameInitUI;
}(View_1.View);

exports.GameInitUI = GameInitUI;
},{"../models/Game":"src/models/Game.ts","./GameStart":"src/views/GameStart.ts","./View":"src/views/View.ts"}],"src/views/WordPlay.ts":[function(require,module,exports) {
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WordPlay = void 0;

var GameInitUI_1 = require("./GameInitUI");

var View_1 = require("./View");

var WordPlay = /*#__PURE__*/function (_View_1$View) {
  _inherits(WordPlay, _View_1$View);

  var _super = _createSuper(WordPlay);

  function WordPlay() {
    _classCallCheck(this, WordPlay);

    return _super.apply(this, arguments);
  }

  _createClass(WordPlay, [{
    key: "regionsMap",
    value: function regionsMap() {
      return {
        gameInit: '.game-init'
      };
    }
  }, {
    key: "onRender",
    value: function onRender() {
      var gameInitUI = new GameInitUI_1.GameInitUI(this.regions.gameInit, this.model);
      gameInitUI.render();
    }
  }, {
    key: "template",
    value: function template() {
      return "\n    <div> \n      <div class=\"game-init\"></div>\n    </div>";
    }
  }]);

  return WordPlay;
}(View_1.View);

exports.WordPlay = WordPlay;
},{"./GameInitUI":"src/views/GameInitUI.ts","./View":"src/views/View.ts"}],"src/index.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var Game_1 = require("./models/Game");

var enum_1 = require("./utils/enum");

var WordPlay_1 = require("./views/WordPlay");

var root = document.getElementById('root');
var newGame = Game_1.Game.build({
  level: enum_1.Level.Easy
});

if (root) {
  var wordPlay = new WordPlay_1.WordPlay(root, newGame);
  wordPlay.render();
}
},{"./models/Game":"src/models/Game.ts","./utils/enum":"src/utils/enum.ts","./views/WordPlay":"src/views/WordPlay.ts"}],"../../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "59265" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","src/index.ts"], null)
//# sourceMappingURL=/src.f10117fe.js.map