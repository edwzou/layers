import { View, Text, StyleSheet, Pressable } from 'react-native';
import React, { forwardRef, useCallback, useImperativeHandle } from 'react';

import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { useAnimatedProps, useAnimatedStyle, useSharedValue, withSpring, withTiming, } from 'react-native-reanimated';
import { highTranslateY, screenHeight, screenWidth } from '../../utils/modalMaxShow';

import { ModalPropTypes, stepOverHandler } from '.';
import GlobalStyles from '../../constants/GlobalStyles';
import Icon from 'react-native-remix-icon';

export type refPropType = {
	scrollTo: (destination: number) => void;
	isActive: () => boolean;
};

const GeneralModal = forwardRef(
	({ title, stepOver, back = false, content }: ModalPropTypes, ref) => {
		const active = useSharedValue(false);

		const translateY = useSharedValue(0);
		const context = useSharedValue({ y: 0 });

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


		const gesture = Gesture.Pan()
			.onStart(() => {
				context.value = { y: translateY.value };
			})
			.onUpdate((e) => {
				translateY.value = e.translationY + context.value.y;
				translateY.value = Math.max(translateY.value, highTranslateY);
			})
			.onEnd(() => {
				if (translateY.value > -screenHeight / 1.25) {
					scrollTo(0);
				} else if (translateY.value <= -screenHeight / 1.25) {
					scrollTo(highTranslateY);
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
				pointerEvents: active.value ? 'auto' : 'none',
			} as any;
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
							backgroundColor: GlobalStyles.colorPalette.primary[500] + '50',
						},
						backdropStyle,
					]}
				/>
				<GestureDetector gesture={gesture}>
					<Animated.View style={[styles.container, modalGestureStyle]}>
						<View style={styles.header}>
							{back ? <Pressable style={{ position: 'absolute', left: GlobalStyles.layout.xGap }} onPress={() => { scrollTo(0) }}>
								<Icon name={GlobalStyles.icons.backOutline} size={GlobalStyles.sizing.icon.regular} />
							</Pressable>
								: null}
							<Text style={GlobalStyles.typography.subtitle}>{title}</Text>
							{stepOver ? stepOverHandler(stepOver) : null}
						</View>
						<View style={{ flex: 1 }}>
							{content}
						</View>
					</Animated.View>
				</GestureDetector>
			</>
		);
	}
);

const styles = StyleSheet.create({
	container: {
		height: screenHeight,
		paddingTop: 30,
		width: screenWidth,
		backgroundColor: GlobalStyles.colorPalette.background,
		position: 'absolute',
		top: screenHeight,
		gap: 20,
		borderTopRightRadius: 30,
		borderTopLeftRadius: 30,
		zIndex: 10,
		flex: 1
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
