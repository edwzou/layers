import { Dimensions } from 'react-native';

export const { height: screenHeight, width: screenWidth } =
	Dimensions.get('window');
export const modalLowTranslateY = -screenHeight * 0.34;
export const fullscreenLowTranslateY = -screenHeight * 0.26;
