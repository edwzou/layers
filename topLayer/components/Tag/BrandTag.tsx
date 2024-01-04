import React, { type ReactElement } from 'react';
import Tag from './Tag';
import { TagCategory } from '../../constants/Enums';

interface BrandTagPropsType {
	action: string;
	label?: string;
	onPress?: () => void;
}

const BrandTag = ({
	action,
	label,
	onPress,
}: BrandTagPropsType): ReactElement => {
	return (
		<Tag
			label={label}
			type={{ category: TagCategory.brand, action }}
			onPress={onPress}
		/>
	);
};

export default BrandTag;
