/**
 * Created by SPM on 25/11/16.
 */
'use strict';
import { Platform, ToastAndroid, Alert } from 'react-native';
import * as types from './actionTypes';
import fetchWithTimeout from '../utils/fetchWithTimeout';
import { getYesterdayFromDate } from '../utils/getDate';
import Toast from 'react-native-root-toast';
import px2dp from '../utils/px2dp';
import Util from '../utils/Util';
import LoginDataDAO from '../dao/LoginDataDAO';
import { LOGIN_ACTION, OUTLOGIN_ACTION } from './Request';
import DeviceInfo from 'react-native-device-info';

export function performLoginAction(username, password, that) {
    return dispatch => {
        dispatch(performLogin());
        that.getLoading().show();
        Util.fetchPost(LOGIN_ACTION, null, 0,
            {
                username: username,
                password: password,
            }, (result) => {
                that.getLoading().dismiss();
                if (result.status === 0) {
                    //登录成功.. 返回
                    dispatch(receiveLoginResult(result.data)); //注意这里必须传入data
                    var dao = new LoginDataDAO();
                    dao.saveUserInfo(result); //这里在dao里面解析data
                    var cinfo = '0' + '##' + 'cWidth' + '##' + 'cHeight' + '##' +
                    DeviceInfo.getSystemName() + '##' + DeviceInfo.getSystemVersion() + '##' + DeviceInfo.getUniqueID() + '##' + DeviceInfo.getVersion() + '##' + '0' + '##' + DeviceInfo.getManufacturer();
                    var appkeyJSON = '{"cinfo":"' + cinfo + '", "user_info":{"username":"' + result.data.user_info.username + '", "password":"' + result.data.user_info.password + '"}}';
                    //console.log(appkeyJSON);
                    dao.saveAppKey(appkeyJSON);
                    dispatch(fetchKey(JSON.parse(appkeyJSON)));
                    that._handleBack();
                //(Platform.OS === 'android') ? ToastAndroid.show(result.msg,ToastAndroid.SHORT) : Toast.show(result.msg, {position: px2dp(-80)});
                } else {
                    dispatch(performLoginError());
                    (Platform.OS === 'android') ? ToastAndroid.show(result.msg, ToastAndroid.SHORT) : Toast.show(result.msg, {
                        position: px2dp(-80)
                    });
                }
            }, (error) => {
                dispatch(performLoginError());
                that.getLoading().dismiss();
            }
        );
    
    }
}

export function performLogoutAction(fetchkey, that, Login) {
    return dispatch => {
        dispatch(performLogin());
        that.getLoading().show();
        Util.fetchGet(OUTLOGIN_ACTION, fetchkey, 0,
            (result) => {
                dispatch(outLogin());
                that.getLoading().dismiss();
                if (result.status === 0) {
                    //退出登录成功.. 
                    var dao = new LoginDataDAO();
                    dao.removeUserInfo();
                    dao.removeAppKey();
                    dispatch(fetchKey(null));
                    that.props.navigator.push({
                        component: Login
                    });
                    (Platform.OS === 'android') ? ToastAndroid.show(result.msg, ToastAndroid.SHORT) : Toast.show(result.msg, {
                        position: px2dp(-80)
                    });
                } else {
                    (Platform.OS === 'android') ? ToastAndroid.show(result.msg, ToastAndroid.SHORT) : Toast.show(result.msg, {
                        position: px2dp(-80)
                    });
                }
            }, (error) => {
                dispatch(performLoginError());
                that.getLoading().dismiss();
            }
        );
    
    }
}

function performLogin() {
    return {
        type: types.PERFORM_LOGIN_ACTION,
    }
}

function performLoginError() {
    return {
        type: types.PERFORM_LOGIN_ERROR,
    }
}

function receiveLoginResult(result) {
    return {
        type: types.RECEIVE_LOGIN_ACTION,
        data: result
    }
}

function outLogin() {
    return {
        type: types.PECOUT_LOGIN_ACTION,
    }
}

function fetchKey(result) {
    return {
        type: types.FETCH_KEY_ACTION,
        key: result
    }
}

function fetchUserLoginInfoValue() {
    return (dispatch) => {
        let dao = new LoginDataDAO();
        dao.getUserInfoValue().then((result) => {
            dispatch(receiveLoginResult(result));
        }, (error) => {
            //dispatch(receiveLoginResult(null));
        });
    };
}

function fetchKeyValue() {
    return (dispatch) => {
        let dao = new LoginDataDAO();
        dao.getAppKeyValue().then((result) => {
            dispatch(fetchKey(result));
        }, (error) => {
            //dispatch(fetchKey(null));
        });
    };
}

export function initLoginState() {
    return (dispatch) => {
        dispatch(fetchUserLoginInfoValue());
        dispatch(fetchKeyValue());
    }
}