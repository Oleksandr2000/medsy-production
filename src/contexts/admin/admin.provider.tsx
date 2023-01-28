import { createContext, useState, useContext } from "react";

export interface IPersonalData {
    aboneCode: string;
    googleKey: string;
    googleEmail: string;
    googleTableId: string;
    orderDeepLink: string;
    taskHash: string;
}

const adminContext = createContext({} as any);

export const AdminProvider = ({ children }) => {
    const [personalData, setPersonalData] = useState<IPersonalData | null>(null);

    return <adminContext.Provider value={{ personalData, setPersonalData }}>{children}</adminContext.Provider>;
};

export const useAdmin = () => useContext(adminContext);
