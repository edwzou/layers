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

import axios from 'axios';
import { baseUrl } from '../../utils/apiUtils';
import { UserOutfit } from '../../pages/OutfitView';
import { UserAllItems, UserClothing } from '../../pages/Match';
import { axiosEndpointErrorHandler } from '../../utils/ErrorHandlers';

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
	const [allOutfits, setAllOutfits] = useState<UserOutfit[]>([]);
	const [allOuterwear, setAllOuterwear] = useState<UserClothing[]>([]);
	const [allTops, setAllTops] = useState<UserClothing[]>([]);
	const [allBottoms, setAllBottoms] = useState<UserClothing[]>([]);
	const [allShoes, setAllShoes] = useState<UserClothing[]>([]);

	const [shouldRefreshMatchPage, setShouldRefreshMatchPage] = useState(false);
	const [shouldRefreshOutfitEdit, setShouldRefreshOutfitEdit] = useState(false);
	const [shouldRefreshOutfitViewPage, setShouldRefreshOutfitViewPage] =
		useState(false);

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
	const getAllOutfits = async () => {
		try {
			const { data, status } = await axios.get(
				`${baseUrl}/api/private/outfits?parse=categories`
			);

			if (status === 200) {
				return setAllOutfits(data.data);
			} else {
				throw new Error(`An Get All Outfits Error Has Occurred: ${status}`);
			}
		} catch (err: unknown) {
			void axiosEndpointErrorHandler(err);
			return setAllOutfits([]);
		}
	};

	const getAllClothingItems = async () => {
		try {
			const { data, status } = await axios.get(
				`${baseUrl}/api/private/clothing_items?parse=categories`
			);

			if (status === 200) {
				console.log('main profile');
				console.log(data.data);
				return (
					setAllOuterwear(data.data['outerwear']),
					setAllTops(data.data['tops']),
					setAllBottoms(data.data['bottoms']),
					setAllShoes(data.data['shoes'])
				);
			} else {
				throw new Error(
					`An Get All Clothing Items Error Has Occurred: ${status}`
				);
			}
		} catch (err: unknown) {
			void axiosEndpointErrorHandler(err);
			return (
				setAllOuterwear([]), setAllTops([]), setAllBottoms([]), setAllShoes([])
			);
		}
	};

	// fetches all the outfits and clothings
	useEffect(() => {
		void getAllOutfits();
		void getAllClothingItems();
	}, []);

	useEffect(() => {
		if (
			shouldRefreshMatchPage ||
			shouldRefreshOutfitEdit ||
			shouldRefreshOutfitViewPage
		) {
			void getAllOutfits();
			void getAllClothingItems();
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
			<PagerView style={styles.pager} ref={ref} initialPage={1}>
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
