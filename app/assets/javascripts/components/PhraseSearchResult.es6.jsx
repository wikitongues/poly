class PhraseSearchResult extends React.Component {
  render() {
    const createdDate  = new Date(this.props.phrase.book.created_at);
    const createdYear  = createdDate.getUTCFullYear();
    const months  = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const createdMonth  = months[createdDate.getMonth()];
    const createdDay  = createdDate.getDate();

    return (
      <li className="bookEntry">
        <a className="phrase" href={"books/" + this.props.phrase.book.id}>
          <section className="info">
            <section className="clear">
              <h2 className="title">{this.props.phrase.book.title}</h2>
            </section>
            <section className="meta">
              <p className="date">{createdDay} {createdMonth} {createdYear}</p>
            </section>
          </section>
          <ul>
            <li className="source"><p>{this.props.phrase.source_phrase}</p></li>
            <li className="target"><p>{this.props.phrase.target_phrase}</p></li>
          </ul>
        </a>
      </li>
    );
  }
}

BookEntry.propTypes = {

};
