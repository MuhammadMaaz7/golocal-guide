import Request from '../../models/guide/requests.js';
import Guide from '../../models/guide/guideModel.js';

export const createGuideRequest = async (req, res) => {
  try {
    // 1. Check if guide exists
    const guide = await Guide.findById(req.body.guide);
    if (!guide) {
      return res.status(404).json({ message: 'Guide not found' });
    }

    // 2. Create request
    const request = await Request.create({
      ...req.body,
      tourist: req.user._id, // Get tourist ID from authenticated user
      status: 'pending'
    });

    // 3. Populate guide and tourist information
    const populatedRequest = await Request.findById(request._id)
      .populate('guide', 'name email phone')
      .populate('tourist', 'name email');

    res.status(201).json({
      status: 'success',
      data: {
        request: populatedRequest
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Error creating guide request', error: error.message });
  }
};

export const getGuideRequests = async (req, res) => {
  try {
    const requests = await Request.find({ tourist: req.user._id })
      .populate('guide', 'name email phone')
      .populate('tourist', 'name email')
      .sort('-createdAt');

    res.status(200).json({
      status: 'success',
      results: requests.length,
      data: {
        requests
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching guide requests', error: error.message });
  }
};

export const updateGuideRequest = async (req, res) => {
  try {
    const request = await Request.findOneAndUpdate(
      { 
        _id: req.params.id,
        tourist: req.user._id // Ensure the request belongs to the authenticated user
      },
      { status: req.body.status },
      { 
        new: true,
        runValidators: true
      }
    ).populate('guide tourist');

    if (!request) {
      return res.status(404).json({ message: 'No request found with that ID' });
    }

    res.status(200).json({
      status: 'success',
      data: {
        request
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Error updating guide request', error: error.message });
  }
};
