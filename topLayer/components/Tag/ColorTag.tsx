import React from 'react';
import Tag from './Tag';
import { TagCategory } from '../../constants/Enums';

interface ColorTagPropsType {
	label: string;
	action: string;
	bgColor?: string;
	onPress: () => void;
}

const ColorTag = ({ label, action, bgColor, onPress }: ColorTagPropsType) => {
	return (
		<Tag
			label={label}
			bgColor={bgColor}
			type={{ category: TagCategory.color, action }}
			onPress={onPress}
		/>
	);
};

export default ColorTag;
