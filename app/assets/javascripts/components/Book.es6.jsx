class Book extends React.Component {
  render () {
    return (
       <div>
          title: {this.props.book.title} .
          description: {this.props.book.description}
       </div>
    )
  }
}

