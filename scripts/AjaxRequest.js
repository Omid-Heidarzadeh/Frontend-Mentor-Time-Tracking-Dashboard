async function ajax(url) {
  return new Promise((resolve) => {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.onreadystatechange = function stateChangeHandler() {
      if (xhr.readyState == XMLHttpRequest.DONE) {
        if (xhr.status >= 200 && xhr.status < 400) {
          resolve(xhr.response);
        }
      }
    };
    xhr.send();
  });
}

export default function getTrackingData(url) {
  return new Promise((resolve) => {
    ajax(url).then((res) => {
      resolve(JSON.parse(res));
    });
  });
}
