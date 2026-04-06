const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
  ticketId: { type: String, unique: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  status: { type: String, enum: ['open', 'in-progress', 'resolved'], default: 'open' },
  priority: { type: String, enum: ['low', 'medium', 'high'], default: 'medium' },
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  adminNotes: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Generate a ticket ID before saving
ticketSchema.pre('save', async function() {
  if (this.isNew && !this.ticketId) {
    let unique = false;
    while (!unique) {
      // Generate a random ticket ID like TKT-1234
      const randomNum = Math.floor(1000 + Math.random() * 9000);
      const potentialId = `TKT-${randomNum}`;
      
      // Check if it already exists
      const existing = await this.constructor.findOne({ ticketId: potentialId });
      if (!existing) {
        this.ticketId = potentialId;
        unique = true;
      }
    }
  }
  this.updatedAt = Date.now();
});

module.exports = mongoose.model('Ticket', ticketSchema);
