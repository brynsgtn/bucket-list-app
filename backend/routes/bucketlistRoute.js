import express from 'express';
import {
    displayBucketlist,
    createBucketlist,
    updateBucketlist,
    deleteBucketlist,
    updateIsChecked
} from '../controllers/bucketlistController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.route('/')
    .get(protect, displayBucketlist)
    .post(protect, createBucketlist);

router.route('/:id')
    .put(protect, updateBucketlist)
    .delete(protect, deleteBucketlist);

router.route('/:id/toggle')
    .put(protect, updateIsChecked);

export default router;