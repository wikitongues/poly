NavBar = React.createClass( {

  renderSignIn: function() {
    if (this.props.currentUser) {
      return <a className="signInButton" href="/sign_out">Sign out</a>;
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
