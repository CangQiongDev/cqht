/**
 * Created by haifeng on 17/2/7.
 */
import React, {Component} from 'react';
import theme from '../constants/theme';
import{
    View,
    Alert,
    Text,
    Dimensions,
    Image,
    StyleSheet,
    TouchableWithoutFeedback,
	TouchableHighlight,
	TouchableOpacity
} from 'react-native';

var item_width = (theme.screenWidth - 1) / 2;

const HomePageItem = ({title, content, icon, onPress}) => (
    <TouchableOpacity onPress={onPress} >
        <View style={styles.itemContainer}>
            <Image source={icon}
                   style={styles.itemIcon}/>
            <View style={{marginLeft: 10}}>
                <Text style={{fontSize: 16,marginBottom:5}}>{title}</Text>
                <Text style={styles.itemContent}>{content}</Text>
            </View>
        </View>
    </TouchableOpacity>
);

let styles = StyleSheet.create({
    itemContainer: {
		flex: 1,
        flexDirection: 'row',
        width: item_width,
        marginTop: 25
    },
    itemIcon: {
        width: 30,
        height: 30,
        marginTop:5,
        marginLeft: 20
    },
    itemContent:{
        color: '#999',
        fontSize: 12,
        marginTop: 5
    }
});

export default HomePageItem;


