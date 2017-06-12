class Admin extends React.Component {
  constructor(props) {
    super(props);
    this.renderCreateBookPanel = this.renderCreateBookPanel.bind(this);
    this.renderCreateBookButton = this.renderCreateBookButton.bind(this);
    this.renderBooks = this.renderBooks.bind(this);
    this.renderUsers = this.renderUsers.bind(this);
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

  render() {
    return (
      <div className="container">
        <NavBar
          currentUser={this.props.currentUser}
          logo={this.props.logo}
          detail={this.props.detail}
          search={this.props.search}
        />
        <div className="admin">
          <section className="set users">
            <h3>Users <span className="bookCount">({this.props.users.length})</span></h3>
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
          </section>
          <section className="set">
            <h3>Books <span className="bookCount">({this.props.books.length})</span></h3>
            <ul className="bookEntryList">
              {this.renderBooks()}
            </ul>
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
