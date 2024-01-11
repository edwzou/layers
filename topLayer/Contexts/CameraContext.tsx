import {
	createContext,
	type ReactNode,
	useReducer,
	type ReactElement,
	type Dispatch,
	useContext,
	useEffect,
} from 'react';
import { useUser } from './UserContext';

interface PhotoProviderProps {
	children: ReactNode;
}

interface photoReducerProps {
	type: string;
	image: string;
}

const photoReducer = (_state: string, action: photoReducerProps): string => {
	switch (action.type) {
		case 'new photo': {
			return action.image;
		}
		case 'null photo': {
			return '';
		}
		default: {
			throw Error('Unknown action: ' + String(action.type));
		}
	}
};

export const photoContext = createContext<string>('');
export const photoUpdateContext = createContext<Dispatch<photoReducerProps>>(
	() => {}
);

export function CameraProvider({ children }: PhotoProviderProps): ReactElement {
	const [tasks, dispatch] = useReducer(photoReducer, '');
	const user = useUser();
	useEffect(() => {
		if (tasks !== user.profile_picture) {
			dispatch({
				type: 'new photo',
				image: user.profile_picture,
			});
		}
	}, [user]);

	return (
		<photoContext.Provider value={tasks}>
			<photoUpdateContext.Provider value={dispatch}>
				{children}
			</photoUpdateContext.Provider>
		</photoContext.Provider>
	);
}

export const usePhoto = (): string => {
	return useContext(photoContext);
};

export const usePhotoUpdate = (): Dispatch<photoReducerProps> => {
	return useContext(photoUpdateContext);
};
