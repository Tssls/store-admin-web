const originUrl = 'http://120.25.229.237:8888/';

const post = (url, data) => {
  return fetch(originUrl + url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': sessionStorage.getItem('token') || ''
      },
      body: JSON.stringify(data),
    })
    .then(response => response.json())
}

const get = (url) => {
  return fetch(originUrl + url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': sessionStorage.getItem('token') || ''
      }
    })
    .then(response => response.json())
}

export const xhrLogin = (data) => {
  return post('api/login', data);
}

export const xhrRegsiter = (data) => {
  return post('api/register', data);
}

export const xhrStoreQuery = ({page,pageSize,name='',city=''}) => {
  return get(`main/query?page=${page}&pageSize=${pageSize}&name=${name}&city=${city}`)
}

export const xhrCreateStore = (data) => {
  return post('main/create/store', data);
}

export const xhrUpdateStore = (data) => {
  return post('main/update/store', data);
}

export const xhrDeleteStore = (data) => {
  return post('main/delete/store', data);
}

