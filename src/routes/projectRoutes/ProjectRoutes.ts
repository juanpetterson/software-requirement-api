import express from 'express';
import ProjectController from '../../controllers/ProjectController';

const router = express.Router();

router.get('/projects', ProjectController.show);
router.get('/projects/:id', ProjectController.find);
router.post('/projects', ProjectController.save);
router.put('/projects/:id', ProjectController.update);
router.delete('/projects/:id', ProjectController.remove);

export default router;
