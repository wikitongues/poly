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
/******/ 	return __webpack_require__(__webpack_require__.s = 28);
/******/ })
/************************************************************************/
/******/ ({

/***/ 28:
/*!*************************************************!*\
  !*** ./app/javascript/packs/react/Book.es6.jsx ***!
  \*************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Book = function (_React$Component) {
  _inherits(Book, _React$Component);

  function Book(props) {
    _classCallCheck(this, Book);

    var _this = _possibleConstructorReturn(this, (Book.__proto__ || Object.getPrototypeOf(Book)).call(this, props));

    _this.state = {
      phrasePairs: _this.props.initialPhrasePairs,
      isEditingBook: false,
      book: _this.props.initialBook,
      isDescriptionTruncated: true,
      isFavoriteBook: _this.isFavoriteBook(),
      errors: [],
      isNewPhrase: false,
      isDescriptionPlaying: false,
      isInputVideo: false,
      stream: '',
      isVideoRecording: false
    };
    _this.onSourcePhraseSubmit = _this.onSourcePhraseSubmit.bind(_this);
    _this.onTargetPhraseSubmit = _this.onTargetPhraseSubmit.bind(_this);
    _this.saveNewPhrasePair = _this.saveNewPhrasePair.bind(_this);
    _this.onDeleteBookClick = _this.onDeleteBookClick.bind(_this);
    _this.onSaveBookClick = _this.onSaveBookClick.bind(_this);
    _this.onSaveBookKeyDown = _this.onSaveBookKeyDown.bind(_this);
    _this.onInvertLanguagesClick = _this.onInvertLanguagesClick.bind(_this);
    _this.toggleEditingBookState = _this.toggleEditingBookState.bind(_this);
    _this.cancelEditingBookState = _this.cancelEditingBookState.bind(_this);
    _this.onInputChange = _this.onInputChange.bind(_this);
    _this.onClickFavoriteBook = _this.onClickFavoriteBook.bind(_this);
    _this.destroyFavorite = _this.destroyFavorite.bind(_this);
    _this.createFavorite = _this.createFavorite.bind(_this);
    _this.toggleFavoriteBook = _this.toggleFavoriteBook.bind(_this);
    _this.bookIsOwnedByCurrentUser = _this.bookIsOwnedByCurrentUser.bind(_this);
    _this.renderBookMenu = _this.renderBookMenu.bind(_this);
    _this.renderTitle = _this.renderTitle.bind(_this);
    _this.renderAuthor = _this.renderAuthor.bind(_this);
    _this.truncateText = _this.truncateText.bind(_this);
    _this.renderTruncatedDescription = _this.renderTruncatedDescription.bind(_this);
    _this.renderDescription = _this.renderDescription.bind(_this);
    _this.renderSourceLanguage = _this.renderSourceLanguage.bind(_this);
    _this.renderTargetLanguage = _this.renderTargetLanguage.bind(_this);
    _this.favoriteImage = _this.favoriteImage.bind(_this);
    _this.isFavoriteBook = _this.isFavoriteBook.bind(_this);
    _this.renderFavoriteButton = _this.renderFavoriteButton.bind(_this);
    // video
    _this.onToggleInputType = _this.onToggleInputType.bind(_this);
    _this.onSaveStream = _this.onSaveStream.bind(_this);
    _this.onStopStream = _this.onStopStream.bind(_this);
    _this.onClearStream = _this.onClearStream.bind(_this);
    _this.onStopRecordingClick = _this.onStopRecordingClick.bind(_this);
    _this.onStartRecordingClick = _this.onStartRecordingClick.bind(_this);
    _this.onRenderVideoInput = _this.onRenderVideoInput.bind(_this);
    _this.playButton = _this.playButton.bind(_this);
    _this.pauseButton = _this.pauseButton.bind(_this);
    _this.onDeleteVideoDescription = _this.onDeleteVideoDescription.bind(_this);
    _this.onCloseVideoComponent = _this.onCloseVideoComponent.bind(_this);
    _this.onDescriptionVideoSubmit = _this.onDescriptionVideoSubmit.bind(_this);
    return _this;
  }

  _createClass(Book, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      document.addEventListener('keydown', this.onSaveBookKeyDown, false);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      document.removeEventListener('keydown', this.onSaveBookKeyDown, false);
    }
  }, {
    key: 'onSourcePhraseSubmit',
    value: function onSourcePhraseSubmit(sourcePhrase, isNewPhrase) {
      if (isNewPhrase) {
        this.setState({ isNewPhrase: true });
      }
      var newPhrasePair = { source_phrase: sourcePhrase };
      var newPhrasePairs = this.state.phrasePairs;
      newPhrasePairs.push(newPhrasePair);
      this.setState({ phrasePairs: newPhrasePairs });
    }
  }, {
    key: 'onTargetPhraseSubmit',
    value: function onTargetPhraseSubmit(targetPhrase) {
      var newPhrasePairs = this.state.phrasePairs;
      var newPhrasePair = newPhrasePairs[newPhrasePairs.length - 1];
      newPhrasePair.target_phrase = targetPhrase;
      this.setState({ phrasePairs: newPhrasePairs });
      this.saveNewPhrasePair(newPhrasePair);
    }
  }, {
    key: 'saveNewPhrasePair',
    value: function saveNewPhrasePair(phrasePair) {
      $.ajax({
        url: '/phrase_pairs',
        type: 'POST',
        data: {
          book_id: this.state.book.id,
          phrase_pair: phrasePair
        },
        success: function (phrasePair) {
          var newPhrasePairs = this.state.phrasePairs;
          newPhrasePairs.splice(this.state.phrasePairs.length - 1, 1, phrasePair.phrase_pair);
          this.setState({ phrasePairs: newPhrasePairs });
        }.bind(this),
        error: function error() {
          console.log('Error: Save action failed');
        }
      });
    }
  }, {
    key: 'onDeleteBookClick',
    value: function onDeleteBookClick() {
      var id = this.state.book.id;
      bootbox.confirm({
        message: 'Are you sure you want to delete this book?',
        closeButton: false,
        callback: function callback(result) {
          if (result === true) {
            $.ajax({
              url: '/books/' + id,
              type: 'DELETE',
              success: function success() {
                window.location.href = '/dashboard';
              }
            });
          }
        }
      });
    }
  }, {
    key: 'onSaveBookKeyDown',
    value: function onSaveBookKeyDown(event) {
      var returnKeyCode = 13;
      if (event.keyCode == returnKeyCode && this.state.isEditingBook) {
        this.onSaveBookClick();
      }
    }
  }, {
    key: 'onSaveBookClick',
    value: function onSaveBookClick() {
      this.state.errors = [];
      this.state.book.source_language = this.state.book.source_language_draft;
      this.state.book.target_language = this.state.book.target_language_draft;
      this.state.book.title = this.state.book.title_draft;
      this.state.book.description = this.state.book.description_draft;
      if (this.state.book.title && this.state.book.source_language && this.state.book.target_language) {
        $.ajax({
          url: '/books/' + this.state.book.id,
          type: 'PUT',
          data: { book: this.state.book },
          success: function () {
            this.cancelEditingBookState();
          }.bind(this),
          error: function error(_error) {
            printErrors(_error);
          }
        });
      } else {
        if (!this.state.book.title) this.state.errors.push(' Title');
        if (!this.state.book.source_language) this.state.errors.push(" Source language");
        if (!this.state.book.target_language) this.state.errors.push(" Target language");
        bootbox.alert({
          message: 'Your book is missing the following required details:' + this.state.errors,
          closeButton: false
        });
      }
    }
  }, {
    key: 'onInvertLanguagesClick',
    value: function onInvertLanguagesClick() {
      var newBook = this.state.book;
      var newState = this.state;

      var sourceLanguageDraft = this.state.book.source_language_draft;
      var targetLanguageDraft = this.state.book.target_language_draft;

      newBook.source_language_draft = targetLanguageDraft;
      newBook.target_language_draft = sourceLanguageDraft;

      newState.book = newBook;
      this.setState(newState);
    }
  }, {
    key: 'toggleEditingBookState',
    value: function toggleEditingBookState() {
      var modBook = this.state.book;
      modBook.title_draft = modBook.title;
      modBook.description_draft = modBook.description;
      modBook.source_language_draft = modBook.source_language;
      modBook.target_language_draft = modBook.target_language;
      this.setState({
        isEditingBook: true,
        book: modBook
      });
    }
  }, {
    key: 'cancelEditingBookState',
    value: function cancelEditingBookState() {
      this.setState({ isEditingBook: false });
    }
  }, {
    key: 'onInputChange',
    value: function onInputChange(e) {
      var newBook = this.state.book;
      var newState = this.state;

      newBook[e.target.name] = e.target.value;
      newState.book = newBook;
      this.setState(newState);
    }
  }, {
    key: 'onClickFavoriteBook',
    value: function onClickFavoriteBook() {
      if (this.state.isFavoriteBook) {
        this.destroyFavorite();
      } else {
        this.createFavorite();
      }
    }
  }, {
    key: 'destroyFavorite',
    value: function destroyFavorite() {
      $.ajax({
        url: '/favorites/' + this.state.book.id,
        type: 'DELETE',
        success: function () {
          this.toggleFavoriteBook();
        }.bind(this),
        error: function error() {
          console.log('something went wrong');
        }
      });
    }
  }, {
    key: 'createFavorite',
    value: function createFavorite() {
      $.ajax({
        url: '/favorites',
        type: 'POST',
        data: {
          book_id: this.state.book.id
        },
        success: function () {
          this.toggleFavoriteBook();
        }.bind(this),
        error: function error() {
          console.log('something went wrong');
        }
      });
    }
  }, {
    key: 'toggleFavoriteBook',
    value: function toggleFavoriteBook() {
      this.setState({ isFavoriteBook: !this.state.isFavoriteBook });
    }
  }, {
    key: 'bookIsOwnedByCurrentUser',
    value: function bookIsOwnedByCurrentUser() {
      if (this.props.currentUser) {
        return this.props.initialBook.user_id == this.props.currentUser.id;
      }
    }
  }, {
    key: 'renderBookMenu',
    value: function renderBookMenu() {
      if (this.bookIsOwnedByCurrentUser()) {
        if (this.state.isEditingBook) {
          return React.createElement(
            'div',
            { className: 'menu saving' },
            React.createElement(
              'button',
              {
                title: 'Flip',
                onClick: this.onInvertLanguagesClick,
                className: 'icon' },
              React.createElement('img', { src: this.props.flipAlt })
            ),
            React.createElement(
              'button',
              {
                title: 'Save',
                onClick: this.onSaveBookClick,
                className: 'icon' },
              React.createElement('img', { src: this.props.saveAlt, alt: 'Save' })
            ),
            React.createElement(
              'button',
              {
                title: 'Cancel',
                onClick: this.cancelEditingBookState,
                className: 'close icon' },
              React.createElement('img', { src: this.props.closeAlt })
            )
          );
        }
        return React.createElement(
          'div',
          { className: 'menu' },
          React.createElement(
            'button',
            { title: 'Menu', className: 'more icon' },
            React.createElement('img', { src: this.props.menuAlt, alt: 'Menu' })
          ),
          React.createElement(
            'button',
            {
              title: 'Edit',
              onClick: this.toggleEditingBookState,
              className: 'icon',
              tabIndex: '-1'
            },
            React.createElement('img', { src: this.props.editAlt, alt: 'Edit' })
          ),
          React.createElement(
            'button',
            {
              title: 'Delete',
              onClick: this.onDeleteBookClick,
              className: 'icon',
              tabIndex: '-1'
            },
            React.createElement('img', { src: this.props.deleteAlt, alt: 'Delete' })
          )
        );
      }
    }
  }, {
    key: 'renderTitle',
    value: function renderTitle() {
      if (this.state.isEditingBook) {
        return React.createElement('input', {
          name: 'title_draft',
          className: 'title new isEditing',
          dir: 'auto',
          onChange: this.onInputChange,
          value: this.state.book.title_draft
        });
      }
      return React.createElement(
        'h1',
        { title: this.state.book.title },
        this.state.book.title
      );
    }
  }, {
    key: 'renderAuthor',
    value: function renderAuthor() {
      var users = this.props.users;
      var authorName = '';
      for (var i = users.length - 1; i >= 0; i--) {
        if (this.props.initialBook.user_id == users[i].id) {
          authorName = users[i].username;
        }
      }

      if (this.bookIsOwnedByCurrentUser()) {
        if (this.state.isEditingBook) {
          return React.createElement(
            'p',
            { className: 'author' },
            authorName
          );
        }
        return React.createElement(
          'a',
          { href: "/dashboard", className: 'author' },
          authorName
        );
      }
      return React.createElement(
        'a',
        { href: '/users/' + this.state.book.user_id, className: 'author' },
        authorName
      );
    }
  }, {
    key: 'truncateText',
    value: function truncateText() {
      this.setState({ isDescriptionTruncated: !this.state.isDescriptionTruncated });
    }
  }, {
    key: 'renderTruncatedDescription',
    value: function renderTruncatedDescription() {
      if (this.state.book.description.length >= 132) {
        if (this.state.isDescriptionTruncated) {
          return React.createElement(
            'p',
            { className: 'description' },
            this.state.book.description.substring(0, 132),
            '...',
            React.createElement(
              'button',
              { onClick: this.truncateText },
              'More'
            )
          );
        }
        return React.createElement(
          'p',
          { className: 'description' },
          this.state.book.description,
          React.createElement(
            'button',
            { onClick: this.truncateText },
            'Less'
          )
        );
      }
      return React.createElement(
        'p',
        { className: 'description' },
        this.state.book.description
      );
    }

    //  VIDEO

  }, {
    key: 'renderVideoDescription',
    value: function renderVideoDescription() {
      if (this.state.isInputVideo == false) {
        if (this.state.book.video_description) {
          if (this.state.isEditingBook) {
            return React.createElement(
              'div',
              { className: 'videoDescription' },
              React.createElement(
                'div',
                { className: 'videoComponent' },
                React.createElement('video', { src: this.state.book.video_description, loop: true, width: '600' }),
                React.createElement(
                  'div',
                  { className: 'videoControls' },
                  this.renderPlayButton(),
                  React.createElement(
                    'button',
                    { type: 'button', title: 'Remove video', onClick: this.onDeleteVideoDescription, className: 'text icon' },
                    React.createElement('img', { src: this.props.deleteAlt, alt: 'close' })
                  )
                )
              )
            );
          } else {
            return React.createElement(
              'div',
              { className: 'videoDescription' },
              React.createElement(
                'div',
                { className: 'videoComponent' },
                React.createElement('video', { src: this.state.book.video_description, loop: true, width: '600' }),
                React.createElement(
                  'div',
                  { className: 'videoControls' },
                  this.renderPlayButton()
                )
              )
            );
          }
        } else {
          if (this.state.isEditingBook) {
            return React.createElement(
              'button',
              { type: 'button', title: 'Add a video introduction', onClick: this.onToggleInputType, className: 'addVideoButton' },
              'Add a video introduction'
            );
          }
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
          'button',
          { className: 'play descriptionVideoPause', type: 'button', onClick: this.pauseButton, title: 'Pause' },
          React.createElement('img', { src: this.props.pause })
        );
      } else {
        return React.createElement(
          'button',
          { type: 'button', onClick: this.playButton, title: 'Play', className: 'play' },
          React.createElement('img', { src: this.props.play })
        );
      }
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
    key: 'onDeleteVideoDescription',
    value: function onDeleteVideoDescription() {
      var newBook = this.state.book;
      var newState = this.state;

      newBook.video_description = "";
      newState.book = newBook;
      this.setState(newState);
    }
  }, {
    key: 'onToggleInputType',
    value: function onToggleInputType() {
      this.setState({ isInputVideo: !this.state.isInputVideo });
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
    key: 'onStartRecordingClick',
    value: function onStartRecordingClick() {
      this.setState({ isVideoRecording: !this.state.isVideoRecording });
    }
  }, {
    key: 'onStopRecordingClick',
    value: function onStopRecordingClick() {
      this.setState({ isVideoRecording: !this.state.isVideoRecording, hasVideoDescription: true });
    }
  }, {
    key: 'onSaveStream',
    value: function onSaveStream(stream) {
      this.setState({ stream: stream });
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
      var newBook = this.state.book;
      var newState = this.state;

      newBook.video_description = video;
      newState.book = newBook;
      this.setState(newState);
    }

    // END VIDEO

  }, {
    key: 'renderDescription',
    value: function renderDescription() {
      if (this.state.book.description) {
        if (this.state.isEditingBook) {
          return React.createElement('textarea', {
            rows: '4',
            className: 'description new isEditing',
            name: 'description_draft',
            dir: 'auto',
            onChange: this.onInputChange,
            value: this.state.book.description_draft
          });
        } else {
          return React.createElement(
            'span',
            null,
            this.renderTruncatedDescription()
          );
        }
      } else {
        if (this.state.isEditingBook) {
          return React.createElement('textarea', {
            rows: '4',
            className: 'description new isEditing',
            name: 'description_draft',
            dir: 'auto',
            onChange: this.onInputChange,
            value: this.state.book.description_draft,
            placeholder: 'Describe the contents of your book, Ex: A collection of useful phrases in Laputa, a Swiftian language spoken in Balnibarbi and a number of other islands...'
          });
        }
      }
    }
  }, {
    key: 'renderSourceLanguage',
    value: function renderSourceLanguage() {
      if (this.state.isEditingBook) {
        return React.createElement('input', {
          className: 'new isEditing',
          name: 'source_language_draft',
          onChange: this.onInputChange,
          value: this.state.book.source_language_draft
        });
      }
      return React.createElement(
        'h1',
        { className: 'language source', title: this.state.book.source_language },
        this.state.book.source_language
      );
    }
  }, {
    key: 'renderTargetLanguage',
    value: function renderTargetLanguage() {
      if (this.state.isEditingBook) {
        return React.createElement('input', {
          className: 'new isEditing',
          name: 'target_language_draft',
          onChange: this.onInputChange,
          value: this.state.book.target_language_draft
        });
      }
      return React.createElement(
        'h1',
        { className: 'language target', title: this.state.book.target_language },
        this.state.book.target_language
      );
    }
  }, {
    key: 'favoriteImage',
    value: function favoriteImage() {
      return this.state.isFavoriteBook ? this.props.star : this.props.unstar;
    }
  }, {
    key: 'isFavoriteBook',
    value: function isFavoriteBook() {
      var _this2 = this;

      if (this.props.currentUser) {
        return this.props.currentUser.favorite_books.filter(function (favorite) {
          return favorite.book_id == _this2.props.initialBook.id;
        }).length > 0;
      }
    }
  }, {
    key: 'renderFavoriteButton',
    value: function renderFavoriteButton() {
      if (this.props.currentUser) {
        return React.createElement(
          'button',
          { title: 'Favorite', onClick: this.onClickFavoriteBook, className: 'favorite icon' },
          React.createElement('img', { src: this.favoriteImage(), alt: 'Favorite' })
        );
      }
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
            'div',
            { className: 'tools' },
            this.renderFavoriteButton(),
            React.createElement(
              'div',
              { className: 'cardinality' },
              React.createElement(
                'section',
                null,
                this.renderSourceLanguage(),
                React.createElement('img', { src: this.props.cardinality, alt: 'Cardinality' }),
                this.renderTargetLanguage()
              )
            ),
            this.renderBookMenu()
          ),
          React.createElement(
            'div',
            { className: 'info' },
            React.createElement(
              'div',
              { className: 'wrapper', dir: 'auto' },
              this.renderTitle(),
              this.renderAuthor(),
              this.renderVideoDescription(),
              this.renderDescription()
            )
          ),
          React.createElement('div', { className: 'NObannerWrapper' }),
          React.createElement(Dictionary, {
            isOwnedByCurrentUser: this.bookIsOwnedByCurrentUser(),
            initialPhrasePairs: this.state.phrasePairs,
            onSourcePhraseSubmit: this.onSourcePhraseSubmit,
            onTargetPhraseSubmit: this.onTargetPhraseSubmit,
            isEditingBook: this.state.isEditingBook,
            menu: this.props.menu,
            flip: this.props.flip,
            save: this.props.save,
            'delete': this.props.delete,
            edit: this.props.edit,
            text: this.props.text,
            textAlt: this.props.textAlt,
            video: this.props.video,
            videoAlt: this.props.videoAlt,
            close: this.props.close,
            closeAlt: this.props.closeAlt,
            sourceLanguage: this.state.book.source_language,
            targetLanguage: this.state.book.target_language,
            author: this.state.book.user_id,
            isNewPhrase: this.state.isNewPhrase
          })
        )
      );
    }
  }]);

  return Book;
}(React.Component);

Book.propTypes = {
  initialPhrasePairs: React.PropTypes.arrayOf(React.PropTypes.shape({
    book_id: React.PropTypes.number,
    created_at: React.PropTypes.string,
    id: React.PropTypes.number,
    source_phrase: React.PropTypes.string,
    target_phrase: React.PropTypes.string,
    updated_at: React.PropTypes.string
  })),
  initialBook: React.PropTypes.shape({
    created_at: React.PropTypes.string,
    description: React.PropTypes.string,
    id: React.PropTypes.number,
    source_language: React.PropTypes.string,
    target_language: React.PropTypes.string,
    title: React.PropTypes.string,
    updated_at: React.PropTypes.string,
    user_id: React.PropTypes.number
  }),
  currentUser: React.PropTypes.shape({
    created_at: React.PropTypes.string,
    email: React.PropTypes.string,
    favorite_books: React.PropTypes.array,
    id: React.PropTypes.number,
    username: React.PropTypes.string
  }),
  flipAlt: React.PropTypes.string,
  saveAlt: React.PropTypes.string,
  closeAlt: React.PropTypes.string,
  menuAlt: React.PropTypes.string,
  editAlt: React.PropTypes.string,
  deleteAlt: React.PropTypes.string,
  users: React.PropTypes.arrayOf(React.PropTypes.shape({
    created_at: React.PropTypes.string,
    email: React.PropTypes.string,
    favorite_books: React.PropTypes.array,
    id: React.PropTypes.number,
    username: React.PropTypes.string
  })),
  star: React.PropTypes.string,
  unstar: React.PropTypes.string,
  logo: React.PropTypes.string,
  detail: React.PropTypes.string,
  search: React.PropTypes.string,
  cardinality: React.PropTypes.string,
  menu: React.PropTypes.string,
  flip: React.PropTypes.string,
  save: React.PropTypes.string,
  delete: React.PropTypes.string,
  edit: React.PropTypes.string,
  close: React.PropTypes.string
};

/***/ })

/******/ });
//# sourceMappingURL=Book-86d7e850d5fb50abdbf6.js.map