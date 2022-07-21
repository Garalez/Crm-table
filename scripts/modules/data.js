export const httpRequest = (url, {
  method = 'GET',
  body = {},
  callback,
  headers,
}) => {
  try {
    const xhr = new XMLHttpRequest();
    xhr.open(method, url);

    if (headers) {
      for (const [key, value] of Object.entries(headers)) {
        xhr.setRequestHeader(key, value);
      }
    }

    xhr.addEventListener('load', () => {
      if (xhr.status < 200 || xhr.status >= 300) {
        console.log(xhr.status);
        callback(xhr.status, xhr.response);
        return;
      }

      const data = JSON.parse(xhr.response);
      if (callback) callback(null, data);
    });

    xhr.addEventListener('error', () => {
      callback(new Error(xhr.status), xhr.response);
    });

    xhr.send(JSON.stringify(body));
  } catch (err) {
    callback(new Error(err));
  }
};
