export interface PrivacyOption {
	value: string;
	boolean: boolean;
}
export const privacyOptions: PrivacyOption[] = [
	{ value: 'Public', boolean: false },
	{ value: 'Private', boolean: true },
];
