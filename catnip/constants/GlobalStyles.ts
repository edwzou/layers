import { StyleSheet } from 'react-native';

const colorPalette = {
	background: '#F2F2F2',
	card: {
		100: '#EDEDEE',
		200: '#EBEBEC',
		300: '#E6E6E7',
	},
	primary: {
		100: '#F3F3F3',
		200: '#E7E7E7',
		300: '#B7B7B7',
		400: '#707070',
		500: '#121212',
		600: '#0F0D0D',
		700: '#0D0909',
		800: '#090506',
		900: '#070305',
	},
	success: {
		100: '#EFFBD9',
		200: '#DDF8B6',
		300: '#C0EB8F',
		400: '#A2DA71',
		500: '#7DC44C',
		600: '#64A83D',
		700: '#4D8C2F',
		800: '#3A7023',
		900: '#2B5E1B',
	},
	info: {
		100: '#D5FAFC',
		200: '#ADEEFA',
		300: '#85DAF5',
		400: '#68C1EC',
		500: '#479EE2',
		600: '#377BC1',
		700: '#275CA2',
		800: '#194181',
		900: '#102E6B',
	},
	warning: {
		100: '#FBF0CF',
		200: '#F6DFA0',
		300: '#ECC572',
		400: '#DFAB51',
		500: '#CF842F',
		600: '#B16A25',
		700: '#93521C',
		800: '#763D13',
		900: '#612F0D',
	},
	danger: {
		100: '#612F0D',
		200: '#F3C0B2',
		300: '#EE968B',
		400: '#E9726F',
		500: '#E44A51',
		600: '#C33A4D',
		700: '#A22D48',
		800: '#832040',
		900: '#6C183B',
	},
};

const layout = {
	xGap: 16,
	topHeaderGap: 75,
};

const typography = StyleSheet.create({
	header: {
		fontSize: 40,
		fontWeight: 'bold',
	},
	title: {
		fontSize: 24,
		fontWeight: '600',
	},
	subtitle: {
		fontSize: 20,
		fontWeight: '500',
	},
	body: {
		fontSize: 16,
		fontWeight: '500',
	},
	body2: {
		fontSize: 12,
		fontWeight: '400',
	},
	body3: {
		fontSize: 10,
		fontWeight: '300',
	},
});

const utils = StyleSheet.create({
	font: {
		fontFamily: 'Helvetica',
	},
	shadow: {
		shadowColor: colorPalette.primary[300],
		shadowOffset: { width: -4, height: 5 },
		shadowRadius: 10,
	},
	smallRadius: {
		borderRadius: 10,
	},
});

const sizing = {
	icon: 20,
};

const icons = {
	userOutline: 'ri-user-line',
	userOutline2: 'ri-user-4-line',
	passwordOutline: 'ri-key-2-line',
	sendOutline: 'ri-send-plane-2-line',
	backOutline: 'ri-arrow-left-s-line',
	searchOutline: 'ri-search-2-line',
	shirtOutline: 'ri-t-shirt-2-line',
	addOutline: 'ri-add-circle-line',
	bookmarkOutline: 'ri-bookmark-line',
};

export default { colorPalette, layout, typography, utils, icons, sizing };
