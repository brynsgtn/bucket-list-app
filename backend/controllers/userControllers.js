

// @desc Auth user/set token
// route POST /api/users/auth
// @access Public
const authUser = (rew, res) => {
    res.status(200).json({ message: 'Auth User' })
};

// @desc Register user
// route POST /api/users
// @access Public
const registerUser = (rew, res) => {
    res.status(200).json({ message: 'Register User' })
};

// @desc Logout user
// route POST /api/users/logout
// @access Public
const logoutUser = (rew, res) => {
    res.status(200).json({ message: 'Logout User' })
};

// @desc Get user profile
// route GET /api/users/profile
// @access Private
const getUserProfile = (rew, res) => {
    res.status(200).json({ message: 'Get User Profile' })
};

// @desc Uodate user profile
// route PUT /api/users/profile
// @access Private
const updateUserProfile = (rew, res) => {
    res.status(200).json({ message: 'Update User Profile' })
};


export {
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile
};