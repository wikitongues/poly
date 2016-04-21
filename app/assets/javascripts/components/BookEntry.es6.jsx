BookEntry = React.createClass ( {
  renderAuthor: function() {
    let users = this.props.users
    let authorName = ""
    for (var i = users.length - 1; i >= 0; i--) {
      if(this.props.book.user_id == users[i].id) {
        authorName = users[i].username
      }
    }
    return (
      <span>
      {authorName}
      </span>
    )
  },

  render: function() {
    let createdDate = new Date(this.props.book.created_at),
    createdYear = createdDate.getUTCFullYear(),
    months = ["January","February","March","April","May","June","July","August","September","October","November","December"],
    createdMonth = months[createdDate.getMonth()]

    return (
       <li className="bookEntry">
        <a href={"/books/"+this.props.book.id}>
          <section className="info">
            <span className="banner"><img src=""/></span>
            <section>
              <p className="title">{this.props.book.title}</p>
            </section>
            <p className="author">{createdMonth} {createdYear}</p><br/>
            <p className="author">{this.renderAuthor()}</p>
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