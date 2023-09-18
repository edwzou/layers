import pfp1 from '../assets/pfp1.jpg'
import pfp2 from '../assets/pfp2.jpg'
import pfp3 from '../assets/pfp3.jpg'
import pfp4 from '../assets/pfp4.jpg'

import outerwear1 from '../assets/outerwear1.png';
import outerwear2 from '../assets/outerwear2.png'
import outerwear3 from '../assets/outerwear3.png'
import outerwear4 from '../assets/outerwear4.png'
import outerwear5 from '../assets/outerwear5.png'
import outerwear6 from '../assets/outerwear6.png'

import tops1 from '../assets/tops1.png'
import tops2 from '../assets/tops2.png'
import tops3 from '../assets/tops3.png'
import tops4 from '../assets/tops4.png'
import tops5 from '../assets/tops5.png'
import tops6 from '../assets/tops6.png'
import tops7 from '../assets/tops7.png'
import tops8 from '../assets/tops8.png'

import bottoms1 from '../assets/bottoms1.png'
import bottoms2 from '../assets/bottoms2.png'
import bottoms3 from '../assets/bottoms3.png'
import bottoms4 from '../assets/bottoms4.png'
import bottoms5 from '../assets/bottoms5.png'

import shoes1 from '../assets/shoes1.png'
import shoes2 from '../assets/shoes2.png'
import shoes3 from '../assets/shoes3.png'
import shoes4 from '../assets/shoes4.png'

import { ClothingTypes, ColorTags } from './Enums';
import { User } from '../pages/Main';
import { UserItems } from '../pages/Main';

