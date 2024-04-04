function handler(event) {
    var request = event.request;
    var isFilePath = request.uri.indexOf(".") !== -1;
    var hasTrailingSlash = request.uri.endsWith("/");

    if (request.uri !== "/" && !isFilePath) {

        if (!hasTrailingSlash) {
            request.uri += "/";
        }

        request.uri += "index.html";
    }

    return request;
}
