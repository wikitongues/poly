NavBar = React.createClass( {

  renderSignIn: function() {
    return (<a className="signInButton" href="/sign_in">Sign in</a>)
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
