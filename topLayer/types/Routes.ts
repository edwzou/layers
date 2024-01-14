import { type UserClothing } from './Clothing';
import { UserOutfit, outfitType } from './Outfit';
import { type markedUser } from './User';

interface empty {}

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
