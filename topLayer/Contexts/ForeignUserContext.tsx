import {
	createContext,
	type ReactNode,
	useReducer,
	type ReactElement,
	type Dispatch,
	useContext,
} from 'react';

interface MarkUserFuncProviderProps {
	children: ReactNode;
}

interface MarkUserFuncUpdateProps {
	type: string;
	func: () => void;
}

const markUserFuncReducer = (
	state: () => void,
	action: MarkUserFuncUpdateProps
): (() => void) => {
	switch (action.type) {
		case 'new user': {
			return action.func;
		}
		default: {
			throw Error('Unknown action: ' + String(action.type));
		}
	}
};

// eslint-disable-next-line @typescript-eslint/no-extra-parens
export const MarkUserFuncContext = createContext<() => void>((): void => {});
export const MarkUserFuncDispatchContext = createContext<
	Dispatch<MarkUserFuncUpdateProps>
>((() => {}) as Dispatch<MarkUserFuncUpdateProps>);

export function MarkUserFuncProvider({
	children,
}: MarkUserFuncProviderProps): ReactElement {
	const [tasks, dispatch] = useReducer(markUserFuncReducer, () => {});

	return (
		<MarkUserFuncContext.Provider value={tasks}>
			<MarkUserFuncDispatchContext.Provider value={dispatch}>
				{children}
			</MarkUserFuncDispatchContext.Provider>
		</MarkUserFuncContext.Provider>
	);
}

export const useMarkUserFunc = (): (() => void) => {
	return useContext(MarkUserFuncContext);
};

export const useMarkUserFuncDispatch =
	(): Dispatch<MarkUserFuncUpdateProps> => {
		return useContext(MarkUserFuncDispatchContext);
	};
