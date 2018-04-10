class BookEntry extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const createdDate = new Date(this.props.book.created_at);
    const createdYear = createdDate.getUTCFullYear();
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const createdMonth = months[createdDate.getMonth()];
    const createdDay = createdDate.getDate();

    return (
       <li className="bookEntry">
        <a href={'/books/'+this.props.book.id}>
          <section className="info">
            <section className="clear">
              {this.renderFavoriteButton()}<h2 className="title" title={this.props.book.title}>{this.props.book.title}</h2>
              <section className="details">
                <p className="count" title={this.props.book.phrase_pairs.length+" Phrases"}>{this.props.book.phrase_pairs.length}</p>
                <p className="source language" title={this.props.book.source_language}>
                  {this.props.book.source_language}
                </p>
                <img className="bookEntry icon cardinality" src={this.props.cardinality} alt="" />
                <p className="target language" title={this.props.book.target_language}>
                  {this.props.book.target_language}
                </p>
              </section>
            </section>
            <section className="meta">
              <p className="date">{createdDay} {createdMonth} {createdYear}</p>
              <p className="author">{this.props.book.user.username}</p>
            </section>
          </section>
         </a>
       </li>
    );
  }
}

BookEntry.propTypes = {

};
