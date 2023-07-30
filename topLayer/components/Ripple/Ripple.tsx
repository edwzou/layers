import {
	type StyleProp,
	StyleSheet,
	Text,
	View,
	type ViewStyle,
} from 'react-native';
import React, { type PropsWithChildren, ReactNode } from 'react';

interface RipplePropsType {
	style?: StyleProp<ViewStyle>;
	onTap?: () => void;
}

const Ripple: React.FC = (
	{ style, onTap }: RipplePropsType,
	{ children }: PropsWithChildren
) => {
	return <View style={style}>{children}</View>;
};

export default Ripple;

const styles = StyleSheet.create({});
