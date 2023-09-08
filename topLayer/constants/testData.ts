import image1 from '../assets/img1.png';
import image0 from '../assets/img0.png';
import image2 from '../assets/img2.png';
import image3 from '../assets/img3.png';
import lincolnPfp from '../assets/lincoln.jpg';

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
				size: 's',
				category: 'outerwear',
				colors: [
					ColorTags.Black,
					ColorTags.Red,
					ColorTags.White,
				]
			},
			{
				id: 'image0',
				image: image0,
				title: 'black jacket',
				size: 'm',
				category: 'outerwear',
				colors: [
					ColorTags.Black,
					ColorTags.Red,
					ColorTags.White,
				]
			},
			{
				id: 'image0',
				image: image0,
				title: 'yessir',
				size: 'l',
				category: 'outerwear',
				colors: [
					ColorTags.Black,
					ColorTags.Red,
					ColorTags.White,
				]
			},
		],
	},
	{
		category: 'tops',
		data: [
			{
				id: 'image1',
				image: image1,
				title: 'my first burberry shirt',
				size: 's',
				category: 'tops',
				colors: [
					ColorTags.Beige,
					ColorTags.Red,
					ColorTags.White,
				]
			},
			{
				id: 'image1',
				image: image1,
				title: 'YES',
				size: 'm',
				category: 'tops',
				colors: [
					ColorTags.Beige,
					ColorTags.Red,
					ColorTags.White,
				]
			},
			{
				id: 'image1',
				image: image1,
				title: 'beige shirt',
				size: 'l',
				category: 'tops',
				colors: [
					ColorTags.Beige,
					ColorTags.Red,
					ColorTags.White,
				]
			},
		],
	},
	{
		category: 'bottoms',
		data: [
			{
				id: 'image3',
				image: image3,
				title: 'my pants',
				size: 's',
				category: 'bottoms',
				colors: [
					ColorTags.Olive
				]
			},
			{
				id: 'image4',
				image: image3,
				title: 'same copy',
				size: 'm',
				category: 'bottoms',
				colors: [
					ColorTags.Olive
				]
			},
			{
				id: 'image5',
				image: image3,
				title: 'beater',
				size: 'l',
				category: 'bottoms',
				colors: [
					ColorTags.Olive
				]
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
				size: 's',
				category: 'shoes',
				colors: [
					ColorTags.Black,
					ColorTags.Yellow,
					ColorTags.Red,
					ColorTags.Purple,
					ColorTags.Blue,
				]
			},
			{
				id: 'image2',
				image: image2,
				title: 'jordans',
				size: 'm',
				category: 'shoes',
				colors: [
					ColorTags.Black,
					ColorTags.Yellow,
					ColorTags.Red,
					ColorTags.Purple,
					ColorTags.Blue,
				]
			},
			{
				id: 'image2',
				image: image2,
				title: 'black nike',
				size: 'l',
				category: 'shoes',
				colors: [
					ColorTags.Black,
					ColorTags.Yellow,
					ColorTags.Red,
					ColorTags.Purple,
					ColorTags.Blue,
				]
			},
		],
	},
];

export const mockUserData = {
	uid: '12345678-abcd-efgh-ijkl-mnopqrstuvwx',
	firstName: 'Charlie',
	lastName: 'Wu',
	email: 'charliewu@gmail.com',
	username: 'charlie_wu_',
	password: 'Layers2023',
	privateOption: 'f',
	followers: [],
	following: [],
	profilePicture: '../../assets/marble-pfp.png',
}

export const foreignUsersData = [
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