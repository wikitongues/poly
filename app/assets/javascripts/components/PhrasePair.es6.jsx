PhrasePair = React.createClass( {

  getInitialState: function() {
    return {
      isEditingPhrase: false,
      sourcePhrase: this.props.initialSourcePhrase,
      targetPhrase: this.props.initialTargetPhrase
    }
  },

  componentWillReceiveProps: function(nextProps) {
    this.setState({
      sourcePhrase: nextProps.initialSourcePhrase,
      targetPhrase: nextProps.initialTargetPhrase
    })
  },

  toggleEditingPhraseState: function() {
      this.setState({
        isEditingPhrase: !this.state.isEditingPhrase
    });
  },

  onDeletePhraseClick: function() {
    this.props.onDeletePhrasePair(this.props.id)
  },

  onSavePhraseClick:function(){
    $.ajax({
      url: '/phrase_pairs/' + this.props.id,
      type: 'PUT',
      data: {
        phrase_pair: {
          source_phrase: this.state.sourcePhrase,
          target_phrase: this.state.targetPhrase
        }
      },
      success: function() {
        this.toggleEditingPhraseState();
      }.bind(this),
      error: function() {
        console.log("Error: Could not save phrase")
      }
    })
  },

  onEditPhraseClick: function() {
    this.toggleEditingPhraseState();
  },

  onSourceChange: function(e) {
    this.setState({ sourcePhrase: e.target.value })
  },

  onTargetChange: function(e) {
    this.setState({ targetPhrase: e.target.value })
  },

  renderPhraseMenu: function() {
    if (this.props.isOwnedByCurrentUser) {
      if (this.state.isEditingPhrase) {
        return (
          <li className="menu saving">
            <button title="Save" onClick={this.onSavePhraseClick} className="icon">
              <img src={this.props.save}/>
            </button>
            <button title="Cancel" onClick={this.toggleEditingPhraseState} className="close icon">
              <img src={this.props.close}/>
            </button>
          </li>
        );
      } else {
        return (
          <li className="menu">
            <button title="Menu" className="more icon">
              <img src={this.props.menu}/>
            </button>
            <button title="Edit" onClick={this.onEditPhraseClick} className="icon">
              <img src={this.props.edit}/>
            </button>
            <button title="Delete" onClick={this.onDeletePhraseClick} className="icon">
              <img src={this.props.delete}/>
            </button>
          </li>
        );
      }
    }
  },

  renderPhrasePair: function() {
     if (this.state.isEditingPhrase) {
      return (
        <ul>
          <li className="source text">
            <input
              value={this.state.sourcePhrase}
              onChange={this.onSourceChange}
              name="sourcePhrase" />
          </li>
          <li className="target text">
            <input
              value={this.state.targetPhrase}
              onChange={this.onTargetChange}
              name="targetPhrase" />
          </li>
          { this.renderPhraseMenu() }
        </ul>
      )
    } else {
      return (
        <ul>
          <li className="source text">
            <p>{this.state.sourcePhrase}</p>
          </li>
          <li className="target text">
            <p>{this.state.targetPhrase}</p>
          </li>
          { this.renderPhraseMenu() }
        </ul>
      )
    }
  },

  render: function() {
    return (
       <li className="entry">
        { this.renderPhrasePair() }
      </li>
    )
  }
} )
