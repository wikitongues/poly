class PhraseSearchResult extends React.Component {
  render() {
    return (
      <a className="phrase" href={"books/" + this.props.phrase.book.id}>
        <h2 className="title">From "{this.props.phrase.book.title}"</h2>
        <li className="bookEntry">
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
