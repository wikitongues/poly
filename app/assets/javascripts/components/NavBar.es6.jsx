class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isNavMenuVisible: false
    };
    this.toggleMenu = this.toggleMenu.bind(this);
    this.renderSignIn = this.renderSignIn.bind(this);
  }

  toggleMenu() {
    this.setState({
      isNavMenuVisible: !this.state.isNavMenuVisible
    })
  }

  renderNavMenu() {
    if (this.state.isNavMenuVisible) {
      return (
        <div className="navMenu">
          <a href="/dashboard">Home</a>
          <a href="/books/new">Create a new book</a>
          <a href="/account/edit">Edit profile</a>
          <a href="/features">Roadmap</a>
          <a href="/sign_out">Sign out</a>
        </div>
      )
    }
  }

  renderSignIn() {
    if (this.props.currentUser) {
      return (
          <div className="loggedIn">
            <a className="currentUser" onClick={this.toggleMenu}>
              <span>{this.props.currentUser.username}</span>
              <img src={this.props.menu} />
            </a>
            {this.renderNavMenu()}
          </div>
      );
    }
    return (
      <div className="logIn">
        <a href="/features">Roadmap</a>
        <a className="signUp" href="/sign_up">Sign up</a>
        <a href="/sign_in">or log in</a>
      </div>
    );
  }

  render() {
    return (
      <nav>
        <a className="icon home" href="/">
          <img src={this.props.logo} alt="Poly Home" />
          <span className="detail">
            <img src={this.props.detail} alt="" />
          </span>
        </a>
        <SearchBar query={this.props.query} search={this.props.search} />
        {this.renderSignIn()}
      </nav>
    );
  }
}

NavBar.propTypes = {
  currentUser: React.PropTypes.shape({
    created_at: React.PropTypes.string,
    email: React.PropTypes.string,
    favorite_books: React.PropTypes.array,
    id: React.PropTypes.number,
    username: React.PropTypes.string,
  }),
  menu: React.PropTypes.string,
  logo: React.PropTypes.string,
  detail: React.PropTypes.string,
  query: React.PropTypes.string,
  search: React.PropTypes.string,
};
