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
/******/ 	return __webpack_require__(__webpack_require__.s = 38);
/******/ })
/************************************************************************/
/******/ ({

/***/ 38:
/*!***************************************************************!*\
  !*** ./app/javascript/packs/react/PhraseSearchResult.es6.jsx ***!
  \***************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PhraseSearchResult = function (_React$Component) {
  _inherits(PhraseSearchResult, _React$Component);

  function PhraseSearchResult() {
    _classCallCheck(this, PhraseSearchResult);

    return _possibleConstructorReturn(this, (PhraseSearchResult.__proto__ || Object.getPrototypeOf(PhraseSearchResult)).apply(this, arguments));
  }

  _createClass(PhraseSearchResult, [{
    key: "renderPhrasePair",
    value: function renderPhrasePair() {
      return React.createElement(
        "ul",
        null,
        React.createElement(
          "li",
          { className: "source" },
          this.props.phrase.source_phrase.startsWith('https://s3.amazonaws.com/poly-video-uploads-dev/') ? this.renderSourceVideo(this.props.phrase.source_phrase) : this.renderParagraph(this.props.phrase.source_phrase)
        ),
        React.createElement(
          "li",
          { className: "target" },
          this.props.phrase.target_phrase && this.props.phrase.target_phrase.startsWith('https://s3.amazonaws.com/poly-video-uploads-dev/') ? this.renderTargetVideo(this.props.phrase.target_phrase) : this.renderParagraph(this.props.phrase.target_phrase)
        )
      );
    }
  }, {
    key: "renderSourceVideo",
    value: function renderSourceVideo(src) {
      return React.createElement(
        "div",
        { className: "video" },
        this.renderVideo(src)
      );
    }
  }, {
    key: "renderTargetVideo",
    value: function renderTargetVideo(src) {
      return React.createElement(
        "span",
        null,
        React.createElement(
          "div",
          { className: "video" },
          this.renderVideo(src)
        )
      );
    }
  }, {
    key: "renderVideo",
    value: function renderVideo(src) {
      return React.createElement("video", { src: src });
    }
  }, {
    key: "renderParagraph",
    value: function renderParagraph(text) {
      return React.createElement(
        "p",
        null,
        text
      );
    }
  }, {
    key: "render",
    value: function render() {
      var createdDate = new Date(this.props.phrase.book.created_at);
      var createdYear = createdDate.getUTCFullYear();
      var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
      var createdMonth = months[createdDate.getMonth()];
      var createdDay = createdDate.getDate();

      return React.createElement(
        "li",
        { className: "bookEntry" },
        React.createElement(
          "a",
          { className: "phrase", href: "books/" + this.props.phrase.book.id },
          React.createElement(
            "section",
            { className: "info" },
            React.createElement(
              "section",
              { className: "clear" },
              React.createElement(
                "h2",
                { className: "title" },
                this.props.phrase.book.title
              )
            ),
            React.createElement(
              "section",
              { className: "meta" },
              React.createElement(
                "p",
                { className: "date" },
                createdDay,
                " ",
                createdMonth,
                " ",
                createdYear
              )
            )
          ),
          React.createElement(
            "ul",
            null,
            React.createElement(
              "li",
              { className: "entry" },
              this.renderPhrasePair()
            )
          )
        )
      );
    }
  }]);

  return PhraseSearchResult;
}(React.Component);

BookEntry.propTypes = {};

/***/ })

/******/ });
//# sourceMappingURL=PhraseSearchResult-e68665f274e849039e21.js.map