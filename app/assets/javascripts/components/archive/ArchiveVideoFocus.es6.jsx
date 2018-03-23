class ArchiveVideoFocus extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
  	var videoData =
	       <WatchVideo
            id={this.props.data['IDv2']}
            videoUrl="https://s3-us-west-2.amazonaws.com/cdn.hackthenorth.com/videos/b3cd186e908294701708d23825b74f91.mp4"
            title="Archive"
            description="This is a description"
	          srtUrl={this.props.data['Caption File Link']}/>;
    return (
      <ArchiveVideoApp video={ videoData }/>
    );
  }
}
