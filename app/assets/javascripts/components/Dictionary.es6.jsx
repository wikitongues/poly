Dictionary = React.createClass( {

  getInitialState: function() {
    return {
      isPhraseInputInactive: true,
      isTargetInputActive: false,
      isContinuousInputActive: false,
      phrasePairs: this.props.initialPhrasePairs,
      sourcePhrase: "",
      targetPhrase: ""
    }
  },

  renderPhraseInputButton: function() {
    if (this.state.isPhraseInputInactive) {
      return (
        <div className="addPhrase">
          <button onClick={this.onPhraseInputButtonClick}>+</button>
        </div>
      )
    } else {
      return (
        <div>
          {this.renderPhraseInputField()}
        </div>
      )
    }
  },

  renderPhraseInputField: function() {
    if (this.state.isTargetInputActive) {
      return (
        <div>
          { this.renderInputMethod() }
          { this.renderContinuousInputField() }
        </div>
      )
    } else {
      return (
        <div>
          { this.renderInputMethod() }
          <div className="newPhrase">
            <input
              value={this.state.sourcePhrase}
              onChange={this.onSourcePhraseChange}
              className="sourcePhrase input"
              type="text"
              placeholder="Source"/>
            <button className="savePhrase" onClick={this.onSourcePhraseSubmit}>Save</button>
          </div>
        </div>
      )
    }
  },

  // TODO: Consider the flow of canceling a phrase in progress.
  renderInputMethod: function() {
    if (this.state.isContinuousInputActive) {
      return (
        <div className="inputMethod">
          <label>
            <input type="checkbox" checked onChange={this.onContinuousInputClick}/>
            Continuous entry
          </label>
          <button title="Cancel" onClick={this.toggleComposePhrasePairState} className="close icon"></button>
        </div>
      )
    } else {
      return (
        <div className="inputMethod">
          <label>
            <input type="checkbox" onChange={this.onContinuousInputClick}/>
            Continuous entry
          </label>
          <button title="Cancel" onClick={this.toggleComposePhrasePairState} className="close icon"></button>
        </div>
      )
    }
  },

  // NB If in continuous input state, show source input field following successful phrase pair completion.
  renderContinuousInputField: function() {
    if (this.state.isContinuousInputActive) {
      return (
        <div className="newPhrase">
          <input
            value={this.state.targetPhrase}
            onChange={this.onTargetPhraseChange}
            className="targetPhrase input"
            type="text"
            placeholder="Target"/>
          <button className="savePhrase" onClick={this.onTargetPhraseMultipleSubmit}>Save</button>
        </div>
      )
    } else {
      return (
        <div className="newPhrase">
          <input
          value={this.state.targetPhrase}
          onChange={this.onTargetPhraseChange}
          className="targetPhrase input"
          type="text"
          placeholder="Target"/>
          <button className="savePhrase" onClick={this.onTargetPhraseSubmit}>Save</button>
        </div>
      )
    }
  },

  onSourcePhraseChange: function(e) {
    this.setState({sourcePhrase: e.target.value });
  },

  onTargetPhraseChange: function(e) {
    this.setState({targetPhrase: e.target.value });
  },

  onContinuousInputClick: function() {
    this.setState({
        isContinuousInputActive: !this.state.isContinuousInputActive
    });
  },

  onPhraseInputButtonClick: function() {
    this.setState({
        isPhraseInputInactive: !this.state.isPhraseInputInactive
    });
  },

  onSourcePhraseSubmit: function() {
    this.props.onSourcePhraseSubmit(this.state.sourcePhrase),
    this.setState({
        isTargetInputActive: !this.state.isTargetInputActive,
        sourcePhrase: ""
    });
  },

  onTargetPhraseSubmit: function() {
    this.props.onTargetPhraseSubmit(this.state.targetPhrase),
    this.setState({
      isPhraseInputInactive: !this.state.isPhraseInputInactive,
      isTargetInputActive: !this.state.isTargetInputActive,
      targetPhrase: ""
    });
  },

  onTargetPhraseMultipleSubmit: function() {
    this.props.onTargetPhraseSubmit(this.state.targetPhrase),
    this.setState({
      isTargetInputActive: !this.state.isTargetInputActive,
      targetPhrase: ""
    });
  },

  onDeletePhrasePair: function(phrasePairId) {
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
          console.log('oops')
        }
      })
    };
  },

  toggleComposePhrasePairState: function() {
    this.setState({
      isPhraseInputInactive: !this.state.isPhraseInputInactive
    });
  },

  renderPhrasePairs: function() {
    return this.state.phrasePairs.map((phrasePair, index) => {
      return (
          <PhrasePair
            phrasePair={phrasePair}
            key={index}
            onDeletePhrasePair={this.onDeletePhrasePair} />
      );
    })
  },

  render: function() {
    return (
       <div className="dictionary">
        <section className="content-wrapper">
          <ul className="content">{this.renderPhrasePairs()}</ul>
          {this.renderPhraseInputButton()}
        </section>
       </div>
    )
  }
} )