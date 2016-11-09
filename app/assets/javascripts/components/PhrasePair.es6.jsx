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

  cancelEditingPhraseState: function(e) {
    e.preventDefault()
    this.setState({
      sourcePhrase: this.props.initialSourcePhrase,
      targetPhrase: this.props.initialTargetPhrase,
      isEditingPhrase: false
    })
  },

  onDeletePhraseClick: function() {
    this.props.onDeletePhrasePair(this.props.id)
  },

  onSavePhraseClick:function(e){
    e.preventDefault()
    if(this.state.sourcePhrase && this.state.targetPhrase) {
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
    } else {
      if(this.state.sourcePhrase) {
        bootbox.alert({
          message: "Target phrase is empty",
          closeButton:false})
      } else {
        bootbox.alert({
          message: "Source phrase is empty",
          closeButton:false})
      }
    }
  },

  onInvertPhraseClick:function(e){
    e.preventDefault()
    this.setState({
      sourcePhrase: this.state.targetPhrase,
      targetPhrase: this.state.sourcePhrase
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
            <button title="Flip" onClick={this.onInvertPhraseClick} className="icon">
              <img src={this.props.flip}/>
            </button>
            <button title="Save" onClick={this.onSavePhraseClick} className="icon">
              <img src={this.props.save}/>
            </button>
            <button title="Cancel" onClick={this.cancelEditingPhraseState} className="close icon">
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

  renderParagraph(text) {
    if(text) {
      return (
        <p>{text}</p>
      );
    } else {
      return(
        <p>
          <Progress/>
        </p>
      )
    }
  },


  renderPhrasePair: function() {
     if (this.state.isEditingPhrase) {
      return (
        <ul>
          <form onSubmit={this.onSavePhraseClick}>
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
          </form>
        </ul>
      )
    } else {
      return (
        <ul>
          <li className="source text">
            {this.renderParagraph(this.state.sourcePhrase)}
          </li>
          <li className="target text">
            {this.renderParagraph(this.state.targetPhrase)}
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
