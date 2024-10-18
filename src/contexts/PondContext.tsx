// PondContext.tsx

import React, { createContext, useState, ReactNode, useContext } from 'react';

interface Pond {
    id: string;
    name: string;
    image: File | null;
    shape: string;
    base: string;
    position: string;
    radius?: string;
    length?: string;
    width?: string;
    height?: string;
    sensorDevices?: string[];

}

interface PondContextType {
    ponds: Pond[];
    addPond: (pond: Pond) => void;
    updatePond: (pond: Pond) => void;
}

const PondContext = createContext<PondContextType | undefined>(undefined);

export const PondProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [ponds, setPonds] = useState<Pond[]>([]);

    const addPond = (pond: Pond) => {
        setPonds(prevPonds => [...prevPonds, pond]);
    };

    const updatePond = (updatedPond: Pond) => {
        setPonds((prevPonds) =>
            prevPonds.map((pond) => (pond.id === updatedPond.id ? updatedPond : pond))
        );
    };


    return (
        <PondContext.Provider value={{ ponds, addPond, updatePond }}>
            {children}
        </PondContext.Provider>
    );
};

export const usePond = (): PondContextType => {
    const context = useContext(PondContext);
    if (!context) {
        throw new Error('usePond must be used within a PondProvider');
    }
    return context;
};
