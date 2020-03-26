class Book extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      phrasePairs: this.props.initialPhrasePairs,
      isEditingBook: false,
      book: this.props.initialBook,
      isDescriptionTruncated: true,
      isFavoriteBook: this.isFavoriteBook(),
      errors: [],
      isNewPhrase: false,
      isDescriptionPlaying: false,
      isInputVideo: false,
      stream: '',
      isVideoRecording: false,
    };
    this.onSourcePhraseSubmit = this.onSourcePhraseSubmit.bind(this);
    this.onTargetPhraseSubmit = this.onTargetPhraseSubmit.bind(this);
    this.saveNewPhrasePair = this.saveNewPhrasePair.bind(this);
    this.onDeleteBookClick = this.onDeleteBookClick.bind(this);
    this.onSaveBookClick = this.onSaveBookClick.bind(this);
    this.onSaveBookKeyDown = this.onSaveBookKeyDown.bind(this);
    this.onInvertLanguagesClick = this.onInvertLanguagesClick.bind(this);
    this.toggleEditingBookState = this.toggleEditingBookState.bind(this);
    this.cancelEditingBookState = this.cancelEditingBookState.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.onClickFavoriteBook = this.onClickFavoriteBook.bind(this);
    this.destroyFavorite = this.destroyFavorite.bind(this);
    this.createFavorite = this.createFavorite.bind(this);
    this.toggleFavoriteBook = this.toggleFavoriteBook.bind(this);
    this.bookIsOwnedByCurrentUser = this.bookIsOwnedByCurrentUser.bind(this);
    this.renderBookMenu = this.renderBookMenu.bind(this);
    this.renderTitle = this.renderTitle.bind(this);
    this.renderAuthor = this.renderAuthor.bind(this);
    this.truncateText = this.truncateText.bind(this);
    this.renderTruncatedDescription = this.renderTruncatedDescription.bind(this);
    this.renderDescription = this.renderDescription.bind(this);
    this.renderSourceLanguage = this.renderSourceLanguage.bind(this);
    this.renderTargetLanguage = this.renderTargetLanguage.bind(this);
    this.favoriteImage = this.favoriteImage.bind(this);
    this.isFavoriteBook = this.isFavoriteBook.bind(this);
    this.renderFavoriteButton = this.renderFavoriteButton.bind(this);
    // video
    this.onToggleInputType = this.onToggleInputType.bind(this);
    this.onSaveStream = this.onSaveStream.bind(this);
    this.onStopStream = this.onStopStream.bind(this);
    this.onClearStream = this.onClearStream.bind(this);
    this.onStopRecordingClick = this.onStopRecordingClick.bind(this);
    this.onStartRecordingClick = this.onStartRecordingClick.bind(this);
    this.onRenderVideoInput = this.onRenderVideoInput.bind(this);
    this.playButton = this.playButton.bind(this);
    this.pauseButton = this.pauseButton.bind(this);
    this.onDeleteVideoDescription = this.onDeleteVideoDescription.bind(this);
    this.onCloseVideoComponent = this.onCloseVideoComponent.bind(this);
    this.onDescriptionVideoSubmit = this.onDescriptionVideoSubmit.bind(this)
  }

  componentWillMount(){
    document.addEventListener('keydown', this.onSaveBookKeyDown, false);
  }

  componentWillUnmount(){
    document.removeEventListener('keydown', this.onSaveBookKeyDown, false);
  }

  onSourcePhraseSubmit(sourcePhrase, isNewPhrase) {
    if (isNewPhrase) {
      this.setState({ isNewPhrase: true });
    }
    const newPhrasePair = { source_phrase: sourcePhrase };
    const newPhrasePairs = this.state.phrasePairs;
    newPhrasePairs.push(newPhrasePair);
    this.setState({ phrasePairs: newPhrasePairs });
  }

  onTargetPhraseSubmit(targetPhrase) {
    const newPhrasePairs = this.state.phrasePairs;
    const newPhrasePair = newPhrasePairs[newPhrasePairs.length - 1];
    newPhrasePair.target_phrase = targetPhrase;
    this.setState({ phrasePairs: newPhrasePairs });
    this.saveNewPhrasePair(newPhrasePair);
  }

  saveNewPhrasePair(phrasePair) {
    $.ajax({
      url: '/phrase_pairs',
      type: 'POST',
      data: {
        book_id: this.state.book.id,
        phrase_pair: phrasePair,
      },
      success: function (phrasePair) {
        const newPhrasePairs = this.state.phrasePairs;
        newPhrasePairs.splice(this.state.phrasePairs.length - 1, 1, phrasePair.phrase_pair);
        this.setState({ phrasePairs: newPhrasePairs });
      }.bind(this),
      error() {
        console.log('Error: Save action failed');
      },
    });
  }

  onDeleteBookClick() {
    const id = this.state.book.id;
    bootbox.confirm({
      message: 'Are you sure you want to delete this book?',
      closeButton: false,
      callback: (result) => {
        if (result === true) {
          $.ajax({
            url: '/books/' + id,
            type: 'DELETE',
            success() {
              window.location.href = '/dashboard';
            },
          });
        }
      },
    });
  }

  onSaveBookKeyDown (event) {
    var returnKeyCode = 13;
    if (event.keyCode == returnKeyCode && this.state.isEditingBook){
      this.onSaveBookClick();
    }
  }

  onSaveBookClick() {
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
        error(error) {
          printErrors(error);
        },
      });
    } else {
      if (!this.state.book.title) this.state.errors.push(' Title');
      if (!this.state.book.source_language) this.state.errors.push(" Source language");
      if (!this.state.book.target_language) this.state.errors.push(" Target language");
      bootbox.alert({
        message: 'Your book is missing the following required details:' + (this.state.errors),
        closeButton: false,
      });
    }
  }

  onInvertLanguagesClick() {
    const newBook = this.state.book;
    const newState = this.state;

    const sourceLanguageDraft = this.state.book.source_language_draft;
    const targetLanguageDraft = this.state.book.target_language_draft;

    newBook.source_language_draft = targetLanguageDraft;
    newBook.target_language_draft = sourceLanguageDraft;

    newState.book = newBook;
    this.setState(newState);
  }

  toggleEditingBookState() {
    const modBook = this.state.book;
    modBook.title_draft = modBook.title;
    modBook.description_draft = modBook.description;
    modBook.source_language_draft = modBook.source_language;
    modBook.target_language_draft = modBook.target_language;
    this.setState({
      isEditingBook: true,
      book: modBook
    });
  }

  cancelEditingBookState() {
    this.setState({ isEditingBook: false });
  }

  onInputChange(e) {
    const newBook = this.state.book;
    const newState = this.state;

    newBook[e.target.name] = e.target.value;
    newState.book = newBook;
    this.setState(newState);
  }

  onClickFavoriteBook() {
    if (this.state.isFavoriteBook) {
      this.destroyFavorite();
    } else {
      this.createFavorite();
    }
  }

  destroyFavorite() {
    $.ajax({
      url: '/favorites/' + this.state.book.id,
      type: 'DELETE',
      success: function () {
        this.toggleFavoriteBook();
      }.bind(this),
      error() {
        console.log('something went wrong');
      },
    });
  }

  createFavorite() {
    $.ajax({
      url: '/favorites',
      type: 'POST',
      data: {
        book_id: this.state.book.id,
      },
      success: function () {
        this.toggleFavoriteBook();
      }.bind(this),
      error() {
        console.log('something went wrong');
      },
    });
  }

  toggleFavoriteBook() {
    this.setState({ isFavoriteBook: !this.state.isFavoriteBook });
  }

  bookIsOwnedByCurrentUser() {
    if (this.props.currentUser) {
      return this.props.initialBook.user_id == this.props.currentUser.id;
    }
  }

  renderBookMenu() {
    if (this.bookIsOwnedByCurrentUser()) {
      if (this.state.isEditingBook) {
        return (
          <div className="menu saving">
            <button
              title="Flip"
              onClick={this.onInvertLanguagesClick}
              className="icon">
              <img src={this.props.flipAlt} />
            </button>
            <button
              title="Save"
              onClick={this.onSaveBookClick}
              className="icon">
              <img src={this.props.saveAlt} alt="Save" />
            </button>
            <button
              title="Cancel"
              onClick={this.cancelEditingBookState}
              className="close icon">
              <img src={this.props.closeAlt}/>
            </button>
          </div>
        );
      }
      return (
        <div className="menu">
          <button title="Menu" className="more icon">
            <img src={this.props.menuAlt} alt="Menu" />
          </button>
          <button
            title="Edit"
            onClick={this.toggleEditingBookState}
            className="icon"
            tabIndex="-1"
          >
            <img src={this.props.editAlt} alt="Edit" />
          </button>
          <button
            title="Delete"
            onClick={this.onDeleteBookClick}
            className="icon"
            tabIndex="-1"
          >
            <img src={this.props.deleteAlt} alt="Delete" />
          </button>
        </div>
      );
    }
  }

  renderTitle() {
    if (this.state.isEditingBook) {
      return (
        <input
          name="title_draft"
          className="title new isEditing"
          dir="auto"
          onChange={this.onInputChange}
          value={this.state.book.title_draft}
        />
      );
    }
    return <h1 title={this.state.book.title}>{this.state.book.title}</h1>;
  }

  renderAuthor() {
    const users = this.props.users;
    let authorName = '';
    for (var i = users.length - 1; i >= 0; i--) {
      if (this.props.initialBook.user_id == users[i].id) {
        authorName = users[i].username;
      }
    }

    if (this.bookIsOwnedByCurrentUser()) {
      if (this.state.isEditingBook) {
        return (
          <p className="author">{authorName}</p>
        );
      }
      return (
        <a href={"/dashboard"} className="author">{authorName}</a>
      );
    }
    return (
      <a href={'/users/' + this.state.book.user_id} className="author">{authorName}</a>
    );
  }

  truncateText() {
    this.setState({ isDescriptionTruncated: !this.state.isDescriptionTruncated });
  }

  renderTruncatedDescription() {
    if (this.state.book.description.length >= 132) {
      if (this.state.isDescriptionTruncated) {
        return (
          <p className="description">
            {this.state.book.description.substring(0, 132)}...
            <button onClick={this.truncateText}>More</button>
          </p>
        );
      }
      return (
        <p className="description">
          {this.state.book.description}
          <button onClick={this.truncateText}>Less</button>
        </p>
      );
    }
    return <p className="description">{this.state.book.description}</p>;
  }


  //  VIDEO

  renderVideoDescription() {
    if (this.state.isInputVideo == false) {
      if (this.state.book.video_description) {
        if (this.state.isEditingBook) {
          return (
            <div className="videoDescription">
              <div className="videoComponent">
                <video src={this.state.book.video_description} loop width="600"></video>
                <div className="videoControls">
                  {this.renderPlayButton()}
                  <button type="button" title="Remove video" onClick={this.onDeleteVideoDescription} className="text icon">
                    <img src={this.props.deleteAlt} alt="close" />
                  </button>
                </div>
              </div>
            </div>
          )
        } else {
          return <div className="videoDescription"><div className="videoComponent"><video src={this.state.book.video_description} loop width="600"></video><div className="videoControls">{this.renderPlayButton()}</div></div></div>
        }
      } else {
        if (this.state.isEditingBook) {
          return <button type="button" title="Add a video introduction" onClick={this.onToggleInputType} className="addVideoButton">Add a video introduction</button>
        }
      }
    } else {
      return(
        <div className="videoDescription" ref="video">
          <Video
            onRenderVideoInput={this.onRenderVideoInput}
            renderRecordButton={this.renderRecordButton}
            onCancelEditPhrase={this.onCancelEditPhrase}
            onCloseVideoComponent={this.onCloseVideoComponent}
            onStartRecordingClick={this.onStartRecordingClick}
            onStopRecordingClick={this.onStopRecordingClick}
            onSourceVideoSubmit={this.onDescriptionVideoSubmit}
            onTargetVideoSubmit={this.onTargetVideoSubmit}
            onToggleInputType={this.onToggleInputType}
            onClearStream={this.onClearStream}
            closeAlt={this.props.closeAlt}
            isVideoRecording={this.state.isVideoRecording}
            isInputVideo={this.state.isInputVideo}
            onSaveStream={this.onSaveStream}
            onStopStream={this.onStopStream}
            mediaConstraints={this.state.mediaConstraints}
            stream={this.state.stream}
            isTargetInputActive={this.state.isTargetInputActive}
            sourceLanguage={this.props.sourceLanguage}
            targetLanguage={this.props.targetLanguage}
            author={this.props.currentUser.username}
            width={600}
            videoPhrase={false}
          />
        </div>
      )
    }
  }

  renderPlayButton() {
    if(this.state.isDescriptionPlaying) {
      return (
        <button className="play descriptionVideoPause" type="button" onClick={this.pauseButton} title="Pause">
            <img src={this.props.pause}/>
        </button>
      )
    } else {
      return (
        <button type="button" onClick={this.playButton} title="Play" className="play">
          <img src={this.props.play}/>
        </button>
      )
    }
  }

  playButton() {
    this.setState({isDescriptionPlaying:!this.state.isDescriptionPlaying})
    $("video")[0].play()
  }

  pauseButton() {
    this.setState({isDescriptionPlaying:!this.state.isDescriptionPlaying})
    $("video")[0].pause()
  }

  onDeleteVideoDescription() {
    const newBook = this.state.book;
    const newState = this.state;

    newBook.video_description = "";
    newState.book = newBook;
    this.setState(newState);
  }

  onToggleInputType() {
    this.setState({ isInputVideo: !this.state.isInputVideo });
  }

  onRenderVideoInput() {
    if (this.state.isInputVideo) {
      const video = document.getElementById('camera-stream');
      video.muted = true;
      const self = this;

      if (navigator.mediaDevices === undefined) {
        navigator.mediaDevices = {};
      }

      if (navigator.mediaDevices.getUserMedia === undefined) {
        navigator.mediaDevices.getUserMedia = (constraints) => {
          const getUserMedia = (navigator.getUserMedia ||
            navigator.webkitGetUserMedia ||
            navigator.mozGetUserMedia);

          if (!getUserMedia) {
            self.onCloseVideoComponent();
            alert('Sorry, your browser does not support the video recording.\n(In order to access the video recording, try again with one of these browsers: Chrome, Firefox, Edge, Opera.)');
            return Promise.reject(new Error('getUserMedia is not implemented in this browser'));
          }
          return new Promise((resolve, reject) => {
            getUserMedia.call(navigator, constraints, resolve, reject);
          });
        };
      }
      navigator.mediaDevices.getUserMedia({ audio: true, video: true })
      .then((stream) => {
        self.onSaveStream(stream);
        video.controls = false;
        video.srcObject = stream;
      })
      .catch((err) => {
        console.log(err.name + ": " + err.message);
      });
    }
  }

  onStartRecordingClick() {
    this.setState({ isVideoRecording: !this.state.isVideoRecording });
  }

  onStopRecordingClick() {
    this.setState({ isVideoRecording: !this.state.isVideoRecording, hasVideoDescription: true });
  }

  onSaveStream(stream) {
    this.setState({stream: stream});
  }

  onCloseVideoComponent() {
    this.setState({
      isVideoRecording: false,
      isInputVideo: false
    });
    if (this.state.stream !== '') {
      this.onStopStream();
    }
  }

  onStopStream() {
    const tracks = this.state.stream.getTracks();
    tracks[0].stop();
    tracks[1].stop();
    this.onClearStream();
  }

  onClearStream() {
    this.setState({stream: ''});
  }

  onDescriptionVideoSubmit(video) {
    const newBook = this.state.book;
    const newState = this.state;

    newBook.video_description = video;
    newState.book = newBook;
    this.setState(newState);
  }

  // END VIDEO

  renderDescription() {
    if (this.state.book.description) {
      if (this.state.isEditingBook) {
        return (
          <textarea
            rows="4"
            className="description new isEditing"
            name="description_draft"
            dir="auto"
            onChange={this.onInputChange}
            value={this.state.book.description_draft}
          />
        );
      } else {
        return <span>{this.renderTruncatedDescription()}</span>;
      }
    } else {
      if (this.state.isEditingBook) {
        return (
          <textarea
            rows="4"
            className="description new isEditing"
            name="description_draft"
            dir="auto"
            onChange={this.onInputChange}
            value={this.state.book.description_draft}
            placeholder="Describe the contents of your book,
            Ex: A collection of useful phrases in Laputa, a Swiftian
            language spoken in Balnibarbi and a number of other islands..."
          />
        );
      }
    }
  }

  renderSourceLanguage() {
    if (this.state.isEditingBook) {
      return (
        <input
          className="new isEditing"
          name="source_language_draft"
          onChange={this.onInputChange}
          value={this.state.book.source_language_draft}
        />
      );
    }
    return (
      <h1 className="language source" title={this.state.book.source_language}>
        {this.state.book.source_language}
      </h1>
    );
  }

  renderTargetLanguage() {
    if (this.state.isEditingBook) {
      return (
        <input
          className="new isEditing"
          name="target_language_draft"
          onChange={this.onInputChange}
          value={this.state.book.target_language_draft}
        />
      );
    }
    return (
      <h1 className="language target" title={this.state.book.target_language}>
        {this.state.book.target_language}
      </h1>
    );
  }

  favoriteImage() {
    return this.state.isFavoriteBook
      ? this.props.star
      : this.props.unstar;
  }

  isFavoriteBook() {
    if (this.props.currentUser) {
      return this.props.currentUser.favorite_books.filter((favorite) => {
        return favorite.book_id == this.props.initialBook.id;
      }).length > 0;
    }
  }

  renderFavoriteButton() {
    if (this.props.currentUser) {
      return (
        <button title="Favorite" onClick={this.onClickFavoriteBook} className="favorite icon">
          <img src={this.favoriteImage()} alt="Favorite" />
        </button>
      );
    }
  }

  render() {
    return (
      <div className="container">
        <NavBar
          currentUser={this.props.currentUser}
          logo={this.props.logo}
          detail={this.props.detail}
          search={this.props.search}
          menu={this.props.menu}
        />
        <span className="backgroundElement" />
        <div className="book">
          <div className="tools">
            {this.renderFavoriteButton()}
            <div className="cardinality">
              <section>
                { this.renderSourceLanguage() }
                <img src={this.props.cardinality} alt="Cardinality" />
                { this.renderTargetLanguage() }
              </section>
            </div>
            { this.renderBookMenu() }
          </div>
          <div className="info">
            <div className="wrapper" dir="auto">
              { this.renderTitle() }
              { this.renderAuthor() }
              { this.renderVideoDescription() }
              { this.renderDescription() }
            </div>
          </div>
          {/* <ProgressBar /> */}
          <div className="NObannerWrapper"></div>

          <Dictionary
          isOwnedByCurrentUser={this.bookIsOwnedByCurrentUser()}
          initialPhrasePairs={this.state.phrasePairs}
          onSourcePhraseSubmit={this.onSourcePhraseSubmit}
          onTargetPhraseSubmit={this.onTargetPhraseSubmit}
          isEditingBook={this.state.isEditingBook}
          menu={this.props.menu}
          flip={this.props.flip}
          save={this.props.save}
          delete={this.props.delete}
          edit={this.props.edit}
          text={this.props.text}
          textAlt={this.props.textAlt}
          video={this.props.video}
          videoAlt={this.props.videoAlt}
          close={this.props.close}
          closeAlt={this.props.closeAlt}
          sourceLanguage={this.state.book.source_language}
          targetLanguage={this.state.book.target_language}
          author={this.state.book.user_id}
          isNewPhrase={this.state.isNewPhrase}
          />
        </div>
      </div>
    );
  }
}

Book.propTypes = {
  initialPhrasePairs: React.PropTypes.arrayOf(React.PropTypes.shape({
    book_id: React.PropTypes.number,
    created_at: React.PropTypes.string,
    id: React.PropTypes.number,
    source_phrase: React.PropTypes.string,
    target_phrase: React.PropTypes.string,
    updated_at: React.PropTypes.string,
  })),
  initialBook: React.PropTypes.shape({
    created_at: React.PropTypes.string,
    description: React.PropTypes.string,
    id: React.PropTypes.number,
    source_language: React.PropTypes.string,
    target_language: React.PropTypes.string,
    title: React.PropTypes.string,
    updated_at: React.PropTypes.string,
    user_id: React.PropTypes.number,
  }),
  currentUser: React.PropTypes.shape({
    created_at: React.PropTypes.string,
    email: React.PropTypes.string,
    favorite_books: React.PropTypes.array,
    id: React.PropTypes.number,
    username: React.PropTypes.string,
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
    username: React.PropTypes.string,
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
  close: React.PropTypes.string,
};
