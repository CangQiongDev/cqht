/**
 * Created by spm on 14/07/17.
 * 物品数据页面
 */
'use strict';

import React, { Component } from 'react';
import { StyleSheet, View, Text, PixelRatio, InteractionManager, ActivityIndicator, Button, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import * as Actions from '../../actions/requestItemData';
import theme from '../../constants/theme';
import NavigationBar from '../../components/NavigationBar';
import BackPageComponent from '../../components/BackPageComponent';
import ListViewForItemInfo from '../../components/ListViewForItemInfo';
import ListViewForSearchLog from '../../components/ListViewForSearchLog';
import px2dp from '../../utils/px2dp';
import BarCode from './BarCode';
import Toast from 'react-native-root-toast';
import Icon from 'react-native-vector-icons/Ionicons';
import {store} from '../../store/index';
import {searchData, unSearchData} from '../../actions/SearchAction';
//import SearchBar from '../../components/searchBar';
//import SearchBar from '../../components/SearchBar';
//import SearchBar from 'react-native-searchbar';
const dismissKeyboard = require('dismissKeyboard');
class ItemListPage extends BackPageComponent {
    constructor(props) {
        super(props);
        this.state = {
            items: [{
                "desc": "苍穹"
            }, {
                "desc": "苍"
            }, {
                "desc": "圣魔"
            }, {
                "desc": "魔神"
            }],
            results: [],
            isChange: false,
            changeValue: '',
            oldKey: '',
            isOnFocus: false,
            searchThis: null
        };
    }
    //搜索框输入的内容变化时回调
    _handleSearch(key) {
        this.setState({
            isChange: true,
            changeValue: key
        });

    }
    render() {
        return (
            <View style={[styles.container, {
                backgroundColor: this.props.pageBackgroundColor
            }]}>
                <View style={styles.toolbar}>
                    <NavigationBar
            title="搜索物品"
            isSearchBtn={true}
            searchBtnPress={this.onSearchHandle.bind(this)}
            handleSearch={this._handleSearch.bind(this)}
            isBackBtnOnLeft={true}
            leftBtnIcon="arrow-back"
            leftBtnPress={this._handleBack.bind(this)}
            rightBtnIcon="qr-scanner"
            rightBtnPress={this.onBarCode.bind(this)}
            inputOnFocus={this.searchOnFocus.bind(this)}
            inputOnBlur={this.searchOnBlur.bind(this)}
            />
                    { /*<SearchBar 
                    onSearchHandle = { this.onSearchHandle.bind(this) } 
                    placeholder = { '请输入关键字' }
                    router={ this.props.navigator }/>
                    <SearchBar 
                        isBackBtnOnLeft={true}
                        leftBtnIcon="arrow-back" 
                        leftBtnPress={this._handleBack.bind(this)}
                        onPress={this.onSearchHandle.bind(this)}
                    />*/ }
                </View>
                <View style={styles.contentContainer}>
                {this.state.isOnFocus ?
                <View>
                <View
                style={{
                    paddingTop: 10,
                    height: 40,
                    flexDirection: 'row',
                    borderBottomColor: '#c4c4c4',
                    borderBottomWidth: 1 / PixelRatio.get()
                }}>

            <TouchableOpacity onPress={this.onSearchDataClear.bind(this)} activeOpacity={theme.touchableOpacityActiveOpacity}>
                    <View
                style={{
                    width: (theme.screenWidth - 1) / 2,
                    alignItems: 'center'
                }}>
                        <Text
                style={{
                    fontSize: px2dp(16),

                }}><Icon name="ios-trash-outline" size={px2dp(16)} color="#666"/> 清空历史记录</Text>
                    </View>
                </TouchableOpacity> 
                <TouchableOpacity onPress={this.onSearchHide.bind(this)} activeOpacity={theme.touchableOpacityActiveOpacity}>
                    <View
                style={{
                    width: (theme.screenWidth - 1) / 2,
                    alignItems: 'center'
                }}>
                        <Text
                style={{
                    fontSize: px2dp(16),

                }}><Icon name="md-arrow-up" size={px2dp(16)} color="#666"/> 收起记录</Text>
                    </View>
                </TouchableOpacity>
            </View>
                
                  <ListViewForSearchLog
                    dataSource={this.props.SearchdataSource}
                    onPress={this.onSearchHandle.bind(this)}
                />   
                         </View>
                :
                (this.props.error ?
                    <View style={styles.indicator}>
                            <Text style={{
                        color: this.props.tabIconColor
                    }}>加载数据失败~ </Text>
                            <Button onPress={this._fethchData.bind(this, this.state.oldKey)} title="重新获取" color={this.props.tabIconColor}/>
                        </View>
                    :
                    (this.props.isEmpty ?
                        <View style={{
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                        <Text style={{
                            color: this.props.subTitleColor
                        }}>未搜索到任何数据～</Text>
                    </View>
                        :
                        (this.props.loading ?
                            <View style={styles.indicator}>
                                <ActivityIndicator
                            color={this.props.tabIconColor}
                            />
                                <Text style={{
                                marginLeft: 10,
                                color: this.props.tabIconColor
                            }}>加载中...</Text>
                            </View>
                            :

                            <ListViewForItemInfo
                            dataSource={this.props.dataSource}
                            navigator={this.props.navigator}
                            isRenderFooter={this.props.isRenderFooter}
                            onEndReached={this._listViewOnEndReached.bind(this)}
                            isFullData={this.props.isFullData}
                            isOpenThumbnail={this.props.isOpenThumbnail}
                            onSelect = {this._onSelect.bind(this)}
                            selectTitle = {this.props.rowData.name}
                            />

                        ))
                )}
                </View>
              { /*  <SearchBar
            ref={(ref) => this.searchBar = ref}
            data={this.state.items}
            handleResults={this._handleResults}
            showOnLoad = {false}
            backgroundColor = {this.props.mainThemeColor}
            iconColor = {"white"}
            textColor = {"white"}
            placeholder = {"请输入关键字"}
            fontSize = {px2dp(18)}
            backCloseSize = {px2dp(25)}
            focusOnLayout = {false}
            />*/ }
            </View>
        );
    }
    //搜索
    onSearchHandle(key, KeyboardCheck=false) {
        //this.props.navigator.push({
        //     component: SearchBar
        //}); 
        //this.searchBar.show();
        //Toast.show(key, {position: px2dp(-80)});
        if(!KeyboardCheck){ //判断是否为键盘点击
            if(this.state.searchThis)
            {
               this.state.searchThis.setState({key}); //先赋值到输入框
            }
        }
        dismissKeyboard(); //隐藏键盘
        this.setState({
            oldKey: key
        });
        this._fethchSearchData(key);
        this.setState({
            isOnFocus: false
        })
        if(key !== ''){
           var inputValue = {"desc": key};
            store.dispatch(searchData(inputValue)); 
        }
        
    }
    //清空搜索记录
    onSearchDataClear() {
        
        dismissKeyboard(); //隐藏键盘

        store.dispatch(unSearchData());
        
    }
    //隐藏搜索记录
    onSearchHide() {
        this.setState({
            isOnFocus: false
        })

        dismissKeyboard(); //隐藏键盘
    }
    //搜索框进入焦点
    searchOnFocus(that) {
        this.setState({
            isOnFocus: true,
            searchThis: that //获取搜索组件的this
        })
    }
    //搜索框失去焦点
    searchOnBlur() {}

    //扫二维码
    onBarCode() {
        this.props.navigator.push({
            component: BarCode
        });
    }
    componentDidMount() {
        super.componentDidMount(); // must invoke it for the back button event
        this.props.actions.requestData(); //由于是初始化 所以要在这里清空
        InteractionManager.runAfterInteractions(() => { //等页面动画完成再执行 避免卡顿
            this._fethchData();
        });
    }

    _fethchSearchData(key = '') {
        this.props.actions.requestData();
        this.props.actions.fetchData(this.props.fetchkey, this.props.gameDataVersion, key);
    }

    _fethchData(key = '') {
        this.props.actions.fetchLocalItemData(this.props.fetchkey, this.props.gameDataVersion, key);
    }

    _listViewOnEndReached() {
        if (!this.props.isRenderFooter) {
            this.props.actions.requestMoreData();
            this.props.actions.fetchMoreLocalItemData(this.props.pageNumber, this.props.fetchkey, this.props.gameDataVersion, this.state.oldKey);
        }
    }

    _onSelect(i) {
        switch (i) {
        case 0:
            //取消
            break;
        case 1:
            //选择发送
            this.props.actions.selectItemSend();
            this._handleBack();
            //Toast.show(this.props.rowData.name, {position: px2dp(-80)});
            //ToastAndroid.show(this.state.rowData.name, ToastAndroid.SHORT);
            break;
        case 2:
            //查看详情
            //ToastAndroid.show(this.state.rowData.id, ToastAndroid.SHORT);
            break;
        }
    //Toast.show(rowData.name, {position: px2dp(-80)});
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: theme.toolbar.paddingTop
    },
    contentContainer: {
        marginTop: theme.toolbar.height,
        flex: 1,
        zIndex: 0
    },
    toolbar: {
        position: 'absolute',
        width: theme.screenWidth,
        zIndex: 1
    },
    indicator: {
        flexDirection: 'row',
        width: theme.screenWidth,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20
    }
});

const mapStateToProps = (state) => {
    return {
        SearchdataSource: state.searchDataState.dataSource,
        gameDataVersion: state.settingState.gameDataVersion,
        fetchkey: state.loginState.key,
        rowData: state.itemDataState.rowData,
        isEmpty: state.itemDataState.isEmpty,
        loading: state.itemDataState.loading,
        dataSource: state.itemDataState.dataSource,
        isRenderFooter: state.itemDataState.isRenderFooter,
        pageNumber: state.itemDataState.pageNumber,
        isFullData: state.itemDataState.isFullData,
        error: state.itemDataState.error,
        mainThemeColor: state.settingState.colorScheme.mainThemeColor,
        pageBackgroundColor: state.settingState.colorScheme.pageBackgroundColor,
        tabIconColor: state.settingState.colorScheme.tabIconColor,
        isOpenThumbnail: state.settingState.isOpenThumbnail,
        subTitleColor: state.settingState.colorScheme.subTitleColor
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(Actions, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ItemListPage);

