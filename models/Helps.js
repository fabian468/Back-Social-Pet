const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const HelpSchema = new Schema(
    {
        Titulo: {
            type: String,
            default: ''
        },
        video: {
            type: String,
            default: ''
        },
        Comment: {
            type: String
        },
        author: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        cantidadAyuda: {
            type: Number,
            default: 0
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Helps", HelpSchema);
