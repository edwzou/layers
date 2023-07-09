import React from 'react'
import OutfitCard from '../Card/OutfitCard'
import img1 from '../../assets/testImg.png';
import img2 from '../../assets/img2.png';
import img3 from '../../assets/img3.png';
import { FlatList } from 'react-native-gesture-handler';

const testData = [
    {
        title: 'Friday night',
        items: [
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
                id: 'img38',
                img: img3,
                title: 'pant',
            },
        ],
    },
    {
        title: 'Weekend casual',
        items: [
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
                id: 'img38',
                img: img3,
                title: 'pant',
            },
        ],
    },
    {
        title: 'Seattle day 1 let\'s go get it!',
        items: [
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
                id: 'img38',
                img: img3,
                title: 'pant',
            },
        ],
    },
]

export default function OutfitCategory() {
    return (
        <FlatList
            data={testData}
            renderItem={({ item }) => <OutfitCard title={item.title} itemCount={item.items.length} items={item.items} />}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 20 }}
        />
    );
}