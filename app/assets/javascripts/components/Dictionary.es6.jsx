class Dictionary extends React.Component {
  render () {
    return (
       <div>
        <section className="content-wrapper">
          <ul className="content">{this.renderPhrasePairs()}</ul>
        </section>
       </div>
    )
  }

  renderPhrasePairs() {
    return this.props.phrasePairs.map((phrasePair) => {
      return <PhrasePair phrasePair={phrasePair} key={phrasePair.id}/>
    })
  }
}

