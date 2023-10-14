export interface UserOutfits {
	category: string,
    data: UserOutfit[],
}

export interface UserOutfit {
	oid: string,
	title: string,
	clothing_items: string[],
	uid: string,
	created_at: string
}