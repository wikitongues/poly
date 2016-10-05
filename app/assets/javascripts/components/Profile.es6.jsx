Profile = React.createClass( {

<<<<<<< HEAD
  getInitialState: function () {
    return {
      languages: ['Swiss german', 'German', 'French', 'English', 'Portuguese'],
      followers: [{username:'Daniel Udell', user_id:3},{username:'Charles Darwin', user_id:9},{username:'Marie Curie', user_id:1},{username:'Johannes Kepler', user_id:3},{username:'Louis Pasteur', user_id:3}]
    }
  },

  renderAuthoredBooks() {
=======
  renderAuthoredBooks: function() {
>>>>>>> master
    return this.props.books.map((book) => {
      return <BookEntry users={this.props.userData} book={book} key={book.id} cardinality={this.props.cardinality}></BookEntry>
    })
  },

  currentUserProfile() {
    if (this.props.currentUser) {
      return this.props.userData.id != this.props.currentUser.id
    }
  },

  renderCreateBookButton() {
    if(!this.currentUserProfile()) {
      if (this.props.currentUser) {
        return (
          <a href="/books/new" className="newBook" title="Create a new book">+</a>
        )
      }
    }
  },

  renderDashboardHeader: function() {
    if (this.props.currentUser) {
      if(this.currentUserProfile()) {
        return (
          <div className="controlPannel">
            <p className="header">Books by {this.props.userData.username}</p>
          </div>
        )
      } else {
        return (
          <div className="controlPannel">
            <a className="header" href="/books/new" title="Create a new book">New book</a>
          </div>
        )
      }
    } else {
     return (
        <div className="controlPannel">
          <p className="header">Books by {this.props.userData.username}</p>
        </div>
      )
    }
  },

  renderFollowButton() {
    if(this.currentUserProfile()) {
      return  <a className="follow">follow</a>
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

  render: function() {
    let createdDate = new Date(this.props.userData.created_at),
    createdYear = createdDate.getUTCFullYear(),
    months = ["January","February","March","April","May","June","July","August","September","October","November","December"],
    createdMonth = months[createdDate.getMonth()]

    return(
      <div className="container">
        <NavBar currentUser={this.props.currentUser} logo={this.props.logo} detail={this.props.detail} search={this.props.search}/>
        <span className="backgroundElement"></span>
        <div id="profile">
          <div className="userInformation">
            <div className="wrapper">
              <img src={`http://www.gravatar.com/avatar/${this.props.hashedEmail}?s=200`} />
              <h2>{this.props.userData.username}</h2>
              <p>Member since {createdMonth} {createdYear}</p>
              {this.renderEditButton()}
            </div>
          </div>
          <div className="dashboard">
            <div className="indexContent">
              {this.renderDashboardHeader()}
              <ul className="bookEntryList">
                {this.renderAuthoredBooks()}
              </ul>
              {this.renderCreateBookButton()}
            </div>
          </div>
        </div>
      </div>
    )}
  } );
