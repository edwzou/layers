import { UserClothing } from '../../types/Clothing';
import { outfitClothingItemsType } from '../../types/Outfit';

export const getFlatArrayOfValues = (
	clothingList: outfitClothingItemsType
): UserClothing[] => {
	return Object.values(clothingList).flat();
};
