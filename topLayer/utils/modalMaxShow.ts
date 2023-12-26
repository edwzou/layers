import { Dimensions } from 'react-native';

export const { height: screenHeight, width: screenWidth } =
	Dimensions.get('window');
export const lowTranslateY = -screenHeight * 0.34;
