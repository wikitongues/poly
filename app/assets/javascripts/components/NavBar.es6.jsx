NavBar = React.createClass( {

  renderSignIn: function() {
    if (this.props.currentUser) {
      return (
          <span>
            <a className="signInButton" href="/sign_out">Sign out</a>
            <a className="currentUser" href={"/accounts/" + this.props.currentUser.id}>{this.props.currentUser.email}</a>
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
