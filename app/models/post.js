const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const postSchema = new Schema({
    content: {
        type: String,
        trim: true
    },
    image: {
        type: String,
        default: ''
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    likes: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    comments: [{
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        comment: {
            type: String,
            required: true,
            trim: true
        },
        createdAt: {
            type: Date,
            default: Date.now
        }
    }],
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});



postSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});

module.exports = mongoose.model('Post', postSchema);
