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
          {this.props.video}
        </div>
      </div>
    );
  }
}