export const mockItemsData: UserItems[] = [
	{
		category: 'outfits',
		data: [
			{
				title: 'Weekend Casual',
				items: [
					{
						id: 'outerwear4',
						image: outerwear4,
						title: 'Fit shacket',
						size: 'l',
						category: 'outerwear',
						colors: [
							ColorTags.Beige,
							ColorTags.Navy,
							ColorTags.White,
						]
					},
					{
						id: 'tops1',
						image: tops1,
						title: 'Human 285 Designed',
						size: 'l',
						category: 'tops',
						colors: [
							ColorTags.Brown,
							ColorTags.White,
						]
					},
					{
						id: 'bottoms1',
						image: bottoms1,
						title: 'Parachute cargo',
						size: 'l',
						category: 'bottoms',
						colors: [
							ColorTags.Beige,
						]
					},
					{
						id: 'shoes3',
						image: shoes3,
						title: 'Air Jordan 1 Low SE',
						size: 'l',
						category: 'shoes',
						colors: [
							ColorTags.Beige,
							ColorTags.White,
						]
					},
				],
				category: ClothingTypes.outfits,
			},
			{
				title: 'Friday Night',
				items: [
					{
						id: 'outerwear3',
						image: outerwear3,
						title: 'Wool-blend jacket',
						size: 'l',
						category: 'outerwear',
						colors: [
							ColorTags.Black,
						]
					},
					{
						id: 'tops6',
						image: tops6,
						title: 'New York jersey',
						size: 'l',
						category: 'tops',
						colors: [
							ColorTags.Black,
							ColorTags.White,
						]
					},
					{
						id: 'bottoms2',
						image: bottoms2,
						title: 'Pleaded wide',
						size: 'l',
						category: 'bottoms',
						colors: [
							ColorTags.Black
						]
					},
					{
						id: 'shoes2',
						image: shoes2,
						title: 'Air Jordan 1 Retro High OG',
						size: 'l',
						category: 'shoes',
						colors: [
							ColorTags.Grey,
							ColorTags.White,
						]
					},
				],
				category: ClothingTypes.outfits,
			},
			{
				title:
					"Relaxed fit designed for roadtrips!",
				items: [
					{
						id: 'outerwear5',
						image: outerwear5,
						title: 'Relaxed fit',
						size: 'l',
						category: 'outerwear',
						colors: [
							ColorTags.Cream,
						]
					},
					{
						id: 'tops2',
						image: tops2,
						title: 'Keith Haring\'s Love tee',
						size: 'l',
						category: 'tops',
						colors: [
							ColorTags.Cream,
							ColorTags.Red,
							ColorTags.Pink,
						]
					},
					{
						id: 'bottoms4',
						image: bottoms4,
						title: 'HeatTech pile lined',
						size: 'l',
						category: 'bottoms',
						colors: [
							ColorTags.Grey
						]
					},
					{
						id: 'shoes3',
						image: shoes3,
						title: 'Air Jordan 1 Low SE',
						size: 'l',
						category: 'shoes',
						colors: [
							ColorTags.Beige,
							ColorTags.White,
						]
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
				id: 'outerwear4',
				image: outerwear4,
				title: 'Fit shacket',
				size: 'l',
				category: 'outerwear',
				colors: [
					ColorTags.Beige,
					ColorTags.Navy,
					ColorTags.White,
				]
			},
			{
				id: 'outerwear3',
				image: outerwear3,
				title: 'Wool-blend jacket',
				size: 'l',
				category: 'outerwear',
				colors: [
					ColorTags.Black,
				]
			},
			{
				id: 'outerwear5',
				image: outerwear5,
				title: 'Relaxed fit',
				size: 'l',
				category: 'outerwear',
				colors: [
					ColorTags.Cream,
				]
			},
		],
	},
	{
		category: 'tops',
		data: [
			{
				id: 'tops1',
				image: tops1,
				title: 'Human 285 Designed',
				size: 'l',
				category: 'tops',
				colors: [
					ColorTags.Brown,
					ColorTags.White,
				]
			},
			{
				id: 'tops2',
				image: tops2,
				title: 'Keith Haring\'s Love tee',
				size: 'l',
				category: 'tops',
				colors: [
					ColorTags.Cream,
					ColorTags.Red,
					ColorTags.Pink,
				]
			},
			{
				id: 'tops3',
				image: tops3,
				title: 'Geothermal Research',
				size: 'l',
				category: 'tops',
				colors: [
					ColorTags.Black,
					ColorTags.Orange,
					ColorTags.Navy,
				]
			},
			{
				id: 'tops6',
				image: tops6,
				title: 'New York jersey',
				size: 'l',
				category: 'tops',
				colors: [
					ColorTags.Black,
					ColorTags.White,
				]
			},
		],
	},
	{
		category: 'bottoms',
		data: [
			{
				id: 'bottoms1',
				image: bottoms1,
				title: 'Parachute cargo',
				size: 'l',
				category: 'bottoms',
				colors: [
					ColorTags.Beige,
				]
			},
			{
				id: 'bottoms2',
				image: bottoms2,
				title: 'Pleaded wide',
				size: 'l',
				category: 'bottoms',
				colors: [
					ColorTags.Black
				]
			},
			{
				id: 'bottoms4',
				image: bottoms4,
				title: 'HeatTech pile lined',
				size: 'l',
				category: 'bottoms',
				colors: [
					ColorTags.Grey
				]
			},
		],
	},
	{
		category: 'shoes',
		data: [
			{
				id: 'shoes2',
				image: shoes2,
				title: 'Air Jordan 1 Retro High OG',
				size: 'l',
				category: 'shoes',
				colors: [
					ColorTags.Grey,
					ColorTags.White,
				]
			},
			{
				id: 'shoes3',
				image: shoes3,
				title: 'Air Jordan 1 Low SE',
				size: 'l',
				category: 'shoes',
				colors: [
					ColorTags.Beige,
					ColorTags.White,
				]
			},
		],
	},
];

export const mockItemsData1: UserItems[] = [];

export const mockItemsData2: UserItems[] = [
	{
		category: 'outfits',
		data: [
			{
				title: 'fridays',
				items: [
					{
						id: 'outerwear6',
						image: outerwear6,
						title: 'Coated Bomber',
						size: 's',
						category: 'outerwear',
						colors: [
							ColorTags.Black,
						]
					},
					{
						id: 'tops8',
						image: tops8,
						title: 'Relaxed fit',
						size: 's',
						category: 'tops',
						colors: [
							ColorTags.Black,
						]
					},
					{
						id: 'bottoms5',
						image: bottoms5,
						title: 'Stretch Slim Straight',
						size: 's',
						category: 'bottoms',
						colors: [
							ColorTags.Blue
						]
					},
					{
						id: 'shoes4',
						image: shoes4,
						title: 'Nike Air Force 1 Shadow',
						size: 's',
						category: 'shoes',
						colors: [
							ColorTags.White,
							ColorTags.Teal,
							ColorTags.Mint
						]
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
				id: 'outerwear6',
				image: outerwear6,
				title: 'Coated Bomber',
				size: 's',
				category: 'outerwear',
				colors: [
					ColorTags.Black,
				]
			},
		],
	},
	{
		category: 'tops',
		data: [
			{
				id: 'tops7',
				image: tops7,
				title: 'Rib-knit top',
				size: 's',
				category: 'tops',
				colors: [
					ColorTags.Cream,
				]
			},
			{
				id: 'tops8',
				image: tops8,
				title: 'Relaxed fit',
				size: 's',
				category: 'tops',
				colors: [
					ColorTags.Black,
				]
			},
		],
	},
	{
		category: 'bottoms',
		data: [
			{
				id: 'bottoms5',
				image: bottoms5,
				title: 'Stretch Slim Straight',
				size: 's',
				category: 'bottoms',
				colors: [
					ColorTags.Blue
				]
			},
		],
	},
	{
		category: 'shoes',
		data: [
			{
				id: 'shoes4',
				image: shoes4,
				title: 'Nike Air Force 1 Shadow',
				size: 's',
				category: 'shoes',
				colors: [
					ColorTags.White,
					ColorTags.Teal,
					ColorTags.Mint
				]
			},
		],
	},
];

export const mockItemsData3: UserItems[] = [
	{
		category: 'outfits',
		data: [
		],
	},
	{
		category: 'outerwear',
		data: [
			{
				id: 'outerwear1',
				image: outerwear1,
				category: ClothingTypes.outerwear,
				title: 'Canada Goose',
				size: 'm',
				colors: [
					ColorTags.Black,
					ColorTags.Red,
					ColorTags.White,
				],
			},
			{
				id: 'outerwear2',
				image: outerwear2,
				category: ClothingTypes.outerwear,
				title: 'Cargo jacket',
				size: 'm',
				colors: [ColorTags.Brown],
			},
		],
	},
	{
		category: 'tops',
		data: [
			{
				id: 'tops4',
				image: tops4,
				category: ClothingTypes.tops,
				title: 'Relaxed long',
				size: 'm',
				colors: [ColorTags.Olive],
			},
			{
				id: 'tops5',
				image: tops5,
				category: ClothingTypes.tops,
				title: 'Nirvana',
				size: 'm',
				colors: [
					ColorTags.Blue,
					ColorTags.White
				],
			},
		]
	},
	{
		category: 'bottoms',
		data: [
			{
				id: 'bottoms3',
				image: bottoms3,
				category: ClothingTypes.bottoms,
				title: 'Semi-formal',
				size: 'm',
				colors: [ColorTags.Beige],
			},
		],
	},
	{
		category: 'shoes',
		data: [
			{
				id: 'shoes1',
				image: shoes1,
				category: ClothingTypes.shoes,
				title: 'Nike lows',
				size: 'm',
				colors: [
					ColorTags.Black,
					ColorTags.White
				],
			},
		],
	},
];

export const mockUserData: User = {
	uid: '00000000-abcd-efgh-ijkl-mnopqrstuvwx',
	firstName: 'Luis',
	lastName: 'Ramos',
	email: 'luisramos@gmail.com',
	username: 'luis_ramos_',
	password: 'Layers2023',
	privateOption: 'f',
	followers: [],
	following: [],
	profilePicture: pfp1,
	items: mockItemsData,
}

export const foreignUsersData: User[] = [
	{
		uid: '00000001-abcd-efgh-ijkl-mnopqrstuvwx',
		firstName: 'Elu',
		lastName: 'Deere',
		email: 'eludeere@gmail.com',
		username: 'elu.deere',
		password: 'Layers2023',
		privateOption: 't',
		followers: [],
		following: [],
		profilePicture: pfp4,
		items: mockItemsData1,
	},
	{
		uid: '00000002-abcd-efgh-ijkl-mnopqrstuvwx',
		firstName: 'maya',
		lastName: 'smith',
		email: 'mayasmith@gmail.com',
		username: 'mayas23',
		password: 'Layers2023',
		privateOption: 'f',
		followers: [],
		following: [],
		profilePicture: pfp3,
		items: mockItemsData2,
	},
	{
		uid: '00000003-abcd-efgh-ijkl-mnopqrstuvwx',
		firstName: 'Noah',
		lastName: 'Barry',
		email: 'noahbarry@gmail.com',
		username: 'noahbarry',
		password: 'Layers2023',
		privateOption: 'f',
		followers: [],
		following: [],
		profilePicture: pfp2,
		items: mockItemsData3,
	},
];