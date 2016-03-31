class HomeIndex extends React.Component {
  render () {
    return (
      <div>
        <nav>
          <a href="/sign_in">Log in</a>
        </nav>
        <div className="container dashboard">
          <section>
            <ul className="content">{this.renderBooks()}</ul>
          </section>
          <a href="/books/new" className="newBook">+</a>
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

