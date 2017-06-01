/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	var CustomElement = __webpack_require__(2);

	if (typeof window !== 'undefined') {
	    window.CustomElement = CustomElement;
	}

	module.exports = CustomElement;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

	var Store = __webpack_require__(3),
	    createElement = __webpack_require__(6);

	var CustomElement = Store.generate(function CustomElement(options) {
	    var _ = this;

	    Store.call(_, typeof options === 'object' ? options.data : {});

	    var dom = _.bars.build(_.bars.preCompile(options.template || _.template, 'index', null, {
	        minify: true
	    }), _._data);

	    _.defineProperties({
	        element: dom.rootNode,
	        dom: dom
	    });

	    _.on('update', function() {
	        _.update();
	    });

	    _.update();
	});

	CustomElement.createElement = createElement;

	CustomElement.definePrototype({
	    update: function update() {
	        var _ = this;
	        _.dom.update(_._data);
	    }
	});

	module.exports = CustomElement;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

	var Generator = __webpack_require__(4),
	    events = __webpack_require__(5);

	var Store = Generator.generateFrom(events.EventEmitter, function Store(data) {
	    var _ = this;

	    _.defineProperties({
	        _data: data || {}
	    });
	});

	Store.definePrototype({
	    set: function set(key, value) {
	        this._data = typeof this._data === 'object' ? this._data : {};

	        var _ = this,
	            splat = key.split(/\/|\./),
	            lastKey = splat.pop(),
	            obj = _._data;

	        for (var i = 0; i < splat.length; i++) {
	            if (typeof obj[splat[i]] !== 'object') {
	                obj[splat[i]] = {};
	            }

	            obj = obj[splat[i]];
	        }

	        obj[lastKey] = value;

	        _.emit('update', key, value);

	        return value;
	    },

	    unset: function unset(key) {
	        this._data = typeof this._data === 'object' ? this._data : {};

	        var _ = this,
	            splat = key.split(/\/|\./),
	            lastKey = splat.pop(),
	            obj = _._data;

	        for (var i = 0; i < splat.length; i++) {
	            if (typeof obj[splat[i]] !== 'object') {
	                obj[splat[i]] = {};
	            }

	            obj = obj[splat[i]];
	        }

	        delete obj[lastKey];

	        obj = _._data;

	        for (i = 0; i < splat.length; i++) {
	            if (typeof obj[splat[i]] === 'object' && !Object.keys(obj[splat[i]]).length) {
	                delete obj[splat[i]];
	                break;
	            }

	            obj = obj[splat[i]];
	        }

	        _.emit('update', key);
	    },

	    get: function get(key) {
	        var _ = this,
	            splat = key.split(/\/|\./),
	            lastKey = splat.pop(),
	            obj = _._data;

	        for (var i = 0; i < splat.length; i++) {
	            obj = obj[splat[i]];
	            if (!obj) return;
	        }

	        return obj[lastKey];
	    },

	    push: function push(key, value) {
	        var _ = this,
	            arr = _.get(key);

	        if (arr instanceof Array) {
	            arr.push(value);
	            _.set(key, arr);
	        } else {
	            _.set(key, [value]);
	        }
	    }
	});

	module.exports = Store;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * @name generate.js
	 * @author Michaelangelo Jong
	 */

	(function GeneratorScope() {
	    /**
	     * Assert Error function.
	     * @param  {Boolean} condition Whether or not to throw error.
	     * @param  {String} message    Error message.
	     */
	    function assertError(condition, message) {
	        if (!condition) {
	            throw new Error(message);
	        }
	    }

	    /**
	     * Assert TypeError function.
	     * @param  {Boolean} condition Whether or not to throw error.
	     * @param  {String} message    Error message.
	     */
	    function assertTypeError(test, type) {
	        if (typeof test !== type) {
	            throw new TypeError('Expected \'' + type +
	                '\' but instead found \'' +
	                typeof test + '\'');
	        }
	    }

	    /**
	     * Returns the name of function 'func'.
	     * @param  {Function} func Any function.
	     * @return {String}        Name of 'func'.
	     */
	    function getFunctionName(func) {
	        if (func.name !== void(0)) {
	            return func.name;
	        }
	        // Else use IE Shim
	        var funcNameMatch = func.toString()
	            .match(/function\s*([^\s]*)\s*\(/);
	        func.name = (funcNameMatch && funcNameMatch[1]) || '';
	        return func.name;
	    }

	    /**
	     * Returns true if 'obj' is an object containing only get and set functions, false otherwise.
	     * @param  {Any} obj Value to be tested.
	     * @return {Boolean} true or false.
	     */
	    function isGetSet(obj) {
	        var keys, length;
	        if (obj && typeof obj === 'object') {
	            keys = Object.getOwnPropertyNames(obj)
	                .sort();
	            length = keys.length;

	            if ((length === 1 && (keys[0] === 'get' && typeof obj.get ===
	                    'function' ||
	                    keys[0] === 'set' && typeof obj.set === 'function'
	                )) ||
	                (length === 2 && (keys[0] === 'get' && typeof obj.get ===
	                    'function' &&
	                    keys[1] === 'set' && typeof obj.set === 'function'
	                ))) {
	                return true;
	            }
	        }
	        return false;
	    }

	    /**
	     * Defines properties on 'obj'.
	     * @param  {Object} obj        An object that 'properties' will be attached to.
	     * @param  {Object} descriptor Optional object descriptor that will be applied to all attaching properties on 'properties'.
	     * @param  {Object} properties An object who's properties will be attached to 'obj'.
	     * @return {Generator}         'obj'.
	     */
	    function defineObjectProperties(obj, descriptor, properties) {
	        var setProperties = {},
	            i,
	            keys,
	            length,

	            p = properties || descriptor,
	            d = properties && descriptor;

	        properties = (p && typeof p === 'object') ? p : {};
	        descriptor = (d && typeof d === 'object') ? d : {};

	        keys = Object.getOwnPropertyNames(properties);
	        length = keys.length;

	        for (i = 0; i < length; i++) {
	            if (isGetSet(properties[keys[i]])) {
	                setProperties[keys[i]] = {
	                    configurable: !!descriptor.configurable,
	                    enumerable: !!descriptor.enumerable,
	                    get: properties[keys[i]].get,
	                    set: properties[keys[i]].set
	                };
	            } else {
	                setProperties[keys[i]] = {
	                    configurable: !!descriptor.configurable,
	                    enumerable: !!descriptor.enumerable,
	                    writable: !!descriptor.writable,
	                    value: properties[keys[i]]
	                };
	            }
	        }
	        Object.defineProperties(obj, setProperties);
	        return obj;
	    }



	    var Creation = {
	        /**
	         * Defines properties on this object.
	         * @param  {Object} descriptor Optional object descriptor that will be applied to all attaching properties.
	         * @param  {Object} properties An object who's properties will be attached to this object.
	         * @return {Object}            This object.
	         */
	        defineProperties: function defineProperties(descriptor,
	            properties) {
	            defineObjectProperties(this, descriptor,
	                properties);
	            return this;
	        },

	        /**
	         * returns the prototype of `this` Creation.
	         * @return {Object} Prototype of `this` Creation.
	         */
	        getProto: function getProto() {
	            return Object.getPrototypeOf(this);
	        },

	        /**
	         * returns the prototype of `this` super Creation.
	         * @return {Object} Prototype of `this` super Creation.
	         */
	        getSuper: function getSuper() {
	            return Object.getPrototypeOf(this.constructor.prototype);
	        }
	    };

	    var Generation = {
	        /**
	         * Returns true if 'generator' was generated by this Generator.
	         * @param  {Generator} generator A Generator.
	         * @return {Boolean}             true or false.
	         */
	        isGeneration: function isGeneration(generator) {
	            assertTypeError(generator, 'function');

	            var _ = this;

	            return _.prototype.isPrototypeOf(generator.prototype);
	        },

	        /**
	         * Returns true if 'object' was created by this Generator.
	         * @param  {Object} object An Object.
	         * @return {Boolean}       true or false.
	         */
	        isCreation: function isCreation(object) {
	            var _ = this;
	            return object instanceof _;
	        },
	        /**
	         * Generates a new generator that inherits from `this` generator.
	         * @param {Generator} ParentGenerator Generator to inherit from.
	         * @param {Function} create           Create method that gets called when creating a new instance of new generator.
	         * @return {Generator}                New Generator that inherits from 'ParentGenerator'.
	         */
	        generate: function generate(construct) {
	            assertTypeError(construct, 'function');

	            var _ = this;

	            defineObjectProperties(
	                construct, {
	                    configurable: false,
	                    enumerable: false,
	                    writable: false
	                }, {
	                    prototype: Object.create(_.prototype)
	                }
	            );

	            defineObjectProperties(
	                construct, {
	                    configurable: false,
	                    enumerable: false,
	                    writable: false
	                },
	                Generation
	            );

	            defineObjectProperties(
	                construct.prototype, {
	                    configurable: false,
	                    enumerable: false,
	                    writable: false
	                }, {
	                    constructor: construct,
	                    generator: construct,
	                }
	            );

	            return construct;
	        },

	        /**
	         * Defines shared properties for all objects created by this generator.
	         * @param  {Object} descriptor Optional object descriptor that will be applied to all attaching properties.
	         * @param  {Object} properties An object who's properties will be attached to this generator's prototype.
	         * @return {Generator}         This generator.
	         */
	        definePrototype: function definePrototype(descriptor,
	            properties) {
	            defineObjectProperties(this.prototype,
	                descriptor,
	                properties);
	            return this;
	        }
	    };

	    function Generator() {}

	    defineObjectProperties(
	        Generator, {
	            configurable: false,
	            enumerable: false,
	            writable: false
	        }, {
	            prototype: Generator.prototype
	        }
	    );

	    defineObjectProperties(
	        Generator.prototype, {
	            configurable: false,
	            enumerable: false,
	            writable: false
	        },
	        Creation
	    );

	    defineObjectProperties(
	        Generator, {
	            configurable: false,
	            enumerable: false,
	            writable: false
	        },
	        Generation
	    );

	    defineObjectProperties(
	        Generator, {
	            configurable: false,
	            enumerable: false,
	            writable: false
	        }, {
	            /**
	             * Returns true if 'generator' was generated by this Generator.
	             * @param  {Generator} generator A Generator.
	             * @return {Boolean}             true or false.
	             */
	            isGenerator: function isGenerator(generator) {
	                return this.isGeneration(generator);
	            },

	            /**
	             * Generates a new generator that inherits from `this` generator.
	             * @param {Generator} extendFrom      Constructor to inherit from.
	             * @param {Function} create           Create method that gets called when creating a new instance of new generator.
	             * @return {Generator}                New Generator that inherits from 'ParentGenerator'.
	             */
	            toGenerator: function toGenerator(extendFrom, create) {
	                console.warn(
	                    'Generator.toGenerator is depreciated please use Generator.generateFrom'
	                );
	                return this.generateFrom(extendFrom, create);
	            },

	            /**
	             * Generates a new generator that inherits from `this` generator.
	             * @param {Constructor} extendFrom    Constructor to inherit from.
	             * @param {Function} create           Create method that gets called when creating a new instance of new generator.
	             * @return {Generator}                New Generator that inherits from 'ParentGenerator'.
	             */
	            generateFrom: function generateFrom(extendFrom, create) {
	                assertTypeError(extendFrom, 'function');
	                assertTypeError(create, 'function');

	                defineObjectProperties(
	                    create, {
	                        configurable: false,
	                        enumerable: false,
	                        writable: false
	                    }, {
	                        prototype: Object.create(extendFrom.prototype),
	                    }
	                );

	                defineObjectProperties(
	                    create, {
	                        configurable: false,
	                        enumerable: false,
	                        writable: false
	                    },
	                    Generation
	                );

	                defineObjectProperties(
	                    create.prototype, {
	                        configurable: false,
	                        enumerable: false,
	                        writable: false
	                    }, {
	                        constructor: create,
	                        generator: create,
	                    }
	                );

	                defineObjectProperties(
	                    create.prototype, {
	                        configurable: false,
	                        enumerable: false,
	                        writable: false
	                    },
	                    Creation
	                );

	                return create;
	            }
	        }
	    );

	    Object.freeze(Generator);
	    Object.freeze(Generator.prototype);

	    // Exports
	    if (true) {
	        // AMD
	        !(__WEBPACK_AMD_DEFINE_RESULT__ = function () {
	            return Generator;
	        }.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	    } else if (typeof module === 'object' && typeof exports === 'object') {
	        // Node/CommonJS
	        module.exports = Generator;
	    } else {
	        // Browser global
	        window.Generator = Generator;
	    }

	}());


/***/ }),
/* 5 */
/***/ (function(module, exports) {

	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.

	function EventEmitter() {
	  this._events = this._events || {};
	  this._maxListeners = this._maxListeners || undefined;
	}
	module.exports = EventEmitter;

	// Backwards-compat with node 0.10.x
	EventEmitter.EventEmitter = EventEmitter;

	EventEmitter.prototype._events = undefined;
	EventEmitter.prototype._maxListeners = undefined;

	// By default EventEmitters will print a warning if more than 10 listeners are
	// added to it. This is a useful default which helps finding memory leaks.
	EventEmitter.defaultMaxListeners = 10;

	// Obviously not all Emitters should be limited to 10. This function allows
	// that to be increased. Set to zero for unlimited.
	EventEmitter.prototype.setMaxListeners = function(n) {
	  if (!isNumber(n) || n < 0 || isNaN(n))
	    throw TypeError('n must be a positive number');
	  this._maxListeners = n;
	  return this;
	};

	EventEmitter.prototype.emit = function(type) {
	  var er, handler, len, args, i, listeners;

	  if (!this._events)
	    this._events = {};

	  // If there is no 'error' event listener then throw.
	  if (type === 'error') {
	    if (!this._events.error ||
	        (isObject(this._events.error) && !this._events.error.length)) {
	      er = arguments[1];
	      if (er instanceof Error) {
	        throw er; // Unhandled 'error' event
	      }
	      throw TypeError('Uncaught, unspecified "error" event.');
	    }
	  }

	  handler = this._events[type];

	  if (isUndefined(handler))
	    return false;

	  if (isFunction(handler)) {
	    switch (arguments.length) {
	      // fast cases
	      case 1:
	        handler.call(this);
	        break;
	      case 2:
	        handler.call(this, arguments[1]);
	        break;
	      case 3:
	        handler.call(this, arguments[1], arguments[2]);
	        break;
	      // slower
	      default:
	        len = arguments.length;
	        args = new Array(len - 1);
	        for (i = 1; i < len; i++)
	          args[i - 1] = arguments[i];
	        handler.apply(this, args);
	    }
	  } else if (isObject(handler)) {
	    len = arguments.length;
	    args = new Array(len - 1);
	    for (i = 1; i < len; i++)
	      args[i - 1] = arguments[i];

	    listeners = handler.slice();
	    len = listeners.length;
	    for (i = 0; i < len; i++)
	      listeners[i].apply(this, args);
	  }

	  return true;
	};

	EventEmitter.prototype.addListener = function(type, listener) {
	  var m;

	  if (!isFunction(listener))
	    throw TypeError('listener must be a function');

	  if (!this._events)
	    this._events = {};

	  // To avoid recursion in the case that type === "newListener"! Before
	  // adding it to the listeners, first emit "newListener".
	  if (this._events.newListener)
	    this.emit('newListener', type,
	              isFunction(listener.listener) ?
	              listener.listener : listener);

	  if (!this._events[type])
	    // Optimize the case of one listener. Don't need the extra array object.
	    this._events[type] = listener;
	  else if (isObject(this._events[type]))
	    // If we've already got an array, just append.
	    this._events[type].push(listener);
	  else
	    // Adding the second element, need to change to array.
	    this._events[type] = [this._events[type], listener];

	  // Check for listener leak
	  if (isObject(this._events[type]) && !this._events[type].warned) {
	    var m;
	    if (!isUndefined(this._maxListeners)) {
	      m = this._maxListeners;
	    } else {
	      m = EventEmitter.defaultMaxListeners;
	    }

	    if (m && m > 0 && this._events[type].length > m) {
	      this._events[type].warned = true;
	      console.error('(node) warning: possible EventEmitter memory ' +
	                    'leak detected. %d listeners added. ' +
	                    'Use emitter.setMaxListeners() to increase limit.',
	                    this._events[type].length);
	      if (typeof console.trace === 'function') {
	        // not supported in IE 10
	        console.trace();
	      }
	    }
	  }

	  return this;
	};

	EventEmitter.prototype.on = EventEmitter.prototype.addListener;

	EventEmitter.prototype.once = function(type, listener) {
	  if (!isFunction(listener))
	    throw TypeError('listener must be a function');

	  var fired = false;

	  function g() {
	    this.removeListener(type, g);

	    if (!fired) {
	      fired = true;
	      listener.apply(this, arguments);
	    }
	  }

	  g.listener = listener;
	  this.on(type, g);

	  return this;
	};

	// emits a 'removeListener' event iff the listener was removed
	EventEmitter.prototype.removeListener = function(type, listener) {
	  var list, position, length, i;

	  if (!isFunction(listener))
	    throw TypeError('listener must be a function');

	  if (!this._events || !this._events[type])
	    return this;

	  list = this._events[type];
	  length = list.length;
	  position = -1;

	  if (list === listener ||
	      (isFunction(list.listener) && list.listener === listener)) {
	    delete this._events[type];
	    if (this._events.removeListener)
	      this.emit('removeListener', type, listener);

	  } else if (isObject(list)) {
	    for (i = length; i-- > 0;) {
	      if (list[i] === listener ||
	          (list[i].listener && list[i].listener === listener)) {
	        position = i;
	        break;
	      }
	    }

	    if (position < 0)
	      return this;

	    if (list.length === 1) {
	      list.length = 0;
	      delete this._events[type];
	    } else {
	      list.splice(position, 1);
	    }

	    if (this._events.removeListener)
	      this.emit('removeListener', type, listener);
	  }

	  return this;
	};

	EventEmitter.prototype.removeAllListeners = function(type) {
	  var key, listeners;

	  if (!this._events)
	    return this;

	  // not listening for removeListener, no need to emit
	  if (!this._events.removeListener) {
	    if (arguments.length === 0)
	      this._events = {};
	    else if (this._events[type])
	      delete this._events[type];
	    return this;
	  }

	  // emit removeListener for all listeners on all events
	  if (arguments.length === 0) {
	    for (key in this._events) {
	      if (key === 'removeListener') continue;
	      this.removeAllListeners(key);
	    }
	    this.removeAllListeners('removeListener');
	    this._events = {};
	    return this;
	  }

	  listeners = this._events[type];

	  if (isFunction(listeners)) {
	    this.removeListener(type, listeners);
	  } else {
	    // LIFO order
	    while (listeners.length)
	      this.removeListener(type, listeners[listeners.length - 1]);
	  }
	  delete this._events[type];

	  return this;
	};

	EventEmitter.prototype.listeners = function(type) {
	  var ret;
	  if (!this._events || !this._events[type])
	    ret = [];
	  else if (isFunction(this._events[type]))
	    ret = [this._events[type]];
	  else
	    ret = this._events[type].slice();
	  return ret;
	};

	EventEmitter.listenerCount = function(emitter, type) {
	  var ret;
	  if (!emitter._events || !emitter._events[type])
	    ret = 0;
	  else if (isFunction(emitter._events[type]))
	    ret = 1;
	  else
	    ret = emitter._events[type].length;
	  return ret;
	};

	function isFunction(arg) {
	  return typeof arg === 'function';
	}

	function isNumber(arg) {
	  return typeof arg === 'number';
	}

	function isObject(arg) {
	  return typeof arg === 'object' && arg !== null;
	}

	function isUndefined(arg) {
	  return arg === void 0;
	}


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

	var Bars = __webpack_require__(7),
	    registerBars = __webpack_require__(64),
	    attach = __webpack_require__(65);

	module.exports = function createElement(config, constructor) {
	    var _ = this,
	        bars = new Bars(),
	        el = _.generate(constructor);

	    el.createElement = createElement;
	    el.registerBars = registerBars(bars);
	    el.registerBars(config);
	    el.attach = attach;

	    return el;
	};


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(8);


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(9);


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

	var Bars = __webpack_require__(10),
	    compile = __webpack_require__(40);


	Bars.definePrototype({
	    compile: function compile(template, filename, mode, flags) {
	        var _ = this;
	        return _.build(_.preCompile(template, filename, mode,
	            flags));
	    },

	    preCompile: function preCompile(template, filename, mode, flags) {
	        return compile(template, filename, mode, flags);
	    }
	});

	module.exports = Bars;


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

	var Generator = __webpack_require__(4),
	    Renderer = __webpack_require__(11),
	    Token = __webpack_require__(17),
	    Blocks = __webpack_require__(38),
	    Transform = __webpack_require__(39),
	    packageJSON = __webpack_require__(26);

	var Bars = Generator.generate(function Bars() {
	    var _ = this;

	    _.defineProperties({
	        blocks: new Blocks(),
	        partials: {},
	        transforms: new Transform()
	    });
	});

	Bars.definePrototype({
	    version: packageJSON.version,
	    build: function build(parsedTemplate) {
	        var _ = this,
	            program = parsedTemplate;

	        if (Array.isArray(parsedTemplate)) {
	            program = new Token.tokens.program();

	            program.fromArray(parsedTemplate);
	        }

	        return new Renderer(_, program.fragment);
	    },

	    registerBlock: function registerBlock(name, block) {
	        var _ = this;

	        _.blocks[name] = block;
	    },

	    registerPartial: function registerPartial(name, templateRenderer) {
	        var _ = this;

	        _.partials[name] = templateRenderer;
	    },

	    registerTransform: function registerTransform(name, func) {
	        var _ = this;

	        _.transforms[name] = func;
	    },
	});

	module.exports = Bars;


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

	var Generator = __webpack_require__(4),
	    Frag = __webpack_require__(12);

	var Renderer = Generator.generate(function Renderer(bars, struct) {
	    var _ = this;

	    _.defineProperties({
	        bars: bars,
	        struct: struct
	    });
	});

	Renderer.definePrototype({
	    render: function render() {
	        var _ = this;
	        return new Frag(null, _.bars, _.struct);
	    },
	});

	module.exports = Renderer;


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

	var Generator = __webpack_require__(4),
	    execute = __webpack_require__(13),
	    utils = __webpack_require__(15),
	    Context = __webpack_require__(16),

	    pathSpliter = utils.pathSpliter,
	    findPath = utils.findPath,

	    Nodes = {},

	    ARRAY = [],
	    MAP = {
	        'fragment': 'FRAG',
	        'tag': 'TAG',
	        'text': 'TEXT',
	        'attr': 'ATTR',
	        'block': 'BLOCK',
	        'insert': 'TEXT',
	        'partial': 'PARTIAL'
	    };

	/**
	 * [BarsNode description]
	 * @param {[type]} bars     [description]
	 * @param {[type]} struct   [description]
	 */
	var BarsNode = Generator.generate(function BarsNode(frag, bars, struct) {
	    var _ = this;

	    _.defineProperties({
	        fragment: frag || null,
	        bars: bars,
	        nodes: [],
	        parentTag: {
	            get: _.getParentTag
	        },
	        prevDom: {
	            get: _.getPrevDom
	        },
	        type: struct.type,
	        name: struct.name,
	        value: struct.value,
	        arg: struct.expression,
	        conFrag: struct.consequent,
	        altFrag: struct.alternate,
	    });
	});

	BarsNode.definePrototype({
	    update: function update(context) {
	        var _ = this;

	        _.previousDom = null;

	        _._update(context);

	        if (_.isDOM) {
	            _._elementAppendTo();
	            _.parentTag.previousDom = _;
	        }

	        _.previousDom = null;
	    },

	    _update: function _update() {
	        console.warn('_update method not implemented.');
	    },

	    appendChild: function appendChild(child) {
	        var _ = this;

	        _.nodes.push(child);
	        child.parent = _;
	    },

	    appendTo: function appendTo(parent) {
	        var _ = this;

	        if (parent instanceof Element) {
	            _._elementAppendTo(parent);
	        }

	        if (BarsNode.isCreation(parent)) {
	            parent.appendChild(_);
	        }
	    },

	    remove: function remove() {
	        var _ = this,
	            index = _.parent.nodes.indexOf(_);

	        if (index >= 0) {
	            _.parent.nodes.splice(index, 1);
	        }

	        _._elementRemove();
	    },

	    getParentTag: function getParentTag() {
	        var _ = this,
	            parent = _.parent,
	            oldParent = parent;

	        while (parent && !parent.isDOM) {
	            oldParent = parent;
	            parent = parent.parent;
	        }

	        return parent || oldParent || null;
	    },

	    getPrevDom: function getPrevDom() {
	        var _ = this;

	        return (_.parentTag && _.parentTag.previousDom) || null;
	    },

	    _elementAppendTo: function _elementAppendTo(parent) {
	        var _ = this;

	        if (!_.parentTag) return;

	        parent = parent || _.parentTag.$el || _.parentTag.$parent;

	        if (!parent) return;
	        if (_.$el.parentElement) return;

	        var prev = _.prevDom;

	        if (prev) {
	            parent.insertBefore(_.$el, prev.$el.nextSibling);
	        } else {
	            parent.appendChild(_.$el);
	        }
	    },

	    _elementRemove: function _elementRemove() {
	        var _ = this;

	        if (_.isDOM && _.$el.parentNode instanceof Element) {
	            _.$el.parentNode.removeChild(_.$el);
	        }
	    },
	});


	/**
	 * [TextNode description]
	 * @param {[type]} bars    [description]
	 * @param {[type]} struct  [description]
	 */
	Nodes.TEXT = BarsNode.generate(function TextNode(frag, bars, struct) {
	    var _ = this;

	    BarsNode.call(this, frag, bars, struct);

	    _.defineProperties({
	        $el: document.createTextNode(struct.value)
	    });
	});

	Nodes.TEXT.definePrototype({
	    isDOM: true,

	    appendChild: function appendChild(child) {
	        console.warn('appendChild CANNOT be called on TextNodes.');
	    },

	    _update: function _update(context) {
	        var _ = this;

	        if (_.arg) {
	            _.$el.textContent = execute(_.arg, _.bars.transforms,
	                context);
	        }
	    },
	});


	/**
	 * [TagNode description]
	 * @param {[type]} bars    [description]
	 * @param {[type]} struct  [description]
	 */
	Nodes.TAG = BarsNode.generate(function TagNode(frag, bars, struct) {
	    var _ = this,
	        nodes = struct.nodes || ARRAY,
	        attrs = struct.attrs || ARRAY,
	        i;

	    BarsNode.call(this, frag, bars, struct);

	    _.defineProperties({
	        $el: document.createElement(struct.name),
	        attrs: []
	    });

	    for (i = 0; i < nodes.length; i++) {
	        var node = nodes[i];
	        _.appendChild(new Nodes[MAP[node.type]](frag, bars, node));
	    }

	    for (i = 0; i < attrs.length; i++) {
	        var attr = attrs[i];
	        _.addAttr(new Nodes[MAP[attr.type]](frag, bars, attr));
	    }

	});

	Nodes.TAG.definePrototype({
	    isDOM: true,

	    _update: function _update(context) {
	        var _ = this,
	            i;

	        for (i = 0; i < _.attrs.length; i++) {
	            _.attrs[i].update(context);
	        }

	        for (i = 0; i < _.nodes.length; i++) {
	            _.nodes[i].update(context);
	        }
	    },

	    addAttr: function addAttr(child) {
	        var _ = this;

	        _.attrs.push(child);
	        child.parent = _;
	    },
	});

	/**
	 * [AttrNode description]
	 * @param {[type]} bars    [description]
	 * @param {[type]} struct  [description]
	 */
	Nodes.ATTR = BarsNode.generate(function AttrNode(frag, bars, struct) {
	    var _ = this,
	        nodes = struct.nodes || ARRAY;

	    BarsNode.call(this, frag, bars, struct);

	    _.defineProperties({
	        $el: document.createElement('div'),
	    });

	    for (var i = 0; i < nodes.length; i++) {
	        var node = nodes[i];
	        _.appendChild(new Nodes[MAP[node.type]](frag, bars, node));
	    }
	});

	Nodes.ATTR.definePrototype({
	    isDOM: true,
	    type: 'ATTR',
	    _update: function _update(context) {
	        var _ = this,
	            i;

	        for (i = 0; i < _.nodes.length; i++) {
	            _.nodes[i].update(context);
	        }
	    },
	    _elementAppendTo: function _elementAppendTo() {
	        var _ = this,
	            parent = _.parentTag.$el;

	        if (parent instanceof Element) {
	            parent.setAttribute(_.name, _.$el.textContent);
	        }
	    },
	    _elementRemove: function _elementRemove() {
	        var _ = this,
	            parent = _.parentTag.$el;

	        if (parent instanceof Element) {
	            parent.removeAttribute(_.name);
	        }
	    }
	});


	/**
	 * [BlockNode description]
	 * @param {[type]} bars    [description]
	 * @param {[type]} struct  [description]
	 */
	Nodes.BLOCK = BarsNode.generate(function BlockNode(frag, bars, struct) {
	    var _ = this;

	    BarsNode.call(this, frag, bars, struct);

	    _.path = pathSpliter(findPath(_.arg));
	});

	Nodes.BLOCK.definePrototype({
	    type: 'BLOCK',

	    createFragment: function createFragment(path) {
	        var _ = this,
	            frag = new Nodes.FRAG(_.fragment, _.bars, _.conFrag);

	        _.appendChild(frag);

	        return frag;
	    },

	    _update: function _update(context) {
	        var _ = this,
	            con,
	            arg,
	            i;

	        if (typeof _.bars.blocks[_.name] === 'function') {
	            arg = execute(_.arg, _.bars.transforms, context);
	            con = _.bars.blocks[_.name].call(_, arg);
	        } else {
	            throw new Error('Block helper not found: ' + _.name);
	        }

	        if (con) {
	            if (!_.nodes.length) {
	                _.createFragment();
	            }

	            for (i = 0; i < _.nodes.length; i++) {
	                _.nodes[i].update(context);
	            }

	            if (_.alternate) {
	                _.alternate._elementRemove();
	            }
	        } else {
	            for (i = 0; i < _.nodes.length; i++) {
	                _.nodes[i]._elementRemove();
	            }

	            if (!_.alternate && _.altFrag) {
	                _.alternate = new Nodes[MAP[_.altFrag.type]](
	                    _.fragment,
	                    _.bars,
	                    _.altFrag
	                );
	                _.alternate.parent = _;
	            }

	            if (_.alternate) _.alternate.update(context);
	        }
	    },
	    _elementAppendTo: function _elementAppendTo() {},
	    _elementRemove: function _elementRemove() {
	        var _ = this,
	            i;

	        for (i = 0; i < _.nodes.length; i++) {
	            _.nodes[i]._elementRemove();
	        }

	        if (_.alternate) {
	            _.alternate._elementRemove();
	        }
	    }
	});


	/**
	 * [PartialNode description]
	 * @param {[type]} bars    [description]
	 * @param {[type]} struct  [description]
	 */
	Nodes.PARTIAL = BarsNode.generate(function PartialNode(frag, bars, struct) {
	    var _ = this;

	    BarsNode.call(this, frag, bars, struct);

	    _.path = pathSpliter(findPath(_.arg));
	});

	Nodes.PARTIAL.definePrototype({
	    _update: function _update(context) {
	        var _ = this;

	        if (!_.partial) {
	            var partial = _.bars.partials[_.name];

	            if (partial && typeof partial === 'object') {
	                _.partial = new Nodes.FRAG(_.fragment, _.bars,
	                    partial.struct);
	                _.partial.parent = _;
	                if (
	                    (
	                        _.path.length === 1 &&
	                        _.path[0] !== 'this' &&
	                        _.path[0] !== '.' &&
	                        _.path[0] !== ''
	                    ) ||
	                    _.path.length > 1
	                ) {
	                    _.partial.context.path = _.path;
	                }
	            } else {
	                throw new Error('Partial not found: ' + _.name);
	            }
	        }

	        var arg = execute(_.arg, _.bars.transforms, context);
	        _.partial.context.data = arg;
	        _.partial.update(context);
	    },

	    _elementRemove: function _elementRemove() {
	        var _ = this;

	        if (_.partial) {
	            _.partial._elementRemove();
	        }
	    }
	});


	/**
	 * [FragNode description]
	 * @param {[type]} bars    [description]
	 * @param {[type]} struct  [description]
	 */
	Nodes.FRAG = BarsNode.generate(function FragNode(frag, bars, struct) {
	    // console.log('>>>>>', struct);
	    var _ = this,
	        nodes = struct.nodes || ARRAY;

	    BarsNode.call(this, frag, bars, struct);

	    _.context = new Context(null, _, '');

	    for (var i = 0; i < nodes.length; i++) {
	        var node = nodes[i];
	        if (MAP[node.type])
	            _.appendChild(new Nodes[MAP[node.type]](_, bars, node));
	    }
	});

	Nodes.FRAG.definePrototype({
	    _update: function _update(data) {
	        var _ = this;

	        if (!Context.isCreation(data)) {
	            _.context.data = data;
	        }

	        for (var i = 0; i < _.nodes.length; i++) {
	            _.nodes[i].update(_.context);
	        }
	        _.context.data = null;
	    },

	    _elementAppendTo: function _elementAppendTo(parent) {
	        var _ = this;

	        _.$parent = parent;
	    },
	    _elementRemove: function _elementRemove() {
	        var _ = this;

	        for (var i = 0; i < _.nodes.length; i++) {
	            _.nodes[i]._elementRemove();
	        }

	        _.$parent = null;
	    }
	});

	module.exports = Nodes.FRAG;


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

	var logic = __webpack_require__(14);

	function execute(syntaxTree, transforms, context) {
	    function run(token) {
	        var result,
	            args = [];
	        // console.log('>>>>', token)
	        if (
	            token.type === 'literal'
	        ) {
	            result = token.value;
	        } else if (
	            token.type === 'value'
	        ) {
	            result = context.lookup(token.path);
	        } else if (
	            token.type === 'operator' &&
	            token.operands.length === 1
	        ) {
	            result = logic[token.operator](
	                run(token.operands[0])
	            );
	        } else if (
	            token.type === 'operator' &&
	            token.operands.length === 2
	        ) {
	            if (token.operator === '||') {
	                result = run(token.operands[0]) || run(token.operands[1]);
	            } else if (token.operator === '&&') {
	                result = run(token.operands[0]) && run(token.operands[1]);
	            } else {
	                result = logic[token.operator](
	                    run(token.operands[0]),
	                    run(token.operands[1])
	                );
	            }
	        } else if (
	            token.type === 'transform'
	        ) {
	            for (var i = 0; i < token.arguments.length; i++) {
	                args.push(run(token.arguments[i]));
	            }
	            if (transforms[token.name] instanceof Function) {
	                result = transforms[token.name].apply(null, args);
	            } else {
	                throw 'Missing Transfrom: "' + token.name + '".';
	            }
	        }
	        // console.log('<<<<', result)
	        return result;
	    }

	    if (syntaxTree) {
	        return run(syntaxTree);
	    } else {
	        return context.lookup('.');
	    }
	}

	module.exports = execute;


/***/ }),
/* 14 */
/***/ (function(module, exports) {

	/* Arithmetic */
	exports.add      = function add      (a, b) { return a + b; };
	exports.subtract = function subtract (a, b) { return a - b; };
	exports.multiply = function multiply (a, b) { return a * b; };
	exports.devide   = function devide   (a, b) { return a / b; };
	exports.mod      = function mod      (a, b) { return a % b; };

	exports['+'] = exports.add;
	exports['-'] = exports.subtract;
	exports['*'] = exports.multiply;
	exports['/'] = exports.devide;
	exports['%'] = exports.mod;

	/* Logic */

	exports.not = function not (a) { return !a; };

	exports['!'] = exports.not;

	exports.or        = function or         (a, b) { return a || b; };
	exports.and       = function and        (a, b) { return a && b; };

	exports['||'] = exports.or;
	exports['&&'] = exports.and;

	/* Comparison */

	exports.strictequals    = function strictequals     (a, b) { return a === b; };
	exports.strictnotequals = function strictnotequals  (a, b) { return a !== b; };

	exports['==='] = exports.strictequals;
	exports['!=='] = exports.strictnotequals;

	exports.equals    = function equals     (a, b) { return a == b; };
	exports.notequals = function notequals  (a, b) { return a != b; };
	exports.ltequals  = function ltequals   (a, b) { return a <= b; };
	exports.gtequals  = function gtequals   (a, b) { return a >= b; };

	exports['=='] = exports.equals;
	exports['!='] = exports.notequals;
	exports['<='] = exports.ltequals;
	exports['>='] = exports.gtequals;

	exports.lt = function lt (a, b) { return a < b; };
	exports.gt = function gt (a, b) { return a > b; };

	exports['<'] = exports.lt;
	exports['>'] = exports.gt;


/***/ }),
/* 15 */
/***/ (function(module, exports) {

	exports.pathResolver = function pathResolver(base, path) {
	    base = base.slice();
	    path = path.slice();

	    while (base.length && path[0] === '..') {
	        path.shift();
	        base.pop();
	    }

	    return base.concat(path);
	};

	exports.pathSpliter = function pathSpliter(path) {
	    var splitPath;

	    if (path instanceof Array) {
	        splitPath = path;
	    } else if (typeof path === 'string') {
	        if (path.match(/[/]|[.][.]/)) {
	            splitPath = path.split('/');
	        } else {
	            splitPath = path.split('.');
	        }

	        if (!splitPath[0] && !splitPath[1]) {
	            splitPath = ['.'];
	        }

	        var barsProp = splitPath.pop()
	            .split('@');
	        if (barsProp[0]) {
	            splitPath.push(barsProp[0]);
	        }
	        if (barsProp[1]) {
	            splitPath.push('@' + barsProp[1]);
	        }
	    } else {
	        throw 'bad arrgument: expected String | Array<String>.';
	    }

	    return splitPath;
	};

	function findPath(arg) {
	    if (arg) {
	        if (arg.type === 'insert') {
	            return arg.path;
	        } else if (
	            arg.type === 'operator' ||
	            arg.type === 'transform'
	        ) {
	            for (var i = 0; i < arg.arguments.length; i++) {
	                var argI = findPath(arg.arguments[i]);
	                if (argI.type === 'insert') {
	                    return argI.argument;
	                }
	            }
	        }
	    }

	    return '';
	}

	exports.findPath = findPath;


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

	var Generator = __webpack_require__(4);
	var utils = __webpack_require__(15);
	var pathSpliter = utils.pathSpliter;
	var pathResolver = utils.pathResolver;

	var Context = Generator.generate(function Context(data, fragment, path) {
	    var _ = this;

	    _.data = data;
	    _.fragment = fragment;
	    _.context = null;
	    _.path = path;
	    _.__path = [];

	    _.props = {
	        get key() {
	            if (!_.path.length && _.context) {
	                return _.context.props.key;
	            }
	            return _.path[_.path.length - 1];
	        },
	        get index() {
	            if (!_.path.length && _.context) {
	                return _.context.props.index;
	            }
	            return _.path[_.path.length - 1];
	        }
	    };
	});

	Context.definePrototype({
	    path: {
	        get: function path() {
	            return this.__path || [];
	        },
	        set: function path(path) {
	            var _ = this;

	            // path = pathSpliter(path);
	            var fragment = _.fragment;

	            _.data = null;
	            _.context = null;

	            if (path[0] === '~' && fragment.fragment) {

	                while (fragment.fragment) {
	                    fragment = fragment.fragment;
	                }
	                _.context = fragment.context;
	                path.shift();
	            } else if (path[0] === '..' && fragment.fragment &&
	                fragment
	                .fragment
	                .fragment) {
	                _.context = fragment.fragment.context;

	                while (path[0] === '..' && _.context.context) {

	                    path = pathResolver(_.context.path, path);

	                    _.context = _.context.context;
	                }
	            }

	            _.__path = path;
	        }
	    },

	    lookup: function lookup(path) {
	        var _ = this,
	            i = 0;

	        // path = pathSpliter(path);
	        // console.log('lookup:', path)

	        if (!_.context && _.fragment.fragment) {
	            _.context = _.fragment.fragment.context;
	        }

	        if (path[0] === '~' && _.context) {
	            return _.context.lookup(path);
	        }

	        if (path[0] === '..' && _.context) {
	            return _.context.lookup(
	                pathResolver(_.path, path)
	            );
	        }

	        if (
	            path[0] === 'this' ||
	            path[0] === '.' ||
	            path[0] === '~' ||
	            path[0] === '@'
	        ) {
	            i = 1;
	        }

	        if (!_.data && _.context) {
	            _.data = _.context.lookup(_.path);
	        }

	        if (!_.data) return;

	        var value = (path[0] === '@' ? _.props : _.data);

	        // console.log('lookup:', value)


	        for (; value && i < path.length; i++) {

	            if (value !== null && value !== void(0)) {
	                value = value[path[i]];
	            } else {
	                value = undefined;
	            }
	        }
	        // console.log('lookup:', value)

	        return value;
	    }
	});

	module.exports = Context;


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

	var Token = __webpack_require__(18);

	// program
	__webpack_require__(25);
	__webpack_require__(27);

	// html markup
	__webpack_require__(28);
	__webpack_require__(29);
	__webpack_require__(30);

	// bars markup
	__webpack_require__(31);
	__webpack_require__(32);
	__webpack_require__(33);

	// bars expression
	__webpack_require__(34);
	__webpack_require__(35);
	__webpack_require__(36);
	__webpack_require__(37);


	// TODO: maps

	module.exports = Token;
	// module.exports = window.Token = Token;




	// test

	// var prog = new Token.tokens.program();
	//
	// prog.fragment = new Token.tokens.fragment();
	//
	// for (var i = 0; i < 5; i++) {
	//     prog.fragment.nodes.push(new Token.tokens.tag());
	// }

	// window.prog = prog;


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

	var Token = __webpack_require__(19)
	    .Token;

	var BarsToken = Token.generate(
	    function BarsToken(code, type) {
	        Token.call(this, code, type);
	    }
	);

	BarsToken.tokens = [];

	BarsToken.definePrototype({
	    writable: true
	}, {
	    indentLevel: ''
	});

	BarsToken.definePrototype({
	    TYPE_ID: -1,

	    toJSON: function toJSON(arr) {
	        if (this.JSONuseObject)
	            return this.toObject();
	        return this.toArray();
	    },

	    toArray: function toArray() {
	        var _ = this;

	        console.warn('toArray not impleneted.');
	        return [-1];
	    },

	    toObject: function toObject() {
	        var _ = this;

	        console.warn('toObject not impleneted.');
	        return {
	            type: _.type,
	            TYPE_ID: _.TYPE_ID
	        };
	    },
	    fromArray: function fromArray(arr) {
	        var _ = this;
	        if (arr[0] !== _.TYPE_ID) {
	            throw 'TypeMismatch: ' + arr[0] + ' is not ' + _.TYPE_ID;
	        }

	        _._fromArray(arr);
	    },
	    updates: function updates() {
	        var _ = this;
	        console.warn('updates not impleneted.');
	    }
	});

	module.exports = BarsToken;


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

	exports.Compiler = __webpack_require__(20);
	exports.Token = __webpack_require__(22);


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

	var Generator = __webpack_require__(4),
	    Scope = __webpack_require__(21),
	    Token = __webpack_require__(22),
	    CodeBuffer = __webpack_require__(24),
	    utils = __webpack_require__(23);

	var Compiler = Generator.generate(
	    function Compiler(parseModes, formaters) {
	        var _ = this;

	        _.modeFormater = formaters.modeFormater || utils.varThrough;
	        _.charFormater = formaters.charFormater || utils.varThrough;
	        _.funcFormater = formaters.funcFormater || utils.varThrough;
	        _.typeFormater = formaters.typeFormater || utils.varThrough;
	        _.sourceFormater = formaters.sourceFormater || utils.varThrough;

	        _.parseModes = parseModes;
	        _.scope = new Scope();
	    }
	);

	Compiler.definePrototype({
	    compile: function compile(codeStr, file, mode, flags) {
	        var _ = this,
	            tokens = [];

	        _.codeBuffer = new CodeBuffer(codeStr, file);

	        _.scope.verbose = flags.verbose;

	        if (flags.verbose) {
	            _.scope.printScope();
	        }

	        _.parseMode(mode, tokens, flags);

	        if (flags.verbose) {
	            _.scope.printScope();
	        }

	        if (_.scope.length) {
	            throw _.codeBuffer.makeError(
	                'Unexpected End Of Input.'
	            );
	        }

	        return tokens;
	    },

	    parseMode: function parseMode(mode, tokens, flags) {
	        var _ = this,
	            scope = _.scope,
	            code = _.codeBuffer,
	            token,
	            parseFuncs = _.parseModes[mode],
	            index = code.index;

	        if (!parseFuncs) {
	            throw new Error('Mode not found: ' + JSON.stringify(
	                mode) + '.');
	        }

	        function newParseMode(mode, tokens, flags) {
	            _.parseMode(mode, tokens, flags);
	        }

	        newParseMode.close = function () {
	            this.closed = true;
	        };

	        loop: while (code.left) {

	            for (var i = 0; i < parseFuncs.length; i++) {
	                var parseFunc = parseFuncs[i];

	                if (flags.verbose) {
	                    console.log(
	                        utils.repeat('  ', scope.length +
	                            1) +
	                        _.modeFormater(mode) + ' ' +
	                        _.funcFormater(parseFunc.name) +
	                        '\n' +
	                        utils.repeat('  ', scope.length +
	                            1) +
	                        utils.bufferSlice(code, 5, _.charFormater)
	                    );
	                }

	                token = parseFunc(
	                    mode,
	                    code,
	                    tokens,
	                    flags,
	                    scope,
	                    newParseMode
	                );

	                if (token) {
	                    if (token instanceof Token) {
	                        tokens.push(token);

	                        if (flags.verbose) {
	                            console.log(
	                                utils.repeat('  ', scope.length +
	                                    1) +
	                                _.typeFormater(token.constructor
	                                    .name || token.type) +
	                                ': ' +
	                                _.sourceFormater(token.source())
	                            );
	                        }
	                    }

	                    if (newParseMode.closed) {
	                        delete newParseMode.closed;
	                        break loop;
	                    }

	                    break;
	                }
	            }

	            if (newParseMode.closed) {
	                delete newParseMode.closed;
	                break loop;
	            }

	            if (index === code.index) {
	                token = new Token(code);
	                token.close(code);
	                token.value = token.source(code);

	                if (flags.noErrorOnILLEGAL) {
	                    tokens.push(token);
	                } else {
	                    throw code.makeError(
	                        token.range[0],
	                        token.range[1],
	                        'ILLEGAL Token: ' +
	                        JSON.stringify(
	                            token.source(code)
	                        )
	                        .slice(1, -1)
	                    );
	                }
	            }

	            index = code.index;
	        }
	    }
	});

	module.exports = Compiler;


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

	var Generator = __webpack_require__(4),
	    Token = __webpack_require__(22),
	    utils = __webpack_require__(23);

	var Scope = Generator.generate(
	    function Scope() {
	        var _ = this;

	        _.defineProperties({
	            _scope: []
	        });
	    }
	);

	Scope.definePrototype({
	    push: function push(token) {
	        var _ = this;

	        utils.assertError(Token.isCreation(token), 'Invalid Type.');

	        _._scope.push(token);

	        if (_.verbose) {
	            _.printScope();
	        }

	        return _._scope.length;
	    },
	    pop: function pop() {
	        var _ = this;

	        var token = _._scope.pop();

	        if (_.verbose) {
	            _.printScope();
	        }

	        return token;
	    },
	    close: function close() {
	        var _ = this;

	        var token = _._scope.pop();

	        token.close();

	        if (_.verbose) {
	            _.printScope();
	        }

	        return token;
	    },
	    printScope: function printScope() {
	        var _ = this;

	        console.log(
	            ['Main'].concat(
	                _._scope
	                .map(function (item) {
	                    return item.constructor.name ||
	                        item.type;
	                })
	            )
	            .join(' => ')
	        );
	    },
	    token: {
	        get: function getToken() {
	            var _ = this;

	            return _._scope[_._scope.length - 1];
	        }
	    },
	    length: {
	        get: function getLength() {
	            var _ = this;

	            return _._scope.length;
	        }
	    }
	});

	module.exports = Scope;


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

	var Generator = __webpack_require__(4),
	    utils = __webpack_require__(23);

	var Token = Generator.generate(
	    function Token(code, type) {
	        var _ = this;

	        _.defineProperties({
	            code: code
	        });

	        _.type = type;
	        _.range = [code.index, code.index + 1];
	        _.loc = {
	            start: {
	                line: code.line,
	                column: code.column
	            },
	            end: {
	                line: code.line,
	                column: code.column + 1
	            }
	        };
	    }
	);

	Token.definePrototype({
	    writable: true,
	    enumerable: true
	}, {
	    type: 'ILLEGAL'
	});

	Token.definePrototype({
	    length: {
	        get: function getLength() {
	            return this.range[1] - this.range[0];
	        }
	    },
	    source: function source() {
	        var _ = this;
	        return _.code.slice(_.range[0], _.range[1]);
	    },
	    close: function close() {
	        var _ = this;

	        if (_.closed) {
	            throw new Error('Cannot call close on a closed token.');
	        }

	        _.closed = true;

	        if (_.code.index > _.range[1]) {
	            _.range[1] = _.code.index;
	            _.loc.end = {
	                line: _.code.line,
	                column: _.code.column
	            };
	        }
	    }
	});

	module.exports = Token;


/***/ }),
/* 23 */
/***/ (function(module, exports) {

	/**
	 * Assert Error function.
	 * @param  {Boolean} condition Whether or not to throw error.
	 * @param  {String} message    Error message.
	 */
	function assertError(condition, message) {
	    if (!condition) {
	        throw new Error(message);
	    }
	}
	exports.assertError = assertError;

	/**
	 * Assert TypeError function.
	 * @param  {Boolean} condition Whether or not to throw error.
	 * @param  {String} message    Error message.
	 */
	function assertTypeError(test, type) {
	    if (typeof test !== type) {
	        throw new TypeError('Expected \'' + type +
	            '\' but instead found \'' +
	            typeof test + '\'');
	    }
	}
	exports.assertTypeError = assertTypeError;

	/**
	 * Repeats a string `n` time.
	 * @param  {String} str String to be repeated.
	 * @param  {Number} n   Number of times to repeat.
	 */
	function repeat(str, n) {
	    var result = '';

	    for (var i = 0; i < n; i++) {
	        result += str;
	    }

	    return result;
	}
	exports.repeat = repeat;

	/**
	 * Returns whatever you pass it.
	 * @param  {Any} a CodeBuffer to slice.
	 */
	function varThrough(a) {
	    return a;
	}
	exports.varThrough = varThrough;

	/**
	 * Stringified CodeBuffer slice.
	 * @param  {CodeBuffer} code CodeBuffer to slice.
	 * @param  {Number} range    Range to slice before and after `code.index`.
	 */
	function bufferSlice(code, range, format) {
	    format = format || varThrough;
	    return JSON.stringify(
	            code.slice(Math.max(0, code.index - range), code.index)
	        )
	        .slice(1, -1) +
	        format(
	            JSON.stringify(code.charAt(code.index) || 'EOF')
	            .slice(1, -1)
	        ) +
	        JSON.stringify(
	            code.slice(
	                code.index + 1,
	                Math.min(code.length, code.index + 1 + range)
	            )
	        )
	        .slice(1, -1);
	}
	exports.bufferSlice = bufferSlice;


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

	var Generator = __webpack_require__(4),
	    utils = __webpack_require__(23);

	var CodeBuffer = Generator.generate(
	    function CodeBuffer(str, file) {
	        var _ = this;

	        _.reset();
	        _._buffer = str;
	        _._file = file;
	    }
	);

	CodeBuffer.definePrototype({
	    reset: function reset() {
	        var _ = this;

	        _.line = 1;
	        _.column = 1;
	        _._index = 0;
	        _._currentLine = 0;
	    },
	    currentLine: {
	        get: function currentLine() {
	            var _ = this,
	                lineText = '',
	                i = _._currentLine;

	            while (i < _.length) {
	                lineText += _._buffer[i];
	                if (_._buffer.codePointAt(i) === 10) {
	                    break;
	                }
	                i++;
	            }

	            return lineText;
	        }
	    },

	    buffer: {
	        get: function getBuffer() {
	            var _ = this;

	            return _._buffer;
	        }
	    },


	    index: {
	        get: function getIndex() {
	            var _ = this;

	            return _._index;
	        },

	        set: function setIndex(val) {
	            var _ = this,
	                i = _._index,
	                update = false;

	            val = Math.min(_.length, val);
	            val = Math.max(0, val);

	            if (i == val) return;

	            if (i > val) {
	                // throw new Error('========' + val + ' < ' +i+'=======');
	                _.reset();
	                i = _._index;
	            }

	            if (_.buffer.codePointAt(i) === 10) {
	                update = true;
	                i++;
	            }

	            for (; i <= val; i++) {
	                if (update) {
	                    _._currentLine = i;
	                    _.line++;
	                    update = false;
	                } else {
	                    _.column++;
	                }

	                if (_.buffer.codePointAt(i) === 10) {
	                    update = true;
	                }
	            }
	            _.column = val - _._currentLine + 1;
	            _._index = val;
	        }
	    },

	    length: {
	        get: function getLength() {
	            var _ = this;

	            return _._buffer.length;
	        }
	    },

	    next: function next() {
	        var _ = this;

	        _.index++;
	        return _.charAt(_.index);
	    },

	    left: {
	        get: function getLeft() {
	            var _ = this;

	            return _._index < _.length;
	        }
	    },

	    charAt: function charAt(i) {
	        var _ = this;

	        return _._buffer[i] || 'EOF';
	    },

	    codePointAt: function codePointAt(i) {
	        var _ = this;

	        return _._buffer.codePointAt(i);
	    },

	    slice: function slice(startIndex, endIndex) {
	        var _ = this;

	        return _._buffer.slice(startIndex, endIndex);
	    },

	    makeError: function makeError(start, end, message) {
	        var _ = this;

	        utils.assertTypeError(start, 'number');
	        utils.assertTypeError(end, 'number');
	        utils.assertTypeError(message, 'string');

	        _.index = start;

	        var currentLine = _.currentLine,
	            tokenLength = end - start,
	            tokenIdentifier =
	            currentLine[currentLine.length - 1] === '\n' ? '' :
	            '\n',
	            i;

	        for (i = 1; i < _.column; i++) {
	            tokenIdentifier += ' ';
	        }

	        tokenLength = Math.min(
	            tokenLength,
	            currentLine.length - tokenIdentifier.length
	        ) || 1;

	        for (i = 0; i < tokenLength; i++) {
	            tokenIdentifier += '^';
	        }

	        return 'Syntax Error: ' +
	            message +
	            ' at ' +
	            (_._file ? _._file + ':' : '') +
	            _.line +
	            ':' +
	            _.column +
	            '\n\n' +
	            currentLine +
	            tokenIdentifier +
	            '\n';
	    }
	});

	module.exports = CodeBuffer;


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

	var Token = __webpack_require__(18);
	var PACKAGE_JSON = __webpack_require__(26);

	var ProgramToken = Token.generate(
	    function ProgramToken(code) {
	        var _ = this;

	        if (code) {
	            Token.call(_, code);
	        }

	        _.version = PACKAGE_JSON.version;
	        _.mode = '';

	        _.fragment = null;
	    }
	);

	ProgramToken.definePrototype({
	    enumerable: true
	}, {
	    type: 'program'
	});

	ProgramToken.definePrototype({
	    writable: true
	}, {
	    indentLevel: '\n'
	});

	ProgramToken.definePrototype({
	    TYPE_ID: Token.tokens.push(ProgramToken) - 1,
	    toArray: function () {
	        var _ = this;
	        return [
	            _.TYPE_ID,
	            _.version,
	            _.mode,
	            _.fragment
	        ];
	    },

	    toObject: function () {
	        var _ = this;
	        return {
	            type: _.type,
	            TYPE_ID: _.TYPE_ID,
	            version: _.version,
	            mode: _.mode,
	            fragment: _.fragment
	        };
	    },

	    _fromArray: function _fromArray(arr) {
	        var _ = this;

	        _.version = arr[1];
	        _.mode = arr[2];

	        var fragment = new Token.tokens.fragment();

	        fragment.fromArray(arr[3]);

	        _.fragment = fragment;
	    },
	    toString: function toString() {
	        var _ = this;

	        _.fragment.indentLevel = _.indentLevel;

	        return _.fragment.toString()
	            .trim() + '\n';
	    }
	});

	Token.tokens.program = ProgramToken;


/***/ }),
/* 26 */
/***/ (function(module, exports) {

	module.exports = {
		"_from": "bars@^0.4.7",
		"_id": "bars@0.4.7",
		"_inBundle": false,
		"_integrity": "sha1-RVj4wc7VGE2deuVjePgNjeskB8M=",
		"_location": "/bars",
		"_phantomChildren": {},
		"_requested": {
			"type": "range",
			"registry": true,
			"raw": "bars@^0.4.7",
			"name": "bars",
			"escapedName": "bars",
			"rawSpec": "^0.4.7",
			"saveSpec": null,
			"fetchSpec": "^0.4.7"
		},
		"_requiredBy": [
			"#USER",
			"/"
		],
		"_resolved": "https://registry.npmjs.org/bars/-/bars-0.4.7.tgz",
		"_shasum": "4558f8c1ced5184d9d7ae56378f80d8deb2407c3",
		"_spec": "bars@^0.4.7",
		"_where": "/Users/dread/Apps/custom-element",
		"author": {
			"name": "Michaelangelo Jong"
		},
		"bugs": {
			"url": "https://github.com/Mike96Angelo/Bars/issues"
		},
		"bundleDependencies": false,
		"dependencies": {
			"compileit": "^1.0.1",
			"generate-js": "^3.1.2"
		},
		"deprecated": false,
		"description": "Bars is a light weight high performance templating system.Bars emits DOM rather than DOM-strings, this means the DOM state is preserved even if data updates happens.",
		"devDependencies": {
			"browserify": "^13.1.1",
			"colors": "^1.1.2",
			"gulp": "^3.9.1",
			"gulp-minify": "0.0.14",
			"stringify": "^5.1.0",
			"vinyl-buffer": "^1.0.0",
			"vinyl-source-stream": "^1.1.0"
		},
		"homepage": "https://github.com/Mike96Angelo/Bars#readme",
		"keywords": [
			"bars",
			"template",
			"templating",
			"html"
		],
		"license": "MIT",
		"main": "index.js",
		"name": "bars",
		"repository": {
			"type": "git",
			"url": "git+https://github.com/Mike96Angelo/Bars.git"
		},
		"scripts": {
			"test": "echo \"Error: no test specified\" && exit 1"
		},
		"version": "0.4.7"
	};

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

	var Token = __webpack_require__(18);

	var FragmentToken = Token.generate(
	    function FragmentToken(code) {
	        var _ = this;

	        if (code) {
	            Token.call(_, code);
	        }

	        _.nodes = [];

	        _.nodesUpdate = 0;
	    }
	);


	FragmentToken.definePrototype({
	    enumerable: true
	}, {
	    type: 'fragment'
	});

	FragmentToken.definePrototype({
	    TYPE_ID: Token.tokens.push(FragmentToken) - 1,
	    toArray: function () {
	        var _ = this;
	        return [
	            _.TYPE_ID,
	            _.nodes,
	            _.nodesUpdate
	        ];
	    },

	    toObject: function () {
	        var _ = this;
	        return {
	            type: _.type,
	            TYPE_ID: _.TYPE_ID,
	            nodes: _.nodes,
	            nodesUpdate: _.nodesUpdate
	        };
	    },

	    _fromArray: function _fromArray(arr) {
	        var _ = this;

	        _.nodes = arr[1].map(function (item) {
	            var node = new Token.tokens[item[0]]();

	            node.fromArray(item);

	            return node;
	        });

	        _.nodesUpdate = arr[2];
	    },

	    toString: function toString() {
	        var _ = this,
	            str = '';

	        for (var i = 0; i < _.nodes.length; i++) {
	            _.nodes[i].indentLevel = _.indentLevel;
	            str += _.nodes[i].toString();
	        }

	        return str;
	    },
	    updates: function updates() {
	        var _ = this;

	        _.nodesUpdate = 1;
	    }
	});

	Token.tokens.fragment = FragmentToken;


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

	var Token = __webpack_require__(18);

	var TextToken = Token.generate(
	    function TextToken(code) {
	        var _ = this;

	        if (code) {
	            Token.call(_, code);
	        }

	        _.value = '';
	    }
	);


	TextToken.definePrototype({
	    enumerable: true
	}, {
	    type: 'text'
	});

	TextToken.definePrototype({
	    TYPE_ID: Token.tokens.push(TextToken) - 1,
	    toArray: function () {
	        var _ = this;
	        return [
	            _.TYPE_ID,
	            _.value
	        ];
	    },

	    toObject: function () {
	        var _ = this;
	        return {
	            type: _.type,
	            TYPE_ID: _.TYPE_ID,
	            value: _.value
	        };
	    },

	    _fromArray: function _fromArray(arr) {
	        var _ = this;

	        _.value = arr[1];
	    },

	    toString: function toString() {
	        var _ = this,
	            str = '';

	        str += _.indentLevel + _.value;

	        return str;
	    }
	});

	Token.tokens.text = TextToken;


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

	var Token = __webpack_require__(18);

	var TagToken = Token.generate(
	    function TagToken(code) {
	        var _ = this;

	        if (code) {
	            Token.call(_, code);
	        }

	        _.name = '';

	        _.attrs = [];
	        _.nodes = [];

	        _.attrsUpdate = 0;
	        _.nodesUpdate = 0;
	    }
	);


	TagToken.definePrototype({
	    enumerable: true
	}, {
	    type: 'tag'
	});

	TagToken.definePrototype({
	    TYPE_ID: Token.tokens.push(TagToken) - 1,
	    toArray: function () {
	        var _ = this;
	        return [
	            _.TYPE_ID,
	            _.name,
	            _.attrs,
	            _.attrsUpdate,
	            _.nodes,
	            _.nodesUpdate
	        ];
	    },

	    toObject: function () {
	        var _ = this;
	        return {
	            type: _.type,
	            TYPE_ID: _.TYPE_ID,
	            name: _.name,
	            attrs: _.attrs,
	            attrsUpdate: _.attrsUpdate,
	            nodes: _.nodes,
	            nodesUpdate: _.nodesUpdate
	        };
	    },

	    _fromArray: function _fromArray(arr) {
	        var _ = this;

	        _.name = arr[1];

	        _.attrs = arr[2].map(function (item) {
	            var node = new Token.tokens[item[0]]();

	            node.fromArray(item);

	            return node;
	        });

	        _.attrsUpdate = arr[3];

	        _.nodes = arr[4].map(function (item) {
	            var node = new Token.tokens[item[0]]();

	            node.fromArray(item);

	            return node;
	        });

	        _.nodesUpdate = arr[5];
	    },

	    toString: function toString() {
	        var _ = this,
	            str = _.indentLevel + '<' + _.name;

	        for (var i = 0; i < _.attrs.length; i++) {
	            str += _.attrs[i].toString();
	        }

	        if (_.selfClosed) {
	            str += (_.attrs.length ? ' ' : '') + '/>'; 
	            return str;
	        }

	        str += '>'; 
	        if (_.selfClosing) {
	            return str;
	        }
	        var nodes = '';
	        for (i = 0; i < _.nodes.length; i++) {
	            _.nodes[i].indentLevel = (_.indentLevel ? _.indentLevel +
	                '  ' : '');
	            nodes += _.nodes[i].toString();
	        }

	        str += nodes.trim();

	        str += _.indentLevel + '</' + _.name + '>';

	        return str;
	    },

	    updates: function updates(type) {
	        var _ = this;

	        if (type === 'attr') {
	            _.attrsUpdate = 1;
	        } else {
	            _.nodesUpdate = 1;
	        }
	    }
	});

	Token.tokens.tag = TagToken;


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

	var Token = __webpack_require__(18);

	var AttrToken = Token.generate(
	    function AttrToken(code) {
	        var _ = this;

	        if (code) {
	            Token.call(_, code);
	        }

	        _.name = '';

	        _.nodes = [];

	        _.nodesUpdate = 0;
	    }
	);


	AttrToken.definePrototype({
	    enumerable: true
	}, {
	    type: 'attr'
	});

	AttrToken.definePrototype({
	    TYPE_ID: Token.tokens.push(AttrToken) - 1,
	    toArray: function () {
	        var _ = this;
	        return [
	            _.TYPE_ID,
	            _.name,
	            _.nodes,
	            _.nodesUpdate
	        ];
	    },

	    toObject: function () {
	        var _ = this;
	        return {
	            type: _.type,
	            TYPE_ID: _.TYPE_ID,
	            name: _.name,
	            nodes: _.nodes,
	            nodesUpdate: _.nodesUpdate
	        };
	    },

	    _fromArray: function _fromArray(arr) {
	        var _ = this;

	        _.name = arr[1];

	        _.nodes = arr[2].map(function (item) {
	            var node = new Token.tokens[item[0]]();

	            node.fromArray(item);

	            return node;
	        });

	        _.nodesUpdate = arr[3];
	    },

	    toString: function toString() {
	        var _ = this,
	            str = ' ';

	        str += _.name + (_.nodes.length ? '="' : '');

	        for (var i = 0; i < _.nodes.length; i++) {

	            _.nodes[i].indentLevel = '';

	            str += _.nodes[i].toString();
	        }

	        str += (_.nodes.length ? '"' : '');

	        return str;
	    },
	    updates: function updates() {
	        var _ = this;

	        _.nodesUpdate = 1;
	    }
	});

	Token.tokens.attr = AttrToken;


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

	var Token = __webpack_require__(18);

	var BlockToken = Token.generate(
	    function BlockToken(code) {
	        var _ = this;

	        if (code) {
	            Token.call(_, code);
	        }

	        _.name = '';

	        _.expression = null;
	        _.map = null;

	        _.consequent = null;
	        _.alternate = null;
	    }
	);


	BlockToken.definePrototype({
	    enumerable: true
	}, {
	    type: 'block'
	});

	BlockToken.definePrototype({
	    TYPE_ID: Token.tokens.push(BlockToken) - 1,
	    toArray: function () {
	        var _ = this;
	        return [
	            _.TYPE_ID,
	            _.name,
	            _.expression,
	            _.map,
	            _.consequent,
	            _.alternate
	        ];
	    },

	    toObject: function () {
	        var _ = this;
	        return {
	            type: _.type,
	            TYPE_ID: _.TYPE_ID,
	            name: _.name,
	            expression: _.expression,
	            map: _.map,
	            consequent: _.consequent,
	            alternate: _.alternate
	        };
	    },

	    _fromArray: function _fromArray(arr) {
	        var _ = this;

	        _.name = arr[1];

	        var expression = new Token.tokens[arr[2][0]]();

	        expression.fromArray(arr[2]);

	        _.expression = expression;

	        _.map = arr[3];

	        var consequent = new Token.tokens.fragment();

	        consequent.fromArray(arr[4]);

	        _.consequent = consequent;

	        if (arr[5]) {
	            var alternate = new Token.tokens[arr[5][0]]();

	            alternate.fromArray(arr[5]);

	            _.alternate = alternate;
	        }
	    },

	    toString: function toString() {
	        var _ = this,
	            str = '';

	        if (!_.fromElse) {
	            str += _.indentLevel + '{{#';
	        }

	        str += _.name + ' ';

	        str += _.expression.toString();
	        str += (_.map ? _.map.toString() : '');

	        str += '}}';

	        _.consequent.indentLevel = (_.indentLevel ? _.indentLevel +
	            '  ' : '');
	        str += _.consequent.toString();

	        if (_.alternate) {
	            _.alternate.indentLevel = _.indentLevel;
	            if (_.alternate.type === 'block') {
	                _.alternate.fromElse = true;
	                str += _.indentLevel + '{{else ' + _.alternate.toString();
	                return str;
	            }
	            _.alternate.indentLevel += (_.indentLevel ? _.indentLevel +
	                '  ' : '');

	            str += _.indentLevel + '{{else}}';
	            str += _.alternate.toString();
	        }

	        str += _.indentLevel + '{{/' + _.name + '}}';

	        return str;
	    },
	    updates: function updates() {
	        var _ = this;

	        if (_.elsed && _.alternate) {
	            _.alternate.nodesUpdate = 1;
	        } else if (_.consequent) {
	            _.consequent.nodesUpdate = 1;
	        }
	    }
	});

	Token.tokens.block = BlockToken;


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

	var Token = __webpack_require__(18);

	var InsertToken = Token.generate(
	    function InsertToken(code) {
	        var _ = this;

	        if (code) {
	            Token.call(_, code);
	        }

	        _.expression = null;
	    }
	);


	InsertToken.definePrototype({
	    enumerable: true
	}, {
	    type: 'insert'
	});

	InsertToken.definePrototype({
	    TYPE_ID: Token.tokens.push(InsertToken) - 1,
	    toArray: function () {
	        var _ = this;
	        return [
	            _.TYPE_ID,
	            _.expression
	        ];
	    },

	    toObject: function () {
	        var _ = this;
	        return {
	            type: _.type,
	            TYPE_ID: _.TYPE_ID,
	            expression: _.expression
	        };
	    },

	    _fromArray: function _fromArray(arr) {
	        var _ = this;

	        var expression = new Token.tokens[arr[1][0]]();

	        expression.fromArray(arr[1]);

	        _.expression = expression;
	    },

	    toString: function toString() {
	        var _ = this,
	            str = '{{ ';
	        str += _.expression.toString();
	        str += ' }}';
	        return str;
	    }
	});

	Token.tokens.insert = InsertToken;


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

	var Token = __webpack_require__(18);

	var PartialToken = Token.generate(
	    function PartialToken(code) {
	        var _ = this;

	        if (code) {
	            Token.call(_, code);
	        }

	        _.name = '';

	        _.expression = null;
	        _.map = null;
	    }
	);


	PartialToken.definePrototype({
	    enumerable: true
	}, {
	    type: 'partial'
	});

	PartialToken.definePrototype({
	    TYPE_ID: Token.tokens.push(PartialToken) - 1,
	    toArray: function () {
	        var _ = this;
	        return [
	            _.TYPE_ID,
	            _.name,
	            _.expression,
	            _.map
	        ];
	    },

	    toObject: function () {
	        var _ = this;
	        return {
	            type: _.type,
	            TYPE_ID: _.TYPE_ID,
	            name: _.name,
	            expression: _.expression,
	            map: _.map
	        };
	    },

	    _fromArray: function _fromArray(arr) {
	        var _ = this;

	        _.name = arr[1];

	        if (arr[2]) {
	            var expression = new Token.tokens[arr[2][0]]();

	            expression.fromArray(arr[2]);

	            _.expression = expression;
	        }

	        _.map = arr[3];
	    },
	    toString: function toString() {
	        var _ = this,
	            str = _.indentLevel + '{{>' + _.name;
	        str += (_.expression ? ' ' + _.expression.toString() : '');
	        str += '}}';
	        return str;
	    }
	});

	Token.tokens.partial = PartialToken;;


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

	var Token = __webpack_require__(18);

	var LiteralToken = Token.generate(
	    function LiteralToken(code) {
	        var _ = this;

	        if (code) {
	            Token.call(_, code);
	        }

	        _.value = '';
	    }
	);


	LiteralToken.definePrototype({
	    enumerable: true
	}, {
	    type: 'literal'
	});

	LiteralToken.definePrototype({
	    TYPE_ID: Token.tokens.push(LiteralToken) - 1,
	    toArray: function () {
	        var _ = this;
	        return [
	            _.TYPE_ID,
	            _.value
	        ];
	    },

	    toObject: function () {
	        var _ = this;
	        return {
	            type: _.type,
	            TYPE_ID: _.TYPE_ID,
	            value: _.value
	        };
	    },

	    _fromArray: function _fromArray(arr) {
	        var _ = this;

	        _.value = arr[1];
	    },
	    toString: function toString() {
	        var _ = this,
	            str = '';

	        str += _.value;

	        return str;
	    }
	});

	Token.tokens.literal = LiteralToken;


/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

	var Token = __webpack_require__(18);

	var ValueToken = Token.generate(
	    function ValueToken(code) {
	        var _ = this;

	        if (code) {
	            Token.call(_, code);
	        }

	        _.path = '';
	    }
	);


	ValueToken.definePrototype({
	    enumerable: true
	}, {
	    type: 'value'
	});

	ValueToken.definePrototype({
	    TYPE_ID: Token.tokens.push(ValueToken) - 1,
	    toArray: function () {
	        var _ = this;
	        return [
	            _.TYPE_ID,
	            _.path
	        ];
	    },

	    toObject: function () {
	        var _ = this;
	        return {
	            type: _.type,
	            TYPE_ID: _.TYPE_ID,
	            path: _.path
	        };
	    },

	    _fromArray: function _fromArray(arr) {
	        var _ = this;

	        _.path = arr[1];
	    },

	    toString: function toString() {
	        var _ = this,
	            str = '';

	        if (
	            _.path[0] === '~' ||
	            _.path[0] === '..' ||
	            _.path[0] === '.' ||
	            _.path[0] === '@'
	        ) {
	            str += _.path.join('/');
	        } else {
	            str += _.path.join('.');
	        }

	        return str;
	    }
	});

	Token.tokens.value = ValueToken;


/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

	var Token = __webpack_require__(18);

	var TransformToken = Token.generate(
	    function TransformToken(code) {
	        var _ = this;

	        if (code) {
	            Token.call(_, code);
	        }

	        _.name = '';

	        _.arguments = [];
	    }
	);


	TransformToken.definePrototype({
	    enumerable: true
	}, {
	    type: 'transform'
	});

	TransformToken.definePrototype({
	    TYPE_ID: Token.tokens.push(TransformToken) - 1,
	    toArray: function () {
	        var _ = this;
	        return [
	            _.TYPE_ID,
	            _.name,
	            _.arguments
	        ];
	    },

	    toObject: function () {
	        var _ = this;
	        return {
	            type: _.type,
	            TYPE_ID: _.TYPE_ID,
	            name: _.name,
	            arguments: _.arguments
	        };
	    },

	    _fromArray: function _fromArray(arr) {
	        var _ = this;

	        _.name = arr[1];

	        _.arguments = arr[2].map(function (item) {
	            var arg = new Token.tokens[item[0]]();

	            arg.fromArray(item);

	            return arg;
	        });
	    },

	    toString: function toString() {
	        var _ = this,
	            str = '@';

	        str += _.name + '(';

	        for (var i = 0; i < _.arguments.length; i++) {

	            str += _.arguments[i].toString() + (i + 1 < _.arguments
	                .length ?
	                ', ' : '');
	        }

	        str += ')';

	        return str;
	    }
	});

	Token.tokens.transform = TransformToken;


/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

	var Token = __webpack_require__(18);

	var OperatorToken = Token.generate(
	    function OperatorToken(code) {
	        var _ = this;

	        if (code) {
	            Token.call(_, code);
	        }

	        _.operator = '';

	        _.operands = [];
	    }
	);


	OperatorToken.definePrototype({
	    enumerable: true
	}, {
	    type: 'operator'
	});

	OperatorToken.definePrototype({
	    TYPE_ID: Token.tokens.push(OperatorToken) - 1,
	    toArray: function () {
	        var _ = this;
	        return [
	            _.TYPE_ID,
	            _.operator,
	            _.operands
	        ];
	    },

	    toObject: function () {
	        var _ = this;
	        return {
	            type: _.type,
	            TYPE_ID: _.TYPE_ID,
	            operator: _.operator,
	            operands: _.operands
	        };
	    },

	    _fromArray: function _fromArray(arr) {
	        var _ = this;

	        _.operator = arr[1];

	        _.operands = arr[2].map(function (item) {
	            var arg = new Token.tokens[item[0]]();

	            arg.fromArray(item);

	            return arg;
	        });
	    },

	    toString: function toString() {
	        var _ = this,
	            str = '';

	        if (_.operands.length === 1) {
	            str += _.operator + _.operands[0].toString();
	        } else if (_.operands.length === 2) {
	            str += _.operands[0].toString();
	            str += ' ' + _.operator + ' ';
	            str += _.operands[1].toString();
	        }

	        return str;
	    }
	});

	Token.tokens.operator = OperatorToken;
	Token;


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

	var Generator = __webpack_require__(4);

	var Blocks = Generator.generate(function Blocks() {});

	Blocks.definePrototype({
	    if: function ifBlock(con) {
	        return con;
	    },

	    with: function withBlock(data) {
	        var _ = this;

	        if (data && typeof data === 'object') {
	            if (!_.nodes[0]) {
	                var frag = _.createFragment();

	                var newPath = _.path.slice();

	                frag.context.path = newPath;
	            }
	            _.nodes[0].context.data = data;

	            return true;
	        }

	        return false;
	    },

	    each: function eachBlock(data) {
	        var _ = this,
	            i;

	        if (data && typeof data === 'object') {
	            var keys = Object.keys(data);

	            if (keys.length) {
	                // TODO: This should be smarter.

	                // remove extra nodes
	                for (i = _.nodes.length - 1; i >= keys.length; i--) {
	                    _.nodes[i].remove();
	                }

	                // add needed nodes
	                for (i = _.nodes.length; i < keys.length; i++) {
	                    _.createFragment(keys[i]);
	                }

	                // update node paths
	                for (i = 0; i < keys.length; i++) {
	                    var newPath = _.path.slice();

	                    newPath.push(keys[i]);

	                    _.nodes[i].context.path = newPath;
	                    _.nodes[i].context.data = data[keys[i]];
	                }

	                return true;
	            }
	        }

	        return false;
	    }
	});

	module.exports = Blocks;


/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

	var Generator = __webpack_require__(4);

	var Transform = Generator.generate(function Transform() {});

	Transform.definePrototype({
	    log: function log() {
	        var args = Array.prototype.slice.call(arguments);
	        args.unshift('Bars:');
	        console.log.apply(console, args);
	    },
	    upperCase: function upperCase(a) {
	        return String(a)
	            .toUpperCase();
	    },
	    lowerCase: function lowerCase(a) {
	        return String(a)
	            .toLowerCase();
	    },
	    number: function number(a) {
	        return Number(a);
	    },
	    string: function string(a) {
	        return String(a);
	    },
	    reverse: function reverse(arr) {
	        return arr.slice()
	            .reverse();
	    },
	    slice: function (arr, start, end) {
	        return arr.slice(start, end);
	    },
	    map: function map(arr, prop) {
	        return arr.map(function (item) {
	            return arr[prop];
	        });
	    },
	    sort: function sort(arr, key) {
	        return arr.slice()
	            .sort(function (a, b) {
	                if (key) {
	                    if (a[key] < b[key]) return -1;
	                    if (a[key] > b[key]) return 1;
	                    return 0;
	                }

	                if (a < b) return -1;
	                if (a > b) return 1;
	                return 0;
	            });
	    },
	    sum: function sum(arr, key) {
	        var sum = 0,
	            i;
	        if (key) {
	            for (i = 0; i < arr.length; i++) {
	                sum += arr[i][key];
	            }
	        } else {
	            for (i = 0; i < arr.length; i++) {
	                sum += arr[i];
	            }
	        }

	        return sum;
	    },
	    ave: function ave(arr, key) {
	        var sum = 0,
	            i;
	        if (key) {
	            for (i = 0; i < arr.length; i++) {
	                sum += arr[i][key];
	            }
	        } else {
	            for (i = 0; i < arr.length; i++) {
	                sum += arr[i];
	            }
	        }

	        return sum / arr.length;
	    }
	});

	module.exports = Transform;


/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(41);


/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

	var compileit = __webpack_require__(19);
	var parsers = __webpack_require__(42);

	var Token = __webpack_require__(17);

	/* Parse Modes */

	var parseModes = {
	    'TEXT': [
	        parsers.parseText,
	        parsers.parseBarsMarkup
	    ],
	    'BARS': [
	        parsers.parseBarsComment,
	        parsers.parseBarsBlock,
	        parsers.parseBarsPartial,
	        parsers.parseBarsInsert
	    ],
	    'DOM': [
	        parsers.parseText,
	        parsers.parseHTMLComment,
	        parsers.parseHTMLTag,
	        parsers.parseBarsMarkup
	    ],
	    'ATTR': [
	        parsers.parseHTMLTagEnd,
	        parsers.parseWhitspace,
	        parsers.parseHTMLAttr,
	        parsers.parseBarsMarkup
	    ],
	    'VALUE': [
	        parsers.parseHTMLAttrEnd,
	        parsers.parseText,
	        parsers.parseBarsMarkup
	    ],
	    'LOGIC': [
	        parsers.parseBarsMarkupEnd,
	        parsers.parseExpressionTransform,
	        parsers.parseExpressionValue,
	        parsers.parseExpressionLiteral,
	        parsers.parseExpressionOperator,
	        parsers.parseWhitspace
	    ],
	    'LOGIC-ARGS': [
	        parsers.parseExpressionTransformEnd,
	        parsers.parseExpressionTransform,
	        parsers.parseExpressionValue,
	        parsers.parseExpressionLiteral,
	        parsers.parseExpressionOperator,
	        parsers.parseWhitspace
	    ]
	};

	var compiler = new compileit.Compiler(parseModes, {
	    modeFormater: function (a) {
	        return a.green;
	    }, //
	    charFormater: function (a) {
	        return a.green.underline;
	    },
	    funcFormater: function (a) {
	        return a.red;
	    },
	    typeFormater: function (a) {
	        return a.red;
	    },
	    sourceFormater: function (a) {
	        return ('`' + a + '`')
	            .green.underline;
	    }
	});

	function compile(str, file, mode, flags) {
	    mode = mode || 'DOM';
	    flags = flags || {};

	    var program = new Token.tokens.program(),
	        frag = new Token.tokens.fragment();

	    frag.nodesUpdate = 1;

	    program.mode = mode;
	    program.fragment = frag;

	    frag.nodes = compiler.compile(str, file, mode, flags);

	    return program;
	}

	module.exports = compile;


/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

	// text
	exports.parseText = __webpack_require__(43);
	exports.parseWhitspace = __webpack_require__(47);

	// HTML markup
	exports.parseHTMLComment = __webpack_require__(48);
	exports.parseHTMLTag = __webpack_require__(49);
	exports.parseHTMLTagEnd = __webpack_require__(50);
	exports.parseHTMLAttr = __webpack_require__(51);
	exports.parseHTMLAttrEnd = __webpack_require__(52);

	// Bars markup
	exports.parseBarsMarkup = __webpack_require__(53);
	exports.parseBarsComment = __webpack_require__(54);
	exports.parseBarsInsert = __webpack_require__(55);
	exports.parseBarsPartial = __webpack_require__(56);
	exports.parseBarsBlock = __webpack_require__(57);
	exports.parseBarsMarkupEnd = __webpack_require__(58);

	// Expression
	exports.parseExpressionValue = __webpack_require__(59);
	exports.parseExpressionLiteral = __webpack_require__(60);
	exports.parseExpressionOperator = __webpack_require__(61);
	exports.parseExpressionTransform = __webpack_require__(62);
	exports.parseExpressionTransformEnd = __webpack_require__(63);


/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

	var TextToken = __webpack_require__(17)
	    .tokens.text,
	    utils = __webpack_require__(44);

	function parseText(mode, code, tokens, flags, scope,
	    parseMode) {
	    var index = code.index,
	        isEntity = false,
	        entityStr = '',
	        value = '',
	        textExitTag;

	    if (mode === 'DOM') {
	        for (; index < code.length; index++) {
	            ch = code.codePointAt(index);

	            if (
	                ch === 0x003c /* < */ ||
	                ch === 0x007b /* { */ &&
	                code.codePointAt(index + 1) === 0x007b /* { */
	            ) {
	                value += entityStr;
	                break;
	            }

	            if (ch === 0x0026 /* & */ ) {
	                isEntity = true;
	                entityStr = code.charAt(index);

	                continue;
	            } else if (isEntity && ch === 0x003b /* ; */ ) {
	                entityStr += code.charAt(index);

	                value += utils.getHTMLUnEscape(entityStr);

	                isEntity = false;
	                entityStr = '';

	                continue;
	            }

	            if (isEntity && utils.isHTMLEntity(ch)) {
	                entityStr += code.charAt(index);
	            } else {
	                value += entityStr;
	                isEntity = false;
	                entityStr = '';

	                value += code.charAt(index);
	            }
	        }
	    } else if (flags.whitepaceString) {
	        for (; index < code.length; index++) {
	            ch = code.codePointAt(index);

	            /* \n */
	            if (ch === 0x000a) {
	                code.index = index;
	                return null;
	            }

	            if ( /* " but not \" */
	                ch === 0x0022 &&
	                code.codePointAt(index - 1) !== 0x005c
	            ) {
	                break;
	            }

	            if ( /* {{ */
	                ch === 0x007b &&
	                code.codePointAt(index + 1) === 0x007b
	            ) {
	                break;
	            }
	        }
	    } else {
	        for (; index < code.length; index++) {
	            if (
	                code.codePointAt(index) === 0x007b /* { */ &&
	                code.codePointAt(index + 1) === 0x007b /* { */
	            ) {
	                break;
	            } else if (
	                flags.textExitTag === 'script' &&
	                /* </script> */
	                code.codePointAt(index) === 0x003c &&
	                code.codePointAt(index + 1) === 0x002f &&

	                code.codePointAt(index + 2) === 0x0073 &&
	                code.codePointAt(index + 3) === 0x0063 &&
	                code.codePointAt(index + 4) === 0x0072 &&
	                code.codePointAt(index + 5) === 0x0069 &&
	                code.codePointAt(index + 6) === 0x0070 &&
	                code.codePointAt(index + 7) === 0x0074 &&

	                code.codePointAt(index + 8) === 0x003e
	            ) {
	                textExitTag = 9;
	                break;
	            } else if (
	                flags.textExitTag === 'style' &&
	                /* </style> */
	                code.codePointAt(index) === 0x003c &&
	                code.codePointAt(index + 1) === 0x002f &&

	                code.codePointAt(index + 2) === 0x0073 &&
	                code.codePointAt(index + 3) === 0x0074 &&
	                code.codePointAt(index + 4) === 0x0079 &&
	                code.codePointAt(index + 5) === 0x006c &&
	                code.codePointAt(index + 6) === 0x0065 &&

	                code.codePointAt(index + 7) === 0x003e
	            ) {
	                textExitTag = 8;
	                break;
	            }
	        }
	    }

	    if (code.index < index) {
	        var text = new TextToken(code);

	        code.index = index;

	        text.close();

	        if (flags.minify) {
	            text.value = utils.minifyHTMLText(value || text.source(code));
	            if (/^\s*$/.test(text.value))
	                return true;
	        } else {
	            text.value = value || text.source(code);
	        }

	        if (flags.textExitTag && textExitTag) {
	            code.index += textExitTag;
	            scope.close();
	            parseMode.close();
	        }

	        return text;
	    }

	    return null;
	}

	module.exports = parseText;


/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

	var SELF_CLOSEING_TAGS = __webpack_require__(45);
	var ENTITIES = __webpack_require__(46);

	var Token = __webpack_require__(17),
	    OperatorToken = Token.tokens.operator;

	function pathSpliter(path) {
	    var splitPath;

	    if (path instanceof Array) {
	        splitPath = path;
	    } else if (typeof path === 'string') {
	        if (path.match(/[/]|[.][.]/)) {
	            splitPath = path.split('/');
	        } else {
	            splitPath = path.split('.');
	        }

	        if (!splitPath[0] && !splitPath[1]) {
	            splitPath = ['.'];
	        }

	        var barsProp = splitPath.pop()
	            .split('@');
	        if (barsProp[0]) {
	            splitPath.push(barsProp[0]);
	        }
	        if (barsProp[1]) {
	            splitPath.push('@' + barsProp[1]);
	        }
	    } else {
	        throw 'bad arrgument: expected String | Array<String>.';
	    }

	    return splitPath;
	}
	exports.pathSpliter = pathSpliter;

	function isSelfClosing(name) {
	    return SELF_CLOSEING_TAGS.indexOf(name) !== -1;
	}
	exports.isSelfClosing = isSelfClosing;

	function isHTMLIdentifierStart(ch) {
	    return (0x0041 <= ch && ch <= 0x005a) ||
	        (0x0061 <= ch && ch <= 0x007a);
	}
	exports.isHTMLIdentifierStart = isHTMLIdentifierStart;

	function isHTMLEntity(ch) {
	    /* ^[0-9A-Za-z]$ */
	    return (0x0030 <= ch && ch <= 0x0039) ||
	        (0x0041 <= ch && ch <= 0x005a) ||
	        (0x0061 <= ch && ch <= 0x007a);
	}
	exports.isHTMLEntity = isHTMLEntity;

	function isHTMLIdentifier(ch) {
	    /* ^[0-9A-Z_a-z-]$ */
	    return ch === 0x002d ||
	        (0x0030 <= ch && ch <= 0x0039) ||
	        (0x0041 <= ch && ch <= 0x005a) ||
	        ch === 0x005f ||
	        (0x0061 <= ch && ch <= 0x007a);
	}
	exports.isHTMLIdentifier = isHTMLIdentifier;


	function isWhitespace(ch) {
	    /* ^\s$ */
	    return (0x0009 <= ch && ch <= 0x000d) ||
	        ch === 0x0020 ||
	        ch === 0x00a0 || /* nbsp */
	        ch === 0x1680 ||
	        ch === 0x180e ||
	        (0x2000 <= ch && ch <= 0x200a) ||
	        (0x2028 <= ch && ch <= 0x2029) ||
	        ch === 0x202f ||
	        ch === 0x205f ||
	        ch === 0x3000 ||
	        ch === 0xfeff;
	}
	exports.isWhitespace = isWhitespace;

	function minifyHTMLText(text) {
	    return text.replace(/(\s*)/g, function ($1) {
	        return $1.split('')
	            .sort(function (a, b) {
	                a = a.codePointAt(0);
	                b = b.codePointAt(0);
	                if (a !== 0x00a0 && b === 0x00a0) return 1;
	                if (a === 0x00a0 && b !== 0x00a0) return -1;
	                return 0;
	            })
	            .join('')
	            .replace(/[^\u00a0]+/, ' ');
	    });
	}
	exports.minifyHTMLText = minifyHTMLText;

	function getHTMLUnEscape(str) {
	    var code;

	    code = ENTITIES[str.slice(1, -1)];

	    if (typeof code !== 'number' && str[1] === '#') {
	        code = parseInt(str.slice(2, -1), 0x000a);
	    }

	    if (typeof code === 'number' && !isNaN(code)) {
	        return String.fromCharCode(code);
	    }

	    return str;
	}

	exports.getHTMLUnEscape = getHTMLUnEscape;



	var OpPresidence = {
	    dm: ['/', '%', '*'],
	    as: ['+', '-'],
	    c: ['===', '==', '!==', '!=', '<=', '>='],
	    ao: ['||', '&&']
	};

	function makeExpressionTree(tokens, code) {
	    var i, temp = [],
	        token,
	        errL = null,
	        errR = null;

	    for (i = tokens.length - 1; i >= 0; i--) {
	        token = tokens[i];
	        if (!token.saturated &&
	            OperatorToken.isCreation(token) &&
	            token.operator === '!'
	        ) {
	            token.saturated = true;
	            token.operands.push(temp.shift());

	            if (!token.operands[token.operands.length - 1]) {
	                errR = token;
	            }
	        }
	        temp.unshift(token);
	    }

	    tokens = temp;
	    temp = [];

	    for (i = 0; i < tokens.length; i++) {
	        token = tokens[i];
	        if (!token.saturated &&
	            OperatorToken.isCreation(token) &&
	            OpPresidence.dm.indexOf(token.operator) !== -1
	        ) {
	            token.saturated = true;
	            token.operands.push(temp.pop());

	            if (!token.operands[token.operands.length - 1]) {
	                errL = token;
	            }

	            token.operands.push(tokens[++i]);

	            if (!token.operands[token.operands.length - 1]) {
	                errR = token;
	            }
	        }
	        temp.push(token);
	    }

	    tokens = temp;
	    temp = [];

	    for (i = 0; i < tokens.length; i++) {
	        token = tokens[i];
	        if (!token.saturated &&
	            OperatorToken.isCreation(token) &&
	            OpPresidence.as.indexOf(token.operator) !== -1
	        ) {
	            token.saturated = true;
	            token.operands.push(temp.pop());

	            if (!token.operands[token.operands.length - 1]) {
	                errL = token;
	            }

	            token.operands.push(tokens[++i]);

	            if (!token.operands[token.operands.length - 1]) {
	                errR = token;
	            }
	        }
	        temp.push(token);
	    }

	    tokens = temp;
	    temp = [];

	    for (i = 0; i < tokens.length; i++) {
	        token = tokens[i];
	        if (!token.saturated &&
	            OperatorToken.isCreation(token) &&
	            OpPresidence.c.indexOf(token.operator) !== -1
	        ) {
	            token.saturated = true;
	            token.operands.push(temp.pop());

	            if (!token.operands[token.operands.length - 1]) {
	                errL = token;
	            }

	            token.operands.push(tokens[++i]);

	            if (!token.operands[token.operands.length - 1]) {
	                errR = token;
	            }
	        }
	        temp.push(token);
	    }

	    tokens = temp;
	    temp = [];

	    for (i = 0; i < tokens.length; i++) {
	        token = tokens[i];
	        if (!token.saturated &&
	            OperatorToken.isCreation(token) &&
	            OpPresidence.ao.indexOf(token.operator) !== -1
	        ) {
	            token.saturated = true;
	            token.operands.push(temp.pop());

	            if (!token.operands[token.operands.length - 1]) {
	                errL = token;
	            }

	            token.operands.push(tokens[++i]);

	            if (!token.operands[token.operands.length - 1]) {
	                errR = token;
	            }
	        }
	        temp.push(token);
	    }

	    tokens = temp;

	    if (errL) {
	        throw code.makeError(
	            errL.range[0],
	            errL.range[1],
	            'Missing left-hand operand for: ' +
	            JSON.stringify(
	                errL.source()
	            )
	            .slice(1, -1)
	        );
	    }

	    if (errR) {
	        throw code.makeError(
	            errR.range[0],
	            errR.range[1],
	            'Missing right-hand operand for: ' +
	            JSON.stringify(
	                errR.source()
	            )
	            .slice(1, -1)
	        );
	    }

	    return tokens;
	}

	exports.makeExpressionTree = makeExpressionTree;


/***/ }),
/* 45 */
/***/ (function(module, exports) {

	module.exports = [
		"area",
		"base",
		"br",
		"col",
		"command",
		"embed",
		"hr",
		"img",
		"input",
		"keygen",
		"link",
		"meta",
		"param",
		"source",
		"track",
		"wbr"
	];

/***/ }),
/* 46 */
/***/ (function(module, exports) {

	module.exports = {
		"quot": 34,
		"amp": 38,
		"lt": 60,
		"gt": 62,
		"nbsp": 160,
		"iexcl": 161,
		"cent": 162,
		"pound": 163,
		"curren": 164,
		"yen": 165,
		"brvbar": 166,
		"sect": 167,
		"uml": 168,
		"copy": 169,
		"ordf": 170,
		"laquo": 171,
		"not": 172,
		"shy": 173,
		"reg": 174,
		"macr": 175,
		"deg": 176,
		"plusmn": 177,
		"sup2": 178,
		"sup3": 179,
		"acute": 180,
		"micro": 181,
		"para": 182,
		"middot": 183,
		"cedil": 184,
		"sup1": 185,
		"ordm": 186,
		"raquo": 187,
		"frac14": 188,
		"frac12": 189,
		"frac34": 190,
		"iquest": 191,
		"Agrave": 192,
		"Aacute": 193,
		"Acirc": 194,
		"Atilde": 195,
		"Auml": 196,
		"Aring": 197,
		"AElig": 198,
		"Ccedil": 199,
		"Egrave": 200,
		"Eacute": 201,
		"Ecirc": 202,
		"Euml": 203,
		"Igrave": 204,
		"Iacute": 205,
		"Icirc": 206,
		"Iuml": 207,
		"ETH": 208,
		"Ntilde": 209,
		"Ograve": 210,
		"Oacute": 211,
		"Ocirc": 212,
		"Otilde": 213,
		"Ouml": 214,
		"times": 215,
		"Oslash": 216,
		"Ugrave": 217,
		"Uacute": 218,
		"Ucirc": 219,
		"Uuml": 220,
		"Yacute": 221,
		"THORN": 222,
		"szlig": 223,
		"agrave": 224,
		"aacute": 225,
		"acirc": 226,
		"atilde": 227,
		"auml": 228,
		"aring": 229,
		"aelig": 230,
		"ccedil": 231,
		"egrave": 232,
		"eacute": 233,
		"ecirc": 234,
		"euml": 235,
		"igrave": 236,
		"iacute": 237,
		"icirc": 238,
		"iuml": 239,
		"eth": 240,
		"ntilde": 241,
		"ograve": 242,
		"oacute": 243,
		"ocirc": 244,
		"otilde": 245,
		"ouml": 246,
		"divide": 247,
		"oslash": 248,
		"ugrave": 249,
		"uacute": 250,
		"ucirc": 251,
		"uuml": 252,
		"yacute": 253,
		"thorn": 254,
		"euro": 8364
	};

/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

	// parseWhitspace

	var utils = __webpack_require__(44);

	function parseWhitspace(mode, code, tokens, flags, scope, parseMode) {
	    var index = code.index,
	        length = code.length,
	        whitespace = 0;

	    for (; index < length; index++) {
	        if (!utils.isWhitespace(code.codePointAt(index))) {
	            break;
	        }
	        if (
	            flags.whitepaceString &&
	            code.codePointAt(index) === 0x000a /* \n */
	        ) {
	            break;
	        }
	        whitespace++;
	    }

	    if (whitespace) {
	        code.index = index;
	        return true;
	    }

	    return null;
	}

	module.exports = parseWhitspace;


/***/ }),
/* 48 */
/***/ (function(module, exports) {

	//parseHTMLComment

	function parseHTMLComment(mode, code, tokens, flags, scope, parseMode) {
	    var index = code.index,
	        length = code.length;

	    if ( /* <!-- */
	        code.codePointAt(index) === 0x003c &&
	        code.codePointAt(++index) === 0x0021 &&
	        code.codePointAt(++index) === 0x002d &&
	        code.codePointAt(++index) === 0x002d
	    ) {
	        index++;

	        for (; index < length; index++) {
	            if ( /* --> */
	                code.codePointAt(index) === 0x002d &&
	                code.codePointAt(index + 1) === 0x002d &&
	                code.codePointAt(index + 2) === 0x003e
	            ) {
	                index += 3;
	                code.index = index;

	                return true;
	            }
	        }

	        throw code.makeError(
	            code.index, code.index + 4,
	            'Unclosed Comment: Expected "-->" to fallow "<!--".'
	        );
	    }

	    return null;
	}

	module.exports = parseHTMLComment;


/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

	var TagToken = __webpack_require__(17)
	    .tokens.tag,
	    utils = __webpack_require__(44);


	function parseHTMLTag(mode, code, tokens, flags, scope, parseMode) {
	    var index = code.index,
	        length = code.length,
	        tag,
	        isClosing;
	    if ( /* < */
	        code.codePointAt(index) === 0x003c
	    ) {
	        if ( /* / */
	            code.codePointAt(index + 1) === 0x002f
	        ) {
	            isClosing = true;
	            index++;
	        }

	        tag = new TagToken(code);

	        index++;

	        if (!utils.isHTMLIdentifierStart(code.codePointAt(index))) {
	            throw code.makeError(
	                index, index + 1,
	                'Unexpected Token: Expected <[A-Za-z]> but found ' +
	                JSON.stringify(code.charAt(index)) +
	                '.'
	            );
	        }

	        for (; index < length; index++) {
	            ch = code.codePointAt(index);

	            if (utils.isHTMLIdentifier(ch)) {
	                tag.name += code.charAt(index);
	            } else {
	                break;
	            }
	        }

	        code.index = index;

	        if (isClosing) {
	            if (ch !== 0x003e) { /* > */
	                throw code.makeError(
	                    index, index + 1,
	                    'Unexpected Token: Expected ' +
	                    JSON.stringify('>') +
	                    ' but found ' +
	                    JSON.stringify(code.charAt(index)) +
	                    '.'
	                );
	            }

	            index++;

	            code.index = index;
	            tag.close();

	            if (!TagToken.isCreation(scope.token)) {
	                throw code.makeError(
	                    tag.range[0], tag.range[1],
	                    'Unexpected Closing Tag: ' +
	                    JSON.stringify(tag.source(code)) +
	                    '.'
	                );
	            }

	            if (scope.token.name !== tag.name) {
	                throw code.makeError(
	                    tag.range[0], tag.range[1],
	                    'Mismatch Closing Tag: Expected ' +
	                    JSON.stringify('</' + scope.token.name + '>') +
	                    ' but found ' +
	                    JSON.stringify(tag.source(code)) +
	                    '.'
	                );
	            }

	            scope.close();
	            parseMode.close();

	            return true;
	        }

	        scope.push(tag);
	        parseMode('ATTR', tag.attrs, flags);

	        if (!tag.closed) {
	            throw code.makeError(
	                index, index + 1,
	                'Unclosed Tag: Expected ' +
	                JSON.stringify('>') +
	                ' but found ' +
	                JSON.stringify(code.charAt(code.index)) +
	                '.'
	            );
	        }

	        if (utils.isSelfClosing(tag.name)) {
	            tag.selfClosing = true;
	        }

	        if (tag.selfClosing || tag.selfClosed) {
	            return tag;
	        }

	        delete tag.closed;

	        if (tag.name === 'pre' || tag.name === 'style' || tag.name ===
	            'script') {
	            flags.minify = false;
	        }

	        scope.push(tag);

	        if (tag.name === 'style' || tag.name === 'script') {
	            flags.textExitTag = tag.name;
	            parseMode('TEXT', tag.nodes, flags);
	            delete flags.textExitTag;
	        } else {
	            parseMode(mode, tag.nodes, flags);
	        }

	        if (!tag.closed) {
	            throw code.makeError(
	                tag.range[0], tag.range[1],
	                'Unclosed Tag: Expected ' +
	                JSON.stringify('</' + tag.name + '>') +
	                ' to fallow ' +
	                JSON.stringify(tag.source(code)) +
	                '.'
	            );
	        }

	        if (scope.token && (tag.attrsUpdate || tag.nodesUpdate)) {
	            scope.token.updates();
	        }

	        return tag;
	    }

	    return null;
	}


	module.exports = parseHTMLTag;


/***/ }),
/* 50 */
/***/ (function(module, exports) {

	// parseHTMLTagEnd

	function parseHTMLTagEnd(mode, code, tokens, flags, scope, parseMode) {
	    var ch = code.codePointAt(code.index);
	    /* > */
	    if (ch === 0x003e) {
	        code.index++;
	        scope.close();

	        parseMode.close();
	        return true;
	    } else if ( /* /> */
	        ch === 0x002f &&
	        code.codePointAt(code.index + 1) === 0x003e
	    ) {
	        code.index += 2;
	        var tag = scope.close();
	        tag.selfClosed = true;

	        parseMode.close();
	        return true;
	    }

	    return null;
	}

	module.exports = parseHTMLTagEnd;


/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

	// parseHTMLAttr
	var Token = __webpack_require__(17),
	    AttrToken = Token.tokens.attr,
	    utils = __webpack_require__(44);

	function parseHTMLAttr(mode, code, tokens, flags, scope, parseMode) {
	    var index = code.index,
	        length = code.length,
	        attr;

	    if (!utils.isHTMLIdentifierStart(code.codePointAt(index))) {
	        return null;
	    }

	    attr = new AttrToken(code);

	    for (; index < length; index++) {

	        if (!utils.isHTMLIdentifier(code.codePointAt(index))) {
	            break;
	        }

	        attr.name += code.charAt(index);
	    }

	    if (attr.name) {
	        /* = */
	        if (code.codePointAt(index) === 0x003d) {
	            index++;
	            /* " */
	            if (code.codePointAt(index) === 0x0022) {
	                index++;
	                code.index = index;

	                scope.push(attr);
	                flags.whitepaceString = true;
	                parseMode('VALUE', attr.nodes, flags);
	                delete flags.whitepaceString;
	            } else {
	                throw code.makeError(
	                    index, index + 1,
	                    'Unexpected Token: Expected "\"" but found ' +
	                    JSON.stringify(code.charAt(index))
	                );
	            }
	        } else {
	            code.index = index;
	            attr.close();
	        }

	        if (!attr.closed) {
	            throw code.makeError(
	                attr.range[0] + attr.name.length + 1,
	                attr.range[0] + attr.name.length + 2,
	                'Unclosed String: Expected "\"" to fallow "\""'
	            );
	        }

	        if (scope.token && attr.nodesUpdate) {
	            scope.token.updates('attr');
	        }

	        return attr;
	    }

	    return null;
	}

	module.exports = parseHTMLAttr;


/***/ }),
/* 52 */
/***/ (function(module, exports) {

	//parseHTMLAttrEnd

	function parseHTMLAttrEnd(mode, code, tokens, flags, scope, parseMode) {
	    if (code.codePointAt(code.index) === 0x0022 /* " */ ) {
	        code.index++;

	        scope.close();
	        parseMode.close();

	        return true;
	    }

	    return null;
	}

	module.exports = parseHTMLAttrEnd;


/***/ }),
/* 53 */
/***/ (function(module, exports) {

	//parseBarsMarkup

	function parseBarsMarkup(mode, code, tokens, flags, scope, parseMode) {
	    var index = code.index,
	        length = code.length;

	    if ( /* {{ */
	        code.codePointAt(index) === 0x007b &&
	        code.codePointAt(++index) === 0x007b
	    ) {
	        flags.markup = {};
	        flags.markup.mode = mode;
	        parseMode('BARS', tokens, flags);

	        if (code.index > index) {
	            if (flags.markup && flags.markup.closeParseScope) {
	                parseMode.close();
	            }
	            delete flags.markup;
	            if (scope.token) {
	                scope.token.updates();
	            }
	            return true;
	        }

	        delete flags.markup;
	    }

	    return null;
	}

	module.exports = parseBarsMarkup;


/***/ }),
/* 54 */
/***/ (function(module, exports) {

	//parseBarsComment

	function parseBarsComment(mode, code, tokens, flags, scope, parseMode) {
	    var index = code.index + 2,
	        length = code.length;

	    if ( /* ! */
	        code.codePointAt(index) === 0x0021
	    ) {
	        if (
	            code.codePointAt(++index) === 0x002d &&
	            code.codePointAt(++index) === 0x002d
	        ) {
	            index++;

	            for (; index < length; index++) {
	                if ( /* --}} */
	                    code.codePointAt(index) === 0x002d &&
	                    code.codePointAt(index + 1) === 0x002d &&
	                    code.codePointAt(index + 2) === 0x007d &&
	                    code.codePointAt(index + 3) === 0x007d
	                ) {
	                    index += 4; /* for --}} */
	                    code.index = index;

	                    parseMode.close();

	                    if (flags.keepComments) {
	                        // make a CommentToken and return that.
	                    }

	                    return true;
	                }
	            }

	            throw code.makeError(
	                'Unclosed Comment: Expected "--}}" to fallow "{{!--".',
	                5
	            );
	        }

	        index++;

	        for (; index < length; index++) {

	            if ( /* }} */
	                code.codePointAt(index) === 0x007d &&
	                code.codePointAt(index + 1) === 0x007d
	            ) {
	                index += 2; /* for }} */
	                code.index = index;

	                parseMode.close();

	                if (flags.keepComments) {
	                    // make a CommentToken and return that.
	                }

	                return true;
	            }
	        }

	        throw code.makeError(
	            code.index, code.index + 3,
	            'Unclosed Comment: Expected "}}" to fallow "{{!".'
	        );
	    }

	    return null;
	}

	module.exports = parseBarsComment;


/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

	var InsertToken = __webpack_require__(17)
	    .tokens.insert,
	    utils = __webpack_require__(44);

	function parseBarsInsert(mode, code, tokens, flags, scope, parseMode) {
	    var index = code.index + 2,
	        length = code.length,
	        insert = new InsertToken(code),
	        args = [];

	    scope.push(insert);
	    code.index = index;

	    parseMode('LOGIC', args, flags);

	    args = utils.makeExpressionTree(args, code);

	    if (args.length > 1) {
	        code.index = args[1].range[0];
	        throw code.makeError(
	            args[1].range[0], args[1].range[1],
	            'Unexpected Token: ' +
	            JSON.stringify(args[1].source(code)) + '.'
	        );
	    }

	    insert.expression = args[0];

	    args = null;

	    if (!insert.closed) {
	        throw code.makeError(
	            code.index, code.index + 1,
	            'Unclosed Block: Expected ' +
	            JSON.stringify('}}') +
	            ' but found ' +
	            JSON.stringify(code.charAt(code.index)) +
	            '.'
	        );
	    }

	    if (!insert.expression) {
	        throw code.makeError(
	            code.index - 2, code.index - 1,
	            'Missing <expression>.'
	        );
	    }

	    parseMode.close();
	    return insert;
	}


	module.exports = parseBarsInsert;


/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

	var PartialToken = __webpack_require__(17)
	    .tokens.partial,
	    utils = __webpack_require__(44);

	function parseBarsPartial(mode, code, tokens, flags, scope, parseMode) {
	    var index = code.index + 2,
	        length = code.length,
	        partial;

	    if ( /* > */
	        code.codePointAt(index) === 0x003e
	    ) {
	        partial = new PartialToken(code);

	        index++;

	        if (!utils.isHTMLIdentifierStart(code.codePointAt(index))) {
	            throw code.makeError(
	                index, index + 1,
	                'Unexpected Token: Expected <[A-Za-z]> but found ' +
	                JSON.stringify(code.charAt(index)) +
	                '.'
	            );
	        }

	        for (; index < length; index++) {
	            ch = code.codePointAt(index);

	            if (utils.isHTMLIdentifier(ch)) {
	                partial.name += code.charAt(index);
	            } else {
	                break;
	            }
	        }

	        code.index = index;


	        var args = [];

	        scope.push(partial);
	        parseMode('LOGIC', args, flags);

	        args = utils.makeExpressionTree(args, code);

	        if (args.length > 1) {
	            throw code.makeError(
	                args[1].range[0], args[1].range[1],
	                'Unexpected Token: ' +
	                JSON.stringify(args[1].source(code)) + '.'
	            );
	        }

	        partial.expression = args[0] || null;

	        args = null;

	        if (!partial.closed) {
	            throw code.makeError(
	                index, index + 1,
	                'Unclosed Block: Expected ' +
	                JSON.stringify('}}') +
	                ' but found ' +
	                JSON.stringify(code.charAt(code.index)) +
	                '.'
	            );
	        }

	        // if (!partial.argument) {
	        //     code.index -= 2;
	        //     throw code.makeError('Missing <arg>.');
	        // }

	        parseMode.close();
	        return partial;
	    }

	    return null;
	}

	module.exports = parseBarsPartial;


/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

	var Token = __webpack_require__(17),
	    BlockToken = Token.tokens.block,
	    FragmentToken = Token.tokens.fragment,
	    utils = __webpack_require__(44);

	function parseBarsBlock(mode, code, tokens, flags, scope, parseMode) {
	    var index = code.index + 2,
	        length = code.length,
	        block,
	        isOpening,
	        isClosing,
	        isElse,
	        alternateIsBlock,
	        blockMode = flags.markup.mode;

	    if ( /* / */
	        code.codePointAt(index) === 0x002f
	    ) {
	        isClosing = true;
	        flags.markup.closeParseScope = true;
	    } else if ( /* # */
	        code.codePointAt(index) === 0x0023 ||
	        (scope.token && scope.token.alternateIsBlock)
	    ) {
	        isOpening = true;
	    } else if ( /* else */
	        code.codePointAt(index) === 0x0065 &&
	        code.codePointAt(++index) === 0x006c &&
	        code.codePointAt(++index) === 0x0073 &&
	        code.codePointAt(++index) === 0x0065
	    ) {
	        isElse = true;
	        if (utils.isWhitespace(code.codePointAt(index + 1))) {
	            index += 2;

	            alternateIsBlock = true;
	        } else if (
	            code.codePointAt(++index) === 0x007d &&
	            code.codePointAt(++index) === 0x007d
	        ) {
	            index++;
	        }

	        block = new BlockToken(code);
	        code.index = index;
	        block.close();

	        if (!BlockToken.isCreation(scope.token) || scope.token.elsed) {
	            throw code.makeError(
	                block.range[0], block.range[1],
	                'Unexpected Token: ' +
	                JSON.stringify(block.source(code)) +
	                '.'
	            );
	        }

	        scope.token.elsed = true;

	        scope.token.alternateIsBlock = alternateIsBlock;
	        flags.markup.closeParseScope = true;

	        scope.close();
	        parseMode.close();

	        return true;
	    } else {
	        return null;
	    }

	    if (scope.token && scope.token.alternateIsBlock) {
	        index -= 2;
	    } else
	        index++;
	    block = new BlockToken(code);

	    if (!utils.isHTMLIdentifierStart(code.codePointAt(index))) {
	        throw code.makeError(
	            index, index + 1,
	            'Unexpected Token: Expected <[A-Za-z]> but found ' +
	            JSON.stringify(code.charAt(index)) +
	            '.'
	        );
	    }

	    for (; index < length; index++) {
	        ch = code.codePointAt(index);

	        if (utils.isHTMLIdentifier(ch)) {
	            block.name += code.charAt(index);
	        } else {
	            break;
	        }
	    }

	    if (isClosing) {
	        if (
	            code.codePointAt(index) === 0x007d &&
	            code.codePointAt(++index) === 0x007d
	        ) {
	            index++;
	        } else {
	            throw code.makeError(
	                index, index + 1,
	                'Unexpected Token: Expected ' +
	                JSON.stringify('}}') +
	                ' but found ' +
	                JSON.stringify(code.charAt(index)) +
	                '.'
	            );
	        }

	        code.index = index;
	        block.close();

	        if (!BlockToken.isCreation(scope.token)) {
	            throw code.makeError(
	                block.range[0], block.range[1],
	                'Unexpected Closing Block: ' +
	                JSON.stringify(block.source(code)) +
	                '.'
	            );
	        }

	        if (scope.token.name !== block.name) {
	            throw code.makeError(
	                block.range[0], block.range[1],
	                'Mismatch Closing Block: Expected ' +
	                JSON.stringify('{{/' + scope.token.name + '}}') +
	                ' but found ' +
	                JSON.stringify(block.source(code)) +
	                '.'
	            );
	        }

	        scope.close();

	        parseMode.close();

	        return true;
	    }

	    if (utils.isWhitespace(code.codePointAt(index)))
	        index++;

	    code.index = index;

	    var args = [];

	    scope.push(block);

	    parseMode('LOGIC', args, flags);

	    args = utils.makeExpressionTree(args, code);

	    block.expression = args[0];

	    if (args.length > 1) {
	        throw code.makeError(
	            args[1].range[0], args[1].range[1],
	            'Unexpected Token: ' +
	            JSON.stringify(args[1].source(code)) + '.'
	        );
	    }

	    args = null;

	    if (!block.closed) {
	        throw code.makeError(
	            code.index, code.index + 1,
	            'Unclosed Block: Expected ' +
	            JSON.stringify('}}') +
	            ' but found ' +
	            JSON.stringify(code.charAt(code.index)) +
	            '.'
	        );
	    }

	    if (!block.expression) {
	        throw code.makeError(
	            code.index - 2, code.index - 1,
	            'Missing <expression>.'
	        );
	    }

	    block.consequent = new FragmentToken(code);

	    delete block.closed;
	    scope.push(block);

	    parseMode(blockMode, block.consequent.nodes, flags);

	    index = code.index;

	    block.consequent.close();

	    code.index = index;

	    if (block.elsed) {
	        if (block.alternateIsBlock) {
	            delete block.closed;
	            scope.push(block);

	            flags.markup = {
	                mode: blockMode
	            };
	            block.alternate = parseBarsBlock(mode, code, [], flags, scope,
	                parseMode);

	            delete flags.markup;

	            scope.close();

	            return block;
	        }

	        block.alternate = new FragmentToken(code);

	        delete block.closed;
	        scope.push(block);

	        parseMode(blockMode, block.alternate.nodes, flags);

	        index = code.index;

	        block.alternate.close();
	    }

	    if (!block.closed) {
	        throw code.makeError(
	            block.range[0], block.range[0] + block.name.length + 6 +
	            block.expression.length,
	            'Unclosed Block: Expected ' +
	            JSON.stringify('{{/' + block.name + '}}') +
	            ' to fallow ' +
	            JSON.stringify('{{#' + block.name + ' <expression>}}') +
	            '.'
	        );
	    }

	    parseMode.close();

	    return block;
	}

	module.exports = parseBarsBlock;


/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

	// parseBarsMarkupEnd
	var Token = __webpack_require__(17);

	function parseBarsMarkupEnd(mode, code, tokens, flags, scope, parseMode) {
	    if ( /* }} */
	        code.codePointAt(code.index) === 0x007d &&
	        code.codePointAt(code.index + 1) === 0x007d
	    ) {
	        // console.log(JSON.stringify(scope.token.toObject(), null, 2))
	        if (
	            Token.tokens.insert.isCreation(scope.token) ||
	            Token.tokens.block.isCreation(scope.token) ||
	            Token.tokens.partial.isCreation(scope.token)
	        ) {
	            code.index += 2;
	            scope.close();
	            parseMode.close();
	            return true;
	        }
	    }

	    return null;
	}

	module.exports = parseBarsMarkupEnd;


/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

	var Token = __webpack_require__(17),
	    ValueToken = Token.tokens.value,
	    OperatorToken = Token.tokens.operator,
	    utils = __webpack_require__(44);

	function parseExpressionValue(mode, code, tokens, flags, scope, parseMode) {
	    var index = code.index,
	        length = code.length,
	        ch = code.codePointAt(index),
	        nextCh,
	        value,
	        style,
	        /* ~ */
	        name = ch === 0x007e,
	        /* @ */
	        at = ch === 0x0040,
	        dot,
	        devider,
	        dotdot;


	    if (!utils.isHTMLIdentifierStart(ch) &&
	        !name &&
	        !at &&
	        ch !== 0x002e /* . */
	    ) {
	        return null;
	    }

	    value = new ValueToken(code);
	    var path = [],
	        nameVal = '';

	    if (name || at) { /* @ */
	        path.push(code.charAt(index));
	        index++;
	    }

	    for (; index < length; index++) {
	        ch = code.codePointAt(index);
	        nextCh = code.codePointAt(index + 1);

	        if (utils.isHTMLIdentifier(ch)) {
	            if (!devider && (dot || dotdot)) {
	                throw code.makeError(
	                    index, index + 1,
	                    'Unexpected Token: ' +
	                    JSON.stringify(code.charAt(index)) +
	                    '.'
	                );
	            }

	            if (devider && !utils.isHTMLIdentifierStart(ch)) {
	                throw code.makeError(
	                    index, index + 1,
	                    'Unexpected Token: Expected <[A-Za-z]> but found ' +
	                    JSON.stringify(code.charAt(index)) +
	                    '.'
	                );
	            }

	            nameVal += code.charAt(index);

	            name = true;
	            devider = false;
	        } else if (!(name && at) && (name || dotdot || dot) && ch === 0x002f) { /* / */
	            if (style === 0 || devider) {
	                throw code.makeError(
	                    index, index + 1,
	                    'Unexpected Token: ' +
	                    JSON.stringify(code.charAt(index)) +
	                    '.'
	                );
	            }

	            if (nameVal) {
	                path.push(nameVal);
	                nameVal = '';
	            }

	            style = 1;
	            dotdot = false;
	            devider = true;
	        } else if (!name && ch === 0x002e && nextCh === 0x002e) { /* .. */
	            if (dot || style === 0) {
	                throw code.makeError(
	                    index, index + 1,
	                    'Unexpected Token: ' +
	                    JSON.stringify(code.charAt(index)) +
	                    '.'
	                );
	            }
	            index++;
	            path.push('..');
	            style = 1;
	            dotdot = true;
	            devider = false;
	        } else if (!at && ch === 0x002e) { /* . */
	            if (style === 1 || devider) {
	                throw code.makeError(
	                    index, index + 1,
	                    'Unexpected Token: ' +
	                    JSON.stringify(code.charAt(index)) +
	                    '.'
	                );
	            }

	            if (name) {
	                style = 0;
	                devider = true;

	                if (nameVal) {
	                    path.push(nameVal);
	                    nameVal = '';
	                }
	            }
	            dot = true;
	        } else {
	            break;
	        }
	    }

	    if (nameVal) {
	        path.push(nameVal);
	        nameVal = '';
	    }

	    if (index > code.index) {
	        code.index = index;
	        value.close();
	        value.path = path;

	        var preToken = tokens[tokens.length - 1];
	        if (preToken && !OperatorToken.isCreation(preToken)) {
	            throw code.makeError(
	                number.range[0],
	                number.range[1],
	                'Unexpected token: ' +
	                JSON.stringify(
	                    number.source()
	                )
	                .slice(1, -1)
	            );
	        }

	        return value;
	    }

	    return null;
	}

	module.exports = parseExpressionValue;


/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

	var Token = __webpack_require__(17),
	    LiteralToken = Token.tokens.literal,
	    OperatorToken = Token.tokens.operator;

	function STRING(mode, code, tokens, flags, scope, parseMode) {
	    var ch,
	        index = code.index,
	        length = code.length,
	        text;

	    /* ' */
	    if (code.codePointAt(index) !== 0x0027) {
	        return null;
	    }

	    index++;

	    text = new LiteralToken(code);
	    text.value = '';

	    for (; index < length; index++) {
	        ch = code.codePointAt(index);

	        if (ch === 0x000a) {
	            code.index = index;
	            return null;
	        }

	        if ( /* ' but not \' */
	            ch === 0x0027 &&
	            code.codePointAt(index - 1) !== 0x005c
	        ) {
	            index++;
	            break;
	        }

	        text.value += code.charAt(index);
	    }

	    if (index > code.index) {
	        code.index = index;
	        text.close();

	        var preToken = tokens[tokens.length - 1];
	        if (preToken && !OperatorToken.isCreation(preToken)) {
	            throw code.makeError(
	                number.range[0],
	                number.range[1],
	                'Unexpected token: ' +
	                JSON.stringify(
	                    number.source()
	                )
	                .slice(1, -1)
	            );
	        }

	        return text;
	    }

	    return null;
	}

	function NUMBER(mode, code, tokens, flags, scope, parseMode) {
	    var index = code.index,
	        length = code.length,
	        ch = code.codePointAt(index),
	        nextCh = code.codePointAt(index + 1),
	        dot,
	        Ee;

	    if (
	        (ch === 0x002d && 0x0030 <= nextCh && nextCh <= 0x0039) || /* -[0-9] */
	        (0x0030 <= ch && ch <= 0x0039) /* [0-9] */
	    ) {
	        index++;

	        number = new LiteralToken(code);

	        for (; index < length; index++) {
	            ch = code.codePointAt(index);

	            if (0x0030 <= ch && ch <= 0x0039) {
	                continue;
	            } else if (ch === 0x0045 || ch === 0x0065) { /* [Ee] */
	                index++;

	                ch = code.codePointAt(index);
	                nextCh = code.codePointAt(index + 1);

	                if ( /* [+-]?[0-9] */
	                    Ee ||
	                    !(
	                        (
	                            (ch === 0x002b || ch === 0x002d) &&
	                            (0x0030 <= nextCh && nextCh <= 0x0039)
	                        ) ||
	                        (0x0030 <= ch && ch <= 0x0039)
	                    )
	                ) {
	                    code.index = index - 1;
	                    throw code.makeError(
	                        'Unexpected Token: ' +
	                        JSON.stringify(code.charAt(index - 1)) +
	                        '.'
	                    );
	                }

	                Ee = true;
	            } else if (ch === 0x002e) { /* . */
	                index++;
	                ch = code.codePointAt(index);
	                if ( /* [+-]?[0-9] */
	                    Ee ||
	                    dot ||
	                    !(0x0030 <= ch && ch <= 0x0039)
	                ) {
	                    code.index = index - 1;
	                    throw code.makeError(
	                        'Unexpected Token: ".".'
	                    );
	                }

	                dot = true;
	            } else {
	                break;
	            }
	        }
	        code.index = index;
	        number.close();
	        number.value = Number(number.source(code));

	        var preToken = tokens[tokens.length - 1];
	        if (preToken && !OperatorToken.isCreation(preToken)) {
	            throw code.makeError(
	                number.range[0],
	                number.range[1],
	                'Unexpected token: ' +
	                JSON.stringify(
	                    number.source()
	                )
	                .slice(1, -1)
	            );
	        }

	        return number;
	    }

	    return null;
	}

	function BOOLEAN(mode, code, tokens, flags, scope, parseMode) {
	    var index = code.index,
	        bool;

	    if ( /* true */
	        code.codePointAt(index) === 0x0074 &&
	        code.codePointAt(++index) === 0x0072 &&
	        code.codePointAt(++index) === 0x0075 &&
	        code.codePointAt(++index) === 0x0065
	    ) {
	        bool = true;
	    } else if ( /* false */
	        code.codePointAt(index) === 0x0066 &&
	        code.codePointAt(++index) === 0x0061 &&
	        code.codePointAt(++index) === 0x006c &&
	        code.codePointAt(++index) === 0x0073 &&
	        code.codePointAt(++index) === 0x0065
	    ) {
	        bool = false;
	    } else {
	        return null;
	    }

	    var boolean = new LiteralToken(code);

	    index++;
	    code.index = index;
	    boolean.close();

	    boolean.value = bool;

	    var preToken = tokens[tokens.length - 1];
	    if (preToken && !OperatorToken.isCreation(preToken)) {
	        throw code.makeError(
	            number.range[0],
	            number.range[1],
	            'Unexpected token: ' +
	            JSON.stringify(
	                number.source()
	            )
	            .slice(1, -1)
	        );
	    }

	    return bool;
	}

	function NULL(mode, code, tokens, flags, scope, parseMode) {
	    var index = code.index,
	        nul;

	    if ( /* true */
	        code.codePointAt(index) === 0x006e &&
	        code.codePointAt(++index) === 0x0075 &&
	        code.codePointAt(++index) === 0x006c &&
	        code.codePointAt(++index) === 0x006c
	    ) {
	        index++;

	        nul = new LiteralToken(code);
	        code.index = index;
	        nul.close();
	        nul.value = null;
	    } else {
	        return null;
	    }

	    var preToken = tokens[tokens.length - 1];
	    if (preToken && !OperatorToken.isCreation(preToken)) {
	        throw code.makeError(
	            number.range[0],
	            number.range[1],
	            'Unexpected token: ' +
	            JSON.stringify(
	                number.source()
	            )
	            .slice(1, -1)
	        );
	    }

	    return nul;
	}


	function parseExpressionLiteral(mode, code, tokens, flags, scope, parseMode) {
	    return (
	        STRING(mode, code, tokens, flags, scope, parseMode) ||
	        NUMBER(mode, code, tokens, flags, scope, parseMode) ||
	        BOOLEAN(mode, code, tokens, flags, scope, parseMode) ||
	        NULL(mode, code, tokens, flags, scope, parseMode)
	    );
	}

	module.exports = parseExpressionLiteral;


/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

	var compileit = __webpack_require__(19),
	    Token = __webpack_require__(17),
	    OperatorToken = Token.tokens.operator,
	    utils = __webpack_require__(44);

	var ExpressionToken = compileit.Token.generate(
	    function ExpressionToken(code) {
	        var _ = this;

	        compileit.Token.call(_, code, 'expression');
	    }
	);

	function opS(ch) {
	    return ch === 0x0021 ||
	        (0x0025 <= ch && ch <= 0x0026) ||
	        (0x002a <= ch && ch <= 0x002b) ||
	        ch === 0x002d ||
	        ch === 0x002f ||
	        (0x003c <= ch && ch <= 0x003e) ||
	        ch === 0x007c;
	}

	function opEQ(ch) {
	    return ch === 0x0021 ||
	        (0x003c <= ch && ch <= 0x003e);
	}

	function opEQEQ(ch) {
	    return ch === 0x0021 ||
	        ch === 0x003d;
	}

	function isEQ(ch) {
	    return ch === 0x003d;
	}

	function isOR(ch) {
	    return ch === 0x007c;
	}

	function isAND(ch) {
	    return ch === 0x0026;
	}

	function parseParentheses(mode, code, tokens, flags, scope, parseMode) {
	    var index = code.index,
	        length = code.length,
	        expression,
	        args;

	    if (code.codePointAt(index) === 0x0028) { // ^[(]$
	        expression = new ExpressionToken(code);
	        code.index++;
	        expression.parentheses = true;
	        args = [];
	        scope.push(expression);
	        parseMode('LOGIC', args, flags);
	        // do more here

	        args = utils.makeExpressionTree(args, code);

	        if (args.length > 1) throw 'OPERATOR OPERAND MISMATCH';

	        return args[0];
	    } else if (code.codePointAt(index) === 0x0029) { // ^[)]$
	        if (scope.token && scope.token.parentheses) {
	            code.index++;
	            scope.close();
	            parseMode.close();
	            return true;
	        } else {
	            throw code.makeError(
	                index,
	                index + 1,
	                'Unexpected token: )'
	            );
	        }
	    }

	    return null;
	}

	function parseOperator(mode, code, tokens, flags, scope, parseMode) {
	    var index = code.index,
	        length = code.length,
	        ch = code.codePointAt(index);

	    if (!opS(ch)) {
	        return null;
	    }

	    var operator = new OperatorToken(code);

	    if (opEQ(ch) && isEQ(code.codePointAt(index + 1))) {
	        index++;
	    } else if (isEQ(ch)) {
	        throw code.makeError(
	            operator.range[0],
	            operator.range[1],
	            'Unexpected token: ' +
	            JSON.stringify(
	                operator.source()
	            )
	            .slice(1, -1)
	        );
	    }

	    if (
	        (isOR(ch) && isOR(code.codePointAt(index + 1))) ||
	        (isAND(ch) && isAND(code.codePointAt(index + 1)))
	    ) {
	        index++;
	    } else if (isOR(ch) || isAND(ch)) {
	        throw code.makeError(
	            operator.range[0],
	            operator.range[1],
	            'Unexpected token: ' +
	            JSON.stringify(
	                operator.source()
	            )
	            .slice(1, -1)
	        );
	    }

	    if (opEQEQ(ch) && isEQ(code.codePointAt(index + 1))) {
	        index++;
	    }
	    index++;

	    code.index = index;

	    operator.close();
	    operator.operator = operator.source();
	    var preToken = tokens[tokens.length - 1];
	    var pre2Token = tokens[tokens.length - 2];
	    if (
	        (
	            operator.operator !== '!' &&
	            (!preToken ||
	                (!preToken.saturated &&
	                    OperatorToken.isCreation(preToken)
	                )
	            )
	        ) ||
	        (
	            OperatorToken.isCreation(preToken) &&
	            preToken.operator === '!' &&
	            OperatorToken.isCreation(pre2Token) &&
	            pre2Token.operator === '!'
	        )
	    ) {
	        throw code.makeError(
	            operator.range[0],
	            operator.range[1],
	            'Unexpected token: ' +
	            JSON.stringify(
	                operator.source()
	            )
	            .slice(1, -1)
	        );
	    }

	    return operator;
	}

	function parseExpressionOperator(mode, code, tokens, flags, scope, parseMode) {
	    return (
	        parseOperator(mode, code, tokens, flags, scope, parseMode) ||
	        parseParentheses(mode, code, tokens, flags, scope, parseMode)
	    );
	}

	module.exports = parseExpressionOperator;


/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

	var Token = __webpack_require__(17),
	    TransformToken = Token.tokens.transform,
	    OperatorToken = Token.tokens.operator,
	    utils = __webpack_require__(44);

	function parseExpressionTransform(mode, code, tokens, flags, scope, parseMode) {
	    var index = code.index,
	        length = code.length,
	        transform,
	        ch = code.codePointAt(index);

	    if (ch !== 0x0040) { /* @ */
	        return null;
	    }

	    index++;

	    if (!utils.isHTMLIdentifierStart(code.codePointAt(index))) {
	        return null;
	    }

	    transform = new TransformToken(code);

	    for (; index < length; index++) {
	        ch = code.codePointAt(index);

	        if (utils.isHTMLIdentifier(ch)) {
	            transform.name += code.charAt(index);
	        } else {
	            break;
	        }
	    }

	    ch = code.codePointAt(index);
	    if (ch === 0x0028) { /* ( */
	        index++;
	        code.index = index;

	        scope.push(transform);

	        while (code.left) {
	            var args = [];


	            parseMode('LOGIC-ARGS', args, flags);

	            args = utils.makeExpressionTree(args, code);

	            if (args.length > 1) {
	                code.index = args[1].range[0];
	                throw code.makeError(
	                    args[1].range[0], args[1].range[1],
	                    'Unexpected Token: ' +
	                    JSON.stringify(args[1].source(code)) + '.'
	                );
	            }

	            transform.arguments.push(args[0]);

	            if (transform.nextArg) {
	                delete transform.nextArg;
	                delete transform.closed;
	            }

	            if (transform.closed) {
	                break;
	            }
	        }
	    } else {
	        return null;
	    }

	    var preToken = tokens[tokens.length - 1];
	    if (preToken && !OperatorToken.isCreation(preToken)) {
	        throw code.makeError(
	            number.range[0],
	            number.range[1],
	            'Unexpected token: ' +
	            JSON.stringify(
	                number.source()
	            )
	            .slice(1, -1)
	        );
	    }

	    return transform;
	}

	module.exports = parseExpressionTransform;


/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

	// parseExpressionTransformEnd
	var Token = __webpack_require__(17);

	function parseExpressionTransformEnd(mode, code, tokens, flags, scope,
	    parseMode) {
	    if ( /* ) */
	        code.codePointAt(code.index) === 0x0029 &&
	        Token.tokens.transform.isCreation(scope.token)
	    ) {
	        code.index++;
	        scope.close();
	        parseMode.close();
	        return true;
	    }

	    if ( /* , */
	        code.codePointAt(code.index) === 0x002c &&
	        Token.tokens.transform.isCreation(scope.token)
	    ) {
	        code.index++;
	        scope.token.nextArg = true;
	        parseMode.close();
	        return true;
	    }

	    return null;
	}

	module.exports = parseExpressionTransformEnd;


/***/ }),
/* 64 */
/***/ (function(module, exports) {

	module.exports = function registerBarsWrapper(bars) {
	    return function registerBars(config) {
	        var _ = this,
	            key;

	        if (typeof config.transforms === 'object') {
	            for (key in config.transforms) {
	                if (config.transforms.hasOwnProperty(key)) {
	                    bars.registerTransform(key, config.transforms[key]);
	                }
	            }
	        }

	        if (typeof config.blocks === 'object') {
	            for (key in config.blocks) {
	                if (config.blocks.hasOwnProperty(key)) {
	                    bars.registerBlock(key, config.blocks[key]);
	                }
	            }
	        }

	        if (typeof config.partials === 'object') {
	            for (key in config.partials) {
	                if (config.partials.hasOwnProperty(key)) {
	                    bars.registerPartial(key, config.partials[key]);
	                }
	            }
	        }

	        _.definePrototype({
	            writable: true
	        }, {
	            template: config.template,
	            bars: bars
	        });
	    };
	};


/***/ }),
/* 65 */
/***/ (function(module, exports) {

	module.exports = function attach(config) {
	    var _ = this,
	        klass = config.class,
	        proto = config.proto,
	        key;

	    delete config.proto;
	    delete config.class;

	    _.registerConfig(config);

	    for (key in klass) {
	        _[key] = klass[key];
	    }

	    _.definePrototype({
	        writable: true,
	        configurable: true
	    }, proto);

	    config.class = klass;
	    config.proto = proto;
	};


/***/ })
/******/ ]);