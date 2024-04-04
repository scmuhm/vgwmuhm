function handler(event) {
  var request = event.request;
  var isFilePath = request.uri.indexOf(".") !== -1;

  if (request.uri !== "/" && !isFilePath) {
    request.uri += ".html";
  }

  return request;
}
