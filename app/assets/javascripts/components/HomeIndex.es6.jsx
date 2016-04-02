HomeIndex = React.createClass ( {

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
          <section>
            <ul className="content">{this.renderBooks()}</ul>
          </section>
          <a href="/books/new" className="newBook">+</a>
        </div>
      </div>
      )
  }
} )