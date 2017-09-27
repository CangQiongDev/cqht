'use strict';
import React, {Component} from 'react';
import{ 
    View,
    Text,
    BackAndroid,
    TouchableOpacity,
    Image,
    StyleSheet,
    InteractionManager,
    TextInput,
} from 'react-native';

//import { NaviGoBack } from '../../common/CommonUtils';
import ShortLineTwo from '../../components/ShortLineTwo';
import BackPageComponent from '../../components/BackPageComponent';
import NavigationBar from '../../components/NavigationBar';
import {connect} from 'react-redux';
import px2dp from '../../utils/px2dp';
//import Loading from 'react-native-loading-w';
import Icon from 'react-native-vector-icons/Ionicons';
var username = '';
var password = '';
var repassword = '';
var verifyCode = '';
class ResetPwd extends BackPageComponent {
  constructor(props) {
      super(props);
      //this.buttonBackAction=this.buttonBackAction.bind(this);    
      this.queryVerifyCode=this.queryVerifyCode.bind(this);
      this.resetSuccesAction=this.resetSuccesAction.bind(this);
      this.buttonChangeState=this.buttonChangeState.bind(this);
}
  //返回
  //buttonBackAction(){
  //    const {navigator} = this.props;
  //    return NaviGoBack(navigator);
  //}
  buttonChangeState(position){

  }
  queryVerifyCode(){
      
  }
  resetSuccesAction(){

  }
  render() {
		const {pageBackgroundColor, titleColor, subTitleColor, segmentColor, rowItemBackgroundColor, arrowColor, tabIconColor, mainThemeColor} = this.props;
        return (
             <View style={[styles.container, {backgroundColor: pageBackgroundColor}]}>
				<NavigationBar
                    title="重置密码"
                    leftBtnIcon="arrow-back"
                    leftBtnPress={this._handleBack.bind(this)}
                />
                <View style={{backgroundColor:'white',marginTop:13}}>
                    <View style={{flexDirection:'row',height:45,alignItems:'center'}}>
                          <TextInput 
                            style={{height:40,fontSize: 15,textAlign: 'left',textAlignVertical:'center',flex:1}}
                            placeholder="请输入手机号码"
                            placeholderTextColor="#aaaaaa"
                            underlineColorAndroid="transparent"
                            numberOfLines={1}
                            ref={'username'}
                            multiline={true}
                            autoFocus={true}
                            onChangeText={(text) => {
                               username = text;
                            }}
                      />
                    </View>
                    <ShortLineTwo/>
                    <View style={{flexDirection:'row',height:45,alignItems:'center'}}>
                          <TextInput 
                            style={{height:40,fontSize: 15,textAlign: 'left',textAlignVertical:'center',flex:1}}
                            placeholder="请输入验证码"
                            placeholderTextColor="#aaaaaa"
                            underlineColorAndroid="transparent"
                            numberOfLines={1}
                            ref={'verifyCode'}
                            multiline={true}
                            onChangeText={(text) => {
                               verifyCode = text;
                            }}
                           />
                          <TouchableOpacity onPress={() => {this.queryVerifyCode()}} 
                                            style={{width:100,height:45,alignItems:'center',justifyContent:'center'}}>
                                <Text style={{fontSize:13,color:'#777'}}>获取验证码</Text>
                          </TouchableOpacity>
                    </View>
                    <ShortLineTwo/>
                    <View style={{flexDirection:'row',height:45,alignItems:'center'}}>
                          <TextInput 
                            style={{height:40,fontSize: 15,textAlign: 'left',textAlignVertical:'center',flex:1}}
                            placeholder="请输入密码(6位以上字符)"
                            placeholderTextColor="#aaaaaa"
                            underlineColorAndroid="transparent"
                            numberOfLines={1}
                            ref={'password'}
                            multiline={true}
							secureTextEntry={true}
                            onChangeText={(text) => {
                               password = text;
                            }}
                           />
                          <TouchableOpacity onPress={() => {this.buttonChangeState(0)}} style={{width:45,height:45,alignItems:'center',justifyContent:'center'}}>
                                {/*<Image source={require('../../imgs/logre/ic_pwd_off.png')} 
							  style={{width:17,height:14,marginLeft:13}}/>*/}
							  <View style={{marginLeft: 13}}>
							<Icon name="md-eye-off" color={arrowColor} size={px2dp(22)}/>
							</View>
                          </TouchableOpacity>
                    </View>
                    <ShortLineTwo/>
                    <View style={{flexDirection:'row',height:45,alignItems:'center'}}>
                          <TextInput 
                            style={{height:40,fontSize: 15,textAlign: 'left',textAlignVertical:'center',flex:1}}
                            placeholder="请再输入一遍密码"
                            placeholderTextColor="#aaaaaa"
                            underlineColorAndroid="transparent"
                            numberOfLines={1}
                            ref={'repassword'}
                            multiline={true}
							secureTextEntry={true}
                            onChangeText={(text) => {
                               repassword = text;
                            }}
                           />
                          <TouchableOpacity onPress={() => {this.buttonChangeState(1)}} style={{width:45,height:45,alignItems:'center',justifyContent:'center'}}>
							  {/*<Image source={require('../../imgs/logre/ic_pwd_off.png')} 
							  style={{width:17,height:14,marginLeft:13}}/>*/}
							  <View style={{marginLeft: 13}}>
							<Icon name="md-eye-off" color={arrowColor} size={px2dp(22)}/>
							</View>
                          </TouchableOpacity>
                    </View>
                </View>
                <TouchableOpacity onPress={() => {this.resetSuccesAction()}} 
                                  style={{justifyContent:'center',marginTop:13,alignItems:'center'}}>
									  {/*<Image source={require('../../imgs/logre/ic_login_btn.png')} 
                           style={{width:300,height:40,justifyContent:'center',alignItems:'center'}}>
                          <Text style={{color:'white'}}>完成</Text>
									  </Image>*/}
					<View style={{
                        width: 300,
                        height: 40,
                        backgroundColor: mainThemeColor,//'#3b3738',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <Text style={{color: 'white'}}>完成</Text>	
					</View>			
                </TouchableOpacity>
             </View>
        );
    }
}
const styles=StyleSheet.create({
    item_layout:{
        backgroundColor:'white',
        height:45,
        justifyContent:'center'
    }
});

const mapStateToProps = (state) => {
    return {
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

export default connect(mapStateToProps)(ResetPwd);
