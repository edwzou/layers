import { ReactElement } from 'react';

import { Text, Pressable } from 'react-native';
import React from 'react';
import GlobalStyles from '../../constants/GlobalStyles';
import { stepOverTypes } from '../../utils/Stepover';
import Icon from 'react-native-remix-icon';

export type ModalPropTypes = {
	title: string;
	stepOver?: {
		type: string;
		url: string;
	};
	content: ReactElement;
};

export const stepOverHandler = (prop: ModalPropTypes['stepOver']) => {
	switch (prop?.type) {
		case stepOverTypes.send: {
			return (
				<Pressable
					onPress={() => {
						// !!! send some request with prop.url
						console.log('Header Press');
					}}
					style={{ position: 'absolute', right: 0 }}
				>
					<Icon
						name={GlobalStyles.icons.sendOutline}
						color={GlobalStyles.colorPalette.info[500]}
						size={GlobalStyles.sizing.icon}
					/>
				</Pressable>
			);
		}
		case stepOverTypes.edit: {
			return (
				<Pressable
					onPress={() => {
						// !!! send some request with prop.url
						console.log('Header Press');
					}}
					style={{ position: 'absolute', right: 0 }}
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
		case stepOverTypes.done: {
			return (
				<Pressable
					onPress={() => {
						// !!! send some request with prop.url
						console.log('Header Press');
					}}
					style={{ position: 'absolute', right: 0 }}
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
