class SearchResults extends React.Component {
  constructor(props) {
    super(props);
    this.renderCreateBookPanel = this.renderCreateBookPanel.bind(this);
    this.renderCreateBookButton = this.renderCreateBookButton.bind(this);
    this.renderSearchResults = this.renderSearchResults.bind(this);
    this.renderSourceResultSection = this.renderSourceResultSection.bind(this);
    this.renderSourceResults = this.renderSourceResults.bind(this);
    this.renderTargetResultSection = this.renderTargetResultSection.bind(this);
    this.renderTargetResults = this.renderTargetResults.bind(this);
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
    if (this.props.sourceLanguage.length != 0 || this.props.targetLanguage != 0 || this.props.username != 0 || this.props.phrase != 0) {
      return (
        <div className="search">
          {this.renderUserSection()}
          {this.renderTitleSection()}
          {this.renderSourceResultSection()}
          {this.renderTargetResultSection()}
          {this.renderPhraseSection()}
        </div>
      );
    }
    return (
      <span className="emptySearch">No results for "{this.props.query}"</span>
    );
  }

  renderUserSection() {
    if (this.props.user.length != 0) {
      return (
        <div className="indexContent">
          <div className="controlPanel">
            <p>Username contains "{this.props.query}"</p>
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

  renderSourceResultSection() {
    if (this.props.sourceLanguage.length != 0) {
      return (
        <div className="indexContent">
          <div className="controlPanel">
            <p>Source Language contains "{this.props.query}"</p>
            <span className="bookCount search">{this.props.sourceLanguage.length}</span>
          </div>
          <ul className="bookEntryList">
            {this.renderSourceResults()}
          </ul>
        </div>
      );
    }
  }

  renderSourceResults() {
    return this.props.sourceLanguage.map(book => (
      <BookEntry
        users={this.props.users}
        book={book}
        key={book.id}
        cardinality={this.props.cardinality}
      />)
    );
  }

  renderTargetResultSection() {
    if (this.props.targetLanguage.length != 0) {
      return (
        <div className="indexContent">
          <div className="controlPanel">
            <p>Target Language contains "{this.props.query}"</p>
            <span className="bookCount search">{this.props.targetLanguage.length}</span>
          </div>
          <ul className="bookEntryList">
            {this.renderTargetResults()}
          </ul>
        </div>
      );
    }
  }

  renderTargetResults() {
    return this.props.targetLanguage.map(book => (
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
            <p>Phrase contains "{this.props.query}"</p>
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

  renderTitleSection() {
    if (this.props.title.length != 0) {
      return (
        <div className="indexContent">
          <div className="controlPanel">
            <p>Title contains "{this.props.query}"</p>
            <span className="bookCount search">{this.props.title.length}</span>
          </div>
          <ul className="bookEntryList">
            {this.renderTitleResults()}
          </ul>
        </div>
      );
    }
  }

  renderTitleResults() {
    return this.props.title.map(book => (
      <BookEntry
        users={this.props.users}
        book={book}
        key={book.id}
        cardinality={this.props.cardinality}
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
          <span className="backgroundElement" />
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
