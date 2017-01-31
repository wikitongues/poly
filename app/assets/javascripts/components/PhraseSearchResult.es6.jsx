class PhraseSearchResult extends React.Component {
  render() {
    // const createdDate = new Date(this.props.phrasePair.created_at);
    // const createdYear = createdDate.getUTCFullYear();
    // const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    // const createdMonth = months[createdDate.getMonth()];
    // const createdDay = createdDate.getDate();

    return (
      <a href={"books/" + this.props.phrase.book.id}>
        <li className="bookEntry entry">
          <h2 className="title">From "{this.props.phrase.book.title}"</h2>
          <ul>
            <li className="source"><p>{this.props.phrase.source_phrase}</p></li>
            <li className="target"><p>{this.props.phrase.target_phrase}</p></li>
          </ul>
        </li>
      </a>
    );
  }
}

BookEntry.propTypes = {

};
