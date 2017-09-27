import React, { Component } from 'react';
import {
	Text,
	View,
	Image,
	TextInput,
	StyleSheet,
	TouchableOpacity,
	Platform
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import theme from '../constants/theme';
import px2dp from '../utils/px2dp';
import {connect} from 'react-redux'
import _ from  'lodash';
const headerImgSource = [
    require('../imgs/1.jpg'),
    require('../imgs/2.jpg')
];
export function getImageSource(key = -1){
    let imageLen = headerImgSource.length;
    if (key < 0 || (key > imageLen)) {
        key = _.random(1, imageLen - 1);
    }
    return headerImgSource[key];
}
class SearchBar extends Component {

	constructor(props) {
	    super(props);
	    this.state = {
	    	key:''
	    };

	    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
	}

	onSearchPress(){
		const { onSearchHandle } = this.props;
		const txtSearch = this.refs.txtSearch;
		if (this.state.key === '') {
			txtSearch.focus();
		}else{
			txtSearch.blur();
			onSearchHandle(this.state.key);
		}
	}

	renderBackground(){
		if (!this.backgroundImage) {
			this.backgroundImage = getImageSource();
		}
		return (
			<Image 
         		style={[ styles.pos_absolute, styles.background]} 
         		source={  this.backgroundImage } />
		)
	}

	renderBackdrop(){
		return (
			<View style={ [ styles.pos_absolute, styles.backdrop , {backgroundColor: this.props.mainThemeColor}] }>
			</View>
		)
	}

	renderLeftIcon(){
		return (
			<TouchableOpacity 
				style = { [ styles.p_r_2 ] } 
				activeOpacity={ 0.7 }
				onPress={ ()=>{ this.props.router.pop() } }>
				<View style={styles.btn}>
				<Icon
					name={ "md-arrow-back" }
					color={ 'rgba(255, 255, 255, 1)' } 
					style = { [styles.background_transparent] }
					size= { px2dp(23) } />
				</View>
			</TouchableOpacity>
		)
	}
	
	renderSearchInput(){
		const { placeholder = '请输入名称' } = this.props;
	    return (
			<TextInput 
				ref="txtSearch"
				blurOnSubmit ={true}
				onSubmitEditing = { ()=> this.onSearchPress() }
				style={ styles.searchInput }
				placeholder ={ placeholder }
				placeholderTextColor  = { 'rgba(255, 255, 255, 0.6)' }
				maxLength = { 20 }
				underlineColorAndroid = { 'transparent' }
				onChangeText={(key) => this.setState({key})}
				value={this.state.key} />
	    );
	}

	renderRightIcon(){
		return (
			<TouchableOpacity 
				style = { [ styles.p_l_2 ] } 
				activeOpacity={ 0.7 }
				onPress={()=> this.onSearchPress() }>
				<View style={styles.btn}>
				<Icon 
					name={ "md-search" }
					color={ 'rgba(255, 255, 255, 1)' }  
					style = { [styles.background_transparent] }
					size= { px2dp(23) }/>
				</View>
			</TouchableOpacity>
		);
	}

	renderContent(){
		return (
			<View style={[styles.flexRow, styles.flexItemsMiddle, styles.flexItemsBetween, styles.container]}>
				{ this.renderLeftIcon() }
				{ this.renderSearchInput() }
				{ this.renderRightIcon() }
			</View>
		)
	}


	render() {
	    return (
	    	<View>
				{ /*this.renderBackground()*/ }
				{ this.renderBackdrop() }
				{ this.renderContent() }
          	</View>
	    )
	}
}

const styles = StyleSheet.create({
	container: {
		height: px2dp(60),
		width: theme.screenWidth,
		paddingHorizontal: 15,
		paddingTop: px2dp(21)
	},
	background: {
		width: theme.screenWidth,
	    height: px2dp(60),
	    top:0
	},
	backdrop:{
		top:0,
		height: px2dp(60),
		width: theme.screenWidth,
		//backgroundColor: "#ff8500"//'rgba(0, 0, 0, 0.8)'
	},
	searchInput: {
		flex: 1,
		fontSize: 16,
		color: 'rgba(255, 255, 255, 1)'
	},
	pos_absolute: {
		position: 'absolute',
		left: 0,
		right: 0
	},
	p_r_2:{
		paddingRight: px2dp(20)
	},
	background_transparent: {
		backgroundColor: "transparent"
	},
	p_l_2:{
		paddingLeft: px2dp(20)
	},
	flexRow:{
		flexDirection: 'row'
	},
	flexItemsMiddle:{
			alignItems: 'center'
	},
	flexItemsBetween: {
			justifyContent:'space-between'
	},
	btn: {
        justifyContent:'center',
        alignItems:'center',
        flex: 1,
        width: px2dp(30),
    },
})

const mapStateToProps = (state) => {
    return {
        mainThemeColor: state.settingState.colorScheme.mainThemeColor
    };
};

export default connect(mapStateToProps)(SearchBar);