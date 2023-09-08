import { StyleSheet, FlatList, View } from 'react-native'
import React from 'react'

import { ColorTags, TagAction } from '../../constants/Enums'
import ColorTag from '../../components/Tag/ColorTag'
import GlobalStyles from '../../constants/GlobalStyles';

interface ColorTagsListPropsType {
    data: [string, string][];
    tagAction: string;
    onAddPress?: () => void;
    onRemovePress?: (colorToDelete: [string, string]) => void;
}

const ColorTagsList = ({ data, tagAction, onAddPress, onRemovePress }: ColorTagsListPropsType) => {
    return (
        <FlatList
            data={data}
            contentContainerStyle={{
                paddingVertical: 20,
                paddingHorizontal: GlobalStyles.layout.xGap,
            }}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
                <ColorTag
                    action={tagAction}
                    color={item}
                    onPress={onRemovePress ? () => onRemovePress(item) : undefined}
                />

            )}
            keyExtractor={(item) => item[0]}
            ItemSeparatorComponent={() => <View style={{ width: 10 }} />}
            ListFooterComponent={() => (
                tagAction !== TagAction.static ?
                    data.length > 0 ? (
                        <View style={{ marginLeft: 10 }}>
                            <ColorTag
                                action={TagAction.add}
                                onPress={onAddPress}
                            />
                        </View>
                    ) : (
                        <ColorTag
                            action={TagAction.add}
                            onPress={onAddPress}
                        />
                    ) : null
            )}
        />
    )
}

export default ColorTagsList

const styles = StyleSheet.create({})