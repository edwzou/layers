import React from 'react'
import OutfitCard from '../Card/OutfitCard'
import img0 from '../../assets/img0.png';
import img1 from '../../assets/img1.png';
import img2 from '../../assets/img2.png';
import img3 from '../../assets/img3.png';
import { FlatList } from 'react-native-gesture-handler';

const testData = [
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
        title: 'Seattle day 1 let\'s go get it! Seattle day 1 let\'s go get it! Seattle day 1 let\'s go get it! Seattle day 1 let\'s go get it! Seattle day 1 let\'s go get it! Seattle day 1 let\'s go get it!',
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
]

export default function OutfitCategory() {
    return (
        <FlatList
            data={testData}
            renderItem={({ item }) => <OutfitCard title={item.title} itemCount={item.items.length} items={item.items} />}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 100 }}
        />
    );
}