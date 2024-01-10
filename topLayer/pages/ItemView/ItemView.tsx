import { StyleSheet, Text, View } from 'react-native';
import React, { type ReactElement } from 'react';
import ItemCell from '../../components/Cell/ItemCell';
import GlobalStyles from '../../constants/GlobalStyles';
import { ScrollView } from 'react-native-gesture-handler';
import {
	StackNavigation,
	StepOverTypes,
	TagAction,
} from '../../constants/Enums';
import ColorTagsList from '../../components/ColorManager/ColorTagsList';
import { type UserClothing } from '../../types/Clothing';
import Header from '../../components/Header/Header';
import { type NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { type StackTypes } from '../../utils/StackNavigation';

interface ItemViewPropsType {
	clothingItem: UserClothing;
	editable: boolean;
}

const ItemView = ({
	clothingItem,
	editable,
}: ItemViewPropsType): ReactElement => {
	const navigation = useNavigation<NativeStackNavigationProp<StackTypes>>();
	const directToItemEdit = (): void => {
		navigation.navigate(StackNavigation.ItemEdit, {});
	};
	return (
		<ScrollView>
			<View style={styles.container}>
				<Header
					text={clothingItem.title}
					rightButton={editable}
					rightStepOverType={StepOverTypes.edit}
					rightButtonAction={directToItemEdit}
				/>
				<View style={styles.content}>
					<View style={{ flex: 1 }}>
						<ItemCell imageUrl={clothingItem.image_url} disablePress />
					</View>
					<View style={styles.categoryContainer}>
						{clothingItem.color.length > 0 && (
							<Text style={styles.subheader}>Colors</Text>
						)}
						<ColorTagsList
							data={clothingItem.color}
							tagAction={TagAction.static}
						/>
					</View>
				</View>
			</View>
		</ScrollView>
	);
};

export default ItemView;

const styles = StyleSheet.create({
	container: {
		gap: GlobalStyles.layout.gap,
		flex: 1,
		paddingTop: 20,
	},
	content: {
		gap: GlobalStyles.layout.gap,
		paddingHorizontal: GlobalStyles.layout.xGap,
	},
	items: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		flexWrap: 'wrap',
		gap: GlobalStyles.layout.gap,
		flex: 1,
	},
	subheader: {
		...GlobalStyles.typography.body,
	},
	categoryContainer: {
		gap: 10,
	},
	tagsContainer: {
		flexDirection: 'row',
		gap: 10,
	},
});
