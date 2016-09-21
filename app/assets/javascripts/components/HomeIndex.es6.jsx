HomeIndex = React.createClass ( {

<<<<<<< HEAD
  renderCreateBookButton() {
=======
  onSearchStoreClick: function() {
    alert("Search is coming soon!")
  },

  renderCreateBookPannel: function() {
    if (this.props.currentUser) {
      return (
        <a href="/books/new" title="Create a new book">New book</a>
      )
    } else {
      return (
        <a href="/sign_in" title="Create a new book">Log in to create new books</a>
      )
    }
  },

  renderCreateBookButton: function() {
>>>>>>> wikitongues/master
    if (this.props.currentUser) {
      return (
        <a href="/books/new" className="newBook" title="Create a new book">+</a>
      )
    }
  },

  renderBooks() {
    return this.props.books.map((book) => {
      return <BookEntry users={this.props.users} book={book} key={book.id} cardinality={this.props.cardinality}></BookEntry>
    })
  },

<<<<<<< HEAD
  /*renderWelcome: function() {
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
  },*/

  render() {
    return (
      <div className="container">
        <NavBar currentUser={this.props.currentUser} logo={this.props.logo}/>
        {/*this.renderWelcome()*/}
=======
  render: function() {
    return (
      <div className="container">
        <NavBar currentUser={this.props.currentUser} logo={this.props.logo} search={this.props.search}/>
>>>>>>> wikitongues/master
        <div className="dashboard">
          <span className="backgroundElement"></span>
          <div className="indexContent">
            <div className="controlPannel">
              {this.renderCreateBookPannel()}
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
} );