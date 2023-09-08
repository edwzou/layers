import { createContext } from "react";

type UserContextType = {
    data: Record<string, unknown> | null,
    updateData: (user: any) => void
}

export const UserContext = createContext<UserContextType>({ data: null, updateData: (user) => { } });
