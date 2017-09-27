/**
 * Created by wangdi on 23/11/16.
 */
'use strict';

import {Platform, Dimensions, PixelRatio} from 'react-native';
import colors from './colors';
import px2dp from '../utils/px2dp';

export default {
    //mainThemeColor: favoriteColor,
    pageBackgroundColor: '#f4f4f4',
    screenHeight: Dimensions.get('window').height,
    screenWidth: Dimensions.get('window').width,
    touchableHighlightUnderlayColor: 'rgba(0,0,0,.4)',
    touchableOpacityActiveOpacity: 0.8,
    segment: {
		width: 1/PixelRatio.get(),
        color: '#ccc'
    },
    tabButton: {
        normalColor: '#aaa'
    },
	actionBar: {
        height: (Platform.OS === 'android') ? px2dp(60) : px2dp(69),
        backgroundColor: 'rgb(22,131,251)',
        fontSize: px2dp(16),
        fontColor: 'white'
    },
    toolbar: {
        height: Platform.OS === 'android' ? px2dp(60) : px2dp(69), //px2dp(40) : px2dp(49)
        paddingTop: Platform.Version >= 21 ? 0 : 0,//2017-06-18 这里修改原来20  px2dp(18) : 0
        //barColor: favoriteColor,
        titleColor: '#fff',
        titleSize: Platform.OS === 'android' ? px2dp(18) : px2dp(14),
        textBtnSize: Platform.OS === 'android' ? px2dp(15) : px2dp(11)
    }
}
