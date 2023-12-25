import {
	StyleSheet,
	Text,
	View,
	SafeAreaView,
	Image,
	Pressable,
} from 'react-native';
import React, {
	type Dispatch,
	type SetStateAction,
	useCallback,
	useRef,
	useState,
	useEffect,
} from 'react';
import {
	Camera,
	type CameraCapturedPicture,
	type CameraPictureOptions,
	CameraType,
	FlashMode,
} from 'expo-camera';
import Icon from 'react-native-remix-icon';
import GlobalStyles from '../../constants/GlobalStyles';
import { screenHeight, screenWidth } from '../../utils/modalMaxShow';
import { useNavigation } from '@react-navigation/native';
import { type NativeStackNavigationProp } from '@react-navigation/native-stack';
import { type StackTypes } from '../../utils/StackNavigation';
import ExpoStatusBar from 'expo-status-bar/build/ExpoStatusBar';
import {
	TapGestureHandler,
	type TapGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
import Animated, {
	measure,
	runOnJS,
	useAnimatedGestureHandler,
	useAnimatedRef,
	useAnimatedStyle,
	useSharedValue,
	withTiming,
} from 'react-native-reanimated';

import * as MediaLibrary from 'expo-media-library';
import * as ImagePicker from 'expo-image-picker';
import { StackNavigation } from '../../constants/Enums';

interface CameraPropType {
	data: (photo: string) => void;
	returnToNavigation: NativeStackNavigationProp<StackTypes>;
}

export default function CameraComponent({ data, returnToNavigation }: CameraPropType) {
	const [orientation, setOrientation] = useState(CameraType.front);
	const [flash, setFlash] = useState(FlashMode.auto);
	const [cameraPermission, requestCameraPermission] =
		Camera.useCameraPermissions();
	const [mediaPermission, requestMediaPermission] =
		MediaLibrary.usePermissions();
	const [photo, setPhoto] = useState<CameraCapturedPicture>();
	const scale = useSharedValue(0);
	const shutterWidth = useSharedValue(0);
	const rippleOpacity = useSharedValue(1);

	const navigation = useNavigation<NativeStackNavigationProp<StackTypes>>();

	const cameraRef = useRef<Camera>(null);
	const aRef = useAnimatedRef<View>();

	const takePhotoOptions: CameraPictureOptions = {
		quality: 0,
		base64: true,
		exif: false, // Exchangeable Image File Format. It's a standard that specifies the formats for images, sound, and ancillary tags used by digital cameras
	};

	useEffect(() => {
		// console.log(screenHeight, screenWidth);
	}, []);

	const flipCamera = () => {
		setOrientation((current) =>
			current === CameraType.back ? CameraType.front : CameraType.back
		);
	};

	const takePicture = useCallback(async () => {
		if (cameraRef.current == null) return;
		const newPhoto = await cameraRef.current.takePictureAsync(takePhotoOptions);
		setPhoto(newPhoto);
		// console.log('Photo taken: ', newPhoto);
	}, []);

	const tapGestureEvent =
		useAnimatedGestureHandler<TapGestureHandlerGestureEvent>({
			onStart: () => {
				const layout = measure(aRef);
				if (layout == null) return;
				shutterWidth.value = layout.width;

				rippleOpacity.value = 1;
				scale.value = 0;
				scale.value = withTiming(1, { duration: 400 });
			},
			onActive: () => {
				runOnJS(takePicture)();
			},
			onFinish: () => {
				rippleOpacity.value = withTiming(0);
			},
		});

	const rippleAnimation = useAnimatedStyle(() => {
		const circleRadius = shutterWidth.value;
		return {
			width: circleRadius * 2,
			aspectRatio: 1 / 1,
			borderRadius: circleRadius,
			backgroundColor: GlobalStyles.colorPalette.primary[300],
			opacity: rippleOpacity.value,
			position: 'absolute',
			transform: [
				{
					scale: scale.value,
				},
			],
		};
	});

	if (cameraPermission == null) {
		return <View />;
	}

	if (!cameraPermission.granted) {
		requestCameraPermission();
		return <></>;
	}

	if (mediaPermission == null) {
		return <View />;
	}

	if (!mediaPermission.granted) {
		requestMediaPermission();
		return <></>;
	}

	if (photo != null && photo.base64 != undefined) {
		const savePhoto = () => {
			// console.log('Test: ', photo.base64);
			if (photo.base64) {
				data(photo.base64);
				console.log(photo.base64.substring(0, 10));
			} else {
				console.log('photo.base64 is undefined!')
			}
			// navigation.goBack();
			MediaLibrary.saveToLibraryAsync(photo.uri).then(() => {
				setPhoto(undefined);
			});
		};

		return (
			<SafeAreaView style={styles.previewContainer}>
				<Image
					style={styles.preview}
					source={{ uri: 'data:image/jpg;base64,' + photo.base64 }}
				/>
				<Pressable
					onPress={() => {
						setPhoto(undefined);
					}}
					style={[
						styles.button,
						{
							position: 'absolute',
							zIndex: 100,
							top: 100,
							left: GlobalStyles.layout.xGap,
						},
					]}
				>
					<Icon
						name={GlobalStyles.icons.backOutline}
						size={GlobalStyles.sizing.icon.regular}
						color={GlobalStyles.colorPalette.background}
					/>
				</Pressable>
				{mediaPermission.granted ? (
					<Pressable
						onPress={savePhoto}
						style={[
							styles.buttonInverse,
							{
								position: 'absolute',
								bottom: 50,
								right: GlobalStyles.layout.xGap,
							},
						]}
					>
						<Icon
							name={GlobalStyles.icons.rightFillArrow}
							color={GlobalStyles.colorPalette.primary[500]}
							size={GlobalStyles.sizing.icon.regular}
						/>
					</Pressable>
				) : undefined}
			</SafeAreaView>
		);
	}

	const pickImage = async () => {
		const result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			allowsEditing: true,
			base64: true,
			aspect: [1, 1],
			quality: 0,
		});
		if (result.canceled) return;

		// console.log('Test2: ', result.assets[0].base64);
		if (result.assets[0].base64) {
			data(result.assets[0].base64);
			console.log(result.assets[0].base64.substring(0, 10));
		} else {
			console.log('result.assets[0].base64 is undefined!')
		}
		// navigation.goBack();
	};

	return (
		<>
			<Camera
				style={styles.container}
				ref={cameraRef}
				type={orientation}
				flashMode={flash}
			/>
			<SafeAreaView
				style={{
					position: 'absolute',
					width: screenWidth,
					height: screenHeight,
					alignItems: 'center',
					justifyContent: 'space-between',
				}}
			>
				<View
					style={{
						justifyContent: 'flex-start',
						width: screenWidth,
						left: GlobalStyles.layout.xGap,
					}}
				>
					<Text>
						<Pressable
							onPress={() => {
								returnToNavigation.goBack();
							}}
						>
							<Icon
								name={GlobalStyles.icons.closeOutline}
								color={GlobalStyles.colorPalette.background}
								size={GlobalStyles.sizing.icon.regular}
							/>
						</Pressable>
					</Text>
				</View>
				<View style={styles.bottomContainer}>
					<Pressable onPress={pickImage} style={styles.button}>
						<Icon
							name={GlobalStyles.icons.imageFill}
							size={GlobalStyles.sizing.icon.regular}
							color={GlobalStyles.colorPalette.background}
						/>
					</Pressable>
					<View ref={aRef} style={styles.shutterButton}>
						<TapGestureHandler onGestureEvent={tapGestureEvent}>
							<Animated.View
								style={[styles.shutterButton, { overflow: 'hidden' }]}
							>
								<Animated.View style={rippleAnimation} />
							</Animated.View>
						</TapGestureHandler>
					</View>
					<Pressable onPress={flipCamera} style={styles.button}>
						<Icon
							name={GlobalStyles.icons.flipCameraOutline}
							size={GlobalStyles.sizing.icon.regular}
							color={GlobalStyles.colorPalette.background}
						/>
					</Pressable>
				</View>
			</SafeAreaView>
			<ExpoStatusBar hidden />
		</>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		width: screenWidth,
		height: screenHeight,
	},
	previewContainer: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'space-between',
		backgroundColor: '#000000',
		gap: GlobalStyles.layout.gap,
	},
	preview: {
		alignSelf: 'stretch',
		flex: 1,
		borderRadius: 35,
	},
	button: {
		padding: 10,
		backgroundColor: GlobalStyles.colorPalette.primary[500] + '80',
		...GlobalStyles.utils.fullRadius,
	},
	buttonInverse: {
		padding: 10,
		backgroundColor: GlobalStyles.colorPalette.background,
		...GlobalStyles.utils.fullRadius,
	},
	bottomContainer: {
		width: screenWidth,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-evenly',
	},
	topContainer: {
		width: screenWidth,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-evenly',
	},
	shutterButton: {
		borderRadius: 75,
		width: 75,
		borderWidth: 5,
		borderColor: GlobalStyles.colorPalette.primary[300],
		aspectRatio: 1 / 1,
		backgroundColor: GlobalStyles.colorPalette.background,
		alignItems: 'center',
		justifyContent: 'center',
	},
});
