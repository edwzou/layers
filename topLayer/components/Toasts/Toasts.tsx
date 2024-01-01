import Toast from 'react-native-toast-message';
import { toast } from '../../constants/GlobalStrings';
import GlobalStyles from '../../constants/GlobalStyles';

export const showSuccessToast = (text2: string): void => {
	Toast.show({
		type: 'success',
		text1: toast.success,
		text2: text2,
		topOffset: GlobalStyles.layout.toastTopOffset,
	});
};

export const showErrorToast = (text2: string): void => {
	Toast.show({
		type: 'error',
		text1: toast.error,
		text2: text2,
		topOffset: GlobalStyles.layout.toastTopOffset,
	});
};
