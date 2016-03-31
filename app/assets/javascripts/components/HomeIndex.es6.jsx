class HomeIndex extends React.Component {
  render () {
    return (
      <div className="container">
        <nav>
          <a className="icon home" href="/"></a>
          <a className="signInButton" href="/sign_in">Sign in</a>
        </nav>
        <div className="dashboard">
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

