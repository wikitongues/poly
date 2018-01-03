function printErrors(error){
  server_errors = JSON.parse(error.responseText)["errors"];

  for( i = 0 ; i < server_errors.length; i++){
    bootbox.alert({
      message: server_errors[i],
      closeButton: false,
    });
  }
}
