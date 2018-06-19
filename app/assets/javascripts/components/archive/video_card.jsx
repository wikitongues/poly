class ArchiveVideoCard extends React.Component {
  constructor(props) {
    super(props);
  }

  viewVideo() {
    window.location = '/videos/' + this.props.video_id;
  }

  render() {
    var defaultThumbnail = '/assets/archive/video_thumbnail_test.jpg';
    return (
      <div className="archive-video-card" onClick={this.viewVideo.bind(this)}>
        <div className="archive-video-card-thumbnail">
          <img src={this.props.img_url ? this.props.img_url : defaultThumbnail} />
        </div>
          <div className="archive-video-metadata">
            <div className="archive-video-card-title">{this.props.video_title}</div>
            <div className="archive-video-card-details">
              <div>{this.props.iso_codes}</div>
              <div>{this.props.date}</div>
            </div>
          </div>
      </div>
    );
  }
}

ArchiveVideoCard.propTypes = {
  video_id: React.PropTypes.number,
  video_title: React.PropTypes.string,
  date: React.PropTypes.string,
  iso_codes: React.PropTypes.string,
  img_url: React.PropTypes.string,
};
