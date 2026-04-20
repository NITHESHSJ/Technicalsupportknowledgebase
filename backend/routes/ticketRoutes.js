const express = require('express');
const router = express.Router();
const ticketController = require('../controllers/ticketController');
const { protect, authorize } = require('../middleware/auth');

// Create a ticket (Any authenticated user)
router.post('/', protect, ticketController.createTicket);

// Get my own tickets (Any authenticated user)
router.get('/my', protect, ticketController.getMyTickets);

// Get all tickets (Admin only)
router.get('/', protect, authorize('admin'), ticketController.getTickets);

// Update a ticket (Admin only)
router.put('/:id', protect, authorize('admin'), ticketController.updateTicket);

// Delete a ticket (Admin only)
router.delete('/:id', protect, authorize('admin'), ticketController.deleteTicket);

// Ticket Replies
// Add reply to a ticket
router.post('/:ticketId/replies', protect, ticketController.addReply);

// Get replies for a ticket
router.get('/:ticketId/replies', protect, ticketController.getTicketReplies);

// Delete a reply
router.delete('/replies/:replyId', protect, ticketController.deleteReply);

module.exports = router;
