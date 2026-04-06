import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { api } from '../data/api';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Eye,
  Star,
  Search,
  FileText
} from 'lucide-react';
import { mockCategories, Article } from '../data/mockData';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';

export const ManageArticles: React.FC = () => {
  const { currentUser } = useAuth();
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingArticle, setEditingArticle] = useState<Article | null>(null);

  // Form state
  const [formData, setFormData] = useState({
    title: '',
    summary: '',
    content: '',
    categoryId: '',
    severity: 'medium' as 'low' | 'medium' | 'high' | 'critical',
    tags: '',
  });

  const fetchArticles = async () => {
    setIsLoading(true);
    try {
      const data = await api.getArticles();
      const mapped = data.map((a: any) => ({
        ...a,
        id: a._id || a.id,
        authorName: a.author?.name || 'Unknown'
      }));
      setArticles(mapped);
    } catch (error) {
      console.error('Failed to fetch articles:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  const filteredArticles = articles.filter(article => {
    const matchesSearch = 
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.summary.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || article.categoryId === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const handleOpenDialog = (article?: Article) => {
    if (article) {
      setEditingArticle(article);
      setFormData({
        title: article.title,
        summary: article.summary,
        content: article.content,
        categoryId: article.categoryId,
        severity: article.severity,
        tags: article.tags.join(', '),
      });
    } else {
      setEditingArticle(null);
      setFormData({
        title: '',
        summary: '',
        content: '',
        categoryId: '',
        severity: 'medium',
        tags: '',
      });
    }
    setIsDialogOpen(true);
  };

  const handleSubmit = async () => {
    try {
      const payload = {
        ...formData,
        tags: formData.tags.split(',').map(t => t.trim()).filter(t => t !== ''),
      };

      if (editingArticle) {
        await api.updateArticle(editingArticle.id, payload);
      } else {
        await api.createArticle(payload);
      }
      fetchArticles();
      setIsDialogOpen(false);
    } catch (error) {
      console.error('Failed to save article:', error);
    }
  };

  const handleDelete = async (id: string) => {
    console.log(`Frontend: Attempting to delete article ${id}`);
    console.log(`Current user role: ${currentUser?.role}`);
    
    if (window.confirm('Are you sure you want to delete this article?')) {
      try {
        await api.deleteArticle(id);
        console.log('Frontend: Delete successful');
        fetchArticles();
      } catch (error: any) {
        console.error('Frontend: Failed to delete article:', error);
        alert(`Failed to delete article: ${error.message}`);
      }
    }
  };

  if (isLoading && articles.length === 0) return <div className="p-8 text-center">Loading articles...</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-foreground">Manage Articles</h2>
          <p className="text-muted-foreground mt-1">Create and update support documentation</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => handleOpenDialog()} className="gap-2">
              <Plus className="w-4 h-4" />
              New Article
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingArticle ? 'Edit Article' : 'Create New Article'}
              </DialogTitle>
              <DialogDescription>
                {editingArticle 
                  ? 'Update the article information below' 
                  : 'Fill in the details to create a new support article'}
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-4">
              <div>
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  placeholder="e.g., How to Fix Computer Won't Turn On"
                />
              </div>

              <div>
                <Label htmlFor="summary">Summary *</Label>
                <Input
                  id="summary"
                  value={formData.summary}
                  onChange={(e) => setFormData({...formData, summary: e.target.value})}
                  placeholder="Brief description of the solution"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="category">Category *</Label>
                  <Select 
                    value={formData.categoryId} 
                    onValueChange={(value) => setFormData({...formData, categoryId: value})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {mockCategories.map(cat => (
                        <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="severity">Severity *</Label>
                  <Select 
                    value={formData.severity} 
                    onValueChange={(value: any) => setFormData({...formData, severity: value})}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="critical">Critical</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="tags">Tags (comma-separated)</Label>
                <Input
                  id="tags"
                  value={formData.tags}
                  onChange={(e) => setFormData({...formData, tags: e.target.value})}
                  placeholder="e.g., power, hardware, boot"
                />
              </div>

              <div>
                <Label htmlFor="content">Content (Markdown supported) *</Label>
                <Textarea
                  id="content"
                  value={formData.content}
                  onChange={(e) => setFormData({...formData, content: e.target.value})}
                  placeholder="Enter the full solution with step-by-step instructions..."
                  rows={12}
                  className="font-mono text-sm"
                />
              </div>

              <div className="flex gap-2 justify-end pt-4">
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button 
                  onClick={handleSubmit}
                  disabled={!formData.title || !formData.summary || !formData.content || !formData.categoryId}
                >
                  {editingArticle ? 'Update Article' : 'Create Article'}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filterCategory} onValueChange={setFilterCategory}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {mockCategories.map(cat => (
                  <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4">
        {filteredArticles.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <FileText className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">No articles found</h3>
              <p className="text-muted-foreground">Try adjusting your search or create a new article</p>
            </CardContent>
          </Card>
        ) : (
          filteredArticles.map((article) => {
            const category = mockCategories.find(c => c.id === article.categoryId);
            
            return (
              <Card key={article.id}>
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 space-y-3">
                      <div className="flex items-start gap-3">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                          article.severity === 'critical' ? 'bg-red-100' :
                          article.severity === 'high' ? 'bg-orange-100' :
                          article.severity === 'medium' ? 'bg-yellow-100' :
                          'bg-blue-100'
                        }`}>
                          <FileText className={`w-5 h-5 ${
                            article.severity === 'critical' ? 'text-red-600' :
                            article.severity === 'high' ? 'text-orange-600' :
                            article.severity === 'medium' ? 'text-yellow-600' :
                            'text-blue-600'
                          }`} />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-foreground">{article.title}</h3>
                          <p className="text-muted-foreground text-sm mt-1">{article.summary}</p>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {category && (
                          <Badge variant="secondary">{category.name}</Badge>
                        )}
                        <Badge 
                          variant="outline"
                          className={
                            article.severity === 'critical' ? 'border-red-500 text-red-700' :
                            article.severity === 'high' ? 'border-orange-500 text-orange-700' :
                            article.severity === 'medium' ? 'border-yellow-500 text-yellow-700' :
                            'border-blue-500 text-blue-700'
                          }
                        >
                          {article.severity}
                        </Badge>
                        {article.tags.map((tag, i) => (
                          <Badge key={i} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Eye className="w-4 h-4" />
                          {article.views || 0}
                        </span>
                        <span className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-current text-yellow-500" />
                          {article.rating || 0}
                        </span>
                        <span>Updated {new Date(article.updatedAt).toLocaleDateString()}</span>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleOpenDialog(article)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      {currentUser?.role === 'admin' && (
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleDelete(article.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
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
  );
};

