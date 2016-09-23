const RecordRTC = require('recordrtc');

Video = React.createClass( {
  componentDidMount() {
    this.props.onRenderVideoInput();
  },
	render() {
		return(
      <div className="videoComponent">
        <video id="camera-stream" width="570" autoPlay muted  ></video>
        {this.props.renderRecordButton()}
        <button title="Cancel" onClick={this.props.onCancelEditPhrase} className="close icon">
          <img src={this.props.closeAlt} alt="close"/>
        </button>

        <button title="Text" onClick={this.props.onCloseVideoComponent} className="text icon">
          <img src={this.props.textAlt} alt="close"/>
        </button>

        <button hidden className="extra" ref= "button-download" id="button-download">Download</button>
        <button hidden className="extra" onClick={this.props.handleUploadClick} id="button-upload">Upload Video</button>
      </div>			
		);
	}
} );