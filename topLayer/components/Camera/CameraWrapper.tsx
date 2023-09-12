import React, { useState } from 'react';
import CameraComponent from './Camera';

const CameraWrapper = () => {
	const [data, setData] = useState<string>('');

	console.log(data); //! !! Currently returns a URI, change depending on what Cloud Storage Needs
	return <CameraComponent data={setData} />;
};

export default CameraWrapper;
