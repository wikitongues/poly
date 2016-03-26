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
      <div>
        <form onSubmit={this.onSubmit}>
          <input type="text" name="title" value={this.state.title} onChange={this.onInputChange} />
          <input type="text" name="description" value={this.state.description} onChange={this.onInputChange}/>
          <input type="text" name="source_language" value={this.state.sourceLanguage} onChange={this.onInputChange}/>
          <input type="text" name="target_language" value={this.state.targetLanguager} onChange={this.onInputChange}/>
          <button type="submit">Create Book</button>
        </form>
      </div>
    )}
  });
