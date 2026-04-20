import React from 'react';
import { useAuth } from '../context/AuthContext';
import { cn } from './ui/utils';
import {
  Home,
  BookOpen,
  Search,
  FolderTree,
  MessageSquare,
  BarChart3,
  Users,
  Settings,
  LifeBuoy
} from 'lucide-react';

interface SidebarProps {
  currentView: string;
  onViewChange: (view: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentView, onViewChange, isOpen, onClose }) => {
  const { currentUser } = useAuth();

  const handleViewChange = (view: string) => {
    onViewChange(view);
    onClose();
  };

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home, roles: ['admin', 'user'] },
    { id: 'search', label: 'Search Articles', icon: Search, roles: ['admin', 'user'] },
    { id: 'tickets', label: 'Support Tickets', icon: LifeBuoy, roles: ['admin', 'user'] },
    { id: 'categories', label: 'Categories', icon: FolderTree, roles: ['admin', 'user'] },
    { id: 'feedback', label: 'Feedback & Ratings', icon: MessageSquare, roles: ['admin'] },
    { id: 'analytics', label: 'Analytics & Reports', icon: BarChart3, roles: ['admin'] },
    { id: 'users', label: 'User Management', icon: Users, roles: ['admin'] },
    { id: 'settings', label: 'Settings', icon: Settings, roles: ['admin'] },
  ];

  const filteredMenuItems = menuItems.filter(item => 
    item.roles.includes(currentUser?.role || 'user')
  );

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed lg:static inset-y-0 left-0 z-50 w-64 bg-card border-r border-border transition-transform duration-300 ease-in-out",
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        <div className="flex flex-col h-full">
          <nav className="flex-1 overflow-y-auto p-4 space-y-1">
            {filteredMenuItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentView === item.id;
              
              return (
                <button
                  key={item.id}
                  onClick={() => handleViewChange(item.id)}
                  className={cn(
                    "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                    isActive
                      ? "bg-accent text-accent-foreground"
                      : "text-muted-foreground hover:bg-accent/50 hover:text-accent-foreground"
                  )}
                >
                  <Icon className={cn("w-5 h-5", isActive ? "text-accent-foreground" : "text-muted-foreground")} />
                  {item.label}
                </button>
              );
            })}
          </nav>
        </div>
      </aside>
    </>
  );
};

