import React from 'react';
import { View, TextInput } from 'react-native';
import Icon from 'react-native-remix-icon';
import GlobalStyles from '../../constants/GlobalStyles';

type FindBarPropsType = {
    placeholder: string,
};

const SearchBar = ({ placeholder }: FindBarPropsType) => {
    return (
        <View
            style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingHorizontal: 14,
                paddingVertical: 12,
                backgroundColor: GlobalStyles.colorPalette.primary[200],
                borderRadius: 10,
                gap: 17,
            }}
        >
            <Icon
                name={GlobalStyles.icons.searchOutline}
                color={GlobalStyles.colorPalette.primary[400]}
                size={GlobalStyles.sizing.icon.small}
            />
            <TextInput
                style={{
                    flex: 1,
                    ...GlobalStyles.typography.body,
                }}
                placeholder={placeholder}
                placeholderTextColor={GlobalStyles.colorPalette.primary[400]}
            />
        </View>
    );
};

export default SearchBar;

