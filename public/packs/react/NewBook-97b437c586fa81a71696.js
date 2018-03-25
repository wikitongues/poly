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
/******/ 	return __webpack_require__(__webpack_require__.s = 35);
/******/ })
/************************************************************************/
/******/ ({

/***/ 35:
/*!****************************************************!*\
  !*** ./app/javascript/packs/react/NewBook.es6.jsx ***!
  \****************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var NewBook = function (_React$Component) {
  _inherits(NewBook, _React$Component);

  function NewBook(props) {
    _classCallCheck(this, NewBook);

    var _this = _possibleConstructorReturn(this, (NewBook.__proto__ || Object.getPrototypeOf(NewBook)).call(this, props));

    _this.state = {
      title: '',
      video_description: '',
      description: '',
      isInputVideo: false,
      hasVideoDescription: false,
      source_language: '',
      target_language: '',
      errors: [],
      stream: '',
      isVideoRecording: false,
      isDescriptionPlaying: false
    };
    _this.onCloseVideoComponent = _this.onCloseVideoComponent.bind(_this);
    _this.onInputChange = _this.onInputChange.bind(_this);
    _this.onSubmit = _this.onSubmit.bind(_this);
    _this.onDescriptionVideoSubmit = _this.onDescriptionVideoSubmit.bind(_this);
    _this.onToggleInputType = _this.onToggleInputType.bind(_this);
    _this.onSaveStream = _this.onSaveStream.bind(_this);
    _this.onStopStream = _this.onStopStream.bind(_this);
    _this.onClearStream = _this.onClearStream.bind(_this);
    _this.onStartRecordingClick = _this.onStartRecordingClick.bind(_this);
    _this.onStopRecordingClick = _this.onStopRecordingClick.bind(_this);
    _this.onRenderVideoInput = _this.onRenderVideoInput.bind(_this);
    _this.playButton = _this.playButton.bind(_this);
    _this.pauseButton = _this.pauseButton.bind(_this);
    _this.onDeleteVideoDescription = _this.onDeleteVideoDescription.bind(_this);
    return _this;
  }

  _createClass(NewBook, [{
    key: 'onInputChange',
    value: function onInputChange(e) {
      var newState = this.state;
      newState[e.target.name] = e.target.value;
      this.setState(newState);
    }
  }, {
    key: 'onSubmit',
    value: function onSubmit(e) {
      e.preventDefault();
      this.state.errors = [];
      if (this.state.title && this.state.source_language && this.state.target_language) {
        $.ajax({
          url: '/books',
          type: 'POST',
          data: {
            book: this.state
          },
          success: function success(book) {
            window.location.href = '/books/' + book.id;
          },
          error: function error(_error) {
            printErrors(_error);
          }
        });
      } else {
        if (!this.state.title) this.state.errors.push(' Title');
        if (!this.state.source_language) this.state.errors.push(' Source language');
        if (!this.state.target_language) this.state.errors.push(' Target language');
        bootbox.alert({
          message: 'Your book is missing the following required details:' + this.state.errors,
          closeButton: false
        });
      }
    }
  }, {
    key: 'onRenderVideoInput',
    value: function onRenderVideoInput() {
      if (this.state.isInputVideo) {
        var video = document.getElementById('camera-stream');
        video.muted = true;
        var self = this;

        if (navigator.mediaDevices === undefined) {
          navigator.mediaDevices = {};
        }

        if (navigator.mediaDevices.getUserMedia === undefined) {
          navigator.mediaDevices.getUserMedia = function (constraints) {
            var getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

            if (!getUserMedia) {
              self.onCloseVideoComponent();
              alert('Sorry, your browser does not support the video recording.\n(In order to access the video recording, try again with one of these browsers: Chrome, Firefox, Edge, Opera.)');
              return Promise.reject(new Error('getUserMedia is not implemented in this browser'));
            }
            return new Promise(function (resolve, reject) {
              getUserMedia.call(navigator, constraints, resolve, reject);
            });
          };
        }
        navigator.mediaDevices.getUserMedia({ audio: true, video: true }).then(function (stream) {
          self.onSaveStream(stream);
          video.controls = false;
          video.src = window.URL.createObjectURL(stream);
        }).catch(function (err) {
          console.log(err.name + ": " + err.message);
        });
      }
    }
  }, {
    key: 'onSaveStream',
    value: function onSaveStream(stream) {
      this.setState({ stream: stream });
    }
  }, {
    key: 'onStopRecordingClick',
    value: function onStopRecordingClick() {
      this.setState({ isVideoRecording: !this.state.isVideoRecording, hasVideoDescription: true });
    }
  }, {
    key: 'onStartRecordingClick',
    value: function onStartRecordingClick() {
      this.setState({ isVideoRecording: !this.state.isVideoRecording });
    }
  }, {
    key: 'onToggleInputType',
    value: function onToggleInputType() {
      this.setState({ isInputVideo: !this.state.isInputVideo });
    }
  }, {
    key: 'onCloseVideoComponent',
    value: function onCloseVideoComponent() {
      this.setState({
        isVideoRecording: false,
        isInputVideo: false
      });
      if (this.state.stream !== '') {
        this.onStopStream();
      }
    }
  }, {
    key: 'onStopStream',
    value: function onStopStream() {
      var tracks = this.state.stream.getTracks();
      tracks[0].stop();
      tracks[1].stop();
      this.onClearStream();
    }
  }, {
    key: 'onClearStream',
    value: function onClearStream() {
      this.setState({ stream: '' });
    }
  }, {
    key: 'onDescriptionVideoSubmit',
    value: function onDescriptionVideoSubmit(video) {
      this.setState({ video_description: video });
    }
  }, {
    key: 'renderVideoDescription',
    value: function renderVideoDescription() {
      if (this.state.isInputVideo == false) {
        if (this.state.hasVideoDescription) {
          return React.createElement(
            'div',
            { className: 'videoDescription' },
            React.createElement(
              'div',
              { className: 'videoComponent' },
              React.createElement('video', { src: this.state.video_description, loop: true, width: '600' }),
              this.renderPlayButton()
            )
          );
        } else {
          return React.createElement(
            'button',
            { type: 'button', title: 'Add a video', onClick: this.onToggleInputType, className: 'addVideoButton' },
            'Add a video introduction'
          );
        }
      } else {
        return React.createElement(
          'div',
          { className: 'videoDescription', ref: 'video' },
          React.createElement(Video, {
            onRenderVideoInput: this.onRenderVideoInput,
            renderRecordButton: this.renderRecordButton,
            onCancelEditPhrase: this.onCancelEditPhrase,
            onCloseVideoComponent: this.onCloseVideoComponent,
            onStartRecordingClick: this.onStartRecordingClick,
            onStopRecordingClick: this.onStopRecordingClick,
            onSourceVideoSubmit: this.onDescriptionVideoSubmit,
            onTargetVideoSubmit: this.onTargetVideoSubmit,
            onToggleInputType: this.onToggleInputType,
            onClearStream: this.onClearStream,
            closeAlt: this.props.closeAlt,
            isVideoRecording: this.state.isVideoRecording,
            isInputVideo: this.state.isInputVideo,
            onSaveStream: this.onSaveStream,
            onStopStream: this.onStopStream,
            mediaConstraints: this.state.mediaConstraints,
            stream: this.state.stream,
            isTargetInputActive: this.state.isTargetInputActive,
            sourceLanguage: this.props.sourceLanguage,
            targetLanguage: this.props.targetLanguage,
            author: this.props.currentUser.username,
            width: 600,
            videoPhrase: false
          })
        );
      }
    }
  }, {
    key: 'renderPlayButton',
    value: function renderPlayButton() {
      if (this.state.isDescriptionPlaying) {
        return React.createElement(
          'div',
          { className: 'videoControls' },
          React.createElement(
            'button',
            { className: 'play descriptionVideoPause', type: 'button', onClick: this.pauseButton, title: 'Pause' },
            React.createElement('img', { src: this.props.pause })
          ),
          React.createElement(
            'button',
            { type: 'button', title: 'Remove video', onClick: this.onDeleteVideoDescription, className: 'text icon' },
            React.createElement('img', { src: this.props.deleteAlt, alt: 'close' })
          )
        );
      } else {
        return React.createElement(
          'div',
          { className: 'videoControls' },
          React.createElement(
            'button',
            { type: 'button', onClick: this.playButton, title: 'Play', className: 'play' },
            React.createElement('img', { src: this.props.play })
          ),
          React.createElement(
            'button',
            { type: 'button', title: 'Remove video', onClick: this.onDeleteVideoDescription, className: 'text icon' },
            React.createElement('img', { src: this.props.deleteAlt, alt: 'close' })
          )
        );
      }
    }
  }, {
    key: 'onDeleteVideoDescription',
    value: function onDeleteVideoDescription() {
      this.setState({ video_description: "", hasVideoDescription: false });
    }
  }, {
    key: 'playButton',
    value: function playButton() {
      this.setState({ isDescriptionPlaying: !this.state.isDescriptionPlaying });
      $("video")[0].play();
    }
  }, {
    key: 'pauseButton',
    value: function pauseButton() {
      this.setState({ isDescriptionPlaying: !this.state.isDescriptionPlaying });
      $("video")[0].pause();
    }
  }, {
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        { className: 'container' },
        React.createElement(NavBar, {
          currentUser: this.props.currentUser,
          logo: this.props.logo,
          detail: this.props.detail,
          search: this.props.search,
          menu: this.props.menu
        }),
        React.createElement('span', { className: 'backgroundElement' }),
        React.createElement(
          'div',
          { className: 'book' },
          React.createElement(
            'form',
            { onSubmit: this.onSubmit },
            React.createElement(
              'fieldset',
              { className: 'tools' },
              React.createElement(
                'span',
                { title: 'Favorite', className: 'icon' },
                React.createElement('img', { src: this.props.unstar, alt: 'Favorite' })
              ),
              React.createElement(
                'section',
                { className: 'cardinality' },
                React.createElement(
                  'section',
                  null,
                  React.createElement('input', {
                    className: 'new language source',
                    type: 'text',
                    name: 'source_language',
                    placeholder: 'Source language',
                    value: this.state.sourceLanguage,
                    onChange: this.onInputChange
                  }),
                  React.createElement('img', { src: this.props.cardinality, alt: '' }),
                  React.createElement('input', {
                    className: 'new language target',
                    type: 'text',
                    name: 'target_language',
                    placeholder: 'Target language',
                    value: this.state.targetLanguager,
                    onChange: this.onInputChange
                  })
                )
              ),
              React.createElement(
                'span',
                { title: 'Menu', className: 'icon' },
                React.createElement('img', { src: this.props.menuAlt })
              )
            ),
            React.createElement(
              'fieldset',
              { className: 'info' },
              React.createElement(
                'div',
                { className: 'wrapper' },
                React.createElement('input', {
                  className: 'new title',
                  type: 'text',
                  name: 'title',
                  placeholder: 'Useful phrases in Laputa',
                  dir: 'auto',
                  autoFocus: true,
                  value: this.state.title,
                  onChange: this.onInputChange
                }),
                React.createElement(
                  'p',
                  { className: 'new author' },
                  this.props.currentUser.username
                ),
                React.createElement(
                  'div',
                  { className: 'descriptionArea' },
                  this.renderVideoDescription(),
                  React.createElement('textarea', {
                    rows: '3',
                    className: 'new description',
                    type: 'text',
                    name: 'description',
                    dir: 'auto',
                    placeholder: 'Describe the contents of your book, Ex: A collection of useful phrases in Laputa, a Swiftian language spoken in Balnibarbi and a number of other islands.',
                    value: this.state.description,
                    onChange: this.onInputChange
                  })
                )
              )
            ),
            React.createElement(
              'section',
              { className: 'new dictionary' },
              React.createElement(DummyContent, null),
              React.createElement(
                'button',
                { className: 'startBook', type: 'submit' },
                'Create Book'
              )
            )
          )
        )
      );
    }
  }]);

  return NewBook;
}(React.Component);

NewBook.propTypes = {
  currentUser: React.PropTypes.shape({
    created_at: React.PropTypes.string,
    email: React.PropTypes.string,
    favorite_books: React.PropTypes.array,
    id: React.PropTypes.number,
    username: React.PropTypes.string
  }),
  logo: React.PropTypes.string,
  detail: React.PropTypes.string,
  search: React.PropTypes.string,
  unstar: React.PropTypes.string,
  cardinality: React.PropTypes.string,
  menuAlt: React.PropTypes.string
};

/***/ })

/******/ });
//# sourceMappingURL=NewBook-97b437c586fa81a71696.js.map