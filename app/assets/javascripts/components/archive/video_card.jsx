class ArchiveVideoCard extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return ( 
      <div className="archive-video-card">
        <div className="archive-video-card-thumbnail">
          <img src="/assets/archive/video_thumbnail_test.jpg" />
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
};
