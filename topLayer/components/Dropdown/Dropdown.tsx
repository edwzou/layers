import { StyleSheet, Text, View } from 'react-native';
import React, {
	type Dispatch,
	type ReactElement,
	type SetStateAction,
} from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import GlobalStyles from '../../constants/GlobalStyles';
import Icon from 'react-native-remix-icon';

DropDownPicker.setListMode('SCROLLVIEW');

interface DropdownType {
	label: string;
	open: boolean;
	setOpen: Dispatch<SetStateAction<boolean>>;
	value: string;
	setValue: Dispatch<SetStateAction<string>>;
	items: Array<{ label: string; value: any }>;
	setItems: Dispatch<SetStateAction<any[]>>;
}

const Dropdown = ({
	label,
	open,
	setOpen,
	value,
	setValue,
	items,
	setItems,
}: DropdownType): ReactElement => {
	return (
		<View
			style={[
				styles.container,
				open
					? [
							{
								shadowColor: GlobalStyles.colorPalette.primary[500],
							},
							GlobalStyles.utils.dropdownShadow,
					  ] // eslint-disable-line no-mixed-spaces-and-tabs
					: undefined,
			]}
		>
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
				dropDownDirection="TOP"
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
