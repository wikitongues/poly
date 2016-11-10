class PhrasePair extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isEditingPhrase: false,
      sourcePhrase: this.props.initialSourcePhrase,
      targetPhrase: this.props.initialTargetPhrase,
    };
    this.toggleEditingPhraseStat = this.toggleEditingPhraseState.bind(this);
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
        this.toggleEditingPhraseState();
      }.bind(this),
      error() {
        console.log('Error: Could not save phrase');
      },
    });
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

  renderPhraseMenu() {
    if (this.props.isOwnedByCurrentUser) {
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

  renderPhrasePair() {
    if (this.state.isEditingPhrase) {
      return (
        <ul>
          <form onSubmit={this.onSavePhraseClick}>
            <li className="source text">
              <input
                value={this.state.sourcePhrase}
                onChange={this.onSourceChange}
                name="sourcePhrase"
              />
            </li>
            <li className="target text">
              <input
                value={this.state.targetPhrase}
                onChange={this.onTargetChange}
                name="targetPhrase"
              />
            </li>
            { this.renderPhraseMenu() }
          </form>
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
    );
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
  id: React.PropTypes.number,
  isOwnedByCurrentUser: React.PropTypes.bool,
  flip: React.PropTypes.string,
  save: React.PropTypes.string,
  close: React.PropTypes.string,
  menu: React.PropTypes.string,
  edit: React.PropTypes.string,
  delete: React.PropTypes.string,
};
