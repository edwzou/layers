import { StyleSheet, View } from 'react-native';
import React, { type ReactElement } from 'react';
import ItemCell from '../../components/Cell/ItemCell';
import GlobalStyles from '../../constants/GlobalStyles';
import { FlatList } from 'react-native-gesture-handler';
import { type UserClothing } from '../../types/Clothing';
import { ITEM_SIZE } from '../../utils/GapCalc';
import { screenHeight } from '../../utils/modalMaxShow';

interface OutfitLayoutProps {
	data: UserClothing[];
	headerComponent?: ReactElement;
	footerComponent?: ReactElement;
}

const OutfitBlockLayout = ({
	data,
	headerComponent,
	footerComponent,
}: OutfitLayoutProps): ReactElement => {
	return (
		<FlatList
			data={data}
			renderItem={({ item }) => {
				return (
					<View style={{ width: ITEM_SIZE(2) }}>
						<ItemCell imageUrl={item.image_url} />
					</View>
				);
			}}
			keyExtractor={(item) => {
				return item.ciid;
			}}
			style={styles.content}
			numColumns={2}
			showsVerticalScrollIndicator={false}
			contentContainerStyle={{ gap: GlobalStyles.layout.gap }}
			columnWrapperStyle={{ gap: GlobalStyles.layout.gap }}
			ListHeaderComponent={headerComponent}
			ListFooterComponent={
				<>
					{footerComponent}
					<View style={{ padding: screenHeight * 0.05 }} />
				</>
			}
		/>
	);
};

export default OutfitBlockLayout;

const styles = StyleSheet.create({
	content: {
		gap: GlobalStyles.layout.gap,
		flex: 1,
	},
});
