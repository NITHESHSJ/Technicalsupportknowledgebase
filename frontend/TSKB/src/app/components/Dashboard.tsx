import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { 
  BookOpen, 
  Eye, 
  Users, 
  Star,
  TrendingUp,
  Clock,
  CheckCircle2,
  AlertCircle,
  LifeBuoy
} from 'lucide-react';
import { api } from '../data/api';
import { Article, mockAnalytics } from '../data/mockData';

interface DashboardProps {
  onArticleSelect: (articleId: string) => void;
  onViewChange: (view: string) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ onArticleSelect, onViewChange }) => {
  const { currentUser } = useAuth();
  const [recentArticles, setRecentArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRecentArticles = async () => {
      try {
        const data = await api.getArticles();
        const mapped = data.slice(0, 5).map((a: any) => ({
          ...a,
          id: a._id || a.id
        }));
        setRecentArticles(mapped);
      } catch (error) {
        console.error('Failed to fetch dashboard articles:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchRecentArticles();
  }, []);

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div>
        <h2 className="text-2xl font-semibold text-foreground">
          Welcome back, {currentUser?.name}!
        </h2>
        <p className="text-muted-foreground mt-1">
          {currentUser?.role === 'admin' && 'Manage your knowledge base and monitor system performance.'}
          {currentUser?.role === 'user' && 'Find solutions to technical issues quickly and easily.'}
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Articles</p>
                <p className="text-2xl font-semibold text-foreground mt-1">
                  {mockAnalytics.totalArticles}
                </p>
                <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  +12% this month
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Views</p>
                <p className="text-2xl font-semibold text-foreground mt-1">
                  {mockAnalytics.totalViews.toLocaleString()}
                </p>
                <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  +8% this month
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                <Eye className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Users</p>
                <p className="text-2xl font-semibold text-foreground mt-1">
                  {mockAnalytics.totalUsers}
                </p>
                <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  +15% this month
                </p>
              </div>
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg. Rating</p>
                <p className="text-2xl font-semibold text-foreground mt-1">
                  {mockAnalytics.avgRating.toFixed(1)}
                </p>
                <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
                  <Star className="w-3 h-3 fill-current" />
                  Excellent feedback
                </p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg flex items-center justify-center">
                <Star className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <button 
              onClick={() => onViewChange('tickets')}
              className="w-full flex items-center gap-3 p-3 rounded-lg border border-border hover:border-orange-500 hover:bg-orange-50 dark:hover:bg-orange-900/20 transition-colors text-left"
            >
              <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center">
                <LifeBuoy className="w-5 h-5 text-orange-600 dark:text-orange-400" />
              </div>
              <div>
                <p className="font-medium text-foreground">Report a Problem</p>
                <p className="text-sm text-muted-foreground">Submit a new support ticket</p>
              </div>
            </button>
            
            <button 
              onClick={() => onViewChange('search')}
              className="w-full flex items-center gap-3 p-3 rounded-lg border border-border hover:border-green-500 hover:bg-green-50 dark:hover:bg-green-900/20 transition-colors text-left"
            >
              <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className="font-medium text-foreground">Browse Solutions</p>
                <p className="text-sm text-muted-foreground">Find answers to common issues</p>
              </div>
            </button>

            {currentUser?.role === 'admin' && (
              <button 
                onClick={() => onViewChange('users')}
                className="w-full flex items-center gap-3 p-3 rounded-lg border border-border hover:border-purple-500 hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors text-left"
              >
                <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                  <Users className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <p className="font-medium text-foreground">Manage Users</p>
                  <p className="text-sm text-muted-foreground">Add or modify user accounts</p>
                </div>
              </button>
            )}
          </CardContent>
        </Card>

        {/* Top Searched Issues */}
        <Card>
          <CardHeader>
            <CardTitle>Top Searched Issues</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {mockAnalytics.topSearchedIssues.map((issue, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-semibold ${
                      index === 0 ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-400' :
                      index === 1 ? 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300' :
                      index === 2 ? 'bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-400' :
                      'bg-muted text-muted-foreground'
                    }`}>
                      {index + 1}
                    </div>
                    <span className="text-sm font-medium text-foreground">{issue.issue}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">{issue.count} searches</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Articles */}
      <Card>
        <CardHeader>
          <CardTitle>Recently Updated Articles</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="py-8 text-center text-muted-foreground">Loading recent articles...</div>
          ) : recentArticles.length === 0 ? (
            <div className="py-8 text-center text-muted-foreground">No articles yet.</div>
          ) : (
            <div className="space-y-3">
              {recentArticles.map((article) => (
                <div 
                  key={article.id} 
                  onClick={() => onArticleSelect(article.id)}
                  className="flex items-start gap-4 p-3 rounded-lg border border-border hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors cursor-pointer"
                >
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    article.severity === 'critical' ? 'bg-red-100 dark:bg-red-900/30' :
                    article.severity === 'high' ? 'bg-orange-100 dark:bg-orange-900/30' :
                    article.severity === 'medium' ? 'bg-yellow-100 dark:bg-yellow-900/30' :
                    'bg-blue-100 dark:bg-blue-900/30'
                  }`}>
                    <AlertCircle className={`w-5 h-5 ${
                      article.severity === 'critical' ? 'text-red-600 dark:text-red-400' :
                      article.severity === 'high' ? 'text-orange-600 dark:text-orange-400' :
                      article.severity === 'medium' ? 'text-yellow-600 dark:text-yellow-400' :
                      'text-blue-600 dark:text-blue-400'
                    }`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-foreground truncate">{article.title}</h4>
                    <p className="text-sm text-muted-foreground truncate">{article.summary}</p>
                    <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Eye className="w-3 h-3" />
                        {article.views || 0} views
                      </span>
                      <span className="flex items-center gap-1">
                        <Star className="w-3 h-3 fill-current text-yellow-500" />
                        {article.rating || 0}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {new Date(article.updatedAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

