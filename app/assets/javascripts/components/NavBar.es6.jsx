NavBar = React.createClass( {

  renderSignIn: function() {
    if (this.props.currentUser) {
      return (
          <span className="loggedIn">
            <a href="/sign_out">Sign out</a>
            <a className="currentUser" href={"/accounts/" + this.props.currentUser.id}>{this.props.currentUser.username}</a>
          </span>
      )
    } else {
      return (
        <span className="logIn">
          <a className="signInButton" href="/sign_in">Log in</a>
          <p> or </p>
          <a href="/sign_up">Sign up</a>
        </span>
      )
    }
  },

  render: function() {
    return(
      <nav>
        <a className="icon home" href="/"></a>
        {this.renderSignIn()}
      </nav>
    )
  }
});
