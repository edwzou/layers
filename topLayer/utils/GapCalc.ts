import GlobalStyles from '../constants/GlobalStyles';
import { screenWidth } from './modalMaxShow';

const width = screenWidth - GlobalStyles.layout.xGap * 2;

const numColumns = 2;

const availableSpace = width - (numColumns - 1) * GlobalStyles.layout.xGap;

export const ITEM_SIZE = (numColumns = 2): number => {
	return availableSpace / numColumns;
};
