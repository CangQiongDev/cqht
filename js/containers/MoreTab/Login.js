'use strict';
import React, { Component, PropTypes } from 'react';
import { View, Text, BackAndroid, TouchableOpacity, Image, StyleSheet, InteractionManager, TextInput, Platform, ToastAndroid, Alert } from 'react-native';
//(Platform.OS === 'ios') ? '' : '';
//import {NaviGoBack} from '../../common/CommonUtils';
//import {toastShort} from '../../common/ToastUtil';
import ShortLineTwo from '../../components/ShortLineTwo';
import BackPageComponent from '../../components/BackPageComponent';
import NavigationBar from '../../components/NavigationBar';
import theme from '../../constants/theme';
import Register from './Register';
import ResetPwd from './ResetPwd';
import { connect } from 'react-redux';
import px2dp from '../../utils/px2dp';
import Loading from 'react-native-loading-w';
import Icon from 'react-native-vector-icons/Ionicons';
import { performLoginAction } from '../../actions/LoginAction';
//var username = '';
//var password = '';
class Login extends BackPageComponent {
    constructor(props) {
        super(props);
        //this.buttonBackAction = this.buttonBackAction.bind(this);
        //this._registerOrLoginCallback = this._registerOrLoginCallback.bind(this);
        //this.buttonChangeState = this.buttonChangeState.bind(this);
        this.findPwdAction = this.findPwdAction.bind(this);
        this.thirdPartLoginAction = this.thirdPartLoginAction.bind(this);
        this.state = {
            isSecurity: true, //初始隐藏密码
        }
        this.username = "";
        this.password = "";
    }

    //返回
    //buttonBackAction() {
    //    const {navigator} = this.props;
    //    return NaviGoBack(navigator);
    //}


    findPwdAction() {
        const {navigator} = this.props;
        InteractionManager.runAfterInteractions(() => {
            navigator.push({
                component: ResetPwd,
                name: 'ResetPwd'
            });
        });
    }

    thirdPartLoginAction(position) {}

