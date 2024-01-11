import { View, StyleSheet, Pressable, Alert } from 'react-native';
import React, {
	useState,
	useContext,
	type MutableRefObject,
	type ReactElement,
} from 'react';
import { FlatList } from 'react-native-gesture-handler';
import ItemCell from '../../components/Cell/ItemCell';
import GlobalStyles from '../../constants/GlobalStyles';
import StackedTextbox from '../../components/Textbox/StackedTextbox';
import { ITEM_SIZE } from '../../utils/GapCalc';
import { screenHeight } from '../../utils/modalMaxShow';
import { outfitEdit, toast } from '../../constants/GlobalStrings';
import Icon from 'react-native-remix-icon';
import { type UserClothing } from '../../types/Clothing';
import { baseUrl } from '../../utils/apiUtils';
import axios from 'axios';
import { axiosEndpointErrorHandler } from '../../utils/ErrorHandlers';
import { MainPageContext } from '../../pages/Main/MainPage';
import Header from '../../components/Header/Header';
import { StepOverTypes } from '../../constants/Enums';
import { Loading } from '../../components/Loading/Loading';
import {
	showErrorToast,
	showSuccessToast,
} from '../../components/Toasts/Toasts';

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
}: OutfitViewPropsType): ReactElement => {
	const { setShouldRefreshMainPage } = useContext(MainPageContext);

	const [text, setText] = useState(title);
	const [isLoading, setIsLoading] = useState(false); // Add loading state

	const onInputChange = (text: string): void => {
		setText(text);
		titleRef.current = text;
	};

	const confirmDeletion = (): void => {
		Alert.alert(outfitEdit.deleteOutfit, outfitEdit.youCannotUndoThisAction, [
			{
				text: outfitEdit.cancel,
				onPress: () => {},
				style: 'cancel',
			},
			{
				text: outfitEdit.delete,
				onPress: () => {
					void handleDelete();
				},
				style: 'destructive',
			},
		]);
	};

	// Only updates title
	const handleUpdate = async (): Promise<void> => {
		const updatedTitle = titleRef.current;

		setIsLoading(true); // Start loading
		try {
			const response = await axios.put(`${baseUrl}/api/private/outfits/${id}`, {
				title: updatedTitle,
			});

			if (response.status === 200) {
				setShouldRefreshMainPage(true);
				navigateToProfile();
				showSuccessToast(toast.yourOutfitHasBeenUpdated);
			} else {
				showErrorToast(toast.anErrorHasOccurredWhileUpdatingOutfit);
			}
			setIsLoading(false); // Stop loading on success
		} catch (error) {
			setIsLoading(false); // Stop loading on error
			axiosEndpointErrorHandler(error);
		}
	};

	const handleDelete = async (): Promise<void> => {
		setIsLoading(true); // Start loading
		try {
			const response = await axios.delete(
				`${baseUrl}/api/private/outfits/${id}`
			);

			if (response.status === 200) {
				setShouldRefreshMainPage(true);
				navigateToProfile();
				showSuccessToast(toast.yourOutfitHasBeenDeleted);
			} else {
				showErrorToast(toast.anErrorHasOccurredWhileDeletingOutfit);
			}
			setIsLoading(false); // Stop loading on success
		} catch (error) {
			setIsLoading(false); // Stop loading on error
			axiosEndpointErrorHandler(error);
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
					value={title ?? text}
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
