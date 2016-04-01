PhrasePair = React.createClass( {

  getInitialState: function() {
    return {
      phrasePair: this.props.initialPhrasePair,
      isEditingPhrase: false,
      sourcePhrase: this.props.initialSourcePhrase,
      targetPhrase: this.props.initialTargetPhrase
    }
  },

  toggleEditingPhraseState: function() {
      this.setState({
        isEditingPhrase: !this.state.isEditingPhrase
    });
  },

  renderPhraseMenu: function() {
    if (this.state.isEditingPhrase) {
      return (
        <li className="menu saving">
          <button title="Cancel" onClick={this.toggleEditingPhraseState} className="close icon"></button>
          <button title="Save" onClick={this.onSavePhraseClick} className="save icon"></button>
        </li>
      );
    } else {
      return (
        <li className="menu">
          <span className="more icon"></span>
          <button title="Edit" onClick={this.onEditPhraseClick} className="edit icon"></button>
          <button title="Delete" onClick={this.onDeletePhraseClick} className="trash icon"></button>
        </li>
      );
    }
  },

  onSavePhraseClick:function(){
    this.toggleEditingPhraseState();
  },

  onEditPhraseClick: function() {
    this.toggleEditingPhraseState();
  },

  onInputChange: function(e) {
    var newPhrasePair = this.state.phrasePair;
    var newState = this.state;
    newBook[e.target.name] = e.target.value;
    newState.book = newBook;
    this.setState(newState);
  },

  renderPhrasePair: function() {
     if (this.state.isEditingPhrase) {
      return (
        <ul>
          <li className="source text">
            <input name="sourcePhrase" placeholder={this.props.phrasePair.source_phrase}/>
          </li>
          <li className="target text">
            <input name="targetPhrase" placeholder={this.props.phrasePair.target_phrase}/>
          </li>
          { this.renderPhraseMenu() }
        </ul>
      )
    } else {
      return (
        <ul>
          <li className="source text">
            <p>{this.props.phrasePair.source_phrase}</p>
          </li>
          <li className="target text">
            <p>{this.props.phrasePair.target_phrase}</p>
          </li>
          { this.renderPhraseMenu() }
        </ul>
      )
    }
  },

  onDeletePhraseClick: function() {
    var book = this.props.phrasePair.book_id
    var phrasePairToDelete = this.props.phrasePair.id
    console.log('delete phrase #' + phrasePairToDelete)
  },

  render: function() {
    return (
       <li className="entry">
        { this.renderPhrasePair() }
      </li>
    )
  }
} )
