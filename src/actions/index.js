import axios from 'axios';
import { FETCH_POSTS, FETCH_POST, DELETE_POST, CREATE_POST } from './type';

const ROOT_URL = 'http://reduxblog.herokuapp.com/api';
const API_KEY = '?key=shingohohoh123';

export function fetchPosts() {
  const URL = `${ROOT_URL}/posts/${API_KEY}`;
  const request = axios.get(URL);

  return (dispatch) => {
    request.then(({ data }) => {
      dispatch({ type: FETCH_POSTS, payload: data });
    });
  };
}

export function fetchPost(id) {
  const URL = `${ROOT_URL}/posts/${id}/${API_KEY}`;
  const request = axios.get(URL);

  return (dispatch) => {
    request.then(({ data }) => {
      dispatch({ type: FETCH_POST, payload: data });
    });
  };
}

export function deletePost(id, callback) {
  const URL = `${ROOT_URL}/posts/${id}/${API_KEY}`;
  const request = axios.delete(URL);

  return (dispatch) => {
    request.then(({ data }) => {
      dispatch({ type: DELETE_POST, payload: data });
    }).then(() => callback());
  };
}

export function createPost(values, callback) {
  const URL = `${ROOT_URL}/posts/${API_KEY}`;
  const request = axios.post(URL, values);

  return (dispatch) => {
    request.then(({ data }) => {
      dispatch({ type: CREATE_POST, payload: data });
    }).then(() => callback());
  };
}