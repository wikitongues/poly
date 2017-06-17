class PhraseEntry extends React.Component {
  render() {
    return (
      <tr>
        <td><a href={'/books/'+this.props.phrases.book_id}>{this.props.phrases.book_id}</a></td>
        <td><a href={'/books/'+this.props.phrases.book_id}>{this.props.phrases.source_phrase}</a></td>
        <td className="right"><a href={'/books/'+this.props.phrases.book_id}>{this.props.phrases.target_phrase}</a></td>
      </tr>
    );
  }
}

PhraseEntry.propTypes = {

};
