class ProgressBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bookProgress: '',
    };
  }

  componentDidMount() {
    const scrollTop = event.srcElement.body.scrollTop;
    const viewHeight = $(window).height();
    const pageHeight = $('body').height();
    const bookProgress = 100 / (pageHeight - viewHeight) * scrollTop;
    window.addEventListener('scroll', this.handleScroll);
    this.setState({ bookProgress });
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleScroll);
  }

  handleScroll() {
    const scrollTop = event.srcElement.body.scrollTop;
    const viewHeight = $(window).height();
    const pageHeight = $('body').height();
    const bookProgress = 100 / (pageHeight - viewHeight) * scrollTop;
    this.setState({ bookProgress });
  }

  render() {
    return (
      <span className="progressBar">
        {this.state.pageHeight}
        <span className="bar" style={{ width: this.state.bookProgress + '%' }} />
      </span>
    );
  }
}

ProgressBar.proptypes = {

};
