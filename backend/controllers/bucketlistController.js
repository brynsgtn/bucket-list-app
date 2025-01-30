import asyncHandler from "express-async-handler";
import Bucketlist from "../models/bucketlistModel.js";
import User from "../models/userModel.js";

// @desc Display bucket list
// route GET /api/bucketlist
// @access Private
const displayBucketlist = asyncHandler(async (req, res) => {
    const bucketlist = await Bucketlist.find({ user: req.user.id });
    res.status(200).json(bucketlist);
});

// @desc Create bucket list
// route POST /api/bucketlist
// @access Private
const createBucketlist = asyncHandler(async(req, res) => {
    if(!req.body.text) {
        res.status(400);
        throw new Error ("Please add a bucketlist");
    };
    
    const bucket = await Bucketlist.create({
        text: req.body.text,
        user: req.user.id
    });

    res.status(200).json(bucket);
});

// @desc Update bucket list
// route PUT /api/bucketlist/:id
// @access Private
const updateBucketlist = asyncHandler(async(req, res) => {
    const bucket = await Bucketlist.findById(req.params.id);

    if (!bucket) {
        res.status(400);
        throw new Error ('Bucketlist not found');
    }

    const user = await User.findById(req.user.id);

    if (!user) {
        res.status(401);
        throw new Error('User not found');
    };

    if (bucket.user.toString() !== user.id) {
        res.status(401);
        throw new Error('User not authorized');
    };

    const updatedBucket = await Bucketlist.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    });

    res.status(200).json(updatedBucket);
    
});

// @desc Check/uncheck bucketlist
// route PUT /api/bucketlist/:id
// @access Private

const updateIsChecked = asyncHandler(async (req, res) => {
    const bucket = await Bucketlist.findById(req.params.id);

    if (!bucket) {
        res.status(404);
        throw new Error('Bucketlist item not found');
    }

    const user = await User.findById(req.user.id);
    if (!user) {
        res.status(401);
        throw new Error('User not found');
    }

    if (bucket.user.toString() !== user.id) {
        res.status(403);
        throw new Error('User not authorized');
    }

    bucket.isChecked = !bucket.isChecked;

    const updatedBucket = await bucket.save();

    res.status(200).json(updatedBucket);
});

module.exports = { updateIsChecked };


// @desc Delete bucket list
// route DELETE /api/bucketlist/:id
// @access Private
const deleteBucketlist = asyncHandler(async(req, res) => {
    const bucket = await Bucketlist.findById(req.params.id);

    if (!bucket) {
        res.status(400);
        throw new Error ('Bucketlist not found');
    }

    const user = await User.findById(req.user.id);

    if (!user) {
        res.status(401);
        throw new Error('User not found');
    };

    if (bucket.user.toString() !== user.id) {
        res.status(401);
        throw new Error('User not authorized');
    };

    await bucket.deleteOne();
    res.status(200).json({ id: req.params.id });
});

export {
    displayBucketlist,
    createBucketlist,
    updateBucketlist,
    updateIsChecked,
    deleteBucketlist
};