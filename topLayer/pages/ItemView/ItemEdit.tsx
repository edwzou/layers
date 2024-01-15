import axios from 'axios';
import { baseUrl } from '../../utils/apiUtils';
import { View, StyleSheet, Pressable, Alert } from 'react-native';
import React, { useState, useRef, useContext, type ReactElement } from 'react';
import { TagAction, StepOverTypes } from '../../constants/Enums';
import Dropdown from '../../components/Dropdown/Dropdown';
import StackedTextBox from '../../components/Textbox/StackedTextbox';
import ItemCell from '../../components/Cell/ItemCell';
import { modalLowTranslateY } from '../../utils/modalMaxShow';
import ColorPicker from '../../components/ColorManager/ColorPicker';
import GeneralModal, {
	type refPropType,
} from '../../components/Modal/GeneralModal';
import { ITEM_SIZE } from '../../utils/GapCalc';
import GlobalStyles from '../../constants/GlobalStyles';
import ColorTagsList from '../../components/ColorManager/ColorTagsList';
import { editableClothingTypes, type UserClothing } from '../../types/Clothing';
import { useForm, Controller } from 'react-hook-form';
import Icon from 'react-native-remix-icon';
import { ScrollView } from 'react-native-gesture-handler';
import Header from '../../components/Header/Header';
import { MainPageContext } from '../../pages/Main/MainPage';
import { toast, itemEdit } from '../../constants/GlobalStrings';
import { axiosEndpointErrorHandler } from '../../utils/ErrorHandlers';
import { Loading } from '../../components/Loading/Loading';
import {
	showErrorToast,
	showSuccessToast,
} from '../../components/Toasts/Toasts';
import { setClothingTypeSize } from '../../functions/ClothingItem/Sizes';
import { clothingItemTypes } from '../../constants/Clothing';
import { userFieldRules } from '../../constants/userConstraints';
import { areArraysEqual } from '../../functions/General/array';

interface ItemEditPropsType {
	clothingItem: UserClothing;
	navigateToProfile: () => void;
}

