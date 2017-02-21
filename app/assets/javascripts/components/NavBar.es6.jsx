class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.renderSignIn = this.renderSignIn.bind(this);
  }

  renderSignIn() {
    if (this.props.currentUser) {
      return (
          <div className="loggedIn">
            <a className="currentUser" href="/dashboard">
              <span>{this.props.currentUser.username}</span>
              <img className="mobile" src={this.props.menu} />
            </a>
            <a href="/features">Roadmap</a>
            <a href="/sign_out">Sign out</a>
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
