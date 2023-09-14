import React, { useState } from 'react';
import CameraComponent from './Camera';

const CameraWrapper = ({ route }: any) => {
	const [data, setData] = useState<string>('');
	const { setImage } = route.params;

	setImage(data);
	return <CameraComponent data={setData} />;
};

export default CameraWrapper;
