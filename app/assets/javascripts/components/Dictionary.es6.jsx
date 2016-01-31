class Dictionary extends React.Component {
  render () {
    return (
       <div>
        {this.renderPhrasePairs()}
       </div>
    )
  }

  renderPhrasePairs() {
    return this.props.phrasePairs.map((phrasePair) => {
      return <PhrasePair phrasePair={phrasePair} key={phrasePair.id}/>
    })
  }
}

