import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import GlobalStyles from '../../constants/GlobalStyles'
import Icon from 'react-native-remix-icon'
import { TagAction } from '../../constants/Enums'
import { capitalizeFirstLetter } from '../../utils/misc'

type TagPropsType = {
    type: { category: string, action: string },
    label?: string,
    editable: boolean,
    bgColor?: string,
    onPress: () => void,
}

const Tag = ({ type, label, editable = false, bgColor, onPress }: TagPropsType) => {
    return (
        // This Text wrapper allows for the container to have min-content property
        <Text>
            {type.action === TagAction.remove ?
                <View style={[styles.container, GlobalStyles.utils.tagShadow,
                {
                    shadowColor: bgColor ? bgColor : GlobalStyles.colorPalette.primary[500],
                    backgroundColor: bgColor ? bgColor : GlobalStyles.colorPalette.primary[500],
                    justifyContent: editable ? 'space-between' : 'center'
                }]}>
                    <Text style={{ marginRight: editable ? 5 : 0 }}>
                        <Text style={{ color: GlobalStyles.colorPalette.primary[100] }}>{label}</Text>
                    </Text>
                    {editable ? <Pressable onPress={onPress}>
                        <Icon name={GlobalStyles.icons.closeOutline} color={GlobalStyles.colorPalette.primary[100]} size={16} />
                    </Pressable> : null}
                </View> :
                <View style={[styles.container,
                {
                    backgroundColor: GlobalStyles.colorPalette.primary[200],
                    justifyContent: editable ? 'space-between' : 'center'
                }]}>
                    {editable ? <Pressable onPress={onPress} style={{ marginRight: editable ? 2.5 : 0 }}>
                        <Icon name={GlobalStyles.icons.addOutline} color={GlobalStyles.colorPalette.primary[300]} size={16} />
                    </Pressable> : null}
                    <Text>
                        <Text style={{ color: GlobalStyles.colorPalette.primary[300] }}>{capitalizeFirstLetter(type.category)}</Text>
                    </Text>
                </View>
            }
        </Text>
    )
}

export default Tag

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        alignItems: 'center',
        borderRadius: 1000,
        flexDirection: 'row'
    }
})