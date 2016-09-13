NavBar = React.createClass( {

  renderSignIn: function() {
    if (this.props.currentUser) {
      return (
          <span className="loggedIn">
            <a className="currentUser" href="/account">{this.props.currentUser.username}</a>
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
        <a className="icon home" href="/">
          <img src={this.props.logo} alt=""/>
        </a>
        <SearchBar search={this.props.search}/>
        {this.renderSignIn()}
      </nav>
    )
  }
});
