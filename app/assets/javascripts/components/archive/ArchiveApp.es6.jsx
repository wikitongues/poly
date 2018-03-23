class ArchiveApp extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
  	var videoComponents = this.props.data.map(function(video) {
      var re_url = /https:\/\/.*\.jpg/;
      var url = video['Branded Thumbnail'];

      // TODO: Refactor repetitive code
      var language = video['Languages Used'].split(',')[0];
      var speaker = video['Speakers'].split('_'); // Filter any null
      speaker.splice(speaker.length - 1);
      speaker = speaker.filter(name => !!name)
      speaker = speaker.join(' ');

      let video_id = video[Object.keys(video)[0]].split('_');
      // video_id.splice(video_id.length - 1); // Removes languages at the end of ID
      video_id = video_id.join('_');

	    return (
	       <ArchiveVideoCard
	          video_id={video_id}
	          video_title={speaker+ ' speaking ' + language}
	          date={video["Date added"]}
	          iso_codes={video["Languages Used"]}
            img_url={url ? url.match(re_url)[0] : null} />
	    );
  	})
    return (
      <ArchiveLanding videos={videoComponents}/>
    );
  }
}
