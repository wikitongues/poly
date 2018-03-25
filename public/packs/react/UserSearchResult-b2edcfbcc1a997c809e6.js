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
/******/ 	return __webpack_require__(__webpack_require__.s = 45);
/******/ })
/************************************************************************/
/******/ ({

/***/ 45:
/*!*************************************************************!*\
  !*** ./app/javascript/packs/react/UserSearchResult.es6.jsx ***!
  \*************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var UserSearchResult = function (_React$Component) {
  _inherits(UserSearchResult, _React$Component);

  function UserSearchResult() {
    _classCallCheck(this, UserSearchResult);

    return _possibleConstructorReturn(this, (UserSearchResult.__proto__ || Object.getPrototypeOf(UserSearchResult)).apply(this, arguments));
  }

  _createClass(UserSearchResult, [{
    key: 'render',
    value: function render() {
      var createdDate = new Date(this.props.user.created_at);
      var createdYear = createdDate.getUTCFullYear();
      var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
      var createdMonth = months[createdDate.getMonth()];
      var createdDay = createdDate.getDate();

      return React.createElement(
        'li',
        { className: 'bookEntry' },
        React.createElement(
          'a',
          { href: '/users/' + this.props.user.id },
          React.createElement(
            'section',
            { className: 'info' },
            React.createElement(
              'section',
              { className: 'clear' },
              React.createElement(
                'h2',
                { className: 'title', title: this.props.user.username },
                this.props.user.username
              ),
              React.createElement(
                'section',
                { className: 'details' },
                React.createElement(
                  'p',
                  { className: 'count', title: this.props.user.books.length + " books" },
                  this.props.user.books.length,
                  ' books'
                )
              )
            ),
            React.createElement(
              'section',
              { className: 'meta' },
              React.createElement(
                'p',
                { className: 'date' },
                'Joined ',
                createdMonth,
                ' ',
                createdYear
              )
            )
          )
        )
      );
    }
  }]);

  return UserSearchResult;
}(React.Component);

BookEntry.propTypes = {
  currentUser: React.PropTypes.shape({
    created_at: React.PropTypes.string,
    email: React.PropTypes.string,
    favorite_books: React.PropTypes.array,
    id: React.PropTypes.number,
    username: React.PropTypes.string
  }),
  sourceLanguage: React.PropTypes.array, // TODO: precise
  targetLanguage: React.PropTypes.array, // TODO: precise
  query: React.PropTypes.string,
  users: React.PropTypes.string,
  cardinality: React.PropTypes.string,
  logo: React.PropTypes.string,
  detail: React.PropTypes.string,
  search: React.PropTypes.string
};

/***/ })

/******/ });
//# sourceMappingURL=UserSearchResult-b2edcfbcc1a997c809e6.js.map