import React from 'react';
import Tag from './Tag';
import { ColorTags, TagCategory } from '../../constants/Enums';

interface ColorTagPropsType {
	action: string;
	color?: string;
	onPress?: () => void;
}

const ColorTag = ({ action, color, onPress }: ColorTagPropsType) => {
	return (
		<Tag
			label={color ? ColorTags[color] : undefined}
			bgColor={color ? color : undefined}
			type={{ category: TagCategory.color, action }}
			onPress={onPress}
		/>
	);
};

export default ColorTag;
