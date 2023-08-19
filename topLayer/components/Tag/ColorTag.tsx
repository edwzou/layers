import React from 'react';
import Tag from './Tag';
import { TagCategory } from '../../constants/Enums';

interface ColorTagPropsType {
	action: string;
	color?: [string, string];
	onPress?: () => void;
}

const ColorTag = ({ action, color, onPress }: ColorTagPropsType) => {
	return (
		<Tag
			label={color ? color[0] : undefined}
			bgColor={color ? color[1] : undefined}
			type={{ category: TagCategory.color, action }}
			onPress={onPress}
		/>
	);
};

export default ColorTag;
