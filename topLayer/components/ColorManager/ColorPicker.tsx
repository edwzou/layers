import React, { useState } from 'react';
import {
	Dimensions,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';
import {
	PanGestureHandler,
	type PanGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
// eslint-disable-next-line import/default
import Animated, {
	interpolateColor,
	useAnimatedGestureHandler,
	useAnimatedStyle,
	useDerivedValue,
	useSharedValue,
	withSpring,
	runOnJS,
} from 'react-native-reanimated';
import LinearGradient from 'react-native-linear-gradient';

interface ColorPickerPropsType {
	onNewColorPress: (colorToAdd: string) => void;
}

const ColorPicker: React.FC<ColorPickerPropsType> = ({ onNewColorPress }) => {
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
		return Math.min(Math.max(translateX.value, 0), windowWidth - 45);
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
			(_, index) => (index / colors.length) * windowWidth
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
			<PanGestureHandler onGestureEvent={panGestureEvent}>
				<Animated.View style={styles.innerContainer}>
					<LinearGradient
						colors={colors}
						start={{ x: 0, y: 0 }}
						end={{ x: 1, y: 0 }}
						style={styles.linearGradient}
					></LinearGradient>
					<Animated.View style={[styles.picker, rStyle]}>
						<Animated.View
							style={[styles.internalPicker, rInternalPickerStyle]}
						/>
					</Animated.View>
				</Animated.View>
			</PanGestureHandler>
			<TouchableOpacity
				onPress={() => {
					console.log('Current:', currentColor);
					onNewColorPress(currentColor);
				}}
				style={styles.button}
			>
				<Text style={styles.buttonText}>Choose color</Text>
			</TouchableOpacity>
		</View>
	);
};

const windowWidth = Dimensions.get('window').width * 0.9;
const PICKERSIZE = 45;
const INTERNALPICKERSIZE = PICKERSIZE / 2;

const styles = StyleSheet.create({
	container: {
		paddingTop: '11%',
		alignItems: 'center',
		justifyContent: 'center',
	},
	innerContainer: {
		justifyContent: 'center',
	},
	linearGradient: {
		width: windowWidth,
		height: 45,
		borderRadius: 25,
	},
	picker: {
		position: 'absolute',
		backgroundColor: 'white',
		height: PICKERSIZE,
		width: PICKERSIZE,
		borderRadius: PICKERSIZE / 2,
		alignItems: 'center',
		justifyContent: 'center',
	},
	internalPicker: {
		height: INTERNALPICKERSIZE,
		width: INTERNALPICKERSIZE,
		borderRadius: INTERNALPICKERSIZE / 2,
		borderWidth: 1,
		borderColor: 'black',
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
});

export default ColorPicker;
