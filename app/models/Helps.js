const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const HelpSchema = new Schema(
    {
        Titulo: {
            type: String,
            default: ''
        },
        image: {
            type: String,
            default: ''
        },
        nombredelAnimal: {
            type: String,
        },
        ubicacionAnimal: {
            type: String,
        },
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
        author: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        cantidadAyuda: {
            type: Number,
            default: 0
        },
        tipoAyudaNecesitada: {
            type: String,
            required: true
        },
        ayudasRecibidas: [{

            user: {
                type: Schema.Types.ObjectId,
                ref: 'User',
            },
            ayuda: {
                type: String,
            },
            fecha: {
                type: Date,
                default: Date.now
            }
        }],
        Historial: [{
            titulo: {
                type: String,
                trim: true
            },
            image: {
                type: String,
                default: ''
            },
            comment: {
                type: String,
                trim: true
            },
        }]
    },
    { timestamps: true }
);

module.exports = mongoose.model("Helps", HelpSchema);