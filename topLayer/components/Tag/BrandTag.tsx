import React from 'react';
import Tag from './Tag';
import { TagCategory } from '../../constants/Enums';

interface BrandTagPropsType {
	action: string;
	label?: string;
	bgColor?: string;
	onPress: () => void;
}

const BrandTag = ({ label, action, bgColor, onPress }: BrandTagPropsType) => {
	return (
		<Tag
			label={label}
			bgColor={bgColor}
			type={{ category: TagCategory.brand, action }}
			onPress={onPress}
		/>
	);
};

export default BrandTag;
