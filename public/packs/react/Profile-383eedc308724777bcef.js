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
/******/ 	return __webpack_require__(__webpack_require__.s = 39);
/******/ })
/************************************************************************/
/******/ ({

/***/ 39:
/*!****************************************************!*\
  !*** ./app/javascript/packs/react/Profile.es6.jsx ***!
  \****************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Profile = function (_React$Component) {
  _inherits(Profile, _React$Component);

  function Profile(props) {
    _classCallCheck(this, Profile);

    var _this = _possibleConstructorReturn(this, (Profile.__proto__ || Object.getPrototypeOf(Profile)).call(this, props));

    _this.state = {
      showingFavorites: false,
      showingBooks: true,
      books: _this.props.books,
      requestMoreBooksSent: false,
      pageNumber: 2,
      dashHeight: 0
    };
    _this.renderAllBooks = _this.renderAllBooks.bind(_this);
    _this.renderAuthoredBooks = _this.renderAuthoredBooks.bind(_this);
    _this.renderFavoriteBooks = _this.renderFavoriteBooks.bind(_this);
    _this.currentUserProfile = _this.currentUserProfile.bind(_this);
    _this.toggleShowFavorites = _this.toggleShowFavorites.bind(_this);
    _this.toggleShowBooks = _this.toggleShowBooks.bind(_this);
    _this.toggleShowAll = _this.toggleShowAll.bind(_this);
    _this.renderCreateBookButton = _this.renderCreateBookButton.bind(_this);
    _this.renderDashboardList = _this.renderDashboardList.bind(_this);
    _this.renderEditButton = _this.renderEditButton.bind(_this);
    _this.renderUserContent = _this.renderUserContent.bind(_this);
    _this.loadMoreBooksOnScroll = _this.loadMoreBooksOnScroll.bind(_this);
    _this.loadMoreBooks = _this.loadMoreBooks.bind(_this);
    _this.loadBooksRequest = _this.loadBooksRequest.bind(_this);
    _this.renderBookLoader = _this.renderBookLoader.bind(_this);
    return _this;
  }

  _createClass(Profile, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      window.addEventListener('scroll', this.loadMoreBooksOnScroll);
    }
  }, {
    key: "loadMoreBooksOnScroll",
    value: function loadMoreBooksOnScroll() {
      var dashHeight = this.divElement.clientHeight;
      this.setState({ dashHeight: dashHeight });

      var yPosition = document.documentElement && document.documentElement.scrollTop || document.body.scrollTop;
      var clientHeight = document.documentElement.clientHeight || window.innerHeight; // height of client window
      var scrolledToBottom = yPosition >= dashHeight - Math.ceil(clientHeight * 1.3); // begins load when content is 1/3 of the client height below the screen

      if (scrolledToBottom) {
        this.loadMoreBooks();
      }
    }
  }, {
    key: "loadMoreBooks",
    value: function loadMoreBooks() {
      if (this.state.requestMoreBooksSent) {
        return;
      }

      setTimeout(this.loadBooksRequest, 1000);

      this.setState({ requestMoreBooksSent: true });
    }
  }, {
    key: "loadBooksRequest",
    value: function loadBooksRequest() {
      var relative_path = window.location.href;
      cut_path_with_slashes = relative_path.split("/");
      URL = cut_path_with_slashes[0] + "//" + cut_path_with_slashes[2];
      $.ajax({
        url: URL + "/books/show_more",
        data: { page: this.state.pageNumber },
        method: "GET",
        success: function (data, textStatus, jqXHR) {
          if (data.length > 0) {
            books = this.state.books.concat(data);
            pageNumber = this.state.pageNumber;
            pageNumber = pageNumber + 1;
            this.setState({
              books: books,
              requestMoreBooksSent: false,
              pageNumber: pageNumber
            });
          } else {
            this.setState({
              requestMoreBooksSent: false
            });
          }
        }.bind(this),
        error: function (jqXHR, textStatus, errorThrown) {
          this.requestMoreBooksSent = false;
        }.bind(this)
      });
    }
  }, {
    key: "renderAllBooks",
    value: function renderAllBooks() {
      var _this2 = this;

      return this.state.books.map(function (book) {
        return React.createElement(BookEntry, {
          book: book,
          key: book.id,
          cardinality: _this2.props.cardinality,
          phrase: _this2.props.phrase
        });
      });
    }
  }, {
    key: "renderAuthoredBooks",
    value: function renderAuthoredBooks() {
      var _this3 = this;

      if (this.props.authoredBooks.length > 0) {
        return this.props.authoredBooks.map(function (book) {
          return React.createElement(BookEntry, {
            book: book,
            key: book.id,
            cardinality: _this3.props.cardinality,
            phrase: _this3.props.phrase
          });
        });
      } else {
        if (!this.currentUserProfile()) {
          if (this.props.currentUser) {
            return React.createElement(
              "li",
              { className: "emptyList" },
              React.createElement(
                "p",
                null,
                "You haven't created any books yet.",
                React.createElement(
                  "a",
                  { href: "/books/new" },
                  "Create your first book"
                )
              )
            );
          } else {
            return React.createElement(
              "li",
              { className: "emptyList" },
              React.createElement(
                "p",
                null,
                this.props.userData.username,
                " does not have any books."
              )
            );
          }
        } else {
          return React.createElement(
            "li",
            { className: "emptyList" },
            React.createElement(
              "p",
              null,
              this.props.userData.username,
              " does not have any books."
            )
          );
        }
      }
    }
  }, {
    key: "renderFavoriteBooks",
    value: function renderFavoriteBooks() {
      var _this4 = this;

      if (this.props.favorites.length > 0) {
        return this.props.favorites.map(function (book) {
          return React.createElement(BookEntry, {
            user: _this4.props.userData,
            book: book,
            key: book.id,
            cardinality: _this4.props.cardinality,
            phrase: _this4.props.phrase
          });
        });
      }
      return React.createElement(
        "li",
        { className: "emptyList" },
        React.createElement(
          "p",
          null,
          React.createElement(
            "span",
            { className: "prompt" },
            "Your favorite books will show up here."
          ),
          "Click on a star ",
          React.createElement("img", { src: this.props.unstar, name: "unlit" }),
          " to favorite a book ",
          React.createElement(
            "img",
            { src: this.props.star, name: "shine" },
            "."
          )
        )
      );
    }
  }, {
    key: "currentUserProfile",
    value: function currentUserProfile() {
      if (this.props.currentUser) {
        return this.props.userData.id != this.props.currentUser.id;
      }
    }
  }, {
    key: "toggleShowFavorites",
    value: function toggleShowFavorites() {
      this.setState({
        showingAll: false,
        showingFavorites: true,
        showingBooks: false
      });
    }
  }, {
    key: "toggleShowBooks",
    value: function toggleShowBooks() {
      this.setState({
        showingAll: false,
        showingFavorites: false,
        showingBooks: true
      });
    }
  }, {
    key: "toggleShowAll",
    value: function toggleShowAll() {
      this.setState({
        showingAll: true,
        showingFavorites: false,
        showingBooks: false
      });
    }
  }, {
    key: "renderCreateBookButton",
    value: function renderCreateBookButton() {
      if (!this.currentUserProfile()) {
        if (this.props.currentUser) {
          return React.createElement(
            "a",
            { href: "/books/new", className: "newBook", title: "Create a new book" },
            "+"
          );
        }
      }
    }
  }, {
    key: "renderDashboardList",
    value: function renderDashboardList() {
      if (this.props.currentUser) {
        if (this.currentUserProfile()) {
          return React.createElement(
            "div",
            { className: "controlPanel" },
            React.createElement(
              "button",
              { id: "books", onClick: this.toggleShowBooks },
              "Books ",
              React.createElement(
                "span",
                { className: "bookCount" },
                this.props.authoredBooks.length
              )
            ),
            React.createElement(
              "button",
              { id: "favorites", onClick: this.toggleShowFavorites },
              "Favorites ",
              React.createElement(
                "span",
                { className: "bookCount" },
                this.props.favorites.length
              )
            )
          );
        }
        return React.createElement(
          "div",
          { className: "controlPanel" },
          React.createElement(
            "button",
            { id: "books", onClick: this.toggleShowBooks },
            "My Books ",
            React.createElement(
              "span",
              { className: "bookCount" },
              this.props.authoredBooks.length
            )
          ),
          React.createElement(
            "button",
            { id: "favorites", onClick: this.toggleShowFavorites },
            "Favorites ",
            React.createElement(
              "span",
              { className: "bookCount" },
              this.props.favorites.length
            )
          ),
          React.createElement(
            "a",
            { href: "/books/new", title: "Create a new book" },
            "+"
          )
        );
      }
      return React.createElement(
        "div",
        { className: "controlPanel" },
        React.createElement(
          "button",
          { id: "books", onClick: this.toggleShowBooks },
          "Books ",
          React.createElement(
            "span",
            { className: "bookCount" },
            this.props.authoredBooks.length
          )
        ),
        React.createElement(
          "button",
          { id: "favorites", onClick: this.toggleShowFavorites },
          "Favorites ",
          React.createElement(
            "span",
            { className: "bookCount" },
            this.props.favorites.length
          )
        )
      );
    }
  }, {
    key: "renderEditButton",
    value: function renderEditButton() {
      if (this.props.currentUser) {
        if (this.props.currentUser.id == this.props.userData.id) {
          return React.createElement(
            "a",
            { className: "editButton", href: "account/edit" },
            "Edit"
          );
        }
      }
    }
  }, {
    key: "renderUserContent",
    value: function renderUserContent() {
      if (this.state.showingFavorites) {
        return React.createElement(
          "div",
          { className: "indexContent favorites" },
          this.renderDashboardList(),
          React.createElement(
            "ul",
            { className: "bookEntryList" },
            this.renderFavoriteBooks()
          )
        );
      }
      if (this.state.showingBooks) {
        return React.createElement(
          "div",
          { className: "indexContent books" },
          this.renderDashboardList(),
          React.createElement(
            "ul",
            { className: "bookEntryList" },
            this.renderAuthoredBooks()
          )
        );
      }
    }
  }, {
    key: "renderBookLoader",
    value: function renderBookLoader() {
      if (this.state.requestMoreBooksSent) {
        return React.createElement(
          "span",
          { className: "bookLoader" },
          React.createElement(Progress, null)
        );
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this5 = this;

      var createdDate = new Date(this.props.userData.created_at);
      var createdYear = createdDate.getUTCFullYear();
      var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
      var createdMonth = months[createdDate.getMonth()];
      var username = this.props.userData.username;

      return React.createElement(
        "div",
        { className: "container" },
        React.createElement(NavBar, {
          currentUser: this.props.currentUser,
          menu: this.props.menu,
          logo: this.props.logo,
          detail: this.props.detail,
          search: this.props.search
        }),
        React.createElement("span", { className: "backgroundElement" }),
        React.createElement(
          "div",
          { id: "profile" },
          React.createElement(
            "div",
            { className: "userInformation" },
            React.createElement(
              "div",
              { className: "wrapper" },
              React.createElement("img", { src: "https://www.gravatar.com/avatar/" + this.props.hashedEmail + "?d=identicon&s=200", width: "200px", height: "200px" }),
              React.createElement(
                "span",
                { className: "tooltip" },
                "?"
              ),
              React.createElement(
                "span",
                { className: "details" },
                React.createElement(
                  "h2",
                  { className: username.length > 9 ? "smallText" : "" },
                  username
                ),
                React.createElement(
                  "p",
                  null,
                  "Joined ",
                  createdMonth,
                  " ",
                  createdYear
                ),
                this.renderEditButton()
              )
            ),
            React.createElement(
              "div",
              { className: "dashboard side" },
              this.renderUserContent()
            )
          ),
          React.createElement(
            "div",
            { className: "dashboard" },
            React.createElement(
              "div",
              { className: "indexContent" },
              React.createElement(
                "div",
                { className: "controlPanel" },
                React.createElement(
                  "p",
                  null,
                  "Latest books"
                )
              ),
              React.createElement(
                "ul",
                { className: "bookEntryList", ref: function ref(divElement) {
                    return _this5.divElement = divElement;
                  } },
                this.renderAllBooks(),
                this.renderBookLoader()
              )
            ),
            this.renderCreateBookButton()
          )
        )
      );
    }
  }]);

  return Profile;
}(React.Component);

Profile.propTypes = {
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
  userData: React.PropTypes.shape({
    created_at: React.PropTypes.string,
    email: React.PropTypes.string,
    favorite_books: React.PropTypes.array,
    id: React.PropTypes.number,
    username: React.PropTypes.string
  }),
  cardinality: React.PropTypes.string,
  authoredBooks: React.PropTypes.arrayOf(React.PropTypes.shape({
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
  favorites: React.PropTypes.arrayOf(React.PropTypes.shape({
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
  currentUser: React.PropTypes.shape({
    created_at: React.PropTypes.string,
    email: React.PropTypes.string,
    favorite_books: React.PropTypes.array,
    id: React.PropTypes.number,
    username: React.PropTypes.string
  }),
  menu: React.PropTypes.string,
  logo: React.PropTypes.string,
  detail: React.PropTypes.string,
  search: React.PropTypes.string,
  hashedEmail: React.PropTypes.string
};

/***/ })

/******/ });
//# sourceMappingURL=Profile-383eedc308724777bcef.js.map