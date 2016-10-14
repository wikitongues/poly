NavBar = React.createClass( {

  renderHomeButton: function() {
    if (this.props.currentUser) {
      return "/dashboard"
    } else {
      return "/"
    }
  },

  renderSignIn: function() {
    if (this.props.currentUser) {
      return (
          <span className="loggedIn">
            <a className="currentUser" href="/dashboard">
              {this.props.currentUser.username}
            </a>
            <a href="/sign_out">Sign out</a>
          </span>
      )
    } else {
      return (
        <span className="logIn">
          <a className="signInButton" href="/sign_in">Log in</a>
          {/*<p> or </p>
          <a href="/sign_up">Sign up</a>*/}
        </span>
      )
    }
  },

  render: function() {
    return(
      <nav>
        <a className="icon home" href={this.renderHomeButton()}>
          <img src={this.props.logo} alt="Poly Home"/>
          <span className="detail">
            <img src={this.props.detail} alt=""/>
          </span>
        </a>
        <SearchBar search={this.props.search}/>
        {this.renderSignIn()}
      </nav>
    )
  }
});
