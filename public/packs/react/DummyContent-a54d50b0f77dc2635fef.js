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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	__webpack_require__.p = "/packs/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 31);
/******/ })
/************************************************************************/
/******/ ({

/***/ 31:
/*!*********************************************************!*\
  !*** ./app/javascript/packs/react/DummyContent.es6.jsx ***!
  \*********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DummyContent = function (_React$Component) {
  _inherits(DummyContent, _React$Component);

  function DummyContent() {
    _classCallCheck(this, DummyContent);

    return _possibleConstructorReturn(this, (DummyContent.__proto__ || Object.getPrototypeOf(DummyContent)).apply(this, arguments));
  }

  _createClass(DummyContent, [{
    key: "render",

    // randomString: function() {
    //   let charLength = Math.floor(Math.random() * (36 - 2)) + 2;
    //   return Math.round((Math.pow(36, charLength + 1) - Math.random() * Math.pow(36, charLength))).toString(36).slice(1);
    // },

    value: function render() {
      return React.createElement(
        "ul",
        { className: "dummy content" },
        React.createElement(
          "li",
          { className: "entry" },
          React.createElement(
            "ul",
            null,
            React.createElement(
              "li",
              { className: "source" },
              React.createElement(
                "p",
                null,
                "Vendi"
              )
            ),
            React.createElement(
              "li",
              { className: "target" },
              React.createElement(
                "p",
                null,
                "Maidens"
              )
            )
          )
        ),
        React.createElement(
          "li",
          { className: "entry" },
          React.createElement(
            "ul",
            null,
            React.createElement(
              "li",
              { className: "source" },
              React.createElement(
                "p",
                null,
                "Min\xEB li\xEB nu min\xEB aran."
              )
            ),
            React.createElement(
              "li",
              { className: "target" },
              React.createElement(
                "p",
                null,
                "One people under one king"
              )
            )
          )
        )
      );
    }
  }]);

  return DummyContent;
}(React.Component);

/***/ })

/******/ });
//# sourceMappingURL=DummyContent-a54d50b0f77dc2635fef.js.map