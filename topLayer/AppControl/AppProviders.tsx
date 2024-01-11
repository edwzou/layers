import { UserProvider } from '../Contexts/UserContext';
import React, { StrictMode } from 'react';
import AppHome from './AppHome';
import { CameraProvider } from '../Contexts/CameraContext';

const AppProvider: React.FC = () => {
	return (
		<StrictMode>
			<UserProvider>
				<CameraProvider>
					<AppHome />
				</CameraProvider>
			</UserProvider>
		</StrictMode>
	);
};

export default AppProvider;
