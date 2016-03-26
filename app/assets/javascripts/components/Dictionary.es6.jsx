class Dictionary extends React.Component {
  render () {
    return (
       <div>
        <section className="content-wrapper">
          <ul className="content">{this.renderPhrasePairs()}</ul>
          <div>
            <input value="glarb" ref="sourceInput" className="sourcePhrase" type="text" placeholder="source"/>
            <button onClick={this.onSourcePhraseSubmit.bind(this)}>Save</button>
          </div>
          <div>
            <input value="target" ref="targetInput" className="targetPhrase" type="text" placeholder="target"/>
            <button onClick={this.onTargetPhraseSubmit.bind(this)}>Save</button>
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

