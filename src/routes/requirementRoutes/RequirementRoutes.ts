import express from 'express';
import RequirementController from '../../controllers/RequirementController';

const router = express.Router();

router.post('/requirement', RequirementController.save);

export default router;
