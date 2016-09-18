Dictionary = React.createClass( {

  getInitialState() {
    return {
      isPhraseInputActive: false,
      isTargetInputActive: false,
      isContinuousInputActive: false,
      isInputVideo: false,
      isVideoRecording: false,
      phrasePairs: this.props.initialPhrasePairs,
      sourcePhrase: "",
      targetPhrase: ""
    }
  },

  onAddNewPhraseButtonClick() {
    this.setState({
        isPhraseInputActive: !this.state.isPhraseInputActive
    });
  },

  onSourcePhraseChange(e) {
    this.setState({sourcePhrase: e.target.value });
  },

  onSourcePhraseSubmit(e) {
    e.preventDefault()
    this.props.onSourcePhraseSubmit(this.state.sourcePhrase),
    this.setState({
        isTargetInputActive: !this.state.isTargetInputActive,
        sourcePhrase: ""
    });
  },

  onTargetPhraseChange(e) {
    this.setState({targetPhrase: e.target.value });
  },

  onTargetPhraseSubmit(e) {
    e.preventDefault()
    this.props.onTargetPhraseSubmit(this.state.targetPhrase),
    this.setState({
      isPhraseInputActive: !this.state.isPhraseInputActive,
      isTargetInputActive: !this.state.isTargetInputActive,
      targetPhrase: ""
    });
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
  },


// Video Zone

  onToggleInputType() {
    this.setState({
      isInputVideo: !this.state.isInputVideo
    })
  },

  onCloseVideoComponent() {
    this.setState({
      isVideoRecording: false,
      isInputVideo: false
    })
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
          )
        }
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
    }
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
    if (this.state.isInputVideo) {
      return (
        <span className="inputOptions">
          <button title="Text" onClick={this.onToggleInputType} className="text icon"><img src={this.props.text} alt="text"/></button>
          <button title="Video" onClick={this.onToggleInputType} className="video icon selectedInput"><img src={this.props.videoAlt} alt="video"/></button>
          <button title="Cancel" onClick={this.onCancelEditPhrase} className="close icon"><img src={this.props.close} alt="close"/></button>
        </span>
      );
    } else {
      return (
        <span className="inputOptions">
          <button title="Text" onClick={this.onToggleInputType} className="text icon selectedInput"><img src={this.props.textAlt} alt="text"/></button>
          <button title="Video" onClick={this.onToggleInputType} className="video icon"><img src={this.props.video} alt="video"/></button>
          <button title="Cancel" onClick={this.onCancelEditPhrase} className="close icon"><img src={this.props.close} alt="close"/></button>
        </span>
      );
    }
  },

  renderVideoInput() {
    if (this.state.isInputVideo) {
      return (
        <div className="videoComponent">
          <video id="camera-stream" width="570" autoPlay muted  ></video>
          {this.renderRecordButton()}
          <button title="Cancel" onClick={this.onCancelEditPhrase} className="close icon">
            <img src={this.props.closeAlt} alt="close"/>
          </button>

          <button title="Text" onClick={this.onCloseVideoComponent} className="text icon">
            <img src={this.props.textAlt} alt="close"/>
          </button>

          <button hidden className="extra" ref= "button-download" id="button-download">Download</button>
          <button hidden className="extra" onClick={this.handleUploadClick} id="button-upload">Upload Video</button>
        </div>
      );
    }
  },

  renderRecordButton() {
    if (this.state.isVideoRecording) {
      return (
        <button className="videoButtonContainer" onClick={this.onStopRecordingClick}>
          <div className="videoButton"></div>
        </button>
      )
    } else {
      return (
        <button className="videoButtonContainer" onClick={this.onStartRecordingClick}>
          <div className="videoButton startRecording"></div>
        </button>
      )
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

  render() {
    return (
       <div className="dictionary">
        <section className="content-wrapper">
          <ul className="content">{this.renderPhrasePairs()}</ul>
          {this.renderVideoInput()}
          {this.renderCreateNewPhraseButton()}
        </section>
       </div>
    )
  }
} );
