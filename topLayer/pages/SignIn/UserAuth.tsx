import GlobalStyles from '../../constants/GlobalStyles';
import Header from '../../components/Header/Header';
import Constants from 'expo-constants';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import { WebView } from 'react-native-webview';
import { useState } from 'react';

const UserAuth = () => {
    const [response, setResponse] = useState(null);

    const setToken = (e) => {
        setResponse(e);
    }
    return (
        <SafeAreaView style={styles.container}>
            <Header back text='' />
            <WebView source={{ uri: 'http://localhost:1234/login' }} scrollEnabled={false} onMessage={(e) => { setToken(e) }} />
        </SafeAreaView>
    )
}


export default UserAuth

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});