import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { mockCategories } from '../data/mockData';
import { api } from '../data/api';
import * as LucideIcons from 'lucide-react';

interface CategoriesProps {
  onCategorySelect: (categoryId: string) => void;
}

export const Categories: React.FC<CategoriesProps> = ({ onCategorySelect }) => {
  const [categories, setCategories] = useState(mockCategories);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCounts = async () => {
      try {
    const articles = await api.getArticles();
    const counts: Record<string, number> = {};
    
    // Count articles per category
    articles.forEach((article: any) => {
      const catId = article.categoryId;
      counts[catId] = (counts[catId] || 0) + 1;
    });

    // Update categories with real counts
    const updated = mockCategories.map(cat => ({
      ...cat,
      articleCount: counts[cat.id] || 0
    }));
    
    setCategories(updated);
      } catch (error) {
    console.error('Failed to fetch article counts:', error);
      } finally {
    setIsLoading(false);
      }
    };

    fetchCounts();
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-semibold text-foreground">Article Categories</h2>
        <p className="text-muted-foreground mt-1">Browse support articles by category</p>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((category) => {
          const IconComponent = (LucideIcons as any)[category.icon] || LucideIcons.Folder;
          
          return (
            <Card 
              key={category.id} 
              className="hover:shadow-lg transition-shadow cursor-pointer group"
              onClick={() => onCategorySelect(category.id)}
            >
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                      <IconComponent className="w-6 h-6 text-blue-600" />
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-semibold text-foreground">
                        {category.articleCount}
                      </p>
                      <p className="text-xs text-muted-foreground">Articles</p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-1">
                      {category.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {category.description}
                    </p>
                  </div>

                  <button className="w-full text-sm text-blue-600 hover:text-blue-700 font-medium text-left">
                    Browse Articles →
                  </button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Stats Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Category Statistics</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="py-4 text-center text-muted-foreground">Calculating statistics...</div>
          ) : (
            <div className="space-y-3">
              {categories.map((category) => {
                const IconComponent = (LucideIcons as any)[category.icon] || LucideIcons.Folder;
                const maxArticles = Math.max(...categories.map(c => c.articleCount), 1);
                const percentage = (category.articleCount / maxArticles) * 100;
                
                return (
                  <div key={category.id} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <IconComponent className="w-4 h-4 text-muted-foreground" />
                        <span className="font-medium text-foreground">{category.name}</span>
                      </div>
                      <span className="text-muted-foreground">{category.articleCount} articles</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-800 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full transition-all"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

