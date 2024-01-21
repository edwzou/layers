import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import {
	PanGestureHandler,
	type PanGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
import Animated, {
	interpolateColor,
	useAnimatedGestureHandler,
	useAnimatedStyle,
	useDerivedValue,
	useSharedValue,
	withSpring,
	runOnJS,
} from 'react-native-reanimated';
import { LinearGradient, Stop } from 'react-native-svg';

interface ColorPickerPropsType {
	onNewColorPress: (colorToAdd: string) => void;
	maxWidth: number;
}

const ColorPicker: React.FC<ColorPickerPropsType> = ({
	onNewColorPress,
	maxWidth,
}) => {
	const colors = [
		'#4891FF',
		'#46B9C9',
		'#A3DEC9',
		'#6DC86E',
		'#76956B',
		'#EEE16B',
		'#E8D3B4',
		'#977854',
		'#EBA655',
		'#E55A5A',
		'#AD4E4E',
		'#F67ECE',
		'#B77AC7',
		'#3869B2',
		'#121212',
		'#CDCDCD',
		'#FFFBEB',
		'#FFFFF7',
	];

	const translateX = useSharedValue(0);
	const translateY = useSharedValue(0);
	const scale = useSharedValue(1);

	const [currentColor, setCurrentColor] = useState<string>(colors[0]);

	const adjustedTranslateX = useDerivedValue(() => {
		return Math.min(Math.max(translateX.value, 0), maxWidth - 45);
	});

	const panGestureEvent = useAnimatedGestureHandler<
		PanGestureHandlerGestureEvent,
		{ x: number }
	>({
		onStart: (_, context) => {
			context.x = adjustedTranslateX.value;
			translateY.value = withSpring(-45);
			scale.value = withSpring(1.2);
		},
		onActive: (event, context) => {
			translateX.value = event.translationX + context.x;
		},
		onEnd: () => {
			translateY.value = withSpring(0);
			scale.value = withSpring(1);
		},
	});

	const rStyle = useAnimatedStyle(() => {
		return {
			transform: [
				{ translateX: adjustedTranslateX.value },
				{ translateY: translateY.value },
				{ scale: scale.value },
			],
		};
	});

	const rInternalPickerStyle = useAnimatedStyle(() => {
		const inputRange = colors.map(
			(_, index) => (index / colors.length) * maxWidth
		);

		const numericColor = interpolateColor(translateX.value, inputRange, colors);

		const colorAsNumber =
			typeof numericColor === 'string'
				? parseInt(numericColor, 16)
				: numericColor;

		const backgroundColor = `#${(colorAsNumber >>> 0).toString(16).padStart(6, '0').slice(2).toUpperCase()}`;

		runOnJS(setCurrentColor)(backgroundColor);

		console.log('color', backgroundColor);

		return {
			backgroundColor,
		};
	});

	return (
		<View style={styles.container}>
			<LinearGradient
				colors={colors}
				start={{ x: 0, y: 0 }}
				end={{ x: 1, y: 0 }}
				style={styles.linearGradient}
			/>
			<PanGestureHandler onGestureEvent={panGestureEvent}>
				<Animated.View style={[styles.picker, rStyle]}>
					<Animated.View
						style={[styles.internalPicker, rInternalPickerStyle]}
					/>
				</Animated.View>
			</PanGestureHandler>
			<TouchableOpacity
				onPress={() => {
					console.log('Current:', currentColor);
					onNewColorPress(currentColor);
				}}
				style={styles.button}
			>
				<Text style={styles.buttonText}>Log Background Color</Text>
			</TouchableOpacity>
		</View>

		// <View>
		// 	<PanGestureHandler onGestureEvent={panGestureEvent}>
		// 		<Animated.View style={styles.container}>
		// 			<LinearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
		// 				<Stop offset="0%" stopColor="#4c669f" stopOpacity="1" />
		// 				<Stop offset="100%" stopColor="#3b5998" stopOpacity="1" />
		// 			</LinearGradient>
		// 			<Animated.View style={[styles.picker, rStyle]}>
		// 				<Animated.View
		// 					style={[styles.internalPicker, rInternalPickerStyle]}
		// 				/>
		// 			</Animated.View>
		// 		</Animated.View>
		// 	</PanGestureHandler>
		// 	<TouchableOpacity
		// 		onPress={() => {
		// 			console.log('Current:', currentColor);
		// 			onNewColorPress(currentColor);
		// 		}}
		// 		style={styles.button}
		// 	>
		// 		<Text style={styles.buttonText}>Log Background Color</Text>
		// 	</TouchableOpacity>
		// </View>
	);
};

const PICKERSIZE = 45;
const INTERNALPICKERSIZE = PICKERSIZE / 2;

const styles = StyleSheet.create({
	// container: {
	// 	alignItems: 'center',
	// 	justifyContent: 'center',
	// },
	// internalPicker: {
	// 	height: INTERNALPICKERSIZE,
	// 	width: INTERNALPICKERSIZE,
	// 	borderRadius: INTERNALPICKERSIZE / 2,
	// 	borderWidth: 1,
	// 	borderColor: 'black', // Add border color for visibility
	// 	alignSelf: 'center', // Center horizontally
	// 	justifyContent: 'center', // Center vertically
	// },
	// picker: {
	// 	position: 'absolute',
	// 	backgroundColor: 'white',
	// 	height: PICKERSIZE,
	// 	width: PICKERSIZE,
	// 	borderRadius: PICKERSIZE / 2,
	// },
	// button: {
	// 	marginTop: 20,
	// 	backgroundColor: '#007BFF',
	// 	paddingVertical: 10,
	// 	paddingHorizontal: 20,
	// 	borderRadius: 5,
	// },
	// buttonText: {
	// 	color: 'white',
	// 	fontWeight: 'bold',
	// },
	// linearGradient: {
	// 	flex: 1,
	// },
	container: {
		alignItems: 'center',
		justifyContent: 'center',
		flex: 1,
	},
	internalPicker: {
		height: INTERNALPICKERSIZE,
		width: INTERNALPICKERSIZE,
		borderRadius: INTERNALPICKERSIZE / 2,
		borderWidth: 1,
		borderColor: 'black',
		alignSelf: 'center',
		justifyContent: 'center',
	},
	picker: {
		position: 'absolute',
		backgroundColor: 'white',
		height: PICKERSIZE,
		width: PICKERSIZE,
		borderRadius: PICKERSIZE / 2,
	},
	button: {
		marginTop: 20,
		backgroundColor: '#007BFF',
		paddingVertical: 10,
		paddingHorizontal: 20,
		borderRadius: 5,
	},
	buttonText: {
		color: 'white',
		fontWeight: 'bold',
	},
	linearGradient: {
		position: 'absolute',
		width: '90%',
		height: 200,
	},
});

export default ColorPicker;
