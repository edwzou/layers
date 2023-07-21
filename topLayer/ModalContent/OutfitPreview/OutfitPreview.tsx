import { View, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import { FlatList } from 'react-native-gesture-handler';

import ItemCell from '../../components/Cell/ItemCell';
import GlobalStyles from '../../constants/GlobalStyles';
import StackedTextbox from '../../components/Textbox/StackedTextbox';

import { ITEM_SIZE } from '../../utils/GapCalc';
import { screenHeight } from '../../utils/modalMaxShow';
import { UserClothing } from '../../pages/Match';
import { match } from '../../constants/GlobalStrings';

type OutfitPreviewPropsType = {
	outerwear: UserClothing,
	tops: UserClothing,
	bottoms: UserClothing,
	shoes: UserClothing,
	matchName: (text: string) => void;
}

const OutfitPreview = ({ outerwear, tops, bottoms, shoes, matchName }: OutfitPreviewPropsType) => {
	const [text, setText] = useState('');
	const [rawData, setRawData] = useState<UserClothing[]>([]);
	const [data, setData] = useState<UserClothing[]>([]);
	const onInputChange = (text: string) => {
		setText(text);
		matchName(text);
	};

	useEffect(() => {
		setRawData([outerwear, tops, bottoms, shoes])
	}, [outerwear, tops, bottoms, shoes])

	useEffect(() => {
		setData(rawData.filter(Boolean))
	}, [rawData])

	return (
		<View style={styles.container}>
			<StackedTextbox
				label={match.matchName}
				onFieldChange={onInputChange}
				value={text}
			/>
			<FlatList
				data={data}
				renderItem={({ item }) =>
					<View style={{ width: ITEM_SIZE(2) }}>
						<ItemCell image={item.image} disablePress={false} key={item.id} />
					</View>
				}
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
