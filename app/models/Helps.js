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
        nombredelAnimal: {
            type: String,
            required: true
        },
        ubicacionAnimal: {
            type: String,
            required: true
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
        },
        ayudasRecibidas: [{
            //puede ser anonimo
            user: {
                type: Schema.Types.ObjectId,
                ref: 'User',
            },
            ayuda: {
                type: String,
                required: true
            },
            fecha: {
                type: Date,
                default: Date.now
            }
        }]
    },
    { timestamps: true }
);

module.exports = mongoose.model("Helps", HelpSchema);
