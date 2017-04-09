const projectId = "975bf280-fd91-488c-994c-2f04416e5ee3";
const previewApiKey = "";

function isPreview() {
  return previewApiKey !== "";
}

function getBaseUrl() {
  if (isPreview()) {
    return "https://preview-deliver.kenticocloud.com/";
  }

  return "https://deliver.kenticocloud.com/";
}

function getHeaders() {
  const headers = {};
  if (isPreview()) {
    headers["Authorization"] = "Bearer " + previewApiKey;
  }

  return new Headers(headers);
}

function getJsonContent(relativeUrl, options) {
  let url = getBaseUrl() + projectId + "/" + relativeUrl;
  const headers = getHeaders();

  if (options) {
    let parameters = Object.getOwnPropertyNames(options).map((name) => encodeURIComponent(name) + "=" + encodeURIComponent(options[name]));
    if (parameters.length > 0) {
      url = url + "?" + parameters.join("&");
    }
  }

  const context = {
    headers: headers,
  };

  return fetch(url, context).then(checkStatus).then((response) => response.json());
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = "HTTP error " + response.status + ": " + response.statusText;
  console.log(error); // eslint-disable-line no-console
  throw error;
}

class Client {

  getItem(codename, options) {
    return getJsonContent("items/" + encodeURIComponent(codename), options);
  }

  getItems(options) {
    return getJsonContent("items", options);
  }

  getType(codename, options) {
    return getJsonContent("types/" + encodeURIComponent(codename), options);
  }
}

export default new Client();