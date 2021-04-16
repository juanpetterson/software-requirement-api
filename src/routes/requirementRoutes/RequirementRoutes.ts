import express from 'express';
import RequirementController from '../../controllers/RequirementController';

const router = express.Router();

router.get('/requirements/:id', RequirementController.getRequirementById);
router.get('/requirements', RequirementController.show);
router.post('/requirements', RequirementController.save);
router.put('/requirements/:id', RequirementController.update);
router.delete('/requirements/:id', RequirementController.remove);

export default router;
