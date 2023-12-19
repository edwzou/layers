import React from 'react';
import { Text, Pressable } from 'react-native';
import GlobalStyles from '../../constants/GlobalStyles';
import { StepOverTypes } from '../../constants/Enums';
import Icon from 'react-native-remix-icon';

export interface HeaderButtonPropsType {
    type: string;
    handlePress: () => void;
}

export function headerButton({ type, handlePress }: HeaderButtonPropsType) {
    switch (type) {
        case StepOverTypes.send: {
            return (
                <Pressable
                    onPress={handlePress}
                >
                    <Icon
                        name={GlobalStyles.icons.sendOutline}
                        color={GlobalStyles.colorPalette.info[500]}
                        size={GlobalStyles.sizing.icon.regular}
                    />
                </Pressable>
            );
        }
        case StepOverTypes.edit: {
            return (
                <Pressable
                    onPress={handlePress}
                >
                    <Text
                        style={[
                            { color: GlobalStyles.colorPalette.info[500] },
                            GlobalStyles.typography.body,
                        ]}
                    >
                        {StepOverTypes.edit}
                    </Text>
                </Pressable>
            );
        }
        case StepOverTypes.done: {
            return (
                <Pressable
                    onPress={handlePress}
                >
                    <Text
                        style={[
                            { color: GlobalStyles.colorPalette.info[500] },
                            GlobalStyles.typography.body,
                        ]}
                    >
                        {StepOverTypes.done}
                    </Text>
                </Pressable>
            );
        }
        case StepOverTypes.update: {
            return (
                <Pressable
                    onPress={handlePress}
                >
                    <Text
                        style={[
                            { color: GlobalStyles.colorPalette.info[500] },
                            GlobalStyles.typography.body,
                        ]}
                    >
                        {StepOverTypes.update}
                    </Text>
                </Pressable>
            );
        }
        case StepOverTypes.logout: {
            return (
                <Pressable
                    onPress={handlePress}
                >
                    <Text
                        style={[
                            { color: GlobalStyles.colorPalette.info[500] },
                            GlobalStyles.typography.body,
                        ]}
                    >
                        {StepOverTypes.logout}
                    </Text>
                </Pressable>
            );
        }
        default:
            return null; // Handle default case if needed
    }
};
