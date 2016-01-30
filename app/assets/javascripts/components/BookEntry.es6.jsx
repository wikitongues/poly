class BookEntry extends React.Component {
  render () {
    return (
       <a href={"/books/"+this.props.book.id}>
          title: {this.props.book.title} .
          description: {this.props.book.description}
       </ a>
    )
  }
}

