class Dictionary extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isPhraseInputActive: false,
      isTargetInputActive: false,
      isContinuousInputActive: false,
      phrasePairs: this.props.initialPhrasePairs,
      sourcePhrase: '',
      targetPhrase: '',
    };
    this.onAddNewPhraseButtonClick = this.onAddNewPhraseButtonClick.bind(this);
    this.onSourcePhraseChange = this.onSourcePhraseChange.bind(this);
    this.onSourcePhraseSubmit = this.onSourcePhraseSubmit.bind(this);
    this.onTargetPhraseChange = this.onTargetPhraseChange.bind(this);
    this.onTargetPhraseSubmit = this.onTargetPhraseSubmit.bind(this);
    this.onTargetPhraseMultipleSubmit = this.onTargetPhraseMultipleSubmit.bind(this);
    this.onContinuousInputClick = this.onContinuousInputClick.bind(this);
    this.onDeletePhrasePair = this.onDeletePhrasePair.bind(this);
    this.onCancelEditPhrase = this.onCancelEditPhrase.bind(this);
    this.renderPhrasePairs = this.renderPhrasePairs.bind(this);
    this.renderCreateNewPhraseButton = this.renderCreateNewPhraseButton.bind(this);
    this.renderPhraseInputFields = this.renderPhraseInputFields.bind(this);
    this.renderTargetInput = this.renderTargetInput.bind(this);
    this.renderInputMethod = this.renderInputMethod.bind(this);
  }

  componentWillReceiveProps(newProps) {
    this.setState({ phrasePairs: newProps.initialPhrasePairs });
  }

  componentDidUpdate() {
    if (this.refs.sourceInput) {
      this.refs.sourceInput.blur();
    }
    if (this.refs.targetInput) {
      this.refs.targetInput.blur();
    }
    if (this.state.isPhraseInputActive && this.refs.sourceInput) {
      this.refs.sourceInput.focus();
    }
    if (this.state.isTargetInputActive && this.refs.targetInput) {
      this.refs.targetInput.focus();
    }
  }

  onAddNewPhraseButtonClick() {
    this.setState({ isPhraseInputActive: !this.state.isPhraseInputActive });
  }

  onSourcePhraseChange(e) {
    this.setState({ sourcePhrase: e.target.value });
  }

  onSourcePhraseSubmit(e) {
    e.preventDefault();
    if (this.state.sourcePhrase) {
      this.props.onSourcePhraseSubmit(this.state.sourcePhrase);
      this.setState({
        isTargetInputActive: !this.state.isTargetInputActive,
        sourcePhrase: '',
      });
    } else {
      bootbox.alert({
        message: 'Source phrase is empty',
        closeButton: false,
      });
    }
  }

  onTargetPhraseChange(e) {
    this.setState({ targetPhrase: e.target.value });
  }

  onTargetPhraseSubmit(e) {
    e.preventDefault();
    if (this.state.targetPhrase) {
      this.props.onTargetPhraseSubmit(this.state.targetPhrase);
      this.setState({
        isPhraseInputActive: !this.state.isPhraseInputActive,
        isTargetInputActive: !this.state.isTargetInputActive,
        targetPhrase: '',
      });
    } else {
      bootbox.alert({
        message: 'Target phrase is empty',
        closeButton: false,
      });
    }
  }

  onTargetPhraseMultipleSubmit(e) {
    e.preventDefault();
    this.props.onTargetPhraseSubmit(this.state.targetPhrase);
    this.setState({
      isTargetInputActive: !this.state.isTargetInputActive,
      targetPhrase: '',
    });
  }

  onContinuousInputClick() {
    this.setState({ isContinuousInputActive: !this.state.isContinuousInputActive });
  }

  onDeletePhrasePair(phrasePairId) {
    if (window.confirm('Are you sure you want to delete this phrase?')) {
      $.ajax({
        url: '/phrase_pairs/' + phrasePairId,
        type: 'DELETE',
        success: function (response) {
          const phrasePairs = this.state.phrasePairs;
          const indexToRemove = _.findIndex(phrasePairs, (phrasePair) => {
            return phrasePair.id == response.id;
          });
          phrasePairs.splice(indexToRemove, 1);
          this.setState({ phrasePairs });
        }.bind(this),
        error() {
          console.log('Error: Could not delete phrase pair');
        },
      });
    }
  }

  onCancelEditPhrase() {
    this.setState({ isPhraseInputActive: !this.state.isPhraseInputActive });
  }

  renderPhrasePairs() {
    return this.state.phrasePairs.map((phrasePair, index) => {
      return (
        <PhrasePair
          id={phrasePair.id}
          isOwnedByCurrentUser={this.props.isOwnedByCurrentUser}
          initialSourcePhrase={phrasePair.source_phrase}
          initialTargetPhrase={phrasePair.target_phrase}
          key={index}
          onDeletePhrasePair={this.onDeletePhrasePair}
          menu={this.props.menu}
          flip={this.props.flip}
          save={this.props.save}
          delete={this.props.delete}
          edit={this.props.edit}
          close={this.props.close}
        />
      );
    });
  }

  renderPreSourcePhrase() {
    if (this.state.isPhraseInputActive == true && this.state.isTargetInputActive == false) {
      return (
         <li className="entry pre">
          <ul>
            <li className="source">
              <p><Progress /></p>
            </li>
            <li className="target">
              <p></p>
            </li>
          </ul>
        </li>
      );
    }
    if (this.state.isPhraseInputActive == false && this.state.phrasePairs.length == 0) {
      return <DummyContent />;
    }
  }

  renderCreateNewPhraseButton() {
    if (this.props.isOwnedByCurrentUser) {
      if (this.state.isPhraseInputActive) {
        return (
          <div>{this.renderPhraseInputFields()}</div>
        );
      }
      return (
        <button className="addPhrase" onClick={this.onAddNewPhraseButtonClick}>+</button>
      );
    }
  }

  renderPhraseInputFields() {
    if (this.state.isTargetInputActive) {
      return (
        <div>
          { this.renderInputMethod() }
          { this.renderTargetInput() }
        </div>
      );
    }
    return (
      <div>
        { this.renderInputMethod() }
        <form className="newPhrase" onSubmit={this.onSourcePhraseSubmit}>
          <input
            ref="sourceInput"
            value={this.state.sourcePhrase}
            onChange={this.onSourcePhraseChange}
            className="sourcePhrase input"
            type="text"
            placeholder="Source"/>
          <button className="savePhrase">Save</button>
        </form>
      </div>
    );
  }


  // NB If in continuous input state, show source input field following successful
  // phrase pair completion.
  renderTargetInput() {
    const continuousInput = this.state.isContinuousInputActive;
    return (
      <form
        className="newPhrase"
        onSubmit={continuousInput ? this.onTargetPhraseMultipleSubmit : this.onTargetPhraseSubmit}
      >
        <input
          ref="targetInput"
          value={this.state.targetPhrase}
          onChange={this.onTargetPhraseChange}
          className="targetPhrase input"
          type="text"
          placeholder="Target"
        />
        <button className="savePhrase"> Save </button>
      </form>
    );
  }

  // TODO: Consider the flow of canceling a phrase in progress.
  renderInputMethod() {
    if (this.state.isContinuousInputActive) {
      return (
        <div className="inputMethod">
          <label>
            <input type="checkbox" checked onChange={this.onContinuousInputClick} />
            Continuous entry
          </label>
          <button title="Cancel" onClick={this.onCancelEditPhrase} className="close icon">
            <img src={this.props.close} alt="close" />
          </button>
        </div>
      );
    }
    return (
      <div className="inputMethod">
        <label>
          <input type="checkbox" onChange={this.onContinuousInputClick} />
          Continuous entry
        </label>
        <button title="Cancel" onClick={this.onCancelEditPhrase} className="close icon">
          <img src={this.props.close} alt="close" />
        </button>
      </div>
    );
  }

  render() {
    return (
       <div className="dictionary">
        <ul className="content">{this.renderPhrasePairs()}</ul>
        {this.renderPreSourcePhrase()}
        {this.renderCreateNewPhraseButton()}
       </div>
    );
  }
}

Dictionary.propTypes = {
  initialPhrasePairs: React.PropTypes.arrayOf(React.PropTypes.shape({
    book_id: React.PropTypes.number,
    created_at: React.PropTypes.string,
    id: React.PropTypes.number,
    source_phrase: React.PropTypes.string,
    target_phrase: React.PropTypes.string,
    updated_at: React.PropTypes.string,
  })),
  onSourcePhraseSubmit: React.PropTypes.func,
  onTargetPhraseSubmit: React.PropTypes.func,
  isOwnedByCurrentUser: React.PropTypes.bool,
  menu: React.PropTypes.string,
  flip: React.PropTypes.string,
  save: React.PropTypes.string,
  delete: React.PropTypes.string,
  edit: React.PropTypes.string,
  close: React.PropTypes.string,
};
