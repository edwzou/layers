import { View, Text, StyleSheet } from 'react-native';
import React, { useRef } from 'react';
import GlobalStyles from '../../constants/GlobalStyles';
import GeneralModal, { refPropType } from '../../components/Modal/GeneralModal';
import { stepOverTypes } from '../../utils/Stepover';
import OutfitPreview from './OutfitPreview';

const OutfitPreviewPage = () => {
	const modalRef = useRef<refPropType>(null);

	return (
		<View style={styles.container}>
			<GeneralModal
				title="Preview"
				stepOver={{ type: stepOverTypes.done, url: '/testUrl' }}
				content={<OutfitPreview />}
				ref={modalRef}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
});

export default OutfitPreviewPage;
