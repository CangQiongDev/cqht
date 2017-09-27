'use strict';
import React, { Component } from 'react';
import { View, Text, Switch, BackAndroid, TouchableOpacity, Image, StyleSheet, InteractionManager, TextInput, Platform, ToastAndroid, Picker, ScrollView, Alert } from 'react-native';

//import { NaviGoBack } from '../../common/CommonUtils';
import ShortLineTwo from '../../components/ShortLineTwo';
import { NativeModules } from 'react-native';
var EncryptionModule = NativeModules.EncryptionModule;
import BackPageComponent from '../../components/BackPageComponent';
import NavigationBar from '../../components/NavigationBar';
//import Loading from '../../components/Loading';
import Toast from 'react-native-root-toast';
import { connect } from 'react-redux';
import px2dp from '../../utils/px2dp';
import theme from '../../constants/theme';
import Loading from 'react-native-loading-w';
import Icon from 'react-native-vector-icons/Ionicons';
import { SERVER_LIST_ACTION } from '../../actions/Request';
import Util from '../../utils/Util';
import ItemListPage from './ItemListPage';
import Login from '../MoreTab/Login';
import { performSendItemAction, getServerList } from '../../actions/SendAction';
const dismissKeyboard = require('dismissKeyboard');
var verifyCode = '';
class SendItem extends BackPageComponent {
    constructor(props) {
        super(props);
        //this.buttonBackAction=this.buttonBackAction.bind(this);    
        this.buttonChangeState = this.buttonChangeState.bind(this);
        //this.registerAction = this.registerAction.bind(this);

        this.username = this.props.name;
        this.itemID = this.props.rowData.id ? this.props.rowData.id : '';
        this.itemCount = '';
        this.img = this.props.rowData.img ? this.props.rowData.img : '';
        this.itemName = this.props.rowData.name ? this.props.rowData.name : '';
        this.equipq = (this.props.rowData.likes && Boolean(parseInt(this.props.rowData.near))) ? this.props.rowData.likes : '';
        this.sendCount = '';

        this.state = {
            gameServer: this.props.selectServer,
            switchIsOn: this.props.rowData ? Boolean(parseInt(this.props.rowData.near)) : false,
            switchIsOn2: false,
            router: null,
        }

    }
    //返回
    //buttonBackAction(){
    //    const {navigator} = this.props;
    //    return NaviGoBack(navigator);
    //}
    buttonChangeState() {}


