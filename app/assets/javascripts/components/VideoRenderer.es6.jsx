const RecordRTC = require('recordrtc');

VideoRenderer = React.createClass( {
  getInitialState() {
    return {
      isEditing:false,
      isPlaying:false,
    };
  },

  /*
    Modify state methods
  */


  /*
    Recording zone
  */


  /*
    Upload zone
  */


  /*
    Helper
  */


  /*
    Saves our youtube urls as Phrase Pairs
  */

  playButton() {
    this.setState({isDescriptionPlaying:!this.state.isDescriptionPlaying})
    $("video")[0].play()
  },

  pauseButton() {
    this.setState({isDescriptionPlaying:!this.state.isDescriptionPlaying})
    $("video")[0].pause()
  },

  onDeleteVideoDescription() {
    const newBook = this.state.book;
    const newState = this.state;

    newBook.video_description = "";
    newState.book = newBook;
    this.setState(newState);
  },

  renderPlayButton() {
    if(this.state.isPlaying) {
      return (
        <button className="play descriptionVideoPause" type="button" onClick={this.pauseButton} title="Pause">
            <img src={this.props.pause}/>
        </button>
      )
    } else {
      return (
        <button type="button" onClick={this.playButton} title="Play" className="play">
          <img src={this.props.play}/>
        </button>
      )
    }
  },

  renderDeleteButton() {
    if(this.props.isEditing) {
      return (
        <button type="button" title="Remove video" onClick={this.onDeleteVideoDescription} className="text icon">
          <img src={this.props.deleteAlt} alt="close" />
        </button>
      )
    }
  },

  render() {
    return (
      <div className="videoComponent">
        <video src={this.props.videoSource}></video>
        <div className="videoControls">
          {this.renderPlayButton()}
          {this.renderDeleteButton()}
        </div>
      </div>
    );
  },
});