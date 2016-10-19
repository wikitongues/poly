NewBook = React.createClass( {

  getInitialState() {
    return {
      title: '',
      description: '',
      source_language: '',
      target_language: '',
      errors:[]
    }
  },

  onInputChange(e) {
    var newState = this.state;
    newState[e.target.name] = e.target.value;
    this.setState(newState);
  },

  onSubmit(e) {
    e.preventDefault();
    if(this.state.title && this.state.source_language && this.state.target_language) {
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
    } else {
      alert("Please make sure you have a book title, source and target language to continue.")
    }
  },

  render() {
    return(
      <div className="container">
        <NavBar currentUser={this.props.currentUser} logo={this.props.logo} detail={this.props.detail} search={this.props.search}/>
        <span className="backgroundElement"></span>
        <div className="book">
          <form onSubmit={this.onSubmit}>
            <fieldset className="tools">
              <span title="Favorite"className="icon">
                <img src={this.props.unstar} alt="Favorite"/>
              </span>
              <section className="cardinality">
                <section>
                  <input className="new language source" type="text" name="source_language" placeholder="Source" value={this.state.sourceLanguage} onChange={this.onInputChange}/>
                  <img src={this.props.cardinality} alt=""/>
                  <input className="new language target" type="text" name="target_language" placeholder="Target" value={this.state.targetLanguager} onChange={this.onInputChange}/>
                </section>
              </section>
              {/*<button title="Menu" className="more icon">
                <img src={this.props.menuAlt}/>
              </button>*/}
              <span title="Menu" className="icon">
                <img src={this.props.menuAlt}/>
              </span>
            </fieldset>
            <fieldset className="info">
              <div className="wrapper">
                <input className="new title" type="text" name="title" placeholder="Useful phrases in Laputa" autofocus value={this.state.title} onChange={this.onInputChange} />
                <a className="author">{this.props.currentUser.username}</a>
                <textarea className="new description" type="text" name="description" placeholder="Describe the contents of your book, Ex: A collection of useful phrases in Laputa, a Swiftian language spoken in Balnibarbi and a number of other islands." value={this.state.description} onChange={this.onInputChange}/>
              </div>
            </fieldset>
            <section className="new dictionary">
              <DummyContent/>
              <button className="startBook" type="submit">Create Book</button>
            </section>
          </form>
        </div>
      </div>
    )
  }
} );
