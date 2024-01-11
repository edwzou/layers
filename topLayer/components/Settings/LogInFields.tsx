import { type ReactElement } from 'react';
import { View } from 'react-native';
import GlobalStyles from '../../constants/GlobalStyles';
import { type Control, Controller } from 'react-hook-form';
import InlineTextbox from '../../components/Textbox/InlineTextbox';
import { userFieldRules } from '../../constants/userConstraints';

interface LoginFieldsType {
	control: Control<{ username: string; email: string; password: string }>;
}

const LoginFields = ({ control }: LoginFieldsType): ReactElement => {
	return (
		<View style={{ gap: GlobalStyles.layout.gap }}>
			<Controller
				control={control}
				rules={userFieldRules.email}
				render={({ field: { onChange, value } }) => (
					<InlineTextbox
						autoCapitalize="none"
						icon={GlobalStyles.icons.userOutline}
						placeholder="Email"
						value={value}
						onFieldChange={onChange}
					/>
				)}
				name="email"
			/>
			<Controller
				control={control}
				rules={userFieldRules.password}
				render={({ field: { onChange, value } }) => (
					<InlineTextbox
						icon={GlobalStyles.icons.passwordOutline}
						placeholder="Password"
						value={value}
						onFieldChange={onChange}
						secure
					/>
				)}
				name="password"
			/>
		</View>
	);
};

export default LoginFields;
