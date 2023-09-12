import React, { useState } from 'react';
import CameraComponent from './Camera';

const CameraWrapper = ({ route }: any) => {
	const [data, setData] = useState<string>('');
	const { setImage } = route.params;

	setImage(data);
	console.log(data); //! !! Currently returns a URI, change depending on what Cloud Storage Needs
	return <CameraComponent data={setData} />;
};

export default CameraWrapper;
