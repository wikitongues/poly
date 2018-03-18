class ArchiveLanding extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let videos = [];
    for (let i = 0; i < 21; i++) {
      videos.push(
        <ArchiveVideoCard 
          video_id={123} 
          video_title='Edith speaking Spanish' 
          date='March 30, 2016' 
          iso_codes='Russian, English, Spanish'/>
        );
    }

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
          {videos}
        </div>
      </div>
    );
  }
}
