import { Pressable, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import GlobalStyles from '../../constants/GlobalStyles';
import { ITEM_SIZE } from '../../utils/GapCalc';

type RadioButtonPropsType = {
	data: any;
	onSelect: any;
};

const RadioButton = ({ data, onSelect }: RadioButtonPropsType) => {
	const [userOption, setUserOption] = useState('Public');

	return (
		<View style={{ flexDirection: 'row', gap: GlobalStyles.layout.gap }}>
			{data.map((item: any) => {
				return (
					<Pressable
						onPress={() => {
							setUserOption(item.value);
							onSelect('privacy', item.boolean);
						}}
						style={[
							item.value === userOption ? styles.selected : null,
							styles.radioButton,
						]}
						key={item.value}
					>
						<Text style={item.value === userOption ? null : styles.unselected}>
							{item.value}
						</Text>
					</Pressable>
				);
			})}
		</View>
	);
};

export default RadioButton;

const styles = StyleSheet.create({
	radioButton: {
		padding: 20,
		width: ITEM_SIZE(),
		borderRadius: GlobalStyles.utils.smallRadius.borderRadius,
		justifyContent: 'center',
		alignItems: 'center',
		color: GlobalStyles.colorPalette.primary[500],
	},
	selected: {
		backgroundColor: GlobalStyles.colorPalette.primary[200],
	},
	unselected: {
		color: GlobalStyles.colorPalette.primary[300],
	},
});
