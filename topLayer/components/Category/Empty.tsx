import { View, Text } from 'react-native';
import Icon from 'react-native-remix-icon';
import { screenWidth, screenHeight } from '../../utils/modalMaxShow';
import GlobalStyles from '../../constants/GlobalStyles';
const Empty = () => {
	return (
		<View
			style={{
				alignItems: 'center',
				flex: 1,
				marginTop: GlobalStyles.layout.pageStateTopMargin,
				gap: 5,
				width: screenWidth,
			}}
		>
			<Icon
				name={GlobalStyles.icons.bubbleOutline}
				color={GlobalStyles.colorPalette.primary[300]}
				size={GlobalStyles.sizing.icon.large}
			/>
			<Text
				style={[
					GlobalStyles.typography.subtitle,
					{ color: GlobalStyles.colorPalette.primary[300] },
				]}
			>
				Empty
			</Text>
		</View>
	);
};

export default Empty;
