import mongoose from 'mongoose';

const chatMessageSchema = new mongoose.Schema({
  senderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model (guide or tourist)
    required: true,
  },
  receiverId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model (guide or tourist)
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const chatSchema = new mongoose.Schema({
  tourRequestId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'TourRequest', // Reference to the TourRequest model, which connects the chat to a specific request
    required: true,
  },
  guideId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Guide', // Reference to the Guide model
    required: true,
  },
  touristId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model (tourist)
    required: true,
  },
  messages: [chatMessageSchema], // Array of messages in the chat
  lastMessage: {
    type: String,
  },
  lastMessageTimestamp: {
    type: Date,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('Chat', chatSchema);
