import React from 'react';
import { StyleSheet, View } from 'react-native';

import { ColorTags, TagAction } from '../../constants/Enums';
import ColorTag from '../../components/Tag/ColorTag';
import GlobalStyles from '../../constants/GlobalStyles';

interface ColorTagsListPropsType {
    data: [string, string][];
    tagAction: string;
    onAddPress?: () => void;
    onRemovePress?: (colorToDelete: [string, string]) => void;
}

const ColorTagsList = ({ data, tagAction, onAddPress, onRemovePress }: ColorTagsListPropsType) => {
    return (
        <View style={styles.container}>
            {data.map((item, index) => (
                <View style={styles.item} key={index}>
                    <ColorTag
                        action={tagAction}
                        color={item}
                        onPress={onRemovePress ? () => onRemovePress(item) : undefined}
                    />
                </View>
            ))}
            {tagAction !== TagAction.static && (
                <View style={styles.item}>
                    <ColorTag
                        action={TagAction.add}
                        onPress={onAddPress}
                    />
                </View>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingVertical: 20,
        paddingHorizontal: GlobalStyles.layout.xGap,
        marginLeft: -5,    // half of the space
        marginRight: -5,   // half of the space
    },
    item: {
        marginLeft: 5,     // half of the space
        marginRight: 5,    // half of the space
        marginBottom: 10
    }
});

export default ColorTagsList;
