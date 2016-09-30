Dictionary = React.createClass( {

  getInitialState() {
    return {
      isPhraseInputActive: false,
      isTargetInputActive: false,
      isContinuousInputActive: false,
      isInputVideo: false,
      isVideoRecording: false,
      isGAPILoaded: false,
      phrasePairs: this.props.initialPhrasePairs,
      sourcePhrase: "",
      targetPhrase: "",
      mediaConstraints: { video: true, audio: true },
      stream: "",
    };
  },

  componentWillReceiveProps: function(newProps) {
    this.setState({
      phrasePairs: newProps.initialPhrasePairs
    })
  },

  onAddNewPhraseButtonClick: function() {
    this.setState({
        isPhraseInputActive: !this.state.isPhraseInputActive
    });
  },

  onSourcePhraseChange(e) {
    this.setState({sourcePhrase: e.target.value });
  },

  onSourcePhraseSubmit(e) {
    e.preventDefault();
    if(this.state.sourcePhrase) {
      this.props.onSourcePhraseSubmit(this.state.sourcePhrase),
      this.setState({
          isTargetInputActive: !this.state.isTargetInputActive,
          sourcePhrase: ""
      });
    } else {
      alert("Source phrase is empty")
    }
  },

  onSourceVideoSubmit(videoId) {
    this.setState({ sourcePhrase: videoId });
    if(this.state.sourcePhrase) {
      this.props.onSourcePhraseSubmit(this.state.sourcePhrase),
      this.setState({
          isTargetInputActive: !this.state.isTargetInputActive,
          sourcePhrase: ""
      });
    } else {
      alert("Source phrase is empty")
    }
  },

  onTargetPhraseChange(e) {
    this.setState({targetPhrase: e.target.value });
  },

  onTargetPhraseSubmit(e) {
    e.preventDefault()
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
  },

  onTargetVideoSubmit(videoId) {
    this.setState({targetPhrase: videoId });
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
  },

  onTargetPhraseMultipleSubmit(e) {
    e.preventDefault()
    this.props.onTargetPhraseSubmit(this.state.targetPhrase),
    this.setState({
      isTargetInputActive: !this.state.isTargetInputActive,
      targetPhrase: ""
    });
  },

  onContinuousInputClick() {
    this.setState({
        isContinuousInputActive: !this.state.isContinuousInputActive
    });
  },

  onDeletePhrasePair(phrasePairId) {
    if(window.confirm("Are you sure you want to delete this phrase?")) {
      $.ajax({
        url: '/phrase_pairs/' + phrasePairId,
        type: 'DELETE',
        success: function(response) {
          var phrasePairs = this.state.phrasePairs;
          var indexToRemove = _.findIndex(phrasePairs, function(phrasePair) {
            return phrasePair.id == response.id;
          });
          phrasePairs.splice(indexToRemove, 1);
          this.setState({
            phrasePairs: phrasePairs
          })
        }.bind(this),
        error: function() {
          console.log('Error: Could not delete phrase pair')
        }
      })
    };
  },

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
  },

// GAPI zone

  onToggleGAPILoaded() {
    this.refs.video.hidden = false;
    this.refs.loading.hidden = true;
  },


// Video Zone

  onToggleInputType() {
    this.setState({
      isInputVideo: !this.state.isInputVideo
    });
  },

  onCloseVideoComponent() {
    this.setState({
      isVideoRecording: false,
      isInputVideo: false
    });
    if (this.state.stream !== '') {
      this.onStopStream();
    }
  },

  onStopRecordingClick() {
    this.setState({
      isVideoRecording: !this.state.isVideoRecording
    })
  },

  onStartRecordingClick() {
    this.setState({
      isVideoRecording: !this.state.isVideoRecording
    })
  },

  onRenderVideoInput(cameraStream) {
    var video = document.getElementById('camera-stream');
    video.controls = false;

    video.muted = true;
    navigator.getUserMedia = (navigator.getUserMedia ||
                              navigator.webkitGetUserMedia ||
                              navigator.mozGetUserMedia ||
                              navigator.msGetUserMedia);
    var self = this;
    if (navigator.getUserMedia) {
      // Request the camera.
      navigator.getUserMedia(
        // Constraints
        self.state.mediaConstraints,

        // Success Callback
        function(stream) {
          //Saves the ID of our stream in order to be able to shut it
          //later
          self.onSaveStream(stream);
          // Create an object URL for the video stream and use this
          // to set the video source.
          video.src = window.URL.createObjectURL(stream);
        },

        // Error Callback
        function(err) {
          // Log the error to the console.
          console.log('The following error occurred when trying to use getUserMedia: ' + err);
        }
      );

    } else {
      alert('Sorry, your browser does not support getUserMedia');
      video.style.display = "none";
    }
  },

  onSaveStream(stream) {
    this.setState({stream: stream});
  },

  onStopStream() {
    var tracks = this.state.stream.getTracks();
    tracks[0].stop();
    tracks[1].stop();
  },
  onClearStream() {
    this.setState({stream: ""});
  },

// Render Zone

  renderPhrasePairs() {
    return this.state.phrasePairs.map((phrasePair, index) => {
      return (
          <PhrasePair
            id={phrasePair.id}
            isOwnedByCurrentUser={this.props.isOwnedByCurrentUser}
            initialSourcePhrase={phrasePair.source_phrase}
            initialTargetPhrase={phrasePair.target_phrase}
            key={index}
            onDeletePhrasePair={this.onDeletePhrasePair}
            menu={this.props.menu}
            save={this.props.save}
            delete={this.props.delete}
            edit={this.props.edit}
            close={this.props.close} />
      );
    })
    this.forceUpdate()
  },

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
        )
      } else {
        return (
          <button className="addPhrase" onClick={this.onAddNewPhraseButtonClick}>+</button>
        )
      }
    }
  },

  renderPhraseInputFields() {
    if (this.state.isTargetInputActive) {
      return (
        <div>
          { this.renderInputMethod() }
          { this.renderTargetInput() }
        </div>
      )
    } else {
      return (
        <div>
          { this.renderInputMethod() }
          <form className="newPhrase" onSubmit={this.onSourcePhraseSubmit}>
            <input
              value={this.state.sourcePhrase}
              onChange={this.onSourcePhraseChange}
              className="sourcePhrase input"
              type="text"
              placeholder="Source"/>
            <button className="savePhrase">Save</button>
          </form>
        </div>
      )
    };
  },

  // NB If in continuous input state, show source input field following successful phrase pair completion.
  renderTargetInput() {
    const continuousInput = this.state.isContinuousInputActive
    return (
      <form className="newPhrase" onSubmit={continuousInput ? this.onTargetPhraseMultipleSubmit : this.onTargetPhraseSubmit}>
        <input
          value={this.state.targetPhrase}
          onChange={this.onTargetPhraseChange}
          className="targetPhrase input"
          type="text"
          placeholder="Target"/>
        <button className="savePhrase"> Save </button>
      </form>
    );
  },

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
      return (
        <span className="inputOptions">
          <button title="Text" className="text icon selectedInput"><img src={this.props.textAlt} alt="text"/></button>
          <button title="Video" onClick={this.onToggleInputType} className="video icon"><img src={this.props.video} alt="video"/></button>
          <button title="Cancel" onClick={this.onCancelEditPhrase} className="close icon"><img src={this.props.close} alt="close"/></button>
        </span>
      );
    }
  },

  renderVideoInput() {
    if (this.state.isInputVideo) {
      return (
        <div>
          <div ref='loading'>
            <p>Loading...</p>
          </div>
          <div hidden ref='video'>
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
            />                
          </div>
        </div>
      );
    }
  },


  // TODO: Consider the flow of canceling a phrase in progress.
  renderInputMethod() {
    if (this.state.isContinuousInputActive) {
      return (
        <div className="inputMethod">
          <label>
            <input type="checkbox" checked onChange={this.onContinuousInputClick}/>
            Continuous entry
          </label>
          {this.renderInputOptions()}
        </div>
      )
    } else {
      return (
        <div className="inputMethod">
          <label>
            <input type="checkbox" onChange={this.onContinuousInputClick}/>
            Continuous entry
          </label>
          {this.renderInputOptions()}
        </div>
      )
    }
  },

  render: function() {
    if(this.state.phrasePairs.length != 0 ) {
      return (
         <div className="dictionary">
          <ul className="content">{this.renderPhrasePairs()}</ul>
          {this.renderVideoInput()}
          {
            !this.state.isInputVideo ?
              this.renderCreateNewPhraseButton()
              :
              !this.renderCreateNewPhraseButton()
          }
         </div>
      )
    } else {
      return (
        <div className="dictionary">
          <span className="notice">Phrasebook is empty</span>
          <DummyContent/>
          {this.renderCreateNewPhraseButton()}
        </div>
      )
    }
  }
} );
