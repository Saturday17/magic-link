const INITIAL_DATA = [{
  username: 'user',
  password: 'default',
  hash: 'd7132fcfbba98436eb7917281b8e7a4f'
}];

export const getData = () => {
  return JSON.parse(localStorage.getItem('data')) || INITIAL_DATA;
}

export const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem('currentUser')) || '';
}

export const getAuthorized = () => {
  return JSON.parse(localStorage.getItem('authorized')) || [];
}

export const setData = (data) => {
  localStorage.setItem('data', JSON.stringify(data))
}

export const setCurrentUser = (data) => {
  localStorage.setItem('currentUser', JSON.stringify(data))
}

export const setAuthorized = (data) => {
  localStorage.setItem('authorized', JSON.stringify(data))
}
