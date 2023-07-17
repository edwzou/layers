import { View, TextInput, StyleSheet, Text, TouchableWithoutFeedback } from 'react-native';
import React, { useState, useRef } from 'react';
import GlobalStyles from '../../constants/GlobalStyles';

type StackedTextboxPropsType = {
    label: string;
};

const SquareTextbox = ({
    label,
}: StackedTextboxPropsType) => {
    const [fieldText, setFieldText] = useState('');
    const textInputRef = useRef<TextInput | null>(null);

    const handlePress = () => {
        if (textInputRef.current) {
            textInputRef.current.focus();
        }
    };

    return (
        <View style={styles.container}>
            <Text style={{ color: GlobalStyles.colorPalette.primary[400] }}>
                {label}
            </Text>
            <TouchableWithoutFeedback onPress={handlePress}>
                <View style={{ flex: 1 }}>
                    <TextInput
                        ref={textInputRef}
                        value={fieldText}
                        onChangeText={(text) => {
                            setFieldText(text);
                        }}
                        multiline={true}
                        style={{ flex: 1 }}
                    />
                </View>
            </TouchableWithoutFeedback>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        aspectRatio: 1,
        backgroundColor: GlobalStyles.colorPalette.primary[200],
        padding: 10,
        borderRadius: GlobalStyles.utils.smallRadius.borderRadius,
        color: GlobalStyles.colorPalette.primary[500],
        gap: 5,
    },
});

export default SquareTextbox;
