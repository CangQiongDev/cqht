/**
 * Created by wangdi on 2/12/16.
 */
'use strict';

import React, {Component, PropTypes} from 'react';
import {StyleSheet, View, Text, ListView, PixelRatio, Platform, TouchableNativeFeedback, TouchableHighlight, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import px2dp from '../utils/px2dp';
import theme from '../constants/theme';
import Icon from 'react-native-vector-icons/Ionicons';
import {store} from '../store/index';
import {getSearchValue} from '../actions/SearchAction';
import RCTDeviceEventEmitter from 'RCTDeviceEventEmitter';

class ListViewForSearchLog extends Component{
    static propTypes = {
        dataSource: PropTypes.array,
        onPress: PropTypes.func
    };

    constructor(props){
        super(props);
        this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    }

    render(){
        return(
            <View style={styles.container}>
                <ListView
                    keyboardShouldPersistTaps={"always"}
                    enableEmptySections={true}
                    dataSource={this.ds.cloneWithRows(this.props.dataSource)}
                    renderRow={this._renderRow.bind(this)}
                    renderSeparator={this._renderSeparator.bind(this)}
                    initialListSize={10}
                    pageSize={20}
                />
            </View>
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
        const {titleColor, subTitleColor, rowItemBackgroundColor} = this.props;
        return(
            <View style={[styles.rowItem, {backgroundColor: rowItemBackgroundColor}]}>
                <View style={styles.titlePart}>
					
                    <Text style={[styles.title, {color: titleColor}]} numberOfLines={1}><Icon name="ios-time-outline" size={px2dp(16)} color="#666"/>   {rowData.desc}</Text>
                </View>
                
            </View>
        );
    }

    _renderSeparator(sectionID, rowID, adjacentRowHighlighted){
        return(
            <View key={rowID} style={{backgroundColor: this.props.segmentColor, height: theme.segment.width}}/>
        );
    }

    _itemOnPress(rowData){
       if(rowData && rowData.desc){
           //store.dispatch(getSearchValue(rowData.desc));
           this.props.onPress(rowData.desc);
       }
    }

    _itemRemoveOnPress(rowData){
        //store.dispatch(unStarData(rowData));
        RCTDeviceEventEmitter.emit('refresh'); //must refresh dom
    }

    _handleCreateTime(time){
        return time.substring(0, 10);
    }
}

const styles = StyleSheet.create({
    container: {

    },
    rowItem: {
        height: px2dp(40),
        padding: px2dp(10),
        flexDirection: 'row',
        alignItems: 'center'
    },
    titlePart: {
        flex: 70,

    },
    titleRight: {
        marginRight: px2dp(5),
    },
    infoPart: {
        flex: 30,
        flexDirection: 'row',
        alignItems: 'center'
    },
    title: {
		fontSize: px2dp(16)
    },
    detailsLabel: {
        marginLeft: px2dp(3),
        marginRight: px2dp(13),
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
        backgroundColor: 'orangered',
        alignItems: 'center',
        justifyContent: 'center'
    },
    removeBtnLabel:{
        color: '#fff',
        fontSize: px2dp(16)
    }
});

const mapStateToProps = (state) => {
    return {
        segmentColor: state.settingState.colorScheme.segmentColor,
        titleColor: state.settingState.colorScheme.titleColor,
        subTitleColor: state.settingState.colorScheme.subTitleColor,
        rowItemBackgroundColor: state.settingState.colorScheme.rowItemBackgroundColor
    };
};

export default connect(mapStateToProps)(ListViewForSearchLog);