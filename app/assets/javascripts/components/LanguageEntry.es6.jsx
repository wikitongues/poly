class LanguageEntry extends React.Component {
  render() {
    return (
      <tr>
        <td><a href={'/books/'+this.props.book.id}>{this.props.book.source_language}</a></td>
        <td className="right"><a href={'/books/'+this.props.book.id}>{this.props.book.target_language}</a></td>
      </tr>
    );
  }
}

LanguageEntry.propTypes = {

};
