/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./presets/core.ts-exposed");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/ts-loader/index.js!./presets/core.ts":
/*!**************************************************!*\
  !*** ./node_modules/ts-loader!./presets/core.ts ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(/*! @sfx/core */ "./packages/@sfx/core/src/index.ts"));


/***/ }),

/***/ "./node_modules/webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ "./packages/@sfx/core/src/core.ts":
/*!****************************************!*\
  !*** ./packages/@sfx/core/src/core.ts ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(/*! ./utils/core */ "./packages/@sfx/core/src/utils/core.ts");
/**
 * The core of the SF-X plugin system. This entity is responsible for
 * managing plugins and provides a mechanism for plugins to communicate
 * with each other.
 */
var Core = /** @class */ (function () {
    function Core() {
        /**
         * The plugin registry. This object is a dictionary containing plugin
         * names as keys and their corresponding exposed values as values.
         *
         * The preferred way to access plugins in the registry is through
         * another plugin. Accessing the registry through Core outside of a
         * plugin is discouraged.
         */
        this.registry = Object.create(null);
        /**
         * The plugin directory. This object is a dictionary containing plugin
         * names as keys and the plugin objects as values.
         *
         * Plugins do not have access to this directory.
         */
        this.directory = Object.create(null);
    }
    /**
     * Register one or more plugins with Core.
     *
     * Plugins given here are registered as a batch: the next lifecycle
     * event does not occur until all plugins in this batch have
     * experienced the current lifecycle event.
     *
     * The registration lifecycle is as follows:
     *
     * 1. **Registration:** The registry is populated with each plugin's
     *    name and the value that it wants to expose. Plugins cannot
     *    assume that other plugins have been registered.
     * 2. **Initialization:** Plugins perform setup tasks. Plugins are
     *    aware of the existence of other plugins, but should not make use
     *    of their functionality as they may not yet be initialized.
     * 3. **Ready:** Registration is complete. All plugins have been
     *    initialized, and plugins may make use of other plugins.
     *
     * This function ensures that all plugin dependencies are available
     * before proceeding to register the plugins. Circular dependencies
     * are supported. If dependencies are missing, an error will be
     * thrown.
     *
     * @param plugins An array of plugin instances to register.
     */
    Core.prototype.register = function (plugins) {
        var missingDependencies = core_1.calculateMissingDependencies(plugins, this.registry);
        if (missingDependencies.length) {
            throw new Error('Missing dependencies: ' + missingDependencies.join(', '));
        }
        core_1.registerPlugins(plugins, this.registry, this.directory);
        core_1.initPlugins(plugins);
        core_1.readyPlugins(plugins);
    };
    /**
     * Unregisters all plugins. The plugin registry and directory are both
     * cleared. The optional `unregister` function of each plugin is
     * called when the plugin is unregistered. The order in which the
     * plugins are unregistered is unspecified.
     */
    Core.prototype.unregisterAll = function () {
        core_1.unregisterPlugins(Object.keys(this.directory), this.registry, this.directory);
    };
    return Core;
}());
exports.default = Core;


/***/ }),

/***/ "./packages/@sfx/core/src/index.ts":
/*!*****************************************!*\
  !*** ./packages/@sfx/core/src/index.ts ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(/*! ./core */ "./packages/@sfx/core/src/core.ts");
exports.Core = core_1.default;


/***/ }),

/***/ "./packages/@sfx/core/src/utils/core.ts":
/*!**********************************************!*\
  !*** ./packages/@sfx/core/src/utils/core.ts ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Calculates the missing dependencies of the given plugins. The given
 * plugins and the plugins in the registry are eligible to satisfy
 * dependencies.
 *
 * @param plugins The plugins whose dependencies should be checked.
 * @param registry The plugin registry containing all registered plugins.
 * @returns An array of names of missing plugins.
 */
function calculateMissingDependencies(plugins, registry) {
    var available = Object.keys(registry).concat(plugins.map(function (_a) {
        var name = _a.metadata.name;
        return name;
    }));
    var required = plugins.reduce(function (memo, plugin) {
        return memo.concat(plugin.metadata.depends);
    }, []);
    var availableSet = new Set(available);
    var requiredSet = new Set(required);
    var difference = new Set(Array.from(requiredSet).filter(function (p) { return !availableSet.has(p); }));
    return Array.from(difference.values()).sort();
}
exports.calculateMissingDependencies = calculateMissingDependencies;
/**
 * Calls the `register` function of each plugin. The values returned by
 * each plugin are added to the given registry.
 *
 * @param plugins The plugins to register.
 * @param registry The registry into which to add the plugins' exposed values.
 * @param directory The directory into which to add the plugins.
 * @returns An object containing the keys and values of the new items
 * added to the registry.
 */
function registerPlugins(plugins, registry, directory) {
    var newlyRegistered = Object.create(null);
    var newPlugins = Object.create(null);
    plugins.forEach(function (plugin) {
        var exposedValue = plugin.register(Object.create(registry));
        var name = plugin.metadata.name;
        newlyRegistered[name] = exposedValue;
        newPlugins[name] = plugin;
    });
    Object.assign(registry, newlyRegistered);
    Object.assign(directory, newPlugins);
    return newlyRegistered;
}
exports.registerPlugins = registerPlugins;
/**
 * Calls the optional `init` function of each plugin.
 *
 * @param plugins The plugins to initialize.
 */
function initPlugins(plugins) {
    plugins.forEach(function (plugin) {
        if (typeof plugin.init === 'function') {
            plugin.init();
        }
    });
}
exports.initPlugins = initPlugins;
/**
 * Calls the optional `ready` function of each plugin.
 *
 * @param plugins The plugins to ready.
 */
function readyPlugins(plugins) {
    plugins.forEach(function (plugin) {
        if (typeof plugin.ready === 'function') {
            plugin.ready();
        }
    });
}
exports.readyPlugins = readyPlugins;
/**
 * Unregisters the plugins with the given names from the given registry
 * and directory.
 *
 * @param names The names of the plugins to unregister.
 * @param registry The registry from which to unregister the plugin's
 * exposed value.
 * @param directory The directory from which to unregister the plugin.
 */
function unregisterPlugins(names, registry, directory) {
    names.forEach(function (name) {
        var plugin = directory[name];
        if (typeof plugin.unregister === 'function') {
            plugin.unregister();
        }
    });
    names.forEach(function (name) {
        delete registry[name];
        delete directory[name];
    });
}
exports.unregisterPlugins = unregisterPlugins;


/***/ }),

/***/ "./presets/core.ts-exposed":
/*!*********************************!*\
  !*** ./presets/core.ts-exposed ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {module.exports = global["sfxCore"] = __webpack_require__(/*! -!./node_modules/ts-loader!./core.ts */ "./node_modules/ts-loader/index.js!./presets/core.ts");
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../node_modules/webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ })

/******/ });
//# sourceMappingURL=sfx-core-bundle.js.map