    render() {
        const {pageBackgroundColor, titleColor, subTitleColor, segmentColor, rowItemBackgroundColor, arrowColor, tabIconColor, mainThemeColor} = this.props;
        return (
            <View style={[styles.container, {
                backgroundColor: pageBackgroundColor
            }]}>
                <NavigationBar
            title="登录"
            leftBtnIcon="arrow-back"
            leftBtnPress={this._handleBack.bind(this)}
            rightBtnText="注册"
            rightBtnPress={this._registerOrLoginCallback.bind(this, 1)}
            />
                <View style={{
                backgroundColor: /*'white'*/ rowItemBackgroundColor,
                marginTop: 13
            }}>
                    <View style={{
                flexDirection: 'row',
                height: 45,
                alignItems: 'center'
            }}>
                        { /*<Image source={require('../../imgs/logre/ic_us_icon.png')}
                        style={{width: 17, height: 17, marginTop: 10, marginLeft: 13}}/>*/ }
                        <View style={{
                marginTop: 10,
                marginLeft: 13
            }}>
                            <Icon name="md-person" color={arrowColor} size={px2dp(22)}/>
                        </View>
                        <TextInput
            style={{
                height: 40,
                marginTop: 15,
                marginLeft: 5,
                fontSize: 15,
                textAlign: 'left',
                textAlignVertical: 'center',
                flex: 1
            }}
            placeholder="账号/手机/邮箱"
            placeholderTextColor="#aaaaaa"
            underlineColorAndroid="transparent"
            numberOfLines={1}
            ref={'username'}
            multiline={true}
            autoCapitalize={'none'}
            onChangeText={(text) => {
                this.username = text
            }}
            />
                    </View>
                    <ShortLineTwo/>
                    <View style={{
                flexDirection: 'row',
                height: 45,
                alignItems: 'center'
            }}>
                        { /*<Image source={require('../../imgs/logre/ic_pwd_icon.png')}
                        style={{width: 17, height: 17, marginTop: 10, marginLeft: 13}}/>*/ }
                        <View style={{
                marginTop: 10,
                marginLeft: 13
            }}>
                            <Icon name="md-lock" color={arrowColor} size={px2dp(22)}/>
                        </View>
                        <TextInput
            style={{
                height: 40,
                marginTop: 15,
                marginLeft: 5,
                fontSize: 15,
                textAlign: 'left',
                textAlignVertical: 'center',
                flex: 1
            }}
            placeholder="密码"
            placeholderTextColor="#aaaaaa"
            underlineColorAndroid="transparent"
            numberOfLines={1}
            ref={'password'}
            multiline={true}
            secureTextEntry={this.state.isSecurity}
            onChangeText={(text) => {
                this.password = text
            }}
            />
                        <TouchableOpacity onPress={this._onSecurityChange.bind(this)} style={{
                width: 45,
                height: 45,
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                            { /*<Image source={require('../../imgs/logre/ic_pwd_off.png')}
                            style={{width: 17, height: 14, marginLeft: 13}}/>*/ }
                            <View style={{
                marginLeft: 13
            }}>
                            <Icon name={this.state.isSecurity ? "md-eye" : "md-eye-off"} color={arrowColor} size={px2dp(22)}/>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
                {this.props.loading ?
                <TouchableOpacity style={{
                    justifyContent: 'center',
                    marginTop: 13,
                    alignItems: 'center'
                }}>
                    <View style={{
                    width: 300,
                    height: 40,
                    backgroundColor: mainThemeColor, //'#3b3738',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                        <Text style={{
                    color: 'white'
                }}>正在登录...</Text>
                    </View>
                </TouchableOpacity>
                :
                <TouchableOpacity onPress={this._registerOrLoginCallback.bind(this, 0)}
                style={{
                    justifyContent: 'center',
                    marginTop: 13,
                    alignItems: 'center'
                }}>
                    <View style={{
                    width: 300,
                    height: 40,
                    backgroundColor: mainThemeColor, //'#3b3738',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                        <Text style={{
                    color: 'white'
                }}>登录</Text>
                    </View>
                </TouchableOpacity>
            }
                <View style={{
                alignItems: 'flex-end',
                marginTop: 13
            }}>
                    <TouchableOpacity onPress={this._registerOrLoginCallback.bind(this, 2)} style={{
                marginRight: 10
            }}>
                        <Text style={{
                fontSize: 13,
                color: '#777'
            }}>找回密码</Text>
                    </TouchableOpacity>
                </View>
                <View style={{
                marginTop: 20,
                alignItems: 'center'
            }}>
                    <Text style={{
                fontSize: 13,
                color: '#777'
            }}>第三方账号登录</Text>
                    <View style={{
                flexDirection: 'row',
                marginTop: 20
            }}>
                        <TouchableOpacity onPress={() => {
                this.thirdPartLoginAction(0)
            }}>
                            <Image source={require('../../imgs/logre/ic_login_weixin.png')}
            style={{
                width: 50,
                height: 50
            }}/>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {
                this.thirdPartLoginAction(1)
            }} style={{
                marginLeft: 15
            }}>
                            <Image source={require('../../imgs/logre/ic_login_qq.png')}
            style={{
                width: 50,
                height: 50
            }}/>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {
                this.thirdPartLoginAction(2)
            }} style={{
                marginLeft: 15
            }}>
                            <Image source={require('../../imgs/logre/ic_login_fb.png')}
            style={{
                width: 50,
                height: 50
            }}/>
                        </TouchableOpacity>
                    </View>
                </View>
                <Loading ref={'loading'}  text={'登录中...'} />

            </View>
        );
    }
    //显示/隐藏密码
    _onSecurityChange = () => {
        let isSecurity = !this.state.isSecurity
        this.setState({
            isSecurity,
        })
    }
    //获取加载进度组件 ref={'loading'} 
    getLoading() {
        return this.refs['loading'];
    }
    //用户登录/注册
    _registerOrLoginCallback(id) {
        const {dispatch} = this.props;
        const dismissKeyboard = require('dismissKeyboard');
        switch (id) {
        case 0:
            dismissKeyboard(); //隐藏键盘
            //用户登录
            if (this.username === '') {
                //toastShort('用户名不能为空...');
                (Platform.OS === 'android') ? ToastAndroid.show('用户名不能为空...', ToastAndroid.SHORT) : '';
                return;
            }
            if (this.password === '') {
                //toastShort('密码不能为空...');
                (Platform.OS === 'android') ? ToastAndroid.show('密码不能为空...', ToastAndroid.SHORT) : '';
                return;
            }
            //this.getLoading().show();
            dispatch(performLoginAction(this.username, this.password, this));

            //toastShort('登录成功');
            //(Platform.OS === 'android') ? ToastAndroid.show('登录成功',ToastAndroid.SHORT) : '';
            break;
        case 1:
            this.props.navigator.push({
                component: Register
            });
            break;
        case 2:
            this.props.navigator.push({
                component: ResetPwd
            });
            break;
        }
    }


}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: theme.toolbar.paddingTop
    },
    item_layout: {
        backgroundColor: 'white',
        height: 48,
        justifyContent: 'center'
    },
    topbar_bg: {
        height: 68,
        backgroundColor: '#389e7f',
        flexDirection: 'row',
        paddingTop: 20
    },
    topbar_left_item: {
        width: 48,
        height: 48,
        alignItems: 'center',
        justifyContent: 'center'
    },
    topbar_center_bg: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    topbar_center_tv: {
        fontSize: 18,
        color: 'white',
        alignSelf: 'center'
    },
    topbar_right_item: {
        width: 48,
        height: 48,
        alignItems: 'center',
        justifyContent: 'center'
    },
    topbar_right_tv: {
        fontSize: 15,
        color: 'white',
        alignSelf: 'center'
    }
});
const mapStateToProps = (state) => {
    return {
        loading: state.loginState.loading,
        pageBackgroundColor: state.settingState.colorScheme.pageBackgroundColor,
        segmentColor: state.settingState.colorScheme.segmentColor,
        titleColor: state.settingState.colorScheme.titleColor,
        mainThemeColor: state.settingState.colorScheme.mainThemeColor,
        subTitleColor: state.settingState.colorScheme.subTitleColor,
        rowItemBackgroundColor: state.settingState.colorScheme.rowItemBackgroundColor,
        arrowColor: state.settingState.colorScheme.arrowColor,
        tabIconColor: state.settingState.colorScheme.tabIconColor
    }
}


export default connect(mapStateToProps)(Login);
