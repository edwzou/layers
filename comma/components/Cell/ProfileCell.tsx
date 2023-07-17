import React, { useState } from 'react';
import { View, Text, Image, Pressable } from 'react-native';
import Icon from 'react-native-remix-icon';
import { StyleSheet } from 'react-native';
import GlobalStyles from '../../constants/GlobalStyles';

type ProfileCellPropsType = {
    profilePicture: any,
    username: string,
    firstName: string,
    lastName: string,
};

const ProfileCell = ({ profilePicture, username, firstName, lastName }: ProfileCellPropsType) => {
    const [iconName, setIconName] = useState(GlobalStyles.icons.bookmarkFill);

    const handleIconPress = () => {
        if (iconName === GlobalStyles.icons.bookmarkFill) {
            setIconName(GlobalStyles.icons.bookmarkOutline);
        } else {
            setIconName(GlobalStyles.icons.bookmarkFill);
        }
    };

    return (
        <Pressable style={styles.container} onPress={() => { console.log("ProfileCell tapped") }}>
            <Image source={profilePicture} style={styles.profilePicture} />
            <View style={styles.textContainer}>
                <Text style={styles.username}>{username}</Text>
                <Text style={styles.fullName}>{firstName} {lastName}</Text>
            </View>
            <Pressable onPress={handleIconPress}>
                <Icon
                    name={iconName}
                    color={GlobalStyles.colorPalette.primary[900]}
                    size={GlobalStyles.sizing.icon.small}
                />
            </Pressable>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
    },
    profilePicture: {
        width: GlobalStyles.sizing.pfp.small,
        height: GlobalStyles.sizing.pfp.small,
        borderRadius: GlobalStyles.sizing.pfp.small / 2,
        marginRight: 10,
    },
    textContainer: {
        flex: 1,
        marginRight: 10,
    },
    username: {
        ...GlobalStyles.typography.body,
        color: GlobalStyles.colorPalette.primary[900]
    },
    fullName: {
        ...GlobalStyles.typography.body2,
        color: GlobalStyles.colorPalette.primary[400]
    },
    icon: {
        marginLeft: 'auto',
    },
});

export default ProfileCell;
