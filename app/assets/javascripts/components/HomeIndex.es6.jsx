class HomeIndex extends React.Component {
  render () {
    return (
      <div>
        <nav>
          <a href="/sign_in">Log in</a>
        </nav>
        <div className="container dashboard">
          <section>
            <h3>Books</h3>
            <ul className="content">{this.renderBooks()}</ul>
          </section>
          <a href="/books/new">Create a book</a>
        </div>
      </div>
      )
  }

  renderBooks() {
    return this.props.books.map((book) => {
      return <BookEntry book={book} key={book.id}></BookEntry>
    })
  }
}

