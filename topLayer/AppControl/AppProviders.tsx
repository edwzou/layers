import { UserProvider } from '../Contexts/UserContext';
import React, { StrictMode } from 'react';
import AppHome from './AppHome';
import { CameraProvider } from '../Contexts/CameraContext';
import { LoadingProvider } from '../Contexts/Loading';

const AppProvider: React.FC = () => {
	return (
		<StrictMode>
			<LoadingProvider>
				<UserProvider>
					<CameraProvider>
						<AppHome />
					</CameraProvider>
				</UserProvider>
			</LoadingProvider>
		</StrictMode>
	);
};

export default AppProvider;
