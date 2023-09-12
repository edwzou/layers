import axios from 'axios';
import { baseUrl } from 'utils/apiUtils';

const getData = async () => {
	const data = await axios.get(`${baseUrl}/api/public/clothing-item`);
};
