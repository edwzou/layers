import React, { useRef, useState, useContext } from 'react';
import {
	View,
	Pressable,
	StyleSheet,
	type FlatList,
	type ViewToken,
} from 'react-native';
import ProfilePicture from '../../components/ProfilePicture/ProfilePicture';
import FullName from '../../components/Name/FullName';
import Username from '../../components/Name/Username';
import CategoryBar from '../../components/Category/CategoryBar';
import CategorySlides from '../../components/Category/CategorySlides';
import Navbar from '../../components/Bar/Navbar';
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
import { type UserClothing } from '../../types/Clothing';
import { type UserOutfit } from '../../types/Outfit';
import { MainPageContext } from '../../pages/Main/MainPage';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useUser } from '../../Contexts/UserContext';

const Profile: React.FC = () => {
	const navigation = useNavigation<NativeStackNavigationProp<StackTypes>>();
	const flatListRef = useRef<FlatList>(null);

	const [selectedCategory, setSelectedCategory] = useState(
		ClothingTypes.outfits as string
	);
	const data = useUser();
	const { allItems } = useContext(MainPageContext);

	const handleItemChange = (item: UserClothing | UserOutfit): void => {
		if ('oid' in item) {
			navigation.navigate(StackNavigation.OutfitView, {
				item: item,
				editable: true,
			});
		} else {
			navigation.navigate(StackNavigation.ItemView, {
				item: item,
				editable: true,
			});
		}
	};

	const handleCategoryChange = (category: string): void => {
		setSelectedCategory(category);
		handleIndexChange(CategoryToIndex[category]);
	};

	const handleIndexChange = (index: number): void => {
		if (flatListRef.current != null) {
			flatListRef.current?.scrollToIndex({ index, animated: false });
		}
	};

	const handleViewableItemsChanged = useRef(
		({ viewableItems }: { viewableItems: ViewToken[] }) => {
			if (viewableItems.length > 0) {
				const visibleItem = viewableItems[0];
				const index = allItems.findIndex(
					(item) => item.category === visibleItem.item.category
				);
				setSelectedCategory(IndexToCategory[index]);
			}
		}
	).current;

	const toggleFeedbackModal = (): void => {
		navigation.navigate(StackNavigation.Feedback, {});
	};

	const toggleSettingsModal = (): void => {
		navigation.navigate(StackNavigation.Settings, {});
	};

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<Navbar toggleFeedbackModal={toggleFeedbackModal} />
			<View style={styles.profilePicture}>
				<Pressable
					onPress={() => {
						toggleSettingsModal();
					}}
				>
					<ProfilePicture
						imageUrl={data.profile_picture}
						base64={data.profile_picture.slice(0, 5) !== 'https'}
					/>
				</Pressable>
				<View>
					<FullName firstName={data.first_name} lastName={data.last_name} />
					<Username username={data.username} />
				</View>
			</View>
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
		</SafeAreaView>
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
		shadowColor: 'black',
	},
});

export default Profile;
