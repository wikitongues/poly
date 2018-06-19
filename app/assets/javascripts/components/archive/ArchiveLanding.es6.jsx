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
            <h1 className='archive-title'> Wikitongues Archive </h1>
            <div className='archive-subtitle'>
              {'Empowering community activists, we introduce you the first public archive of every language in the world.'}
            </div>
          </div>
        </div>

        <div className="archive-video-container">
          {this.props.videos}
        </div>
      </div>
    );
  }
}
