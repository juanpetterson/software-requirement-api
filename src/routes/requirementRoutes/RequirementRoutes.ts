import express from 'express';
import RequirementController from '../../controllers/RequirementController';

const router = express.Router();

router.get('/requirements', RequirementController.show);
router.get('/requirements/find', RequirementController.find);
router.post('/requirements', RequirementController.save);
router.put('/requirements/:id', RequirementController.update);
router.delete('/requirements/:id', RequirementController.remove);

export default router;
