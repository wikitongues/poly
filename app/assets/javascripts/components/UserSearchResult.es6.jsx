class UserSearchResult extends React.Component {
  render() {
    const createdDate = new Date(this.props.user.created_at);
    const createdYear = createdDate.getUTCFullYear();
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const createdMonth = months[createdDate.getMonth()];
    const createdDay = createdDate.getDate();

    return (
       <li className="bookEntry">
        <a href={'/users/'+this.props.user.id}>
          <section className="info">
          <section className="clear">
            <h2 className="title" title={this.props.user.username}>{this.props.user.username}</h2>
            <section className="details">
              <p className="count" title={this.props.user.books.length +" books"}>{this.props.user.books.length} books</p>
            </section>
          </section>
          <section className="meta">
            <p className="date">Joined {createdMonth} {createdYear}</p>
          </section>
            {/* <span className="banner"><img src=""/></span> */}
          </section>
         </a>
       </li>
    );
  }
}

BookEntry.propTypes = {
    currentUser: React.PropTypes.shape({
    created_at: React.PropTypes.string,
    email: React.PropTypes.string,
    favorite_books: React.PropTypes.array,
    id: React.PropTypes.number,
    username: React.PropTypes.string,
  }),
  sourceLanguage: React.PropTypes.array, // TODO: precise
  targetLanguage: React.PropTypes.array, // TODO: precise
  query: React.PropTypes.string,
  users: React.PropTypes.string,
  cardinality: React.PropTypes.string,
  logo: React.PropTypes.string,
  detail: React.PropTypes.string,
  search: React.PropTypes.string,
};
