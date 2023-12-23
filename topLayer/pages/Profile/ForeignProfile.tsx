import React, { useRef, useState, useEffect } from 'react';
import { View, Pressable, StyleSheet, FlatList, Text } from 'react-native';
import Icon from 'react-native-remix-icon';

import ProfilePicture from '../../components/ProfilePicture/ProfilePicture';
import FullName from '../../components/Name/FullName';
import Username from '../../components/Name/Username';
import CategoryBar from '../../components/Category/CategoryBar';
import CategorySlides from '../../components/Category/CategorySlides';

import {
	CategoryToIndex,
	IndexToCategory,
	StackNavigation,
	ClothingTypes,
} from '../../constants/Enums';
import GlobalStyles from '../../constants/GlobalStyles';

import { useNavigation } from '@react-navigation/native';
import { type NativeStackNavigationProp } from '@react-navigation/native-stack';
import { type StackTypes } from '../../utils/StackNavigation';
import { UserAllItems, UserClothing } from '../Match';
import { UserOutfit } from '../OutfitView';

import { markedUser } from '../../pages/Main';
import {
	getForeignAllClothingItems,
	getForeignAllOutfits,
} from '../../endpoints/wardrobe';

const ForeignProfile = ({ route }: any) => {
	// console.log('Route: ', route, route.params);
	// console.log('Params: ', route.params.markedUser);

	const user: markedUser = route.params.markedUser;
	const bookmarkUser: () => void = route.params.setMarked;

	// const [user, setUser] = useState<markedUser>(fetchedUser);
	const [allOutfits, setAllOutfits] = useState<UserOutfit[]>([]);
	const [allOuterwear, setAllOuterwear] = useState<UserClothing[]>([]);
	const [allTops, setAllTops] = useState<UserClothing[]>([]);
	const [allBottoms, setAllBottoms] = useState<UserClothing[]>([]);
	const [allShoes, setAllShoes] = useState<UserClothing[]>([]);

	// initializes an array of clothing categories and their data
	const allItems: UserAllItems[] = [
		{
			category: 'outfits',
			data: allOutfits,
		},
		{
			category: 'outerwear',
			data: allOuterwear,
		},
		{
			category: 'tops',
			data: allTops,
		},
		{
			category: 'bottoms',
			data: allBottoms,
		},
		{
			category: 'shoes',
			data: allShoes,
		},
	];

	useEffect(() => {
		void getForeignAllOutfits(user.uid, setAllOutfits);
		void getForeignAllClothingItems(
			user.uid,
			setAllOuterwear,
			setAllTops,
			setAllBottoms,
			setAllShoes
		);
	}, []);

	const navigation = useNavigation<NativeStackNavigationProp<StackTypes>>();
	const flatListRef = useRef<FlatList>(null);

	const [selectedCategory, setSelectedCategory] = useState(
		ClothingTypes.outfits as string
	);

	const [iconName, setIconName] = useState(
		user.marked
			? GlobalStyles.icons.bookmarkFill
			: GlobalStyles.icons.bookmarkOutline
	);

	const handleItemChange = (item: UserClothing | UserOutfit) => {
		if ('oid' in item) {
			navigation.navigate(StackNavigation.OutfitView, {
				item: item,
				editable: false,
			});
		} else {
			navigation.navigate(StackNavigation.ItemView, {
				item: item,
				editable: false,
			});
		}
	};

	const handleCategoryChange = (category: string) => {
		setSelectedCategory(category);
		handleIndexChange(CategoryToIndex[category]);
	};

	const handleBookmarkPress = () => {
		if (iconName === GlobalStyles.icons.bookmarkFill) {
			bookmarkUser();
			setIconName(GlobalStyles.icons.bookmarkOutline);
			user.marked = false;
		} else {
			bookmarkUser();
			setIconName(GlobalStyles.icons.bookmarkFill);
			user.marked = true;
		}
	};

	const handleIndexChange = (index: number) => {
		if (flatListRef.current != null) {
			flatListRef.current?.scrollToIndex({ index, animated: false });
		}
	};

	const handleViewableItemsChanged = useRef(({ viewableItems }: any) => {
		if (viewableItems.length > 0) {
			const visibleItem = viewableItems[0];
			const index = allItems.findIndex(
				(item) => item.category === visibleItem.item.category
			);
			setSelectedCategory(IndexToCategory[index]);
		}
	}).current;

	// !!! Display edit outfit on click
	// !!! Empty Match page to account for no clothing

	return (
		<>
			<View style={{ paddingVertical: GlobalStyles.layout.modalTopPadding }} />
			<View style={{ flex: 1 }}>
				<View style={styles.profilePicture}>
					<ProfilePicture imageUrl={user ? user.pp_url : ''} />
					<View>
						<FullName
							firstName={user ? user.first_name : ''}
							lastName={user ? user.last_name : ''}
						/>
						<Username username={user ? user.username : ''} />
					</View>
				</View>
				{user && user.private_option ? (
					<View
						style={{
							alignItems: 'center',
							flex: 1,
							top: GlobalStyles.layout.pageStateTopMargin,
							gap: 5,
						}}
					>
						<Icon
							name={GlobalStyles.icons.privateOutline}
							color={GlobalStyles.colorPalette.primary[300]}
							size={GlobalStyles.sizing.icon.large}
						/>
						<Text
							style={[
								GlobalStyles.typography.subtitle,
								{ color: GlobalStyles.colorPalette.primary[300] },
							]}
						>
							Private
						</Text>
					</View>
				) : (
					<View style={{ top: 5 }}>
						<CategoryBar
							selectedCategory={selectedCategory}
							handleCategoryChange={handleCategoryChange}
						/>
						<CategorySlides
							categorySlidesRef={flatListRef}
							allItemsData={allItems}
							selectedCategory={selectedCategory}
							handleItemChange={handleItemChange}
							handleViewableItemsChanged={handleViewableItemsChanged}
						/>
					</View>
				)}

				<View style={styles.bookmarkIconWrapper}>
					<Pressable onPress={handleBookmarkPress}>
						<Icon
							name={iconName}
							color={GlobalStyles.colorPalette.primary[900]}
							size={GlobalStyles.sizing.icon.regular}
						/>
					</Pressable>
				</View>
			</View>
		</>
	);
};

const styles = StyleSheet.create({
	bookmarkIconWrapper: {
		position: 'absolute',
		top: 0,
		right: GlobalStyles.layout.xGap,
	},
	profilePicture: {
		alignItems: 'center',
		gap: 7,
	},
});

export default ForeignProfile;
