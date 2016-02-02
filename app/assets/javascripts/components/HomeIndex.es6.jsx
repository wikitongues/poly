class HomeIndex extends React.Component {
  render () {
    return (
          <div className="container dashboard">
            <section>
              <h3>Books</h3>
              <ul className="content">{this.renderBooks()}</ul>
            </section>
          </div>
      )
  }

  renderBooks() {
    return this.props.books.map((book) => {
      return <BookEntry book={book} key={book.id}></BookEntry>
    })
  }
}

