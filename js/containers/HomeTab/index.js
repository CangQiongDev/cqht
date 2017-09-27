/**
 * Created by wangdi on 23/11/16.
 */
'use strict';

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import * as Actions from '../../actions/requestHomeData';
import { StyleSheet, View, Text, ScrollView, Animated, Image, RefreshControl, ListView, TouchableOpacity, Alert } from 'react-native';
import theme from '../../constants/theme';
import px2dp from '../../utils/px2dp';
import NavigationBar from '../../components/NavigationBar';
import { getCurrentDate } from '../../utils/getDate';
import * as Info from '../../utils/handleHomeDataSource';
import ListViewForHome from '../../components/ListViewForHome';
import colors from '../../constants/colors';
import HomePageItem from '../../components/HomePageItem';
import ShortLine from '../../components/ShortLine';
import WebViewPage from '../../containers/WebViewPage';
import RCTDeviceEventEmitter from 'RCTDeviceEventEmitter';
import Swiper from 'react-native-swiper';
import SendItem from './SendItem';
import Login from '../MoreTab/Login';
const BANNER_IMGS = [require('../../imgs/home/1.jpg'), require('../../imgs/home/2.png'), require('../../imgs/home/3.jpg'), require('../../imgs/home/4.png')];
const CENTER_IMGS = [
    require('../../imgs/home/img_1.png'),
    require('../../imgs/home/img_2.png'),
    require('../../imgs/home/img_6.png'),
    require('../../imgs/home/img_3.png'),
    require('../../imgs/home/img_5.png'),
    require('../../imgs/home/img_4.png')
];
class HomeFragment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            opacity: new Animated.Value(0),
        };
        this.imageHeight = px2dp(220); //px2dp(400);
        this.cqhjgw = '{"desc":"《苍穹猎灵》-怀旧版","url":"http://sm.1ksm.com"}';
        this.cqslgw = '{"desc":"《苍穹猎灵》-圣灵版","url":"http://ll.1ksm.com"}';
    }
    _switchPage(component) {
        this.props.navigator.push({
            component: component
        });
    }
    centerItemAction(position) {
        if (position === 0) {
            (this.props.isLogin) ? this._switchPage(SendItem) : this._switchPage(Login)
        } else if (position === 1) {
            Alert.alert('提示', '平台数据')
        } else if (position === 2) {
            Alert.alert('提示', '邀请有礼')
        } else if (position === 3) {
            Alert.alert('提示', '敬请期待')
        }
    }
    render() {
        const {dataSource, mainThemeColor, pageBackgroundColor, rowItemBackgroundColor, segmentColor} = this.props;
        return (
            <View style={[styles.container, {
                backgroundColor: pageBackgroundColor
            }]}>
                <Animated.View style={[styles.toolbar, {
                opacity: this.state.opacity
            }]}>
                    <NavigationBar title="后台管理"/>
                </Animated.View>
                <ScrollView
            scrollEnabled={this.state.scrollEnabled}
            onScroll={this._onScroll.bind(this)}
            refreshControl={
            <RefreshControl
            refreshing={this.props.loading}
            onRefresh={this._onPress.bind(this, 0)}
            tintColor={mainThemeColor}
            colors={[mainThemeColor]}
            title="拼命加载中..."
            />}
            >
                <View style={{
                height: this.imageHeight,
                width: theme.screenWidth
            }}>
                         { /*<ImageView
                             imgUrl={Info.getFuLiUrl(dataSource)}
                labelTime={this.props.dataTime}/>*/ }
                <Swiper
            height={px2dp(160)}
            autoplay={true}
            autoplayTimeout={3}
            bounces={true}
            dot={< View style = {
            styles.customDot
            } />}
            activeDot={< View style = {
            styles.customActiveDot
            } />}
            paginationStyle={{
                bottom: px2dp(10)
            }}>
                    <View style={styles.slide}>
                        <Image style={styles.slideImage} source={BANNER_IMGS[0]} resizeMode="stretch"/>
                    </View>
                    <View style={styles.slide}>
                        <Image style={styles.slideImage} source={BANNER_IMGS[1]} resizeMode="stretch"/>
                    </View>
                    <View style={styles.slide}>
                        <Image style={styles.slideImage} source={BANNER_IMGS[2]} resizeMode="stretch"/>
                    </View>
                    <View style={styles.slide}>
                        <Image style={styles.slideImage} source={BANNER_IMGS[3]} resizeMode="stretch"/>
                    </View>
                </Swiper>
                
                <View
            style={{
                paddingTop: 10,
                height: 60,
                flexDirection: 'row',
                backgroundColor: rowItemBackgroundColor //'#ffffff'
            }}>
                <TouchableOpacity onPress={this._itemOnPress.bind(this, JSON.parse(this.cqhjgw))} activeOpacity={theme.touchableOpacityActiveOpacity}>
                    <View
            style={{
                width: (theme.screenWidth - 1) / 2,
                alignItems: 'center'
            }}>
                        <Text
            style={{
                fontSize: 16,
                fontWeight: 'bold'
            }}>怀旧版官网</Text>
                        <Text
            style={{
                fontSize: 12,
                color: '#cacaca',
                marginTop: 5
            }}>点击进入</Text>
                    </View>
                </TouchableOpacity> 
                    <Image
            source={require('../../imgs/home/ic_home_shu.png')}
            style={{
                height: 40
            }}/>
                <TouchableOpacity onPress={this._itemOnPress.bind(this, JSON.parse(this.cqslgw))} activeOpacity={theme.touchableOpacityActiveOpacity}>
                    <View
            style={{
                width: (theme.screenWidth - 1) / 2,
                alignItems: 'center'
            }}>
                        <Text
            style={{
                fontSize: 16,
                fontWeight: 'bold'
            }}>圣灵版官网</Text>
                        <Text
            style={{
                fontSize: 12,
                color: '#cacaca',
                marginTop: 5
            }}>点击进入</Text>
                    </View>
                </TouchableOpacity>
                </View>
            </View>        
            <View
            style={{
                marginTop: 8,
                backgroundColor: rowItemBackgroundColor
            //backgroundColor: 'white'
            }}>
                <View
            style={{
                flexDirection: 'row',
            }}>
                    
                    <HomePageItem
            title="发送礼包"
            content="发送物品装备"
            icon={CENTER_IMGS[0]}
            onPress={() => {
                this.centerItemAction(0)
            }}/>
                    <Image
            source={require('../../imgs/home/ic_home_shu.png')}
            style={{
                height: 80
            }}/>
                    <HomePageItem
            title="角色数据"
            content="查询角色相关数据"
            icon={CENTER_IMGS[1]}
            onPress={() => {
                this.centerItemAction(1)
            }}/>
                </View>
                <ShortLine/>
                <View
            style={{
                flexDirection: 'row'
            }}>
                    <HomePageItem
            title="查询账号"
            content="玩家注册时间邮箱等"
            icon={CENTER_IMGS[2]}
            onPress={() => {
                this.centerItemAction(3)
            }}/>
                    <Image
            source={require('../../imgs/home/ic_home_shu.png')}
            style={{
                height: 80
            }}/>
                    <HomePageItem
            title="黑名单"
            content="MAC及IP黑名单"
            icon={CENTER_IMGS[3]}
            onPress={() => {
                this.centerItemAction(2)
            }}/>

                </View>
                <ShortLine/>
                <View
            style={{
                flexDirection: 'row'
            }}>
                    <HomePageItem
            title="操作日志"
            content="后台操作相关记录"
            icon={CENTER_IMGS[4]}
            onPress={() => {
                this.centerItemAction(2)
            }}/>
                    <Image
            source={require('../../imgs/home/ic_home_shu.png')}
            style={{
                height: 80
            }}/>
                    <HomePageItem
            title="服务器状态"
            content="查询在线服务器人数"
            icon={CENTER_IMGS[5]}
            onPress={() => {
                this.centerItemAction(3)
            }}/>
                </View>
                </View>
            <View
            style={{
                flexDirection: 'row',
                marginBottom: 10
            }}>
                <View
            style={{
                flex: 1,
                alignItems: 'center',
                flexWrap: 'wrap',
                paddingTop: 10
            }}>
                    <Image
            style={{
                width: 30,
                height: 30,
                marginBottom: 5
            }}
            source={require('../../imgs/home/bottom_1.png')}/>
                    <Text
            style={{
                color: '#515151',
                fontSize: 12
            }}>玩家登陆日志</Text>
                </View>
                <View
            style={{
                flex: 1,
                alignItems: 'center',
                flexWrap: 'wrap',
                paddingTop: 10
            }}>
                    <Image
            style={{
                width: 30,
                height: 30,
                marginBottom: 5
            }}
            source={require('../../imgs/home/bottom_2.png')}/>
                    <Text
            style={{
                color: '#515151',
                fontSize: 12
            }}>发送广播消息</Text>
                </View>
                <View
            style={{
                flex: 1,
                alignItems: 'center',
                flexWrap: 'wrap',
                paddingTop: 10
            }}>
                    <Image
            style={{
                width: 30,
                height: 30,
                marginBottom: 5
            }}
            source={require('../../imgs/home/bottom_3.png')}/>
                    <Text
            style={{
                color: '#515151',
                fontSize: 12
            }}>划拨圣币</Text>
                </View>
                
            </View>
            <TouchableOpacity>
                        <View
            style={{
                alignItems: 'center',
                marginTop: 20,
                marginBottom: 10
            }}>
                            <Text
            style={{
                fontSize: 14,
                color: '#389e7f'
            }}>更多功能</Text>
                        </View>
                </TouchableOpacity>
                    {(this.props.error && !this.props.hasData) ?
                <View style={styles.indicator}>
                            <Text style={{
                    color: this.props.tabIconColor
                }}>Ooops, 获取数据失败</Text>
                        </View>
                :
                ((this.props.hasData && Info.getCategoryList(dataSource).length > 0) ?
                    <View>
                                    
                                    <View style={styles.scrollContents}>
                                        {this.props.displayOrder.map((item, i) => {
                        if (item !== '福利' && Info.getTargetList(dataSource, item) != null)
                            return (
                                <ListViewForHome
                                key={i}
                                navigator={this.props.navigator}
                                dataSource={Info.getTargetList(dataSource, item)}
                                headerTitle={item}/>
                            );
                    })}
                                        { /*<View style={[styles.footer, {*/ }
                                            { /*backgroundColor: rowItemBackgroundColor,*/ }
                                            { /*borderTopColor: segmentColor*/ }
                                        { /*}]}>*/ }
                                            { /*<TouchableOpacity*/ }
                                                { /*onPress={this._onPress.bind(this, 1)}*/ }
                                                { /*activeOpacity={theme.touchableOpacityActiveOpacity}>*/ }
                                                { /*<View style={styles.bottomBtn}>*/ }
                                                    { /*<Text style={styles.btnLabel}>没看够？试试往期干货吧</Text>*/ }
                                                { /*</View>*/ }
                                            { /*</TouchableOpacity>*/ }
                                        { /*</View>*/ }
                                    </View>
                                </View>
                    :
                    null
                )
            }
                </ScrollView>
            </View>
        );
    }

    _fetchData() {
        this.props.actions.fetchDataIfNeed(getCurrentDate());
    }

    /**
     * the speed of render is faster than that of getting setting value.
     * this is for when gets the setting value, home page decides whether to refresh the content.
     */
    componentDidMount() {
        RCTDeviceEventEmitter.addListener('fetch', this._handleEventEmitter.bind(this));
    }

    componentWillUnmount() {
        RCTDeviceEventEmitter.removeListener('fetch', this._handleEventEmitter.bind(this));
    }

    _handleEventEmitter(value) {
        if (value)
            this._fetchData();
        else
            this.props.actions.onlyFetchLocalData(getCurrentDate());
    }

    _onPress(id) {
        if (id === 0)
            this._fetchData();
        else if (id === 1)
            ;
    }


    _onScroll(event) {
        var offsetY = event.nativeEvent.contentOffset.y;
        if (offsetY <= this.imageHeight - theme.toolbar.height) {
            var opacity = offsetY / (this.imageHeight - theme.toolbar.height);
            this.setState({
                opacity: opacity
            });
        } else {
            this.setState({
                opacity: 1
            });
        }
    }

    _itemOnPress(rowData) {
        //Alert.alert('提示', JSON.stringify(rowData))
        this.props.navigator.push({
            component: WebViewPage,
            args: {
                rowData: rowData
            }
        });
    }
}

