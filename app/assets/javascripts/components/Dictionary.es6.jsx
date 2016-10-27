Dictionary = React.createClass( {

  getInitialState: function() {
    return {
      isPhraseInputActive: false,
      isTargetInputActive: false,
      isContinuousInputActive: false,
      phrasePairs: this.props.initialPhrasePairs,
      sourcePhrase: "",
      targetPhrase: ""
    }
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

  onSourcePhraseChange: function(e) {
    this.setState({sourcePhrase: e.target.value });
  },

  onSourcePhraseSubmit: function(e) {
    e.preventDefault()
    if(this.state.sourcePhrase) {
      this.props.onSourcePhraseSubmit(this.state.sourcePhrase),
      this.setState({
          isTargetInputActive: !this.state.isTargetInputActive,
          sourcePhrase: ""
      });
    } else {
      bootbox.alert({
        message: "Source phrase is empty",
        closeButton:false})
    }
  },

  onTargetPhraseChange: function(e) {
    this.setState({targetPhrase: e.target.value });
  },

  onTargetPhraseSubmit: function(e) {
    e.preventDefault()
    if(this.state.targetPhrase) {
      this.props.onTargetPhraseSubmit(this.state.targetPhrase),
      this.setState({
        isPhraseInputActive: !this.state.isPhraseInputActive,
        isTargetInputActive: !this.state.isTargetInputActive,
        targetPhrase: ""
      });
    } else {
      bootbox.alert({
        message: "Target phrase is empty",
        closeButton:false})
    }
  },

  onTargetPhraseMultipleSubmit: function(e) {
    e.preventDefault()
    this.props.onTargetPhraseSubmit(this.state.targetPhrase),
    this.setState({
      isTargetInputActive: !this.state.isTargetInputActive,
      targetPhrase: ""
    });
  },

  onContinuousInputClick: function() {
    this.setState({
        isContinuousInputActive: !this.state.isContinuousInputActive
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

  renderCreateNewPhraseButton: function() {
    if (this.props.isOwnedByCurrentUser) {
      if (this.state.isPhraseInputActive) {
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

  renderPhraseInputFields: function() {
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
  renderTargetInput: function() {
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

  // TODO: Consider the flow of canceling a phrase in progress.
  renderInputMethod: function() {
    if (this.state.isContinuousInputActive) {
      return (
        <div className="inputMethod">
          <label>
            <input type="checkbox" checked onChange={this.onContinuousInputClick}/>
            Continuous entry
          </label>
          <button title="Cancel" onClick={this.onCancelEditPhrase} className="close icon"><img src={this.props.close} alt="close"/></button>
        </div>
      )
    } else {
      return (
        <div className="inputMethod">
          <label>
            <input type="checkbox" onChange={this.onContinuousInputClick}/>
            Continuous entry
          </label>
          <button title="Cancel" onClick={this.onCancelEditPhrase} className="close icon"><img src={this.props.close} alt="close"/></button>
        </div>
      )
    }
  },

  render: function() {
    if(this.state.phrasePairs.length != 0 ) {
      return (
         <div className="dictionary">
          <ul className="content">{this.renderPhrasePairs()}</ul>
          {this.renderCreateNewPhraseButton()}
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
} )
