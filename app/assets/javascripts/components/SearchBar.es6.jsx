SearchBar = React.createClass( {
  render: function() {
    return(
      <form action="/search">
        <img src={this.props.search}/>
        <input type="text" name="q" placeholder="Search by language"/>
      </form>
    )
  }
});
