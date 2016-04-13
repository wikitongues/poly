Profile = React.createClass( {

  getInitialState: function () {
    //mockup data
    return {
      languages: ['swiss', 'german', 'french', 'english', 'portuguese'],
      books: [
        {
          title: 'Useful phrases in Swiss German',
          id: 1,
          source_language:'English',
          target_language:'Swiss German',
          phrases:17,
          favorites:4,
          shares:4
        },
        {
          title: 'Intro to Swiss German Sign Language',
          id: 2,
          source_language:'English',
          target_language:'Swiss German Sign Language',
          phrases:22,
          favorites:19,
          shares:0
        },
        {
          title: 'Welcome to Switzerland!',
          id: 3,
          source_language:'English',
          target_language:'Swiss German',
          phrases:43,
          favorites:2,
          shares:1
        },
        {
          title: 'Afrikaans workbook',
          id: 4,
          source_language:'English',
          target_language:'Afrikaans',
          phrases:9,
          favorites:0,
          shares:2
        },
        {
          title: 'Useful Afrikaans phrases',
          id: 5,
          source_language:'English',
          target_language:'Afrikaans',
          phrases:24,
          favorites:3,
          shares:0
        },
        {
          title: 'Bem vindos à Suíssa',
          id: 5,
          source_language:'Português',
          target_language:'Suíço-alemão',
          phrases:30,
          favorites:0,
          shares:64
        },
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
        <li className="bookEntry">
          <a href={'/books/'+book.id}>
          <section className="info">
            <span className="banner"><img src=""/></span>
            <section>
              <p className="title">{book.title}</p>
            </section>
            {/*<p className="author">{this.props.userData.email}</p>*/}
            <section className="details">
              <span className="source language" title="Source Language">
                <p>{book.source_language}</p>
              </span>
              <div className="icon cardinality bookEntry" alt=""/>
              <span className="target language" title="Target Language">
                <p>{book.target_language}</p>
              </span>
            </section>
            {/*<section className="meta">
              <p>{book.phrases} phrases</p>
              <p>{book.favorites} favories</p>
              <p>{book.shares} shares</p>
            </section>*/}
          </section>
         </a>
        </li>
      )
    })

    let createdDate = new Date(this.props.userData.created_at),
    createdYear = createdDate.getUTCFullYear(),
    months = ["January","February","March","April","May","June","July","August","September","October","November","December"],
    createdMonth = months[createdDate.getMonth()]

    return(
      <div className="container">
        <NavBar currentUser={this.props.currentUser}/>
        <div id="profile">
          <div className="info">
            <h3>{this.props.userData.email}</h3>
            <img src={`http://www.gravatar.com/avatar/${this.props.hashedEmail}?s=200`} />
            <div className="languages">
              {langs}
            </div>
            <p>member since {createdMonth} {createdYear}</p>
            <a>follow</a>
          </div>
          <div className="dashboard">
            <ul className="content">
              {books}
            </ul>
          </div>
        </div>
      </div>
    )}
  });
