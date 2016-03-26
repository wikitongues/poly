Book = React.createClass( {

  getInitialState: function() {
    return {
      phrasePairs: this.props.initialPhrasePairs,
      isEditingBook: false,
      book: this.props.initialBook
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
        book_id: this.state.book.id,
        phrase_pair: phrasePair
      },
      error: function() {
        console.log('shame on you')
      }
    })
  },

  onDeleteBookClick: function() {
    $.ajax({
      url: '/books/' + this.state.book.id,
      type: 'DELETE',
      success: function() {
        window.location.href = '/';
      }
    })
  },

  onSaveBookClick: function() {
    $.ajax({
      url: '/books/' + this.state.book.id,
      type: "PUT",
      data: { book: this.state.book },
      success: function() {
        this.toggleEditingBookState();
      }.bind(this),
      error: function() {
        alert('something went wrong')
      }
    })
  },

  toggleEditingBookState: function() {
      this.setState({
        isEditingBook: !this.state.isEditingBook
    });
  },

  onEditBookClick: function() {
    this.toggleEditingBookState();
  },

  onInputChange: function(e) {
    var newBook = this.state.book;
    var newState = this.state;
    newBook[e.target.name] = e.target.value;
    newState.book = newBook;
    this.setState(newState);
  },

  renderEditOrSaveButton: function() {
    if (this.state.isEditingBook) {
      return <button onClick={this.onSaveBookClick}>Save</button>;
    } else {
       return <button onClick={this.onEditBookClick}>Edit</button>;
    }
  } ,

  renderTitle: function() {
     if (this.state.isEditingBook) {
      return <input name="title" onChange={this.onInputChange} value={this.state.book.title} />;
    } else {
       return <h1>{this.state.book.title}</h1>;
    }
  },

  renderDescription: function() {
     if (this.state.isEditingBook) {
      return <textarea name="description" onChange={this.onInputChange} value={this.state.book.description} />;
    } else {
       return <p>{this.state.book.description}</p>;
    }
  },

   renderSourceLanguage: function() {
     if (this.state.isEditingBook) {
      return <input name="source_language" onChange={this.onInputChange} value={this.state.book.source_language} />;
    } else {
       return <h1 className="language source" title={this.state.book.source_language}>{this.state.book.source_language}</h1>;
    }
  },

   renderTargetLanguage: function() {
     if (this.state.isEditingBook) {
      return <input name="target_language" onChange={this.onInputChange} value={this.state.book.target_language} />;
    } else {
       return <h1 className="language target" title={this.state.book.target_language}>{this.state.book.target_language}</h1>;
    }
  },

  render: function() {
    return (
       <div className="book">
        <a href="/">Back</a>
        <button onClick={this.onDeleteBookClick}>Delete</button>
        {this.renderEditOrSaveButton()}
        <div className="info">
          <div className="wrapper">
            { this.renderTitle() }
            { this.renderDescription() }
          </div>
        </div>
        <div className="NObannerWrapper"></div>
        <div className="cardinality">
          <section>
            { this.renderSourceLanguage() }
            <img className="icon cardinality" src={this.props.cardinality} alt=""/>
            { this.renderTargetLanguage() }
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

