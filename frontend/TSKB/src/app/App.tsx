import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { LoginPage } from './components/LoginPage';
import { SignupPage } from './components/SignupPage';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { SearchArticles } from './components/SearchArticles';
import { ArticleDetail } from './components/ArticleDetail';
import { ManageArticles } from './components/ManageArticles';
import { Categories } from './components/Categories';
import { FeedbackRatings } from './components/FeedbackRatings';
import { Analytics } from './components/Analytics';
import { UserManagement } from './components/UserManagement';
import { Settings } from './components/Settings';
import { TicketManagement } from './components/TicketManagement';

const MainApp: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const [authView, setAuthView] = useState<'login' | 'signup'>('login');
  const [currentView, setCurrentView] = useState('dashboard');
  const [selectedArticleId, setSelectedArticleId] = useState<string | null>(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState('all');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleArticleSelect = (articleId: string) => {
    setSelectedArticleId(articleId);
    setCurrentView('article-detail');
  };

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategoryId(categoryId);
    setCurrentView('search');
  };

  const handleBackFromArticle = () => {
    setSelectedArticleId(null);
    setCurrentView('search');
  };

  const handleViewChange = (view: string) => {
    if (view === 'search') {
      setSelectedCategoryId('all');
    }
    setCurrentView(view);
  };

  const renderContent = () => {
    if (currentView === 'article-detail' && selectedArticleId) {
      return <ArticleDetail articleId={selectedArticleId} onBack={handleBackFromArticle} />;
    }

    switch (currentView) {
      case 'dashboard':
        return <Dashboard onArticleSelect={handleArticleSelect} onViewChange={handleViewChange} />;
      case 'search':
        return <SearchArticles onArticleSelect={handleArticleSelect} initialCategory={selectedCategoryId} />;
      case 'tickets':
        return <TicketManagement />;
      case 'articles':
        return <ManageArticles />;
      case 'categories':
        return <Categories onCategorySelect={handleCategorySelect} />;
      case 'feedback':
        return <FeedbackRatings />;
      case 'analytics':
        return <Analytics />;
      case 'users':
        return <UserManagement />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard onArticleSelect={handleArticleSelect} onViewChange={handleViewChange} />;
    }
  };

  if (!isAuthenticated) {
    return authView === 'login' ? (
      <LoginPage onSwitchToSignup={() => setAuthView('signup')} />
    ) : (
      <SignupPage onSwitchToLogin={() => setAuthView('login')} />
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} />
      
      <div className="flex h-[calc(100vh-4rem)]">
        <Sidebar 
          currentView={currentView}
          onViewChange={handleViewChange}
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />
        
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-7xl mx-auto p-4 lg:p-6">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <ThemeProvider>
        <MainApp />
      </ThemeProvider>
    </AuthProvider>
  );
};

export default App;