    render() {
        const {pageBackgroundColor, titleColor, subTitleColor, segmentColor, rowItemBackgroundColor, arrowColor, tabIconColor, mainThemeColor} = this.props;
        return (
            <View style={[styles.container, {
                backgroundColor: pageBackgroundColor
            }]}>
         <NavigationBar
            title="发送礼包"
            leftBtnIcon="arrow-back"
            leftBtnPress={this._handleBack.bind(this)}
            />
                <View style={{
                backgroundColor: /*'white'*/ rowItemBackgroundColor,
                marginTop: 13
            }}>
            
            <View style={{
                flexDirection: 'row',
                height: 45,
                alignItems: 'center',
            }}>
                        
              <Picker
              prompt='请选择服务器'
            mode={'dialog'}
            style={styles.input2}
            selectedValue={this.state.gameServer}
            onValueChange={(value) => this.setState({
                gameServer: value
            })}>
              {Object.keys(this.props.serverList).map((key, i) => this.renderPicker(key, i))}
              </Picker>
                    </View>
          <ShortLineTwo/>
          <View style={{
                flexDirection: 'row',
                height: 45,
                alignItems: 'center'
            }}>
              <TextInput
            style={{
                height: 40,
                marginLeft: 5,
                fontSize: 15,
                textAlign: 'left',
                textAlignVertical: 'center',
                flex: 1
            }}
            placeholder="请输入玩家账号"
            placeholderTextColor="#aaaaaa"
            underlineColorAndroid="transparent"
            numberOfLines={1}
            ref={'username'}
            multiline={true}
            onChangeText={(text) => {
                this.username = text;
            }}
            defaultValue={this.username}
            />
            <TouchableOpacity onPress={() => {
                this.buttonChangeState()
            }} style={{
                width: 45,
                height: 45,
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <View style={{
                marginLeft: 5,
                marginRight: 10
            }}>
              <Icon name="md-briefcase" color={arrowColor} size={px2dp(28)}/>
              </View>
                      </TouchableOpacity>
                    </View>
                    <ShortLineTwo/>
                    <View style={{
                flexDirection: 'row',
                height: 45,
                alignItems: 'center'
            }}>
                  <View style={{
                marginLeft: 10
            }}>
            {this.img ?
                <Image
            style={styles.icon}
            source={{uri: this.img}}
            />
                :
             <Image
            style={styles.icon}
            source={require('../../imgs/logo_og.png')}
            />
        }
                        </View>        
              <TextInput
            style={{
                height: 40,
                marginLeft: 5,
                fontSize: 15,
                textAlign: 'left',
                textAlignVertical: 'center',
                flex: 1
            }}
            placeholder="点击图标选择物品"
            placeholderTextColor="#aaaaaa"
            underlineColorAndroid="transparent"
            numberOfLines={1}
            ref={'itemName'}
            editable={true}
            multiline={true}
            onChangeText={(text) => {
                this.itemName = text;

            }}
            defaultValue={this.itemName}
            />
                          <TouchableOpacity onPress={this._itemClickCallback.bind(this, 0)} style={{
                width: 45,
                height: 45,
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <View style={{
                marginLeft: 5,
                marginRight: 10
            }}>
              <Icon name="md-add-circle" color={arrowColor} size={px2dp(28)}/>
              </View>
                          </TouchableOpacity>
                    </View>
          <ShortLineTwo/>
          <View style={{
                flexDirection: 'row',
                height: 45,
                alignItems: 'center'
            }}>
                          
              <TextInput
            style={{
                height: 40,
                marginLeft: 5,
                fontSize: 15,
                textAlign: 'left',
                textAlignVertical: 'center',
                flex: 1
            }}
            placeholder="物品ID"
            placeholderTextColor="#aaaaaa"
            underlineColorAndroid="transparent"
            numberOfLines={1}
            ref={'itemID'}
            multiline={true}
            keyboardType={'numeric'}
            onChangeText={(text) => {
                this.itemID = text;
            //this.setState({itemID:text})
            }}
            defaultValue={this.itemID}
            />
                    </View>
                    <ShortLineTwo/>
          <View style={{
                flexDirection: 'row',
                height: 45,
                alignItems: 'center'
            }}>
              <TextInput
            style={{
                height: 40,
                marginLeft: 5,
                fontSize: 15,
                textAlign: 'left',
                textAlignVertical: 'center',
                flex: 1
            }}
            placeholder="请输入物品数量"
            placeholderTextColor="#aaaaaa"
            underlineColorAndroid="transparent"
            numberOfLines={1}
            ref={'itemCount'}
            multiline={true}
            keyboardType={'numeric'}
            onChangeText={(text) => {
                this.itemCount = text;
            }}
            />
                    </View>
          <ShortLineTwo/>
          <View style={{
                flexDirection: 'row',
                height: 45,
                alignItems: 'center'
            }}>
          
          <Text style={{
                height: 40,
                marginLeft: 8,
                fontSize: 15,
                textAlign: 'left',
                textAlignVertical: 'center',
                flex: 1
            }}>是否发送装备</Text>
          <Switch
            ref={'switchIsOn'}
            onValueChange={(value) => {
                this.setState({
                    switchIsOn: value
                })
            }}
            onTintColor={mainThemeColor}
            style={{
                marginLeft: 5,
                marginRight: 5
            }}
            value={this.state.switchIsOn}/>
          </View>
          <ShortLineTwo/>
          <View style={{
                flexDirection: 'row',
                height: 45,
                alignItems: 'center'
            }}>
              <TextInput
            style={{
                height: 40,
                marginLeft: 5,
                fontSize: 15,
                textAlign: 'left',
                textAlignVertical: 'center',
                flex: 1
            }}
            placeholder="请输入装备品级（0-6）"
            placeholderTextColor="#aaaaaa"
            underlineColorAndroid="transparent"
            numberOfLines={1}
            ref={'equipq'}
            multiline={true}
            keyboardType={'numeric'}
            onChangeText={(text) => {
                this.equipq = text;
            }}
            defaultValue={this.equipq}
            />
                    </View>
          <ShortLineTwo/>
          <View style={{
                flexDirection: 'row',
                height: 45,
                alignItems: 'center'
            }}>
          
          <Text style={{
                height: 40,
                marginLeft: 8,
                fontSize: 15,
                textAlign: 'left',
                textAlignVertical: 'center',
                flex: 1
            }}>是否批量发送</Text>
          <Switch
            ref={'switchIsOn2'}
            onValueChange={(value) => this.setState({
                switchIsOn2: value
            })}
            onTintColor={mainThemeColor}
            style={{
                marginLeft: 5,
                marginRight: 5
            }}
            value={this.state.switchIsOn2}/>
          </View>
          <ShortLineTwo/>
          <View style={{
                flexDirection: 'row',
                height: 45,
                alignItems: 'center'
            }}>
              <TextInput
            style={{
                height: 40,
                marginLeft: 5,
                fontSize: 15,
                textAlign: 'left',
                textAlignVertical: 'center',
                flex: 1
            }}
            placeholder="发送次数"
            placeholderTextColor="#aaaaaa"
            underlineColorAndroid="transparent"
            numberOfLines={1}
            ref={'sendCount'}
            multiline={true}
            keyboardType={'numeric'}
            onChangeText={(text) => {
                this.sendCount = text;
            }}
            />
                    </View>
            </View>        
                <TouchableOpacity onPress={
            this.sendItemAction.bind(this)
            }
            style={{
                justifyContent: 'center',
                marginTop: 13,
                alignItems: 'center'
            }}
            disabled={this.props.loading}>
                 
          <View style={{
                width: 300,
                height: 40,
                backgroundColor: mainThemeColor, //'#3b3738',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
            {this.props.loading ? 
                            <Text style={{
                color: 'white'
            }}> 正在发送 </Text>
            :
            <Text style={{
                color: 'white'
            }}> 发送 </Text>
        }  
          </View> 
                </TouchableOpacity>
                
                
                <Loading ref={'loading'} text={'发送中...'} />
             </View>
        );
    }

    //当props发生变化时执行
    componentWillReceiveProps(nextProps) {
        if(nextProps.isSelectSend){
            this.itemID = nextProps.rowData.id;
            const isEq = Boolean(parseInt(nextProps.rowData.near));
            this.setState({
                switchIsOn: isEq
            });
            this.equipq = isEq ? nextProps.rowData.likes : '';
            this.itemName = nextProps.rowData.name;
            this.img = nextProps.rowData.img;
        }
    //this.setState({
    // itemID: nextProps.rowData > this.props.likeCount.rowData
    //});
    }

    componentDidMount() {
        super.componentDidMount();
        const {dispatch} = this.props;
        InteractionManager.runAfterInteractions(() => {
            if(this.props.isGetServerList === false)dispatch(getServerList(this.props.fetchkey, this.props.gameDataVersion));
        });
    }
    _itemClickCallback(id) {
        switch (id) {
        case 0:
            (this.props.isLogin) ? this._switchPage(ItemListPage) : this._switchPage(Login)
            
            dismissKeyboard(); //隐藏键盘
            break;
        case 1:
            break;
        }
    }
    _switchPage(component) {
        this.props.navigator.push({
            component: component
        });
    }
    //获取加载进度组件
    getLoading() {
        return this.refs['loading'];
    }

    sendItemAction() {
        const {dispatch} = this.props;

        dismissKeyboard(); //隐藏键盘
        if (this.state.gameServer === '') {
            (Platform.OS === 'android') ? ToastAndroid.show('请选择服务器...', ToastAndroid.SHORT) : '';
            return;
        }
        //
        if (this.username === '') {
            (Platform.OS === 'android') ? ToastAndroid.show('账号不能为空...', ToastAndroid.SHORT) : '';
            return;
        }
        if (this.itemID === '' || !Util.validate(this.itemID)) {
            (Platform.OS === 'android') ? ToastAndroid.show('物品ID输入错误...', ToastAndroid.SHORT) : '';
            return;
        }
        if (this.itemCount === '' || !Util.validate(this.itemCount)) {
            (Platform.OS === 'android') ? ToastAndroid.show('物品数量输入错误...', ToastAndroid.SHORT) : '';
            return;
        }
        if (this.state.switchIsOn) {
            if (this.equipq === '' || !Util.validate(this.equipq)) {
                (Platform.OS === 'android') ? ToastAndroid.show('装备品级输入错误...', ToastAndroid.SHORT) : '';
                return;
            }
        }
        if (this.state.switchIsOn2) {
            if (this.sendCount === '' || !Util.validate(this.sendCount)) {
                (Platform.OS === 'android') ? ToastAndroid.show('发送次数输入错误...', ToastAndroid.SHORT) : '';
                return;
            }
        }
        dispatch(performSendItemAction(this, this.props.fetchkey, this.props.gameDataVersion, this.state.gameServer, this.username, this.itemID, this.itemName, this.itemCount, this.state.switchIsOn, this.equipq, this.state.switchIsOn2, this.sendCount));
    }

    renderPicker(key, i) {
        return <Picker.Item key={i} label={this.props.serverList[key]} value={key} />
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
    input2: {
        height: 35,
        flex: 1,
        marginLeft: 5,
    },
    label: {
        width: 70,
        fontSize: 16,
        marginLeft: 5,
        //  textAlign:'center',
        color: 'black'
    },
    icon: {
      width: px2dp(42),
      height: px2dp(42),
    }
});
const mapStateToProps = (state) => {
    return {
        isGetServerList: state.sendState.isGetServerList,
        serverList: state.sendState.serverList,
        loading: state.sendState.loading,
        selectServer: state.sendState.selectServer,
        name: state.sendState.name,
        isSelectSend: state.itemDataState.isSelectSend,
        rowData: state.itemDataState.rowData,
        gameDataVersion: state.settingState.gameDataVersion,
        isLogin: state.loginState.isLogin,
        fetchkey: state.loginState.key,
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

export default connect(mapStateToProps)(SendItem);
