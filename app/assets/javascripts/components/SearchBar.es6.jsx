class SearchBar extends React.Component {

  hasQueryValue() {
    if (this.props.query) {
      return this.props.query;
    }
  }

  render() {
    return (
      <form action="/search">
        <img src={this.props.search} alt="Search icon" />
        <input type="text" name="q" placeholder="Search" defaultValue={this.hasQueryValue()} />
      </form>
    );
  }
}

SearchBar.proptypes = {
  query: React.PropTypes.string,
  search: React.PropTypes.string,
};
