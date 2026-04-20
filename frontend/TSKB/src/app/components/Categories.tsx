import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { api } from '../data/api';
import * as LucideIcons from 'lucide-react';

interface CategoriesProps {
  onCategorySelect: (categoryId: string) => void;
}

export const Categories: React.FC<CategoriesProps> = ({ onCategorySelect }) => {
  const [categories, setCategories] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await api.getCategories();
        setCategories(data);
      } catch (error) {
        console.error('Failed to fetch categories:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (isLoading) {
    return <div className="p-8 text-center">Loading categories...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-semibold text-foreground">Article Categories</h2>
        <p className="text-muted-foreground mt-1">Browse support articles by category</p>
      </div>

      {/* Categories Grid */}
      {categories.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">No categories available yet</p>
          </CardContent>
        </Card>
      ) : (
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
      )}

      {/* Stats Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Category Statistics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Total Categories</span>
              <span className="font-semibold">{categories.length}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Total Articles</span>
              <span className="font-semibold">
                {categories.reduce((sum, cat) => sum + (cat.articleCount || 0), 0)}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

