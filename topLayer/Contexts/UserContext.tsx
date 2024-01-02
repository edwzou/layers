import { type User } from '../pages/Main/UserTypes';
import {
	createContext,
	type ReactNode,
	type ReactElement,
	type Dispatch,
} from 'react';
import { useImmerReducer } from 'use-immer';
import { defaultUser } from 'constants/DefaultUser';

interface UserProviderProps {
	children: ReactNode;
}

interface UserReducerProps {
	type: string;
	image: string;
}

const userReducer = (draft: User, action: UserReducerProps): User => {
	console.log('User: ', action);
	switch (action.type) {
		case 'change image': {
			draft.pp_url = action.image;
			return draft;
		}
		default: {
			throw Error('Unknown action: ' + String(action.type));
		}
	}
};

export const UserContext = createContext<User>(defaultUser);
export const UpdateUserContext = createContext<Dispatch<UserReducerProps>>(
	() => {}
);

export const UserProvider = ({ children }: UserProviderProps): ReactElement => {
	const [tasks, dispatch] = useImmerReducer(userReducer, defaultUser);
	return (
		<UserContext.Provider value={tasks}>
			<UpdateUserContext.Provider value={dispatch}>
				{children}
			</UpdateUserContext.Provider>
		</UserContext.Provider>
	);
};
