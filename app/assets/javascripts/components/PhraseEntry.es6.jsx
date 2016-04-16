PhraseEntry = React.createClass ( {
  getInitialState: function(){
    return {sourcePhrase: "",
    targetPhrase: ""}
  },

  onSourcePhraseChange: function(e) {
    this.setState({sourcePhrase: e.target.value });
  },

  onTargetPhraseChange: function(e) {
    this.setState({targetPhrase: e.target.value });
  },

  onPhraseSubmit: function() {
    if (this.state.sourcePhrase.length > 0 && this.state.targetPhrase.length > 0){
      this.props.submitPhrase(this.state.sourcePhrase, this.state.targetPhrase)
      this.setState({
        sourcePhrase: "",
        targetPhrase: ""
      })
    } 
  },

  onCancelEditPhrase: function(){
    this.props.togglePhraseEntry()
  },


  render: function(){

      return (
          <div className="newPhrase">
            <input
              value={this.state.sourcePhrase}
              onChange={this.onSourcePhraseChange}
              className="sourcePhrase input"
              type="text"
              placeholder="Source"/>
            <input
              value={this.state.targetPhrase}
              onChange={this.onTargetPhraseChange}
              className="targetPhrase input"
              type="text"
              placeholder="Target"/>
            <button className="savePhrase" onClick={this.onPhraseSubmit}>Save</button>
            <button title="Cancel" onClick={this.onCancelEditPhrase} className="close icon"></button>
          </div>  
      )
  }
  
  
} )