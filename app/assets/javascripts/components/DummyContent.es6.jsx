DummyContent = React.createClass( {
  randomString: function() {
    let charLength = Math.floor(Math.random() * (36 - 2)) + 2;
    return Math.round((Math.pow(36, charLength + 1) - Math.random() * Math.pow(36, charLength))).toString(36).slice(1);
  },

  render: function() {
    return(
      <ul className="dummy content">
        <li className="entry">
          <ul>
            <li className="source">
              <p>{this.randomString()}</p>
            </li>
            <li className="target">
              <p>{this.randomString()}</p>
            </li>
          </ul>
        </li>
        <li className="entry">
          <ul>
            <li className="source">
              <p>{this.randomString()}</p>
            </li>
            <li className="target">
              <p>{this.randomString()}</p>
            </li>
          </ul>
        </li>
      </ul>
    )}
  });
