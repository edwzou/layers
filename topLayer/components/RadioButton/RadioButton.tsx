import { Pressable, StyleSheet, Text, View } from 'react-native';
import React, { type ReactElement, useState } from 'react';
import GlobalStyles from '../../constants/GlobalStyles';
import { ITEM_SIZE } from '../../utils/GapCalc';

interface RadioButtonPropsType {
	privateData: any[];
	onSelect: (option: any) => void;
	choice: string;
}

const RadioButton = ({
	privateData,
	onSelect,
	choice,
}: RadioButtonPropsType): ReactElement => {
	const [userOption, setUserOption] = useState(choice);

	return (
		<View style={{ flexDirection: 'row', gap: GlobalStyles.layout.gap }}>
			{privateData.map((item: any) => {
				return (
					<Pressable
						onPress={() => {
							setUserOption(item.value);
							onSelect(item); // Pass the entire item to the onSelect function
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
