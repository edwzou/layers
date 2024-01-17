import {
	StyleSheet,
	View,
	SafeAreaView,
	Pressable,
	type ViewStyle,
} from 'react-native';
import React, { useCallback, useRef, useState, type ReactElement } from 'react';
import {
	Camera,
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
	type AnimatedStyleProp,
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
import ImageCropPicker from 'react-native-image-crop-picker';

interface CameraPropType {
	cameraFunction: (photo: string) => void;
}

export default function CameraComponent({
	cameraFunction,
}: CameraPropType): ReactElement {
	const [orientation, setOrientation] = useState(CameraType.back);
	const [flashMode, setFlashMode] = useState(FlashMode.off);
	const [cameraPermission, requestCameraPermission] =
		Camera.useCameraPermissions();
	const [mediaPermission, requestMediaPermission] =
		MediaLibrary.usePermissions();
	const scale = useSharedValue(0);
	const shutterWidth = useSharedValue(0);
	const rippleOpacity = useSharedValue(1);
	const navigation = useNavigation<NativeStackNavigationProp<StackTypes>>();
	const cameraRef = useRef<Camera>(null);
	const aRef = useAnimatedRef<View>();

	const takePhotoOptions: CameraPictureOptions = {
		quality: 0,
		base64: true,
		// Exchangeable Image File Format. It's a standard that specifies the formats for images, sound, and ancillary tags used by digital cameras
		exif: false,
	};

	const flipCamera = (): void => {
		setOrientation((current) =>
			current === CameraType.front ? CameraType.back : CameraType.front
		);
	};

	const takePicture = useCallback(async () => {
		if (cameraRef.current == null) return;
		const newPhoto = await cameraRef.current.takePictureAsync(takePhotoOptions);
		if (
			newPhoto?.uri !== null &&
			newPhoto?.uri !== undefined &&
			newPhoto?.uri !== ''
		) {
			ImageCropPicker.openCropper({
				path: newPhoto.uri,
				width: 800, // set your desired width
				height: 800, // set your desired height
				cropping: true,
				includeBase64: true,
				mediaType: 'photo', // specify media type as 'photo'
			})
				.then((croppedImage) => {
					if (
						croppedImage?.data !== null &&
						croppedImage?.data !== undefined &&
						croppedImage?.data !== ''
					) {
						cameraFunction(croppedImage.data);
					}
				})
				.catch((error) => {
					console.log('Cropping failed', error);
				});
		} else {
			console.log('photo.uri is undefined!');
		}
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
		const animatedStyle: AnimatedStyleProp<ViewStyle> = {
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
		return animatedStyle;
	});

	if (cameraPermission == null) {
		return <View />;
	}

	if (!cameraPermission.granted) {
		// If an error is thrown nothing happens
		void requestCameraPermission();
		return <></>;
	}

	if (mediaPermission == null) {
		return <View />;
	}

	if (!mediaPermission.granted) {
		// If an error is thrown nothing happens
		void requestMediaPermission();
		return <></>;
	}

	const pickImage = async (): Promise<void> => {
		const result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			allowsEditing: true,
			base64: true,
			aspect: [1, 1],
			quality: 0,
		});
		if (result.canceled) return;
		if (
			result.assets[0].base64 !== null &&
			result.assets[0].base64 !== undefined &&
			result.assets[0].base64 !== ''
		) {
			cameraFunction(result.assets[0].base64);
		} else {
			console.log('result.assets[0].base64 is undefined!');
		}
	};

	const toggleFlash = (): void => {
		if (flashMode === FlashMode.off) {
			setFlashMode(FlashMode.torch);
		} else {
			setFlashMode(FlashMode.off);
		}
	};

	const GridOverlay = (): ReactElement => {
		return (
			<View style={styles.overlay}>
				<View style={styles.topShade} />
				<View style={styles.bottomShade} />
				<View style={styles.centerHole} />
			</View>
		);
	};

	return (
		<>
			<Camera
				style={styles.container}
				ref={cameraRef}
				type={orientation}
				flashMode={flashMode}
			>
				<GridOverlay />
			</Camera>
			<SafeAreaView
				style={{
					position: 'absolute',
					width: screenWidth,
					height: screenHeight,
					alignItems: 'center',
					justifyContent: 'space-between',
				}}
			>
				<View style={styles.topContainer}>
					<Pressable
						onPress={() => {
							navigation.goBack();
						}}
					>
						<Icon
							name={GlobalStyles.icons.closeOutline}
							color={GlobalStyles.colorPalette.background}
							size={GlobalStyles.sizing.icon.regular}
						/>
					</Pressable>
					<Pressable onPress={toggleFlash}>
						<Icon
							name={
								flashMode === FlashMode.torch
									? GlobalStyles.icons.flashlightFill
									: GlobalStyles.icons.flashlightOutline
							} // Replace with your icon name
							size={GlobalStyles.sizing.icon.regular}
							color={GlobalStyles.colorPalette.background}
						/>
					</Pressable>
				</View>
				<View style={styles.bottomContainer}>
					<Pressable
						onPress={() => {
							void pickImage();
						}}
					>
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
					<Pressable onPress={flipCamera}>
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
	buttonInverse: {
		padding: 10,
		backgroundColor: GlobalStyles.colorPalette.background,
		...GlobalStyles.utils.fullRadius,
	},
	topContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		width: screenWidth,
		padding: GlobalStyles.layout.xGap,
	},
	bottomContainer: {
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
	overlay: {
		position: 'absolute',
		left: 0,
		top: 0,
		right: 0,
		bottom: 0,
		alignItems: 'center',
		justifyContent: 'center',
	},
	topShade: {
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		height: (screenHeight - screenWidth) / 2, // Adjusted for top area
		backgroundColor: 'rgba(0, 0, 0, 0.5)',
	},
	bottomShade: {
		position: 'absolute',
		bottom: 0,
		left: 0,
		right: 0,
		height: (screenHeight - screenWidth) / 2, // Adjusted for bottom area
		backgroundColor: 'rgba(0, 0, 0, 0.5)',
	},
	centerHole: {
		width: screenWidth,
		height: screenWidth,
		position: 'absolute',
		borderColor: GlobalStyles.colorPalette.primary[300],
		borderWidth: 0.5,
	},
});
