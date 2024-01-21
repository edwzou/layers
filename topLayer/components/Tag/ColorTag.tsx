import React, { type ReactElement } from 'react';
import Tag from './Tag';
import { TagCategory } from '../../constants/Enums';

interface ColorTagPropsType {
	action: string;
	color?: string;
	onPress?: () => void;
}

const ColorTag = ({
	action,
	color,
	onPress,
}: ColorTagPropsType): ReactElement => {
	return (
		<Tag
			label="   "
			bgColor={color ?? undefined}
			type={{ category: TagCategory.color, action }}
			onPress={onPress}
		/>
	);
};

export default ColorTag;
