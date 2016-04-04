NavBar = React.createClass( {

  renderSignIn: function() {
    if (this.props.currentUser) {
      return (
          <span>
            <a className="signInButton" href="/sign_out">Sign out</a>
            <p className="currentUser">{this.props.currentUser.email}</p>
          </span>
      )
    } else {
      return <a className="signInButton" href="/sign_in">Sign in</a>;
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
