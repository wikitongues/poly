class NewBook extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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
      isDescriptionPlaying: false,
    };
    this.onCloseVideoComponent = this.onCloseVideoComponent.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onDescriptionVideoSubmit = this.onDescriptionVideoSubmit.bind(this)
    this.onToggleInputType = this.onToggleInputType.bind(this);
    this.onSaveStream = this.onSaveStream.bind(this);
    this.onStopStream = this.onStopStream.bind(this);
    this.onClearStream = this.onClearStream.bind(this);
    this.onStartRecordingClick = this.onStartRecordingClick.bind(this);
    this.onStopRecordingClick = this.onStopRecordingClick.bind(this);
    this.onRenderVideoInput = this.onRenderVideoInput.bind(this);
    this.playButton = this.playButton.bind(this);
    this.pauseButton = this.pauseButton.bind(this);
    this.onDeleteVideoDescription = this.onDeleteVideoDescription.bind(this);
  }

  onInputChange(e) {
    const newState = this.state;
    newState[e.target.name] = e.target.value;
    this.setState(newState);
  }

  onSubmit(e) {
    e.preventDefault();
    this.state.errors = [];
    if (this.state.title && this.state.source_language && this.state.target_language) {
      $.ajax({
        url: '/books',
        type: 'POST',
        data: {
          book: this.state,
        },
        success(book) {
          window.location.href = '/books/' + book.id;
        },
        error(error) {
          console.log(error);
        },
      });
    } else {
      if (!this.state.title) this.state.errors.push(' Title');
      if (!this.state.source_language) this.state.errors.push(' Source language');
      if (!this.state.target_language) this.state.errors.push(' Target language');
      bootbox.alert({
        message: 'Your book is missing the following required details:' + (this.state.errors),
        closeButton: false,
      });
    }
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
        video.src = window.URL.createObjectURL(stream);
      })
      .catch((err) => {
        console.log(err.name + ": " + err.message);
      });
    }
  }

  onSaveStream(stream) {
    this.setState({stream: stream});
  }

  onStopRecordingClick() {
    this.setState({ isVideoRecording: !this.state.isVideoRecording, hasVideoDescription: true });
  }

  onStartRecordingClick() {
    this.setState({ isVideoRecording: !this.state.isVideoRecording });
  }

  onToggleInputType() {
    this.setState({ isInputVideo: !this.state.isInputVideo });
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
    this.setState({ video_description: video });
  }

  renderVideoDescription() {
    if(this.state.isInputVideo == false) {
      if(this.state.hasVideoDescription) {
        return <div className="videoDescription"><div className="videoComponent"><video src={this.state.video_description} loop width="600"></video>{this.renderPlayButton()}</div></div>
      } else {
        return <button type="button" title="Add a video" onClick={this.onToggleInputType} className="addVideoButton">Add a video introduction</button>
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
        <div className="videoControls">
          <button className="play descriptionVideoPause" type="button" onClick={this.pauseButton} title="Pause">
              <img src={this.props.pause}/>
          </button>
          <button type="button" title="Remove video" onClick={this.onDeleteVideoDescription} className="text icon">
            <img src={this.props.deleteAlt} alt="close" />
          </button>
        </div>
      )
    } else {
      return (
        <div className="videoControls">
          <button type="button" onClick={this.playButton} title="Play" className="play">
            <img src={this.props.play}/>
          </button>
          <button type="button" title="Remove video" onClick={this.onDeleteVideoDescription} className="text icon">
            <img src={this.props.deleteAlt} alt="close" />
          </button>
        </div>
      )
    }
  }

  onDeleteVideoDescription() {
    this.setState({video_description:"", hasVideoDescription:false})
  }

  playButton() {
    this.setState({isDescriptionPlaying:!this.state.isDescriptionPlaying})
    $("video")[0].play()
  }

  pauseButton() {
    this.setState({isDescriptionPlaying:!this.state.isDescriptionPlaying})
    $("video")[0].pause()
  }

  render() {
    return (
      <div className="container">
        <NavBar
          currentUser={this.props.currentUser}
          logo={this.props.logo}
          detail={this.props.detail}
          search={this.props.search}
        />
        <span className="backgroundElement" />
        <div className="book">
          <form onSubmit={this.onSubmit}>
            <fieldset className="tools">
              <span title="Favorite"className="icon">
                <img src={this.props.unstar} alt="Favorite" />
              </span>
              <section className="cardinality">
                <section>
                  <input
                    className="new language source"
                    type="text"
                    name="source_language"
                    placeholder="Source"
                    value={this.state.sourceLanguage}
                    onChange={this.onInputChange}
                  />
                  <img src={this.props.cardinality} alt="" />
                  <input
                    className="new language target"
                    type="text"
                    name="target_language"
                    placeholder="Target"
                    value={this.state.targetLanguager}
                    onChange={this.onInputChange}
                  />
                </section>
              </section>
              {/* <button title="Menu" className="more icon">
                <img src={this.props.menuAlt}/>
              </button> */}
              <span title="Menu" className="icon">
                <img src={this.props.menuAlt} />
              </span>
            </fieldset>
            <fieldset className="info">
              <div className="wrapper">
                <input
                  className="new title"
                  type="text"
                  name="title"
                  placeholder="Useful phrases in Laputa"
                  autoFocus
                  value={this.state.title}
                  onChange={this.onInputChange}
                />
                <p className="new author">{this.props.currentUser.username}</p>
                <div className="descriptionArea">
                  {/*<div className="descriptionOptions">
                              <button type="button" title="Text" className="text icon selectedInput"><img src={this.props.textIcon} alt="text"/></button>
                              <button type="button" title="Video" onClick={this.onToggleInputType} className="video icon"><img src={this.props.videoIcon} alt="video"/></button>
                            </div>*/}
                  {this.renderVideoDescription()}
                  <textarea
                    rows="3"
                    className="new description"
                    type="text"
                    name="description"
                    placeholder="Describe the contents of your book, Ex: A
                    collection of useful phrases in Laputa, a Swiftian language
                    spoken in Balnibarbi and a number of other islands."
                    value={this.state.description}
                    onChange={this.onInputChange}
                  />
                </div>
              </div>
            </fieldset>
            <section className="new dictionary">
              <DummyContent />
              <button className="startBook" type="submit">Create Book</button>
            </section>
          </form>
        </div>
      </div>
    );
  }
}

NewBook.propTypes = {
  currentUser: React.PropTypes.shape({
    created_at: React.PropTypes.string,
    email: React.PropTypes.string,
    favorite_books: React.PropTypes.array,
    id: React.PropTypes.number,
    username: React.PropTypes.string,
  }),
  logo: React.PropTypes.string,
  detail: React.PropTypes.string,
  search: React.PropTypes.string,
  unstar: React.PropTypes.string,
  cardinality: React.PropTypes.string,
  menuAlt: React.PropTypes.string,
};
