import { Dimensions } from 'react-native';

export const { height: screenHeight, width: screenWidth } =
	Dimensions.get('window');
export const maxTranslateY = -screenHeight + 75;
