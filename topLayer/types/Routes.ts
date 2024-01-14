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
	OutfitFullPage: {
		item: UserOutfit;
	};
	ItemViewPage: {
		item: UserClothing;
		editable: boolean;
	};
	ItemCamera: empty;
	CameraPfp: empty;
}
