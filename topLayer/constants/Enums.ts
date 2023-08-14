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
	Edit: 'Edit',
	Camera: 'Camera',
} as const;

export const NavigationBack = {
	back: 'back',
	close: 'close',
};

export const TagAction: TagActionType = {
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
