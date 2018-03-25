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
/******/ 	return __webpack_require__(__webpack_require__.s = 30);
/******/ })
/************************************************************************/
/******/ ({

/***/ 30:
/*!*******************************************************!*\
  !*** ./app/javascript/packs/react/Dictionary.es6.jsx ***!
  \*******************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Dictionary = function (_React$Component) {
  _inherits(Dictionary, _React$Component);

  function Dictionary(props) {
    _classCallCheck(this, Dictionary);

    var _this = _possibleConstructorReturn(this, (Dictionary.__proto__ || Object.getPrototypeOf(Dictionary)).call(this, props));

    _this.state = {
      isPhraseInputActive: false,
      isTargetInputActive: false,
      isContinuousInputActive: false,
      isInputVideo: false,
      isVideoRecording: false,
      phrasePairs: _this.props.initialPhrasePairs,
      sourcePhrase: '',
      targetPhrase: '',
      stream: '',
      isVideoNotAvailable: true
    };
    _this.onAddNewPhraseButtonClick = _this.onAddNewPhraseButtonClick.bind(_this);
    _this.onSourcePhraseChange = _this.onSourcePhraseChange.bind(_this);
    _this.onSourcePhraseSubmit = _this.onSourcePhraseSubmit.bind(_this);
    _this.onSourceVideoSubmit = _this.onSourceVideoSubmit.bind(_this);
    _this.onTargetPhraseChange = _this.onTargetPhraseChange.bind(_this);
    _this.onTargetPhraseSubmit = _this.onTargetPhraseSubmit.bind(_this);
    _this.onTargetVideoSubmit = _this.onTargetVideoSubmit.bind(_this);
    _this.onDeletePhrasePair = _this.onDeletePhrasePair.bind(_this);
    _this.onCancelEditPhrase = _this.onCancelEditPhrase.bind(_this);
    _this.onToggleInputType = _this.onToggleInputType.bind(_this);
    _this.onCloseVideoComponent = _this.onCloseVideoComponent.bind(_this);
    _this.onStopRecordingClick = _this.onStopRecordingClick.bind(_this);
    _this.onStartRecordingClick = _this.onStartRecordingClick.bind(_this);
    _this.onRenderVideoInput = _this.onRenderVideoInput.bind(_this);
    _this.onSaveStream = _this.onSaveStream.bind(_this);
    _this.onStopStream = _this.onStopStream.bind(_this);
    _this.onClearStream = _this.onClearStream.bind(_this);
    _this.renderPhrasePairs = _this.renderPhrasePairs.bind(_this);
    _this.renderPreSourcePhrase = _this.renderPreSourcePhrase.bind(_this);
    _this.renderCreateNewPhraseButton = _this.renderCreateNewPhraseButton.bind(_this);
    _this.renderPhraseInputFields = _this.renderPhraseInputFields.bind(_this);
    _this.renderTargetInput = _this.renderTargetInput.bind(_this);
    _this.renderInputOptions = _this.renderInputOptions.bind(_this);
    _this.renderVideoInput = _this.renderVideoInput.bind(_this);
    _this.renderInputMethod = _this.renderInputMethod.bind(_this);
    _this.onSaveEditPhrase = _this.onSaveEditPhrase.bind(_this);
    return _this;
  }

  _createClass(Dictionary, [{
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      if (this.refs.sourceInput) {
        this.refs.sourceInput.blur();
      }
      if (this.refs.targetInput) {
        this.refs.targetInput.blur();
      }
      if (this.state.isPhraseInputActive && this.refs.sourceInput && !this.props.isEditingBook) {
        this.refs.sourceInput.focus();
      }
      if (this.state.isTargetInputActive && this.refs.targetInput && !this.props.isEditingBook) {
        this.refs.targetInput.focus();
      }
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(newProps) {
      this.setState({ phrasePairs: newProps.initialPhrasePairs });
    }
  }, {
    key: 'onAddNewPhraseButtonClick',
    value: function onAddNewPhraseButtonClick(props) {
      this.setState({ isPhraseInputActive: true });
    }
  }, {
    key: 'onSourcePhraseChange',
    value: function onSourcePhraseChange(e) {
      this.setState({ sourcePhrase: e.target.value });
    }
  }, {
    key: 'onSourcePhraseSubmit',
    value: function onSourcePhraseSubmit(e) {
      e.preventDefault();
      if (this.state.sourcePhrase) {
        this.props.onSourcePhraseSubmit(this.state.sourcePhrase);
        this.setState({
          isTargetInputActive: !this.state.isTargetInputActive,
          sourcePhrase: ''
        });
      } else {
        alert("Source phrase is empty");
      }
    }
  }, {
    key: 'onSourceVideoSubmit',
    value: function onSourceVideoSubmit(video) {
      this.setState({ sourcePhrase: video });
      if (this.state.sourcePhrase) {
        this.props.onSourcePhraseSubmit(this.state.sourcePhrase, this.state.isPhraseInputActive), this.setState({
          isTargetInputActive: !this.state.isTargetInputActive,
          sourcePhrase: ''
        });
      } else {
        bootbox.alert({
          message: 'Source phrase is empty',
          closeButton: false
        });
      }
    }
  }, {
    key: 'onTargetPhraseChange',
    value: function onTargetPhraseChange(e) {
      this.setState({ targetPhrase: e.target.value });
    }
  }, {
    key: 'onTargetPhraseSubmit',
    value: function onTargetPhraseSubmit(e) {
      e.preventDefault();
      if (this.state.targetPhrase) {
        this.props.onTargetPhraseSubmit(this.state.targetPhrase), this.setState({
          isTargetInputActive: !this.state.isTargetInputActive,
          targetPhrase: ''
        });
      } else {
        bootbox.alert({
          message: 'Target phrase is empty',
          closeButton: false
        });
      }
    }
  }, {
    key: 'onTargetVideoSubmit',
    value: function onTargetVideoSubmit(video) {
      this.setState({ targetPhrase: video });
      if (this.state.targetPhrase) {
        this.props.onTargetPhraseSubmit(this.state.targetPhrase), this.setState({
          isPhraseInputActive: !this.state.isPhraseInputActive,
          isTargetInputActive: !this.state.isTargetInputActive,
          targetPhrase: ''
        });
      } else {
        bootbox.alert({
          message: 'Target phrase is empty',
          closeButton: false
        });
      }
    }
  }, {
    key: 'onTargetPhraseMultipleSubmit',
    value: function onTargetPhraseMultipleSubmit(e) {
      e.preventDefault();
      this.props.onTargetPhraseSubmit(this.state.targetPhrase), this.setState({
        isTargetInputActive: !this.state.isTargetInputActive,
        targetPhrase: ""
      });
    }
  }, {
    key: 'onContinuousInputClick',
    value: function onContinuousInputClick() {
      this.setState({
        isContinuousInputActive: !this.state.isContinuousInputActive
      });
    }
  }, {
    key: 'onDeletePhrasePair',
    value: function onDeletePhrasePair(phrasePairId) {
      var _this2 = this;

      bootbox.confirm({
        message: 'Are you sure you want to delete this phrase?',
        closeButton: false,
        callback: function callback(result) {
          if (result === true) {
            $.ajax({
              url: '/phrase_pairs/' + phrasePairId,
              type: 'DELETE',
              success: function (response) {
                var phrasePairs = this.state.phrasePairs;
                var indexToRemove = _.findIndex(phrasePairs, function (phrasePair) {
                  return phrasePair.id == response.id;
                });
                phrasePairs.splice(indexToRemove, 1);
                this.setState({ phrasePairs: phrasePairs });
              }.bind(_this2),
              error: function error() {
                console.log('Error: Could not delete phrase pair');
              }
            });
          }
        }
      });
    }
  }, {
    key: 'onSaveEditPhrase',
    value: function onSaveEditPhrase(phrasePairId, sourcePhrase, targetPhrase) {
      var phrasePairs = this.state.phrasePairs;

      for (var i = 0; i < phrasePairs.length; i++) {
        if (phrasePairs[i]['id'] == phrasePairId) {
          phrasePairs[i]['source_phrase'] = sourcePhrase;
          phrasePairs[i]['target_phrase'] = targetPhrase;
          break;
        }
      }
      this.setState({ phrasePairs: phrasePairs });
    }
  }, {
    key: 'onCancelEditPhrase',
    value: function onCancelEditPhrase() {
      var phrasePairs = this.state.phrasePairs;
      if (this.state.isTargetInputActive) {
        phrasePairs.splice(-1, 1);
      }
      this.setState({
        phrasePairs: phrasePairs,
        isTargetInputActive: false,
        isPhraseInputActive: false,
        isInputVideo: false,
        isVideoRecording: false,
        sourcePhrase: "",
        targetPhrase: ""
      });

      if (this.state.stream !== '') {
        this.onStopStream();
      }
    }

    // Video Zone

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
    key: 'onStopRecordingClick',
    value: function onStopRecordingClick() {
      this.setState({ isVideoRecording: !this.state.isVideoRecording });
    }
  }, {
    key: 'onStartRecordingClick',
    value: function onStartRecordingClick() {
      this.setState({ isVideoRecording: !this.state.isVideoRecording });
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

    // Render Zone

  }, {
    key: 'renderPhrasePairs',
    value: function renderPhrasePairs() {
      var _this3 = this;

      return this.state.phrasePairs.map(function (phrasePair, index) {
        if (_this3.props.isNewPhrase) {
          return React.createElement(PhrasePair, {
            id: phrasePair.id,
            isOwnedByCurrentUser: _this3.props.isOwnedByCurrentUser,
            initialSourcePhrase: phrasePair.source_phrase,
            initialTargetPhrase: phrasePair.target_phrase,
            key: index,
            onDeletePhrasePair: _this3.onDeletePhrasePair,
            menu: _this3.props.menu,
            flip: _this3.props.flip,
            save: _this3.props.save,
            'delete': _this3.props.delete,
            edit: _this3.props.edit,
            close: _this3.props.close,
            newPhrase: 'newPhrase' });
        }
        return React.createElement(PhrasePair, {
          id: phrasePair.id,
          isOwnedByCurrentUser: _this3.props.isOwnedByCurrentUser,
          initialSourcePhrase: phrasePair.source_phrase,
          initialTargetPhrase: phrasePair.target_phrase,
          key: index,
          onDeletePhrasePair: _this3.onDeletePhrasePair,
          onSaveEditPhrase: _this3.onSaveEditPhrase,
          menu: _this3.props.menu,
          flip: _this3.props.flip,
          save: _this3.props.save,
          'delete': _this3.props.delete,
          edit: _this3.props.edit,
          close: _this3.props.close
        });
      });
    }
  }, {
    key: 'renderPreSourcePhrase',
    value: function renderPreSourcePhrase() {
      if (this.state.isPhraseInputActive == true && this.state.isTargetInputActive == false) {
        return React.createElement(
          'li',
          { className: 'entry pre' },
          React.createElement(
            'ul',
            null,
            React.createElement(
              'li',
              { className: 'source' },
              React.createElement(
                'p',
                null,
                React.createElement(Progress, null)
              )
            ),
            React.createElement(
              'li',
              { className: 'target' },
              React.createElement('p', null)
            )
          )
        );
      }
      if (this.state.isPhraseInputActive == false && this.state.phrasePairs.length == 0) {
        return React.createElement(DummyContent, null);
      }
    }
  }, {
    key: 'renderCreateNewPhraseButton',
    value: function renderCreateNewPhraseButton() {
      if (this.props.isOwnedByCurrentUser) {
        if (this.state.isPhraseInputActive) {
          if (this.state.isInputVideo) {} else {
            return React.createElement(
              'div',
              null,
              this.renderPhraseInputFields()
            );
          }
          return React.createElement(
            'div',
            null,
            this.renderPhraseInputFields()
          );
        }
        return React.createElement(
          'button',
          { className: 'addPhrase', onClick: this.onAddNewPhraseButtonClick },
          '+'
        );
      }
    }
  }, {
    key: 'renderPhraseInputFields',
    value: function renderPhraseInputFields() {
      if (this.state.isTargetInputActive) {
        return React.createElement(
          'div',
          null,
          this.renderInputMethod(),
          this.renderTargetInput()
        );
      }
      return React.createElement(
        'div',
        null,
        this.renderInputMethod(),
        React.createElement(
          'form',
          { className: 'newPhrase', onSubmit: this.onSourcePhraseSubmit },
          React.createElement('input', {
            ref: 'sourceInput',
            value: this.state.sourcePhrase,
            onChange: this.onSourcePhraseChange,
            className: 'sourcePhrase input',
            type: 'text',
            placeholder: this.props.sourceLanguage + " phrase" }),
          React.createElement(
            'button',
            { className: 'savePhrase' },
            'Save'
          )
        )
      );
    }
  }, {
    key: 'renderTargetInput',
    value: function renderTargetInput() {
      return React.createElement(
        'form',
        {
          className: 'newPhrase',
          onSubmit: this.onTargetPhraseSubmit },
        React.createElement('input', {
          ref: 'targetInput',
          value: this.state.targetPhrase,
          onChange: this.onTargetPhraseChange,
          className: 'targetPhrase input',
          type: 'text',
          dir: 'auto',
          placeholder: this.props.targetLanguage + " phrase" }),
        React.createElement(
          'button',
          { className: 'savePhrase' },
          ' Save '
        )
      );
    }
  }, {
    key: 'renderInputOptions',
    value: function renderInputOptions() {
      if (!this.state.isInputVideo) {
        var videoButtonClass = 'video icon' + this.state.videoButtonClass;
        return React.createElement(
          'span',
          { className: 'inputOptions' },
          React.createElement(
            'button',
            { title: 'Text', className: 'text icon selectedInput' },
            React.createElement('img', { src: this.props.text, alt: 'text' })
          ),
          React.createElement(
            'button',
            { title: 'Video', onClick: this.onToggleInputType, className: 'video icon' },
            React.createElement('img', { src: this.props.video, alt: 'video' })
          ),
          React.createElement(
            'button',
            { title: 'Cancel', onClick: this.onCancelEditPhrase, className: 'close icon' },
            React.createElement('img', { src: this.props.close, alt: 'close' })
          )
        );
      }
    }
  }, {
    key: 'renderVideoInput',
    value: function renderVideoInput() {
      if (this.state.isInputVideo) {
        return React.createElement(
          'div',
          { ref: 'video' },
          React.createElement(Video, {
            onRenderVideoInput: this.onRenderVideoInput,
            renderRecordButton: this.renderRecordButton,
            onCancelEditPhrase: this.onCancelEditPhrase,
            onCloseVideoComponent: this.onCloseVideoComponent,
            onStartRecordingClick: this.onStartRecordingClick,
            onStopRecordingClick: this.onStopRecordingClick,
            onSourceVideoSubmit: this.onSourceVideoSubmit,
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
            author: this.props.author,
            width: 600,
            videoPhrase: true
          })
        );
      }
    }

    // TODO: Consider the flow of canceling a phrase in progress.

  }, {
    key: 'renderInputMethod',
    value: function renderInputMethod() {
      return React.createElement(
        'div',
        { className: 'inputMethod' },
        this.renderInputOptions()
      );
    }
  }, {
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        { className: 'dictionary' },
        React.createElement(
          'ul',
          { className: 'content' },
          this.renderPhrasePairs()
        ),
        this.renderPreSourcePhrase(),
        this.renderVideoInput(),
        !this.state.isInputVideo ? this.renderCreateNewPhraseButton() : !this.renderCreateNewPhraseButton()
      );
    }
  }]);

  return Dictionary;
}(React.Component);

Dictionary.propTypes = {
  initialPhrasePairs: React.PropTypes.arrayOf(React.PropTypes.shape({
    book_id: React.PropTypes.number,
    created_at: React.PropTypes.string,
    id: React.PropTypes.number,
    source_phrase: React.PropTypes.string,
    target_phrase: React.PropTypes.string,
    updated_at: React.PropTypes.string
  })),
  onSourcePhraseSubmit: React.PropTypes.func,
  onTargetPhraseSubmit: React.PropTypes.func,
  isOwnedByCurrentUser: React.PropTypes.bool,
  menu: React.PropTypes.string,
  flip: React.PropTypes.string,
  save: React.PropTypes.string,
  delete: React.PropTypes.string,
  edit: React.PropTypes.string,
  close: React.PropTypes.string
};

/***/ })

/******/ });
//# sourceMappingURL=Dictionary-7d89019de5e19cae1be0.js.map