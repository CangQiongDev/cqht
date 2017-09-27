/**
 * Created by spm on 14/07/17.
 */
'use strict';

import React, {Component, PropTypes} from 'react';
import {StyleSheet, View, Text, Image, ListView, Platform, ActivityIndicator, TouchableNativeFeedback, TouchableHighlight, ToastAndroid} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {connect} from 'react-redux';
import theme from '../constants/theme';
import px2dp from '../utils/px2dp';
import WebViewPage from '../containers/WebViewPage';
import getCorrectImageSizeUrl from '../utils/imageFactory';
import Footer from './ListViewFooter';
import Util from '../utils/Util';
import ScrollTopView from 'react-native-scrolltotop';
import { SwipeListView } from 'react-native-swipe-list-view';
import RCTDeviceEventEmitter from 'RCTDeviceEventEmitter';
import { ActionSheetCustom as ActionSheet } from 'react-native-actionsheet';
import {selectRowData} from '../actions/requestItemData';
const CANCEL_INDEX = 0
const DESTRUCTIVE_INDEX = 2
const options = ['取消', '', '']
const title = '请选择物品'
class ListViewForItemInfo extends Component{
    constructor(props){
        super(props);
		this.state = {
			isShowToTop: false,
		};
        this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
       //this._swipeListViewRef = "listview";
    }

    static propTypes = {
        dataSource: PropTypes.array,
        isRenderFooter: PropTypes.bool,
        onEndReached: PropTypes.func,
        isFullData: PropTypes.bool,
        isOpenThumbnail: PropTypes.bool,
        onSelect: PropTypes.func,
        selectTitle: PropTypes.string
    };

    render(){

        return(
		<View>
            <ListView
				ref={"listview"}
                dataSource={this.ds.cloneWithRows(this.props.dataSource)}
                renderRow={this._renderRow.bind(this)}
                renderSeparator={this._renderSeparator.bind(this)}
                renderFooter={this._renderFooter.bind(this)}
                initialListSize={10}
                pageSize={10}
                onEndReached={this.props.onEndReached}
                onEndReachedThreshold={10}
				onScroll={(e)=>this._onScroll(e)}
            />
            <ActionSheet
                    ref={o => this.ActionSheet = o}
                    title={this.props.selectTitle}
                    options={[
                        <Text style={{
                            color: '#007aff',
                            fontSize: px2dp(16)
                        }}>取消</Text>,
                        <Text style={{
                            color: 'red',
                            fontSize: px2dp(16)
                        }}>选择发送</Text>,
                        <Text style={{
                            color: '#007aff',
                            fontSize: px2dp(16)
                        }}>查看详情</Text>
                    ]}
                    cancelButtonIndex={CANCEL_INDEX}
                    destructiveButtonIndex={DESTRUCTIVE_INDEX}
                    onPress={this.props.onSelect /*this._handlePress.bind(this)*/}
                    />
            {/*<SwipeListView
                    listViewRef={ ref => this._swipeListViewRef = ref  }
                    enableEmptySections={true}
                    dataSource={this.ds.cloneWithRows(this.props.dataSource)}
                    renderHiddenRow={this._renderHiddenRow.bind(this)}
                    renderRow={this._renderRow.bind(this)}
                    renderSeparator={this._renderSeparator.bind(this)}
                    rightOpenValue={-150}
                    friction={10}
                    tension={100}
                    renderFooter={this._renderFooter.bind(this)}
                    initialListSize={10}
                    pageSize={10}
                    onEndReached={this.props.onEndReached}
                    onEndReachedThreshold={10}
                    onScroll={(e)=>this._onScroll(e)}
            />*/}
			{this.state.isShowToTop?<ScrollTopView root={this} ></ScrollTopView>:null}
		</View>	
        );
    }
	_onScroll(e) {
		var offsetY = e.nativeEvent.contentOffset.y;

		if(offsetY > 100) {
			this.setState({
				isShowToTop: true
			})
		} else {
			this.setState({
				isShowToTop: false
			})
		}
	}

    _renderHiddenRow(rowData, sectionID, rowID, rowMap){
        return(
            <View style={[styles.rowBack, {backgroundColor: this.props.rowItemBackgroundColor}]}>
                <TouchableHighlight
                    onPress={this._itemSelectOnPress.bind(this, rowData)}
                    underlayColor={theme.touchableHighlightUnderlayColor}>
                    <View style={[styles.removeBtn, styles.backRightBtnLeft]}>
                        <Text style={styles.removeBtnLabel}>选择</Text>
                    </View>
                </TouchableHighlight>
                <TouchableHighlight
                    onPress={this._itemSelectOnPress.bind(this, rowData)}
                    underlayColor={theme.touchableHighlightUnderlayColor}>
                    <View style={[styles.removeBtn, styles.backRightBtnRight]}>
                        <Text style={styles.removeBtnLabel}>取消推荐</Text>
                    </View>
                </TouchableHighlight>
                          
            </View>
        );
    }

    _itemSelectOnPress(rowData){
         RCTDeviceEventEmitter.emit('refresh'); //must refresh dom
    }

    _renderFooter(){
        const {isRenderFooter, tabIconColor, isFullData} = this.props;
        return(
            <Footer indicatorColor={tabIconColor} isFullData={isFullData} isRenderFooter={isRenderFooter}/>
        );
    }

