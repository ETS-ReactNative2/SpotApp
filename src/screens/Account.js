import React from 'react';
import { View, Text } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { Button } from 'react-native-elements';
import { styles } from '../styles';
import { logoutUser } from '../services/userServices';
import NavBar from '../components/NavBar';

export const Account = ({ navigation }) => {
	const { container, infoBar, centerItems, infoText } = accountStyles;

	const {
		buttonContainer,
		fullWidthHeight
	} = styles;

	const goTologin = () => { navigation.navigate('Login') };
	const logoutSubmit = () => {
		logoutUser(); 
		goTologin();
	};
	return (
		<View style = { [fullWidthHeight, container] }>
			<NavBar navigation={navigation} screenName='Account'/>

			<Svg
				width = '100%'
				height = '35%'
			>
				<Circle
					cx = '50%'
					cy = '50%'
					r = '32%'
					stroke = 'rgb(255, 255, 255)'
					strokeWidth = '1%'
				/>
			</Svg>
			<View style = { [centerItems, infoBar] }>
				<Text style = { infoText }>Username: </Text>
				<Text style = { infoText }>Email: </Text>
				<Text style = { infoText }>Total Dogs Seen: </Text>
				<Text style = { infoText }>Total Breeds Seen: </Text>
				<Button
					title = 'Log out'
					containerStyle = { [buttonContainer, { height: 60 }] }
					buttonStyle = { fullWidthHeight }
					onPress = { logoutSubmit }
				/>
			</View>
		</View>
	);
};

const accountStyles = {
	container: {
		backgroundColor: '#E2B865',
		flexDirection: 'column',
		flex: 1,
		zIndex: 1
	},
	infoBar: {
		backgroundColor: '#E5E5E5',
		height: '55%',
		width: '100%',
		zIndex: 5,
		justifyContent: 'space-around',
		alignItems: 'center',
		borderTopLeftRadius: 12,
		borderTopRightRadius: 12
	},
	centerItems: {
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center'
	},
	infoText: {
		fontSize: 16,
		alignSelf: 'flex-start',
		marginLeft: '10%'
	}
};