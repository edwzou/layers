import { View, StyleSheet } from 'react-native';
import React, { useEffect, useState, useContext } from 'react';
import { FlatList } from 'react-native-gesture-handler';

import ItemCell from '../../components/Cell/ItemCell';
import GlobalStyles from '../../constants/GlobalStyles';
import StackedTextbox from '../../components/Textbox/StackedTextbox';

import { ITEM_SIZE } from '../../utils/GapCalc';
import { screenHeight } from '../../utils/modalMaxShow';
import { type UserClothing } from '../../pages/Match';
import { match } from '../../constants/GlobalStrings';

import { MatchPageContext } from '../../pages/Match/MatchPage';

const OutfitPreview = ({ route }: any) => {

	const { matchItems, matchName } = route.params;

	const { setMatch } = useContext(MatchPageContext);

	const [text, setText] = useState('');
	const [rawData, setRawData] = useState<UserClothing[]>([]);
	const [data, setData] = useState<UserClothing[]>([]);
	const onInputChange = (text: string) => {
		setText(text);
		matchName(text);
	};

	useEffect(() => {
		setRawData([matchItems.outerwear, matchItems.tops, matchItems.bottoms, matchItems.shoes]);
		setMatch({
			previewData: matchItems,
			matchName: matchName,
		})
	}, [matchItems.outerwear, matchItems.tops, matchItems.bottoms, matchItems.shoes]);

	useEffect(() => {
		setData(rawData.filter(Boolean));
	}, [rawData]);

	return (
		<View style={styles.container}>
			<StackedTextbox
				label={match.matchName}
				onFieldChange={onInputChange}
				value={text}
			/>
			<FlatList
				data={data}
				renderItem={({ item }) => (
					<View style={{ width: ITEM_SIZE(2) }}>
						<ItemCell imageUrl={item.image_url} disablePress={false} key={item.ciid} />
					</View>
				)}
				numColumns={2}
				contentContainerStyle={{ gap: GlobalStyles.layout.gap }}
				columnWrapperStyle={{ gap: GlobalStyles.layout.gap }}
				style={{ height: screenHeight - 350 }}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		marginHorizontal: GlobalStyles.layout.xGap,
		gap: GlobalStyles.layout.gap,
	},
});

export default OutfitPreview;
