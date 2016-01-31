class PhrasePair extends React.Component {
  render () {
    return (
       <div>
          <p>{this.props.phrasePair.source_phrase}</p>
          <p>{this.props.phrasePair.target_phrase}</p>
       </div>
    )
  }
}

