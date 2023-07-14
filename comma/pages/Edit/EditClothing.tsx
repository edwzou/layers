import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import StackedTextBox from '../../components/Textbox/StackedTextbox'
import ItemCell from '../../components/Cell/ItemCell'

import pants from "../../assets/testPants1.png"
import GlobalStyles from '../../constants/GlobalStyles'
import { screenWidth } from '../../utils/modalMaxShow'

import { ITEM_SIZE } from '../../utils/GapCalc'
import Dropdown from '../../components/Dropdown/Dropdown'

const EditClothing = () => {
    const [itemName, setItemName] = useState('')

    const [openSize, setOpenSize] = useState(false);
    const [sizeValue, setSizeValue] = useState(); // Change this to actual item size
    const [sizeItems, setSizeItems] = useState([
        { label: 'Extra-extra small', value: 'xxs' },
        { label: 'Extra small', value: 'xs' },
        { label: 'Medium', value: 'm' },
        { label: 'Large', value: 'l' },
        { label: 'Extra large', value: 'xl' },
        { label: 'Extra-extra large', value: 'xxl' },
    ])


    return (
        <View style={{ flex: 1, width: '100%' }}>
            <Dropdown data={sizeItems} label='Item name' onSelect={setSizeValue} />
        </View>
        // <View style={{ flex: 1 }}>
        //     <View style={{ paddingHorizontal: GlobalStyles.layout.xGap }}>
        //         <StackedTextBox label='Item name' onFieldChange={setItemName} />
        //         {/* !!! Try to find solution to the margin workaround */}
        //         <ItemCell image={pants} size={screenWidth - GlobalStyles.layout.xGap * 2} />

        //     </View>
        // </View>
    )
}

export default EditClothing

const styles = StyleSheet.create({})