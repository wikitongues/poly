class PhraseSearchResult extends React.Component {
  renderPhrasePair() {
    return (
      <ul>
        <li className="source">
          {
            this.props.phrase.source_phrase.startsWith('https://s3.amazonaws.com/poly-video-uploads-dev/') ?
              this.renderSourceVideo(this.props.phrase.source_phrase)
              :
              this.renderParagraph(this.props.phrase.source_phrase)
          }
        </li>
        <li className="target">
          {
            this.props.phrase.target_phrase && this.props.phrase.target_phrase.startsWith('https://s3.amazonaws.com/poly-video-uploads-dev/') ?
              this.renderTargetVideo(this.props.phrase.target_phrase)
              :
              this.renderParagraph(this.props.phrase.target_phrase)
          }
        </li>
      </ul>
    );
  }

  renderSourceVideo(src) {
    return (
      <div className="video">
        {this.renderVideo(src)}
      </div>
    );
  }

  renderTargetVideo(src) {
    return (
      <span>
        <div className="video">
          {this.renderVideo(src)}
        </div>
      </span>
    );
  }

  renderVideo(src) {
    return <video src={src}></video>
  }

  renderParagraph(text) {
    return <p>{text}</p>
  }

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
            <li className="entry">{this.renderPhrasePair()}</li>
          </ul>
        </a>
      </li>
    );
  }
}

BookEntry.propTypes = {

};
