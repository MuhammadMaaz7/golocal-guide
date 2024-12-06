import React, { useState } from 'react';

const ChatBox = ({ user }) => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');

  const handleSendMessage = () => {
    if (message.trim()) {
      setMessages([...messages, { text: message, sender: 'Guide' }]);
      setMessage('');
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mt-8">
      <h3 className="text-xl font-semibold text-blue-800 mb-4">Chat with {user}</h3>

      <div className="h-64 overflow-auto border p-4 bg-gray-50 rounded-md mb-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`text-sm ${msg.sender === 'Guide' ? 'text-blue-600' : 'text-gray-600'} mb-2`}
          >
            <strong>{msg.sender}: </strong>{msg.text}
          </div>
        ))}
      </div>

      <div className="flex items-center">
        <input
          type="text"
          className="w-full p-2 border rounded-md"
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          onClick={handleSendMessage}
          className="ml-2 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatBox;
