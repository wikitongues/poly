SearchBar = React.createClass( {
  render: function() {
    return(
      <form action="/">
        <img src={this.props.search}/>
        <input type="text" placeholder="Search for a language, phrase, or user"/>
        <button type="submit">Go</button>
      </form>
    )
  }
});
