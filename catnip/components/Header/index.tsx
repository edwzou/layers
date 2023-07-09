import { ReactElement } from 'react';

import { Text, Pressable } from 'react-native';
import React from 'react';
import GlobalStyles from '../../constants/GlobalStyles';
import { StepOverTypes } from '../../constants/Enums';
import Icon from 'react-native-remix-icon';

export type ModalPropTypes = {
	title: string;
	stepOver?: { type: string, handlePress: () => void };
	content: ReactElement;
};

export const stepOverHandler = (props: ModalPropTypes['stepOver']) => {
	switch (props?.type) {
		case StepOverTypes.next: {
			return (
				<Pressable
					onPress={props.handlePress}
					style={{ position: 'absolute', right: 0 }}
				>
					<Icon
						name={GlobalStyles.icons.nextOutline}
						color={GlobalStyles.colorPalette.primary[500]}
						size={GlobalStyles.sizing.icon}
					/>
				</Pressable>
			);
		}
	}
};
