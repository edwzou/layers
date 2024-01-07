import { UserProvider } from '../Contexts/UserContext';
import React from 'react';
import AppHome from './AppHome';
import { CameraProvider } from '../Contexts/CameraContext';

const AppProvider: React.FC = () => {
	return (
		<UserProvider>
			<CameraProvider>
				<AppHome />
			</CameraProvider>
		</UserProvider>
	);
};

export default AppProvider;
