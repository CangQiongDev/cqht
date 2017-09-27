/**
 * Created by wangdi on 23/11/16.
 */
'use strict';

import * as types from '../actions/actionTypes';

const initialState = {
    loading: false,
	isLogin: false,
    data: {},
	key: {}
};

export default function LoginState(state=initialState, action){
    switch (action.type) {
		case types.FETCH_KEY_ACTION:
                  return Object.assign({}, state, {
					  ...state,
                      key: action.key
                  });
        case types.PERFORM_LOGIN_ACTION:
                  return Object.assign({}, state, {
					  ...state,
                      loading: true
                  });
		case types.PERFORM_LOGIN_ERROR:
                  return Object.assign({}, state, {
					  ...state,
                      loading: false
                  });
        case types.RECEIVE_LOGIN_ACTION:
                  return Object.assign({}, state, {
					   ...state,
                       loading: false,
					   isLogin:true,
                       data: action.data
                  });
		case types.PECOUT_LOGIN_ACTION:
                  return Object.assign({}, state, {
					  ...state,
                      isLogin: false,
					  loading: false
                  });
        default:
            return state;
    }
}