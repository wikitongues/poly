HomeIndex = React.createClass ( {

  renderCreateBookButton: function() {
    if (this.props.currentUser) {
      return (
        <a href="/books/new" className="newBook" title="Create a new book">+</a>
      )
    }
  },

  renderBooks: function() {
    return this.props.books.map((book) => {
      return <BookEntry book={book} key={book.id}></BookEntry>
    })
  },

  renderWelcome: function() {
    if (this.props.currentUser === null) {
      return (
        <div className="welcome">
          <h1>Welcome to Poly</h1>
          <span className="logIn">
            <p>Please </p>
            <a href="/sign_in" className="action">Log in</a>
            <p> or </p>
             <a href="/sign_up" className="">Sign up</a>
           </span>
        </div>
      )
    }
    return null
  },

  render: function() {
    return (
      <div className="container">
        <NavBar currentUser={this.props.currentUser}/>
        {this.renderWelcome()}
        <div className="dashboard">
          <ul className="content">
            {this.renderBooks()}
          </ul>
          {this.renderCreateBookButton()}
      </div>
    </div>
    )
  }
} )