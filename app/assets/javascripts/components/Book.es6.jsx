Book = React.createClass( {
  displayLanguageName: function(language_name) {
    if(language_name) {
      return language_name.name
    } else {
      return ""
    }
  },

  getInitialState: function() {
    return {
      phrasePairs: this.props.initialPhrasePairs,
      isEditingBook: false,
      book: this.props.initialBook,
      sourceLanguageName: this.displayLanguageName(this.props.sourceLanguageName),
      targetLanguageName: this.displayLanguageName(this.props.targetLanguageName)
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
        console.log('Error: Save action failed')
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
    var newState = this.state;

    if (e.target.name === "title" || e.target.name === "description"){
      var newBook = this.state.book;
      newBook[e.target.name] = e.target.value;
      newState.book = newBook;
      this.setState(newState);
    }

    else {
      newState[e.target.name] = e.target.value
      this.setState(newState)
    }

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
            <button title="Save" onClick={this.onSaveBookClick} className="save icon"></button>
            <button title="Cancel" onClick={this.toggleEditingBookState} className="close icon"></button>
          </div>
        );
      } else {
        return (
          <div className="menu">
            <button className="more icon"></button>
            <button title="Edit" onClick={this.toggleEditingBookState} className="edit icon"></button>
            <button title="Delete" onClick={this.onDeleteBookClick} className="trash icon"></button>
          </div>
        );
      }
    }
  },

  renderTitle: function() {
     if (this.state.isEditingBook) {
      return <input name="title" className="title new isEditing" onChange={this.onInputChange} value={this.props.initialBook.title} />;
    } else {
       return <h1>{this.state.book.title}</h1>;
    }
  },

  renderAuthor: function() {
    return <p>{this.state.book.user_id}</p>
  },

  renderDescription: function() {
     if (this.state.isEditingBook) {
      return <textarea rows="4" className="description new isEditing" name="description" onChange={this.onInputChange} value={this.props.initialBook.description} />;
    } else {
       return <p>{this.state.book.description}</p>;
    }
  },

   renderSourceLanguage: function() {
     if (this.state.isEditingBook) {
      return <input className="new isEditing" name="sourceLanguageName" onChange={this.onInputChange} value={this.state.sourceLanguageName} />;
    } else {
       return <h1 className="language source" title={this.props.sourceLanguageName.name}>{this.props.sourceLanguageName.name} ({this.props.sourceLanguageIso})</h1>;
    }
  },

   renderTargetLanguage: function() {
     if (this.state.isEditingBook) {
      return <input className="new isEditing" name="targetLanguageName" onChange={this.onInputChange} value={this.state.targetLanguageName} />;
    } else {
       return <h1 className="language target" title={this.props.targetLanguageName.name}>{this.props.targetLanguageName.name} ({this.props.targetLanguageIso})</h1>;
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
              {/* this.renderAuthor() */}
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

