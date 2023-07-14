import { Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useRef } from 'react'
import GeneralModal, { refPropType } from '../../components/Modal/GeneralModal'
import { maxTranslateY } from '../../utils/modalMaxShow';
import { UserClothing } from 'pages/Match';
import EditClothing from './EditClothing';
import { StepOverTypes } from '../../constants/Enums';

type EditClothingModalPropsType = {
    clothing?: UserClothing[]
}

const EditClothingModal = ({ clothing }: EditClothingModalPropsType) => {
    const modalRef = useRef<refPropType>(null);

    useEffect(() => {
        modalRef.current?.scrollTo(maxTranslateY)
    }, [])

    return (
        <View style={{ flex: 1 }}>
            <Pressable style={{ backgroundColor: 'red', justifyContent: 'center', alignItems: 'center', marginTop: 100 }} onPress={() => { modalRef.current?.scrollTo(maxTranslateY) }}><Text>TOGGLE</Text></Pressable>
            <GeneralModal title='Edit' content={<EditClothing />} ref={modalRef} stepOver={{ type: StepOverTypes.done, handlePress: () => { console.log("Done") } }} />
        </View>
    )
}

export default EditClothingModal

const styles = StyleSheet.create({})