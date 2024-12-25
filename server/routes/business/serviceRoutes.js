import express from 'express';
import { getServices, addService, updateService, deleteService, getBusinessType } from '../../controllers/business/serviceController.js';
import auth from '../../middleware/auth.js';

const router = express.Router();

router.get('/', auth, getServices);
router.post('/', auth, addService);
router.put('/:id', auth, updateService);
router.delete('/:id', auth, deleteService);
router.get('/business-type', auth, getBusinessType);

export default router;

