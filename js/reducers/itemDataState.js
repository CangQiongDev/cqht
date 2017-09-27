/**
 * Created by spm on 14/07/17.
 */
'use strict';

import * as TYPES from '../actions/actionTypes'

const initialState = {
    loading: true,
    dataSource: [],
    isRenderFooter: false,
    pageNumber: 1,
    isFullData: false,
    error: false,
    isEmpty: false,
    rowData: [],
    isSelectSend: false
};

export default function targetData(state=initialState, action) {
    switch(action.type){
        case TYPES.FETCH_ITEM_DATA_REQUEST:
            return Object.assign({}, state, {
                loading: true,
                isRenderFooter: false,
                isFullData: false,
                pageNumber: 1,
                dataSource: [],
                error: false,
                isEmpty: false
            });

        case TYPES.FETCH_ITEM_MORE_DATA_REQUEST:
            return Object.assign({}, state, {
                ...state,
                loading: false,
                isRenderFooter: true,
                dataSource: state.dataSource,
                error: false,
                isEmpty: false
            });

        case TYPES.FETCH_ITEM_DATA_SUCCESS:
            return Object.assign({}, state, {
                ...state,
                loading: false,
                isRenderFooter: false,
                dataSource: state.dataSource.concat(action.dataSource),
                pageNumber: state.pageNumber + 1
            });

        case TYPES.FETCH_ITEM_DATA_FAILURE:
            return Object.assign({}, state, {
                ...state,
                loading: false,
                isRenderFooter: false,
                error: true
            });
        case TYPES.FETCH_ITEM_DATA_EMPTY:
            return Object.assign({}, state, {
                ...state,
                loading: false,
                isRenderFooter: false,
                isEmpty: true
        });
        case TYPES.FETCH_ITEM_MORE_DATA_FAILURE:
            return Object.assign({}, state, {
                ...state,
                isRenderFooter: false
            });

        case TYPES.FETCH_ITEM_DATA_IS_FULL:
            return Object.assign({}, state, {
                ...state,
                loading: false,
                isRenderFooter: true,
                isFullData: true
            });
        case TYPES.SELECT_ITEM_ROWDATA:
            return Object.assign({}, state, {
                ...state,
                rowData: action.rowData,
                isSelectSend: false
            });
        case TYPES.SELECT_ITEM_SEND:
            return Object.assign({}, state, {
                ...state,
                isSelectSend: true
            });
        default:
            return state;
    }
}