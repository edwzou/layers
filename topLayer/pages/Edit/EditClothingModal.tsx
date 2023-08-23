import { Pressable, Text, View } from 'react-native';
import React, { useEffect, useRef } from 'react';
import GeneralModal, {
	type refPropType,
} from '../../components/Modal/GeneralModal';
import { highTranslateY } from '../../utils/modalMaxShow';
import { type UserClothing } from 'pages/Match';
import EditClothing from '../ItemView/EditClothing';
import { StepOverTypes } from '../../constants/Enums';

interface EditClothingModalPropsType {
	clothing?: UserClothing[];
}

const EditClothingModal = ({ clothing }: EditClothingModalPropsType) => {
	const modalRef = useRef<refPropType>(null);

	useEffect(() => {
		modalRef.current?.scrollTo(highTranslateY);
	}, []);

	return (
		<View style={{ flex: 1 }}>
			<Pressable
				style={{ backgroundColor: 'red', marginTop: 100 }}
				onPress={() => {
					modalRef.current?.scrollTo(highTranslateY);
				}}
			>
				<Text>TOGGLE</Text>
			</Pressable>
			<GeneralModal
				title="Edit"
				content={<EditClothing />}
				ref={modalRef}
				stepOver={{
					type: StepOverTypes.done,
					handlePress: () => {
						console.log('Done');
					},
				}}
			/>
		</View>
	);
};

export default EditClothingModal;
