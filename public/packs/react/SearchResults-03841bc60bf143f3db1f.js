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
/******/ 	return __webpack_require__(__webpack_require__.s = 43);
/******/ })
/************************************************************************/
/******/ ({

/***/ 43:
/*!**********************************************************!*\
  !*** ./app/javascript/packs/react/SearchResults.es6.jsx ***!
  \**********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SearchResults = function (_React$Component) {
  _inherits(SearchResults, _React$Component);

  function SearchResults(props) {
    _classCallCheck(this, SearchResults);

    var _this = _possibleConstructorReturn(this, (SearchResults.__proto__ || Object.getPrototypeOf(SearchResults)).call(this, props));

    _this.renderCreateBookPanel = _this.renderCreateBookPanel.bind(_this);
    _this.renderCreateBookButton = _this.renderCreateBookButton.bind(_this);
    _this.renderSearchResults = _this.renderSearchResults.bind(_this);
    _this.renderUserSection = _this.renderUserSection.bind(_this);
    _this.renderUserResults = _this.renderUserResults.bind(_this);
    _this.renderLanguageResultsSection = _this.renderLanguageResultsSection.bind(_this);
    _this.renderLanguageResults = _this.renderLanguageResults.bind(_this);
    // this.renderPhraseSection = this.renderPhraseSection.bind(this)
    // this.renderPhraseResults = this.renderPhraseResults.bind(this)
    return _this;
  }

  _createClass(SearchResults, [{
    key: "renderCreateBookPanel",
    value: function renderCreateBookPanel() {
      if (this.props.currentUser) {
        return React.createElement(
          "a",
          { href: "/books/new", title: "Create a new book" },
          "New book"
        );
      }
      return React.createElement(
        "a",
        { href: "/sign_in", title: "Create a new book" },
        "Log in to create new books"
      );
    }
  }, {
    key: "renderCreateBookButton",
    value: function renderCreateBookButton() {
      if (this.props.currentUser) {
        return React.createElement(
          "a",
          { href: "/books/new", className: "newBook", title: "Create a new book" },
          "+"
        );
      }
    }
  }, {
    key: "renderSearchResults",
    value: function renderSearchResults() {
      if (this.props.language.length != 0 || this.props.user.length != 0 /*|| this.props.phrase.length != 0*/) {
          return React.createElement(
            "div",
            { className: "search" },
            this.renderUserSection(),
            this.renderLanguageResultsSection()
          );
        } else {
        return React.createElement(
          "span",
          { className: "emptySearch" },
          "No results for \"",
          this.props.query,
          "\""
        );
      }
    }
  }, {
    key: "renderUserSection",
    value: function renderUserSection() {
      if (this.props.user.length != 0) {
        return React.createElement(
          "div",
          { className: "indexContent" },
          React.createElement(
            "div",
            { className: "controlPanel" },
            React.createElement(
              "p",
              null,
              "Usernames containing \"",
              this.props.query,
              "\""
            ),
            React.createElement(
              "span",
              { className: "bookCount search" },
              this.props.user.length
            )
          ),
          React.createElement(
            "ul",
            { className: "bookEntryList" },
            this.renderUserResults()
          )
        );
      }
    }
  }, {
    key: "renderUserResults",
    value: function renderUserResults() {
      return this.props.user.map(function (user) {
        return React.createElement(UserSearchResult, {
          user: user,
          key: user.id });
      });
    }
  }, {
    key: "renderLanguageResultsSection",
    value: function renderLanguageResultsSection() {
      if (this.props.language.length != 0) {
        return React.createElement(
          "div",
          { className: "indexContent" },
          React.createElement(
            "div",
            { className: "controlPanel" },
            React.createElement(
              "p",
              null,
              "Books containing \"",
              this.props.query,
              "\""
            ),
            React.createElement(
              "span",
              { className: "bookCount search" },
              this.props.language.length
            )
          ),
          React.createElement(
            "ul",
            { className: "bookEntryList" },
            this.renderLanguageResults()
          )
        );
      }
    }
  }, {
    key: "renderLanguageResults",
    value: function renderLanguageResults() {
      var _this2 = this;

      return this.props.language.map(function (book) {
        return React.createElement(BookEntry, {
          users: _this2.props.users,
          book: book,
          key: book.id,
          cardinality: _this2.props.cardinality
        });
      });
    }

    // renderPhraseSection() {
    //   if (this.props.phrase.length != 0) {
    //     return (
    //       <div className="indexContent">
    //         <div className="controlPanel">
    //           <p>Phrases containing "{this.props.query}"</p>
    //           <span className="bookCount search">{this.props.phrase.length}</span>
    //         </div>
    //         <ul className="bookEntryList">
    //           {this.renderPhraseResults()}
    //         </ul>
    //       </div>
    //     );
    //   }
    // }

    // renderPhraseResults() {
    //   return this.props.phrase.map(phrase => (
    //     <PhraseSearchResult
    //       phrase={phrase}
    //       key={phrase.id}
    //     />)
    //   );
    // }

  }, {
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        { className: "container" },
        React.createElement(NavBar, {
          currentUser: this.props.currentUser,
          query: this.props.query,
          logo: this.props.logo,
          detail: this.props.detail,
          search: this.props.search,
          menu: this.props.menu
        }),
        React.createElement(
          "div",
          { className: "dashboard" },
          this.renderSearchResults(),
          this.renderCreateBookButton()
        )
      );
    }
  }]);

  return SearchResults;
}(React.Component);

SearchResults.propTypes = {
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
//# sourceMappingURL=SearchResults-03841bc60bf143f3db1f.js.map