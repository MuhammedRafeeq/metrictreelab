import {SET_USER_DATA} from './actionTypes';

const initialState = {
  isLoggedIn: false,
  userData: {},
};

export default function appReducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER_DATA:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
}
