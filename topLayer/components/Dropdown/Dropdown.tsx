import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import GlobalStyles from '../../constants/GlobalStyles';
import Icon from 'react-native-remix-icon';

interface DropdownType {
	// !!! Fix Types
	label: string;
	open: boolean;
	setOpen: (open: boolean) => void;
	value: string;
	setValue: (value: string | null) => void;
	items: Array<{ label: string; value: any }>;
	setItems: any;
}

const Dropdown = ({
	label,
	open,
	setOpen,
	value,
	setValue,
	items,
	setItems,
}: DropdownType) => {
	return (
		<View style={styles.container}>
			<Text
				style={[
					{
						paddingHorizontal: 10,
						paddingTop: 10,
						color: GlobalStyles.colorPalette.primary[400],
					},
					GlobalStyles.typography.body2,
				]}
			>
				{label}
			</Text>
			<DropDownPicker
				open={open}
				value={value}
				items={items}
				setOpen={setOpen}
				setValue={setValue}
				setItems={setItems}
				selectedItemContainerStyle={{
					backgroundColor: GlobalStyles.colorPalette.primary[300] + '50',
				}}
				showTickIcon={false}
				ArrowDownIconComponent={() => (
					<Icon
						name={GlobalStyles.icons.downFillArrow}
						color={GlobalStyles.colorPalette.primary[300]}
					/>
				)}
				ArrowUpIconComponent={() => (
					<Icon
						name={GlobalStyles.icons.upFillArrow}
						color={GlobalStyles.colorPalette.primary[300]}
					/>
				)}
				dropDownContainerStyle={styles.dropdown}
				style={styles.dropdown}
				placeholder=""
			/>
		</View>
	);
};

export default Dropdown;

const styles = StyleSheet.create({
	container: {
		backgroundColor: GlobalStyles.colorPalette.primary[200],
		borderRadius: GlobalStyles.utils.smallRadius.borderRadius,
	},
	dropdown: {
		borderWidth: 0,
		backgroundColor: GlobalStyles.colorPalette.primary[200],
	},
});
