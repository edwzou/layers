import { StyleSheet } from 'react-native';
import React, {
	type Dispatch,
	type SetStateAction,
	createContext,
	useRef,
	useEffect,
	useState,
} from 'react';

import PagerView from 'react-native-pager-view';

import ProfilePage from '../Profile/ProfilePage';
import MatchPage from '../Match/MatchPage';
import FindPage from '../Find/FindPage';

import { UserOutfit } from '../../pages/OutfitView';
import { UserAllItems, UserClothing } from '../../pages/Match';
import { getAllClothingItems, getAllOutfits } from '../../endpoints/wardrobe';

export const MainPageContext = createContext({
	navigationArray: [() => {}],
	allItems: [] as UserAllItems[],
	setShouldRefreshMatchPage: (() => {}) as Dispatch<SetStateAction<boolean>>,
	setShouldRefreshOutfitEdit: (() => {}) as Dispatch<SetStateAction<boolean>>,
	setShouldRefreshOutfitViewPage: (() => {}) as Dispatch<
		SetStateAction<boolean>
	>,
});

const MainPage: React.FC = () => {
	console.log('rendered');
	const [currentPage, setCurrentPage] = useState(1);
	const [allOutfits, setAllOutfits] = useState<UserOutfit[]>([]);
	const [allOuterwear, setAllOuterwear] = useState<UserClothing[]>([]);
	const [allTops, setAllTops] = useState<UserClothing[]>([]);
	const [allBottoms, setAllBottoms] = useState<UserClothing[]>([]);
	const [allShoes, setAllShoes] = useState<UserClothing[]>([]);

	const [shouldRefreshMatchPage, setShouldRefreshMatchPage] = useState(true);
	const [shouldRefreshOutfitEdit, setShouldRefreshOutfitEdit] = useState(true);
	const [shouldRefreshOutfitViewPage, setShouldRefreshOutfitViewPage] =
		useState(true);

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

	// fetched all the outfits and clothings
	useEffect(() => {
		if (
			shouldRefreshMatchPage ||
			shouldRefreshOutfitEdit ||
			shouldRefreshOutfitViewPage
		) {
			void getAllOutfits(setAllOutfits);
			void getAllClothingItems(
				setAllOuterwear,
				setAllTops,
				setAllBottoms,
				setAllShoes
			);
		}
		if (shouldRefreshMatchPage) {
			setShouldRefreshMatchPage(false);
		}
		if (shouldRefreshOutfitEdit) {
			setShouldRefreshOutfitEdit(false);
		}
		if (shouldRefreshOutfitViewPage) {
			setShouldRefreshOutfitViewPage(false);
		}
	}, [
		shouldRefreshMatchPage,
		shouldRefreshOutfitEdit,
		shouldRefreshOutfitViewPage,
	]);

	const ref = useRef<PagerView>(null);
	const navigateToMatch = (): void => {
		ref.current?.setPage(0);
	};
	const navigateToProfile = (): void => {
		ref.current?.setPage(1);
	};
	const navigateToFind = (): void => {
		ref.current?.setPage(2);
	};

	const onPageScroll = (event: any) => {
		const { position } = event.nativeEvent;
		console.log(` Position: ${position}`);
		// setCurrentPage(position);
		// Perform actions based on the scroll state
	};

	return (
		<MainPageContext.Provider
			value={{
				navigationArray: [navigateToProfile, navigateToMatch, navigateToFind],
				allItems: allItems,
				setShouldRefreshMatchPage: setShouldRefreshMatchPage,
				setShouldRefreshOutfitEdit: setShouldRefreshOutfitEdit,
				setShouldRefreshOutfitViewPage: setShouldRefreshOutfitViewPage,
			}}
		>
			<PagerView
				style={styles.pager}
				ref={ref}
				initialPage={1}
				onPageScrollStateChanged={onPageScroll}
			>
				<MatchPage />
				<ProfilePage />
				<FindPage />
			</PagerView>
		</MainPageContext.Provider>
	);
};

export default MainPage;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	pager: {
		flex: 1,
		alignSelf: 'stretch',
	},
});
