class ArchiveLanding extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='archive-page'>
        <div className='archive-background'>
          <div className='archive-bg-container'>
            <img src="/assets/archive/landing.png" />
            <h1 className='archive-title'> WikiTongues Archive </h1>
          </div>
        </div>

        <div className="archive-video-container">
        </div>
      </div>
    );
  }
}

