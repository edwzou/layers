import { View, StyleSheet } from 'react-native';
import React, {
	useEffect,
	useState,
	useContext,
	type ReactElement,
} from 'react';
import { FlatList } from 'react-native-gesture-handler';
import { baseUrl } from '../../utils/apiUtils';
import axios from 'axios';
import ItemCell from '../../components/Cell/ItemCell';
import GlobalStyles from '../../constants/GlobalStyles';
import StackedTextbox from '../../components/Textbox/StackedTextbox';
import { ITEM_SIZE } from '../../utils/GapCalc';
import { screenHeight } from '../../utils/modalMaxShow';
import { type UserClothing } from '../../types/Clothing';
import { axiosEndpointErrorHandler } from '../../utils/ErrorHandlers';
import { toast, match as matchHeading } from '../../constants/GlobalStrings';
import {
	showErrorToast,
	showSuccessToast,
} from '../../components/Toasts/Toasts';
import { useNavigation } from '@react-navigation/native';
import { type NativeStackNavigationProp } from '@react-navigation/native-stack';
import { type StackTypes } from '../../utils/StackNavigation';
import { Loading } from '../../components/Loading/Loading';
import { StackNavigation, StepOverTypes } from '../../constants/Enums';
import Header from '../../components/Header/Header';
import { emptyClothing } from '../../constants/Clothing';
import { MainPageContext } from '../../pages/Main/MainPage';

const OutfitPreview = ({ route }: any): ReactElement => {
	const navigation = useNavigation<NativeStackNavigationProp<StackTypes>>();

	const { matchItems } = route.params;

	const { setShouldRefreshMainPage } = useContext(MainPageContext);

	const [text, setText] = useState('');
	const [isLoading, setIsLoading] = useState(false); // Add loading state
	const [rawData, setRawData] = useState<UserClothing[]>([]);
	const [data, setData] = useState<UserClothing[]>([]);
	const onInputChange = (text: string): void => {
		setText(text);
	};
	const [match, setMatch] = useState({
		previewData: {
			outerwear: { ...emptyClothing },
			tops: { ...emptyClothing },
			bottoms: { ...emptyClothing },
			shoes: { ...emptyClothing },
		},
		matchName: '',
	});

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

	const onSubmit = (): void => {
		const clothingItems = [
			match.previewData.outerwear !== null &&
			match.previewData.outerwear !== undefined
				? match.previewData.outerwear.ciid
				: null,
			match.previewData.tops !== null && match.previewData.tops !== undefined
				? match.previewData.tops.ciid
				: null,
			match.previewData.bottoms !== null &&
			match.previewData.bottoms !== undefined
				? match.previewData.bottoms.ciid
				: null,
			match.previewData.shoes !== null && match.previewData.shoes !== undefined
				? match.previewData.shoes.ciid
				: null,
		].filter((item) => item !== null);
		console.log('item: ', clothingItems);

		const onSubmitInner = async (): Promise<void> => {
			setIsLoading(true); // Start loading
			try {
				const response = await axios.post(`${baseUrl}/api/private/outfits`, {
					title: match.matchName,
					clothing_items: clothingItems,
				});

				if (response.status === 200) {
					// alert(`You have created: ${JSON.stringify(response.data)}`);

					navigation.goBack();
					setShouldRefreshMainPage(true);
					// navigationArray[0](); // Uncomment this to navigate to profile page
					showSuccessToast(toast.yourOutfitHasBeenCreated);
				} else {
					showErrorToast(toast.anErrorHasOccurredWhileCreatingOutfit);
					// throw new Error('An error has occurred while submitting outfit');
				}
				setIsLoading(false); // Stop loading on success
			} catch (error) {
				setIsLoading(false); // Stop loading on error
				axiosEndpointErrorHandler(error);
			}
		};
		void onSubmitInner();
	};
	return (
		<View style={styles.container}>
			<Header
				text={StackNavigation.OutfitPreview}
				rightButton={true}
				rightStepOverType={StepOverTypes.done}
				rightButtonAction={() => {
					onSubmit();
				}}
			/>
			<View style={styles.containerInner}>
				<StackedTextbox
					label={matchHeading.matchName}
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
		</View>
	);
};

const styles = StyleSheet.create({
	containerInner: {
		marginHorizontal: GlobalStyles.layout.xGap,
		gap: GlobalStyles.layout.gap,
	},
	container: {
		gap: GlobalStyles.layout.gap,
		paddingTop: 20,
	},
});

export default OutfitPreview;
