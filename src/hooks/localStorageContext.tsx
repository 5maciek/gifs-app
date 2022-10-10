import { createContext, useEffect, useState } from "react"

const getIds = (): string[] => {
    const localValue = localStorage.getItem("favorite");
    if (!localValue) return [];
    return JSON.parse(localValue) || []
}

const initialIds = getIds();

export const LocalStorageContext = createContext<{ ids: string[], setIds(ids: string[]): void }>({ ids: [], setIds: () => { } })

export const LocalStorageProvider: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
    const [ids, setIds] = useState<string[]>(initialIds)

    useEffect(() => {
        localStorage.setItem("favorite", JSON.stringify(ids));
    }, [ids]);

    return <LocalStorageContext.Provider value={{ ids, setIds }}>{children}</LocalStorageContext.Provider>
}