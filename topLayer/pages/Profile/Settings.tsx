import axios from 'axios';

import { useForm, Controller } from 'react-hook-form';
import { View, Text, StyleSheet, Pressable, Keyboard } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import StackedTextBox from '../../components/Textbox/StackedTextbox';
import Button from '../../components/Button/Button';
import { ITEM_SIZE } from '../../utils/GapCalc';
import RadioButton from '../../components/RadioButton/RadioButton';
import GlobalStyles from '../../constants/GlobalStyles';
import ProfilePicture from '../../components/ProfilePicture/ProfilePicture';

import * as ImagePicker from 'expo-image-picker';
import { base64Prefix } from '../../utils/Base64Prefix';
import { baseUrl } from '../../utils/apiUtils';
import { useNavigation } from '@react-navigation/native';
import { type NativeStackNavigationProp } from '@react-navigation/native-stack';
import { type StackTypes } from '../../utils/StackNavigation';
import { StackNavigation } from '../../constants/Enums';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserContext } from '../../utils/UserContext';
import { MainPageContext } from '../../pages/Main/MainPage';

interface FormValues {
    first_name: string;
    last_name: string;
    username: string;
    email: string;
    password: string;
    private: boolean;
    profile_picture: string;
}

const Settings = () => {
    const [image, setImage] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const navigation = useNavigation<NativeStackNavigationProp<StackTypes>>();
    const { data, updateData } = useContext(UserContext);
    const { mockUserData } = useContext(MainPageContext);

    const {
        control,
        handleSubmit,
        setValue,
        formState: { dirtyFields, errors },
    } = useForm({
        defaultValues: {
            first_name: mockUserData.firstName,
            last_name: mockUserData.lastName,
            username: mockUserData.username,
            email: mockUserData.email,
            password: mockUserData.password,
            private: false,
            profile_picture: mockUserData.profilePicture,
        },
    });

    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            base64: true,
            aspect: [1, 1],
            quality: 0,
        });

        if (!result.canceled) {
            if (!result.assets) return;

            setImage(`${base64Prefix}${result.assets[0].base64}`);
            setModalVisible(!modalVisible);
        }
    };

    useEffect(() => {
        setValue('profile_picture', image);
    }, [image]);

    const onSubmit = async (data: FormValues | any) => {
        try {
            const response = await axios.post(`${baseUrl}/signup`, {
                first_name: data.first_name,
                last_name: data.last_name,
                username: data.username,
                email: data.email,
                password: data.password,
                profile_picture: data.profile_picture,
                following: [],
                followers: [],
                privateOption: data.private,
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.status === 200) {
                try {
                    const sessionData = JSON.stringify(response.data.data);
                    await AsyncStorage.setItem('session', sessionData);
                    updateData(sessionData);
                } catch (error) {
                    console.log(error);
                }
            } else {
                throw new Error('An error has occurred');
            }
        } catch (error) {
            alert(error);
        }
    };

    const privacyOptions = [
        { value: 'Public', boolean: false },
        { value: 'Private', boolean: true },
    ];

    return (
        <Pressable onPress={Keyboard.dismiss} style={{ gap: 40 }}>
            <View style={{ gap: GlobalStyles.layout.gap }}>
                <Pressable
                    style={{ alignSelf: 'center' }}
                    onPress={() => {
                        navigation.navigate(StackNavigation.Camera, {});
                    }}
                >
                    <ProfilePicture image={require('../../assets/marble-pfp.png')} />
                </Pressable>
                <View
                    style={{
                        flexDirection: 'row',
                        gap: GlobalStyles.layout.gap,
                        width: ITEM_SIZE(),
                    }}
                >
                    <Controller
                        control={control}
                        rules={{
                            required: true,
                        }}
                        render={({ field: { onChange, value } }) => (
                            <StackedTextBox
                                label="First Name"
                                onFieldChange={onChange}
                                value={value.trim()}
                            />
                        )}
                        name="first_name"
                    />
                    <Controller
                        control={control}
                        rules={{
                            required: true,
                        }}
                        render={({ field: { onChange, value } }) => (
                            <StackedTextBox
                                label="Last Name"
                                onFieldChange={onChange}
                                value={value.trim()}
                            />
                        )}
                        name="last_name"
                    />
                </View>
                <Controller
                    control={control}
                    rules={{
                        required: true,
                        maxLength: 20, // Just a random number
                    }}
                    render={({ field: { onChange, value } }) => (
                        <StackedTextBox
                            label="Username"
                            onFieldChange={onChange}
                            value={value.trim()}
                        />
                    )}
                    name="username"
                />
                <Controller
                    control={control}
                    rules={{
                        required: true,
                        pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                    }}
                    render={({ field: { onChange, value } }) => (
                        <StackedTextBox
                            label="Email"
                            onFieldChange={onChange}
                            value={value.trim()}
                        />
                    )}
                    name="email"
                />
                <Controller
                    control={control}
                    rules={{
                        required: true,
                        minLength: 5,
                    }}
                    render={({ field: { onChange, value } }) => (
                        <StackedTextBox
                            label="Password"
                            onFieldChange={onChange}
                            value={value}
                            secure
                        />
                    )}
                    name="password"
                />
                <RadioButton data={privacyOptions} onSelect={setValue} />
            </View>
            <View style={{ alignItems: 'center' }}>
                {errors.email != null && (
                    <Text style={styles.error}>Please enter a valid email.</Text>
                )}
                {errors.password != null && (
                    <Text style={styles.error}>
                        Password must be 5 characters or more.
                    </Text>
                )}
            </View>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    error: {
        color: GlobalStyles.colorPalette.danger[500],
    },
    camera: {
        flex: 1,
    },
    modalView: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        gap: 5,
        // backgroundColor: GlobalStyles.colorPalette.primary[400] + '40',
        paddingBottom: 25,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalGroup: {
        backgroundColor: GlobalStyles.colorPalette.primary[100],
        borderRadius: GlobalStyles.utils.smallRadius.borderRadius,
        gap: 5,
        width: '95%',
    },
    modalSelection: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 15,
    },
    modalButtons: {
        width: '95%',
        alignItems: 'center',
        backgroundColor: GlobalStyles.colorPalette.primary[100],
        borderRadius: GlobalStyles.utils.smallRadius.borderRadius,
        padding: 15,
    },
});

export default Settings;
