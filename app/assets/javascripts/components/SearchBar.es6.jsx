class SearchBar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      query: '',
      languageSuggestions: [],
      languageId: '',
    };
  }

  hasQueryValue() {
    if (this.props.query) {
      return this.props.query;
    }
  }

  render() {
    return (
      <form action="/search">
        <img src={this.props.search} alt="Search icon" />
        <div className="autosuggest">
          <LanguageSearchBar
            inputProps={{ type:"text", name:"q", placeholder:"Search", dir:"auto", defaultValue:this.hasQueryValue() }}
            value={this.state.query}
            items={this.state.languageSuggestions}
            onSelect={(value, item) => {
              this.setState({
                query: value,
                languageId: item.glottocode,
                languageSuggestions: [item]
              });
            }}
            onChange={(event, value) => {
              this.setState({ query: value, languageId: '' })
              if(value.length > 2){
                var req = asyncSearchLanguage(
                  value,
                  res => {
                    if (res.length == 0 || res[0].message) {
                      this.setState({ languageSuggestions: [] })
                    } else {
                      this.setState({ languageSuggestions: res })
                      if (res.length == 1) {
                        this.setState({ target_languageId: res[0].glottocode });
                      }
                    }
                  }
                );
              } else {
                this.setState({ languageSuggestions: [] });
              }
            }}
          />
      </div>
      <input className="hiddenInput" type="submit" />
      <input
        type="text"
        className="hiddenInput"
        name="glottocode"
        dir="auto"
        value={this.state.languageId}
      />
      </form>
    );
  }
}

SearchBar.proptypes = {
  query: React.PropTypes.string,
  search: React.PropTypes.string,
};
