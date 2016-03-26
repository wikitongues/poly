Book = React.createClass( {

  getInitialState: function() {
    return {
      phrasePairs: this.props.initialPhrasePairs
    }
  },

  onSourcePhraseSubmit: function(sourcePhrase) {
    var newPhrasePair = {
      source_phrase: sourcePhrase,
    };
    var newPhrasePairs = this.state.phrasePairs;
    newPhrasePairs.push(newPhrasePair);
    this.setState({
      phrasePairs: newPhrasePairs
    })
  },

  onTargetPhraseSubmit: function(targetPhrase) {
    var newPhrasePairs = this.state.phrasePairs;
    var newPhrasePair = newPhrasePairs[newPhrasePairs.length - 1]
    newPhrasePair.target_phrase = targetPhrase;
    this.setState({
      phrasePairs: newPhrasePairs
    })
    this.saveNewPhrasePair(newPhrasePair);
  },

  saveNewPhrasePair: function(phrasePair) {
    $.ajax({
      url: "/phrase_pairs",
      type: "POST",
      data: {
        dictionary_id: this.props.dictionary.id,
        phrase_pair: phrasePair
      },
      error: function() {
        console.log('shame on you')
      }
    })
  },

  render: function() {
    return (
       <div className="book">
        <a href="/">Back</a>
        <div className="info">
          <div className="wrapper">
            <h1>{this.props.book.title}</h1>
            <p>{this.props.book.description}</p>
          </div>
        </div>
        <div className="bannerWrapper"></div>
        <div className="cardinality">
          <section>
            <h1 className="language source" title="Source Language">Source Language</h1>
            <img className="icon cardinality" src={this.props.cardinality} alt=""/>
            <h1 className="language target" title="Target Language">Target Language</h1>
          </section>
        </div>
        <Dictionary
          dictionary={this.props.dictionary}
          phrasePairs={this.state.phrasePairs}
          onSourcePhraseSubmit={this.onSourcePhraseSubmit}
          onTargetPhraseSubmit={this.onTargetPhraseSubmit} />
       </div>
    )
  }
})

