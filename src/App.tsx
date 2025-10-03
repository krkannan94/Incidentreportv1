import { useState } from 'react';
import { LoginScreen } from './components/LoginScreen';
import { EntryScreen } from './components/EntryScreen';
import { WrittenReportForm } from './components/WrittenReportForm';
import { VocalReportFlow } from './components/VocalReportFlow';
import { ReportModal } from './components/ReportModal';
import { GeneratedReports } from './components/GeneratedReports';
import { HelpSupport } from './components/HelpSupport';
import { AppProvider } from './context/AppContext';
import { Report } from './lib/supabase';

type Screen = 'login' | 'entry' | 'written' | 'vocal' | 'generated' | 'help';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('login');
  const [userName, setUserName] = useState('');
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [showReportModal, setShowReportModal] = useState(false);

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

  const handleReportGeneration = (report: Report) => {
    setSelectedReport(report);
    setShowReportModal(true);
  };

  const handleViewReport = (report: Report) => {
    setSelectedReport(report);
    setShowReportModal(true);
  };

  const handleModalClose = () => {
    setShowReportModal(false);
    setCurrentScreen('entry');
  };

  return (
    <AppProvider>
      <div className="min-h-screen w-full">
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
            onGenerateReport={handleReportGeneration}
          />
        )}

        {currentScreen === 'generated' && (
          <GeneratedReports
            userName={userName}
            onBack={handleBackToEntry}
            onViewReport={handleViewReport}
          />
        )}

        {currentScreen === 'help' && (
          <HelpSupport
            userName={userName}
            onBack={handleBackToEntry}
          />
        )}

        {showReportModal && selectedReport && (
          <ReportModal
            isOpen={showReportModal}
            onClose={handleModalClose}
            report={selectedReport}
            userName={userName}
          />
        )}
      </div>
    </AppProvider>
  );
}
