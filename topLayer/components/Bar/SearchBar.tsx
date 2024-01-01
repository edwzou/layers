import React, { type ReactElement, useRef } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import Icon from 'react-native-remix-icon';
import GlobalStyles from '../../constants/GlobalStyles';

interface SearchBarPropsType {
	placeholder: string;
	searchQuery: string;
	handleSearch: (text: string) => void;
}

const SearchBar = ({
	placeholder,
	searchQuery,
	handleSearch,
}: SearchBarPropsType): ReactElement => {
	const textInputRef = useRef<TextInput>(null);

	return (
		<View style={styles.searchBar}>
			<Icon
				name={GlobalStyles.icons.searchOutline}
				color={GlobalStyles.colorPalette.primary[400]}
				size={GlobalStyles.sizing.icon.small}
			/>
			<TextInput
				ref={textInputRef}
				autoCapitalize={'none'}
				style={{ flex: 1, ...GlobalStyles.typography.body }}
				placeholder={placeholder}
				placeholderTextColor={GlobalStyles.colorPalette.primary[400]}
				value={searchQuery}
				onChangeText={handleSearch}
				clearButtonMode="while-editing"
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	searchBar: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingHorizontal: 14,
		paddingVertical: 12,
		backgroundColor: GlobalStyles.colorPalette.primary[200],
		borderRadius: 10,
		gap: GlobalStyles.layout.gap,
	},
});

export default SearchBar;
