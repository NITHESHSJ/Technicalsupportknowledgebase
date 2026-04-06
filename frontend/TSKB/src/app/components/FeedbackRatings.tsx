import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Star, ThumbsUp, MessageSquare, TrendingUp } from 'lucide-react';
import { mockFeedback, mockArticles } from '../data/mockData';

export const FeedbackRatings: React.FC = () => {
  // Calculate statistics
  const avgRating = mockFeedback.reduce((sum, f) => sum + f.rating, 0) / mockFeedback.length;
  const helpfulCount = mockFeedback.filter(f => f.helpful).length;
  const ratingDistribution = [5, 4, 3, 2, 1].map(rating => ({
    rating,
    count: mockFeedback.filter(f => f.rating === rating).length,
  }));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-semibold text-foreground">Feedback & Ratings</h2>
        <p className="text-muted-foreground mt-1">Monitor user feedback and solution effectiveness</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Average Rating</p>
                <p className="text-3xl font-semibold text-foreground mt-1">
                  {avgRating.toFixed(1)}
                </p>
                <div className="flex items-center gap-1 mt-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-4 h-4 ${
                        star <= Math.round(avgRating)
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Star className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Feedback</p>
                <p className="text-3xl font-semibold text-foreground mt-1">
                  {mockFeedback.length}
                </p>
                <p className="text-xs text-green-600 mt-2 flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  +12% this week
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <MessageSquare className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Marked Helpful</p>
                <p className="text-3xl font-semibold text-foreground mt-1">
                  {helpfulCount}
                </p>
                <p className="text-xs text-muted-foreground mt-2">
                  {((helpfulCount / mockFeedback.length) * 100).toFixed(0)}% of total
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <ThumbsUp className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Rating Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Rating Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {ratingDistribution.map((item) => {
                const total = mockFeedback.length;
                const percentage = total > 0 ? (item.count / total) * 100 : 0;
                
                return (
                  <div key={item.rating} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <span className="w-8 text-muted-foreground">{item.rating}</span>
                        <Star className="w-4 h-4 fill-current text-yellow-500" />
                      </div>
                      <span className="text-muted-foreground">{item.count} reviews</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-yellow-500 h-2 rounded-full transition-all"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Top Rated Articles */}
        <Card>
          <CardHeader>
            <CardTitle>Top Rated Articles</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {mockArticles
                .sort((a, b) => b.rating - a.rating)
                .slice(0, 5)
                .map((article, index) => (
                  <div 
                    key={article.id}
                    className="flex items-start gap-3 p-3 rounded-lg border border-gray-200 hover:border-blue-500 hover:bg-blue-50 transition-colors cursor-pointer"
                  >
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-semibold ${
                      index === 0 ? 'bg-yellow-100 text-yellow-700' :
                      index === 1 ? 'bg-gray-100 text-gray-700' :
                      index === 2 ? 'bg-orange-100 text-orange-700' :
                      'bg-gray-50 text-muted-foreground'
                    }`}>
                      {index + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-foreground text-sm truncate">
                        {article.title}
                      </h4>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="flex items-center gap-1">
                          <Star className="w-3 h-3 fill-current text-yellow-500" />
                          <span className="text-xs text-muted-foreground">{article.rating}</span>
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {article.feedbackCount} reviews
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Feedback */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Feedback</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockFeedback.map((feedback) => {
              const article = mockArticles.find(a => a.id === feedback.articleId);
              
              return (
                <div 
                  key={feedback.id}
                  className="border-b border-gray-200 pb-4 last:border-0"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <p className="font-medium text-foreground">{feedback.userName}</p>
                        <div className="flex">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`w-3 h-3 ${
                                star <= feedback.rating
                                  ? 'fill-yellow-400 text-yellow-400'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        On: {article?.title || 'Unknown Article'}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      {feedback.helpful && (
                        <Badge variant="secondary" className="gap-1">
                          <ThumbsUp className="w-3 h-3" />
                          Helpful
                        </Badge>
                      )}
                      <span className="text-xs text-muted-foreground">{feedback.createdAt}</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-700">{feedback.comment}</p>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

