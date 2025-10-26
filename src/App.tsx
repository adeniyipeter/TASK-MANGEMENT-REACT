import { useState } from 'react';
import { AuthProvider } from './contexts/AuthContext';

import { Landing } from './page/Landing';
import { Login } from './page/Login';
import { Signup } from './page/Signup';
import { Dashboard } from './page/Dashboard';
import { Tickets } from './page/Tickets';
import { Toast } from './components/Toast';

type Page = 'landing' | 'login' | 'signup' | 'dashboard' | 'tickets';

type ToastState = {
  message: string;
  type: 'success' | 'error';
} | null;

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('landing');
  const [toast, setToast] = useState<ToastState>(null);

  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ message, type });
  };

  const closeToast = () => {
    setToast(null);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'landing':
        return <Landing onNavigate={setCurrentPage} />;
      case 'login':
        return <Login onNavigate={setCurrentPage} onShowToast={showToast} />;
      case 'signup':
        return <Signup onNavigate={setCurrentPage} onShowToast={showToast} />;
      case 'dashboard':
        return <Dashboard onNavigate={setCurrentPage} onShowToast={showToast} />;
      case 'tickets':
        return <Tickets onNavigate={setCurrentPage} onShowToast={showToast} />;
      default:
        return <Landing onNavigate={setCurrentPage} />;
    }
  };

  return (
    <AuthProvider>
      {renderPage()}
      {toast && <Toast message={toast.message} type={toast.type} onClose={closeToast} />}
    </AuthProvider>
  );
}

export default App;
