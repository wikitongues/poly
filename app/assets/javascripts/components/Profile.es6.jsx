class Profile extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      showingFavorites: false,
      showingBooks: true,
    };
    this.renderAllBooks = this.renderAllBooks.bind(this);
    this.renderAuthoredBooks = this.renderAuthoredBooks.bind(this);
    this.renderFavoriteBooks = this.renderFavoriteBooks.bind(this);
    this.currentUserProfile = this.currentUserProfile.bind(this);
    this.toggleShowFavorites = this.toggleShowFavorites.bind(this);
    this.toggleShowBooks = this.toggleShowBooks.bind(this);
    this.toggleShowAll = this.toggleShowAll.bind(this);
    this.renderCreateBookButton = this.renderCreateBookButton.bind(this);
    this.renderDashboardList = this.renderDashboardList.bind(this);
    this.renderEditButton = this.renderEditButton.bind(this);
    this.renderUserContent = this.renderUserContent.bind(this);
  }

  renderAllBooks() {
    return this.props.books.map((book) => {
      return (
        <BookEntry
          // users={this.props.userData}
          book={book}
          key={book.id}
          cardinality={this.props.cardinality}
          phrase={this.props.phrase}
        />
      );
    });
  }

  renderAuthoredBooks() {
    if (this.props.authoredBooks.length > 0) {
      return this.props.authoredBooks.map((book) => {
        return (
          <BookEntry
            book={book}
            key={book.id}
            cardinality={this.props.cardinality}
            phrase={this.props.phrase}
          />
        );
      });
    } else {
      if (!this.currentUserProfile()) {
        if (this.props.currentUser) {
          return (
            <li className="emptyList">
              <p>You haven't created any books yet. <a href="/books/new">Create your first book</a></p>
            </li>
          );
        } else {
          return (
            <li className="emptyList">
              <p>{this.props.userData.username} does not have any books.</p>
            </li>
          );
        }
      } else {
        return (
          <li className="emptyList">
            <p>{this.props.userData.username} does not have any books.</p>
          </li>
        );
      }
    }
  }

  renderFavoriteBooks() {
    if (this.props.favorites.length > 0) {
      return this.props.favorites.map((book) => {
        return (
          <BookEntry
            user={this.props.userData}
            book={book}
            key={book.id}
            cardinality={this.props.cardinality}
            phrase={this.props.phrase}
          />
        );
      });
    }
    return (
      <li className="emptyList">
        <p>
          Your favorite books will show up here.
          <br/>
          <br/>
          Click on a star <img src={this.props.unstar} name="unlit"></img> to favorite a book <img src={this.props.star} name="shine">.</img>
        </p>
      </li>
    );
  }

  currentUserProfile() {
    if (this.props.currentUser) {
      return this.props.userData.id != this.props.currentUser.id;
    }
  }

  toggleShowFavorites() {
    this.setState({
      showingAll: false,
      showingFavorites: true,
      showingBooks: false,
    });
  }

  toggleShowBooks() {
    this.setState({
      showingAll: false,
      showingFavorites: false,
      showingBooks: true,
    });
  }

  toggleShowAll() {
    this.setState({
      showingAll: true,
      showingFavorites: false,
      showingBooks: false,
    });
  }

  renderCreateBookButton() {
    if (!this.currentUserProfile()) {
      if (this.props.currentUser) {
        return (
          <a href="/books/new" className="newBook" title="Create a new book">+</a>
        );
      }
    }
  }

  renderDashboardList() {
    if (this.props.currentUser) {
      if (this.currentUserProfile()) {
        return (
          <div className="controlPanel">
            <button id="books" onClick={this.toggleShowBooks}>
              Books <span className="bookCount">{this.props.authoredBooks.length}</span>
            </button>
            <button id="favorites" onClick={this.toggleShowFavorites}>
              Favorites <span className="bookCount">{this.props.favorites.length}</span>
            </button>
          </div>
        );
      }
      return (
        <div className="controlPanel">
          <button id="books" onClick={this.toggleShowBooks}>
            My Books <span className="bookCount">{this.props.authoredBooks.length}</span>
          </button>
          <button id="favorites" onClick={this.toggleShowFavorites}>
            Favorites <span className="bookCount">{this.props.favorites.length}</span>
          </button>
          <a href="/books/new" title="Create a new book">+</a>
        </div>
      );
    }
    return (
      <div className="controlPanel">
        <button id="books" onClick={this.toggleShowBooks}>
          Books <span className="bookCount">{this.props.authoredBooks.length}</span>
        </button>
        <button id="favorites" onClick={this.toggleShowFavorites}>
          Favorites <span className="bookCount">{this.props.favorites.length}</span>
        </button>
      </div>
    );
  }

  renderEditButton() {
    if (this.props.currentUser) {
      if (this.props.currentUser.id == this.props.userData.id) {
        return (
          <a className="editButton" href="account/edit">Edit</a>
        );
      }
    }
  }

  renderUserContent() {
    if (this.state.showingFavorites) {
      return (
        <div className="indexContent favorites">
         {this.renderDashboardList()}
          <ul className="bookEntryList">
            {this.renderFavoriteBooks()}
          </ul>
        </div>
      );
    }
    if (this.state.showingBooks) {
      return (
        <div className="indexContent books">
          {this.renderDashboardList()}
          <ul className="bookEntryList">
            {this.renderAuthoredBooks()}
          </ul>
        </div>
      );
    }
  }

  render() {
    const createdDate = new Date(this.props.userData.created_at);
    const createdYear = createdDate.getUTCFullYear();
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const createdMonth = months[createdDate.getMonth()];
    const username = this.props.userData.username;

    return (
      <div className="container">
        <NavBar
          currentUser={this.props.currentUser}
          menu={this.props.menu}
          logo={this.props.logo}
          detail={this.props.detail}
          search={this.props.search}
        />
        <span className="backgroundElement" />
        <div id="profile">
          <div className="userInformation">
            <div className="wrapper">
              <img src={`https://www.gravatar.com/avatar/${this.props.hashedEmail}?d=identicon&s=200`} width="200px" height="200px"/>
              <span className="tooltip">?</span>
              <span className="details">
                <h2 className={username.length > 9 ? "smallText" : ""}>
                  {username}
                </h2>
                <p>Joined {createdMonth} {createdYear}</p>
                {this.renderEditButton()}
              </span>
            </div>
            <div className="dashboard side">
              {this.renderUserContent()}
            </div>
          </div>
          <div className="dashboard">
            <div className="indexContent">
              <div className="controlPanel">
                <p>Latest books</p>
              </div>
              <ul className="bookEntryList">
                {this.renderAllBooks()}
              </ul>
            </div>
            {this.renderCreateBookButton()}
          </div>
        </div>
      </div>
    );
  }
}

Profile.propTypes = {
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
  userData: React.PropTypes.shape({
    created_at: React.PropTypes.string,
    email: React.PropTypes.string,
    favorite_books: React.PropTypes.array,
    id: React.PropTypes.number,
    username: React.PropTypes.string,
  }),
  cardinality: React.PropTypes.string,
  authoredBooks: React.PropTypes.arrayOf(React.PropTypes.shape({
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
  favorites: React.PropTypes.arrayOf(React.PropTypes.shape({
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
  currentUser: React.PropTypes.shape({
    created_at: React.PropTypes.string,
    email: React.PropTypes.string,
    favorite_books: React.PropTypes.array,
    id: React.PropTypes.number,
    username: React.PropTypes.string,
  }),
  menu: React.PropTypes.string,
  logo: React.PropTypes.string,
  detail: React.PropTypes.string,
  search: React.PropTypes.string,
  hashedEmail: React.PropTypes.string,
};
