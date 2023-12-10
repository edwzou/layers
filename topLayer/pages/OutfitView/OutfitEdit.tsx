import { View, StyleSheet, Pressable } from 'react-native';
import React, {
	useEffect,
	useState,
	type Dispatch,
	type SetStateAction,
	useContext,
	MutableRefObject,
} from 'react';
import { FlatList } from 'react-native-gesture-handler';

import ItemCell from '../../components/Cell/ItemCell';
import GlobalStyles from '../../constants/GlobalStyles';
import StackedTextbox from '../../components/Textbox/StackedTextbox';

import { ITEM_SIZE } from '../../utils/GapCalc';
import { screenHeight } from '../../utils/modalMaxShow';
import { type UserOutfit } from '.';
import { outfitEdit } from '../../constants/GlobalStrings';

import Icon from 'react-native-remix-icon';
import { UserClothing } from '../../pages/Match';

import { baseUrl } from '../../utils/apiUtils';
import axios from 'axios';
import { axiosEndpointErrorHandler } from '../../utils/ErrorHandlers';
import { MainPageContext } from '../../pages/Main/MainPage';

import { useNavigation } from '@react-navigation/native';
import { type NativeStackNavigationProp } from '@react-navigation/native-stack';
import { type StackTypes } from 'utils/StackNavigation';

// type OutfitPreviewPropsType = {
//     outerwear: UserOutfit,
//     tops: UserOutfit,
//     bottoms: UserOutfit,
//     shoes: UserOutfit,
//     matchName: (text: string) => void;
// }

interface OutfitViewPropsType {
	id: string;
	title: string;
	clothingItems: UserClothing[];
	titleRef: MutableRefObject<string>;
	navigateToProfile: () => void;
}

const OutfitEdit = ({
	id,
	title,
	clothingItems,
	titleRef,
	navigateToProfile,
}: OutfitViewPropsType) => {
	const { setShouldRefreshOutfitEdit } = useContext(MainPageContext);

	const [text, setText] = useState(title);
	const [rawData, setRawData] = useState<UserOutfit[]>([]);
	const [outfitData, setOutfitData] = useState<UserOutfit[]>([]);
	const onInputChange = (text: string) => {
		setText(text);
		titleRef.current = text;
		// setTitle(text)
		// matchName(text);
	};

	// useEffect(() => {
	// 	setRawData([outerwear, tops, bottoms, shoes])
	// }, [outerwear, tops, bottoms, shoes])

	useEffect(() => {
		setOutfitData(rawData.filter(Boolean));
	}, [rawData]);

	const handleDelete = async () => {
		try {
			const response = await axios.delete(
				`${baseUrl}/api/private/outfits/${id}`
			);

			if (response.status === 200) {
				//alert(`You have deleted: ${JSON.stringify(response.data)}`);
				setShouldRefreshOutfitEdit(true);
				navigateToProfile();
			} else {
				throw new Error('An error has occurred while deleting outfit');
			}
		} catch (error) {
			void axiosEndpointErrorHandler(error);
			alert(error);
		}
	};

	return (
		<View style={styles.container}>
			<StackedTextbox
				label={outfitEdit.outfitName}
				onFieldChange={onInputChange}
				value={title ? title : text}
			/>
			<FlatList
				data={clothingItems}
				renderItem={({ item }) => {
					return (
						<View style={{ width: ITEM_SIZE(2) }}>
							<ItemCell
								imageUrl={item.image_url}
								disablePress={false}
								key={item.ciid}
							/>
						</View>
					);
				}}
				numColumns={2}
				contentContainerStyle={{ gap: GlobalStyles.layout.gap }}
				columnWrapperStyle={{ gap: GlobalStyles.layout.gap }}
				style={{ height: screenHeight - 350, padding: 6 }}
			/>
			<View style={styles.deleteButtonContainer}>
				<Pressable onPress={handleDelete}>
					<View style={styles.deleteButton}>
						<Icon
							name={GlobalStyles.icons.closeOutline}
							color={GlobalStyles.colorPalette.primary[300]}
							size={GlobalStyles.sizing.icon.regular}
						/>
					</View>
				</Pressable>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		marginHorizontal: GlobalStyles.layout.xGap - 6, // Gives extra room for the item cell delete button to render
		gap: GlobalStyles.layout.gap,
		flex: 1,
	},
	deleteButtonContainer: {
		position: 'absolute',
		bottom: GlobalStyles.layout.gap * 2.5,
		alignSelf: 'center',
	},
	deleteButton: {
		width: 40,
		height: 40,
		...GlobalStyles.utils.fullRadius,
		backgroundColor: GlobalStyles.colorPalette.primary[200],
		alignItems: 'center',
		justifyContent: 'center',
		shadowColor: GlobalStyles.colorPalette.primary[300],
		...GlobalStyles.utils.deleteShadow,
	},
});

export default OutfitEdit;
