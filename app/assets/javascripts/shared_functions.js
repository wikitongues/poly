function printErrors(error){
  server_errors = JSON.parse(error.responseText);
  array_of_keys_of_errors = Object.keys(server_errors);
  for( i = 0 ; i < array_of_keys_of_errors.length; i++){
    nested_keys = Object.keys(server_errors[array_of_keys_of_errors[i]]);
    for( j = 0 ; j < nested_keys.length; j++){
      array_of_errors = server_errors[array_of_keys_of_errors[i]][nested_keys[j]];
      for( k = 0 ; k < array_of_errors.length; k++){
        bootbox.alert({
          message: nested_keys[j] + ' ' + array_of_errors[k],
          closeButton: false,
        });
      }
    }
  }
}
