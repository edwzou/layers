import GlobalStyles from '../../constants/GlobalStyles';
import { Camera, CameraType, FlashMode } from 'expo-camera';
import { useState } from 'react';
import { Pressable, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { TapGestureHandler } from 'react-native-gesture-handler';
import Icon from 'react-native-remix-icon';

export default function CameraComponent() {
    const [orientation, setOrientation] = useState(CameraType.front);
    const [flash, setFlash] = useState(FlashMode.auto)
    const [permission, requestPermission] = Camera.useCameraPermissions();

    if (!permission) {
        // Camera permissions are still loading
        return <View />;
    }

    if (!permission.granted) {
        // Camera permissions are not granted yet
        requestPermission()
        return (<></>);
    }

    function flipCamera() {
        setOrientation(current => (current === CameraType.back ? CameraType.front : CameraType.back));
    }

    return (
        <View style={styles.container}>
            <Camera style={styles.camera} type={orientation} flashMode={flash}>
                <TapGestureHandler numberOfTaps={2} onHandlerStateChange={flipCamera}>
                    <SafeAreaView>
                        <Text>
                            <Pressable onPress={flipCamera} style={styles.button}>
                                <Icon name={GlobalStyles.icons.flipCamera} size={26} color='#FFFFFF' />
                            </Pressable>
                        </Text>
                    </SafeAreaView>
                </TapGestureHandler>
            </Camera>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    camera: {
        flex: 1,
    },
    button: {
        padding: 10,
        backgroundColor: GlobalStyles.colorPalette.primary[500] + '80',
        borderRadius: 100
    },
});
