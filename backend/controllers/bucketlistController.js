

// @desc Display bucket list
// route GET /api/bucketlist
// @access Private
const displayBucketlist = (req, res) => {
    res.send({ message: "Display bucket list"});
};

// @desc Create bucket list
// route POST /api/bucketlist
// @access Private
const createBucketlist = (req, res) => {
    res.send({ message: "Create bucket list"});
};

// @desc Update bucket list
// route PUT /api/bucketlist/:id
// @access Private
const updateBucketlist = (req, res) => {
    res.send({ message: "Update bucket list"});
};

// @desc Delete bucket list
// route DELETE /api/bucketlist/:id
// @access Private
const deleteBucketlist = (req, res) => {
    res.send({ message: "Delete bucket list"});
};