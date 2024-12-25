import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send } from 'lucide-react';
import { useGuideRequests } from '../../../context/RequestsContext';

const ChatBox = ({ request, onClose }) => {
  console.log("In chatbox");
  const [messages, setMessages] = useState([]); // Ensure it's an empty array by default
  const [newMessage, setNewMessage] = useState('');
  const { getChatMessages, sendChatMessage } = useGuideRequests();
  
  // Reference to the chat container to scroll to the bottom
  const chatContainerRef = useRef(null);

  useEffect(() => {
    const fetchMessages = async () => {
      console.log("Fetching chat msgs");
      const chatMessages = await getChatMessages(request._id);
      
      // Check if chatMessages is an array before setting it
      if (Array.isArray(chatMessages)) {
        setMessages(chatMessages);
      } else {
        console.error('Expected an array of messages, but got:', chatMessages);
        setMessages([]); // If the response is not an array, set messages as an empty array
      }
    };
    fetchMessages();
  }, [request._id, getChatMessages]);

  // Automatically scroll to the bottom whenever the messages change
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (newMessage.trim()) {
      const sentMessage = await sendChatMessage(request._id, newMessage);
      setMessages([...messages, sentMessage]); // Add the sent message to the list
      setNewMessage(''); // Clear the input field
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="fixed bottom-4 right-4 w-80 bg-white rounded-lg shadow-lg overflow-hidden"
    >
      <div className="flex justify-between items-center bg-emerald-600 text-white p-3">
        <h3 className="font-semibold">Chat with {request.tourist.name}</h3>
        <button onClick={onClose} className="text-white hover:text-emerald-100">
          <X className="w-5 h-5" />
        </button>
      </div>
      <div
        ref={chatContainerRef}
        className="h-64 overflow-y-auto p-3 space-y-2"
      >
        <AnimatePresence>
          {Array.isArray(messages) && messages.reverse().map((msg, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className={`p-2 rounded-lg ${msg.senderId === request.guide ? 'bg-emerald-100 ml-auto' : 'bg-gray-100'}`}
            >
              {msg.message}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      <form onSubmit={handleSendMessage} className="p-3 border-t">
        <div className="flex items-center">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-grow px-3 py-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
          <button
            type="submit"
            className="bg-emerald-600 text-white px-4 py-2 rounded-r-lg hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default ChatBox;
