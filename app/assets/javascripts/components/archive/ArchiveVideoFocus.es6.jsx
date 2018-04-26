class ArchiveVideoFocus extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let video = this.props.data;
    let urls = this.props.urls
    console.log(urls)

    // TODO: Refactor repetitive code
    var language = video['Languages Used'].split(',')[0];
    var speaker = video['Speakers'].split('_'); // Filter any null
    speaker.splice(speaker.length - 1);
    speaker = speaker.filter(name => !!name)
    speaker = speaker.join(' ');

  	var videoData =
	       <WatchVideo
            id={this.props.data['IDv2']}
            videoUrl={urls.video_url}
            title={speaker+ ' speaking ' + language}
            description={this.props.data['Demographics']}
	          srtUrl={this.props.data['Caption File Link']}/>;
    return (
      <ArchiveVideoApp video={ videoData }/>
    );
  }
jk }
