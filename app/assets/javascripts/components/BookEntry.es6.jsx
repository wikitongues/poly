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
    createdDay = createdDate.getDate()

    return (
       <li className="bookEntry">
        <a href={"/books/"+this.props.book.id}>
          <section className="info">
            {/*<span className="banner"><img src=""/></span>*/}
            <section className="clear">
                <h2 className="title"title={this.props.book.title}>{this.props.book.title}</h2>
              <section className="details">
                <p className="source language" title={this.props.book.source_language}>
                  {this.props.book.source_language}
                </p>
                <img className="bookEntry icon cardinality" src={this.props.cardinality} alt=""/>
                <p className="target language" title={this.props.book.target_language}>
                  {this.props.book.target_language}
                </p>
              </section>
            </section>
            <section className="meta">
              <p className="date">{createdDay} {createdMonth} {createdYear}</p>
              <p className="author">{this.renderAuthor()}</p>
            </section>
          </section>
         </a>
       </li>
    )
  }
} )