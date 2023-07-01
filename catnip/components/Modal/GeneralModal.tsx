import { View, Text, StyleSheet, Dimensions } from 'react-native';
import React, {
	forwardRef,
	useCallback,
	useEffect,
	useImperativeHandle,
} from 'react';
import GlobalStyles from '../../constants/GlobalStyles';
import { ModalPropTypes, stepOverHandler } from '.';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
	useAnimatedStyle,
	useSharedValue,
	withSpring,
} from 'react-native-reanimated';

const { height: screenHeight } = Dimensions.get('window');

export type refPropType = {
	scrollTo: (destination: number) => void;
	isActive: () => boolean;
};

const GeneralModal = forwardRef(
	({ title, stepOver, content }: ModalPropTypes, ref) => {
		const active = useSharedValue(false);

		const translateY = useSharedValue(0);
		const context = useSharedValue({ y: 0 });
		const maxTranslateY = -screenHeight + 100;

		const isActive = useCallback(() => {
			return active.value;
		}, []);

		const scrollTo = useCallback((destination: number) => {
			'worklet';

			active.value = destination !== 0;
			translateY.value = withSpring(destination, { damping: 50 });
		}, []);

		useImperativeHandle(ref, () => ({ scrollTo, isActive }), [
			scrollTo,
			isActive,
		]);

		// !!! Remove when endpoints are setup (will be a click to toggle)
		useEffect(() => {
			scrollTo(maxTranslateY);
		}, []);

		const gesture = Gesture.Pan()
			.onStart(() => {
				context.value = { y: translateY.value };
			})
			.onUpdate((e) => {
				translateY.value = e.translationY + context.value.y;
				translateY.value = Math.max(translateY.value, maxTranslateY);
			})
			.onEnd(() => {
				if (translateY.value > -screenHeight / 1.25) {
					scrollTo(0);
				} else if (translateY.value <= -screenHeight / 1.25) {
					scrollTo(maxTranslateY);
				}
			});

		const modalGestureStyle = useAnimatedStyle(() => {
			return {
				transform: [{ translateY: translateY.value }],
			};
		});

		return (
			<View
				style={[
					{
						width: '100%',
						height: '100%',
						backgroundColor: GlobalStyles.colorPalette.primary[400],
					},
				]}
			>
				<GestureDetector gesture={gesture}>
					<Animated.View style={[styles.container, modalGestureStyle]}>
						<View style={styles.line}></View>
						<View style={styles.header}>
							<Text style={GlobalStyles.typography.subtitle}>{title}</Text>
							{stepOver ? stepOverHandler(stepOver) : null}
						</View>
						{content}
					</Animated.View>
				</GestureDetector>
			</View>
		);
	}
);

const styles = StyleSheet.create({
	line: {
		width: 75,
		height: 4,
		backgroundColor: GlobalStyles.colorPalette.primary[300],
		borderRadius: 100,
		marginTop: 15,
	},
	container: {
		height: screenHeight,
		width: '100%',
		backgroundColor: GlobalStyles.colorPalette.background,
		position: 'absolute',
		alignItems: 'center',
		top: screenHeight,
		gap: 40,
		borderTopRightRadius: 30,
		borderTopLeftRadius: 30,
		paddingHorizontal: GlobalStyles.layout.xGap,
		zIndex: 10,
	},
	header: {
		display: 'flex',
		flexDirection: 'row',
		width: '100%',
		justifyContent: 'center',
		alignItems: 'center',
	},
});

export default GeneralModal;
