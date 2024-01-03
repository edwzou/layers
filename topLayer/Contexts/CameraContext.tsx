import {
	createContext,
	type ReactNode,
	useReducer,
	type ReactElement,
	type Dispatch,
	useContext,
} from 'react';

interface PhotoProviderProps {
	children: ReactNode;
}

interface photoReducerProps {
	type: string;
	image: string;
}

const photoReducer = (state: string, action: photoReducerProps): string => {
	switch (action.type) {
		case 'new photo': {
			return action.image;
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
