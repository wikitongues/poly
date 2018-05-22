class LanguageSearchBar extends React.Component {
  constructor(props) {
    super(props);
  }

  getItemTitle(item) {
    // default to glottocode if there are no identifiers
    return item.matched_identifiers.length == 0 ? item.glottocode : item.matched_identifiers[0];
  }

  renderLanguageSuggestion(item, isHighlighted) {
    // TODO couldn't figure out how to call getItemTitle here, even after binding it in constructor
    const title = item.matched_identifiers.length == 0 ? item.glottocode : item.matched_identifiers[0];

    return (
      <div
        className={`item ${isHighlighted ? 'item-highlighted' : ''}`}
        key={item.glottocode}
      >
        <div className="title">{title}</div>
        <div className="subtitle">{item.name}</div>
      </div>
    );
  }

  renderDropdownMenu(children) {
    return (
      <div className="dropdown-menu">
        {children}
      </div>
    );
  }

  render() {
    return (
      <ReactAutocomplete
        inputProps={this.props.inputProps}
        value={this.props.value}
        items={this.props.items}
        onSelect={this.props.onSelect}
        onChange={this.props.onChange}
        wrapperStyle={{ position: 'relative', display: 'block' }}
        getItemValue={this.getItemTitle}
        renderMenu={this.renderDropdownMenu}
        renderItem={this.renderLanguageSuggestion}
      />
    );
  }
}
