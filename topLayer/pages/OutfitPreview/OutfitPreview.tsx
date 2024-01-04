import { View, StyleSheet } from 'react-native';
import React, {
	useEffect,
	useState,
	useContext,
	type ReactElement,
} from 'react';
import { FlatList } from 'react-native-gesture-handler';

import ItemCell from '../../components/Cell/ItemCell';
import GlobalStyles from '../../constants/GlobalStyles';
import StackedTextbox from '../../components/Textbox/StackedTextbox';

import { ITEM_SIZE } from '../../utils/GapCalc';
import { screenHeight } from '../../utils/modalMaxShow';
import { type UserClothing } from '../../types/Clothing';
import { match } from '../../constants/GlobalStrings';

import { MatchPageContext } from '../../pages/Match/MatchPage';

import { useNavigation } from '@react-navigation/native';
import { type NativeStackNavigationProp } from '@react-navigation/native-stack';
import { type StackTypes } from 'utils/StackNavigation';
import { Loading } from '../../components/Loading/Loading';

const OutfitPreview = ({ route }: any): ReactElement => {
	const navigation = useNavigation<NativeStackNavigationProp<StackTypes>>();

	const { matchItems } = route.params;

	const { setMatch, dismissal, isLoading } = useContext(MatchPageContext);

	const [text, setText] = useState('');
	const [rawData, setRawData] = useState<UserClothing[]>([]);
	const [data, setData] = useState<UserClothing[]>([]);
	const onInputChange = (text: string): void => {
		setText(text);
	};

	useEffect(() => {
		setRawData([
			matchItems.outerwear,
			matchItems.tops,
			matchItems.bottoms,
			matchItems.shoes,
		]);
		setMatch({
			previewData: matchItems,
			matchName: text,
		});
	}, [
		matchItems.outerwear,
		matchItems.tops,
		matchItems.bottoms,
		matchItems.shoes,
		text,
	]);

	useEffect(() => {
		setData(rawData.filter(Boolean));
	}, [rawData]);

	useEffect(() => {
		if (dismissal) {
			navigation.goBack();
		}
	}, [dismissal]);

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
						<ItemCell
							imageUrl={item.image_url}
							disablePress={false}
							key={item.ciid}
						/>
					</View>
				)}
				numColumns={2}
				contentContainerStyle={{ gap: GlobalStyles.layout.gap }}
				columnWrapperStyle={{ gap: GlobalStyles.layout.gap }}
				style={{ height: screenHeight - 350 }}
			/>

			{isLoading && <Loading />}
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
