/**
 * Created by wangdi on 16/11/16.
 */
'use strict';
import React, { Component, PropTypes } from 'react';
import { StyleSheet, View, Text, InteractionManager, ScrollView, Switch, TouchableNativeFeedback, TouchableOpacity, Platform, PixelRatio, BackAndroid, Alert } from 'react-native';
import BackPageComponent from '../../components/BackPageComponent';
import NavigationBar from '../../components/NavigationBar';
import theme from '../../constants/theme';
import { connect } from 'react-redux';
import px2dp from '../../utils/px2dp';
import AboutGankPage from './AboutGankPage';
import ShareUtil from '../../utils/ShareUtil';
import * as CacheManager from 'react-native-http-cache';
import Loading from 'react-native-loading-w';
import { store } from '../../store/index';
import { performLogoutAction } from '../../actions/LoginAction';
import Login from './Login';
import { getCacheSize, fetchGameDataVersion } from '../../actions/modifySettings';
import SettingsDataDAO from '../../dao/SettingsDataDAO';
import { clearServerList } from '../../actions/SendAction';
import { ActionSheetCustom as ActionSheet } from 'react-native-actionsheet';
import Item from '../../components/Item';
import {clearData} from '../../actions/requestItemData';
//import ItemDataDAO from '../../dao/itemDataDAO';
const CANCEL_INDEX = 0
const DESTRUCTIVE_INDEX = 2
const options = ['取消', '圣灵版本', '怀旧版本']
const title = '请选择游戏版本'
class SettingPage extends BackPageComponent {
    constructor(props) {
        super(props);
        //this.state = {

        //};

    }

