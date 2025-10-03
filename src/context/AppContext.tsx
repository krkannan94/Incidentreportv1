import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AppContextType {
  userName: string;
  setUserName: (name: string) => void;
  currentScreen: string;
  setCurrentScreen: (screen: string) => void;
  selectedReport: any;
  setSelectedReport: (report: any) => void;
  showReportModal: boolean;
  setShowReportModal: (show: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [userName, setUserName] = useState<string>('');
  const [currentScreen, setCurrentScreen] = useState<string>('login');
  const [selectedReport, setSelectedReport] = useState<any>(null);
  const [showReportModal, setShowReportModal] = useState<boolean>(false);

  return (
    <AppContext.Provider
      value={{
        userName,
        setUserName,
        currentScreen,
        setCurrentScreen,
        selectedReport,
        setSelectedReport,
        showReportModal,
        setShowReportModal,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
