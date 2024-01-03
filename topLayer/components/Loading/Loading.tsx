import GlobalStyles from '../../constants/GlobalStyles';
import React from 'react';
import { ActivityIndicator, View } from 'react-native';

export const Loading: React.FC = () => {
	return (
		<View style={GlobalStyles.utils.loadingOverlay}>
			<View style={GlobalStyles.utils.loadingContainer}>
				<ActivityIndicator
					size="large"
					color={GlobalStyles.colorPalette.activityIndicator}
				/>
			</View>
		</View>
	);
};
