NewBook = React.createClass( {

  getInitialState: function() {
    return {
      title: '',
      description: '',
      source_language: '',
      target_language: ''
    }
  },

  onInputChange: function(e) {
    var newState = this.state;
    newState[e.target.name] = e.target.value;
    this.setState(newState);
  },

  onSubmit: function(e) {
    e.preventDefault();
    $.ajax({
      url: '/books',
      type: 'POST',
      data: {
        book: this.state
      },
      success: function(book) {
        window.location.href = '/books/' + book.id;
      },
      error: function(error) {
        console.log(error)
      }
    })
  },

  render: function() {
    return(
      <div className="container">
        <NavBar currentUser={this.props.currentUser} logo={this.props.logo}/>
        <span className="backgroundElement"></span>
        <div className="book">
          <form onSubmit={this.onSubmit}>
            <fieldset className="tools">
              <span title="Search" onClick={this.onSearchBook} className="icon">
                <img src={this.props.search} alt="Search"/>
              </span>
              <section className="cardinality">
                  <section>
                    <input className="new language source" type="text" name="source_language" placeholder="Source" value={this.state.sourceLanguage} onChange={this.onInputChange}/>
                    <img src={this.props.cardinality} alt=""/>
                    <input className="new language target" type="text" name="target_language" placeholder="Target" value={this.state.targetLanguager} onChange={this.onInputChange}/>
                  </section>
                </section>
              <span title="Favorite"className="icon">
                <img src={this.props.unstar} alt="Favorite"/>
              </span>
            </fieldset>
            <fieldset className="info">
              <div className="wrapper">
                <input className="new title" type="text" name="title" placeholder="Useful phrases in Laputa" autofocus value={this.state.title} onChange={this.onInputChange} />
                <a className="author">{this.props.currentUser.username}</a>
                <textarea className="new description" type="text" name="description" placeholder="A collection of useful phrases in Laputa, a Swiftian language spoken in Balnibarbi and a number of other islands." value={this.state.description} onChange={this.onInputChange}/>
              </div>
            </fieldset>
            <section className="new dictionary">
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
              <button className="startBook" type="submit">Create Book</button>
            </section>
          </form>
        </div>
      </div>
    )}
  });
