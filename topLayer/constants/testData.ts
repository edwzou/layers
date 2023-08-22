import image1 from '../assets/img1.png';
import image0 from '../assets/img0.png';
import image2 from '../assets/img2.png';
import image3 from '../assets/img3.png';
import lincolnPfp from '../assets/lincoln.jpg';
import pant1 from '../assets/testPants1.png';
import shoe1 from '../assets/testShoe1.png';
import top2 from '../assets/testTop2.png';
import top3 from '../assets/testTop3.png';
import pant3 from '../assets/testPants3.png';
import shoe3 from '../assets/testShoe3.png';

import { ClothingTypes, ColorTags } from './Enums';

export const clothingData = [
	{
		category: 'outfits',
		data: [
			{
				title: 'Friday night',
				items: [
					{
						id: 'image0',
						image: image0,
						title: 'goose',
					},
					{
						id: 'image1',
						image: image1,
						title: 'burberry',
					},
					{
						id: 'image2',
						image: image2,
						title: 'shoe',
					},
					{
						id: 'image3',
						image: image3,
						title: 'pant',
					},
				],
				category: ClothingTypes.outfits,
			},
			{
				title: 'Weekend casual baby!',
				items: [
					{
						id: 'image0',
						image: image0,
						title: 'goose',
						category: ClothingTypes.outerwear,
					},
					{
						id: 'image1',
						image: image1,
						title: 'burberry',
						category: ClothingTypes.tops,
					},
					{
						id: 'image2',
						image: image2,
						title: 'shoe',
						category: ClothingTypes.shoes,
					},
					{
						id: 'image3',
						image: image3,
						title: 'pant',
						category: ClothingTypes.bottoms,
					},
				],
				category: ClothingTypes.outfits,
			},
			{
				title:
					"Seattle day 1 let's go get it! Seattle day 1 let's go get it! Seattle day 1 let's go get it! Seattle day 1 let's go get it! Seattle day 1 let's go get it! Seattle day 1 let's go get it!",
				items: [
					{
						id: 'image0',
						image: image0,
						title: 'goose',
					},
					{
						id: 'image1',
						image: image1,
						title: 'burberry',
					},
					{
						id: 'image2',
						image: image2,
						title: 'shoe',
					},
					{
						id: 'image3',
						image: image3,
						title: 'pant',
					},
				],
				category: ClothingTypes.outfits,
			},
		],
	},
	{
		category: 'outerwear',
		data: [
			{
				id: 'image0',
				image: image0,
				title: 'goose',
			},
			{
				id: 'image0',
				image: image0,
				title: 'goose',
			},
			{
				id: 'image0',
				image: image0,
				title: 'goose',
			},
		],
	},
	{
		category: 'tops',
		data: [
			{
				id: 'image1',
				image: image1,
				title: 'burberry',
			},
			{
				id: 'image1',
				image: image1,
				title: 'burberry',
			},
			{
				id: 'image1',
				image: image1,
				title: 'burberry',
			},
		],
	},
	{
		category: 'bottoms',
		data: [
			{
				id: 'image3',
				image: image3,
				title: 'pant',
			},
			{
				id: 'image4',
				image: image3,
				title: 'pant',
			},
			{
				id: 'image5',
				image: image3,
				title: 'pant',
			},
			{
				id: 'image6',
				image: image3,
				title: 'pant',
			},
			{
				id: 'image7',
				image: image3,
				title: 'pant',
			},
			{
				id: 'image3',
				image: image3,
				title: 'pant',
			},
			{
				id: 'image4',
				image: image3,
				title: 'pant',
			},
			{
				id: 'image5',
				image: image3,
				title: 'pant',
			},
		],
	},
	{
		category: 'shoes',
		data: [
			{
				id: 'image2',
				image: image2,
				title: 'shoe',
			},
		],
	},
];

export const outerwearData = [
	{
		id: 'image0',
		image: image0,
		title: 'burberry',
	},
	{
		id: 'image0',
		image: image0,
		title: 'burberry',
	},
	{
		id: 'image0',
		image: image0,
		title: 'burberry',
	},
];

export const topData = [
	{
		id: 'image1',
		image: image1,
		title: 'burberry',
	},
	{
		id: 'image1',
		image: image1,
		title: 'burberry',
	},
	{
		id: 'image1',
		image: image1,
		title: 'burberry',
	},
];

