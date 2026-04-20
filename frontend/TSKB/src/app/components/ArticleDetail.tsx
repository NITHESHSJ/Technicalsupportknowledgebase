import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Textarea } from './ui/textarea';
import { 
  ArrowLeft,
  Star,
  Eye,
  MessageSquare,
  Clock,
  User,
  ThumbsUp,
  ThumbsDown,
  Send
} from 'lucide-react';
import { api } from '../data/api';
import { useAuth } from '../context/AuthContext';
import ReactMarkdown from 'react-markdown';
import { Article } from '../data/mockData';

interface ArticleDetailProps {
  articleId: string;
  onBack: () => void;
}

export const ArticleDetail: React.FC<ArticleDetailProps> = ({ articleId, onBack }) => {
  const { currentUser } = useAuth();
  const [article, setArticle] = useState<Article | null>(null);
  const [category, setCategory] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [newRating, setNewRating] = useState(0);
  const [newComment, setNewComment] = useState('');
  const [helpful, setHelpful] = useState<boolean | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const data = await api.getArticle(articleId);
        // Map backend author.name to frontend authorName
        const articleWithMappedAuthor = {
          ...data,
          id: data._id,
          authorName: data.author?.name || 'Unknown'
        };
        setArticle(articleWithMappedAuthor);

        // Fetch category if categoryId exists
        if (data.categoryId) {
          try {
            const categoryData = await api.getCategory(data.categoryId);
            setCategory(categoryData);
          } catch (err) {
            console.warn('Could not fetch category details:', err);
          }
        }
      } catch (error) {
        console.error('Failed to fetch article:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchArticle();
  }, [articleId]);

  const handleSubmitFeedback = async () => {
    setIsSubmitting(true);
    try {
      await api.addFeedback(articleId, { rating: newRating, comment: newComment, helpful });
      // Refresh article to show updated rating/feedback count
      const updatedData = await api.getArticle(articleId);
      setArticle({
        ...updatedData,
        id: updatedData._id,
        authorName: updatedData.author?.name || 'Unknown'
      });
      setNewRating(0);
      setNewComment('');
      setHelpful(null);
    } catch (error) {
      console.error('Failed to submit feedback:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) return <div className="p-8 text-center">Loading article...</div>;

  if (!article) {
    return (
      <Card>
        <CardContent className="py-12 text-center">
          <p className="text-muted-foreground">Article not found</p>
          <Button onClick={onBack} className="mt-4">Go Back</Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <Button variant="ghost" onClick={onBack} className="gap-2">
        <ArrowLeft className="w-4 h-4" />
        Back to Search
      </Button>

      {/* Article Header */}
      <Card>
        <CardHeader>
          <div className="space-y-4">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <h1 className="text-3xl font-semibold text-foreground">{article.title}</h1>
                <p className="text-muted-foreground mt-2">{article.summary}</p>
              </div>
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

            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <User className="w-4 h-4" />
                {article.authorName}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                Updated {new Date(article.updatedAt).toLocaleDateString()}
              </span>
              <span className="flex items-center gap-1">
                <Eye className="w-4 h-4" />
                {article.views || 0} views
              </span>
              <span className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-current text-yellow-500" />
                {article.rating || 0} ({article.feedbackCount || 0} reviews)
              </span>
              {category && (
                <Badge variant="secondary">{category.name}</Badge>
              )}
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {article.tags.map((tag, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Article Content */}
      <Card>
        <CardHeader>
          <CardTitle>Solution</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="prose prose-sm max-w-none">
            <ReactMarkdown>{article.content}</ReactMarkdown>
          </div>
        </CardContent>
      </Card>

      {/* was this helpful / Rate & Review combined for brevity if needed, but keeping original structure */}
      <Card>
        <CardHeader>
          <CardTitle>Was this article helpful?</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-3">
            <Button
              variant={helpful === true ? "default" : "outline"}
              onClick={() => setHelpful(true)}
              className="gap-2"
            >
              <ThumbsUp className="w-4 h-4" />
              Yes, it helped
            </Button>
            <Button
              variant={helpful === false ? "default" : "outline"}
              onClick={() => setHelpful(false)}
              className="gap-2"
            >
              <ThumbsDown className="w-4 h-4" />
              No, it didn't help
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Add Feedback */}
      <Card>
        <CardHeader>
          <CardTitle>Rate & Review</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">Your Rating</label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setNewRating(star)}
                  className="focus:outline-none"
                >
                  <Star 
                    className={`w-8 h-8 transition-colors ${
                      star <= newRating 
                        ? 'fill-yellow-400 text-yellow-400' 
                        : 'text-gray-300'
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">
              Your Feedback (optional)
            </label>
            <Textarea
              placeholder="Share your experience or suggest improvements..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              rows={4}
            />
          </div>

          <Button 
            onClick={handleSubmitFeedback}
            disabled={newRating === 0 || isSubmitting}
            className="gap-2"
          >
            <Send className="w-4 h-4" />
            {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

