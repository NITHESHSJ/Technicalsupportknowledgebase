import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { 
  Search as SearchIcon, 
  Star, 
  Eye, 
  Clock,
  Filter,
  X
} from 'lucide-react';
import { api } from '../data/api';
import { Article, Category, mockCategories } from '../data/mockData';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';

interface SearchArticlesProps {
  onArticleSelect: (articleId: string) => void;
  initialCategory?: string;
}

export const SearchArticles: React.FC<SearchArticlesProps> = ({ 
  onArticleSelect, 
  initialCategory = 'all' 
}) => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedSeverity, setSelectedSeverity] = useState('all');
  const [sortBy, setSortBy] = useState('relevance');

  useEffect(() => {
    setSelectedCategory(initialCategory);
  }, [initialCategory]);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const data = await api.getArticles();
        // Map _id to id for consistency
        const mappedData = data.map((a: any) => ({
          ...a,
          id: a._id || a.id
        }));
        setArticles(mappedData);
      } catch (error) {
        console.error('Failed to fetch articles:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchArticles();
  }, []);

  const filteredArticles = articles.filter(article => {
    const matchesSearch = 
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'all' || article.categoryId === selectedCategory;
    const matchesSeverity = selectedSeverity === 'all' || article.severity === selectedSeverity;

    return matchesSearch && matchesCategory && matchesSeverity;
  }).sort((a, b) => {
    if (sortBy === 'rating') return (b.rating || 0) - (a.rating || 0);
    if (sortBy === 'views') return (b.views || 0) - (a.views || 0);
    if (sortBy === 'recent') return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
    return 0;
  });

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('all');
    setSelectedSeverity('all');
    setSortBy('relevance');
  };

  const hasActiveFilters = selectedCategory !== 'all' || selectedSeverity !== 'all' || searchTerm !== '';

  if (isLoading) return <div className="p-8 text-center">Loading articles...</div>;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-semibold text-foreground">Search Knowledge Base</h2>
          <p className="text-muted-foreground mt-1">Find solutions to technical issues quickly</p>
        </div>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="pt-6 space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              placeholder="Search for solutions, error codes, or keywords..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-10"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-muted-foreground"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-3">
            <div className="flex-1 min-w-[150px]">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {mockCategories.map(cat => (
                    <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex-1 min-w-[150px]">
              <Select value={selectedSeverity} onValueChange={setSelectedSeverity}>
                <SelectTrigger>
                  <SelectValue placeholder="Severity" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Severities</SelectItem>
                  <SelectItem value="critical">Critical</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex-1 min-w-[150px]">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger>
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="relevance">Relevance</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="views">Most Viewed</SelectItem>
                  <SelectItem value="recent">Recently Updated</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {hasActiveFilters && (
              <Button variant="outline" onClick={clearFilters}>
                <X className="w-4 h-4 mr-2" />
                Clear Filters
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-muted-foreground">
            Found {filteredArticles.length} {filteredArticles.length === 1 ? 'article' : 'articles'}
          </p>
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-muted-foreground">Showing filtered results</span>
          </div>
        </div>

        <div className="space-y-4">
          {filteredArticles.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <SearchIcon className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-foreground mb-2">No articles found</h3>
                <p className="text-muted-foreground mb-4">Try adjusting your search terms or filters</p>
              </CardContent>
            </Card>
          ) : (
            filteredArticles.map((article) => {
              const category = mockCategories.find(cat => cat.id === article.categoryId);
              
              return (
                <Card 
                  key={article.id}
                  className="hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => onArticleSelect(article.id)}
                >
                  <CardContent className="pt-6">
                    <div className="space-y-3">
                      <div className="flex items-start justify-between gap-4">
                        <h3 className="text-lg font-semibold text-foreground flex-1">
                          {article.title}
                        </h3>
                        <Badge 
                          variant="outline"
                          className={
                            article.severity === 'critical' ? 'border-red-500 text-red-700 bg-red-50' :
                            article.severity === 'high' ? 'border-orange-500 text-orange-700 bg-orange-50' :
                            article.severity === 'medium' ? 'border-yellow-500 text-yellow-700 bg-yellow-50' :
                            'border-blue-500 text-blue-700 bg-blue-50'
                          }
                        >
                          {article.severity}
                        </Badge>
                      </div>
                      <p className="text-muted-foreground">{article.summary}</p>
                      <div className="flex flex-wrap gap-2">
                        {article.tags.map((tag, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground pt-2 border-t">
                        <span className="flex items-center gap-1">
                          <Eye className="w-4 h-4" />
                          {article.views || 0} views
                        </span>
                        <span className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-current text-yellow-500" />
                          {article.rating || 0} ({article.feedbackCount || 0} reviews)
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          Updated {new Date(article.updatedAt).toLocaleDateString()}
                        </span>
                        {category && (
                          <Badge variant="outline" className="ml-auto">
                            {category.name}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

