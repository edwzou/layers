import { type User } from '../pages/Main/UserTypes';
import {
	createContext,
	type ReactNode,
	type ReactElement,
	type Dispatch,
	useState,
	useEffect,
	useContext,
} from 'react';
import { useImmerReducer } from 'use-immer';
import { getUser } from '../endpoints/getUser';
import { defaultUser } from '../constants/DefaultUser';

interface UserProviderProps {
	children: ReactNode;
}

interface UserReducerProps {
	type: string;
	uid?: string;
	first_name?: string;
	last_name?: string;
	email?: string;
	username?: string;
	private_option?: boolean;
	followers?: string[];
	following?: string[];
	pp_url?: string;
}

const userReducer = (draft: User, action: UserReducerProps): User => {
	console.log('User: ', action);
	switch (action.type) {
		case 'change': {
			if (action.uid !== null && action.uid !== undefined) {
				draft.uid = action.uid;
			}
			if (action.first_name !== null && action.first_name !== undefined) {
				draft.first_name = action.first_name;
			}
			if (action.last_name !== null && action.last_name !== undefined) {
				draft.last_name = action.last_name;
			}
			if (action.email !== null && action.email !== undefined) {
				draft.email = action.email;
			}
			if (action.username !== null && action.username !== undefined) {
				draft.username = action.username;
			}
			if (
				action.private_option !== null &&
				action.private_option !== undefined
			) {
				draft.private_option = action.private_option;
			}
			if (action.followers !== null && action.followers !== undefined) {
				draft.followers = action.followers;
			}
			if (action.following !== null && action.following !== undefined) {
				draft.following = action.following;
			}
			if (action.pp_url !== null && action.pp_url !== undefined) {
				draft.pp_url = action.pp_url;
			}
			return draft;
		}
		default: {
			throw Error('Unknown action user reducer: ' + String(action.type));
		}
	}
};

export const UserContext = createContext<User>(defaultUser);
export const UpdateUserContext = createContext<Dispatch<UserReducerProps>>(
	() => {}
);

export const UserProvider = ({ children }: UserProviderProps): ReactElement => {
	const [user, setUser] = useState<User>(defaultUser);

	useEffect(() => {
		void getUser(setUser);
	}, []);
	const [tasks, dispatch] = useImmerReducer(userReducer, user);
	return (
		<UserContext.Provider value={tasks}>
			<UpdateUserContext.Provider value={dispatch}>
				{children}
			</UpdateUserContext.Provider>
		</UserContext.Provider>
	);
};

export const useUser = (): User | null => {
	return useContext(UserContext);
};

export const useUpdateUser = (): Dispatch<UserReducerProps> => {
	return useContext(UpdateUserContext);
};
