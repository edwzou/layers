import Icon from 'react-native-remix-icon';
import GlobalStyles from '../../constants/GlobalStyles';
import { IconType } from '../../utils/IconTypes';

export default function LikeIcon({
	size = 22,
	color = GlobalStyles.colorPalette.primary[500],
}: IconType) {
	return <Icon name="heart-fill" size={size} color={color} />;
}
