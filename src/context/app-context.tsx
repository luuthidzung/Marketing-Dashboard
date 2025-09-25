'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

type Theme = 'light' | 'dark' | 'system';

interface AppContextType {
    theme: Theme;
    setTheme: (theme: Theme) => void;
    sidebarOpen: boolean;
    setSidebarOpen: (open: boolean) => void;
    notifications: Notification[];
    addNotification: (notification: Notification) => void;
    clearNotifications: () => void;
}

interface Notification {
    id: string;
    title: string;
    message: string;
    type: 'info' | 'success' | 'warning' | 'error';
    read: boolean;
    timestamp: Date;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [theme, setTheme] = useState<Theme>('light');
    const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);
    const [notifications, setNotifications] = useState<Notification[]>([]);

    const addNotification = (notification: Notification) => {
        setNotifications((prev) => [notification, ...prev]);
    };

    const clearNotifications = () => {
        setNotifications([]);
    };

    return (
        <AppContext.Provider
            value={{
                theme,
                setTheme,
                sidebarOpen,
                setSidebarOpen,
                notifications,
                addNotification,
                clearNotifications,
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => {
    const context = useContext(AppContext);
    if (context === undefined) {
        throw new Error('useAppContext must be used within an AppProvider');
    }
    return context;
};
