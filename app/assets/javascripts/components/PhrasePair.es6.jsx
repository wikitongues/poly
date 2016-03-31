class PhrasePair extends React.Component {
  render () {
    return (
       <li className="entry">
        <ul>
          <li className="source text">
            <p>{this.props.phrasePair.source_phrase}</p>
          </li>
          <li className="target text">
            <p>{this.props.phrasePair.target_phrase}</p>
          </li>
          <button>Edit</button>
          <button>Delete</button>
        </ul>
      </li>
    )
  }
}