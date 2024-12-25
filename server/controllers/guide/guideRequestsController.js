import Request from '../../models/guide/requests.js';
import User from '../../models/tourist/User.js';
import Guide from '../../models/guide/guideModel.js';
import Chat from  '../../models/guide/guideChatModel.js';
// Get all tour requests for a guide
export const getGuideRequests = async (req, res) => {
  console.log("In the controller");
  try {
    const guideId = req.user.id; // Assuming the guide's ID is stored in req.user after authentication
    console.log("guideId: ", guideId);

    // Fetch requests where the guide matches the guideId
    //const requests = await Request.find({ guide: req.user.id }).sort({ createdAt: -1 });
    const requests = await Request.find().sort({ createdAt: -1 });

    // Calculate statistics based on the status of the requests
    const stats = {
      total: requests.length,
      pending: requests.filter(r => r.status === 'pending').length,
      confirmed: requests.filter(r => r.status === 'confirmed').length,
      cancelled: requests.filter(r => r.status === 'cancelled').length,
    };
    const guide = await Guide.findOne({ _id: req.user.id});
    console.log("Requests: ", requests);
    console.log("Stats: ", stats);

    // Respond with the filtered requests and stats
    res.json({ requests, stats });
  } catch (error) {
    console.error("Error fetching tour requests:", error);
    res.status(500).json({ message: 'Error fetching tour requests', error: error.message });
  }
};


// Update tour request status
export const updateGuideRequestStatus = async (req, res) => {
  try {
    const { requestId } = req.params;
    const { status } = req.body;
    const guideId = req.user.id;
    console.log("Updating status in Controller");
    // const request = await Request.findOneAndUpdate(
    //   { _id: requestId , guide: req.user.id },
    //   { status },
    //   { new: true }
    // );

     const request = await Request.findOneAndUpdate(
      { _id: requestId},
      { status },
      { new: true }
    );

    if (!request) {
      return res.status(404).json({ message: 'Tour request not found' });
    }

    res.json(request);
  } catch (error) {
    res.status(500).json({ message: 'Error updating tour request', error: error.message });
  }
};

// Get chat messages for a tour request
export const getChatMessages = async (req, res) => {

  console.log("Getting chat msgs from controller");
  try {
    const { requestId } = req.params;
    const guideId = req.user.id;

    const chat = await Chat.findOne();
console.log("chat: ",chat);

    
    res.json(chat);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching chat messages', error: error.message });
  }
};

// Send a chat message
export const sendChatMessage = async (req, res) => {
  console.log("sendmessages on controller");
  try {
    const { requestId } = req.params;
    const { message } = req.body;
    const senderId = req.user.id;

    const chat = await Chat.findOneAndUpdate(
      { tourRequestId: requestId },
      { 
        $push: { messages: { senderId, message } },
        lastMessage: message,
        lastMessageTimestamp: Date.now()
      },
      { new: true, upsert: true }
    );
    console.log("Added chat");
    res.json(chat.messages[chat.messages.length - 1]);
  } catch (error) {
    res.status(500).json({ message: 'Error sending chat message', error: error.message });
  }
};

