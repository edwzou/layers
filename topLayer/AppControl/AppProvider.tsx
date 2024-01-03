import { UserProvider } from '../Contexts/UserContext';
import React from 'react';
import AppHome from './AppHome';

const AppProvider: React.FC = () => {
	return (
		<UserProvider>
			<AppHome />
		</UserProvider>
	);
};

export default AppProvider;
