import express from 'express';
import UsersController from '../../controllers/UsersController';

const router = express.Router();

router.get('/me', UsersController.me);
router.get('/users', UsersController.show);
router.get('/users/:id', UsersController.getUserById);
router.post('/users', UsersController.save);
router.put('/users/:id', UsersController.update);
router.delete('/users/:id', UsersController.remove);

export default router;
