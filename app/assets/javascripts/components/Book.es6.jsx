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
        console.log('Save action failed')
      }
    })
  },

  onDeleteBookClick: function() {
    if(window.confirm("Are you sure you want to delete this book?")) {
      $.ajax({
        url: '/books/' + this.state.book.id,
        type: 'DELETE',
        success: function() {
          window.location.href = '/';
        }
      })
    }
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

  onInputChange: function(e) {
    var newBook = this.state.book;
    var newState = this.state;
    newBook[e.target.name] = e.target.value;
    newState.book = newBook;
    this.setState(newState);
  },

  bookIsOwnedByCurrentUser: function() {
    if (this.props.currentUser) {
      return this.props.initialBook.user_id == this.props.currentUser.id
    }
  },

  renderBookMenu: function() {
    if (this.bookIsOwnedByCurrentUser()) {
      if (this.state.isEditingBook) {
        return (
          <div className="menu saving">
            <button title="Cancel" onClick={this.toggleEditingBookState} className="close icon"></button>
            <button title="Save" onClick={this.onSaveBookClick} className="save icon"></button>
          </div>
        );
      } else {
        return (
          <div className="menu">
            <span className="more icon"></span>
            <button title="Edit" onClick={this.toggleEditingBookState} className="edit icon"></button>
            <button title="Delete" onClick={this.onDeleteBookClick} className="trash icon"></button>
          </div>
        );
      }
    }
  },

  renderTitle: function() {
     if (this.state.isEditingBook) {
      return <input name="title" className="title new isEditing" onChange={this.onInputChange} value={this.state.book.title} />;
    } else {
       return <h1>{this.state.book.title}</h1>;
    }
  },

  renderAuthor: function() {
    return <p>{this.state.book.user_id}</p>
  },

  renderDescription: function() {
     if (this.state.isEditingBook) {
      return <textarea rows="4" className="description new isEditing" name="description" onChange={this.onInputChange} value={this.state.book.description} />;
    } else {
       return <p>{this.state.book.description}</p>;
    }
  },

   renderSourceLanguage: function() {
     if (this.state.isEditingBook) {
      return <input className="new isEditing" name="source_language" onChange={this.onInputChange} value={this.state.book.source_language} />;
    } else {
       return <h1 className="language source" title={this.state.book.source_language}>{this.state.book.source_language}</h1>;
    }
  },

   renderTargetLanguage: function() {
     if (this.state.isEditingBook) {
      return <input className="new isEditing" name="target_language" onChange={this.onInputChange} value={this.state.book.target_language} />;
    } else {
       return <h1 className="language target" title={this.state.book.target_language}>{this.state.book.target_language}</h1>;
    }
  },

  render: function() {
    return (
      <div className="container">
        <NavBar currentUser={this.props.currentUser} />
        <div className="book">
          <div className="info">
            <div className="wrapper">
              { this.renderTitle() }
              { this.renderAuthor() }
              { this.renderDescription() }
              { this.renderBookMenu() }
            </div>
          </div>
          <div className="NObannerWrapper"></div>
          <div className="cardinality">
            <section>
              { this.renderSourceLanguage() }
              <div className="icon cardinality book" alt=""/>
              { this.renderTargetLanguage() }
            </section>
          </div>
          <Dictionary
          isOwnedByCurrentUser={this.bookIsOwnedByCurrentUser()}
          initialPhrasePairs={this.state.phrasePairs}
          onSourcePhraseSubmit={this.onSourcePhraseSubmit}
          onTargetPhraseSubmit={this.onTargetPhraseSubmit} />
        </div>
      </div>
    )
  }
})

