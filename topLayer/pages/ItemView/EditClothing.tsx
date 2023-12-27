import axios from 'axios';
import { baseUrl } from '../../utils/apiUtils';
import { View, StyleSheet, Pressable, Keyboard, Text } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import Button from '../../components/Button/Button';
import {
	ClothingTypes,
	StackNavigation,
	StepOverTypes,
	TagAction,
} from '../../constants/Enums';
import Dropdown from '../../components/Dropdown/Dropdown';
import StackedTextBox from '../../components/Textbox/StackedTextbox';
import ItemCell from '../../components/Cell/ItemCell';
import { lowTranslateY } from '../../utils/modalMaxShow';
import ColorPicker from '../../components/ColorManager/ColorPicker';
import GeneralModal, {
	type refPropType,
} from '../../components/Modal/GeneralModal';
import { capitalizeFirstLetter } from '../../utils/misc';
import { ITEM_SIZE } from '../../utils/GapCalc';
import GlobalStyles from '../../constants/GlobalStyles';
import ColorTagsList from '../../components/ColorManager/ColorTagsList';
import { UserClothing } from '../Match';
import { useForm, Controller } from 'react-hook-form';
import Icon from 'react-native-remix-icon';
import { ScrollView } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { type NativeStackNavigationProp } from '@react-navigation/native-stack';
import { type StackTypes } from 'utils/StackNavigation';
import Header from '../../components/Header/Header';

interface EditClothingPropsType {
	clothingItem: UserClothing;
}

interface FormValues {
	image: string;
	category: string;
	title: string;
	size: string;
	color: string[];
	brands: string[];
}

