/**
 * Created by spm on 7/20/17.
 */
import React, {Component, PropTypes} from 'react';
import {Text, View, StyleSheet, Platform, TouchableNativeFeedback, TouchableOpacity} from 'react-native';
import theme from '../constants/theme';
import px2dp from '../utils/px2dp';
import Icon from 'react-native-vector-icons/Ionicons';
import {connect} from 'react-redux';

class SearchBar extends Component{
    static propTypes = {
        onPress: PropTypes.func,
		leftBtnIcon: PropTypes.string,
        leftBtnText: PropTypes.string,
        leftBtnPress: PropTypes.func,
        rightBtnIcon: PropTypes.string,
        rightBtnText: PropTypes.string,
        rightBtnPress: PropTypes.func
    };

    render(){
		 const {leftBtnIcon, leftBtnText, leftBtnPress, rightBtnIcon, rightBtnText, rightBtnPress} = this.props;
        if(Platform.OS === 'android'){
            return(
                <View style={[styles.container, {backgroundColor: this.props.mainThemeColor}]}>
                    <View style={styles.fixedCell}>
                        {(leftBtnIcon || leftBtnText) ?
                            <Button icon={leftBtnIcon} text={leftBtnText} onPress={leftBtnPress} />
                            :
                            null
                        }
                    </View>
					<TouchableNativeFeedback onPress={this.props.onPress}>
                        {this.renderContent()}
                    </TouchableNativeFeedback>
					<View style={styles.fixedCell}>
                        {(rightBtnIcon || rightBtnText) ?
                            <Button icon={rightBtnIcon} text={rightBtnText} onPress={rightBtnPress} />
                            :
                            null
                        }
                    </View>
                </View>
            );
        }else if(Platform.OS === 'ios'){
            return(
                <View style={styles.container}>
					<View style={styles.fixedCell}>
                        {(leftBtnIcon || leftBtnText) ?
                            <Button icon={leftBtnIcon} text={leftBtnText} onPress={leftBtnPress} />
                            :
                            null
                        }
                    </View>
                    <TouchableOpacity onPress={this.props.onPress} activeOpacity={theme.btnActiveOpacity}>
                        {this.renderContent()}
                    </TouchableOpacity>
					<View style={styles.fixedCell}>
                        {(rightBtnIcon || rightBtnText) ?
                            <Button icon={rightBtnIcon} text={rightBtnText} onPress={rightBtnPress} />
                            :
                            null
                        }
                    </View>
                </View>
            );
        }
    }

    renderContent(){
        return(
            <View style={styles.searchBar}>
                <Icon name="ios-search" size={px2dp(25)} color="#666"/>
                <Text style={styles.text}>搜索</Text>
            </View>
        );
    }
}
class Button extends Component{
    static propTypes = {
        icon: PropTypes.string,
        text: PropTypes.string,
        onPress: PropTypes.func
    };

    render(){
        var icon = null;
        if(this.props.icon) {
            if (Platform.OS === 'android') {
                icon = 'md-' + this.props.icon;
            } else if (Platform.OS === 'ios') {
                icon = 'ios-' + this.props.icon;
            }
        }
        return(
            <TouchableOpacity
                onPress={this.props.onPress}
                activeOpacity={theme.touchableOpacityActiveOpacity}>
                <View style={styles.btn}>
                    {icon ?
                        <Icon name={icon} color="#fff" size={px2dp(23)}/>
                        :
                        <Text style={styles.btnText}>{this.props.text}</Text>
                    }
                </View>
            </TouchableOpacity>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        height: theme.actionBar.height,
        /*backgroundColor: theme.actionBar.backgroundColor,*/
        justifyContent: 'center',
        paddingTop: (Platform.OS === 'ios') ? px2dp(20) : px2dp(21)
    },
    searchBar: {
        flexDirection: 'row',
        height: px2dp(28),
        paddingLeft: px2dp(13),
        paddingRight: px2dp(13),
        backgroundColor: 'white',
        alignItems: 'center',
        marginRight: px2dp(8),
        marginLeft: px2dp(8),
        borderRadius: px2dp(13)
    },
    text: {
        fontSize: px2dp(15),
        color: '#666',
        marginLeft: px2dp(13)
    },
	fixedCell: {
        width: theme.toolbar.height,
        height: theme.toolbar.height,
        flexDirection:'row',
    },
	btn: {
        justifyContent:'center',
        alignItems:'center',
        flex: 1,
        width: theme.toolbar.height,
        height: Platform.OS === 'android' ? theme.toolbar.height : theme.toolbar.height - px2dp(6),
    },
    btnText: {
        color: theme.toolbar.titleColor,
        fontSize: theme.toolbar.textBtnSize
    }
});

const mapStateToProps = (state) => {
    return {
        mainThemeColor: state.settingState.colorScheme.mainThemeColor
    };
};

export default connect(mapStateToProps)(SearchBar);