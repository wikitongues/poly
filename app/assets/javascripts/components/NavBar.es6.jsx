NavBar = React.createClass( {

  renderSignIn() {
    if (this.props.currentUser) {
      return (
          <span className="loggedIn">
            <a className="currentUser" href="/dashboard">
              <span>{this.props.currentUser.username}</span>
              <img className="mobile" src={this.props.menu}/>
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

  render() {
    return(
      <nav>
        <a className="icon home" href="/">
          <img src={this.props.logo} alt="Poly Home"/>
          <span className="detail">
            <img src={this.props.detail} alt=""/>
          </span>
        </a>
        <SearchBar query={this.props.query} search={this.props.search}/>
        {this.renderSignIn()}
      </nav>
    )
  }
} );
