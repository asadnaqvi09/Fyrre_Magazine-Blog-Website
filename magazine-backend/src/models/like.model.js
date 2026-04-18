import mongoose from "mongoose";

const LikeSchema = new mongoose.Schema({
    blogId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Blog'
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    likesCount: {
        type: Number,
        default: 0,
        min: 0
    }
}, {timestamps: true});

const Like = mongoose.model('Like', LikeSchema);
export default Like;