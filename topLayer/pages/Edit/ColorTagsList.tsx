import { StyleSheet, FlatList, View } from 'react-native'
import React, { } from 'react'

import { ColorTags, TagAction } from '../../constants/Enums'
import ColorTag from '../../components/Tag/ColorTag'
import GlobalStyles from '../../constants/GlobalStyles';

interface ColorTagsListPropsType {
    data: [string, string][];
    onAddPress?: () => void;
    onRemovePress: (colorToDelete: [string, string]) => void;
}

const ColorTagsList = ({ data, onAddPress, onRemovePress }: ColorTagsListPropsType) => {
    return (
        <FlatList
            data={[...data, ColorTags.Add]}
            style={{ paddingVertical: 20, paddingHorizontal: GlobalStyles.layout.xGap, }}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
                item === ColorTags.Add ?
                    (<ColorTag
                        action={TagAction.add}
                        onPress={(onAddPress)}
                    />) : (
                        <ColorTag
                            action={TagAction.remove}
                            color={item}
                            onPress={() => onRemovePress(item)}
                        />)
            )}
            keyExtractor={(item) => item[0]}
            ItemSeparatorComponent={() => <View style={{ width: 10 }} />}
            ListFooterComponent={<View style={{ width: 30 }} />} /// !!! Hacky. Fix down the line
        />
    )
}

export default ColorTagsList

const styles = StyleSheet.create({})