    render() {
        const {pageBackgroundColor, titleColor, subTitleColor, segmentColor, rowItemBackgroundColor, arrowColor, tabIconColor, mainThemeColor} = this.props;
        return (
            <View style={{
                flex: 1,
                backgroundColor: pageBackgroundColor
            }}>
                <NavigationBar
            title="设置"
            leftBtnIcon="arrow-back"
            leftBtnPress={this._handleBack.bind(this)}
            />
                <ScrollView>
                    <View style={styles.list}>
                        <Item text="邮箱" subText="未设置" />
                        <Item text="手机号" subText="未设置" />
                        <Item text="修改账户密码" />
                    </View>
                    <View style={styles.list}>
                        <Item text="清除缓存" subText={String(Math.round(this.props.getCacheSize / 1048576 * 100) / 100) + "MB"} onPress={this._itemOnPressCallback.bind(this, 3)}/>
                        <Item text="向我推送消息" isHasSwitcher={true}/>
                        <Item text="移动网络下首页不显示图片" isHasSwitcher={true}/>
                        <Item text="自动检查更新" isHasSwitcher={true} switcherValue={true}/>
                    </View>
                    <View style={styles.list}>
                        {(this.props.gameDataVersion === 0) ?
                <Item text="版本选择" subText="怀旧版本" onPress={this._itemOnPressCallback.bind(this, 4)}/>
                :
                <Item text="版本选择" subText="圣灵版本" onPress={this._itemOnPressCallback.bind(this, 4)}/>
            }
                    </View>
                    { /*--------------------------------------------------------------------------*/ }
                    <View style={styles.list}>
                        <Item text="用户反馈" onPress={this._itemOnPressCallback.bind(this, 1)}/>
                        <Item text="关于" onPress={this._itemOnPressCallback.bind(this, 2)}/>
                    </View>
                    { /*--------------------------------------------------------------------------*/ }
                    <View style={styles.list}>
                        {Platform.OS === 'android' ?
                <TouchableNativeFeedback onPress={this._itemOnPressCallback.bind(this, 0)}>
                                <View style={[styles.listItem, {
                    justifyContent: 'center'
                }]}>
                                    {this.props.isLogin ?
                    <Text style={{
                        color: 'red',
                        fontSize: px2dp(15)
                    }}>退出登录</Text>
                    :
                    <Text style={{
                        color: 'red',
                        fontSize: px2dp(15)
                    }}>立即登录</Text>
                }
                                </View>
                            </TouchableNativeFeedback>
                :
                <TouchableOpacity activeOpacity={theme.btnActiveOpacity} onPress={this._itemOnPressCallback.bind(this, 0)}>
                                <View style={[styles.listItem, {
                    justifyContent: 'center'
                }]}>
                                    {this.props.isLogin ?
                    <Text style={{
                        color: 'red',
                        fontSize: px2dp(15)
                    }}>退出登录</Text>
                    :
                    <Text style={{
                        color: 'red',
                        fontSize: px2dp(15)
                    }}>立即登录</Text>
                }
                                </View>
                            </TouchableOpacity>
            }
                    </View>
                    { /*--------------------------------------------------------------------------*/ }
                    <View style={{
                flexDirection: 'row',
                justifyContent: 'center',
                marginBottom: 30,
                marginTop: 20
            }}>
                        <Text style={{
                color: '#ccc'
            }}>苍穹猎灵 1.0.0 - www.1ksm.com</Text>
                    </View>
                </ScrollView>
                <Loading ref={'loading'}  text={'退出登录中...'} />
                {(this.props.gameDataVersion === 0) ?
                <ActionSheet
                ref={o => this.ActionSheet = o}
                title={title}
                options={[
                    '取消',
                    <Text style={{
                        color: '#007aff',
                        fontSize: 18
                    }}>圣灵版本</Text>,
                    <Text style={{
                        color: 'red',
                        fontSize: 18
                    }}>怀旧版本</Text>
                ]}
                cancelButtonIndex={CANCEL_INDEX}
                destructiveButtonIndex={DESTRUCTIVE_INDEX}
                onPress={this._handlePress.bind(this)}
                />
                :
                <ActionSheet
                ref={o => this.ActionSheet = o}
                title={title}
                options={[
                    '取消',
                    <Text style={{
                        color: 'red',
                        fontSize: 18
                    }}>圣灵版本</Text>,
                    <Text style={{
                        color: '#007aff',
                        fontSize: 18
                    }}>怀旧版本</Text>
                ]}
                cancelButtonIndex={CANCEL_INDEX}
                destructiveButtonIndex={DESTRUCTIVE_INDEX}
                onPress={this._handlePress.bind(this)}
                />
            }
            </View>
        );
    }
    componentDidMount() {
        super.componentDidMount();
        InteractionManager.runAfterInteractions(() => {
            store.dispatch(getCacheSize());
            //store.dispatch(fetchGameDataVersion());
        });
    }
    //获取加载进度组件 ref={'loading'} 
    getLoading() {
        return this.refs['loading'];
    }
    _itemOnPressCallback(id) {
        switch (id) {
        case 0:
            (this.props.isLogin) ?
                Alert.alert(
                    '提示',
                    '是否退出当前登录？',
                    [
                        {
                            text: '取消',
                            onPress: () => console.log('Cancel Pressed'),
                            style: 'cancel'
                        },
                        {
                            text: '确定',
                            onPress: () => store.dispatch(performLogoutAction(this.props.fetchkey, this, Login))
                        },
                    ],
                    {
                        cancelable: false
                    }
                )
                :
                this.props.navigator.push({
                    component: Login
                });
            break;
        case 1:
            let share = new ShareUtil();
            share.share('这个其实就是写着玩玩的', 'http://www.1ksm.com');
            break;
        case 2:
            this.props.navigator.push({
                component: AboutGankPage
            });
            break;
        case 3:
            //CacheManager.getCacheSize().then(function(value){
            //  console.log(value);
            //  if(value != 0)
            //  {
            //      var cacheValue = Math.round(value / 1048576 * 100) / 100;
            Alert.alert(
                '提示',
                '是否清除网络浏览，图片等缓存？',
                [
                    {
                        text: '取消',
                        onPress: () => console.log('Cancel Pressed'),
                        style: 'cancel'
                    },
                    {
                        text: '确定',
                        onPress: () => CacheManager.clearCache().then(() => {
                            Alert.alert('提示', '清除缓存成功');
                            store.dispatch(getCacheSize());
                        }, () => Alert.alert('提示', '清除缓存失败'))
                    },
                ],
                {
                    cancelable: false
                }
            )
            //  }
            //});
            break;
        case 4:
            this.ActionSheet.show();
            break;
        }
    }
    _handlePress(i) {
        let dao = new SettingsDataDAO();
        //let itemdao = new ItemDataDAO();
        switch (i) {
        case 0:
            //取消
            break;
        case 1:
            //圣灵版本
            dao.saveGameDataVersion(true);
            //itemdao.removeItemData();
            store.dispatch(clearData());
            store.dispatch(fetchGameDataVersion());
            store.dispatch(clearServerList());
            break;
        case 2:
            //怀旧版本
            dao.saveGameDataVersion(false);
            //itemdao.removeItemData();
            store.dispatch(clearData());
            store.dispatch(fetchGameDataVersion());
            store.dispatch(clearServerList());
            break;
        }
    }

}

const styles = StyleSheet.create({
    list: {
        borderTopWidth: 1 / PixelRatio.get(),
        borderTopColor: '#e4e4e4',
        marginTop: px2dp(12)
    },
    listItem: {
        flex: 1,
        height: px2dp(47),
        backgroundColor: 'white',
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: px2dp(25),
        paddingRight: px2dp(25),
        borderBottomColor: '#c4c4c4',
        borderBottomWidth: 1 / PixelRatio.get()
    },
});

const mapStateToProps = (state) => {
    return {
        gameDataVersion: state.settingState.gameDataVersion,
        getCacheSize: state.settingState.getCacheSize,
        isLogin: state.loginState.isLogin,
        fetchkey: state.loginState.key,
        mainThemeColor: state.settingState.colorScheme.mainThemeColor,
        pageBackgroundColor: state.settingState.colorScheme.pageBackgroundColor,
        segmentColor: state.settingState.colorScheme.segmentColor,
        titleColor: state.settingState.colorScheme.titleColor,
        rowItemBackgroundColor: state.settingState.colorScheme.rowItemBackgroundColor,
        arrowColor: state.settingState.colorScheme.arrowColor
    };
};

export default connect(mapStateToProps)(SettingPage);