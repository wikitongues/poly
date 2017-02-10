class SearchResults extends React.Component {
  constructor(props) {
    super(props);
    this.renderCreateBookPanel = this.renderCreateBookPanel.bind(this);
    this.renderCreateBookButton = this.renderCreateBookButton.bind(this);
    this.renderSearchResults = this.renderSearchResults.bind(this);
    this.renderUserSection = this.renderUserSection.bind(this);
    this.renderUserResults = this.renderUserResults.bind(this)
    this.renderLanguageResultsSection = this.renderLanguageResultsSection.bind(this)
    this.renderLanguageResults = this.renderLanguageResults.bind(this)
    this.renderPhraseSection = this.renderPhraseSection.bind(this)
    this.renderPhraseResults = this.renderPhraseResults.bind(this)
  }

  renderCreateBookPanel() {
    if (this.props.currentUser) {
      return (
        <a href="/books/new" title="Create a new book">New book</a>
      );
    }
    return (
      <a href="/sign_in" title="Create a new book">Log in to create new books</a>
    );
  }

  renderCreateBookButton() {
    if (this.props.currentUser) {
      return (
        <a href="/books/new" className="newBook" title="Create a new book">+</a>
      );
    }
  }

  renderSearchResults() {
    if (this.props.language.length != 0 || this.props.user.length != 0 || this.props.phrase.length != 0) {
      return (
        <div className="search">
          {this.renderUserSection()}
          {this.renderLanguageResultsSection()}
          {this.renderPhraseSection()}
        </div>
      );
    } else {
      return (
        <span className="emptySearch">No results for "{this.props.query}"</span>
      );
    }
  }

  renderUserSection() {
    if (this.props.user.length != 0) {
      return (
        <div className="indexContent">
          <div className="controlPanel">
            <p>Usernames containing "{this.props.query}"</p>
            <span className="bookCount search">{this.props.user.length}</span>
          </div>
          <ul className="bookEntryList">
            {this.renderUserResults()}
          </ul>
        </div>
      );
    }
  }

  renderUserResults() {
    return this.props.user.map(user => (
      <UserSearchResult
      user={user}
      key={user.id}/>
      )
    );
  }

  renderLanguageResultsSection() {
    if (this.props.language.length != 0) {
      return (
        <div className="indexContent">
          <div className="controlPanel">
            <p>Books containing "{this.props.query}"</p>
            <span className="bookCount search">{this.props.language.length}</span>
          </div>
          <ul className="bookEntryList">
            {this.renderLanguageResults()}
          </ul>
        </div>
      );
    }
  }

  renderLanguageResults() {
    return this.props.language.map(book => (
      <BookEntry
        users={this.props.users}
        book={book}
        key={book.id}
        cardinality={this.props.cardinality}
      />)
    );
  }

  renderPhraseSection() {
    if (this.props.phrase.length != 0) {
      return (
        <div className="indexContent">
          <div className="controlPanel">
            <p>Phrases containing "{this.props.query}"</p>
            <span className="bookCount search">{this.props.phrase.length}</span>
          </div>
          <ul className="bookEntryList">
            {this.renderPhraseResults()}
          </ul>
        </div>
      );
    }
  }

  renderPhraseResults() {
    return this.props.phrase.map(phrase => (
      <PhraseSearchResult
        phrase={phrase}
        key={phrase.id}
      />)
    );
  }

  render() {
    return (
      <div className="container">
        <NavBar
          currentUser={this.props.currentUser}
          query={this.props.query}
          logo={this.props.logo}
          detail={this.props.detail}
          search={this.props.search}
        />
        <div className="dashboard">
          {this.renderSearchResults()}
          {this.renderCreateBookButton()}
        </div>
      </div>
    );
  }
}

SearchResults.propTypes = {
  currentUser: React.PropTypes.shape({
    created_at: React.PropTypes.string,
    email: React.PropTypes.string,
    favorite_books: React.PropTypes.array,
    id: React.PropTypes.number,
    username: React.PropTypes.string,
  }),
  sourceLanguage: React.PropTypes.array, // TODO: precise
  targetLanguage: React.PropTypes.array, // TODO: precise
  query: React.PropTypes.string,
  users: React.PropTypes.string,
  cardinality: React.PropTypes.string,
  logo: React.PropTypes.string,
  detail: React.PropTypes.string,
  search: React.PropTypes.string,
};
