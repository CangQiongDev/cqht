/**
 * Created by wangdi on 23/11/16.
 */
import React, {Component, PropTypes} from 'react';
import {StyleSheet, Platform, TextInput, View, Text, StatusBar, TouchableOpacity, TouchableNativeFeedback} from 'react-native';
import theme from '../constants/theme';
import px2dp from '../utils/px2dp';
import Icon from 'react-native-vector-icons/Ionicons';
import {connect} from 'react-redux'

class NavigationBar extends Component{
    static propTypes = {
        title: PropTypes.string.isRequired,
        leftBtnIcon: PropTypes.string,
        leftBtnText: PropTypes.string,
        leftBtnPress: PropTypes.func,
        rightBtnIcon: PropTypes.string,
        rightBtnText: PropTypes.string,
        rightBtnPress: PropTypes.func,
		isSearchBtn: PropTypes.bool,
		searchBtnPress: PropTypes.func,
        handleSearch: PropTypes.func,
        inputOnFocus: PropTypes.func,
        inputOnBlur: PropTypes.func,
    };

    constructor(props) {
        super(props);
        this.state = {
            key:''
        };
    }
    onSearchPress(){
        //const { onSearchHandle } = this.props;
        const txtSearch = this.refs.txtSearch;
        //if(this.state.key === '') {
        //    txtSearch.focus();
       // }else{
            //txtSearch.blur();
            this.props.searchBtnPress(this.state.key, true);
       //}
    }
    _onChangeText(key){
        const { handleSearch} = this.props;
        this.setState({ key });
        if (handleSearch) {
          handleSearch(key);
        } 
    }

    _inputOnFocus(){
        const txtSearch = this.refs.txtSearch;
        this.props.inputOnFocus(this);
    }
	//
    render(){
        const {title, leftBtnIcon, leftBtnText, leftBtnPress, rightBtnIcon, rightBtnText, rightBtnPress, isSearchBtn, searchBtnPress, inputOnFocus, inputOnBlur, onEndEditing} = this.props;
        return (
            <View style={styles.container}>
                <StatusBar translucent={true} backgroundColor={this.props.mainThemeColor} />
                <View style={[styles.toolbar, {backgroundColor: this.props.mainThemeColor}]}>
                    <View style={styles.fixedCell}>
                        {(leftBtnIcon || leftBtnText) ?
                            <Button icon={leftBtnIcon} text={leftBtnText} onPress={leftBtnPress} />
                            :
                            null
                        }
                    </View>
					{ isSearchBtn ?
					<View style={styles.centerCell}>
					{/*<TouchableNativeFeedback onPress={searchBtnPress}>*/}
						<View style={styles.searchBar}>
							{/*<Icon name="ios-search" size={px2dp(25)} color="#666"/>
							<Text style={styles.text}>{title}</Text>*/}
                            <Icon name="ios-search" size={px2dp(25)} color="#666"/>
                            <TextInput 
                            ref="txtSearch"
                            blurOnSubmit ={true}
                            onSubmitEditing = { ()=> this.onSearchPress() }
                            style={ styles.searchInput }
                            placeholder ={ title }
                            placeholderTextColor  = { "#888" }
                            maxLength = { 32 }
                            underlineColorAndroid = { 'transparent' }
                            onChangeText={(key) => this._onChangeText(key)}
                            returnKeyType='search'
                            onFocus = {this._inputOnFocus.bind(this)}
                            onBlur = {inputOnBlur}
                            value={this.state.key} />
                            { (this.state.key.length > 0) ? 
                                <TouchableOpacity
                                  accessible={true}
                                  accessibilityComponentType='button'
                                  onPress={()=>{this.setState({ key: '' });}}>
                                    <Icon name="ios-close-circle" size={px2dp(25)} color="#666"/> 
                                </TouchableOpacity>
                                : null 
                            }
						</View>
					{/*</TouchableNativeFeedback>*/}
					</View>
					:
						<View style={styles.centerCell}>
							<Text style={styles.title}>{title}</Text>
						</View>
					}
                    <View style={styles.fixedCell}>
                        {(rightBtnIcon || rightBtnText) ?
                            <Button icon={rightBtnIcon} text={rightBtnText} onPress={rightBtnPress} />
                            :
                            null
                        }
                    </View>
                </View>
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
    container: { //in order to display the shadow on home tab
        height: theme.toolbar.height + px2dp(4),
        width: theme.screenWidth,
        backgroundColor: 'rgba(0,0,0,0)'
    },
    toolbar: {
        height: theme.toolbar.height,
        //backgroundColor: theme.toolbar.barColor,
        flexDirection: 'row',
        paddingTop: Platform.OS === 'android' ? 10 : px2dp(6),//0 : px2dp(6)
        elevation: 3,
        shadowColor: 'rgb(0,0,0)',
        shadowOffset: {height: 2, width: 1},
        shadowOpacity: 0.25,
        shadowRadius: 3
    },
    fixedCell: {
        width: theme.toolbar.height,
        height: theme.toolbar.height,
        flexDirection:'row',
    },
    centerCell: {
        flex: 1,
        height: theme.toolbar.height,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: theme.toolbar.titleSize,
        color: theme.toolbar.titleColor
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
    },
    searchBar: {
		width: theme.screenWidth - (theme.toolbar.height*2),
        flexDirection: 'row',
        height: px2dp(32),
        paddingLeft: px2dp(13),
        paddingRight: px2dp(13),
        backgroundColor: 'white',
        alignItems: 'center',
        marginRight: px2dp(8),
        marginLeft: px2dp(8),
        borderRadius: px2dp(15)
    },
    text: {
        fontSize: px2dp(15),
        color: '#666',
        marginLeft: px2dp(13)
    },
    searchInput: {
        flex: 1,
        fontSize: px2dp(15),
        color: '#444',
        marginLeft: px2dp(3),
        marginRight: px2dp(3),
        paddingBottom: px2dp(6)
    },

});

const mapStateToProps = (state) => {
    return {
        mainThemeColor: state.settingState.colorScheme.mainThemeColor
    };
};

export default connect(mapStateToProps)(NavigationBar);