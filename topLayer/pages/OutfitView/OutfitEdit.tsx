import {
	View,
	StyleSheet,
	Pressable,
	Alert,
	ActivityIndicator,
} from 'react-native';
import React, {
	useEffect,
	useState,
	useContext,
	type MutableRefObject,
} from 'react';
import { FlatList } from 'react-native-gesture-handler';

import ItemCell from '../../components/Cell/ItemCell';
import GlobalStyles from '../../constants/GlobalStyles';
import StackedTextbox from '../../components/Textbox/StackedTextbox';

import { ITEM_SIZE } from '../../utils/GapCalc';
import { screenHeight } from '../../utils/modalMaxShow';
import { type UserOutfit } from '.';
import { outfitEdit, toast } from '../../constants/GlobalStrings';

import Icon from 'react-native-remix-icon';
import { type UserClothing } from '../../pages/Match';

import { baseUrl } from '../../utils/apiUtils';
import axios from 'axios';
import { axiosEndpointErrorHandler } from '../../utils/ErrorHandlers';
import { MainPageContext } from '../../pages/Main/MainPage';

import Toast from 'react-native-toast-message';
import Header from '../../components/Header/Header';
import { StepOverTypes } from '../../constants/Enums';
import { Loading } from '../../components/Loading/Loading';

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
	const { setShouldRefreshMainPage } = useContext(MainPageContext);

	const [text, setText] = useState(title);
	const [rawData, setRawData] = useState<UserOutfit[]>([]);
	const [outfitData, setOutfitData] = useState<UserOutfit[]>([]);
	const [isLoading, setIsLoading] = useState(false); // Add loading state

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

	const showSuccessUpdateToast = () => {
		Toast.show({
			type: 'success',
			text1: toast.success,
			text2: toast.yourOutfitHasBeenUpdated,
			topOffset: GlobalStyles.layout.toastTopOffset,
		});
	};

	const showErrorUpdateToast = () => {
		Toast.show({
			type: 'error',
			text1: toast.error,
			text2: toast.anErrorHasOccurredWhileUpdatingOutfit,
			topOffset: GlobalStyles.layout.toastTopOffset,
		});
	};

	const showSuccessDeleteToast = () => {
		Toast.show({
			type: 'success',
			text1: toast.success,
			text2: toast.yourOutfitHasBeenDeleted,
			topOffset: GlobalStyles.layout.toastTopOffset,
		});
	};

	const showErrorDeleteToast = () => {
		Toast.show({
			type: 'error',
			text1: toast.error,
			text2: toast.anErrorHasOccurredWhileDeletingOutfit,
			topOffset: GlobalStyles.layout.toastTopOffset,
		});
	};

	const confirmDeletion = () => {
		Alert.alert(outfitEdit.deleteOutfit, outfitEdit.youCannotUndoThisAction, [
			{
				text: outfitEdit.cancel,
				onPress: () => {},
			},
			{
				text: outfitEdit.delete,
				onPress: handleDelete,
				style: 'destructive',
			},
		]);
	};

	// Only updates title
	const handleUpdate = async () => {
		const updatedTitle = titleRef.current;

		setIsLoading(true); // Start loading
		try {
			const response = await axios.put(`${baseUrl}/api/private/outfits/${id}`, {
				title: updatedTitle,
			});

			if (response.status === 200) {
				//alert(`You have updated: ${JSON.stringify(response.data)}`);
				setShouldRefreshMainPage(true);
				navigateToProfile();
				showSuccessUpdateToast();
			} else {
				showErrorUpdateToast();
				// throw new Error('An error has occurred while updating outfit');
			}
			setIsLoading(false); // Stop loading on success
		} catch (error) {
			setIsLoading(false); // Stop loading on error
			void axiosEndpointErrorHandler(error);
		}
	};

	const handleDelete = async () => {
		setIsLoading(true); // Start loading
		try {
			const response = await axios.delete(
				`${baseUrl}/api/private/outfits/${id}`
			);

			if (response.status === 200) {
				//alert(`You have deleted: ${JSON.stringify(response.data)}`);
				setShouldRefreshMainPage(true);
				navigateToProfile();
				showSuccessDeleteToast();
			} else {
				showErrorDeleteToast();
				// throw new Error('An error has occurred while deleting outfit');
			}
			setIsLoading(false); // Stop loading on success
		} catch (error) {
			setIsLoading(false); // Stop loading on error
			void axiosEndpointErrorHandler(error);
			alert(error);
		}
	};

	return (
		<View style={styles.container}>
			<Header
				text={'Edit'}
				leftBack={true}
				leftButton={true}
				rightButton={true}
				rightStepOverType={StepOverTypes.done}
				rightButtonAction={handleUpdate}
			/>
			<View style={styles.editContainer}>
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
					<Pressable onPress={confirmDeletion}>
						<View style={GlobalStyles.utils.deleteButton}>
							<Icon
								name={GlobalStyles.icons.closeOutline}
								color={GlobalStyles.colorPalette.background}
								size={GlobalStyles.sizing.icon.regular}
							/>
						</View>
					</Pressable>
				</View>

				{isLoading && <Loading />}
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		gap: 15,
		paddingTop: 20,
	},
	editContainer: {
		marginHorizontal: GlobalStyles.layout.xGap - 6, // Gives extra room for the item cell delete button to render
		gap: GlobalStyles.layout.gap,
		flex: 1,
	},
	deleteButtonContainer: {
		position: 'absolute',
		bottom: GlobalStyles.layout.gap * 2.5,
		alignSelf: 'center',
	},
});

export default OutfitEdit;
