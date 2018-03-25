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
/******/ 	return __webpack_require__(__webpack_require__.s = 34);
/******/ })
/************************************************************************/
/******/ ({

/***/ 34:
/*!***************************************************!*\
  !*** ./app/javascript/packs/react/NavBar.es6.jsx ***!
  \***************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var NavBar = function (_React$Component) {
  _inherits(NavBar, _React$Component);

  function NavBar(props) {
    _classCallCheck(this, NavBar);

    var _this = _possibleConstructorReturn(this, (NavBar.__proto__ || Object.getPrototypeOf(NavBar)).call(this, props));

    _this.state = {
      isNavMenuVisible: false
    };
    _this.toggleMenu = _this.toggleMenu.bind(_this);
    _this.renderSignIn = _this.renderSignIn.bind(_this);
    return _this;
  }

  _createClass(NavBar, [{
    key: "toggleMenu",
    value: function toggleMenu() {
      this.setState({
        isNavMenuVisible: !this.state.isNavMenuVisible
      });
    }
  }, {
    key: "renderAdminButton",
    value: function renderAdminButton() {
      if (this.props.currentUser.admin) {
        return React.createElement(
          "a",
          { href: "/admin" },
          "Admin"
        );
      }
    }
  }, {
    key: "renderNavMenu",
    value: function renderNavMenu() {
      if (this.state.isNavMenuVisible) {
        return React.createElement(
          "div",
          { className: "navMenu" },
          React.createElement(
            "a",
            { href: "/dashboard" },
            "Home"
          ),
          React.createElement(
            "a",
            { href: "/books/new" },
            "Create a new book"
          ),
          React.createElement(
            "a",
            { href: "/account/edit" },
            "Edit profile"
          ),
          React.createElement(
            "a",
            { href: "/features" },
            "Roadmap"
          ),
          this.renderAdminButton(),
          React.createElement(
            "a",
            { href: "/sign_out" },
            "Sign out"
          )
        );
      }
    }
  }, {
    key: "renderSignIn",
    value: function renderSignIn() {
      if (this.props.currentUser) {
        return React.createElement(
          "div",
          { className: "loggedIn" },
          React.createElement(
            "a",
            { className: "currentUser", onClick: this.toggleMenu },
            React.createElement(
              "span",
              null,
              this.props.currentUser.username
            ),
            React.createElement("img", { src: this.props.menu })
          ),
          this.renderNavMenu()
        );
      }
      return React.createElement(
        "div",
        { className: "logIn" },
        React.createElement(
          "a",
          { href: "/features" },
          "Roadmap"
        ),
        React.createElement(
          "a",
          { className: "signUp", href: "/sign_up" },
          "Sign up"
        ),
        React.createElement(
          "a",
          { href: "/sign_in" },
          "or log in"
        )
      );
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement(
        "nav",
        null,
        React.createElement(
          "a",
          { className: "icon home", href: "/" },
          React.createElement("img", { src: this.props.logo, alt: "Poly Home" }),
          React.createElement(
            "span",
            { className: "detail" },
            React.createElement("img", { src: this.props.detail, alt: "" })
          )
        ),
        React.createElement(SearchBar, { query: this.props.query, search: this.props.search }),
        this.renderSignIn()
      );
    }
  }]);

  return NavBar;
}(React.Component);

NavBar.propTypes = {
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
  query: React.PropTypes.string,
  search: React.PropTypes.string
};

/***/ })

/******/ });
//# sourceMappingURL=NavBar-7cfe1f1f1949978c2da6.js.map