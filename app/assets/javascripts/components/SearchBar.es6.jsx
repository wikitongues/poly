SearchBar = React.createClass( {

  hasQueryValue: function() {
    if(this.props.query) {
      return this.props.query
    }
  },

  render: function() {
    return(
      <form action="/search">
        <img src={this.props.search}/>
        <input type="text" name="q" placeholder="Search" defaultValue={this.hasQueryValue()} />
      </form>
    )
  }
});
