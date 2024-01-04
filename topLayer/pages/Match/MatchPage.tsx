import React, { useState, createContext, useContext } from 'react';
import { StyleSheet } from 'react-native';
import { StackNavigation } from '../../constants/Enums';
import { Stack } from '../../utils/StackNavigation';
import { headerButton } from '../../components/Modal/HeaderButton';
import { NavigationContainer } from '@react-navigation/native';
import GlobalStyles from '../../constants/GlobalStyles';
import { baseUrl } from '../../utils/apiUtils';
import axios from 'axios';
import Match from './Match';
import OutfitPreview from '../../pages/OutfitPreview/OutfitPreview';
import { axiosEndpointErrorHandler } from '../../utils/ErrorHandlers';
import { MainPageContext } from '../../pages/Main/MainPage';
import { toast } from '../../constants/GlobalStrings';
import {
	showErrorToast,
	showSuccessToast,
} from '../../components/Toasts/Toasts';
import { emptyClothing } from '../../constants/Clothing';

const MatchPage: React.FC = () => {
	return (
		<NavigationContainer independent={true}>
			<Stack.Navigator>
				<Stack.Screen
					options={{
						headerShown: false,
					}}
					name={StackNavigation.Match}
					component={Match}
				/>
				<Stack.Screen
					options={{
						presentation: 'modal',
						headerShown: false,
					}}
					name={StackNavigation.OutfitPreview}
					component={OutfitPreview}
				/>
			</Stack.Navigator>
		</NavigationContainer>
	);
};

export default MatchPage;

const styles = StyleSheet.create({});