const ItemEdit = ({
	clothingItem,
	navigateToProfile,
}: ItemEditPropsType): ReactElement => {
	const { setShouldRefreshMainPage } = useContext(MainPageContext);

	const colorPickerRef = useRef<refPropType>(null);
	const [isLoading, setIsLoading] = useState(false);
	const [currentColorTags, setColorTags] = useState(clothingItem.color);
	const [sizeOpen, setSizeOpen] = useState(false);
	const [sizeValue, setSizeValue] = useState(clothingItem.size ?? '');
	const [sizeOptions, setSizeOptions] = useState(
		setClothingTypeSize(clothingItem.category)
	);
	const [itemTypeOpen, setItemTypeOpen] = useState(false);
	const [itemTypeValue, setItemTypeValue] = useState(
		clothingItem.category ?? ''
	);

	const { control, handleSubmit, setValue } = useForm({
		defaultValues: {
			category: clothingItem.category,
			title: clothingItem.title,
			size: clothingItem.size,
			color: clothingItem.color,
		},
	});

	const confirmDeletion = (): void => {
		Alert.alert(itemEdit.deleteItem, itemEdit.youCannotUndoThisAction, [
			{
				text: itemEdit.cancel,
				onPress: () => {},
				style: 'cancel',
			},
			{
				text: itemEdit.delete,
				onPress: () => {
					void handleDelete();
				},
				style: 'destructive',
			},
		]);
	};

	const handleUpdate = async (values: editableClothingTypes): Promise<void> => {
		const dataToUpdate: Partial<editableClothingTypes> = {};

		// Add fields to dataToUpdate only if they have been set
		if (values.category !== clothingItem.category) {
			dataToUpdate.category = values.category;
		}
		if (values.title !== clothingItem.title) {
			dataToUpdate.title = values.title;
		}
		if (values.size !== clothingItem.size) {
			dataToUpdate.size = values.size;
		}
		if (!areArraysEqual(values.color, clothingItem.color)) {
			dataToUpdate.color = values.color;
		}

		if (Object.keys(dataToUpdate).length === 0) {
			return;
		}

		setIsLoading(true); // Start loading
		try {
			const response = await axios.put(
				`${baseUrl}/api/private/clothing_items/${clothingItem.ciid}`,
				dataToUpdate,
				{
					headers: {
						'Content-Type': 'application/json',
					},
				}
			);
			if (response.status === 200) {
				setShouldRefreshMainPage(true);
				navigateToProfile();
				showSuccessToast(toast.yourItemHasBeenUpdated);
			} else {
				showErrorToast(toast.anErrorHasOccurredWhileUpdatingItem);
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
				`${baseUrl}/api/private/clothing_items/${clothingItem.ciid}`
			);

			if (response.status === 200) {
				setShouldRefreshMainPage(true);
				navigateToProfile();
				showSuccessToast(toast.yourItemHasBeenDeleted);
			} else {
				showErrorToast(toast.anErrorHasOccurredWhileDeletingItem);
				throw new Error('An error has occurred while deleting outfit');
			}
			setIsLoading(false); // Stop loading on success
		} catch (error) {
			setIsLoading(false); // Stop loading on error
			axiosEndpointErrorHandler(error);
		}
	};

	const handleOnRemovePress = (colorToDelete: string): void => {
		const updatedColorTags = currentColorTags.filter(
			(color: string) => color !== colorToDelete
		);
		setColorTags(updatedColorTags);
		setValue('color', updatedColorTags);
	};

	const handleOnNewColorPress = (colorToAdd: string): void => {
		if (!currentColorTags.some((color: string) => color === colorToAdd)) {
			const colors = [...currentColorTags, colorToAdd];
			setColorTags(colors);
			setValue('color', colors);
		}
		colorPickerRef.current?.scrollTo(0);
	};

	return (
		<View style={styles.container}>
			<Header
				text={'Edit'}
				leftBack={true}
				leftButton={true}
				rightButton={true}
				rightStepOverType={StepOverTypes.done}
				rightButtonAction={handleSubmit(handleUpdate)}
			/>
			<ScrollView
				contentContainerStyle={GlobalStyles.sizing.bottomSpacingPadding}
			>
				<View
					style={{
						marginHorizontal: GlobalStyles.layout.xGap,
						gap: GlobalStyles.layout.gap,
					}}
				>
					<Controller
						control={control}
						rules={userFieldRules.title}
						render={({ field: { onChange, value } }) => (
							<StackedTextBox
								label={itemEdit.itemName}
								onFieldChange={onChange}
								value={value.trim()}
							/>
						)}
						name="title"
					/>
					<ItemCell imageUrl={clothingItem.image_url} />
					<View
						style={{ flexDirection: 'row', justifyContent: 'space-between' }}
					>
						<View style={{ width: ITEM_SIZE(2) }}>
							<Dropdown
								label="Category"
								open={itemTypeOpen}
								setOpen={setItemTypeOpen}
								setValue={(value) => {
									setItemTypeValue(value);
								}}
								onChangeValue={(value: string | null) => {
									if (value !== null) {
										setSizeOptions(setClothingTypeSize(value));
										setValue('category', value);
									}
								}}
								items={clothingItemTypes}
								value={itemTypeValue}
							/>
						</View>
						<View style={{ width: ITEM_SIZE(2) }}>
							<Dropdown
								label="Size"
								open={sizeOpen}
								setOpen={setSizeOpen}
								setValue={(value) => {
									setSizeValue(value);
								}}
								onChangeValue={(value) => {
									if (value !== null) {
										setValue('size', value);
									}
								}}
								items={sizeOptions}
								value={sizeValue}
							/>
						</View>
					</View>
					<ColorTagsList
						data={currentColorTags}
						tagAction={TagAction.remove}
						onAddPress={() => {
							colorPickerRef.current?.scrollTo(modalLowTranslateY);
						}}
						onRemovePress={handleOnRemovePress}
					/>
				</View>
			</ScrollView>
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
			<GeneralModal
				ref={colorPickerRef}
				height={modalLowTranslateY}
				content={<ColorPicker onNewColorPress={handleOnNewColorPress} />}
				dim={false}
			/>
			{isLoading ? <Loading /> : null}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		gap: 15,
		paddingTop: 20,
	},
	deleteButtonContainer: {
		position: 'absolute',
		bottom: GlobalStyles.layout.gap * 2.5,
		alignSelf: 'center',
	},
});

export default ItemEdit;