class ImageView extends Component {
    static propTypes = {
        imgUrl: PropTypes.string,
        labelTime: PropTypes.string
    }

    render() {
        return (
            <View style={styles.container}>
                <Image source={{
                uri: this.props.imgUrl
            }} style={styles.img}/>
                <View style={styles.dateLabel}>
                    <Text style={styles.label}>{this.props.labelTime}</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    toolbar: {
        position: 'absolute',
        width: theme.screenWidth,
        zIndex: 1
    },
    scrollContents: {
        //height: theme.screenHeight+theme.toolbar.height,
    },
    img: {
        width: theme.screenWidth,
        height: px2dp(400),
        resizeMode: 'cover'
    },
    dateLabel: {
        backgroundColor: 'rgba(0,0,0,.5)',
        position: 'relative',
        width: theme.screenWidth,
        height: px2dp(50),
        bottom: px2dp(50),
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    label: {
        color: '#fff',
        fontSize: px2dp(20),
        marginRight: px2dp(20),
        fontWeight: 'bold'
    },
    footer: {
        width: theme.screenWidth,
        height: px2dp(70),
        alignItems: 'center',
        justifyContent: 'center',
        borderTopWidth: theme.segment.width
    },
    bottomBtn: {
        backgroundColor: colors.lightBlue,
        width: theme.screenWidth * 0.9,
        height: px2dp(40),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30,
    },
    btnLabel: {
        color: '#fff',
        fontSize: px2dp(16)
    },
    indicator: {
        flexDirection: 'row',
        width: theme.screenWidth,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: px2dp(20)
    },
    slideImage: {
        width: theme.screenWidth,
        height: px2dp(200)
    },
    customDot: {
        backgroundColor: '#ccc',
        height: px2dp(6),
        width: px2dp(6),
        marginLeft: px2dp(2),
        marginRight: px2dp(2),
        marginTop: px2dp(10),
        borderRadius: px2dp(3)
    },

    customActiveDot: {
        backgroundColor: 'white',
        height: px2dp(6),
        width: px2dp(6),
        marginLeft: px2dp(2),
        marginRight: px2dp(2),
        marginTop: px2dp(10),
        borderRadius: px2dp(3)
    }
});

const mapStateToProps = (state) => {
    return {
        isLogin: state.loginState.isLogin,
        loading: state.homeDataState.loading,
        hasData: state.homeDataState.hasData,
        dataSource: state.homeDataState.dataSource,
        dataTime: state.homeDataState.dataTime,
        error: state.homeDataState.error,
        mainThemeColor: state.settingState.colorScheme.mainThemeColor,
        pageBackgroundColor: state.settingState.colorScheme.pageBackgroundColor,
        rowItemBackgroundColor: state.settingState.colorScheme.rowItemBackgroundColor,
        segmentColor: state.settingState.colorScheme.segmentColor,
        displayOrder: state.settingState.displayOrder
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(Actions, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeFragment);