class Dictionary extends React.Component {
  render () {
    return (
       <div className="dictionary">
        <section className="content-wrapper">
          <ul className="content">{this.renderPhrasePairs()}</ul>
          {/*
          <div className="inputMethod">
            <p>bla</p>
          </div>
          */}
          <div className="newPhrase">
            <input ref="sourceInput" className="sourcePhrase input" type="text" placeholder="source"/>
            <button className="savePhrase" onClick={this.onSourcePhraseSubmit.bind(this)}>Save</button>

            <input ref="targetInput" className="targetPhrase input" type="text" placeholder="target"/>
            <button className="savePhrase" onClick={this.onTargetPhraseSubmit.bind(this)}>Save</button>
          </div>
        </section>
       </div>
    )
  }

  onSourcePhraseSubmit() {
    this.props.onSourcePhraseSubmit(this.refs.sourceInput.value)
  }

  onTargetPhraseSubmit() {
    this.props.onTargetPhraseSubmit(this.refs.targetInput.value)
  }

  renderPhrasePairs() {
    return this.props.phrasePairs.map((phrasePair, index) => {
      return <PhrasePair phrasePair={phrasePair} key={index}/>
    })
  }
}

