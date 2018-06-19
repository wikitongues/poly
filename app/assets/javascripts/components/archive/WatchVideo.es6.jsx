class WatchVideo extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let srtElem = null;
    if (this.props.srtFile) {
      srtElem = <a href={this.props.srtFile}>Download subtitles</a>;
    }
    return (
      <div className='watch-video-container'>
        <h2 className='watch-video-title'> {this.props.title} </h2>
        <video className="watch-video-component" autoPlay controls>
          <source src={this.props.videoUrl} type="video/mp4" />
        </video>
        <div>{this.props.srtUrl}</div>
        <div>{this.props.id}</div>
        <div>{srtElem}</div>

        <p className='watch-video-description'>
          {this.props.description}
        </p>
      </div>
    );
  }
}

WatchVideo.propTypes = {
  srt_url: React.PropTypes.string,
  video_url: React.PropTypes.string,
};
