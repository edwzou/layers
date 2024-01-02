import { type User } from '../pages/Main/UserTypes';
import { createContext } from 'react';

interface UserContextType {
	data: User | null;
	updateData: (user: any) => void;
}

export const UserContext = createContext<UserContextType>({
	data: null,
	updateData: (user) => {},
});
