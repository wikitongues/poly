class Book extends React.Component {
  render () {
    return (
       <div className="book">
        <a href="/">Back</a>
        <div className="info">
          <div className="wrapper">
            <h1>{this.props.book.title}</h1>
            <p>{this.props.book.description}</p>
          </div>
        </div>
        <div className="bannerWrapper"></div>
        <div className="cardinality">
          <section>
            <h1 className="language source" title="Source Language">Source Language</h1>
            <img className="icon cardinality" src="app/assets/images/icons/i_cardinality.svg" alt=""/>
            <h1 className="language target" title="Target Language">Target Language</h1>
          </section>
        </div>
        <Dictionary
          dictionary={this.props.dictionary}
          phrasePairs={this.props.phrasePairs}/>
       </div>
    )
  }
}

