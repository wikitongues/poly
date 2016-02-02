class BookEntry extends React.Component {
  render () {
    return (
       <li className="content">
        <a href={"/books/"+this.props.book.id}>
          <section className="info">
            <span className="banner"><img src=""/></span>
            <section>
              <p className="title">{this.props.book.title}</p>
            </section>
            <section className="details">
              <span className="source language" title="Source Language">
                <p>Source Language</p>
              </span>
              <img className="icon cardinality" src="app/assets/images/icons/i_cardinality.svg" alt=""/>
              <span className="target language" title="Target Language">
                <p>Target Language</p>
              </span>
            </section>
          </section>
         </a>
       </li>
    )
  }
}

