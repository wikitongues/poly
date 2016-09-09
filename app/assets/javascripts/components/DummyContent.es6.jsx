DummyContent = React.createClass( {
  render: function() {
    return(
      <ul className="dummy content">
        <li className="entry">
          <ul>
            <li className="source">
              <p>Welcome</p>
            </li>
            <li className="target">
              <p>Bem-vinda (fem)</p>
            </li>
          </ul>
        </li>
        <li className="entry">
          <ul>
            <li className="source">
              <p>Hello (General greeting)</p>
            </li>
            <li className="target">
              <p>Oi</p>
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
