import { View, Text, StyleSheet, Pressable, SafeAreaView } from 'react-native';
import React from 'react';
import GlobalStyles from '../../constants/GlobalStyles';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackTypes } from 'utils/StackNavigation';
import Icon from 'react-native-remix-icon';
import { stepOverHandler } from '.';
import { NavigationBack } from '../../constants/Enums';

type HeaderPropType = {
	text: string;
	back?: string;
	stepOver?: { type: string, handlePress: () => void };
};

const Header = ({ text, back, stepOver }: HeaderPropType) => {
	const navigation = useNavigation<NativeStackNavigationProp<StackTypes>>();
	return (
		<SafeAreaView>
			<View style={styles.header}>
				{back ? <Pressable
					onPress={() => {
						navigation.goBack();
					}}
					style={{ position: 'absolute', left: 10, paddingRight: 20 }}
				>
					<Icon name={back === NavigationBack.back ? GlobalStyles.icons.backOutline : GlobalStyles.icons.closeOutline} size={GlobalStyles.sizing.icon.regular} />
				</Pressable> : null}
				<Text style={GlobalStyles.typography.subtitle}>{text}</Text>
				{stepOver ? stepOverHandler(stepOver) : null}
			</View>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	header: {
		display: 'flex',
		flexDirection: 'row',
		width: '100%',
		justifyContent: 'center',
		alignItems: 'center',
	},
});

export default Header;
