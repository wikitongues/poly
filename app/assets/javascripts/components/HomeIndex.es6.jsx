HomeIndex = React.createClass ( {

  renderCreateBookButton: function() {
    if (this.props.currentUser) {
      return (
        <a href="/books/new" className="newBook">+</a>
      )
    }
  },

  renderBooks() {
    return this.props.books.map((book) => {
      return <BookEntry book={book} key={book.id}></BookEntry>
    })
  },

  renderWelcome() {
    if (this.props.currentUser === null) {
      return (
        <div className="welcome">
          <h1>Welcome to Poly</h1>
          <p>Please <a href="/sign_in" className="action">sign in</a> or <a href="/sign_up" className="action">sign up</a></p>
        </div>
      )
    }
    return null
  },

  render: function() {
    return (
      <div className="container">
        <NavBar currentUser={this.props.currentUser}/>
      <div className="dashboard">
        <ul className="content">
          {this.renderWelcome()}
          {this.renderBooks()}
        </ul>
        {this.renderCreateBookButton()}
      </div>
    </div>
    )
  }
} )