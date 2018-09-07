import _ from 'lodash';
import { FETCH_POSTS, FETCH_POST, DELETE_POST } from '../actions/type';

export default function PostsReducer(state = {}, action) {
  switch(action.type) {
    case FETCH_POSTS:
      // convert arry to object
      return _.mapKeys(action.payload, 'id');
    case FETCH_POST:
      const post = action.payload;
      return { ...state, [post.id]: post };
    case DELETE_POST:
      // delete an object from state
      return _.omit(state, action.payload);
    default:
      return state;
  }
}