import React, { createContext, useContext, useEffect, useState } from 'react';

interface WidgetApiContextProps {
    children: React.ReactNode;
}

interface WidgetApiContextType {
    widgetApi: any;
}

const WidgetApiContext = createContext<WidgetApiContextType | undefined>(undefined);

const WidgetApiProvider: React.FC<WidgetApiContextProps> = ({ children }) => {
    const [widgetApi, setWidgetApi] = useState<any | null>(null);
    useEffect(() => {
        const api = (window as any).widgetApi;

        setWidgetApi(api);
    }, []);

    return <WidgetApiContext.Provider value={{ widgetApi }}>{children}</WidgetApiContext.Provider>;
};

export const useWidgetApi = (): any => {
    const context = useContext(WidgetApiContext);
    if (!context) throw new Error('UseWidgetApi must be used within a WidgetApiProvider');

    return context.widgetApi;
};

export default WidgetApiProvider;
