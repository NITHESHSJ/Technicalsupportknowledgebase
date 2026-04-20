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
  MessageSquare, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  User as UserIcon,
  Search,
  Filter,
  Pencil,
  Trash2,
  MessageCircle,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';

export const TicketManagement: React.FC = () => {
  const { currentUser } = useAuth();
  const [tickets, setTickets] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [editingTicketId, setEditingTicketId] = useState<string | null>(null);
  const [expandedTicketId, setExpandedTicketId] = useState<string | null>(null);
  const [replies, setReplies] = useState<{ [key: string]: any[] }>({});
  const [replyMessage, setReplyMessage] = useState('');
  const [loadingReplies, setLoadingReplies] = useState<{ [key: string]: boolean }>({});

  // Form state for new ticket
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'medium' as 'low' | 'medium' | 'high',
  });

  const fetchTickets = async () => {
    setIsLoading(true);
    try {
      const data = currentUser?.role === 'admin' 
        ? await api.getAllTickets() 
        : await api.getMyTickets();
      setTickets(data);
    } catch (error) {
      console.error('Failed to fetch tickets:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchReplies = async (ticketId: string) => {
    setLoadingReplies(prev => ({ ...prev, [ticketId]: true }));
    try {
      const ticketReplies = await api.getTicketReplies(ticketId);
      setReplies(prev => ({ ...prev, [ticketId]: ticketReplies }));
    } catch (error) {
      console.error('Failed to fetch replies:', error);
    } finally {
      setLoadingReplies(prev => ({ ...prev, [ticketId]: false }));
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  const handleSubmit = async () => {
    try {
      if (editingTicketId) {
        await api.updateTicket(editingTicketId, formData);
        alert('Ticket updated successfully!');
      } else {
        await api.createTicket(formData);
        alert('Ticket submitted successfully!');
      }
      fetchTickets();
      setIsDialogOpen(false);
      setEditingTicketId(null);
      setFormData({ title: '', description: '', priority: 'medium' });
    } catch (error: any) {
      alert(`Failed to ${editingTicketId ? 'update' : 'create'} ticket: ${error.message}`);
    }
  };

  const handleEdit = (ticket: any) => {
    setEditingTicketId(ticket._id);
    setFormData({
      title: ticket.title,
      description: ticket.description,
      priority: ticket.priority
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this ticket?')) return;
    try {
      await api.deleteTicket(id);
      fetchTickets();
      alert('Ticket deleted successfully!');
    } catch (error: any) {
      alert(`Failed to delete ticket: ${error.message}`);
    }
  };

  const handleUpdateStatus = async (id: string, status: string) => {
    try {
      await api.updateTicket(id, { status });
      fetchTickets();
    } catch (error) {
      console.error('Failed to update ticket status:', error);
    }
  };

  const handleExpandTicket = async (ticketId: string) => {
    if (expandedTicketId === ticketId) {
      setExpandedTicketId(null);
    } else {
      setExpandedTicketId(ticketId);
      if (!replies[ticketId]) {
        await fetchReplies(ticketId);
      }
    }
  };

  const handleAddReply = async (ticketId: string) => {
    if (!replyMessage.trim()) {
      alert('Reply message cannot be empty');
      return;
    }
    try {
      await api.addTicketReply(ticketId, replyMessage);
      setReplyMessage('');
      await fetchReplies(ticketId);
      alert('Reply added successfully!');
    } catch (error: any) {
      alert(`Failed to add reply: ${error.message}`);
    }
  };

  const handleDeleteReply = async (replyId: string, ticketId: string) => {
    if (!window.confirm('Are you sure you want to delete this reply?')) return;
    try {
      await api.deleteTicketReply(replyId);
      await fetchReplies(ticketId);
      alert('Reply deleted successfully!');
    } catch (error: any) {
      alert(`Failed to delete reply: ${error.message}`);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'open': return <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100 border-blue-200">Open</Badge>;
      case 'in-progress': return <Badge className="bg-yellow-100 text-yellow-700 hover:bg-yellow-100 border-yellow-200">In Progress</Badge>;
      case 'resolved': return <Badge className="bg-green-100 text-green-700 hover:bg-green-100 border-green-200">Resolved</Badge>;
      default: return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'high': return <Badge className="bg-red-100 text-red-700 hover:bg-red-100 border-red-200">High</Badge>;
      case 'medium': return <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-100 border-orange-200">Medium</Badge>;
      case 'low': return <Badge className="bg-gray-100 text-gray-700 hover:bg-gray-100 border-gray-200">Low</Badge>;
      default: return null;
    }
  };

  const filteredTickets = tickets.filter(t => {
    const matchesSearch = t.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         t.ticketId?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || t.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-foreground">
            {currentUser?.role === 'admin' ? 'Ticket Management' : 'My Support Tickets'}
          </h2>
          <p className="text-muted-foreground mt-1">
            {currentUser?.role === 'admin' 
              ? 'Track and resolve user reported issues' 
              : 'Report problems and track their resolution status'}
          </p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              New Ticket
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingTicketId ? 'Edit Ticket' : 'Report a Problem'}</DialogTitle>
              <DialogDescription>
                {editingTicketId 
                  ? 'Update the details of this support ticket.' 
                  : "Describe the issue you're facing and we'll help you resolve it."}
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="title">Issue Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  placeholder="e.g., Cannot access VPN"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="priority">Priority</Label>
                <Select 
                  value={formData.priority} 
                  onValueChange={(value: any) => setFormData({...formData, priority: value})}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  placeholder="Provide details about the problem..."
                  rows={5}
                />
              </div>

              <div className="flex gap-2 justify-end pt-4">
                <Button variant="outline" onClick={() => {
                  setIsDialogOpen(false);
                  setEditingTicketId(null);
                  setFormData({ title: '', description: '', priority: 'medium' });
                }}>
                  Cancel
                </Button>
                <Button 
                  onClick={handleSubmit}
                  disabled={!formData.title || !formData.description}
                >
                  {editingTicketId ? 'Update Ticket' : 'Submit Ticket'}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search by ID or title..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="open">Open</SelectItem>
            <SelectItem value="in-progress">In Progress</SelectItem>
            <SelectItem value="resolved">Resolved</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {isLoading ? (
        <div className="text-center py-12">Loading tickets...</div>
      ) : filteredTickets.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <MessageSquare className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground">No tickets found</h3>
            <p className="text-muted-foreground">You haven't reported any problems yet.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {filteredTickets.map((ticket) => (
            <div key={ticket._id}>
              <Card className="overflow-hidden">
                <div className="flex flex-col md:flex-row">
                  <div className="flex-1 p-6">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-mono text-muted-foreground">{ticket.ticketId}</span>
                        {getStatusBadge(ticket.status)}
                        {getPriorityBadge(ticket.priority)}
                      </div>
                      {currentUser?.role === 'admin' && (
                        <div className="flex gap-2">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8 text-muted-foreground hover:text-blue-600"
                            onClick={() => handleEdit(ticket)}
                          >
                            <Pencil className="w-4 h-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8 text-muted-foreground hover:text-red-600"
                            onClick={() => handleDelete(ticket._id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      )}
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">{ticket.title}</h3>
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{ticket.description}</p>
                    
                    <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        Created {new Date(ticket.createdAt).toLocaleDateString()}
                      </span>
                      {currentUser?.role === 'admin' && (
                        <span className="flex items-center gap-1">
                          <UserIcon className="w-4 h-4" />
                          From: {ticket.userId?.name || 'Unknown'}
                        </span>
                      )}
                      {ticket.assignedTo && (
                        <span className="flex items-center gap-1">
                          <UserIcon className="w-4 h-4 text-blue-500" />
                          Assigned: {ticket.assignedTo.name}
                        </span>
                      )}
                    </div>
                  </div>

                  {currentUser?.role === 'admin' && (
                    <div className="bg-gray-50 border-t md:border-t-0 md:border-l p-6 w-full md:w-64 flex flex-col gap-3 justify-center">
                      <Label className="text-xs uppercase text-muted-foreground font-bold">Update Status</Label>
                      <div className="flex flex-col gap-2">
                        <Button 
                          size="sm" 
                          variant={ticket.status === 'open' ? 'default' : 'outline'}
                          onClick={() => handleUpdateStatus(ticket._id, 'open')}
                          className="justify-start gap-2"
                        >
                          <AlertCircle className="w-4 h-4" /> Open
                        </Button>
                        <Button 
                          size="sm" 
                          variant={ticket.status === 'in-progress' ? 'default' : 'outline'}
                          onClick={() => handleUpdateStatus(ticket._id, 'in-progress')}
                          className="justify-start gap-2"
                        >
                          <Clock className="w-4 h-4" /> In Progress
                        </Button>
                        <Button 
                          size="sm" 
                          variant={ticket.status === 'resolved' ? 'default' : 'outline'}
                          onClick={() => handleUpdateStatus(ticket._id, 'resolved')}
                          className="justify-start gap-2"
                        >
                          <CheckCircle className="w-4 h-4" /> Resolved
                        </Button>
                      </div>
                    </div>
                  )}
                </div>

                {/* View Replies Button */}
                <div className="border-t px-6 py-3 bg-gray-50">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className="w-full justify-between text-left gap-2"
                    onClick={() => handleExpandTicket(ticket._id)}
                  >
                    <span className="flex items-center gap-2">
                      <MessageCircle className="w-4 h-4" />
                      Responses
                    </span>
                    {expandedTicketId === ticket._id ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </Button>
                </div>
              </Card>

              {/* Replies Section */}
              {expandedTicketId === ticket._id && (
                <Card className="mt-0 rounded-t-none border-t-0">
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-foreground mb-3">Responses ({replies[ticket._id]?.length || 0})</h4>
                        {loadingReplies[ticket._id] ? (
                          <div className="text-sm text-muted-foreground text-center py-4">Loading responses...</div>
                        ) : replies[ticket._id]?.length === 0 ? (
                          <div className="text-sm text-muted-foreground text-center py-4">No responses yet</div>
                        ) : (
                          <div className="space-y-3">
                            {replies[ticket._id]?.map((reply: any) => (
                              <div key={reply._id} className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                                <div className="flex items-start justify-between mb-2">
                                  <div>
                                    <p className="font-medium text-sm text-foreground">{reply.userId?.name || 'Unknown'}</p>
                                    <p className="text-xs text-muted-foreground">
                                      {reply.isAdminReply && <span className="inline-block bg-blue-100 text-blue-700 px-2 py-0.5 rounded mr-2">Admin</span>}
                                      {new Date(reply.createdAt).toLocaleString()}
                                    </p>
                                  </div>
                                  {(currentUser?._id === reply.userId?._id || currentUser?.role === 'admin') && (
                                    <Button 
                                      variant="ghost" 
                                      size="icon" 
                                      className="h-6 w-6 text-muted-foreground hover:text-red-600"
                                      onClick={() => handleDeleteReply(reply._id, ticket._id)}
                                    >
                                      <Trash2 className="w-3 h-3" />
                                    </Button>
                                  )}
                                </div>
                                <p className="text-sm text-foreground">{reply.message}</p>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Add Reply Form */}
                      <div className="border-t pt-4 space-y-2">
                        <Label htmlFor="reply">Add Response</Label>
                        <Textarea
                          id="reply"
                          placeholder="Type your response..."
                          value={replyMessage}
                          onChange={(e) => setReplyMessage(e.target.value)}
                          rows={3}
                        />
                        <Button 
                          size="sm" 
                          onClick={() => handleAddReply(ticket._id)}
                          disabled={!replyMessage.trim()}
                        >
                          Send Response
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};


