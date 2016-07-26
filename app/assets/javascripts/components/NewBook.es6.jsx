NewBook = React.createClass( {

  getInitialState() {
    return {
      title: '',
      description: '',
      source_language: '',
      target_language: ''
    }
  },

  onInputChange(e) {
    var newState = this.state;
    newState[e.target.name] = e.target.value;
    this.setState(newState);
  },

  onSubmit(e) {
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

  render() {
    return(
      <div className="container">
        <NavBar currentUser={this.props.currentUser} logo={this.props.logo}/>
        <div className="book">
          <form onSubmit={this.onSubmit}>
            <fieldset className="info">
              <div className="wrapper">
                <input className="new title" type="text" name="title" placeholder="Useful phrases in Laputa" autofocus value={this.state.title} onChange={this.onInputChange} />
                <textarea className="new description" type="text" name="description" placeholder="A collection of useful phrases in Laputa, a Swiftian language spoken in Balnibarbi and a number of other islands." value={this.state.description} onChange={this.onInputChange}/>
              </div>
            </fieldset>
            <fieldset className="cardinality">
              <section>
                <input className="new language source" type="text" name="source_language" placeholder="Source" value={this.state.sourceLanguage} onChange={this.onInputChange}/>
                <img src={this.props.cardinality} alt=""/>
                <input className="new language target" type="text" name="target_language" placeholder="Target" value={this.state.targetLanguager} onChange={this.onInputChange}/>
              </section>
            </fieldset>
            <section className="dictionary">
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
                <li className="entry">
                  <ul>
                    <li className="source">
                      <p>Reply to 'How are you?'</p>
                    </li>
                    <li className="target">
                      <p>Bem obrigada. E você?</p>
                    </li>
                  </ul>
                </li>
              </ul>
              <button className="startBook" type="submit">Create Book</button>
            </section>
          </form>
        </div>
      </div>
    )
  }
} );
