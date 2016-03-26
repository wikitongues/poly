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
        book_id: this.props.book.id,
        phrase_pair: phrasePair
      },
      error: function() {
        console.log('shame on you')
      }
    })
  },

  onDeleteBookClick: function() {
    $.ajax({
      url: '/books/' + this.props.book.id,
      type: 'DELETE',
      success: function() {
        window.location.href = '/';
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
            <button onClick={this.onDeleteBookClick}>Delete</button>
            <p>{this.props.book.description}</p>
          </div>
        </div>
        <div className="bannerWrapper"></div>
        <div className="cardinality">
          <section>
            <h1 className="language source" title="Source Language">{this.props.book.source_language}</h1>
            <img className="icon cardinality" src={this.props.cardinality} alt=""/>
            <h1 className="language target" title="Target Language">{this.props.book.target_language}</h1>
          </section>
        </div>
        <Dictionary
          phrasePairs={this.state.phrasePairs}
          onSourcePhraseSubmit={this.onSourcePhraseSubmit}
          onTargetPhraseSubmit={this.onTargetPhraseSubmit} />
       </div>
    )
  }
})

