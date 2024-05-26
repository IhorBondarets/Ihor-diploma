import axios from 'axios'
import fileDownload from 'js-file-download'

export const upload = (file, url, options) => {
  const onProgress = options?.onProgress;
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", url);
    xhr.setRequestHeader(
      "Authorization",
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NTJmMWQxN2M4MDg3ODk0MWFiNDA4MCIsImVtYWlsIjoidGVzdEB0ZXN0LmNvbSIsInBhc3N3b3JkIjoicGFzcyIsImlhdCI6MTcxNjcxMTg5MCwiZXhwIjoxNzE5MzAzODkwfQ.4FlTRHECrLfS9nv4-PwO4t4oz5f6hG6vIJhxicm8flw"
    );
    xhr.upload.onprogress = (event) => {
      onProgress?.(Math.round((event.loaded / event.total) * 100));
    };
    xhr.onload = () => {
      if (xhr.status === 200) {
        if (options?.isLoading) {
          options?.isLoading(false);
        }
        resolve(JSON.parse(xhr.response));
      } else {
        if (options?.isLoading) {
          options?.isLoading(false);
        }
        reject(xhr.response);
      }
    };
    const myData = new FormData();
    myData.append("image", file);
    xhr.send(myData);
    if (options?.isLoading) {
      options?.isLoading(true);
    }
  });
};

export const getFile = (url) => {
  axios.get(url, {
    responseType: 'blob',
  })
  .then((res) => {
    fileDownload(res.data, 'text.txt')
  })
}
