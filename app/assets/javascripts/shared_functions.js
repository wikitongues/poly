function printErrors(error){
  server_errors = JSON.parse(error.responseText)["errors"];

  for( i = 0 ; i < server_errors.length; i++){
    bootbox.alert({
      message: server_errors[i],
      closeButton: false,
    });
  }
}

function asyncSearchLanguage(query, callback) {
  // TODO don't hardcode URL
  const url = `http://localhost:6543/search?q=${query}`
  return $.ajax({
    url: url,
    type: 'GET',
    success(res) {
      callback(res);
    },
    error(error) {
      printErrors(error);
    },
  });
}
