import { baseUrl } from '../utils/apiUtils';
import axios from 'axios';
import {
	axiosEndpointErrorHandler,
	axiosEndpointErrorHandlerNoAlert,
} from '../utils/ErrorHandlers';
import { UserOutfit } from '../pages/OutfitView';
import { UserClothing } from '../pages/Match';

export const getForeignAllOutfits = async (
	uid: string,
	updateOutfits: (outfit: UserOutfit[]) => void
) => {
	console.log('Foreign Outfits');
	getAllOutfitsHandler(
		updateOutfits,
		`${baseUrl}/api/outfits/u/${uid}?parse=categories`
	);
};

export const getAllOutfits = async (
	updateOutfits: (outfit: UserOutfit[]) => void
) => {
	console.log('User Outfits');
	getAllOutfitsHandler(
		updateOutfits,
		`${baseUrl}/api/private/outfits?parse=categories`
	);
};

const getAllOutfitsHandler = async (
	updateOutfits: (outfit: UserOutfit[]) => void,
	query: string
) => {
	try {
		const { data, status } = await axios.get(query);

		if (status === 200) {
			console.log('Successfully Fetched Outfits');
			console.log(data.data);
			return updateOutfits(data.data);
		} else {
			throw new Error(`An Get All Outfits Error Has Occurred: ${status}`);
		}
	} catch (err: unknown) {
		void axiosEndpointErrorHandlerNoAlert(err);
		return updateOutfits([]);
	}
};

export const getForeignAllClothingItems = async (
	uid: string,
	setAllOuterwear: (wear: UserClothing[]) => void,
	setAllTops: (wear: UserClothing[]) => void,
	setAllBottoms: (wear: UserClothing[]) => void,
	setAllShoes: (wear: UserClothing[]) => void
) => {
	console.log('Foreign Clothing Items');
	getAllClothingItemsHandler(
		setAllOuterwear,
		setAllTops,
		setAllBottoms,
		setAllShoes,
		`${baseUrl}/api/clothing_items/u/${uid}?parse=categories`
	);
};

export const getAllClothingItems = async (
	setAllOuterwear: (wear: UserClothing[]) => void,
	setAllTops: (wear: UserClothing[]) => void,
	setAllBottoms: (wear: UserClothing[]) => void,
	setAllShoes: (wear: UserClothing[]) => void
) => {
	console.log('User Clothing Items');
	getAllClothingItemsHandler(
		setAllOuterwear,
		setAllTops,
		setAllBottoms,
		setAllShoes,
		`${baseUrl}/api/private/clothing_items?parse=categories`
	);
};

const getAllClothingItemsHandler = async (
	setAllOuterwear: (wear: UserClothing[]) => void,
	setAllTops: (wear: UserClothing[]) => void,
	setAllBottoms: (wear: UserClothing[]) => void,
	setAllShoes: (wear: UserClothing[]) => void,
	query: string
) => {
	try {
		const { data, status } = await axios.get(query);

		if (status === 200) {
			console.log('Successfully Fetched Clothing Items');
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
		void axiosEndpointErrorHandlerNoAlert(err);
		return (
			setAllOuterwear([]), setAllTops([]), setAllBottoms([]), setAllShoes([])
		);
	}
};

// export const allItemsGenerator = (outfits: UserOutfit[], out)
