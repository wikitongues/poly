const RecordRTC = require('recordrtc');

Video = React.createClass( {
  getInitialState() {
    return {
      accessToken: '',
      // clientId Ben
      // clientId: '463787160210-89kiojjsupa9u2g2s946g7em5d8t6kdj.apps.googleusercontent.com',
      // wikitongues
      clientId: '20162064407-uf2hnjg83uhaq6v3soa0bm0ngp5gmvjq.apps.googleusercontent.com',
      scopes: [
        'https://www.googleapis.com/auth/youtube',
        'https://www.googleapis.com/auth/plus.login',
        'https://www.googleapis.com/auth/userinfo.email',
      ],
      titleVideo: '',
      descVideo: '',
      privacyVideo: 'unlisted',
      recordRTC: '',
      recordedBlob: '',
      uploadVideo: '',
      youtubeVideoEmbed: '',
      isHidden: '',
    };
  },
  componentWillMount() {
    // This is where the authentication process starts
    if (typeof gapi !== 'undefined') {
      this.authorizeApp();
      return;
    }

    this.props.onCloseVideoComponent();
    alert('Could not load Google API, please check your connection.');
  },

  componentDidMount() {

    // Creates our custom title
    this.saveTitle();
    const video = document.getElementById('camera-stream');
    video.muted = true;
  },

  /*
    Recording of our video
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
    const recordRTC = new Promise((resolve) => {
      resolve(RecordRTC(stream, options));
    });
    recordRTC.then((response) => {
      this.saveRecordRTC(response);
    }).then(() => {
      this.state.recordRTC.startRecording();
    });
  },

  onStopRecording() {
    this.props.onStopRecordingClick();

    const video = document.querySelector('#camera-stream');
    video.muted = false;

    const recordRTC = this.state.recordRTC;
    recordRTC.stopRecording((audioVideoWebURL) => {
      video.src = audioVideoWebURL;

      const recordedBlob = recordRTC.getBlob();
      recordedBlob.lastModifiedDate = new Date();
      recordedBlob.name = 'VideoTest.webm';

      this.updateRecordedBlob(recordedBlob);
    });

    this.props.onStopStream();

    this.handleUploadTimeout();
  },

  /*
    Modify state methods
  */
  saveTitle() {
    const title = `${this.props.sourceLanguage}.${this.props.targetLanguage}.${this.props.author}`;
    // console.log(title);
    this.setState({ titleVideo: title });
  },

  saveStreamData(stream) {
    this.setState({ stream });
  },


  saveToken(accessToken) {
    this.setState({ accessToken });
  },
  saveUploadVideoSession(uploadVideo) {
    this.setState({ uploadVideo });
  },
  saveRecordRTC(recordRTC) {
    this.setState({ recordRTC });
  },
  updateRecordedBlob(updatedBlob) {
    this.setState({ recordedBlob: updatedBlob });
  },
  saveVideoId(videoId) {
    this.setState({ videoId });
  },
  saveYoutubeUrl(videoId) {
    this.setState({
      youtubeVideoEmbed: `http://www.youtube.com/embed/${videoId}?showinfo=0&rel=0&color=white&autohide=1&controls=0`,
    });
  },

  /*
    UploadVideo: Constructor method
  */

  UploadVideo(self) {
    const video = document.getElementById('camera-stream');

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
          }
        }.bind(this),
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
        }
      };
      const uploader = new MediaUploader({
        baseUrl: 'https://www.googleapis.com/upload/youtube/v3/videos',
        file,
        token: self.state.accessToken,
        metadata,
        params: {
          part: Object.keys(metadata).join(','),
        },
        onError: function(data) {
          let message = data;
          try {
            const errorResponse = JSON.parse(data);
            message = errorResponse.error.message;
            console.log(message);
          } finally {
            alert(message);
          }
        }.bind(this),
        onComplete: function(data) {
          console.log('Upload complete');
          const uploadResponse = JSON.parse(data);
          const videoId = uploadResponse.id;
          self.handleVideoId(videoId);
        }.bind(this),
      });
      this.uploadStartTime = Date.now();
      uploader.upload();
    };

    this.handleUploadClick = function () {
      if(self.state.recordedBlob) {
        console.log('success');
        this.uploadFile(self.state.recordedBlob);
      } else {
        setTimeout(function() {
          self.handleUploadTimeout();
        }, 300);
      }
    };
  },

  createUploadClass() {
    const self = this;

    if (this.state.accessToken !== '') {
      const UploadFunction = this.UploadVideo;
      const accessToken = this.state.accessToken;

      const uploadVideo = new UploadFunction(self);
      self.saveUploadVideoSession(uploadVideo);

      self.state.uploadVideo.ready(accessToken);
    } else {
      setTimeout(this.createUploadClass, 100);
    }
  },

  /*
    Authentication with GoogleAPI
  */

  authorizeApp() {
    const clientId = this.state.clientId;
    const scopes = this.state.scopes;
    const checkAuth = this.checkAuth;

    gapi.auth.init(() => {
      window.setTimeout(checkAuth(clientId, scopes), 1);
    });
  },

  checkAuth(clientId, scopes) {
    gapi.auth.authorize({
      client_id: clientId,
      scope: scopes,
      immediate: false,
    },
    this.handleAuthResult);
  },

  handleAuthResult(authResult) {
    if (authResult && !authResult.error) {
      this.loadAPIClientInterfaces(authResult);
    } else {
      alert('Error while trying to authenticate.');
      this.props.onCloseVideoComponent();
    }
  },

  loadAPIClientInterfaces(authResult) {
    const accessToken = authResult.access_token;
    this.saveToken(accessToken);

    gapi.client.load('youtube', 'v3');
    // console.log('gapi loaded');

    this.props.onToggleGAPILoaded();
    this.props.onRenderVideoInput();
    this.createUploadClass();
  },

  /*
    Helper functions, for handling events
  */

  handleUploadTimeout() {
    if (this.state.uploadVideo !== '') {
      this.state.uploadVideo.handleUploadClick();
    } else {
      setTimeout(this.handleUploadTimeout, 100);
    }
  },

  handleVideoId(videoId) {
    this.saveYoutubeUrl(videoId);

    if (this.props.isTargetInputActive) {
      this.props.onTargetVideoSubmit(this.state.youtubeVideoEmbed);
      this.props.onToggleInputType();
    } else {
      this.props.onSourceVideoSubmit(this.state.youtubeVideoEmbed);
      this.props.onToggleInputType();
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
            <img src={this.props.closeAlt} alt="close"/>
          </button>

          <button title="Text" onClick={this.props.onCloseVideoComponent} className="text icon">
            <img src={this.props.textAlt} alt="close"/>
          </button>

          <button hidden className="extra" ref= "button-download" id="button-download">
            Download
          </button>
          <button hidden className="extra" onClick={this.props.handleUploadClick} id="button-upload">
            Upload Video
          </button>
        </div>
      </div>
    );
  },
});
