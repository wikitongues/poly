SearchResults = React.createClass ( {

  renderCreateBookPanel: function() {
    if (this.props.currentUser) {
      return (
        <a href="/books/new" title="Create a new book">New book</a>
      )
    } else {
      return (
        <a href="/sign_in" title="Create a new book">Log in to create new books</a>
      )
    }
  },

  renderCreateBookButton: function() {
    if (this.props.currentUser) {
      return (
        <a href="/books/new" className="newBook" title="Create a new book">+</a>
      )
    }
  },

  renderSearchResults: function() {
    if (this.props.sourceLanguage.length != 0 || this.props.targetLanguage != 0 || this.props.bookTitle != 0) {
      return (
        <div className="indexContent">
          {this.renderSourceResultSection()}
          {this.renderTargetResultSection()}
        </div>
      )
    } else {
      return (
        <span className="emptySearch">No results for "{this.props.query}"</span>
      )
    }
  },

  renderSourceResultSection: function() {
    if (this.props.sourceLanguage.length != 0) {
      return (
        <span>
          <div className="controlPanel">
            <p>Source Language contains "{this.props.query}"</p>
          </div>
          <ul className="bookEntryList">
            {this.renderSourceResults()}
          </ul>
        </span>
      )
    }
  },

  renderSourceResults: function() {
    return this.props.sourceLanguage.map((book) => {
      return (
        <BookEntry users={this.props.users} book={book} key={book.id} cardinality={this.props.cardinality}></BookEntry>
      )
    })
  },

  renderTargetResultSection: function() {
    if (this.props.targetLanguage.length != 0) {
      return (
        <span>
          <div className="controlPanel">
            <p>Target Language contains "{this.props.query}"</p>
          </div>
          <ul className="bookEntryList">
            {this.renderTargetResults()}
          </ul>
        </span>
      )
    }
  },

  renderTargetResults: function() {
    return this.props.targetLanguage.map((book) => {
      return (
        <BookEntry users={this.props.users} book={book} key={book.id} cardinality={this.props.cardinality}></BookEntry>
      )
    })
  },

  render: function() {
    return (
      <div className="container">
        <NavBar currentUser={this.props.currentUser} query={this.props.query} logo={this.props.logo} detail={this.props.detail} search={this.props.search}/>
        <div className="dashboard">
          <span className="backgroundElement"></span>
          {this.renderSearchResults()}
          {this.renderCreateBookButton()}
      </div>
    </div>
    )
  }
} )
