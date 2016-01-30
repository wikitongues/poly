class HomeIndex extends React.Component {
  render () {
    return (
          <div>
            {this.renderBooks()}
          </div>
      )
  }

  renderBooks() {
    return this.props.books.map((book) => {
      return <BookEntry book={book} key={book.id}></BookEntry>
    })
  }
}

