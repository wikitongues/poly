Profile = React.createClass( {

  getInitialState: function () {
    //mockup data
    return {
      languages: ['swiss', 'german', 'french', 'english'],
      books: [
        {
          title: 'useful phrases in swiss german',
          id: 1
        },
        {
          title: 'other cool book',
          id: 2
        }
      ]
    }
  },

  render: function() {
    let langs = []
    this.state.languages.forEach(function (lang) {
      langs.push(<span className="language">{lang}</span>)
    })

    let books = []
    this.state.books.forEach(function (book) {
      books.push(
        <a href={'/books/' + book.id}>{book.title}</a>
      )
    })

    let createdDate = new Date(this.props.userData.created_at),
    createdYear = createdDate.getUTCFullYear(),
    months = ["January","February","March","April","May","June","July","August","September","October","November","December"],
    createdMonth = months[createdDate.getMonth()]

    return(
      <div className="container">
        <div className="profile">
          <h3>{this.props.userData.email}</h3>
          <img src={`http://www.gravatar.com/avatar/${this.props.hashedEmail}?s=200`} />
          <div className="languages">
            {langs}
          </div>
          <div className="books">
            {books}
          </div>
          <p>member since {createdMonth} {createdYear}</p>
          <a>follow</a>
        </div>
      </div>
    )}
  });
