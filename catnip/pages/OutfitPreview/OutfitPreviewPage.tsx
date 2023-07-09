import { View, StyleSheet } from 'react-native';
import React, { useRef } from 'react';
import GeneralModal, { refPropType } from '../../components/Modal/GeneralModal';
import { StepOverTypes } from '../../constants/Enums';
import OutfitPreview from './OutfitPreview';

const OutfitPreviewPage = () => {
	const modalRef = useRef<refPropType>(null);

	const handlePress = () => {
		console.log("Connect to Endpoint")
	}

	return (
		<View style={styles.container}>
			<GeneralModal
				title="Preview"
				stepOver={{ type: StepOverTypes.done, handlePress }}
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
