class ArchiveVideoFocus extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let video = this.props.data;

    // TODO: Refactor repetitive code
    var language = video['Languages Used'].split(',')[0];
    var speaker = video['Speakers'].split('_'); // Filter any null
    speaker.splice(speaker.length - 1);
    speaker = speaker.filter(name => !!name)
    speaker = speaker.join(' ');

  	var videoData =
	       <WatchVideo
            id={this.props.data['IDv2']}
            videoUrl="https://s3-us-west-2.amazonaws.com/cdn.hackthenorth.com/videos/b3cd186e908294701708d23825b74f91.mp4"
            title={speaker+ ' speaking ' + language}
            description={this.props.data['Demographics']}
	          srtUrl={this.props.data['Caption File Link']}/>;
    return (
      <ArchiveVideoApp video={ videoData }/>
    );
  }
}
