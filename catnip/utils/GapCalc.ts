import GlobalStyles from '../constants/GlobalStyles';
import { Dimensions } from 'react-native';

const screenWidth =
	Dimensions.get('window').width - GlobalStyles.layout.xGap * 2;

const numColumns = 2;

const availableSpace =
	screenWidth - (numColumns - 1) * GlobalStyles.layout.xGap;
export const ITEM_SIZE = availableSpace / numColumns;
