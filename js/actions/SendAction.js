/**
 * Created by SPM on 25/11/16.
 */
'use strict';
import { Platform, ToastAndroid, Alert } from 'react-native';
import * as types from './actionTypes';
import Toast from 'react-native-root-toast';
import px2dp from '../utils/px2dp';
import Util from '../utils/Util';
import { SEND_ITEM, SERVER_LIST_ACTION } from './Request';

export function performSendItemAction(that, fetchkey, gameDataVersion, gameServer, name, itemID, itemName, itemCount, isEq, equipq, isPl, sendCount) {
    return dispatch => {
        dispatch(performSendItem());
        that.getLoading().show();
        Util.fetchPost(SEND_ITEM, fetchkey, gameDataVersion,
            {
                taste: gameServer,
                name: name,
                m_stuff: itemID,
                stepstate: itemName,
                m_stuff_amount: itemCount,
                gender: isEq ? 1 : 0,
                tags: equipq,
                batch: isPl ? 1 : 0,
                timesCount: sendCount,
            }, (result) => {
                that.getLoading().dismiss();
                if (result.status === 0) {
                    //成功.. 返回
                    dispatch(receiveSendItemResult(name, gameServer));
                    (Platform.OS === 'android') ? ToastAndroid.show(result.msg, ToastAndroid.SHORT) : Toast.show(result.msg, {
                        position: px2dp(-80)
                    });
                } else {
                    dispatch(performSendItemError());
                    (Platform.OS === 'android') ? ToastAndroid.show(result.msg, ToastAndroid.SHORT) : Toast.show(result.msg, {
                        position: px2dp(-80)
                    });
                }
            }, (error) => {
                dispatch(performSendItemError());
                that.getLoading().dismiss();
            }
        );

    }
}
//服务器列表
export function getServerList(fetchkey, gameDataVersion) {
    return dispatch => {
        //使用封装的比较精简
        Util.fetchGet(SERVER_LIST_ACTION, fetchkey, gameDataVersion,
            (result) => {
                dispatch(receiveServerListResult(result.data.taste, true));
            }, (error) => {
                //已集成 无需再进行错误提示
            }
        );
    }
}

export function clearServerList() {
    return dispatch => {
        dispatch(receiveSendItemResult('', '1'));
        dispatch(receiveServerListResult([], false));
    }
}
function performSendItem() {
    return {
        type: types.PERFORM_SEND_ITEM_ACTION,
    }
}

function performSendItemError() {
    return {
        type: types.PERFORM_SEND_ITEM_ERROR,
    }
}

function receiveSendItemResult(username, gameServer) {
    return {
        type: types.RECEIVE_SEND_ITEM_ACTION,
        selectServer: gameServer,
        name: username
    }
}

function receiveServerListResult(result, isGet) {
    return {
        type: types.RECEIVE_SERVER_LIST_ACTION,
        serverList: result,
        isGetServerList: isGet
    }
}

