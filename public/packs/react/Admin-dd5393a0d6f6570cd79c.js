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
/******/ 	return __webpack_require__(__webpack_require__.s = 27);
/******/ })
/************************************************************************/
/******/ ({

/***/ 27:
/*!**************************************************!*\
  !*** ./app/javascript/packs/react/Admin.es6.jsx ***!
  \**************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Admin = function (_React$Component) {
  _inherits(Admin, _React$Component);

  function Admin(props) {
    _classCallCheck(this, Admin);

    var _this = _possibleConstructorReturn(this, (Admin.__proto__ || Object.getPrototypeOf(Admin)).call(this, props));

    _this.renderBooks = _this.renderBooks.bind(_this);
    _this.renderUsers = _this.renderUsers.bind(_this);
    _this.renderLanguages = _this.renderLanguages.bind(_this);
    _this.renderPhrases = _this.renderPhrases.bind(_this);
    return _this;
  }

  _createClass(Admin, [{
    key: "renderBooks",
    value: function renderBooks() {
      var _this2 = this;

      return this.props.books.map(function (book) {
        return React.createElement(BookEntry, {
          user: _this2.props.user,
          book: book, key: book.id,
          cardinality: _this2.props.cardinality
        });
      });
    }
  }, {
    key: "renderUsers",
    value: function renderUsers() {
      var _this3 = this;

      return this.props.users.map(function (user) {
        return React.createElement(UserEntry, {
          books: _this3.props.books,
          user: user, key: user.id
        });
      });
    }
  }, {
    key: "renderPhrases",
    value: function renderPhrases() {
      return this.props.phrases.map(function (phrases) {
        return React.createElement(PhraseEntry, {
          book: phrases.book,
          phrases: phrases, key: phrases.id
        });
      });
    }
  }, {
    key: "renderLanguages",
    value: function renderLanguages() {
      var _this4 = this;

      return this.props.books.map(function (book) {
        return React.createElement(LanguageEntry, {
          users: _this4.props.users,
          book: book, key: book.id
        });
      });
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        { className: "container" },
        React.createElement(NavBar, {
          currentUser: this.props.currentUser,
          logo: this.props.logo,
          detail: this.props.detail,
          search: this.props.search,
          menu: this.props.menu
        }),
        React.createElement(
          "div",
          { className: "admin" },
          React.createElement(
            "section",
            { className: "set two-col" },
            React.createElement(
              "h3",
              null,
              "Phrases ",
              React.createElement(
                "span",
                { className: "bookCount" },
                "(",
                this.props.phrases.length,
                "/",
                this.props.phrasesCount,
                ")"
              )
            ),
            React.createElement(
              "div",
              { className: "wrapper" },
              React.createElement(
                "table",
                null,
                React.createElement(
                  "thead",
                  null,
                  React.createElement(
                    "tr",
                    null,
                    React.createElement(
                      "th",
                      null,
                      "Book ID"
                    ),
                    React.createElement(
                      "th",
                      null,
                      "Source phrase"
                    ),
                    React.createElement(
                      "th",
                      null,
                      "Target phrase"
                    )
                  )
                ),
                React.createElement(
                  "tbody",
                  null,
                  this.renderPhrases()
                )
              )
            )
          ),
          React.createElement(
            "section",
            { className: "set" },
            React.createElement(
              "h3",
              null,
              "Books ",
              React.createElement(
                "span",
                { className: "bookCount" },
                "(",
                this.props.books.length,
                "/",
                this.props.booksCount,
                ")"
              )
            ),
            React.createElement(
              "ul",
              { className: "bookEntryList" },
              this.renderBooks()
            )
          ),
          React.createElement(
            "section",
            { className: "set table" },
            React.createElement(
              "h3",
              null,
              "Users ",
              React.createElement(
                "span",
                { className: "bookCount" },
                "(",
                this.props.users.length,
                "/",
                this.props.usersCount,
                ")"
              )
            ),
            React.createElement(
              "div",
              { className: "wrapper" },
              React.createElement(
                "table",
                null,
                React.createElement(
                  "thead",
                  null,
                  React.createElement(
                    "tr",
                    null,
                    React.createElement(
                      "th",
                      null,
                      "Username"
                    ),
                    React.createElement(
                      "th",
                      null,
                      "Books authored"
                    ),
                    React.createElement(
                      "th",
                      null,
                      "Date joined"
                    )
                  )
                ),
                React.createElement(
                  "tbody",
                  null,
                  this.renderUsers()
                )
              )
            )
          ),
          React.createElement(
            "section",
            { className: "set table" },
            React.createElement(
              "h3",
              null,
              "Languages"
            ),
            React.createElement(
              "div",
              { className: "wrapper" },
              React.createElement(
                "table",
                null,
                React.createElement(
                  "thead",
                  null,
                  React.createElement(
                    "tr",
                    null,
                    React.createElement(
                      "th",
                      null,
                      "Source language"
                    ),
                    React.createElement(
                      "th",
                      null,
                      "Target language"
                    )
                  )
                ),
                React.createElement(
                  "tbody",
                  null,
                  this.renderLanguages()
                )
              )
            )
          )
        )
      );
    }
  }]);

  return Admin;
}(React.Component);

Admin.propTypes = {
  currentUser: React.PropTypes.shape({
    created_at: React.PropTypes.string,
    email: React.PropTypes.string,
    favorite_books: React.PropTypes.array,
    id: React.PropTypes.number,
    username: React.PropTypes.string
  }),
  books: React.PropTypes.arrayOf(React.PropTypes.shape({
    created_at: React.PropTypes.string,
    description: React.PropTypes.string,
    id: React.PropTypes.number,
    source_language: React.PropTypes.string,
    target_language: React.PropTypes.string,
    title: React.PropTypes.string,
    user: React.PropTypes.shape({
      created_at: React.PropTypes.string,
      email: React.PropTypes.string,
      favorite_books: React.PropTypes.array,
      id: React.PropTypes.number,
      username: React.PropTypes.string
    })
  })),
  users: React.PropTypes.arrayOf(React.PropTypes.shape({
    created_at: React.PropTypes.string,
    email: React.PropTypes.string,
    favorite_books: React.PropTypes.array,
    id: React.PropTypes.number,
    username: React.PropTypes.string
  })),
  cardinality: React.PropTypes.string,
  logo: React.PropTypes.string,
  detail: React.PropTypes.string,
  search: React.PropTypes.string
};

/***/ })

/******/ });
//# sourceMappingURL=Admin-dd5393a0d6f6570cd79c.js.map