import { View, Text } from 'react-native';
import Icon from 'react-native-remix-icon';
import GlobalStyles from '../../constants/GlobalStyles';

const PrivateProfile: React.FC = () => {
	return (
		<View
			style={{
				alignItems: 'center',
				flex: 1,
				top: GlobalStyles.layout.pageStateTopMargin,
				gap: 5,
			}}
		>
			<Icon
				name={GlobalStyles.icons.privateOutline}
				color={GlobalStyles.colorPalette.primary[300]}
				size={GlobalStyles.sizing.icon.large}
			/>
			<Text
				style={[
					GlobalStyles.typography.subtitle,
					{ color: GlobalStyles.colorPalette.primary[300] },
				]}
			>
				Private
			</Text>
		</View>
	);
};

export default PrivateProfile;
