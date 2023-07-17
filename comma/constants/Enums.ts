import { TagActionType, TagCategoryType } from 'components/Tag';

export const StepOverTypes = {
	edit: 'Edit',
	done: 'Done',
	send: 'Send',
	next: 'Next',
} as const;

export type ClothingCategoryTypes = {
	// !!! Change these types
	outfits: any;
	outerwear: any;
	tops: any;
	bottoms: any;
	shoes: any;
};

export const ClothingTypes: ClothingCategoryTypes = {
	outfits: 'outfits',
	outerwear: 'outerwear',
	tops: 'tops',
	bottoms: 'bottoms',
	shoes: 'shoes',
} as const;

export const StackNavigation = {
	Login: 'Login',
	SignUp: 'Sign Up',
	Profile: 'Profile',
	Preview: 'Preview',
	Match: 'Match',
	Feedback: 'Feedback',
	Find: 'Find',
	Edit: 'Edit',
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
