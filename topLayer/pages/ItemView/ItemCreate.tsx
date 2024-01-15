import axios from 'axios';
import { baseUrl } from '../../utils/apiUtils';
import { View, StyleSheet } from 'react-native';
import React, {
	useState,
	useEffect,
	useRef,
	useContext,
	type ReactElement,
} from 'react';
import {
	ClothingTypes,
	StackNavigation,
	StepOverTypes,
	TagAction,
} from '../../constants/Enums';
import Dropdown from '../../components/Dropdown/Dropdown';
import StackedTextBox from '../../components/Textbox/StackedTextbox';
import ItemCell from '../../components/Cell/ItemCell';
import { fullscreenLowTranslateY } from '../../utils/modalMaxShow';
import ColorPicker from '../../components/ColorManager/ColorPicker';
import GeneralModal, {
	type refPropType,
} from '../../components/Modal/GeneralModal';
import { ITEM_SIZE } from '../../utils/GapCalc';
import GlobalStyles from '../../constants/GlobalStyles';
import ColorTagsList from '../../components/ColorManager/ColorTagsList';
import { creationClothingTypes, type UserClothing } from '../../types/Clothing';
import { useForm, Controller } from 'react-hook-form';
import { ScrollView } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { type NativeStackNavigationProp } from '@react-navigation/native-stack';
import { type StackTypes } from '../../utils/StackNavigation';
import Header from '../../components/Header/Header';
import { MainPageContext } from '../../pages/Main/MainPage';
import { toast } from '../../constants/GlobalStrings';
import { Loading } from '../../components/Loading/Loading';
import { axiosEndpointErrorHandler } from '../../utils/ErrorHandlers';
import {
	showErrorToast,
	showSuccessToast,
} from '../../components/Toasts/Toasts';
import { setClothingTypeSize } from '../../functions/ClothingItem/Sizes';
import { clothingItemTypes } from '../../constants/Clothing';

interface ItemCreatePropsType {
	clothingItem: UserClothing;
	navigateToProfile: () => void;
}

const ItemCreate = ({
	clothingItem,
	navigateToProfile,
}: ItemCreatePropsType): ReactElement => {
	const navigation = useNavigation<NativeStackNavigationProp<StackTypes>>();
	const { setShouldRefreshMainPage } = useContext(MainPageContext);

	const colorPickerRef = useRef<refPropType>(null);
	const [isLoading, setIsLoading] = useState(false);
	const [currentColorTags, setColorTags] = useState(clothingItem.color);
	const [sizeOpen, setSizeOpen] = useState(false);
	const [sizeValue, setSizeValue] = useState(clothingItem.size ?? '');
	const [sizes, setSizes] = useState(
		setClothingTypeSize(clothingItem.category)
	);
	const [itemTypeOpen, setItemTypeOpen] = useState(false);
	const [itemTypeValue, setItemTypeValue] = useState(
		clothingItem.category ?? ''
	);

	const { control, handleSubmit, setValue } = useForm({
		defaultValues: {
			image: clothingItem.image_url,
			category: clothingItem.category,
			title: clothingItem.title,
			brands: clothingItem.brands,
			size: clothingItem.size,
			color: clothingItem.color,
		},
	});

	// sets new sizing options when a new item type (ex. outerwear) is selected
	useEffect(() => {
		setSizes(setClothingTypeSize(itemTypeValue));
		setValue('category', itemTypeValue);
	}, [itemTypeValue]);

	useEffect(() => {
		setValue('size', sizeValue);
	}, [sizeValue]);

	useEffect(() => {
		setValue('color', currentColorTags);
	}, [currentColorTags]);

	useEffect(() => {
		setValue('image', clothingItem.image_url);
	}, [clothingItem.image_url]);

	const handleCreate = async (values: creationClothingTypes): Promise<void> => {
		if (values.category === '') {
			throw new Error('Category Value Not Filled Out.');
		}
		if (values.title === '') {
			throw new Error('Title Value Not Filled Out.');
		}
		if (values.size === '') {
			throw new Error('Size Value Not Filled Out.');
		}
		if (values.image === '') {
			throw new Error('Image Value Not Filled Out.');
		}
		setIsLoading(true); // Start loading
		try {
			const { data, status } = await axios.post(
				`${baseUrl}/api/private/clothing_items`,
				values
			);

			if (status === 200) {
				setShouldRefreshMainPage(true);
				navigateToProfile();
				showSuccessToast(toast.yourItemHasBeenCreated);
			} else {
				showErrorToast(toast.anErrorHasOccurredWhileCreatingItem);
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
	};

	const handleOnNewColorPress = (colorToAdd: string): void => {
		if (!currentColorTags.some((color: string) => color === colorToAdd)) {
			setColorTags([...currentColorTags, colorToAdd]);
		}
		colorPickerRef.current?.scrollTo(0);
	};

	const redirectToCamera = (): void => {
		navigation.navigate(StackNavigation.CameraComponents, {});
	};

	return (
		<View style={styles.container}>
			<Header
				text={'Create'}
				leftButton={true}
				leftStepOverType={StepOverTypes.leftArrow}
				leftButtonAction={redirectToCamera}
				rightButton={true}
				rightStepOverType={StepOverTypes.done}
				rightButtonAction={handleSubmit(handleCreate)}
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
						render={({ field: { onChange, value } }) => (
							<StackedTextBox
								label="Item name"
								onFieldChange={(value) => {
									onChange(value);
									setValue('title', value);
								}}
								value={value.trim()}
							/>
						)}
						name="title"
					/>
					<ItemCell imageUrl={clothingItem.image_url} base64={true} />
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
								items={sizes}
								value={sizeValue}
							/>
						</View>
					</View>
					<ColorTagsList
						data={currentColorTags}
						tagAction={TagAction.remove}
						onAddPress={() => {
							colorPickerRef.current?.scrollTo(fullscreenLowTranslateY);
						}}
						onRemovePress={handleOnRemovePress}
					/>
				</View>
			</ScrollView>
			<GeneralModal
				ref={colorPickerRef}
				height={fullscreenLowTranslateY}
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

export default ItemCreate;