    _renderRow(rowData, sectionID, rowID, highlightRow){
        if(Platform.OS === 'android') {
            return(
                    <TouchableNativeFeedback
                        overflow="hidden"
                        key={rowID}
                        onPress={this._itemOnPress.bind(this, rowData)}>
                        {this._renderRowContent(rowData)}
                    </TouchableNativeFeedback>
            );
        }else if(Platform.OS === 'ios'){
            return(
                <TouchableHighlight
                    overflow="hidden"
                    key={rowID}
                    onPress={this._itemOnPress.bind(this, rowData)}
                    underlayColor={theme.touchableHighlightUnderlayColor}>
                    {this._renderRowContent(rowData)}
                </TouchableHighlight>
            );
        }
    }

    _renderRowContent(rowData){
        const {titleColor, subTitleColor, rowItemBackgroundColor, thumbnailColor} = this.props;
        return(
            <View style={[styles.itemContainer, {backgroundColor: rowItemBackgroundColor}]}>
                <View style={styles.imgPart}>
                    {(rowData.img && this.props.isOpenThumbnail) ?
                        <Image style={styles.image} source={{uri: rowData.img}} />
                        :
                        <Image style={[styles.image, {backgroundColor: thumbnailColor}]} source={require('../assets/user_article_no_data.png')}/>
                    }
                </View>
                <View style={styles.txtPart}>
                    <View style={styles.titlePart}>
                        <Text style={[styles.title, {color: titleColor}]} numberOfLines={1}>{rowData.name}</Text>
                    </View>
					<View style={styles.titlePart}>
                        <Text style={[styles.desc, {color: '#666'}]} numberOfLines={1}>{Util.strReplace(rowData.street_addr)}</Text>
                    </View>
                    <View style={styles.infoPart}>
                        {/*<Icon name="ios-pricetag-outline" color={subTitleColor}/>*/}
						<Text style={[styles.labelTitle, {color: 'red'}]}>品级</Text>
                        <Text style={[styles.detailsLabel, {color: subTitleColor}]}>{rowData.likes}</Text>
                        {/*<Icon name="ios-create-outline" color={subTitleColor}/>*/}
                        <Text style={[styles.labelTitle, {color: subTitleColor}]}>是否绑定</Text>
						<Text style={[styles.detailsLabel, {color: subTitleColor}]}>{rowData.comments ? rowData.comments : 'null'}</Text>
                        {/*<Icon name="ios-time-outline" color={subTitleColor}/>*/}
                        <Text style={[styles.labelTitle, {color: subTitleColor}]}>最大堆叠</Text>
						<Text style={[styles.detailsLabel, {color: subTitleColor}]}>{this._handleCreateTime(rowData.cost)}</Text>
                    </View>
                </View>
				
            </View>
        );
    }

    _renderSeparator(sectionID, rowID, adjacentRowHighlighted){
        return(
            <View key={rowID} style={{height: theme.segment.width, backgroundColor: this.props.segmentColor}}/>
        );
    }

    _handleCreateTime(time){
        return time.substring(0, 10);
    }

    _itemOnPress(rowData){
        /*this.props.navigator.push({
            component: WebViewPage,
            args: {rowData: rowData}
        });*/
        //这里搞个全局传值
        //this.props.actions.selectRowData(rowData);
        this.props.dispatch(selectRowData(rowData));
        this.ActionSheet.show();
    }s
}

const styles = StyleSheet.create({
    itemContainer: {
        flexDirection: 'row',
        width: theme.screenWidth,
        height: px2dp(75)
    },
    imgPart: {
        flex: 20,
        alignItems: 'center',
        justifyContent: 'center'
    },
    image: {
        width: px2dp(52),
        height: px2dp(52),
        resizeMode: 'cover'
    },
    txtPart: {
        flex: 80,
        paddingTop: px2dp(10),
        paddingRight: px2dp(10),
        paddingBottom: px2dp(10)
    },
    titlePart: {
        flex: 70,
    },
    infoPart: {
        flex: 30,
        flexDirection: 'row',
        alignItems: 'center'
    },
    title: {
		fontSize: px2dp(15)
    },
	desc: {
		fontSize: px2dp(13)
    },
    detailsLabel: {
        marginLeft: px2dp(3),
        marginRight: px2dp(13),
        fontSize: px2dp(10)
    },
    footer: {
        flexDirection: 'row',
        width: theme.screenWidth,
        height: px2dp(60),
        alignItems: 'center',
        justifyContent: 'center',
    },
	labelTitle: {
		fontSize: px2dp(10)
	},
    rowBack: {
        flex: 1,
        flexDirection: 'row-reverse',
        alignItems: 'center'
    },
    removeBtn: {
        height: px2dp(75),
        width: px2dp(75),
        //backgroundColor: 'blue',
        alignItems: 'center',
        justifyContent: 'center',

    },
    removeBtnLabel:{
        color: '#fff',
        fontSize: px2dp(16)
    },
    backRightBtnLeft: {
        backgroundColor: '#3c9df9',
        //right: 75
    },
    backRightBtnRight: {
        backgroundColor: 'orangered',
        //right: 0
    },
    leftSwipeItem: {
      flex: 1,
      alignItems: 'flex-end',
      justifyContent: 'center',
      paddingRight: 20
    },
    rightSwipeItem: {
      flex: 1,
      justifyContent: 'center',
      paddingLeft: 20
    },
});

const mapStateToProps = (state) => {
    return {
        mainThemeColor: state.settingState.colorScheme.mainThemeColor,
        segmentColor: state.settingState.colorScheme.segmentColor,
        titleColor: state.settingState.colorScheme.titleColor,
        subTitleColor: state.settingState.colorScheme.subTitleColor,
        rowItemBackgroundColor: state.settingState.colorScheme.rowItemBackgroundColor,
        thumbnailColor: state.settingState.colorScheme.thumbnailColor,
        tabIconColor: state.settingState.colorScheme.tabIconColor
    };
};

export default connect(mapStateToProps)(ListViewForItemInfo);