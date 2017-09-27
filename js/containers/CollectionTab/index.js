/**
 * Created by wangdi on 23/11/16.
 */
'use strict';

import React, {Component} from 'react';
import {connect} from 'react-redux';
import {View, Text, ScrollView} from 'react-native';
import theme from '../../constants/theme';
import NavigationBar from '../../components/NavigationBar';
import ListViewForCollection from '../../components/ListViewForCollection';
import RCTDeviceEventEmitter from 'RCTDeviceEventEmitter';

class CollectionFragment extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <View style={{flex: 1, backgroundColor: this.props.pageBackgroundColor}}>
                <NavigationBar title="收藏"/>
                {this.props.dataSource.length > 0 ?
                    <ScrollView>
                        <ListViewForCollection
                            dataSource={this.props.dataSource}
                            navigator={this.props.navigator}
                        />
                    </ScrollView>
                    :
                    <View style={{flex: 1, justifyContent:'center', alignItems: 'center'}}>
                        <Text style={{color: this.props.subTitleColor}}>还没有任何收藏数据～</Text>
                    </View>
                }
            </View>
        );
    }

    componentDidMount(){
        RCTDeviceEventEmitter.addListener('refresh', this._refreshWholeDOM.bind(this));
    }

    componentWillUnmount(){
        RCTDeviceEventEmitter.removeListener('refresh', this._refreshWholeDOM.bind(this));
    }

    _refreshWholeDOM(){
        this.forceUpdate();
    }
}

const mapStateToProps = (state) => {
    return {
        dataSource: state.favorDataState.dataSource,
        pageBackgroundColor: state.settingState.colorScheme.pageBackgroundColor,
        subTitleColor: state.settingState.colorScheme.subTitleColor,
    };
};

export default connect(mapStateToProps)(CollectionFragment);