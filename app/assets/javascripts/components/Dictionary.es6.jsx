class Dictionary extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isPhraseInputActive: false,
      isTargetInputActive: false,
      isContinuousInputActive: false,
      isInputVideo: false,
      isVideoRecording: false,
      phrasePairs: this.props.initialPhrasePairs,
      sourcePhrase: '',
      targetPhrase: '',
      stream: '',
      isVideoNotAvailable: true
    };
    this.onAddNewPhraseButtonClick = this.onAddNewPhraseButtonClick.bind(this);
    this.onSourcePhraseChange = this.onSourcePhraseChange.bind(this);
    this.onSourcePhraseSubmit = this.onSourcePhraseSubmit.bind(this);
    this.onSourceVideoSubmit = this.onSourceVideoSubmit.bind(this);
    this.onTargetPhraseChange = this.onTargetPhraseChange.bind(this);
    this.onTargetPhraseSubmit = this.onTargetPhraseSubmit.bind(this);
    this.onTargetVideoSubmit = this.onTargetVideoSubmit.bind(this);
    this.onDeletePhrasePair = this.onDeletePhrasePair.bind(this);
    this.onCancelEditPhrase = this.onCancelEditPhrase.bind(this);
    this.onToggleInputType = this.onToggleInputType.bind(this);
    this.onCloseVideoComponent = this.onCloseVideoComponent.bind(this);
    this.onStopRecordingClick = this.onStopRecordingClick.bind(this);
    this.onStartRecordingClick = this.onStartRecordingClick.bind(this);
    this.onRenderVideoInput = this.onRenderVideoInput.bind(this);
    this.onSaveStream = this.onSaveStream.bind(this);
    this.onStopStream = this.onStopStream.bind(this);
    this.onClearStream = this.onClearStream.bind(this);
    this.renderPhrasePairs = this.renderPhrasePairs.bind(this);
    this.renderPreSourcePhrase = this.renderPreSourcePhrase.bind(this);
    this.renderCreateNewPhraseButton = this.renderCreateNewPhraseButton.bind(this);
    this.renderPhraseInputFields = this.renderPhraseInputFields.bind(this);
    this.renderTargetInput = this.renderTargetInput.bind(this);
    this.renderInputOptions = this.renderInputOptions.bind(this);
    this.renderVideoInput = this.renderVideoInput.bind(this);
    this.renderInputMethod = this.renderInputMethod.bind(this);
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
        sourcePhrase: '',
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
        targetPhrase: '',
      });
    } else {
      bootbox.alert({
        message: 'Target phrase is empty',
        closeButton: false,
      });
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
    let phrasePairs = this.state.phrasePairs;
    if (this.state.isTargetInputActive) {
      phrasePairs.splice(-1, 1);
    }
    this.setState({
      phrasePairs,
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

  onStopRecordingClick() {
    this.setState({ isVideoRecording: !this.state.isVideoRecording });
  }

  onStartRecordingClick() {
    this.setState({ isVideoRecording: !this.state.isVideoRecording });
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
            placeholder={this.props.sourceLanguage + " phrase"}/>
          <button className="savePhrase">Save</button>
        </form>
      </div>
    );
  }

  renderTargetInput() {
    return (
      <form
        className="newPhrase"
        onSubmit={this.onTargetPhraseSubmit} >
        <input
          ref="targetInput"
          value={this.state.targetPhrase}
          onChange={this.onTargetPhraseChange}
          className="targetPhrase input"
          type="text"
          dir="auto"
          placeholder={this.props.targetLanguage + " phrase"} />
        <button className="savePhrase"> Save </button>
      </form>
    );
  }

  renderInputOptions() {
    if (!this.state.isInputVideo) {
      const videoButtonClass = 'video icon' + this.state.videoButtonClass;
      return (
        <span className="inputOptions">
          <button title="Text" className="text icon selectedInput"><img src={this.props.text} alt="text"/></button>
          <button title="Video" onClick={this.onToggleInputType} className="video icon"><img src={this.props.video} alt="video"/></button>
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
            author={this.props.author}
            width={600}
            videoPhrase={true}
          />
        </div>
      );
    }
  }

  // TODO: Consider the flow of canceling a phrase in progress.
  renderInputMethod() {
    return (
      <div className="inputMethod">
        {this.renderInputOptions()}
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
