Dictionary = React.createClass( {

  getInitialState: function() {
    return {
      isPhraseInputInactive: true,
      isPhraseInputActive: false,
      isSourceInputActive: false,
      isTargetInputActive: false
    }
  },

  onSourcePhraseSubmit() {
    this.props.onSourcePhraseSubmit(this.refs.sourceInput.value)
  },

  onTargetPhraseSubmit() {
    this.props.onTargetPhraseSubmit(this.refs.targetInput.value)
  },

  renderPhrasePairs() {
    return this.props.phrasePairs.map((phrasePair, index) => {
      return <PhrasePair phrasePair={phrasePair} key={index}/>
    })
  },

  render: function() {
    return (
       <div className="dictionary">
        <section className="content-wrapper">
          <ul className="content">{this.renderPhrasePairs()}</ul>
          {/*
          <div className="inputMethod">
            <p>bla</p>
          </div>
          */}
          <div className="addPhrase">
            <button>+</button>
          </div>
          <div className="newPhrase">
            <input ref="sourceInput" className="sourcePhrase input" type="text" placeholder="Source"/>
            <button className="savePhrase" onClick={this.onSourcePhraseSubmit.bind(this)}>Save</button>

            <input ref="targetInput" className="targetPhrase input" type="text" placeholder="Target"/>
            <button className="savePhrase" onClick={this.onTargetPhraseSubmit.bind(this)}>Save</button>
          </div>
        </section>
       </div>
    )
  }
} )