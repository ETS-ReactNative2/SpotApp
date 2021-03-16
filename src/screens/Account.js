import React, { useState, useEffect } from 'react';
import { View, Text, Modal, KeyboardAvoidingView, Alert } from 'react-native';
import { Button, Avatar } from 'react-native-elements';
import NavBar from '../components/NavBar';
import ImagePicker from 'react-native-image-crop-picker';
import { styles, colors } from '../styles';
import { logoutUser, uploadImage } from '../services/userServices';
import { useDispatch, useSelector } from 'react-redux';
import { userStatus, loadUser } from '../ducks';

export const Account = ({ navigation }) => {
	const { container, infoBar, centerItems, infoText } = accountStyles;

	const {
		buttonContainer,
		fullWidthHeight,
		errorText,
		modalErrorText
	} = styles;

	const [error, setError] = useState('');
	const [modalError, setModalError] = useState('');
	const [modalVisible, setModalVisible] = useState(false);
	const { activeUser } = useSelector(state => state.user);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(loadUser());
	}, []);

	const logoutSubmit = () => {
		logoutUser();
		setTimeout(() => dispatch(userStatus()), 500);
		Alert.alert('Logging off...', 'Have a nice day!');
	};

	const renderError = () => {
		if (error)
			return (<Text style = { errorText }>{ error }</Text>);
	};

	const renderModalError = () => {
		if (modalError)
			return (<Text style = { modalErrorText }>{ modalError }</Text>);
	};

	const renderSetProfilePictureModal = () => {
		return (
			<Modal animationType = 'slide' transparent = { true } visible = { modalVisible } >
				<KeyboardAvoidingView behavior = 'height' enabled >
					<View style = { modalStyles.centeredView }>
						<View style = { modalStyles.ModalView }>
							<Text style = { modalStyles.promptText }>
								Set Profile Picture
							</Text>
							<View style = { modalStyles.buttonView }>
								<Button
									title = 'No Picture'
									containerStyle = { modalStyles.buttonContainer }
									buttonStyle = { modalStyles.buttonStyle }
									onPress = { () => {
										setModalError('');
										setModalVisible(!modalVisible);
									} }
								/>
								<Button
									title = 'Choose from Gallery'
									containerStyle = { modalStyles.buttonContainer }
									buttonStyle = { modalStyles.buttonStyle }
									onPress = { () => {
										setModalError('');
										setModalVisible(!modalVisible);
										ImagePicker.openPicker({
											width: 300,
											height: 400,
											cropping: true,
											freeStyleCropEnabled: true
										}).then((image) =>
											uploadImage({
												uri: image.path,
												type: 'image/jpeg',
												name: 'profileImage'
											})
										)
											.then(() => dispatch(loadUser()))
											.catch((error) => Alert.alert('Error', error));
									} }
								/>
								<Button
									title = 'Use Camera'
									containerStyle = { modalStyles.buttonContainer }
									buttonStyle = { modalStyles.buttonStyle }
									onPress = { () => {
										setModalError('');
										setModalVisible(!modalVisible);
										ImagePicker.openCamera({
											width: 300,
											height: 400,
											cropping: true,
											freeStyleCropEnabled: true
										}).then((image) =>
											uploadImage({
												uri: image.path,
												type: 'image/jpeg',
												name: 'profileImage'
											})
										)
											.then(() => dispatch(loadUser()))
											.catch((error) => Alert.alert('Error', error));
									} }
								/>
							</View>
							<View style = { modalStyles.buttonView }>
								<Button
									title = 'Cancel'
									containerStyle = { modalStyles.buttonContainer }
									buttonStyle = { modalStyles.buttonStyle }
									onPress = { () => {
										setModalError('');
										setModalVisible(!modalVisible);
									} }
								/>
							</View>
							{ renderModalError() }
						</View>
					</View>
				</KeyboardAvoidingView>
			</Modal>
		);
	};

	return (
		<View style = { [fullWidthHeight, container] }>
			{ renderSetProfilePictureModal() }
			<NavBar navigation = { navigation } screenName = 'Account' />

			<View style = { [centerItems] }
				width = '100%'
				height = '35%'
			>
				<Avatar
					size = { 200 }
					rounded
					source = { activeUser ? { uri: activeUser.picture } : require('../assets/default_profile_icon.png') }
				>
					<Avatar.Accessory
						size = { 20 }
						underlayColor = '#8C9095'
						onPress = { () => {
							setModalVisible(true);
							setError('');
						} }
					/>
				</Avatar>
			</View>
			{ renderError() }

			<View style = { [centerItems, infoBar] }>
				<Text style = { infoText }>Username: { activeUser.name } </Text>
				<Text style = { infoText }>Email: { activeUser.email }</Text>
				<Text style = { infoText }>Total Breeds Seen: { activeUser.CollectedBreeds }</Text>
				<Text style = { infoText }>Points: { activeUser.score }</Text>
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
		backgroundColor: colors.primaryDark,
		flexDirection: 'column',
		flex: 1,
		zIndex: 1
	},
	infoBar: {
		backgroundColor: colors.offWhite,
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

const modalStyles = {
	centeredView: {
		justifyContent: 'center',
		alignItems: 'center',
		height: '100%',
		width: '100%',
		backgroundColor: 'rgba(0, 0, 0, 0.4)'
	},
	ModalView: {
		justifyContent: 'space-around',
		alignItems: 'center',
		backgroundColor: colors.offWhite,
		width: '90%',
		height: 250,
		borderRadius: 10
	},
	promptText: {
		paddingBottom: '3%',
		marginTop: '8%',
		marginHorizontal: '16%',
		textAlign: 'center',
		fontSize: 22,
		borderBottomWidth: 1,
		borderBottomColor: colors.dark
	},
	buttonView: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		alignItems: 'center',
		height: '25%',
		width: '100%'
	},
	buttonContainer: {
		width: '30%',
		height: '65%',
		justifyContent: 'center'
	},
	buttonStyle: {
		backgroundColor: colors.primaryDark
	}
};