import express from 'express';
import {
    displayBucketlist,
    createBucketlist,
    updateBucketlist,
    deleteBucketlist
};

const router = express.Router();

router.route('/')
    .get(displayBucketlist)
    .post(createBucketlist)

router.route('/bucketlist/:id')
    .put(updateBucketlist)
    .delete(deleteBucketlist)