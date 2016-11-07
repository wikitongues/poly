Profile = React.createClass( {

  getInitialState: function() {
    return {
      showingFavorites: false,
      showingBooks: true,
    }
  },

  renderAllBooks: function() {
    return this.props.books.map((book) => {
      return <BookEntry users={this.props.userData} book={book} key={book.id} cardinality={this.props.cardinality}></BookEntry>
    })
  },

  renderAuthoredBooks: function() {
    if(this.props.authoredBooks.length > 0) {
      return this.props.authoredBooks.map((book) => {
        return <BookEntry book={book} key={book.id} cardinality={this.props.cardinality}></BookEntry>
      })
    } else {
      return (
        <li className="emptyList">
          <h2>No books</h2>
        </li>
      )
    }
  },

  renderFavoriteBooks: function() {
    if(this.props.favorites.length > 0) {
      return this.props.favorites.map((book) => {
        return <BookEntry users={this.props.userData} book={book} key={book.id} cardinality={this.props.cardinality}></BookEntry>
      })
    } else {
      return (
        <li className="emptyList">
          <h2>No favorites</h2>
        </li>
      )
    }
  },

  currentUserProfile: function() {
    if (this.props.currentUser) {
      return this.props.userData.id != this.props.currentUser.id
    }
  },

  toggleShowFavorites: function() {
    this.setState({
      showingAll: false,
      showingFavorites: true,
      showingBooks: false
    });
  },

  toggleShowBooks: function() {
    this.setState({
        showingAll: false,
        showingFavorites: false,
        showingBooks: true
    });
  },

  toggleShowAll: function() {
    this.setState({
        showingAll: true,
        showingFavorites: false,
        showingBooks: false
    });
  },

  renderCreateBookButton: function() {
    if(!this.currentUserProfile()) {
      if (this.props.currentUser) {
        return (
          <a href="/books/new" className="newBook" title="Create a new book">+</a>
        )
      }
    }
  },

  renderDashboardList: function() {
    if (this.props.currentUser) {
      if(this.currentUserProfile()) {
        return (
          <div className="controlPanel">
            <button id="books" onClick={this.toggleShowBooks}>Books <span className="bookCount">{this.props.authoredBooks.length}</span></button>
            <button id="favorites" onClick={this.toggleShowFavorites}>Favorites <span className="bookCount">{this.props.favorites.length}</span></button>
          </div>
        )
      } else {
        return (
          <div className="controlPanel">
            <button id="books" onClick={this.toggleShowBooks}>My Books <span className="bookCount">{this.props.authoredBooks.length}</span></button>
            <button id="favorites" onClick={this.toggleShowFavorites}>Favorites <span className="bookCount">{this.props.favorites.length}</span></button>
            <a href="/books/new" title="Create a new book">+</a>
          </div>
        )
      }
    } else {
     return (
        <div className="controlPanel">
          <button id="books" onClick={this.toggleShowBooks}>Books <span className="bookCount">{this.props.authoredBooks.length}</span></button>
          <button id="favorites" onClick={this.toggleShowFavorites}>Favorites <span className="bookCount">{this.props.favorites.length}</span></button>
        </div>
      )
    }
  },

  renderEditButton: function() {
    if(this.props.currentUser) {
      if(this.props.currentUser.id == this.props.userData.id) {
        return (
          <a className="editButton" href="account/edit">Edit</a>
        )
      }
    }
  },

  renderUserContent: function() {
    if(this.state.showingFavorites) {
      return (
        <div className="indexContent favorites">
         {this.renderDashboardList()}
          <ul className="bookEntryList">
            {this.renderFavoriteBooks()}
          </ul>
        </div>
      )
    } else {
      if(this.state.showingBooks) {
          return (
          <div className="indexContent books">
            {this.renderDashboardList()}
            <ul className="bookEntryList">
              {this.renderAuthoredBooks()}
            </ul>
          </div>
          )
        }
      }
  },

  render: function() {
    let createdDate = new Date(this.props.userData.created_at),
    createdYear = createdDate.getUTCFullYear(),
    months = ["January","February","March","April","May","June","July","August","September","October","November","December"],
    createdMonth = months[createdDate.getMonth()]

    return(
      <div className="container">
        <NavBar currentUser={this.props.currentUser} menu={this.props.menu} logo={this.props.logo} detail={this.props.detail} search={this.props.search}/>
        <span className="backgroundElement"></span>
        <div id="profile">
          <div className="userInformation">
            <div className="wrapper">
              <img src={`http://www.gravatar.com/avatar/${this.props.hashedEmail}?s=200`} />
              <span className="tooltip">?</span>
              <span className="details">
                <h2>{this.props.userData.username}</h2>
                <p>Member since {createdMonth} {createdYear}</p>
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
                <p>All Books</p>
              </div>
              <ul className="bookEntryList">
                {this.renderAllBooks()}
              </ul>
            </div>
            {this.renderCreateBookButton()}
          </div>
        </div>
      </div>
    )}
  } );
