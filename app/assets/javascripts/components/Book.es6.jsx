class Book extends React.Component {
  render () {
    return (
       <div className="balls">
          title: {this.props.book.title} .
          description: {this.props.book.description}
          <Dictionary
            dictionary={this.props.dictionary}
            phrasePairs={this.props.phrasePairs}/>
       </div>
    )
  }
}

