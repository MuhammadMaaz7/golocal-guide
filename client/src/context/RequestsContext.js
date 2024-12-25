import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const GuideRequestsContext = createContext();

export const useGuideRequests = () => useContext(GuideRequestsContext);

export const GuideRequestsProvider = ({ children }) => {
  const [requests, setRequests] = useState([]);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchRequests = async () => {
    console.log("In teh context fetching requests");
    try {
      const token = localStorage.getItem('token'); // Adjust key name as needed
    console.log("Got token");
      //setLoading(true);
      console.log("Context before loading");
      const response = await axios.get('http://localhost:5000/api/guide/requests', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`, // Ensure this is the correct token format
        },
      });      
      console.log("Fetched repsonse is: ",response);
      setRequests(response.data.requests);
      setStats(response.data.stats);
      setError(null);
    } catch (err) {
      setError('Failed to fetch guide requests');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const updateRequestStatus = async (requestId, status) => {
    try {
      console.log("In update context for requests");
  
      const token = localStorage.getItem('token');
      console.log("TOKEN: ", token);
      if (!token) {
        throw new Error('No token found in local storage. User might not be logged in.');
      }
  
      // Correct axios.put call with headers as a separate argument
      const response = await axios.put(
        `http://localhost:5000/api/guide/requests/${requestId}/status`, // URL
        { status }, // Payload (data to send)
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        } // Config, including headers
      );
  
      console.log("Successfully updated request");
  
      // Update the state with the new status
      setRequests(prevRequests =>
        prevRequests.map(req =>
          req._id === requestId ? { ...req, status: response.data.status } : req
        )
      );
  
      return response.data;
    } catch (err) {
      console.error('Failed to update request status:', err);
      setError('Failed to update request status');
      throw err;
    }
  };
  
  const getChatMessages = async (requestId) => {
    try {
      console.log("Fetching chat messages in context");
  
      const token = localStorage.getItem('token'); // Adjust key name as needed
      if (!token) {
        throw new Error('No token found in local storage. User might not be logged in.');
      }
  
      const response = await axios.get(`http://localhost:5000/api/guide/requests/${requestId}/chat`, {
        headers: {
          Authorization: `Bearer ${token}`, // Ensure this is the correct token format
        },
      });
  
      console.log("Chat messages fetched successfully");
      return response.data;
    } catch (err) {
      console.error('Error fetching chat messages:', err);
      setError('Failed to fetch chat messages'); // Ensure setError is defined
      throw err; // Rethrow to handle further up if needed
    }
  };
  
const sendChatMessage = async (requestId, message) => {
  console.log("In send messages context");
  try {
    const token = localStorage.getItem('token'); // Adjust key name as needed
    if (!token) {
      throw new Error('No token found in local storage. User might not be logged in.');
    }

    const response = await axios.post(
      `http://localhost:5000/api/guide/requests/${requestId}/chat`,
      { message }, // Payload
      { // Headers
        headers: {
          Authorization: `Bearer ${token}`, // Ensure this is the correct token format
        },
      }
    );

    return response.data;
  } catch (err) {
    console.error(err);  // Log the actual error for debugging
    setError('Failed to send chat message');
    throw err;
  }
};


  const value = {
    requests,
    stats,
    loading,
    error,
    fetchRequests,
    updateRequestStatus,
    getChatMessages,
    sendChatMessage,
  };

  return (
    <GuideRequestsContext.Provider value={value}>
      {children}
    </GuideRequestsContext.Provider>
  );
};
