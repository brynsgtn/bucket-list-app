import mongoose from "mongoose";

const bucketlistSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        },
        text: {
            type: String,
            required: true
        },
        isChecked: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true,
    }
);

const Bucketlist = mongoose.model('Bucketlist', bucketlistSchema);

export default Bucketlist;