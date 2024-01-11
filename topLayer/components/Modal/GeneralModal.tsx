import { View, Text, StyleSheet } from 'react-native';
import React, {
	forwardRef,
	useCallback,
	useImperativeHandle,
	type ReactElement,
} from 'react';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
	useAnimatedProps,
	useAnimatedStyle,
	useSharedValue,
	withSpring,
	withTiming,
} from 'react-native-reanimated';

import { screenHeight, screenWidth } from '../../utils/modalMaxShow';

import GlobalStyles from '../../constants/GlobalStyles';

export interface refPropType {
	scrollTo: (destination: number) => void;
	isActive: () => boolean;
}
export interface ModalPropTypes {
	title?: string;
	back?: boolean;
	height: number;
	stepOver?: { type: string; handlePress: () => void };
	content: ReactElement;
	dim?: boolean;
}

const GeneralModal = forwardRef(
	({ title, height, content, dim = true }: ModalPropTypes, ref) => {
		const active = useSharedValue(false);

		const translateY = useSharedValue(0);
		const context = useSharedValue({ y: 0 });

		const isActive = useCallback(() => {
			return active.value;
		}, []);

		const scrollTo = useCallback((destination: number) => {
			'worklet';

			active.value = destination !== 0;
			translateY.value = withSpring(destination, { damping: 20 });
		}, []);

		useImperativeHandle(ref, () => ({ scrollTo, isActive }), [
			scrollTo,
			isActive,
		]);

		const gesture = Gesture.Pan()
			.onStart(() => {
				context.value = { y: translateY.value };
			})
			.onUpdate((e) => {
				translateY.value = e.translationY + context.value.y;
				translateY.value = Math.max(translateY.value, height);
			})
			.onEnd(() => {
				if (translateY.value > -screenHeight / 3.5) {
					scrollTo(0);
				} else if (translateY.value <= -screenHeight / 3.5) {
					scrollTo(height);
				}
			});

		const modalGestureStyle = useAnimatedStyle(() => {
			return {
				transform: [{ translateY: translateY.value }],
			};
		});

		const backdropStyle = useAnimatedStyle(() => {
			return {
				opacity: withTiming(active.value ? 1 : 0),
			};
		}, []);

		const backdropProps = useAnimatedProps(() => {
			return {
				pointerEvents: active.value ? ('auto' as const) : ('none' as const),
			};
		}, []);

		return (
			<>
				<Animated.View
					animatedProps={backdropProps}
					onTouchStart={() => {
						scrollTo(0);
					}}
					style={[
						{
							...StyleSheet.absoluteFillObject,
							backgroundColor: dim
								? GlobalStyles.colorPalette.primary[500] + '20'
								: 'transparent',
						},
						backdropStyle,
					]}
				/>
				<GestureDetector gesture={gesture}>
					<Animated.View style={[styles.container, modalGestureStyle]}>
						{title !== null && title !== undefined && title !== '' && (
							<View style={styles.header}>
								<Text style={GlobalStyles.typography.subtitle}>{title}</Text>
							</View>
						)}
						<View style={{ flex: 1 }}>{content}</View>
					</Animated.View>
				</GestureDetector>
			</>
		);
	}
);

GeneralModal.displayName = 'General Modal';

const styles = StyleSheet.create({
	container: {
		height: screenHeight,
		paddingTop: 15,
		width: screenWidth,
		backgroundColor: GlobalStyles.colorPalette.card[200],
		position: 'absolute',
		top: screenHeight,
		gap: 5,
		zIndex: 10,
		flex: 1,
		shadowColor: GlobalStyles.colorPalette.primary[500],
		...GlobalStyles.utils.modalShadow,
	},
	header: {
		display: 'flex',
		flexDirection: 'row',
		width: screenWidth,
		justifyContent: 'center',
		alignItems: 'center',
	},
});

export default GeneralModal;
