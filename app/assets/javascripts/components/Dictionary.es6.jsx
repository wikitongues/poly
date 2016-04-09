Dictionary = React.createClass( {
 

  getInitialState: function() {
    return {
      phrasePairs: this.props.phrasePairs,
      isPhraseInputActive: false,
      isTargetInputActive: false,
      isContinuousInputActive: false,
      sourcePhrase: "",
      targetPhrase: ""
    }
  },

  onAddNewPhraseButtonClick: function() {
    this.setState({
        isPhraseInputActive: !this.state.isPhraseInputActive
    });
  },

  onSourcePhraseChange: function(e) {
    this.setState({sourcePhrase: e.target.value });
  },

  onSourcePhraseSubmit: function() {
    this.setState({
        isTargetInputActive: !this.state.isTargetInputActive
    });
  },

  onTargetPhraseChange: function(e) {
    this.setState({targetPhrase: e.target.value });
  },

  onTargetPhraseSubmit: function() {
    this.submitPhrase()
    this.setState({
      isPhraseInputActive: !this.state.isPhraseInputActive,
      isTargetInputActive: !this.state.isTargetInputActive
    });
  },

  onTargetPhraseMultipleSubmit: function() {
    this.submitPhrase()
    this.setState({
      isTargetInputActive: !this.state.isTargetInputActive
    });
  },

  submitPhrase: function(){
    this.props.submitPhrase(this.state.sourcePhrase, this.state.targetPhrase)
    this.setState({
      sourcePhrase: "",
      targetPhrase: ""
    })
  },

  onContinuousInputClick: function() {
    this.setState({
        isContinuousInputActive: !this.state.isContinuousInputActive
    });
  },

  onDeletePhrasePair: function(phrasePairId) {
    //REPLACE DELETE PHRASE WILL CALL TO TOP LEVEL (BOOK)
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

  onCancelEditPhrase: function() {
    this.setState({
      isPhraseInputActive: !this.state.isPhraseInputActive
    });
  },

  renderPhrasePairs: function() {
    return this.props.phrasePairs.map((phrasePair, index) => {
      return (
          <PhrasePair
            id={phrasePair.id}
            isOwnedByCurrentUser={this.props.isOwnedByCurrentUser}
            initialSourcePhrase={phrasePair.source_phrase}
            initialTargetPhrase={phrasePair.target_phrase}
            key={index}
            onDeletePhrasePair={this.onDeletePhrasePair} />
      );
    })
    //this.forceUpdate()
  },

  renderCreateNewPhraseButton: function() {
    if (this.props.isOwnedByCurrentUser) {
      if (this.state.isPhraseInputActive) {
        return (
          <div>
            {this.renderPhraseInputFields()}
          </div>
        )
      } else {
        return (
          <div className="addPhrase">
            <button onClick={this.onAddNewPhraseButtonClick}>+</button>
          </div>
        )
      }
    }
  },

  renderPhraseInputFields: function() {
    //SUGGESTION: the phrase input fields should be their own React Component.
    //Then, move all of the input-type state (sourcePhrase and targetPhrase) to that component rather than Dictionary.
    if (this.state.isTargetInputActive) {
      return (
        <div>
          { this.renderInputMethod() }
          { this.renderTargetContinuousInputField() }
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

  // NB If in continuous input state, show source input field following successful phrase pair completion.
  renderTargetContinuousInputField: function() {
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

  // TODO: Consider the flow of canceling a phrase in progress.
  renderInputMethod: function() {
    if (this.state.isContinuousInputActive) {
      return (
        <div className="inputMethod">
          <label>
            <input type="checkbox" checked onChange={this.onContinuousInputClick}/>
            Continuous entry
          </label>
          <button title="Cancel" onClick={this.onCancelEditPhrase} className="close icon"></button>
        </div>
      )
    } else {
      return (
        <div className="inputMethod">
          <label>
            <input type="checkbox" onChange={this.onContinuousInputClick}/>
            Continuous entry
          </label>
          <button title="Cancel" onClick={this.onCancelEditPhrase} className="close icon"></button>
        </div>
      )
    }
  },

  render: function() {
    return (
       <div className="dictionary">
        <section className="content-wrapper">
          <ul className="content">{this.renderPhrasePairs()}</ul>
          {this.renderCreateNewPhraseButton()}
        </section>
       </div>
    )
  }
} )