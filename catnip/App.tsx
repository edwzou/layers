import React from 'react'
import { View, StyleSheet } from 'react-native';
import GlobalStyles from './constants/GlobalStyles';
import ProfilePage from './pages/Profile/ProfilePage'
import Profile from './pages/Profile/Profile'

export default function App() {
	return (
		<View style={styles.container}>
			<ProfilePage />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: GlobalStyles.colorPalette.background,
	},
});
