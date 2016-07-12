HomeIndex = React.createClass ( {

  onSearchStoreClick: function() {
    alert("Search is coming soon!")
  },

  onFavoriteSortClick: function() {
    alert("Sorting by favorites is coming soon!")
  },

  renderCreateBookPannel: function() {
    if (this.props.currentUser) {
      return (
        <a href="/books/new" title="Create a new book">New Book</a>
      )
    }
  },

  renderCreateBookButton: function() {
    if (this.props.currentUser) {
      return (
        <a href="/books/new" className="newBook" title="Create a new book">+</a>
      )
    }
  },

  renderBooks: function() {
    return this.props.books.map((book) => {
      return <BookEntry users={this.props.users} book={book} key={book.id} cardinality={this.props.cardinality}></BookEntry>
    })
  },

  renderWelcome: function() {
    if (this.props.currentUser === null) {
      return (
        <div className="welcomeBar">
          <h1>Welcome to Poly</h1>
          <span className="logIn">
            <p>Please </p>
            <a href="/sign_in" className="action">Log in</a>
            <p> or </p>
             <a href="/sign_up" className="">Sign up</a>
           </span>
        </div>
      )
    }
    return null
  },

  render: function() {
    return (
      <div className="container">
        <NavBar currentUser={this.props.currentUser} logo={this.props.logo}/>
        {this.renderWelcome()}
        <div className="dashboard">
          <span className="backgroundElement"></span>
          <div className="indexContent">
            <div className="controlPannel">
              <button title="Search" onClick={this.onSearchStoreClick} className="icon">
                <img src={this.props.search}/>
              </button>
              {this.renderCreateBookPannel()}
              <button title="Sort by Favorites" onClick={this.onFavoriteSortClick} className="icon">
                <img src={this.props.unstarred}/>
              </button>
            </div>
            <ul className="bookEntryList">
              {this.renderBooks()}
            </ul>
          </div>
          {this.renderCreateBookButton()}
      </div>
    </div>
    )
  }
} )