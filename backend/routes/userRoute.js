import express from 'express';
import {
    authUser,
    getUserProfile,
    logoutUser,
    registerUser,
    updateUserProfile,
    deleteUserProfile,
    getAllUser
} from '../controllers/userController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();


router.route('/')
    .post(registerUser)
    .get(protect, getAllUser);
router.post('/auth', authUser);
router.post('/logout', logoutUser);
router.delete('/:id', protect, deleteUserProfile);
router.route('/profile')
    .get(protect, getUserProfile)
    .put(protect, updateUserProfile);

export default router;