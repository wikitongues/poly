Dictionary = React.createClass( {

  getInitialState: function() {
    return {
      isPhraseInputInactive: true,
      isTargetInputActive: false
    }
  },

  renderPhraseInputButton() {
    if (this.state.isPhraseInputInactive) {
      return (
        <div className="addPhrase">
          <button onClick={this.onPhraseInputButtonClick}>+</button>
        </div>
      )
    } else {
      return (
        <div>
          {this.renderPhraseInputField()}
        </div>
      )
    }
  },

  renderPhraseInputField() {
    if (this.state.isTargetInputActive) {
      return (
        <div className="newPhrase">
          <input ref="targetInput" className="targetPhrase input" type="text" placeholder="Target"/>
          <button className="savePhrase" onClick={this.onTargetPhraseSubmit}>Save</button>
        </div>
      )
    } else {
      return (
        <div className="newPhrase">
          <input ref="sourceInput" className="sourcePhrase input" type="text" placeholder="Source"/>
          <button className="savePhrase" onClick={this.onSourcePhraseSubmit}>Save</button>
        </div>
      )
    }
  },

  onPhraseInputButtonClick() {
    this.setState({
        isPhraseInputInactive: !this.state.isPhraseInputInactive
    });
  },

  onSourcePhraseSubmit() {
    this.props.onSourcePhraseSubmit(this.refs.sourceInput.value),
    this.setState({
        isTargetInputActive: !this.state.isTargetInputActive
    });
  },

  onTargetPhraseSubmit() {
    this.props.onTargetPhraseSubmit(this.refs.targetInput.value),
    this.setState({
      isPhraseInputInactive: !this.state.isPhraseInputInactive,
      isTargetInputActive: !this.state.isTargetInputActive
    });
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
          {this.renderPhraseInputButton()}
        </section>
       </div>
    )
  }
} )