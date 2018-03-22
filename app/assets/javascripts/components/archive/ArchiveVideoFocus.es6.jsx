class ArchiveVideoFocus extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
  	var videoData = this.props.data.map(function(video) {
	    return (
	       <WatchVideo
	          srt_url={video['Caption File Link' ]}
	          video_url="https://s3-us-west-2.amazonaws.com/cdn.hackthenorth.com/videos/b3cd186e908294701708d23825b74f91.mp4"/>
	    );
  	})
    return (
      <ArchiveVideoApp files={videoData}/>
    );
  }
}