export const outfitData = [
	{
		title: 'Friday night',
		items: [
			{
				id: 'image0',
				image: image0,
				title: 'goose',
			},
			{
				id: 'image1',
				image: image1,
				title: 'burberry',
			},
			{
				id: 'image2',
				image: image2,
				title: 'shoe',
			},
			{
				id: 'image3',
				image: image3,
				title: 'pant',
			},
		],
		category: ClothingTypes.outfits,
	},
	{
		title: 'Weekend casual baby!',
		items: [
			{
				id: 'image0',
				image: image0,
				title: 'goose',
				category: ClothingTypes.outerwear,
			},
			{
				id: 'image1',
				image: image1,
				title: 'burberry',
				category: ClothingTypes.tops,
			},
			{
				id: 'image2',
				image: image2,
				title: 'shoe',
				category: ClothingTypes.shoes,
			},
			{
				id: 'image3',
				image: image3,
				title: 'pant',
				category: ClothingTypes.bottoms,
			},
		],
		category: ClothingTypes.outfits,
	},
	{
		title:
			"Seattle day 1 let's go get it! Seattle day 1 let's go get it! Seattle day 1 let's go get it! Seattle day 1 let's go get it! Seattle day 1 let's go get it! Seattle day 1 let's go get it!",
		items: [
			{
				id: 'image0',
				image: image0,
				title: 'goose',
			},
			{
				id: 'image1',
				image: image1,
				title: 'burberry',
			},
			{
				id: 'image2',
				image: image2,
				title: 'shoe',
			},
			{
				id: 'image3',
				image: image3,
				title: 'pant',
			},
		],
		category: ClothingTypes.outfits,
	},
];

export const bottomsData = [
	{
		id: 'image3',
		image: image3,
		title: 'pant',
	},
	{
		id: 'image4',
		image: image3,
		title: 'pant',
	},
	{
		id: 'image5',
		image: image3,
		title: 'pant',
	},
	{
		id: 'image6',
		image: image3,
		title: 'pant',
	},
	{
		id: 'image7',
		image: image3,
		title: 'pant',
	},
	{
		id: 'image3',
		image: image3,
		title: 'pant',
	},
	{
		id: 'image4',
		image: image3,
		title: 'pant',
	},
	{
		id: 'image5',
		image: image3,
		title: 'pant',
	},
];

export const shoesData = [
	{
		id: 'image2',
		image: image2,
		title: 'shoe',
	},
];

export const usersData = [
	{
		uid: 'a45ab439-0dce-448a-9126-43f32f8d56c8',
		first_name: 'John',
		last_name: 'Doe',
		email: 'joebu@example.com',
		username: 'joebu',
		password: 'password',
		private: true,
		followers: {},
		following: {},
		profile_picture: lincolnPfp,
	},
	{
		uid: '150794ee-7d24-4dfd-9250-fa4bb87dbd26',
		first_name: 'John',
		last_name: 'Doe',
		email: 'johndoe@example.com',
		username: 'johndoe',
		password: 'password',
		private: true,
		followers: {},
		following: {},
		profile_picture: lincolnPfp,
	},
	{
		uid: 'bb53791c-da9c-4b90-98d1-3380a8ed89cc',
		first_name: 'John',
		last_name: 'Doe',
		email: 'johandoe@example.com',
		username: 'joahndoe',
		password: 'password',
		private: true,
		followers: {},
		following: {},
		profile_picture: lincolnPfp,
	},
];

export const userClothing = [
	{
		id: 0,
		image: image1,
		category: ClothingTypes.tops,
	},
	{
		id: 1,
		image: top2,
		category: ClothingTypes.tops,
	},
	{
		id: 2,
		image: top3,
		category: ClothingTypes.tops,
	},
	{
		id: 0,
		image: pant1,
		category: ClothingTypes.bottoms,
	},
	{
		id: 1,
		image: image3,
		category: ClothingTypes.bottoms,
	},
	{
		id: 2,
		image: pant3,
		category: ClothingTypes.bottoms,
	},
	{
		id: 0,
		image: shoe1,
		category: ClothingTypes.shoes,
	},
	{
		id: 1,
		image: image2,
		category: ClothingTypes.shoes,
	},
	{
		id: 2,
		image: shoe3,
		category: ClothingTypes.shoes,
	},
];

export const colorTags = [
	ColorTags.Beige,
	ColorTags.Olive,
	ColorTags.Navy,
	ColorTags.White,
	ColorTags.Yellow
]