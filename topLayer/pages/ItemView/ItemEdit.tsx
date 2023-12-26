import axios from 'axios';
import { baseUrl } from '../../utils/apiUtils';
import { View, StyleSheet, Pressable, Keyboard, Text, ActivityIndicator } from 'react-native';
import React, { useState, useEffect, useRef, useContext } from 'react';
import Button from '../../components/Button/Button';
import {
    ClothingTypes,
    StackNavigation,
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
import { StepOverTypes } from '../../constants/Enums';
import { MainPageContext } from '../../pages/Main/MainPage';
import Toast from 'react-native-toast-message';
import { toast } from '../../constants/GlobalStrings';

interface ItemEditPropsType {
    clothingItem: UserClothing;
    navigateToProfile: () => void;
}

interface FormValues {
    image: string;
    category: string;
    title: string;
    size: string;
    color: string[];
    brands: string[];
}

type UpdateData = {
    category?: string;
    title?: string;
    size?: string;
    color?: string[];
};

const ItemEdit = ({ clothingItem, navigateToProfile }: ItemEditPropsType) => {

    const { setShouldRefreshMainPage } = useContext(MainPageContext);

    const navigation = useNavigation<NativeStackNavigationProp<StackTypes>>();
    const colorPickerRef = useRef<refPropType>(null);

    const [isLoading, setIsLoading] = useState(false); // Add loading state

    const [currentColorTags, setColorTags] = useState(clothingItem.color);

    const [sizeOpen, setSizeOpen] = useState(false);
    // sets the size value to be stored in the database
    const [sizeValue, setSizeValue] = useState(
        clothingItem.size ? clothingItem.size : ''
    );
    // helper function for setting the size options based on given clothing category
    const helpSetSizes = (category: string) => {
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
    // sets the size options (ex. {S, M, L}, {US 10, US 11, US 12}, etc.)
    const [sizes, setSizes] = useState(helpSetSizes(clothingItem.category));

    const [itemTypeOpen, setItemTypeOpen] = useState(false);
    // sets the item type value to be stored in the database
    const [itemTypeValue, setItemTypeValue] = useState(
        clothingItem.category ? clothingItem.category : ''
    );
    // sets the item type options
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
            category: clothingItem.category,
            title: clothingItem.title,
            //brands: [],
            size: clothingItem.size,
            color: clothingItem.color,
        },
    });

    // sets new sizing options when a new item type (ex. outerwear) is selected
    useEffect(() => {
        setSizes(helpSetSizes(itemTypeValue))
        setValue('category', itemTypeValue);
    }, [itemTypeValue])

    useEffect(() => {
        setValue('size', sizeValue);
    }, [sizeValue])

    useEffect(() => {
        setValue('color', currentColorTags);
    }, [currentColorTags])

    const showSuccessUpdateToast = () => {
        Toast.show({
            type: 'success',
            text1: toast.success,
            text2: toast.yourItemHasBeenUpdated,
            topOffset: GlobalStyles.layout.toastTopOffset,
        });
    }

    const showErrorUpdateToast = () => {
        Toast.show({
            type: 'error',
            text1: toast.error,
            text2: toast.anErrorHasOccurredWhileUpdatingItem,
            topOffset: GlobalStyles.layout.toastTopOffset
        });
    }

    const updateItem = async (values: FormValues | any) => {

        const dataToUpdate: UpdateData = {};

        // Add fields to dataToUpdate only if they have been set
        if (values.category !== clothingItem.category) dataToUpdate.category = values.category;
        if (values.title !== clothingItem.title) dataToUpdate.title = values.title;
        if (values.size !== clothingItem.size) dataToUpdate.size = values.size;
        if (values.color !== clothingItem.color) dataToUpdate.color = values.color;

        setIsLoading(true); // Start loading
        try {
            const response = await axios.put(
                `${baseUrl}/api/private/clothing_items/${clothingItem.ciid}`,
                dataToUpdate,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    }
                }
            );
            if (response.status === 200) {
                setShouldRefreshMainPage(true);
                navigateToProfile();
                showSuccessUpdateToast();
            } else {
                showErrorUpdateToast();
            }

            setIsLoading(false); // Stop loading on success
        } catch (error) {
            setIsLoading(false); // Stop loading on error
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

    return (
        <View style={styles.container}>
            <Header
                text={"Edit"}
                leftBack={true}
                leftButton={true}
                rightButton={true}
                rightStepOverType={StepOverTypes.done}
                rightButtonAction={handleSubmit(updateItem)}
            />
            <>
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
                                        onChange(value)
                                        setValue('title', value);
                                    }}
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
                                    label="Item type"
                                    open={itemTypeOpen}
                                    setOpen={setItemTypeOpen}
                                    setItems={setItemTypes}
                                    setValue={(value) => {
                                        setItemTypeValue(value);
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
                <View style={styles.deleteButtonContainer}>
                    <Pressable onPress={handlePress}>
                        <View style={styles.deleteButton}>
                            <Icon
                                name={GlobalStyles.icons.closeOutline}
                                color={GlobalStyles.colorPalette.primary[300]}
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
            </>
            {isLoading && (
                <View style={styles.overlay}>
                    <ActivityIndicator size='large' color={GlobalStyles.colorPalette.activityIndicator} />
                </View>
            )}
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
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'transparent', // Set to transparent
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default ItemEdit;
