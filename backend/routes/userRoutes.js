import express from 'express';
import {
    authUser,
    getUserProfile,
    logoutUser,
    registerUser,
    updateUserProfile
} from '../controllers/userControllers';

const router = express.Router();


router.post('/', registerUser);
router.post('/auth', authUser);
router.post('/log', logoutUser);
router.route('/profile')
    .get(getUserProfile)
    .put(updateUserProfile);

export default router;