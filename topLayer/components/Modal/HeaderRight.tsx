import React from 'react';
import { Text, Pressable } from 'react-native';
import GlobalStyles from '../../constants/GlobalStyles';
import { StepOverTypes } from '../../constants/Enums';
import Icon from 'react-native-remix-icon';

export interface HeaderRightPropsType {
    type: string;
    handlePress: () => void;
}

export function headerRight({ type, handlePress }: HeaderRightPropsType) {
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
                        Edit
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
                        Done
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
                        Update
                    </Text>
                </Pressable>
            );
        }
        default:
            return null; // Handle default case if needed
    }
};