const EditClothing = ({ clothingItem }: EditClothingPropsType) => {
	const navigation = useNavigation<NativeStackNavigationProp<StackTypes>>();
	const colorPickerRef = useRef<refPropType>(null);

	const [currentColorTags, setColorTags] = useState(clothingItem.color);
	const [itemName, setItemName] = useState(
		clothingItem.title ? clothingItem.title : ''
	);

	const [sizeOpen, setSizeOpen] = useState(false);
	// sets the size stored in the database
	const [sizeValue, setSizeValue] = useState(
		clothingItem.size ? clothingItem.size : ''
	);
	// shows the possible size options for a given clothing category
	const showSizeOptions = (category: string) => {
		if (
			category === ClothingTypes.outerwear ||
			category === ClothingTypes.tops
		) {
			return [
				{
					label: 'XXS',
					value: 'xxs',
				},
				{
					label: 'XS',
					value: 'xs',
				},
				{
					label: 'S',
					value: 's',
				},
				{
					label: 'M',
					value: 'm',
				},
				{
					label: 'L',
					value: 'l',
				},
				{
					label: 'XL',
					value: 'xl',
				},
				{
					label: 'XXL',
					value: 'xxl',
				},
			];
		} else if (category === ClothingTypes.bottoms) {
			return [
				{
					label: 'US 28',
					value: 'xxs',
				},
				{
					label: 'US 30',
					value: 'xs',
				},
				{
					label: 'US 32',
					value: 's',
				},
				{
					label: 'US 34',
					value: 'm',
				},
				{
					label: 'US 36',
					value: 'l',
				},
				{
					label: 'US 38',
					value: 'xl',
				},
				{
					label: 'US 40',
					value: 'xxl',
				},
			];
		} else {
			return [
				{
					label: 'US 7',
					value: 'xxs',
				},
				{
					label: 'US 8',
					value: 'xs',
				},
				{
					label: 'US 9',
					value: 's',
				},
				{
					label: 'US 10',
					value: 'm',
				},
				{
					label: 'US 11',
					value: 'l',
				},
				{
					label: 'US 12',
					value: 'xl',
				},
				{
					label: 'US 13',
					value: 'xxl',
				},
			];
		}
	}
	const [sizes, setSizes] = useState(showSizeOptions(clothingItem.category));

	const [itemTypeOpen, setItemTypeOpen] = useState(false);
	const [itemTypeValue, setItemTypeValue] = useState(
		clothingItem.category ? clothingItem.category : ''
	);

	const [itemTypes, setItemTypes] = useState([
		{
			label: capitalizeFirstLetter(ClothingTypes.outerwear),
			value: ClothingTypes.outerwear,
		},
		{
			label: capitalizeFirstLetter(ClothingTypes.tops),
			value: ClothingTypes.tops,
		},
		{
			label: capitalizeFirstLetter(ClothingTypes.bottoms),
			value: ClothingTypes.bottoms,
		},
		{
			label: capitalizeFirstLetter(ClothingTypes.shoes),
			value: ClothingTypes.shoes,
		},
	]);

	const {
		control,
		handleSubmit,
		setValue,
		formState: { dirtyFields, errors },
	} = useForm({
		defaultValues: {
			ciid: '',
			image_url: '',
			category: '',
			title: '',
			uid: '',
			brands: [],
			size: '',
			color: [],
			created_at: '',
		},
	});

	useEffect(() => {
		setSizes(showSizeOptions(itemTypeValue))
	}, [itemTypeValue])

	useEffect(() => {
		setValue('image_url', clothingItem.image_url);
	}, [clothingItem.image_url]);

	const onSubmit = async (values: FormValues | any) => {
		console.log('submit handling');
		if (values.category == '') {
			throw new Error('Category Value Not Filled Out.');
		}
		if (values.title == '') {
			throw new Error('Title Value Not Filled Out.');
		}
		if (values.size == '') {
			throw new Error('Size Value Not Filled Out.');
		}
		if (values.image_url == '') {
			throw new Error('Image Value Not Filled Out.');
		}
		try {
			const { data, status } = await axios.post(
				`${baseUrl}/api/private/clothing_items`,
				values
			);

			if (status === 200) {
				try {
					console.log('Successfully created a new item');
				} catch (error) {
					console.log(error);
				}
			} else {
				throw new Error('Not Authorized.');
			}
		} catch (error) {
			alert(error);
		}
	};

	const handleOnRemovePress = (colorToDelete: string) => {
		const updatedColorTags = currentColorTags.filter(
			(color: string) => color !== colorToDelete
		);
		setColorTags(updatedColorTags);
	};

	const handleOnNewColorPress = (colorToAdd: string) => {
		if (!currentColorTags.some((color: string) => color === colorToAdd)) {
			setColorTags([...currentColorTags, colorToAdd]);
		}
		colorPickerRef.current?.scrollTo(0);
	};

	const handlePress = () => {
		navigation.navigate(StackNavigation.OutfitView, {});
	};

	const redirectToProfile = () => {
		navigation.navigate(StackNavigation.Profile, {});
	};

	return (
		<View style={[{ flex: 1 }, styles.container]}>
			<Header
				text={StackNavigation.CreateClothing}
				rightButton={true}
				rightBack={true}
				rightStepOverType={StepOverTypes.done}
				rightButtonAction={handleSubmit(onSubmit)}
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
					<StackedTextBox
						label="Item name"
						onFieldChange={(value) => {
							setItemName(value);
							setValue('title', itemName);
						}}
						value={itemName}
					/>
					<ItemCell imageUrl={clothingItem.image_url} base64={true} />
					<View
						style={{ flexDirection: 'row', justifyContent: 'space-between' }}
					>
						<View style={{ width: ITEM_SIZE(2) }}>
							<Dropdown
								label="Item type"
								open={itemTypeOpen}
								setOpen={setItemTypeOpen}
								setItems={setItemTypes}
								setValue={(value) => {
									setItemTypeValue(value);
									setValue('category', itemTypeValue);
								}}
								items={itemTypes}
								value={itemTypeValue}
							/>
						</View>
						<View style={{ width: ITEM_SIZE(2) }}>
							<Dropdown
								label="Size"
								open={sizeOpen}
								setOpen={setSizeOpen}
								setItems={setSizes}
								setValue={(value) => {
									setSizeValue(value);
									setValue('size', sizeValue);
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
							colorPickerRef.current?.scrollTo(lowTranslateY);
						}}
						onRemovePress={handleOnRemovePress}
					/>
				</View>
			</ScrollView>
			{/* <Button
				text="Create/Update Item"
				onPress={handleSubmit(onSubmit)}
				bgColor={GlobalStyles.colorPalette.primary[500]}
				style={{
					position: 'absolute',
					bottom: GlobalStyles.layout.gap * 7,
					alignSelf: 'center',
				}}
			/> */}
			<View style={styles.deleteButtonContainer}>
				<Pressable onPress={handlePress}>
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
				content={<ColorPicker onNewColorPress={handleOnNewColorPress} />}
				dim={false}
			/>
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

export default EditClothing;
