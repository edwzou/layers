import { type UserClothing, type outfitType } from './Clothing';
import { type UserOutfit } from './Outfit';
import { type markedUser } from './User';

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
		editable: boolean;
	};
	ItemViewPage: {
		item: UserClothing;
		editable: boolean;
	};
	CameraWrapper: {
		returnToPfp: boolean;
	};
}
