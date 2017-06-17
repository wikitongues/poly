class Admin extends React.Component {
  constructor(props) {
    super(props);
    this.renderBooks = this.renderBooks.bind(this);
    this.renderUsers = this.renderUsers.bind(this);
    this.renderLanguages = this.renderLanguages.bind(this);
    this.renderPhrases = this.renderPhrases.bind(this);
  }

  renderBooks() {
    return this.props.books.map((book) => {
      return (
        <BookEntry
          user={this.props.user}
          book={book} key={book.id}
          cardinality={this.props.cardinality}
        />
      );
    });
  }

  renderUsers() {
    return this.props.users.map((user) => {
      return (
        <UserEntry
          books={this.props.books}
          user={user} key={user.id}
        />
      )
    })
  }

  renderPhrases() {
    return this.props.phrases.map((phrases) => {
      return (
        <PhraseEntry
          book={phrases.book}
          phrases={phrases} key={phrases.id}
        />
      )
    })
  }

  renderLanguages() {
    return this.props.books.map((book) => {
      return (
        <LanguageEntry
          users={this.props.users}
          book={book} key={book.id}
        />
      )
    })
  }

  render() {
    return (
      <div className="container">
        <NavBar
          currentUser={this.props.currentUser}
          logo={this.props.logo}
          detail={this.props.detail}
          search={this.props.search}
          menu={this.props.menu}
        />
        <div className="admin">
          <section className="set two-col">
            <h3>Phrases <span className="bookCount">({this.props.phrases.length}/{this.props.phrasesCount})</span></h3>
            <div className="wrapper">
              <table>
                <thead>
                  <tr>
                    <th>Book ID</th>
                    <th>Source phrase</th>
                    <th>Target phrase</th>
                  </tr>
                </thead>
                <tbody>
                  {this.renderPhrases()}
                </tbody>
              </table>
            </div>
          </section>
          <section className="set">
            <h3>Books <span className="bookCount">({this.props.books.length}/{this.props.booksCount})</span></h3>
            <ul className="bookEntryList">
              {this.renderBooks()}
            </ul>
          </section>
          <section className="set table">
            <h3>Users <span className="bookCount">({this.props.users.length}/{this.props.usersCount})</span></h3>
            <div className="wrapper">
              <table>
                <thead>
                  <tr>
                    <th>Username</th>
                    <th>Books authored</th>
                    <th>Date joined</th>
                  </tr>
                </thead>
                <tbody>
                  {this.renderUsers()}
                </tbody>
              </table>
            </div>
          </section>
          <section className="set table">
            <h3>Languages</h3>
            <div className="wrapper">
              <table>
                <thead>
                  <tr>
                    <th>Source language</th>
                    <th>Target language</th>
                  </tr>
                </thead>
                <tbody>
                  {this.renderLanguages()}
                </tbody>
              </table>
            </div>
          </section>
      </div>
    </div>
    );
  }
}

Admin.propTypes = {
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
