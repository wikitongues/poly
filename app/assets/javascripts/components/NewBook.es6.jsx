class NewBook extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      description: '',
      source_language: '',
      target_language: '',
      errors: [],
    };
    this.onInputChange = this.onInputChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onInputChange(e) {
    const newState = this.state;
    newState[e.target.name] = e.target.value;
    this.setState(newState);
  }

  onSubmit(e) {
    e.preventDefault();
    this.state.errors = [];
    if (this.state.title && this.state.source_language && this.state.target_language) {
      $.ajax({
        url: '/books',
        type: 'POST',
        data: {
          book: this.state,
        },
        success(book) {
          window.location.href = '/books/' + book.id;
        },
        error(error) {
          console.log(error);
        },
      });
    } else {
      if (!this.state.title) this.state.errors.push(' Title');
      if (!this.state.source_language) this.state.errors.push(' Source language');
      if (!this.state.target_language) this.state.errors.push(' Target language');
      bootbox.alert({
        message: 'Your book is missing the following required details:' + (this.state.errors),
        closeButton: false,
      });
    }
  }

  render() {
    return (
      <div className="container">
        <NavBar
          currentUser={this.props.currentUser}
          logo={this.props.logo}
          detail={this.props.detail}
          search={this.props.search}
        />
        <span className="backgroundElement" />
        <div className="book">
          <form onSubmit={this.onSubmit}>
            <fieldset className="tools">
              <span title="Favorite"className="icon">
                <img src={this.props.unstar} alt="Favorite" />
              </span>
              <section className="cardinality">
                <section>
                  <input
                    className="new language source"
                    type="text"
                    name="source_language"
                    placeholder="Source"
                    value={this.state.sourceLanguage}
                    onChange={this.onInputChange}
                  />
                  <img src={this.props.cardinality} alt="" />
                  <input
                    className="new language target"
                    type="text"
                    name="target_language"
                    placeholder="Target"
                    value={this.state.targetLanguager}
                    onChange={this.onInputChange}
                  />
                </section>
              </section>
              {/* <button title="Menu" className="more icon">
                <img src={this.props.menuAlt}/>
              </button> */}
              <span title="Menu" className="icon">
                <img src={this.props.menuAlt} />
              </span>
            </fieldset>
            <fieldset className="info">
              <div className="wrapper">
                <input
                  className="new title"
                  type="text"
                  name="title"
                  placeholder="Useful phrases in Laputa"
                  autoFocus
                  value={this.state.title}
                  onChange={this.onInputChange}
                />
                <a className="author">{this.props.currentUser.username}</a>
                <textarea
                  className="new description"
                  type="text"
                  name="description"
                  placeholder="Describe the contents of your book, Ex: A
                  collection of useful phrases in Laputa, a Swiftian language
                  spoken in Balnibarbi and a number of other islands."
                  value={this.state.description}
                  onChange={this.onInputChange}
                />
              </div>
            </fieldset>
            <section className="new dictionary">
              <DummyContent />
              <button className="startBook" type="submit">Create Book</button>
            </section>
          </form>
        </div>
      </div>
    );
  }
}

NewBook.propTypes = {
  currentUser: React.PropTypes.shape({
    created_at: React.PropTypes.string,
    email: React.PropTypes.string,
    favorite_books: React.PropTypes.array,
    id: React.PropTypes.number,
    username: React.PropTypes.string,
  }),
  logo: React.PropTypes.string,
  detail: React.PropTypes.string,
  search: React.PropTypes.string,
  unstar: React.PropTypes.string,
  cardinality: React.PropTypes.string,
  menuAlt: React.PropTypes.string,
};
