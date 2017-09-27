/**
 * Created by wangdi on 23/11/16.
 */
'use strict';

import * as types from '../actions/actionTypes';

const initialState = {
    loading: false,
    isSendSuccess: false,
    selectServer: '1',
    name: '',
    serverList: [],
    isGetServerList: false
};

export default function LoginState(state = initialState, action) {
    switch (action.type) {
    case types.PERFORM_SEND_ITEM_ACTION:
        return Object.assign({}, state, {
            ...state,
            loading: true
        });
    case types.PERFORM_SEND_ITEM_ERROR:
        return Object.assign({}, state, {
            ...state,
            loading: false
        });
    case types.RECEIVE_SEND_ITEM_ACTION:
        return Object.assign({}, state, {
            ...state,
            loading: false,
            isSendSuccess: true,
            selectServer: action.selectServer,
            name: action.name
        });
    case types.RECEIVE_SERVER_LIST_ACTION:
        return Object.assign({}, state, {
            ...state,
            serverList: action.serverList,
            isGetServerList: action.isGetServerList
        });  
    default:
        return state;
    }
}