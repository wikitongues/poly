class ArchiveVideoApp extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {

    return (
      <div className='archive-page'>
        <div className='archive-background'>
          <div className='archive-bg-container'>
            <img src="/assets/archive/landing.png" />
          </div>
        </div>

        <div className="archive-watch-container">
          <a className="archive-back-home" href="/videos/index">
          </a>
          <WatchVideo videoUrl="https://s3-us-west-2.amazonaws.com/cdn.hackthenorth.com/videos/b3cd186e908294701708d23825b74f91.mp4" title="Archive" description="This is a description" />
        </div>
      </div>
    );
  }
}

