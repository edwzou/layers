import { Pressable, Text, View } from 'react-native'
import React, { useEffect, useRef } from 'react'
import GeneralModal, { refPropType } from '../../components/Modal/GeneralModal'
import { highTranslateY } from '../../utils/modalMaxShow';
import { UserClothing } from 'pages/Match';
import EditClothing from './EditClothing';
import { StepOverTypes } from '../../constants/Enums';

type EditClothingModalPropsType = {
    clothing?: UserClothing[]
}

const EditClothingModal = ({ clothing }: EditClothingModalPropsType) => {
    const modalRef = useRef<refPropType>(null);

    useEffect(() => {
        modalRef.current?.scrollTo(highTranslateY)
    }, [])

    return (
        <View style={{ flex: 1 }}>
            <Pressable style={{ backgroundColor: 'red', marginTop: 100 }} onPress={() => { modalRef.current?.scrollTo(highTranslateY) }}><Text>TOGGLE</Text></Pressable>
            <GeneralModal title='Edit' content={<EditClothing />} ref={modalRef} stepOver={{ type: StepOverTypes.done, handlePress: () => { console.log("Done") } }} />
        </View>
    )
}

export default EditClothingModal