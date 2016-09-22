Book = React.createClass( {

  getInitialState() {
    return {
      phrasePairs: this.props.initialPhrasePairs,
      isEditingBook: false,
      book: this.props.initialBook,
      isDescriptionTruncated:true
    }
  },

  onSourcePhraseSubmit(sourcePhrase) {
    var newPhrasePair = {
      source_phrase: sourcePhrase,
    };
    var newPhrasePairs = this.state.phrasePairs;
    newPhrasePairs.push(newPhrasePair);
    this.setState({
      phrasePairs: newPhrasePairs
    })
  },

  onTargetPhraseSubmit(targetPhrase) {
    var newPhrasePairs = this.state.phrasePairs;
    var newPhrasePair = newPhrasePairs[newPhrasePairs.length - 1]
    newPhrasePair.target_phrase = targetPhrase;
    this.setState({
      phrasePairs: newPhrasePairs
    })
    this.saveNewPhrasePair(newPhrasePair);
  },

  saveNewPhrasePair(phrasePair) {
    $.ajax({
      url: "/phrase_pairs",
      type: "POST",
      data: {
        book_id: this.state.book.id,
        phrase_pair: phrasePair
      },
      success: function(phrasePair) {
        var newPhrasePairs = this.state.phrasePairs;
        newPhrasePairs.splice(this.state.phrasePairs.length -1, 1, phrasePair.phrase_pair)
        this.setState({
          phrasePairs: newPhrasePairs
        })
      }.bind(this),
      error: function() {
        console.log('Error: Save action failed')
      }
    })
  },

  onDeleteBookClick() {
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

  onSaveBookClick() {
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

  onInputChange(e) {
    var newBook = this.state.book;
    var newState = this.state;
    newBook[e.target.name] = e.target.value;
    newState.book = newBook;
    this.setState(newState);
  },

  onSearchBook: function() {
    alert("Searching is coming soon!")
  },

  onFavoriteBook: function() {
    alert("Favoriting is coming soon!")
  },

  bookIsOwnedByCurrentUser: function() {
    if (this.props.currentUser) {
      return this.props.initialBook.user_id == this.props.currentUser.id
    }
  },

  renderBookMenu() {
    if (this.bookIsOwnedByCurrentUser()) {
      if (this.state.isEditingBook) {
        return (
          <div className="menu saving">
            <button title="Save" onClick={this.onSaveBookClick} className="icon">
              <img src={this.props.saveAlt}/>
            </button>
            <button title="Cancel" onClick={this.toggleEditingBookState} className="close icon">
              <img src={this.props.closeAlt}/>
            </button>
          </div>
        );
      } else {
        return (
          <div className="menu">
            <button title="Menu" className="more icon">
              <img src={this.props.menuAlt}/>
            </button>
            <button title="Edit" onClick={this.toggleEditingBookState} className="icon">
              <img src={this.props.editAlt}/>
            </button>
            <button title="Delete" onClick={this.onDeleteBookClick} className="icon">
              <img src={this.props.deleteAlt}/>
            </button>
          </div>
        );
      }
    }
  },

  renderTitle() {
     if (this.state.isEditingBook) {
      return <input name="title" className="title new isEditing" onChange={this.onInputChange} value={this.state.book.title} />;
    } else {
       return <h1>{this.state.book.title}</h1>;
    }
  },

  renderAuthor() {
    let users = this.props.users
    let authorName = ""
    for (var i = users.length - 1; i >= 0; i--) {
      if(this.props.initialBook.user_id == users[i].id) {
        authorName = users[i].username
      }
    }

    if (this.bookIsOwnedByCurrentUser()) {
      if (this.state.isEditingBook) {
        return (
          <p className="author">{authorName}</p>
        )
      } else {
        return (
          <a href={"/account"} className="author">{authorName}</a>
        )
      }
    } else {
      return (
          <a href={"/users/" + this.state.book.user_id} className="author">{authorName}</a>
        )
    }
  },

  truncateText: function() {
    this.setState({
      isDescriptionTruncated: !this.state.isDescriptionTruncated
    });
  },

  renderTruncatedDescription: function() {
    if(this.state.book.description.length >= 132) {
      if (this.state.isDescriptionTruncated) {
        return <p className="description">{this.state.book.description.substring(0,132)}... <button onClick={this.truncateText}>More</button></p>;
      } else {
        return <p className="description">{this.state.book.description} <button onClick={this.truncateText}>Less</button></p>;
      }
    } else {
      return <p className="description">{this.state.book.description}</p>;
    }
  },

  renderDescription: function() {
   if (this.state.book.description) {
      if (this.state.isEditingBook) {
        return <textarea rows="4" className="description new isEditing" name="description" onChange={this.onInputChange} value={this.state.book.description} />;
      } else {
         return <span>{this.renderTruncatedDescription()}</span>
      }
    } else {
      if (this.state.isEditingBook) {
        return <textarea rows="4" className="description new isEditing" name="description" onChange={this.onInputChange} value={this.state.book.description} placeholder="A collection of useful phrases in Laputa, a Swiftian language spoken in Balnibarbi and a number of other islands..."/>;
      }
    }
  },

   renderSourceLanguage() {
     if (this.state.isEditingBook) {
      return <input className="new isEditing" name="source_language" onChange={this.onInputChange} value={this.state.book.source_language} />;
    } else {
       return <h1 className="language source" title={this.state.book.source_language}>{this.state.book.source_language}</h1>;
    }
  },

   renderTargetLanguage() {
     if (this.state.isEditingBook) {
      return <input className="new isEditing" name="target_language" onChange={this.onInputChange} value={this.state.book.target_language} />;
    } else {
       return <h1 className="language target" title={this.state.book.target_language}>{this.state.book.target_language}</h1>;
    }
  },

  render() {
    return (
      <div className="container">
        <NavBar currentUser={this.props.currentUser} logo={this.props.logo} search={this.props.search}/>
        <span className="backgroundElement"></span>
        <div className="book">
          <div className="tools">
            <button title="Favorite" onClick={this.onFavoriteBook} className="favorite icon">
              <img src={this.props.unstar} alt="Favorite"/>
            </button>
            <div className="cardinality">
              <section>
                { this.renderSourceLanguage() }
                <img src={this.props.cardinality} alt=""/>
                { this.renderTargetLanguage() }
              </section>
            </div>
            { this.renderBookMenu() }
          </div>
          <div className="info">
            <div className="wrapper">
              { this.renderTitle() }
              { this.renderAuthor() }
              { this.renderDescription() }
            </div>
          </div>
          {/*<ProgressBar />*/}
          <div className="NObannerWrapper"></div>

          <Dictionary
          isOwnedByCurrentUser={this.bookIsOwnedByCurrentUser()}
          initialPhrasePairs={this.state.phrasePairs}
          onSourcePhraseSubmit={this.onSourcePhraseSubmit}
          onTargetPhraseSubmit={this.onTargetPhraseSubmit}
          menu={this.props.menu}
          save={this.props.save}
          delete={this.props.delete}
          edit={this.props.edit}
          text={this.props.text}
          textAlt={this.props.textAlt}
          video={this.props.video}
          videoAlt={this.props.videoAlt}
          close={this.props.close}
          closeAlt={this.props.closeAlt} />
        </div>
      </div>
    )
  }
} );

