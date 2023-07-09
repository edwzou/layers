import React from 'react';
import { View, Dimensions, Pressable } from 'react-native';
import ProfilePicture from '../../components/ProfilePicture/ProfilePicture';
import FullName from '../../components/Name/FullName'
import Username from '../../components/Name/Username'
import CategoryBar from '../../components/Navbar/CategoryBar';
import OutfitCard from '../../components/Card/OutfitCard';
import Navbar from '../../components/Navbar/Navbar'
import { FlatList } from 'react-native-gesture-handler';
import img1 from '../../assets/testImg.png';
import img2 from '../../assets/img2.png';
import img3 from '../../assets/img3.png';

const screenHeight = Dimensions.get('window').height;
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

export default function Profile() {
    return (
        <View style={{ alignItems: 'center' }}>
            <Navbar />
            <View style={{ marginBottom: 30 }}>
                <View>
                    <Pressable
                        onPress={() => {
                            console.log('PFP Click');
                        }}
                    >
                        <ProfilePicture />
                    </Pressable>
                    <View style={{ marginTop: 7 }}>
                        <FullName firstName={"Charlie"} lastName={"Wu"} />
                        <Username username={"_charlie_wu"} />
                    </View>
                </View>
            </View>
            <View style={{ gap: 20, alignItems: 'center' }}>
                <CategoryBar />
                <View style={{ height: screenHeight - 350 }}>
                    <FlatList
                        data={testData}
                        renderItem={({ item }) => <OutfitCard title={item.title} itemCount={item.items.length} items={item.items} />}
                        showsVerticalScrollIndicator={false}
                    />
                </View>
            </View>
        </View>
    );
}
