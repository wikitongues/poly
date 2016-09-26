PhrasePair = React.createClass( {

  getInitialState() {
    return {
      isSourcePhraseVideo: false,
      isTargetPhraseVideo: false,
      isEditingPhrase: false,
      sourcePhrase: this.props.initialSourcePhrase,
      targetPhrase: this.props.initialTargetPhrase
    }
  },

  componentWillReceiveProps(nextProps) {
    this.setState({
      sourcePhrase: nextProps.initialSourcePhrase,
      targetPhrase: nextProps.initialTargetPhrase
    })
  },

  componentWillMount() {
    if (this.state.sourcePhrase.startsWith('https://www.youtube')) {
      this.setState({ isSourcePhraseVideo: true });
    } else {
      this.setState({ isSourcePhraseVideo: false });
    }
    if (this.state.targetPhrase.startsWith('https://www.youtube')) {
      this.setState({ isTargetPhraseVideo: true });
    } else {
      this.setState({ isTargetPhraseVideo: false });
    }
  },

  toggleEditingPhraseState() {
      this.setState({
        isEditingPhrase: !this.state.isEditingPhrase
    });
  },

  cancelEditingPhraseState: function() {
    this.setState({
      sourcePhrase: this.props.initialSourcePhrase,
      targetPhrase: this.props.initialTargetPhrase,
      isEditingPhrase: false
    })
  },

  onDeletePhraseClick: function() {
    this.props.onDeletePhrasePair(this.props.id)
  },

  onSavePhraseClick:function(e){
    e.preventDefault();
    $.ajax({
      url: '/phrase_pairs/' + this.props.id,
      type: 'PUT',
      data: {
        phrase_pair: {
          source_phrase: this.state.sourcePhrase,
          target_phrase: this.state.targetPhrase
        }
      },
      success: function() {
        this.toggleEditingPhraseState();
      }.bind(this),
      error: function() {
        console.log("Error: Could not save phrase")
      }
    })
  },

  onEditPhraseClick() {
    this.toggleEditingPhraseState();
  },

  onSourceChange(e) {
    this.setState({ sourcePhrase: e.target.value })
  },

  onTargetChange(e) {
    this.setState({ targetPhrase: e.target.value })
  },

  renderPhraseMenu() {
    if (this.props.isOwnedByCurrentUser) {
      if (this.state.isEditingPhrase) {
        return (
          <li className="menu saving">
            <button title="Save" onClick={this.onSavePhraseClick} className="icon">
              <img src={this.props.save}/>
            </button>
            <button title="Cancel" onClick={this.cancelEditingPhraseState} className="close icon">
              <img src={this.props.close}/>
            </button>
          </li>
        );
      } else {
        if(this.state.isSourcePhraseVideo && this.state.isTargetPhraseVideo) {
          return (
            <li className="menu">
              <button title="Menu" className="more icon">
                <img src={this.props.menu}/>
              </button>
              <button disabled title="Edit" onClick={this.onEditPhraseClick} className="icon">
                <img src={this.props.edit}/>
              </button>
              <button title="Delete" onClick={this.onDeletePhraseClick} className="icon">
                <img src={this.props.delete}/>
              </button>
            </li>
          );          
        }
        return (
          <li className="menu">
            <button title="Menu" className="more icon">
              <img src={this.props.menu}/>
            </button>
            <button title="Edit" onClick={this.onEditPhraseClick} className="icon">
              <img src={this.props.edit}/>
            </button>
            <button title="Delete" onClick={this.onDeletePhraseClick} className="icon">
              <img src={this.props.delete}/>
            </button>
          </li>
        );
      }
    }
  },

  renderPhrasePair() {
     if (this.state.isEditingPhrase) {
      if (this.state.isSourcePhraseVideo) {
        return (
          <ul>
            <form onSubmit={this.onSavePhraseClick}>
              <li className="source text">
                <input
                  disabled
                  value={this.state.sourcePhrase}
                  onChange={this.onSourceChange}
                  name="sourcePhrase" />
              </li>
              <li className="target text">
                <input
                  value={this.state.targetPhrase}
                  onChange={this.onTargetChange}
                  name="targetPhrase" />
              </li>
              { this.renderPhraseMenu() }
            </form>
          </ul>
        );
      } else if (this.state.isTargetPhraseVideo) {
        return (
          <ul>
            <form onSubmit={this.onSavePhraseClick}>
              <li className="source text">
                <input
                  value={this.state.sourcePhrase}
                  onChange={this.onSourceChange}
                  name="sourcePhrase" />
              </li>
              <li className="target text">
                <input
                  disabled
                  value={this.state.targetPhrase}
                  onChange={this.onTargetChange}
                  name="targetPhrase" />
              </li>
              { this.renderPhraseMenu() }
            </form>
          </ul>
        );        
      }
      return (
        <ul>
          <form onSubmit={this.onSavePhraseClick}>
            <li className="source text">
              <input
                value={this.state.sourcePhrase}
                onChange={this.onSourceChange}
                name="sourcePhrase" />
            </li>
            <li className="target text">
              <input
                value={this.state.targetPhrase}
                onChange={this.onTargetChange}
                name="targetPhrase" />
            </li>
            { this.renderPhraseMenu() }
          </form>
        </ul>
      )
    } else {
      if(this.state.isSourcePhraseVideo === true && this.state.isTargetPhraseVideo === true) {
        return (
          <ul>
            <li className="source text">
              <iframe
                width="420"
                height="315"
                src={this.state.sourcePhrase}
                frameBorder="0"
              />
            </li>
            <li className="target text">
              <iframe
                width="420"
                height="315"
                src={this.state.targetPhrase}
                frameBorder="0"
              />
            </li>
            { this.renderPhraseMenu() }
          </ul>
        );
      } else if (this.state.isSourcePhraseVideo === true && this.state.isTargetPhraseVideo === false) {
        return (
          <ul>
            <li className="source text">
              <iframe
                width="420"
                height="315"
                src={this.state.sourcePhrase}
                frameBorder="0"
              />
            </li>
            <li className="target text">
              <p>{this.state.targetPhrase}</p>
            </li>
            { this.renderPhraseMenu() }
          </ul>          
        );    
      } else if (this.state.isSourcePhraseVideo === false && this.state.isTargetPhraseVideo === true) {
        return (
          <ul>
            <li className="source text">
              <p>{this.state.sourcePhrase}</p>
            </li>
            <li className="target text">
              <iframe
                width="420"
                height="315"
                src={this.state.targetPhrase}
                frameBorder="0"
              />
            </li>
            { this.renderPhraseMenu() }
          </ul>          
        );
      }
      return (
        <ul>
          <li className="source text">
            <p>{this.state.sourcePhrase}</p>
          </li>
          <li className="target text">
            <p>{this.state.targetPhrase}</p>
          </li>
          { this.renderPhraseMenu() }
        </ul>
      )
    }
  },

  render() {
    return (
       <li className="entry">
        { this.renderPhrasePair() }
      </li>
    )
  }
} );
