import express from 'express';
const router = express.Router();
import { saveBusinessDetails,
    saveContactInformation,
    saveLocationDetails,
    saveMediaUpload,
    savePaymentMethods,
    savePolicies,
    saveSocialMedia,
    completeSetup } from '../../controllers/business/businessSetupController.js';
import auth from '../../middleware/auth.js';

router.post('/business-details', auth, saveBusinessDetails);
router.post('/contact-information', auth, saveContactInformation);
router.post('/location-details', auth, saveLocationDetails);
router.post('/media-upload', auth, saveMediaUpload);
router.post('/payment-methods', auth, savePaymentMethods);
router.post('/policies', auth, savePolicies);
router.post('/social-media', auth, saveSocialMedia);
router.post('/complete-setup', auth, completeSetup);

export default router;

