BookEntry = React.createClass ( {
  render: function() {
    return (
       <li className="bookEntry">
        <a href={"/books/"+this.props.book.id}>
          <section className="info">
            <span className="banner"><img src=""/></span>
            <section>
              <p className="title">{this.props.book.title}</p>
            </section>
            <p className="author">Author ID:{this.props.book.user_id}</p>
            <section className="details">
              <span className="source language" title="Source Language">
                <p>{this.props.book.source_language}</p>
              </span>
              <div className="icon cardinality bookEntry" alt=""/>
              <span className="target language" title="Target Language">
                <p>{this.props.book.target_language}</p>
              </span>
            </section>
          </section>
         </a>
       </li>
    )
  }
} )