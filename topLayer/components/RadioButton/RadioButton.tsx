import { Pressable, StyleSheet, Text, View } from 'react-native';
import React, { useContext, useState } from 'react';
import GlobalStyles from '../../constants/GlobalStyles';
import { ITEM_SIZE } from '../../utils/GapCalc';
import { UserContext } from '../../utils/UserContext';

interface RadioButtonPropsType {
	privateData: any;
	onSelect: any;
}

const RadioButton = ({ privateData, onSelect }: RadioButtonPropsType) => {
	const { data } = useContext(UserContext);

	let option = false as {};

	if (data) {
		const { private_option } = data;
		console.log(private_option);
		option = private_option ? private_option : false;
	}

	const savedOption = option ? 'Private' : 'Public';

	const [userOption, setUserOption] = useState(savedOption ?? 'Public');

	return (
		<View style={{ flexDirection: 'row', gap: GlobalStyles.layout.gap }}>
			{privateData.map((item: any) => {
				return (
					<Pressable
						onPress={() => {
							setUserOption(item.value);
							onSelect('private_option', item.boolean);
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
