export const userConstraints = {
	firstNameMax: 50,
	lastNameMax: 50,
	usernameMax: 20,
	emailMax: 255,
	emailPattern: /^\S+@\S+\.\S+$/,
	passwordMin: 8,
	passwordMax: 100,
};

export const userFieldRules = {
	firstName: {
		required: true,
		maxLength: userConstraints.firstNameMax,
	},
	lastName: {
		required: true,
		maxLength: userConstraints.lastNameMax,
	},
	username: {
		required: true,
		maxLength: userConstraints.usernameMax,
	},
	email: {
		required: true,
		pattern: userConstraints.emailPattern,
		maxLength: userConstraints.emailMax,
	},
	password: {
		required: true,
		minLength: userConstraints.passwordMin,
		maxLength: userConstraints.passwordMax,
	},
};
