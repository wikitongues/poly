ProgressBar = React.createClass({
  getInitialState: function() {
    return {
      bookProgress:""
    };
  },

  handleScroll: function(e) {
    let scrollTop = event.srcElement.body.scrollTop;
    let viewHeight = $(window).height();
    let pageHeight = $('body').height();
    let bookProgress = 100/(pageHeight-viewHeight)*scrollTop;
    this.setState({
      bookProgress: bookProgress
    })
  },

  componentDidMount: function() {
    let scrollTop = event.srcElement.body.scrollTop;
    let viewHeight = $(window).height();
    let pageHeight = $('body').height();
    let bookProgress = 100/(pageHeight-viewHeight)*scrollTop;
    window.addEventListener('scroll', this.handleScroll);
    this.setState({
      bookProgress: bookProgress
    })
  },

  componentWillUnmount: function() {
    window.removeEventListener('resize', this.handleScroll);
  },

  render: function() {
    return (
      <span className="progressBar">
        {this.state.pageHeight}
        <span className="bar" style={{width: this.state.bookProgress +"%"}}></span>
      </span>
    )
  }
})