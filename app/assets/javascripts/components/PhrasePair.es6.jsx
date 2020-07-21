class PhrasePair extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isEditingPhrase: false,
      sourcePhrase: this.props.initialSourcePhrase,
      targetPhrase: this.props.initialTargetPhrase,
      isSourceVideoLoading: false,
      isTargetVideoLoading: false,
    };
    this.toggleEditingPhraseState = this.toggleEditingPhraseState.bind(this);
    this.cancelEditingPhraseState = this.cancelEditingPhraseState.bind(this);
    this.onDeletePhraseClick = this.onDeletePhraseClick.bind(this);
    this.onSavePhraseClick = this.onSavePhraseClick.bind(this);
    this.onInvertPhraseClick = this.onInvertPhraseClick.bind(this);
    this.onEditPhraseClick = this.onEditPhraseClick.bind(this);
    this.onSourceChange = this.onSourceChange.bind(this);
    this.onTargetChange = this.onTargetChange.bind(this);
    this.renderPhraseMenu = this.renderPhraseMenu.bind(this);
    this.renderPhrasePair = this.renderPhrasePair.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      sourcePhrase: nextProps.initialSourcePhrase,
      targetPhrase: nextProps.initialTargetPhrase,
    });
  }

  toggleEditingPhraseState() {
    this.setState({ isEditingPhrase: !this.state.isEditingPhrase });
  }

  cancelEditingPhraseState(e) {
    e.preventDefault();
    this.setState({
      sourcePhrase: this.props.initialSourcePhrase,
      targetPhrase: this.props.initialTargetPhrase,
      isEditingPhrase: false,
    });
  }

  onDeletePhraseClick() {
    this.props.onDeletePhrasePair(this.props.id);
  }

  onSavePhraseClick(e) {
    e.preventDefault();
    if (this.state.sourcePhrase && this.state.targetPhrase) {
      $.ajax({
        url: '/phrase_pairs/' + this.props.id,
        type: 'PUT',
        data: {
          phrase_pair: {
            source_phrase: this.state.sourcePhrase,
            target_phrase: this.state.targetPhrase,
          },
        },
        success: function () {
          this.props.onSaveEditPhrase(this.props.id, this.state.sourcePhrase, this.state.targetPhrase);
          this.toggleEditingPhraseState();
        }.bind(this),
        error() {
          console.log('Error: Could not save phrase');
        },
      });
    } else {
      if (this.state.sourcePhrase) {
        bootbox.alert({
          message: 'Target phrase is empty',
          closeButton: false,
        });
      } else {
        bootbox.alert({
          message: 'Source phrase is empty',
          closeButton: false,
        });
      }
    }
  }

  onInvertPhraseClick(e) {
    e.preventDefault();
    this.setState({
      sourcePhrase: this.state.targetPhrase,
      targetPhrase: this.state.sourcePhrase,
    });
  }

  onEditPhraseClick() {
    this.toggleEditingPhraseState();
  }

  onSourceChange(e) {
    this.setState({ sourcePhrase: e.target.value });
  }

  onTargetChange(e) {
    this.setState({ targetPhrase: e.target.value });
  }

  renderVideoLoader() {
    return (
      <span className="loader">
        <span><span></span></span>
        <span><span></span></span>
        <span><span></span></span>
      </span>
    );
  }

  renderSourceVideo(src) {
    if (this.state.isSourceVideoLoading !== false) {
      setTimeout(() => {
        this.setState({ isSourceVideoLoading: false });
      }, 10000);
    }

    if (false) {
      return (
        <div className="video">
          {this.renderVideoLoader()}
        </div>
      );
    }
    return (
      <div className="video">
        {this.renderVideo(src)}
      </div>
    );
  }

  renderTargetVideo(src) {
    if (this.state.isTargetVideoLoading !== false) {
      setTimeout(() => {
        this.setState({ isTargetVideoLoading: false });
      }, 10000);
    }

    if (false) {
      return (
        <div className="video">
          {this.renderVideoLoader()}
        </div>
      );
    }
    return (
      <span>
        <div className="video">
          {this.renderVideo(src)}
        </div>
      </span>
    );
  }

  renderVideo(src) {
    return <video src={src} controls loop></video>
  }

  renderSourceInput(status, src) {
    if(status) {
      return <div className="video"><video src={this.state.sourcePhrase}></video></div>
    } else {
      return (
        <input
          value={this.state.sourcePhrase}
          onChange={this.onSourceChange}
          name="sourcePhrase"/>
      );
    }
  }

  renderTargetInput(status, src) {
    if(status) {
      return <div className="video"><video src={this.state.targetPhrase}></video></div>
    } else {
      return (
        <input
          value={this.state.targetPhrase}
          onChange={this.onTargetChange}
          name="targetPhrase"/>
      );
    }
  }


  renderPhraseMenu() {
    if (this.props.isOwnedByCurrentUser && this.props.id) {
      if (this.state.isEditingPhrase) {
        return (
          <li className="menu saving">
            <button title="Flip" onClick={this.onInvertPhraseClick} className="icon">
              <img src={this.props.flip} />
            </button>
            <button title="Save" onClick={this.onSavePhraseClick} className="icon">
              <img src={this.props.save} />
            </button>
            <button title="Cancel" onClick={this.cancelEditingPhraseState} className="close icon">
              <img src={this.props.close} />
            </button>
          </li>
        );
      }
      return (
        <li className="menu">
          <button title="Menu" className="more icon">
            <img src={this.props.menu} />
          </button>
          <button title="Edit" onClick={this.onEditPhraseClick} className="icon">
            <img src={this.props.edit} />
          </button>
          <button title="Delete" onClick={this.onDeletePhraseClick} className="icon">
            <img src={this.props.delete} />
          </button>
        </li>
      );
    }
  }

  renderParagraph(text) {
    if (text) {
      return (
        <p>{text}</p>
      );
    }
    return (
      <p>
        <Progress/>
      </p>
    );
  }

  renderPhrasePair() {
    if (this.state.isEditingPhrase) {
      return (
        <ul>
          <form onSubmit={this.onSavePhraseClick}>
            <li className="source">
              {
                this.state.sourcePhrase.startsWith(`https://${this.props.awsBucket}.s3.amazonaws.com/`) ?
                  this.renderSourceInput(true)
                  :
                  this.renderSourceInput(false)
              }
            </li>
            <li className="target">
              {
                this.state.targetPhrase && this.state.targetPhrase.startsWith(`https://${this.props.awsBucket}.s3.amazonaws.com/`) ?
                  this.renderTargetInput(true)
                  :
                  this.renderTargetInput(false)
              }
            </li>
            { this.renderPhraseMenu() }
          </form>
        </ul>
      );
    } else {
      // Checks whether the source phrase or the target phrase is a video and renders video or a paragraph accordingly
      return (
        <ul>
          <li className="source">
            {
              this.state.sourcePhrase.startsWith(`https://${this.props.awsBucket}.s3.amazonaws.com/`) ?
                this.renderSourceVideo(this.state.sourcePhrase)
                :
                this.renderParagraph(this.state.sourcePhrase)
            }
          </li>
          <li className="target">
            {
              this.state.targetPhrase && this.state.targetPhrase.startsWith(`https://${this.props.awsBucket}.s3.amazonaws.com/`) ?
                this.renderTargetVideo(this.state.targetPhrase)
                :
                this.renderParagraph(this.state.targetPhrase)
            }
          </li>
          { this.renderPhraseMenu() }
        </ul>
      );
    }
  }

  render() {
    return (
      <li className="entry">
        { this.renderPhrasePair() }
      </li>
    );
  }
}

PhrasePair.propTypes = {
  initialSourcePhrase: React.PropTypes.string,
  initialTargetPhrase: React.PropTypes.string,
  onDeletePhrasePair: React.PropTypes.func,
  id: React.PropTypes.number,
  isOwnedByCurrentUser: React.PropTypes.bool,
  flip: React.PropTypes.string,
  save: React.PropTypes.string,
  close: React.PropTypes.string,
  menu: React.PropTypes.string,
  edit: React.PropTypes.string,
  delete: React.PropTypes.string,
  awsBucket: React.PropTypes.string
};
