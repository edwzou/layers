import { Dimensions } from 'react-native';

export const { height: screenHeight, width: screenWidth } =
	Dimensions.get('window');
export const highTranslateY = -screenHeight + 75;
export const fullTranslateY = -screenHeight;
