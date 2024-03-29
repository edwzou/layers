import { type UserClothing } from './Clothing';
import { type UserOutfit, type outfitType } from './Outfit';
import { type markedUser } from './User';

type empty = Record<PropertyKey, never>;

export interface RouteTypes {
	[key: string]: object;
	ForeignProfile: {
		markedUser: markedUser;
	};
	OutfitPreview: {
		matchItems: outfitType;
	};
	OutfitViewPage: {
		item: UserOutfit;
	};
	OutfitPage: {
		item: UserOutfit;
	};
	ItemViewPage: {
		item: UserClothing;
	};
	ItemPage: {
		item: UserClothing;
	};
	ItemCamera: empty;
	CameraPfp: empty;
}
