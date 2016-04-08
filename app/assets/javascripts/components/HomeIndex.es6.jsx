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

  render: function() {
    return (
      <div className="container">
        <NavBar currentUser={this.props.currentUser}/>
      <div className="dashboard">
        <ul className="content">{this.renderBooks()}</ul>
        {this.renderCreateBookButton()}
      </div>
    </div>
    )
  }
} )