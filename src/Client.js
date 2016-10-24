const projectId = "";
const previewApiKey = "";

function getJsonContent(url, options) {
  let headers = {}
  if (previewApiKey !== "") {
    headers = { headers: { "Authorization": "Bearer " + previewApiKey } }
    url = "https://preview-deliver.kenticocloud.com/" + projectId + "/" + url;
  } else {
    url = "https://deliver.kenticocloud.com/" + projectId + "/" + url;
  }

  if (options) {
    let parameters = Object.getOwnPropertyNames(options).map((name) => encodeURIComponent(name) + "=" + encodeURIComponent(options[name]));
    if (parameters.length > 0) {
      url = url + "?" + parameters.join("&");
    }
  }

  return fetch(url, headers).then(checkStatus).then((response) => response.json());
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  let error = "HTTP error " + response.status + ": " + response.statusText;
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
  
}

export default new Client();