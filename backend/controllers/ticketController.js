const Ticket = require('../models/Ticket');
const User = require('../models/User');

// Create a new ticket
exports.createTicket = async (req, res) => {
  try {
    console.log('Backend: Creating ticket with body:', req.body);
    console.log('Backend: User from request:', req.user?._id);
    
    if (!req.user) {
      return res.status(401).json({ message: 'User not authenticated in request' });
    }

    const ticket = await Ticket.create({
      ...req.body,
      userId: req.user._id
    });
    console.log('Backend: Ticket created successfully:', ticket.ticketId);
    res.status(201).json(ticket);
  } catch (error) {
    console.error('Backend: Error creating ticket:', error);
    res.status(400).json({ message: error.message });
  }
};

// Get all tickets (Admin only)
exports.getTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find()
      .populate('userId', 'name email')
      .populate('assignedTo', 'name email')
      .sort({ createdAt: -1 });
    res.status(200).json(tickets);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get user's own tickets
exports.getMyTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find({ userId: req.user._id })
      .sort({ createdAt: -1 });
    res.status(200).json(tickets);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update ticket (Admin only for assignment/status)
exports.updateTicket = async (req, res) => {
  try {
    const ticket = await Ticket.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedAt: Date.now() },
      { new: true }
    ).populate('userId', 'name email').populate('assignedTo', 'name email');
    
    if (!ticket) return res.status(404).json({ message: 'Ticket not found' });
    res.status(200).json(ticket);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete ticket (Admin only)
exports.deleteTicket = async (req, res) => {
  try {
    const ticket = await Ticket.findByIdAndDelete(req.params.id);
    if (!ticket) return res.status(404).json({ message: 'Ticket not found' });
    res.status(200).json({ message: 'Ticket deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
