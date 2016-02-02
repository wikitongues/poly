class PhrasePair extends React.Component {
  render () {
    return (
       <div>
         <li className="entry">
          <ul>
            <li className="source text">
              <p>{this.props.phrasePair.source_phrase}</p>
            </li>
            <li className="target text">
              <p>{this.props.phrasePair.target_phrase}</p>
            </li>
          </ul>
        </li>
       </div>
    )
  }
}