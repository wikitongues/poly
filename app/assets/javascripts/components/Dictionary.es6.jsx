Dictionary = React.createClass( {
  getInitialState: function() {
    return {
      phrasePairs: this.props.phrasePairs,
      isPhraseEntryActive: false
    }
  },

  onAddNewPhraseButtonClick: function() {
    this.setState({
        isPhraseEntryActive: !this.state.isPhraseEntryActive
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

  renderCreateNewPhraseButton: function() {
    if (this.props.isOwnedByCurrentUser) {
      if (!this.state.isPhraseEntryActive) {
        return (
          <div className="addPhrase">
            <button onClick={this.onAddNewPhraseButtonClick}>+</button>
          </div>
        )
      } else {
        return (
          <div>
            <div className="addPhrase">
              <button onClick={this.onAddNewPhraseButtonClick}>-</button>
            </div>
          <PhraseEntry submitPhrase={this.props.submitPhrase}/>
          </div>
        )
      }
    }
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
  
})