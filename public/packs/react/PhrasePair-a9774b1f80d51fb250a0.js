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
/******/ 	return __webpack_require__(__webpack_require__.s = 37);
/******/ })
/************************************************************************/
/******/ ({

/***/ 37:
/*!*******************************************************!*\
  !*** ./app/javascript/packs/react/PhrasePair.es6.jsx ***!
  \*******************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PhrasePair = function (_React$Component) {
  _inherits(PhrasePair, _React$Component);

  function PhrasePair(props) {
    _classCallCheck(this, PhrasePair);

    var _this = _possibleConstructorReturn(this, (PhrasePair.__proto__ || Object.getPrototypeOf(PhrasePair)).call(this, props));

    _this.state = {
      isEditingPhrase: false,
      sourcePhrase: _this.props.initialSourcePhrase,
      targetPhrase: _this.props.initialTargetPhrase,
      isSourceVideoLoading: false,
      isTargetVideoLoading: false
    };
    _this.toggleEditingPhraseState = _this.toggleEditingPhraseState.bind(_this);
    _this.cancelEditingPhraseState = _this.cancelEditingPhraseState.bind(_this);
    _this.onDeletePhraseClick = _this.onDeletePhraseClick.bind(_this);
    _this.onSavePhraseClick = _this.onSavePhraseClick.bind(_this);
    _this.onInvertPhraseClick = _this.onInvertPhraseClick.bind(_this);
    _this.onEditPhraseClick = _this.onEditPhraseClick.bind(_this);
    _this.onSourceChange = _this.onSourceChange.bind(_this);
    _this.onTargetChange = _this.onTargetChange.bind(_this);
    _this.renderPhraseMenu = _this.renderPhraseMenu.bind(_this);
    _this.renderPhrasePair = _this.renderPhrasePair.bind(_this);
    return _this;
  }

  _createClass(PhrasePair, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      this.setState({
        sourcePhrase: nextProps.initialSourcePhrase,
        targetPhrase: nextProps.initialTargetPhrase
      });
    }
  }, {
    key: 'toggleEditingPhraseState',
    value: function toggleEditingPhraseState() {
      this.setState({ isEditingPhrase: !this.state.isEditingPhrase });
    }
  }, {
    key: 'cancelEditingPhraseState',
    value: function cancelEditingPhraseState(e) {
      e.preventDefault();
      this.setState({
        sourcePhrase: this.props.initialSourcePhrase,
        targetPhrase: this.props.initialTargetPhrase,
        isEditingPhrase: false
      });
    }
  }, {
    key: 'onDeletePhraseClick',
    value: function onDeletePhraseClick() {
      this.props.onDeletePhrasePair(this.props.id);
    }
  }, {
    key: 'onSavePhraseClick',
    value: function onSavePhraseClick(e) {
      e.preventDefault();
      if (this.state.sourcePhrase && this.state.targetPhrase) {
        $.ajax({
          url: '/phrase_pairs/' + this.props.id,
          type: 'PUT',
          data: {
            phrase_pair: {
              source_phrase: this.state.sourcePhrase,
              target_phrase: this.state.targetPhrase
            }
          },
          success: function () {
            this.props.onSaveEditPhrase(this.props.id, this.state.sourcePhrase, this.state.targetPhrase);
            this.toggleEditingPhraseState();
          }.bind(this),
          error: function error() {
            console.log('Error: Could not save phrase');
          }
        });
      } else {
        if (this.state.sourcePhrase) {
          bootbox.alert({
            message: 'Target phrase is empty',
            closeButton: false
          });
        } else {
          bootbox.alert({
            message: 'Source phrase is empty',
            closeButton: false
          });
        }
      }
    }
  }, {
    key: 'onInvertPhraseClick',
    value: function onInvertPhraseClick(e) {
      e.preventDefault();
      this.setState({
        sourcePhrase: this.state.targetPhrase,
        targetPhrase: this.state.sourcePhrase
      });
    }
  }, {
    key: 'onEditPhraseClick',
    value: function onEditPhraseClick() {
      this.toggleEditingPhraseState();
    }
  }, {
    key: 'onSourceChange',
    value: function onSourceChange(e) {
      this.setState({ sourcePhrase: e.target.value });
    }
  }, {
    key: 'onTargetChange',
    value: function onTargetChange(e) {
      this.setState({ targetPhrase: e.target.value });
    }
  }, {
    key: 'renderVideoLoader',
    value: function renderVideoLoader() {
      return React.createElement(
        'span',
        { className: 'loader' },
        React.createElement(
          'span',
          null,
          React.createElement('span', null)
        ),
        React.createElement(
          'span',
          null,
          React.createElement('span', null)
        ),
        React.createElement(
          'span',
          null,
          React.createElement('span', null)
        )
      );
    }
  }, {
    key: 'renderSourceVideo',
    value: function renderSourceVideo(src) {
      var _this2 = this;

      if (this.state.isSourceVideoLoading !== false) {
        setTimeout(function () {
          _this2.setState({ isSourceVideoLoading: false });
        }, 10000);
      }

      if (false) {
        return React.createElement(
          'div',
          { className: 'video' },
          this.renderVideoLoader()
        );
      }
      return React.createElement(
        'div',
        { className: 'video' },
        this.renderVideo(src)
      );
    }
  }, {
    key: 'renderTargetVideo',
    value: function renderTargetVideo(src) {
      var _this3 = this;

      if (this.state.isTargetVideoLoading !== false) {
        setTimeout(function () {
          _this3.setState({ isTargetVideoLoading: false });
        }, 10000);
      }

      if (false) {
        return React.createElement(
          'div',
          { className: 'video' },
          this.renderVideoLoader()
        );
      }
      return React.createElement(
        'span',
        null,
        React.createElement(
          'div',
          { className: 'video' },
          this.renderVideo(src)
        )
      );
    }
  }, {
    key: 'renderVideo',
    value: function renderVideo(src) {
      return React.createElement('video', { src: src, controls: true, loop: true });
    }
  }, {
    key: 'renderSourceInput',
    value: function renderSourceInput(status, src) {
      if (status) {
        return React.createElement(
          'div',
          { className: 'video' },
          React.createElement('video', { src: this.state.sourcePhrase })
        );
      } else {
        return React.createElement('input', {
          value: this.state.sourcePhrase,
          onChange: this.onSourceChange,
          name: 'sourcePhrase' });
      }
    }
  }, {
    key: 'renderTargetInput',
    value: function renderTargetInput(status, src) {
      if (status) {
        return React.createElement(
          'div',
          { className: 'video' },
          React.createElement('video', { src: this.state.targetPhrase })
        );
      } else {
        return React.createElement('input', {
          value: this.state.targetPhrase,
          onChange: this.onTargetChange,
          name: 'targetPhrase' });
      }
    }
  }, {
    key: 'renderPhraseMenu',
    value: function renderPhraseMenu() {
      if (this.props.isOwnedByCurrentUser && this.props.id) {
        if (this.state.isEditingPhrase) {
          return React.createElement(
            'li',
            { className: 'menu saving' },
            React.createElement(
              'button',
              { title: 'Flip', onClick: this.onInvertPhraseClick, className: 'icon' },
              React.createElement('img', { src: this.props.flip })
            ),
            React.createElement(
              'button',
              { title: 'Save', onClick: this.onSavePhraseClick, className: 'icon' },
              React.createElement('img', { src: this.props.save })
            ),
            React.createElement(
              'button',
              { title: 'Cancel', onClick: this.cancelEditingPhraseState, className: 'close icon' },
              React.createElement('img', { src: this.props.close })
            )
          );
        }
        return React.createElement(
          'li',
          { className: 'menu' },
          React.createElement(
            'button',
            { title: 'Menu', className: 'more icon' },
            React.createElement('img', { src: this.props.menu })
          ),
          React.createElement(
            'button',
            { title: 'Edit', onClick: this.onEditPhraseClick, className: 'icon' },
            React.createElement('img', { src: this.props.edit })
          ),
          React.createElement(
            'button',
            { title: 'Delete', onClick: this.onDeletePhraseClick, className: 'icon' },
            React.createElement('img', { src: this.props.delete })
          )
        );
      }
    }
  }, {
    key: 'renderParagraph',
    value: function renderParagraph(text) {
      if (text) {
        return React.createElement(
          'p',
          null,
          text
        );
      }
      return React.createElement(
        'p',
        null,
        React.createElement(Progress, null)
      );
    }
  }, {
    key: 'renderPhrasePair',
    value: function renderPhrasePair() {
      if (this.state.isEditingPhrase) {
        return React.createElement(
          'ul',
          null,
          React.createElement(
            'form',
            { onSubmit: this.onSavePhraseClick },
            React.createElement(
              'li',
              { className: 'source' },
              this.state.sourcePhrase.startsWith('https://s3.amazonaws.com/poly-video-uploads-dev/') ? this.renderSourceInput(true) : this.renderSourceInput(false)
            ),
            React.createElement(
              'li',
              { className: 'target' },
              this.state.targetPhrase && this.state.targetPhrase.startsWith('https://s3.amazonaws.com/poly-video-uploads-dev/') ? this.renderTargetInput(true) : this.renderTargetInput(false)
            ),
            this.renderPhraseMenu()
          )
        );
      } else {
        // Checks whether the source phrase or the target phrase is a video and renders video or a paragraph accordingly
        return React.createElement(
          'ul',
          null,
          React.createElement(
            'li',
            { className: 'source' },
            this.state.sourcePhrase.startsWith('https://s3.amazonaws.com/poly-video-uploads-dev/') ? this.renderSourceVideo(this.state.sourcePhrase) : this.renderParagraph(this.state.sourcePhrase)
          ),
          React.createElement(
            'li',
            { className: 'target' },
            this.state.targetPhrase && this.state.targetPhrase.startsWith('https://s3.amazonaws.com/poly-video-uploads-dev/') ? this.renderTargetVideo(this.state.targetPhrase) : this.renderParagraph(this.state.targetPhrase)
          ),
          this.renderPhraseMenu()
        );
      }
    }
  }, {
    key: 'render',
    value: function render() {
      return React.createElement(
        'li',
        { className: 'entry' },
        this.renderPhrasePair()
      );
    }
  }]);

  return PhrasePair;
}(React.Component);

PhrasePair.propTypes = {
  initialSourcePhrase: React.PropTypes.string,
  initialTargetPhrase: React.PropTypes.string,
  onDeletePhrasePair: React.PropTypes.func,
  id: React.PropTypes.number,
  isOwnedByCurrentUser: React.PropTypes.bool,
  flip: React.PropTypes.string,
  save: React.PropTypes.string,
  close: React.PropTypes.string,
  menu: React.PropTypes.string,
  edit: React.PropTypes.string,
  delete: React.PropTypes.string
};

/***/ })

/******/ });
//# sourceMappingURL=PhrasePair-a9774b1f80d51fb250a0.js.map