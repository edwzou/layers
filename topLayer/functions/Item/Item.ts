import { type refPropType } from '../../components/Modal/GeneralModal';
import { type RefObject, type Dispatch, type SetStateAction } from 'react';
import { type UseFormSetValue } from 'react-hook-form';

export const handleOnColorRemovePress = (
	currentColorTags: string[],
	colorToDelete: string,
	setColorTags: Dispatch<SetStateAction<string[]>>,
	setValue: UseFormSetValue<{
		image: string;
		category: string;
		title: string;
		size: string;
		color: string[];
	}>
): void => {
	const updatedColorTags = currentColorTags.filter(
		(color: string) => color !== colorToDelete
	);
	setColorTags(updatedColorTags);
	setValue('color', updatedColorTags);
};

export const handleOnNewColorPress = (
	currentColorTags: string[],
	colorToAdd: string,
	colorPickerRef: RefObject<refPropType>,
	setColorTags: Dispatch<SetStateAction<string[]>>,
	setValue: UseFormSetValue<{
		image: string;
		category: string;
		title: string;
		size: string;
		color: string[];
	}>
): void => {
	if (!currentColorTags.some((color: string) => color === colorToAdd)) {
		const colors = [...currentColorTags, colorToAdd];
		setColorTags(colors);
		setValue('color', colors);
	}
	colorPickerRef.current?.scrollTo(0);
};

// export const handleOnNewColorPress = (
// 	currentColorTags: Set<string>,
// 	colorToAdd: string,
// 	colorPickerRef: string,
// 	setColorTags: string,
// 	setValue: string
// ): void => {
// 	const initLen = currentColorTags.size;
// 	currentColorTags.add(colorToAdd);
// 	if (initLen < currentColorTags.size) {
// 		const colors = new Set(...currentColorTags);
// 		setColorTags(colors);
// 		setValue('color', colors);
// 	}
// 	colorPickerRef.current?.scrollTo(0);
// };
