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
        <NavBar/>
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
                <input className="new languageSource" type="text" name="source_language" placeholder="Source Language" value={this.state.sourceLanguage} onChange={this.onInputChange}/>
                <div className="icon cardinality book" alt=""/>
                <input className="new languageTarget" type="text" name="target_language" placeholder="Target Language" value={this.state.targetLanguager} onChange={this.onInputChange}/>
              </section>
            </fieldset>
            <button type="submit">Create Book</button>
          </form>
        </div>
      </div>
    )}
  });
