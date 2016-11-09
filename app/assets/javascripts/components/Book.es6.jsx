Book = React.createClass( {

  getInitialState: function() {
    return {
      phrasePairs: this.props.initialPhrasePairs,
      isEditingBook: false,
      book: this.props.initialBook,
      isDescriptionTruncated:true,
      isFavoriteBook: this.isFavoriteBook(),
      errors:[]
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

  onDeleteBookClick: function() {
    var id = this.state.book.id
    bootbox.confirm({
      message: "Are you sure you want to delete this book?",
      closeButton:false,
      callback: function(result) {
        if(result === true) {
          $.ajax({
            url: '/books/' + id,
            type: 'DELETE',
            success: function() {
              window.location.href = '/dashboard';
            }
          })
        }
      }
    })
  },

  onSaveBookClick: function() {
    this.state.errors = []
    if(this.state.book.title && this.state.book.source_language && this.state.book.target_language) {
      $.ajax({
        url: '/books/' + this.state.book.id,
        type: "PUT",
        data: { book: this.state.book },
        success: function() {
          this.cancelEditingBookState();
        }.bind(this),
        error: function() {
          bootbox.alert({
            message: "something went wrong",
            closeButton:false})
        }
      })
    } else {
      if(!this.state.book.title) {this.state.errors.push(" Title")}
      if(!this.state.book.source_language) {this.state.errors.push(" Source language")}
      if(!this.state.book.target_language) {this.state.errors.push(" Target language")}
      bootbox.alert({
        message: "Your book is missing the following required details:"+(this.state.errors),
        closeButton:false})
    }
  },

  onInvertLanguagesClick:function(e){
    var newBook = this.state.book;
    var sourceLanguage = this.state.book.source_language;
    var targetLanguage = this.state.book.target_language;
    newBook.source_language = targetLanguage
    newBook.target_language = sourceLanguage
    this.setState({book: newBook});
  },

  toggleEditingBookState: function() {
    this.setState({
      isEditingBook: true
    });
  },

  toggleBookStatus: function() {
    var newBook = this.state.book;
    var newStatus;
    if (newBook.status === 'private') {
      if(window.confirm("Caution: You're about to make this book public.")) {
        newStatus = 'public';
      } else {newStatus = 'private';}
    }  else {
      if(window.confirm("Caution: You're about to make this book private. Private books are hidden from the general public. Are you sure you want to continue?")) {
        newStatus = 'private';
      }  else {newStatus = 'public';}
    }
    newBook.status = newStatus;
    $.ajax({
      url: '/books/' + this.state.book.id,
      type: "PUT",
      data: { book: newBook },
      success: function() {
        this.setState({book: newBook})
      }.bind(this),
      error: function() {
        alert('something went wrong')
      }
    })
  },

  cancelEditingBookState: function() {
    this.setState({
      isEditingBook: false
    })
  },

  onInputChange: function(e) {
    var newBook = this.state.book;
    var newState = this.state;
    newBook[e.target.name] = e.target.value;
    newState.book = newBook;
    this.setState(newState);
  },

  onClickFavoriteBook: function() {
    if (this.state.isFavoriteBook) {
      this.destroyFavorite();
    } else {
      this.createFavorite();
    }
  },

  destroyFavorite: function() {
    $.ajax({
      url: '/favorites/' + this.state.book.id,
      type: 'DELETE',
      success: function(book) {
        this.toggleFavoriteBook();
      }.bind(this),
      error: function(error) {
        console.log('something went wrong')
      }
    })
  },

  createFavorite: function() {
    $.ajax({
      url: '/favorites',
      type: 'POST',
      data: {
        book_id: this.state.book.id
      },
      success: function(book) {
        this.toggleFavoriteBook();
      }.bind(this),
      error: function(error) {
        console.log('something went wrong')
      }
    })
  },

  toggleFavoriteBook: function() {
    this.setState({
      isFavoriteBook: !this.state.isFavoriteBook
    })
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
            <button title="Flip" onClick={this.onInvertLanguagesClick} className="icon">
              <img src={this.props.flipAlt}/>
            </button>
            <button title="Save" onClick={this.onSaveBookClick} className="icon">
              <img src={this.props.saveAlt}/>
            </button>
            <button title="Cancel" onClick={this.cancelEditingBookState} className="close icon">
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
            {this.renderBookStatus()}
            <button title="Edit" onClick={this.toggleEditingBookState} className="icon" tabIndex="-1">
              <img src={this.props.editAlt}/>
            </button>
            <button title="Delete" onClick={this.onDeleteBookClick} className="icon" tabIndex="-1">
              <img src={this.props.deleteAlt}/>
            </button>
          </div>
        );
      }
    }
  },

  renderBookStatus: function() {
    if(this.state.book.status == "public") {
      return(
        <button title="Make private" onClick={this.toggleBookStatus} className="icon" tabIndex="-1">
          <img src={this.props.public}/>
        </button>
      )
    } else {
      return (
        <button title="Make public" onClick={this.toggleBookStatus} className="icon" tabIndex="-1">
          <img src={this.props.private}/>
        </button>
      )
    }
  },

  renderTitle: function() {
     if (this.state.isEditingBook) {
      return <input name="title" className="title new isEditing" onChange={this.onInputChange} value={this.state.book.title} />;
    } else {
       return <h1 title={this.state.book.title}>{this.state.book.title} {this.renderStatus()}</h1>;
    }
  },

  renderStatus: function() {
    if(this.state.book.status =="private") {
      return(<span title="This book is closed to the public." className="status">PRIVATE</span>)
    } else {}
  },

  renderAuthor: function() {
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
          <a href={"/dashboard"} className="author">{authorName}</a>
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
        return <textarea rows="5" className="description new isEditing" name="description" onChange={this.onInputChange} value={this.state.book.description} placeholder="Describe the contents of your book, Ex: A collection of useful phrases in Laputa, a Swiftian language spoken in Balnibarbi and a number of other islands..."/>;
      }
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

  favoriteImage: function() {
    return this.state.isFavoriteBook
      ? this.props.star
      : this.props.unstar;
  },

  isFavoriteBook: function() {
    if (this.props.currentUser) {
        return this.props.currentUser.favorite_books.filter(function(favorite) {
          return favorite.book_id === this.props.initialBook.id
        }.bind(this)).length > 0;
    }
  },

  renderFavoriteButton: function() {
    if(this.props.currentUser) {
      return (
        <button title="Favorite" onClick={this.onClickFavoriteBook} className="favorite icon">
          <img src={this.favoriteImage()} alt="Favorite"/>
        </button>
      )
    }
  },

  render: function() {
    return (
      <div className="container">
        <NavBar currentUser={this.props.currentUser} logo={this.props.logo} detail={this.props.detail} search={this.props.search}/>
        <span className="backgroundElement"></span>
        <div className={"book "+this.state.book.status}>
          <div className="tools">
            {this.renderFavoriteButton()}
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
          flip={this.props.flip}
          save={this.props.save}
          delete={this.props.delete}
          edit={this.props.edit}
          close={this.props.close}
          />
        </div>
      </div>
    )
  }
})

