class Footer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <footer>
        <p>Poly is brought to you by</p>
        <span>
          <img src={this.props.logo} alt="Wikitongues"/>
        </span>
        <h2>Wikitongues, Inc.</h2>
        <ul>
          <li>
            <h3>
              <a href="https://www.wikitongues.org">About</a>
            </h3>
          </li>
          <li>
            <ul>
              <li>
                <h3><a href="https://www.wikitongues.org">Who we are</a></h3>
              </li>
              <li><a href="https://www.wikitongues.org">Leadership</a></li>
              <li><a href="https://www.wikitongues.org">Community</a></li>
            </ul>
          </li>
          <li>
            <ul>
              <li>
                <h3><a href="https://www.wikitongues.org">Initiatives</a></h3>
              </li>
              <li><a href="https://www.wikitongues.org">Wikimedia</a></li>
              <li><a href="https://www.wikitongues.org">Chapters</a></li>
            </ul>
          </li>
        </ul>
        <ul>
          <li>
            <ul>
              <li>
                <h3><a href="https://www.wikitongues.org">Submit a video</a></h3>
              </li>
              <li>
                <a href="https://www.wikitongues.org">Video resources</a>
              </li>
            </ul>
          </li>
          <li>
            <ul>
              <li>
                <h3><a href="https://www.wikitongues.org">Volunteers</a></h3>
              </li>
              <li>
                <a href="https://www.wikitongues.org">Volunteer resources</a>
              </li>
              <li>
                <a href="https://www.wikitongues.org">Apply</a>
              </li>
            </ul>
          </li>
          <li>
            <ul>
              <li>
                <h3><a href="https://www.wikitongues.org">Donate</a></h3>
              </li>
              <li>
                <a href="https://www.wikitongues.org">Single donation</a>
              </li>
              <li>
                <a href="https://www.wikitongues.org">Monthly donation</a>
              </li>
              <li>
                <a href="https://www.wikitongues.org">Sponsor a chapter</a>
              </li>
            </ul>
          </li>
        </ul>
        <p>Wikitongues is a 501(c)(3) non-profit organization based in Brooklyn, NY. USA</p>
      </footer>
    );
  }
}