import { LogBox } from 'react-native';
import React, { StrictMode } from 'react';
import AppHome from './AppHome';

LogBox.ignoreLogs(['Require cycle:']);
// ^ Ignores require cycle warnings. We decided to ignore these warnings for 2 reasons:
// 1. Require cycles are technically not errors. It's just React Native telling us that this is an area of potential danger (which we should keep in mind)
// 2. There's rarely a fix for require cycles, especially if it involves more than 2 components (which is our case)
LogBox.ignoreLogs(['Constants.platform.ios.model has been deprecated']);

const AppAdmin: React.FC = () => {
	return <AppHome />;
};

export default AppAdmin;
