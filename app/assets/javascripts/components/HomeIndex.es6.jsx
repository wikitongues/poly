HomeIndex = React.createClass ( {

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

  renderBooks: function() {
    return this.props.books.map((book) => {
      return <BookEntry users={this.props.users} book={book} key={book.id} cardinality={this.props.cardinality}></BookEntry>
    })
  },

  render: function() {
    return (
      <div className="container">
        <NavBar currentUser={this.props.currentUser} logo={this.props.logo} detail={this.props.detail} search={this.props.search}/>
        <div className="dashboard">
          <span className="backgroundElement"></span>
          <div className="indexContent">
            <div className="controlPanel">
              {this.renderCreateBookPanel()}
            </div>
            <ul className="bookEntryList">
              {this.renderBooks()}
            </ul>
          </div>
          {this.renderCreateBookButton()}
      </div>
    </div>
    )
  }
} )
