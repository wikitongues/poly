const Player = require('video-react').Player;

class WatchVideo extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {

    return (
      <div className='watch-video-container' autoplay>
        <video width="800" height="600" autoplay>
          <source src="https://s3-us-west-2.amazonaws.com/cdn.hackthenorth.com/videos/b3cd186e908294701708d23825b74f91.mp4" type="video/mp4" />
        </video>
      </div>
    );
  }
}


