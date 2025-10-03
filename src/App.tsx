import { useState, useCallback, useEffect } from 'react';
import { LoginScreen } from './components/LoginScreen';
import { EntryScreen } from './components/EntryScreen';
import { WrittenReportForm } from './components/WrittenReportForm';
import { VocalReportFlow } from './components/VocalReportFlow';
import { ReportModal } from './components/ReportModal';
import { GeneratedReports } from './components/GeneratedReports';
import { HelpSupport } from './components/HelpSupport';

type Screen = 'login' | 'entry' | 'written' | 'vocal' | 'generated' | 'help';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('login');
  const [userName, setUserName] = useState('');
  const [reportData, setReportData] = useState<any>(null);
  const [showReportModal, setShowReportModal] = useState(false);
  const [showNestedModal, setShowNestedModal] = useState(false);

  const handleLogin = (name: string) => {
    setUserName(name);
    setCurrentScreen('entry');
  };

  const handleMethodSelection = (method: 'written' | 'vocal' | 'generated' | 'help') => {
    setCurrentScreen(method);
  };

  const handleBackToEntry = () => {
    setCurrentScreen('entry');
  };

  const handleBackToLogin = () => {
    setCurrentScreen('login');
    setUserName('');
  };

  const handleReportGeneration = (data: any) => {
    setReportData(data);
    setShowReportModal(true);
  };

  const handleModalClose = () => {
    setShowReportModal(false);
    setCurrentScreen('entry');
  };

  const handleNestedModalChange = useCallback((isOpen: boolean) => {
    setShowNestedModal(isOpen);
  }, []);

  const shouldBlur = showReportModal || showNestedModal;



  return (
    <div className="min-h-screen w-full overflow-x-hidden">
      {/* Backdrop blur overlay */}
      {shouldBlur && <div className="modal-backdrop" />}
      
      <div className="w-full max-w-full">
        {currentScreen === 'login' && (
          <LoginScreen onLogin={handleLogin} />
        )}
        
        {currentScreen === 'entry' && (
          <EntryScreen 
            userName={userName} 
            onSelectMethod={handleMethodSelection}
            onBack={handleBackToLogin}
          />
        )}
        
        {currentScreen === 'written' && (
          <WrittenReportForm
            userName={userName}
            onBack={handleBackToEntry}
            onGenerateReport={handleReportGeneration}
          />
        )}
        
        {currentScreen === 'vocal' && (
          <VocalReportFlow
            userName={userName}
            onBack={handleBackToEntry}
            onComplete={handleReportGeneration}
          />
        )}
        
        {currentScreen === 'generated' && (
          <GeneratedReports
            userName={userName}
            onBack={handleBackToEntry}
          />
        )}
        
        {currentScreen === 'help' && (
          <HelpSupport
            userName={userName}
            onBack={handleBackToEntry}
          />
        )}
      </div>
      
      {showReportModal && (
        <ReportModal
          isOpen={showReportModal}
          onClose={handleModalClose}
          reportData={reportData}
          userName={userName}
          onNestedModalChange={handleNestedModalChange}
        />
      )}
    </div>
  );
}