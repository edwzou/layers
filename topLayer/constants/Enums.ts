import { type TagActionType, type TagCategoryType } from 'components/Tag';

const outfits = 'outfits';
const outerwear = 'outerwear';
const tops = 'tops';
const bottoms = 'bottoms';
const shoes = 'shoes';

export const StepOverTypes = {
	edit: 'Edit',
	done: 'Done',
	send: 'Send',
	next: 'Next',
	update: 'Update',
} as const;

export interface ClothingCategoryTypes {
	// !!! Change these types
	outfits: any;
	outerwear: any;
	tops: any;
	bottoms: any;
	shoes: any;
}

export const ClothingTypes: ClothingCategoryTypes = {
	outfits,
	outerwear,
	tops,
	bottoms,
	shoes,
} as const;

export const StackNavigation = {
	Login: 'Login',
	SignUp: 'SignUp',
	Main: 'Main',
	Profile: 'Profile',
	Preview: 'Preview',
	Match: 'Match',
	Feedback: 'Feedback',
	Find: 'Find',
	ItemView: 'ItemView',
	EditClothing: 'EditClothing',
	OutfitView: 'OutfitView',
	Camera: 'Camera',
	Settings: 'Settings',
	MarkedList: 'MarkedList',
	OutfitPreview: 'Preview',
	ForeignProfile: 'ForeignProfile'
} as const;

export const NavigationBack = {
	back: 'back',
	close: 'close',
};

export const TagAction: TagActionType = {
	static: 'static',
	push: 'push',
	add: 'add',
	remove: 'remove',
};

export const TagCategory: TagCategoryType = {
	color: 'Color',
	brand: 'Brand',
};

export const CategoryToIndex: Record<string, number> = {
	outfits: 0,
	outerwear: 1,
	tops: 2,
	bottoms: 3,
	shoes: 4,
};

export const IndexToCategory: Record<number, string> = {
	0: outfits,
	1: outerwear,
	2: tops,
	3: bottoms,
	4: shoes,
};

export const ColorTags: Record<string, [string, string]> = {
  Blue: ["Blue", "#4891FF"],
  Teal: ["Teal", "#46B9C9"],
  Mint: ["Mint", "#A3DEC9"],
  Green: ["Green", "#6DC86E"],
  Olive: ["Olive", "#76956B"],
  Yellow: ["Yellow", "#EEE16B"],
  Beige: ["Beige", "#E8D3B4"],
  Brown: ["Brown", "#977854"],
  Orange: ["Orange", "#EBA655"],
  Red: ["Red", "#E55A5A"],
  Maroon: ["Maroon", "#AD4E4E"],
  Pink: ["Pink", "#F67ECE"],
  Purple: ["Purple", "#B77AC7"],
  Navy: ["Navy", "#3869B2"],
  Black: ["Black", "#121212"],
  Grey: ["Grey", "#CDCDCD"],
  White: ["White", "#F2F2F2"],
  Cream: ["Cream", "#FFFBEB"],
};
