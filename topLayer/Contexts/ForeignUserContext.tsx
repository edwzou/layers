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
	func: (marked: boolean) => void;
}

type StateType = (marked: boolean) => void;

const markUserFuncReducer = (
	_state: StateType,
	action: MarkUserFuncUpdateProps
): ((marked: boolean) => void) => {
	switch (action.type) {
		case 'new user': {
			return action.func;
		}
		default: {
			throw Error('Unknown action: ' + String(action.type));
		}
	}
};

export const MarkUserFuncContext = createContext<StateType>(
	(_marked: boolean) => {}
);
export const MarkUserFuncDispatchContext = createContext<
	Dispatch<MarkUserFuncUpdateProps>
>((() => {}) as Dispatch<MarkUserFuncUpdateProps>);

export function MarkUserFuncProvider({
	children,
}: MarkUserFuncProviderProps): ReactElement {
	const [tasks, dispatch] = useReducer(
		markUserFuncReducer,
		(_marked: boolean) => {}
	);

	return (
		<MarkUserFuncContext.Provider value={tasks}>
			<MarkUserFuncDispatchContext.Provider value={dispatch}>
				{children}
			</MarkUserFuncDispatchContext.Provider>
		</MarkUserFuncContext.Provider>
	);
}

export const useMarkUserFunc = (): StateType => {
	return useContext(MarkUserFuncContext);
};

export const useMarkUserFuncDispatch =
	(): Dispatch<MarkUserFuncUpdateProps> => {
		return useContext(MarkUserFuncDispatchContext);
	};
