import { StyleSheet, Text, View } from 'react-native';
import React, { type ReactElement } from 'react';
import ItemCell from '../../components/Cell/ItemCell';
import GlobalStyles from '../../constants/GlobalStyles';
import { ScrollView } from 'react-native-gesture-handler';
import { StepOverTypes, TagAction } from '../../constants/Enums';
import ColorTagsList from '../../components/ColorManager/ColorTagsList';
import { type UserClothing } from '../../types/Clothing';
import Header from '../../components/Header/Header';

interface ItemViewPropsType {
	clothingItem: UserClothing;
	directToItemEdit?: () => void;
}

const ItemView = ({
	clothingItem,
	directToItemEdit,
}: ItemViewPropsType): ReactElement => {
	return (
		<View style={styles.container}>
			<Header
				text={clothingItem.title}
				rightButton={
					directToItemEdit !== null && directToItemEdit !== undefined
				}
				rightStepOverType={StepOverTypes.edit}
				rightButtonAction={directToItemEdit}
			/>
			<ScrollView>
				<View style={styles.content}>
					<ItemCell imageUrl={clothingItem.image_url} />
					<View style={styles.categoryContainer}>
						{clothingItem.color.length > 0 ? (
							<Text style={styles.subheader}>Colors</Text>
						) : null}
						<ColorTagsList
							data={clothingItem.color}
							tagAction={TagAction.static}
						/>
					</View>
				</View>
			</ScrollView>
		</View>
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
	subheader: {
		...GlobalStyles.typography.body,
	},
	categoryContainer: {
		gap: 10,
	},
});
