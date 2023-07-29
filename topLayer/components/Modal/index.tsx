import { ReactElement } from 'react';

import { Text, Pressable } from 'react-native';
import React from 'react';
import GlobalStyles from '../../constants/GlobalStyles';
import { StepOverTypes } from '../../constants/Enums';
import Icon from 'react-native-remix-icon';

export type ModalPropTypes = {
	title: string;
	back?: boolean;
	height?: number;
	stepOver?: { type: string, handlePress: () => void };
	content: ReactElement;
};

export const stepOverHandler = (props: ModalPropTypes['stepOver']) => {
	switch (props?.type) {
		case StepOverTypes.send: {
			return (
				<Pressable
					onPress={props.handlePress}
					style={{ position: 'absolute', right: GlobalStyles.layout.xGap }}
				>
					<Icon
						name={GlobalStyles.icons.sendOutline}
						color={GlobalStyles.colorPalette.info[500]}
						size={GlobalStyles.sizing.icon.regular}
					/>
				</Pressable>
			);
		}
		case StepOverTypes.edit: {
			return (
				<Pressable
					onPress={props.handlePress}
					style={{ position: 'absolute', right: GlobalStyles.layout.xGap }}
				>
					<Text
						style={[
							{ color: GlobalStyles.colorPalette.info[500] },
							GlobalStyles.typography.body,
						]}
					>
						Edit
					</Text>
				</Pressable>
			);
		}
		case StepOverTypes.done: {
			return (
				<Pressable
					onPress={props.handlePress}
					style={{ position: 'absolute', right: GlobalStyles.layout.xGap }}
				>
					<Text
						style={[
							{ color: GlobalStyles.colorPalette.info[500] },
							GlobalStyles.typography.body,
						]}
					>
						Done
					</Text>
				</Pressable>
			);
		}
	}
};
