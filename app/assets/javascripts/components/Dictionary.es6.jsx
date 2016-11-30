class Dictionary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isPhraseInputActive: false,
      isTargetInputActive: false,
      isContinuousInputActive: false,
      isInputVideo: false,
      isVideoRecording: false,
      isGAPILoaded: false,
      phrasePairs: this.props.initialPhrasePairs,
      sourcePhrase: '',
      targetPhrase: '',
      stream: '',
      // wikitongues
      clientId: '20162064407-uf2hnjg83uhaq6v3soa0bm0ngp5gmvjq.apps.googleusercontent.com',
      scopes: [
        'https://www.googleapis.com/auth/youtube',
      ],
      refreshToken: '',
      interval: '',
      accessToken: '',
      isVideoNotAvailable: true,
      videoButtonClass: ' video-button-disabled',
    };
    this.makeApiCall = this.makeApiCall.bind(this);
    this.refreshToken = this.refreshToken.bind(this);
    this.saveToken = this.saveToken.bind(this);
    this.onAddNewPhraseButtonClick = this.onAddNewPhraseButtonClick.bind(this);
    this.onSourcePhraseChange = this.onSourcePhraseChange.bind(this);
    this.onSourcePhraseSubmit = this.onSourcePhraseSubmit.bind(this);
    this.onTargetPhraseChange = this.onTargetPhraseChange.bind(this);
    this.onTargetPhraseSubmit = this.onTargetPhraseSubmit.bind(this);
    this.onDeletePhrasePair = this.onDeletePhrasePair.bind(this);
    this.onCancelEditPhrase = this.onCancelEditPhrase.bind(this);
    this.renderPhrasePairs = this.renderPhrasePairs.bind(this);
    this.renderCreateNewPhraseButton = this.renderCreateNewPhraseButton.bind(this);
    this.renderPhraseInputFields = this.renderPhraseInputFields.bind(this);
    this.renderTargetInput = this.renderTargetInput.bind(this);
    this.renderInputMethod = this.renderInputMethod.bind(this);
  }

  componentWillMount() {
    const makeApiCall = this.makeApiCall;
    if (typeof gapi !== 'undefined') {
      gapi.load('client:auth2', makeApiCall);
    }
    this.refreshToken();
    const int = setInterval(this.refreshToken(), 2400000);
    this.setState({ interval: int });
  }

  componentDidUpdate() {
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

  componentWillReceiveProps(newProps) {
    this.setState({ phrasePairs: newProps.initialPhrasePairs });
  }

  makeApiCall() {
    const clientId = this.state.clientId;
    const scopes = this.state.scopes;

    gapi.auth2.init({
      client_id: clientId,
      scopes,
    }).then(() => {
      gapi.client.load('youtube', 'v3')
      .then(() => {
        this.setState({
          isVideoNotAvailable: false,
          videoButtonClass: ' video-button-enabled',
        });
      });
    });
  }

  refreshToken() {
    const url = 'https://www.googleapis.com/oauth2/v4/token';
    const method = 'POST';
    const postData = 'client_secret=31zQmZ0j4_16OXYRh_PLy5tB&grant_type=refresh_token&refresh_token=1%2FE_yN56Kk6X5Y6qv3bnackF7yH2SOfWJ7uaaMMcTtpP-GqAK8dNkv2sl1LRgG-sZl&client_id=463787160210-mcm71qds0opgn9cf661pptqt1hcofh3d.apps.googleusercontent.com';
    const request = new XMLHttpRequest();
    const saveToken = this.saveToken;
    request.onload = () => {
      const data = JSON.parse(request.responseText);
      saveToken(data.access_token);
    };
    request.open(method, url);
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    request.send(postData);
  }

  saveToken(accessToken) {
    this.setState({ accessToken });
  }

  onAddNewPhraseButtonClick() {
    this.setState({ isPhraseInputActive: !this.state.isPhraseInputActive });
  }

  onSourcePhraseChange(e) {
    this.setState({ sourcePhrase: e.target.value });
  }

  onSourcePhraseSubmit(e) {
    e.preventDefault();
    if (this.state.sourcePhrase) {
      this.props.onSourcePhraseSubmit(this.state.sourcePhrase);
      this.setState({
        isTargetInputActive: !this.state.isTargetInputActive,
        sourcePhrase: '',
      });
    } else {
      alert("Source phrase is empty");
    }
  }

  onSourceVideoSubmit(video) {
    this.setState({ sourcePhrase: video });
    if(this.state.sourcePhrase) {
      this.props.onSourcePhraseSubmit(this.state.sourcePhrase, this.state.isPhraseInputActive),
      this.setState({
          isTargetInputActive: !this.state.isTargetInputActive,
          sourcePhrase: ""
      });
    } else {
      bootbox.alert({
        message: 'Source phrase is empty',
        closeButton: false,
      });
    }
  }

  onTargetPhraseChange(e) {
    this.setState({targetPhrase: e.target.value });
  }

  onTargetPhraseSubmit(e) {
    e.preventDefault()
    if(this.state.targetPhrase) {
      this.props.onTargetPhraseSubmit(this.state.targetPhrase),
      this.setState({
        isTargetInputActive: !this.state.isTargetInputActive,
        targetPhrase: '',
      });
    } else {
      bootbox.alert({
        message: 'Target phrase is empty',
        closeButton: false,
      });
    }
  }

  onTargetVideoSubmit(video) {
    this.setState({targetPhrase: video });
    if(this.state.targetPhrase) {
      this.props.onTargetPhraseSubmit(this.state.targetPhrase),
      this.setState({
        isPhraseInputActive: !this.state.isPhraseInputActive,
        isTargetInputActive: !this.state.isTargetInputActive,
        targetPhrase: ""
      });
    } else {
      alert("Target phrase is empty")
    }
  }

  onTargetPhraseMultipleSubmit(e) {
    e.preventDefault()
    this.props.onTargetPhraseSubmit(this.state.targetPhrase),
    this.setState({
      isTargetInputActive: !this.state.isTargetInputActive,
      targetPhrase: ""
    });
  }

  onContinuousInputClick() {
    this.setState({
        isContinuousInputActive: !this.state.isContinuousInputActive
    });
  }

  onDeletePhrasePair(phrasePairId) {
    if (window.confirm('Are you sure you want to delete this phrase?')) {
      $.ajax({
        url: '/phrase_pairs/' + phrasePairId,
        type: 'DELETE',
        success: function (response) {
          const phrasePairs = this.state.phrasePairs;
          const indexToRemove = _.findIndex(phrasePairs, (phrasePair) => {
            return phrasePair.id == response.id;
          });
          phrasePairs.splice(indexToRemove, 1);
          this.setState({ phrasePairs });
        }.bind(this),
        error() {
          console.log('Error: Could not delete phrase pair');
        },
      });
    }
  }

  onCancelEditPhrase() {
    this.setState({
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

  onToggleInputType() {
    this.setState({
      isInputVideo: !this.state.isInputVideo
    });
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

  onStopRecordingClick() {
    this.setState({
      isVideoRecording: !this.state.isVideoRecording
    });
  }

  onStartRecordingClick() {
    this.setState({
      isVideoRecording: !this.state.isVideoRecording
    });
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

  onStopStream() {
    const tracks = this.state.stream.getTracks();
    tracks[0].stop();
    tracks[1].stop();
    this.onClearStream();
  }
  onClearStream() {
    this.setState({stream: ''});
  }

// Render Zone
  renderPhrasePairs() {
    return this.state.phrasePairs.map((phrasePair, index) => {
      if (this.props.isNewPhrase) {
        return (
            <PhrasePair
              id={phrasePair.id}
              isOwnedByCurrentUser={this.props.isOwnedByCurrentUser}
              initialSourcePhrase={phrasePair.source_phrase}
              initialTargetPhrase={phrasePair.target_phrase}
              key={index}
              onDeletePhrasePair={this.onDeletePhrasePair}
              menu={this.props.menu}
              flip={this.props.flip}
              save={this.props.save}
              delete={this.props.delete}
              edit={this.props.edit}
              close={this.props.close}
              newPhrase="newPhrase" />
        );        
      }
      return (
        <PhrasePair
          id={phrasePair.id}
          isOwnedByCurrentUser={this.props.isOwnedByCurrentUser}
          initialSourcePhrase={phrasePair.source_phrase}
          initialTargetPhrase={phrasePair.target_phrase}
          key={index}
          onDeletePhrasePair={this.onDeletePhrasePair}
          menu={this.props.menu}
          flip={this.props.flip}
          save={this.props.save}
          delete={this.props.delete}
          edit={this.props.edit}
          close={this.props.close}
        />
      );
    });
  }

  renderPreSourcePhrase() {
    if (this.state.isPhraseInputActive == true && this.state.isTargetInputActive == false) {
      return (
         <li className="entry pre">
          <ul>
            <li className="source">
              <p><Progress /></p>
            </li>
            <li className="target">
              <p></p>
            </li>
          </ul>
        </li>
      );
    }
    if (this.state.isPhraseInputActive == false && this.state.phrasePairs.length == 0) {
      return <DummyContent />;
    }
  }

  renderCreateNewPhraseButton() {
    if (this.props.isOwnedByCurrentUser) {
      if (this.state.isPhraseInputActive) {
        if (this.state.isInputVideo) {} else {
          return (
            <div>
              {this.renderPhraseInputFields()}
            </div>
          );
        }
        return (
          <div>{this.renderPhraseInputFields()}</div>
        );
      }
      return (
        <button className="addPhrase" onClick={this.onAddNewPhraseButtonClick}>+</button>
      );
    }
  }

  renderPhraseInputFields() {
    if (this.state.isTargetInputActive) {
      return (
        <div>
          { this.renderInputMethod() }
          { this.renderTargetInput() }
        </div>
      );
    }
    return (
      <div>
        { this.renderInputMethod() }
        <form className="newPhrase" onSubmit={this.onSourcePhraseSubmit}>
          <input
            ref="sourceInput"
            value={this.state.sourcePhrase}
            onChange={this.onSourcePhraseChange}
            className="sourcePhrase input"
            type="text"
            placeholder="Source"/>
          <button className="savePhrase">Save</button>
        </form>
      </div>
    );
  }

  renderTargetInput() {
    return (
      <form
        className="newPhrase"
        onSubmit={this.onTargetPhraseSubmit}
      >
        <input
          ref="targetInput"
          value={this.state.targetPhrase}
          onChange={this.onTargetPhraseChange}
          className="targetPhrase input"
          type="text"
          placeholder="Target"
        />
        <button className="savePhrase"> Save </button>
      </form>
    );
  }

  renderInputOptions() {
    /*
    if (this.state.isInputVideo) {
      return;
        // Not sure whether it is necessary to still have these guys showing up
        // after the video component is displaying with the exact same buttons inside
        // of it
      (
        <span hidden className="inputOptions">
          <button title="Text" onClick={this.onToggleInputType} className="text icon"><img src={this.props.text} alt="text"/></button>
          <button title="Video" onClick={this.onToggleInputType} className="video icon selectedInput"><img src={this.props.videoAlt} alt="video"/></button>
          <button title="Cancel" onClick={this.onCancelEditPhrase} className="close icon"><img src={this.props.close} alt="close"/></button>
        </span>
      );
    } else {
      return (
        <span className="inputOptions">
          <button title="Text" className="text icon selectedInput"><img src={this.props.textAlt} alt="text"/></button>
          <button title="Video" onClick={this.onToggleInputType} className="video icon"><img src={this.props.video} alt="video"/></button>
          <button title="Cancel" onClick={this.onCancelEditPhrase} className="close icon"><img src={this.props.close} alt="close"/></button>
        </span>
      );
    }*/
    if (!this.state.isInputVideo) {
      const videoButtonClass = 'video icon' + this.state.videoButtonClass;
      return (
        <span className="inputOptions">
          <button title="Text" className="text icon selectedInput"><img src={this.props.textAlt} alt="text"/></button>
          <button disabled={this.state.isVideoNotAvailable} title="Video" onClick={this.onToggleInputType} className={videoButtonClass}><img src={this.props.video} alt="video"/></button>
          <button title="Cancel" onClick={this.onCancelEditPhrase} className="close icon"><img src={this.props.close} alt="close"/></button>
        </span>
      );
    }
  }

  renderVideoInput() {
    if (this.state.isInputVideo) {
      return (
        <div ref="video">
          <Video
            onRenderVideoInput={this.onRenderVideoInput}
            renderRecordButton={this.renderRecordButton}
            onCancelEditPhrase={this.onCancelEditPhrase}
            onCloseVideoComponent={this.onCloseVideoComponent}
            onStartRecordingClick={this.onStartRecordingClick}
            onStopRecordingClick={this.onStopRecordingClick}
            onSourceVideoSubmit={this.onSourceVideoSubmit}
            onTargetVideoSubmit={this.onTargetVideoSubmit}
            onToggleInputType={this.onToggleInputType}
            onClearStream={this.onClearStream}
            onToggleGAPILoaded={this.onToggleGAPILoaded}
            closeAlt={this.props.closeAlt}
            textAlt={this.props.textAlt}
            isVideoRecording={this.state.isVideoRecording}
            isInputVideo={this.state.isInputVideo}
            onSaveStream={this.onSaveStream}
            onStopStream={this.onStopStream}
            mediaConstraints={this.state.mediaConstraints}
            stream={this.state.stream}
            isTargetInputActive={this.state.isTargetInputActive}
            sourceLanguage={this.props.sourceLanguage}
            targetLanguage={this.props.targetLanguage}
            author={this.props.author}
            accessToken={this.state.accessToken}
          />
        </div>
      );
    }
  }


  // TODO: Consider the flow of canceling a phrase in progress.
  renderInputMethod() {
    return (
      <div className="inputMethod">
        <button title="Cancel" onClick={this.onCancelEditPhrase} className="close icon">
          <img src={this.props.close} alt="close" />
        </button>
      </div>
    );
  }

  render() {
    return (
      <div className="dictionary">
        <ul className="content">{this.renderPhrasePairs()}</ul>
        {this.renderPreSourcePhrase()}
        {this.renderVideoInput()}
        {
          !this.state.isInputVideo ?
            this.renderCreateNewPhraseButton()
          :
            !this.renderCreateNewPhraseButton()
        }
      </div>
    );
  }
}

Dictionary.propTypes = {
  initialPhrasePairs: React.PropTypes.arrayOf(React.PropTypes.shape({
    book_id: React.PropTypes.number,
    created_at: React.PropTypes.string,
    id: React.PropTypes.number,
    source_phrase: React.PropTypes.string,
    target_phrase: React.PropTypes.string,
    updated_at: React.PropTypes.string,
  })),
  onSourcePhraseSubmit: React.PropTypes.func,
  onTargetPhraseSubmit: React.PropTypes.func,
  isOwnedByCurrentUser: React.PropTypes.bool,
  menu: React.PropTypes.string,
  flip: React.PropTypes.string,
  save: React.PropTypes.string,
  delete: React.PropTypes.string,
  edit: React.PropTypes.string,
  close: React.PropTypes.string,
};
