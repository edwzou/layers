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
	activityIndicator: '#B7B7B7',
};

const layout = {
	modalTopPadding: 20,
	xGap: 16,
	buttonGap: 25,
	gap: 16,
	highTranslateYBottomMargin: 120,
	pageStateTopMargin: 180,
	toastTopOffset: 60,
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
	paragraph: {
		fontSize: 16,
		fontWeight: '500',
	},
});

const utils = StyleSheet.create({
	font: {
		fontFamily: 'Helvetica',
	},
	tagShadow: {
		shadowOffset: { width: 0, height: 0 },
		shadowOpacity: 0.4,
		shadowRadius: 5,
	},
	buttonShadow: {
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.2,
		shadowRadius: 8,
	},
	dropdownShadow: {
		shadowOffset: { width: 0, height: 0 },
		shadowOpacity: 0.13,
		shadowRadius: 15,
	},
	modalShadow: {
		shadowOffset: { width: 0, height: 0 },
		shadowOpacity: 0.13,
		shadowRadius: 15,
	},
	pfpShadow: {
		shadowOffset: { width: 0, height: 0 },
		shadowOpacity: 0.1,
		shadowRadius: 10,
	},
	smallRadius: {
		borderRadius: 10,
	},
	mediumRadius: {
		borderRadius: 20,
	},
	fullRadius: {
		borderRadius: 100,
	},
	tagShape: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		height: 30,
		borderRadius: 100,
		paddingHorizontal: 12,
	},
	buttonShape: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		height: 42,
		borderRadius: 10,
		paddingHorizontal: layout.buttonGap,
	},
	deleteButton: {
		width: 40,
		height: 40,
		borderRadius: 100,
		backgroundColor: colorPalette.danger[500],
		alignItems: 'center',
		justifyContent: 'center',
		shadowColor: colorPalette.danger[500],
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.2,
		shadowRadius: 8,
	},
	loadingOverlay: {
		...StyleSheet.absoluteFillObject,
		backgroundColor: 'transparent', // Set to transparent
		alignItems: 'center',
		justifyContent: 'center',
	},
	loadingContainer: {
		padding: 20,
		backgroundColor: colorPalette.primary[100],
		borderRadius: 10,
		shadowColor: colorPalette.primary[300],
		shadowOffset: {
			width: 0,
			height: 0,
		},
		shadowOpacity: 0.05,
		shadowRadius: 5,
	},
});

const sizing = {
	icon: {
		xLarge: 44,
		large: 40,
		regular: 30,
		small: 20,
		xSmall: 16,
	},
	pfp: {
		regular: 90,
		small: 40,
	},
	tagHeight: utils.tagShape.height,
	bottomSpacingPadding: {
		paddingBottom: 100,
	},
};

const icons = {
	userOutline: 'ri-user-line',
	userOutline2: 'ri-user-4-line',
	passwordOutline: 'ri-key-2-line',
	sendOutline: 'ri-send-plane-2-line',
	backOutline: 'ri-arrow-left-s-line',
	closeOutline: 'ri-close-line',
	nextOutline: 'ri-arrow-right-s-line',
	searchOutline: 'ri-search-2-line',
	shirtOutline: 'ri-t-shirt-2-line',
	addOutline: 'ri-add-line',
	addCircleOutline: 'ri-add-circle-line',
	bookmarkOutline: 'ri-bookmark-line',
	bookmarkFill: 'ri-bookmark-fill',
	feedbackOutline: 'ri-feedback-line',
	downFillArrow: 'ri-arrow-down-s-fill',
	upFillArrow: 'ri-arrow-up-s-fill',
	rightFillArrow: 'ri-arrow-right-s-fill',
	leftFillArrow: 'ri-arrow-left-s-fill',
	flipCameraOutline: 'ri-camera-switch-line',
	imageFill: 'ri-image-fill',
	deleteBin2Line: 'delete-bin-2-line',
	circleLogout: 'logout-circle-line',
	privateOutline: 'ri-lock-line',
	bubbleOutline: 'ri-bubble-chart-line',
	forbidOutline: 'ri-forbid-line',
};

export default {
	colorPalette,
	layout,
	typography,
	utils,
	icons,
	sizing,
};
