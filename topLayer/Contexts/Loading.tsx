import React, {
	createContext,
	type ReactNode,
	type ReactElement,
	type Dispatch,
	useContext,
	useState,
	type SetStateAction,
} from 'react';
import { Loading } from '../components/Loading/Loading';

interface LoadingProviderProps {
	children: ReactNode;
}

export const photoContext = createContext<string>('');
export const setLoadingContext = createContext<
	Dispatch<SetStateAction<boolean>>
>(() => {});

export function LoadingProvider({
	children,
}: LoadingProviderProps): ReactElement {
	const [loading, setLoading] = useState(false);

	return (
		<setLoadingContext.Provider value={setLoading}>
			{children}
			{loading ? <Loading /> : null}
		</setLoadingContext.Provider>
	);
}

export const useSetLoading = (): Dispatch<SetStateAction<boolean>> => {
	return useContext(setLoadingContext);
};
