User = React.createClass( {

  getInitialState: function () {
    return {
      languages: ['Swiss german', 'German', 'French', 'English', 'Portuguese'],
      followers: [{username:'Daniel Udell', user_id:3},{username:'Charles Darwin', user_id:9},{username:'Marie Curie', user_id:1},{username:'Johannes Kepler', user_id:3},{username:'Louis Pasteur', user_id:3}]
    }
  },

  renderAuthoredBooks: function() {
    return this.props.books.map((book) => {
      return <BookEntry users={this.props.userData} book={book} key={book.id} cardinality={this.props.cardinality}></BookEntry>
    })
  },

  currentUserProfile: function() {
    if (this.props.currentUser) {
      return this.props.userData.id != this.props.currentUser.id
    }
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

  onSearchStoreClick: function() {
    alert("Searching is coming soon!")
  },

  onFavoriteSortClick: function() {
    alert("Favoriting is coming soon!")
  },

  renderDashboardHeader: function() {
    if (this.props.currentUser) {
      if(this.currentUserProfile()) {
        return (
          <div className="controlPannel">
            <button title="Search their books" onClick={this.onSearchStoreClick} className="icon">
              <img src={this.props.search}/>
            </button>
            <p className="header">Books by {this.props.userData.username}</p>
            <button title="Sort by Favorites" onClick={this.onFavoriteSortClick} className="icon">
              <img src={this.props.unstarred}/>
            </button>
          </div>
        )
      } else {
        return (
          <div className="controlPannel">
            <button title="Search your books" onClick={this.onSearchStoreClick} className="icon">
              <img src={this.props.search}/>
            </button>
            <a className="header" href="/books/new" title="Create a new book">New book</a>
            <button title="Sort by Favorites" onClick={this.onFavoriteSortClick} className="icon">
              <img src={this.props.unstarred}/>
            </button>
          </div>
        )
      }
    } else {
     return (
        <div className="controlPannel">
          <button title="Search their books" onClick={this.onSearchStoreClick} className="icon">
            <img src={this.props.search}/>
          </button>
          <p className="header">Books by {this.props.userData.username}</p>
          <button title="Sort by Favorites" onClick={this.onFavoriteSortClick} className="icon">
            <img src={this.props.unstarred}/>
          </button>
        </div>
      )
    }
  },

  renderFollowButton: function() {
    if(this.currentUserProfile()) {
      return  <a className="follow">follow</a>
    }
  },

  render: function() {
    let langs = []
    this.state.languages.forEach(function (lang) {
      langs.push(<span className="language">{lang}</span>)
    })

    let followers = []
    this.state.followers.forEach(function (follower) {
      followers.push(<li><a href={follower.user_id}>{follower.username}</a></li>)
    })

    let createdDate = new Date(this.props.userData.created_at),
    createdYear = createdDate.getUTCFullYear(),
    months = ["January","February","March","April","May","June","July","August","September","October","November","December"],
    createdMonth = months[createdDate.getMonth()]

    return(
      <div className="container">
        <NavBar currentUser={this.props.currentUser} logo={this.props.logo}/>
        <span className="backgroundElement"></span>
        <div id="profile">
          <div className="userInformation">
            <div className="wrapper">
              <img src={`http://www.gravatar.com/avatar/${this.props.hashedEmail}?s=200`} />
              <h2>{this.props.userData.username}</h2>
              <p>{this.props.userData.email}</p>

              {/*<div className="languages">
                {langs}
              </div>*/}
              <p>Member since {createdMonth} {createdYear}</p>
              {/*{this.renderFollowButton()}
              <div className="followedBy">
              Followers ({followers.length})
                <ul>
                  {followers}
                </ul>
              </div>*/}
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
  });
