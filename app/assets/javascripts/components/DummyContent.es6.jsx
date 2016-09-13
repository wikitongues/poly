DummyContent = React.createClass( {
  randomPhraseLength: function() {
    return Math.floor(Math.random() * (36 - 2)) + 2;
  },

  randomString: function(length) {
    return Math.round((Math.pow(36, length + 1) - Math.random() * Math.pow(36, length))).toString(36).slice(1);
  },

  render: function() {
    return(
      <ul className="dummy content">
        <li className="entry">
          <ul>
            <li className="source">
              <p>{this.randomString(this.randomPhraseLength())}</p>
            </li>
            <li className="target">
              <p>{this.randomString(this.randomPhraseLength())}</p>
            </li>
          </ul>
        </li>
        <li className="entry">
          <ul>
            <li className="source">
              <p>{this.randomString(this.randomPhraseLength())}</p>
            </li>
            <li className="target">
              <p>{this.randomString(this.randomPhraseLength())}</p>
            </li>
          </ul>
        </li>
        {/*<li className="entry">
              <ul>
                <li className="source">
                  <p>Reply to 'How are you?'</p>
                </li>
                <li className="target">
                  <p>Bem obrigada. E você?</p>
                </li>
              </ul>
            </li>*/}
      </ul>
    )}
  });
