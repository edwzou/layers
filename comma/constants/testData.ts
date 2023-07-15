import img1 from '../assets/img1.png';
import img0 from '../assets/img0.png';
import img2 from '../assets/img2.png';
import img3 from '../assets/img3.png';
import lincolnPfp from '../assets/lincoln.jpg'
import pant1 from "../assets/testPants1.png"
import shoe1 from "../assets/testShoe1.png"
import top2 from "../assets/testTop2.png"
import top3 from "../assets/testTop3.png"
import pant3 from "../assets/testPants3.png"
import shoe3 from "../assets/testShoe3.png"

import { ClothingTypes  } from './Enums'

export const outerwearData = [
    {
        id: 'img0',
        img: img0,
        title: 'burberry',
    },
    {
        id: 'img0',
        img: img0,
        title: 'burberry',
    },
    {
        id: 'img0',
        img: img0,
        title: 'burberry',
    },
];

export const topData = [
    {
        id: 'img1',
        img: img1,
        title: 'burberry',
    },
    {
        id: 'img1',
        img: img1,
        title: 'burberry',
    },
    {
        id: 'img1',
        img: img1,
        title: 'burberry',
    },
];

export const outfitData = [
    {
        title: 'Friday night',
        items: [
            {
                id: 'img0',
                img: img0,
                title: 'goose',
            },
            {
                id: 'img1',
                img: img1,
                title: 'burberry',
            },
            {
                id: 'img2',
                img: img2,
                title: 'shoe',
            },
            {
                id: 'img3',
                img: img3,
                title: 'pant',
            },
        ],
    },
    {
        title: 'Weekend casual baby!',
        items: [
            {
                id: 'img0',
                img: img0,
                title: 'goose',
            },
            {
                id: 'img1',
                img: img1,
                title: 'burberry',
            },
            {
                id: 'img2',
                img: img2,
                title: 'shoe',
            },
            {
                id: 'img3',
                img: img3,
                title: 'pant',
            },
        ],
    },
    {
        title:
            "Seattle day 1 let's go get it! Seattle day 1 let's go get it! Seattle day 1 let's go get it! Seattle day 1 let's go get it! Seattle day 1 let's go get it! Seattle day 1 let's go get it!",
        items: [
            {
                id: 'img0',
                img: img0,
                title: 'goose',
            },
            {
                id: 'img1',
                img: img1,
                title: 'burberry',
            },
            {
                id: 'img2',
                img: img2,
                title: 'shoe',
            },
            {
                id: 'img3',
                img: img3,
                title: 'pant',
            },
        ],
    },
];

export const bottomsData = [
    {
        id: 'img3',
        img: img3,
        title: 'pant',
    },
    {
        id: 'img4',
        img: img3,
        title: 'pant',
    },
    {
        id: 'img5',
        img: img3,
        title: 'pant',
    },
    {
        id: 'img6',
        img: img3,
        title: 'pant',
    },
    {
        id: 'img7',
        img: img3,
        title: 'pant',
    },
    {
        id: 'img3',
        img: img3,
        title: 'pant',
    },
    {
        id: 'img4',
        img: img3,
        title: 'pant',
    },
    {
        id: 'img5',
        img: img3,
        title: 'pant',
    },
];

export const shoesData = [
    {
        id: 'img2',
        img: img2,
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
    }
]

export const userClothing = [
    {
        id: 0,
        image: img1,
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
    }, {
        id: 0,
        image: pant1,
        category: ClothingTypes.bottoms,
    },
    {
        id: 1,
        image: img3,
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
        image: img2,
        category: ClothingTypes.shoes,
    },
    {
        id: 2,
        image: shoe3,
        category: ClothingTypes.shoes,
    },
];
