/**
 * Created by wangdi on 23/11/16.
 */
'use strict';

import {combineReducers} from 'redux';
import homeDataState from './homeDataState';
import categoryDataState from './categoryDataState';
import settingState from './settingState';
import favorDataState from './favorDataState';
import randomDataState from './randomDataState';
import loginState from './LoginState';
import itemDataState from './itemDataState';
import sendState from './SendState';
import searchDataState from './SearchDataState';
export default combineReducers({
    homeDataState, categoryDataState, settingState, favorDataState, randomDataState,loginState, itemDataState, sendState, searchDataState
});