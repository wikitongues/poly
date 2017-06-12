class UserEntry extends React.Component {
  render() {
    const createdDate = new Date(this.props.user.created_at);
    const createdYear = createdDate.getUTCFullYear();
    const createdMonth = createdDate.getMonth();
    const createdDay = createdDate.getDate();

    return (
      <tr>
        <td><a href={'/users/'+this.props.user.id}>{this.props.user.username}</a></td>
        <td className="right"><a href={'/users/'+this.props.user.id}>{this.props.user.books.length}</a></td>
        <td className="right"><a href={'/users/'+this.props.user.id}>{createdDay}.{createdMonth}.{createdYear}</a></td>
      </tr>
    );
  }
}

BookEntry.propTypes = {

};
