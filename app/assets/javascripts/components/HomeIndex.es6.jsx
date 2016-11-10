class HomeIndex extends React.Component {
  constructor(props) {
    super(props);
    this.renderCreateBookPanel = this.renderCreateBookPanel.bind(this);
    this.renderCreateBookButton = this.renderCreateBookButton.bind(this);
    this.renderBooks = this.renderBooks.bind(this);
  }

  onSearchStoreClick() {
    alert('Search is coming soon!');
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

  renderBooks() {
    return this.props.books.map((book) => {
      return (
        <BookEntry
          users={this.props.users}
          book={book} key={book.id}
          cardinality={this.props.cardinality}
        />
      );
    });
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
        <div className="dashboard">
          <span className="backgroundElement" />
          <div className="indexContent">
            <div className="controlPanel">
              {this.renderCreateBookPanel()}
            </div>
            <ul className="bookEntryList">
              {this.renderBooks()}
            </ul>
          </div>
          {this.renderCreateBookButton()}
      </div>
    </div>
    );
  }
}

HomeIndex.propTypes = {
  currentUser: React.PropTypes.shape({
    created_at: React.PropTypes.string,
    email: React.PropTypes.string,
    favorite_books: React.PropTypes.array,
    id: React.PropTypes.number,
    username: React.PropTypes.string,
  }),
  books: React.PropTypes.arrayOf(React.PropTypes.shape({
    created_at: React.PropTypes.string,
    description: React.PropTypes.string,
    id: React.PropTypes.number,
    source_language: React.PropTypes.string,
    target_language: React.PropTypes.string,
    title: React.PropTypes.string,
    user: React.PropTypes.shape({
      created_at: React.PropTypes.string,
      email: React.PropTypes.string,
      favorite_books: React.PropTypes.array,
      id: React.PropTypes.number,
      username: React.PropTypes.string,
    }),
  })),
  users: React.PropTypes.arrayOf(React.PropTypes.shape({
    created_at: React.PropTypes.string,
    email: React.PropTypes.string,
    favorite_books: React.PropTypes.array,
    id: React.PropTypes.number,
    username: React.PropTypes.string,
  })),
  cardinality: React.PropTypes.string,
  logo: React.PropTypes.string,
  detail: React.PropTypes.string,
  search: React.PropTypes.string,
};
