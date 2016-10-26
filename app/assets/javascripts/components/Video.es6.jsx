const RecordRTC = require('recordrtc');

Video = React.createClass( {
  getInitialState() {
    return {
      titleVideo: '',
      descVideo: '',
      privacyVideo: 'unlisted',
      recordRTC: '',
      recordedBlob: '',
      uploadVideo: '',
      youtubeVideoEmbed: '',
      isHidden: '',
      percent: '',
    };
  },

  componentDidMount() {
    if (this.props.accessToken === '') {
      this.props.onCloseVideoComponent();
      alert('Oups, something went wrong. Please check your connection.');
      return;
    }
    this.onSaveTitle();
    this.onCreateUploadClass();

    const video = document.getElementById('camera-stream');
    video.muted = true;
  },

  /*
    Modify state methods
  */
  onSaveTitle() {
    const title = `${this.props.sourceLanguage}.${this.props.targetLanguage}.${this.props.author}`;
    this.setState({ titleVideo: title });
  },

  onSaveUploadVideoSession(uploadVideo) {
    this.setState({ uploadVideo });
  },

  onSaveRecordRTC(recordRTC) {
    this.setState({ recordRTC });
  },

  onUpdateRecordedBlob(updatedBlob) {
    this.setState({ recordedBlob: updatedBlob });
  },

  onSaveYoutubeUrl(videoId) {
    this.setState({
      youtubeVideoEmbed: `http://www.youtube.com/embed/${videoId}?showinfo=0&rel=0&color=white&autohide=1&controls=0`,
    });
  },

  onSaveProgress(percent) {
    this.setState({ percent });
  },

  /*
    Recording zone
  */
  onRecordVideo() {
    this.props.onStartRecordingClick();

    const video = document.getElementById('camera-stream');
    const stream = this.props.stream;
    video.src = window.URL.createObjectURL(stream);

    const options = {
      mimeType: 'video/webm',
      bitsPerSecond: 1200000,
      bufferSize: 16384,
      sampleRate: 96000,
    };
    const recordRtcPromise = new Promise((resolve) => {
      resolve(RecordRTC(stream, options));
    });
    recordRtcPromise.then((response) => {
      this.onSaveRecordRTC(response);
    }).then(() => {
      this.state.recordRTC.startRecording();
    });
  },

  onStopRecording() {
    this.props.onStopRecordingClick();

    const video = document.querySelector('#camera-stream');
    video.style.display = 'none';
    const controls = document.querySelector('.videoControls');
    controls.style.display = 'none';
    const progress = document.querySelector('.progress');
    progress.style.display = 'block';

    const recordRTC = this.state.recordRTC;
    recordRTC.stopRecording((audioVideoWebURL) => {
      video.src = audioVideoWebURL;

      const recordedBlob = recordRTC.getBlob();
      recordedBlob.lastModifiedDate = new Date();
      recordedBlob.name = 'VideoTest.webm';
      this.props.onStopStream();
      const saveBlobPromise = new Promise((resolve) => {
        resolve(this.onUpdateRecordedBlob(recordedBlob));
      });

      saveBlobPromise.then(() => {
        this.onHandleUploadTimeout();
      });
    });
  },

  /*
    Upload zone
  */

  onCreateUploadClass() {
    const self = this;

    const UploadFunction = this.UploadVideo;
    const accessToken = this.props.accessToken;

    const uploadVideo = new UploadFunction(self);
    const saveSessionPromise = new Promise((resolve) => {
      resolve(self.onSaveUploadVideoSession(uploadVideo));
    });
    saveSessionPromise
    .then(() => self.state.uploadVideo.ready(accessToken))
    .catch(e => console.log(e));
  },

  UploadVideo(self) {
    this.tags = ['youtube-cors-upload'];
    this.categoryId = 22;
    this.videoId = '';
    this.uploadStartTime = 0;

    this.ready = function (accessToken) {
      this.accessToken = accessToken;
      this.gapi = gapi;
      this.authenticated = true;
      this.gapi.client.request({
        path: '/youtube/v3/channels',
        params: {
          part: 'snippet',
          mine: true,
        },
        callback: function (response) {  
          if (response.error) {
            console.log(response.error.message);
            self.props.onCloseVideoComponent();
            alert('There was an issue while authenticating. Please check your connection.');
            return;
          }
          self.props.onRenderVideoInput();
        },
      });
    };
    this.uploadFile = function (file) {
      const metadata = {
        snippet: {
          title: self.state.titleVideo,
          description: self.state.descVideo,
          tags: this.tags,
          categoryId: this.categoryId,
        },
        status: {
          privacyStatus: self.state.privacyVideo,
        },
      };

      const uploader = new MediaUploader({
        baseUrl: 'https://www.googleapis.com/upload/youtube/v3/videos',
        file,
        token: self.props.accessToken,
        metadata,
        params: {
          part: Object.keys(metadata).join(','),
        },

        onError: function (data) {
          let message = data;
          try {
            const errorResponse = JSON.parse(data);
            console.log(data);
            message = errorResponse.error.message;
            console.log(message);
          } finally {
            self.props.onCloseVideoComponent();
            alert('There was an issue while uploading. Please check your connection.');
          }
        },

        onProgress: function (data) {
          const currentTime = Date.now();
          const bytesUploaded = data.loaded;
          const totalBytes = data.total;

          const bytesPerSecond = bytesUploaded / ((currentTime - this.uploadStartTime) / 1000);
          const estimatedSecondsRemaining = (totalBytes - bytesUploaded) / bytesPerSecond;
          const percentageComplete = (bytesUploaded * 100) / totalBytes;
          self.onSaveProgress(percentageComplete);
        },

        onComplete: function (data) {
          console.log('Upload complete.');
          const uploadResponse = JSON.parse(data);
          const videoId = uploadResponse.id;
          self.onHandleVideoId(videoId);

        },
      });

      this.uploadStartTime = Date.now();
      uploader.upload();
    };

    this.handleUploadClick = function () {
      const blobPromise = new Promise((resolve) => {
        if (self.state.recordedBlob !== '') {
          resolve();
        }
      });
      blobPromise.then(() => {
        this.uploadFile(self.state.recordedBlob);
      });
    };
  },

  /*
    Helper
  */

  onHandleUploadTimeout() {
    const uploadVideoPromise = new Promise((resolve) => {
      if (this.state.uploadVideo !== '') {
        resolve();
      }
    });
    uploadVideoPromise
    .then(() => {
      this.state.uploadVideo.handleUploadClick();
    });
  },

  /*
    Saves our youtube urls as Phrase Pairs
  */

  onHandleVideoId(videoId) {
    this.onSaveYoutubeUrl(videoId);
    this.props.onToggleInputType();
    if (this.props.isTargetInputActive) {
      this.props.onTargetVideoSubmit(this.state.youtubeVideoEmbed);
    } else {
      this.props.onSourceVideoSubmit(this.state.youtubeVideoEmbed);
    }
  },

  renderRecordButton() {
    if (this.props.isVideoRecording) {
      return (
        <button className="videoButtonContainer" onClick={this.onStopRecording}>
          <div className="videoButton"></div>
        </button>
      );
    }

    return (
      <button className="videoButtonContainer" onClick={this.onRecordVideo}>
        <div className="videoButton startRecording"></div>
      </button>
    );
  },

  render() {
    return (
      <div ref='video' className="videoComponent">
        <video id="camera-stream" width="600" autoPlay />
        <div className="videoControls">
          {this.renderRecordButton()}
          <button title="Cancel" onClick={this.props.onCancelEditPhrase} className="close icon">
            <img src={this.props.closeAlt} alt="close" />
          </button>
          <button title="Text" onClick={this.props.onCloseVideoComponent} className="text icon">
            <img src={this.props.textAlt} alt="close" />
          </button>
          <button
            hidden
            className="extra"
            ref="button-download"
            id="button-download"
          >Download</button>
          <button
            hidden
            className="extra"
            onClick={this.props.handleUploadClick}
            id="button-upload"
          >Upload Video</button>
        </div>
        <div className="progress">
          <div className="progress-message">Uploading the video...</div>
          <div className="progress-bar">
            <div style={{width: this.state.percent +'%'}}></div>
          </div>
        </div>

      </div>
    );
  },
});
