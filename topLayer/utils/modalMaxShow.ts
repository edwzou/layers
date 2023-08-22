import { Dimensions } from 'react-native';

export const { height: screenHeight, width: screenWidth } =
	Dimensions.get('window');
	export const medTranslateY = -screenHeight * (5/10);
export const highTranslateY = -screenHeight * (93/100);
export const fullTranslateY = -screenHeight;
