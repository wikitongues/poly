class ArchiveApp extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
  	var videoComponents = this.props.data.map(function(video) {
	    return (
	       <ArchiveVideoCard 
	          video_id={video["IDv2"]} 
	          video_title='Edith speaking Spanish' 
	          date={video["Date added"]}
	          iso_codes={video["Languages Used"]}/>
	    );
  	})
    return (
      <ArchiveLanding videos={videoComponents}/>
    );
  }
}
