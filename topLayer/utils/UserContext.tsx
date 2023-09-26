import { User } from "../pages/Main";
import { createContext } from "react";

type UserContextType = {
    data: User | null
    updateData: (user: any) => void
}

export const UserContext = createContext<UserContextType>({ data: null, updateData: (user) => { } });
