import React, { type ReactElement } from 'react';
import { StyleSheet, View } from 'react-native';

import { TagAction } from '../../constants/Enums';
import ColorTag from '../../components/Tag/ColorTag';

interface ColorTagsListPropsType {
	data: string[];
	tagAction: string;
	onAddPress?: () => void;
	onRemovePress?: (colorToDelete: string) => void;
}

const ColorTagsList = ({
	data,
	tagAction,
	onAddPress,
	onRemovePress,
}: ColorTagsListPropsType): ReactElement => {
	return (
		<View style={styles.container}>
			{data.map((item, index) => (
				<View style={styles.item} key={index}>
					<ColorTag
						action={tagAction}
						color={item}
						onPress={
							onRemovePress !== null && onRemovePress !== undefined
								? () => {
										onRemovePress(item);
								  } // eslint-disable-line no-mixed-spaces-and-tabs
								: undefined
						}
					/>
				</View>
			))}
			{tagAction !== TagAction.static && (
				<View style={styles.item}>
					<ColorTag action={TagAction.add} onPress={onAddPress} />
				</View>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		marginLeft: -5, // half of the space
		marginRight: -5, // half of the space
	},
	item: {
		marginLeft: 5, // half of the space
		marginRight: 5, // half of the space
		marginBottom: 10,
	},
});

export default ColorTagsList;
