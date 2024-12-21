const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AyudaSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
        tipoDeAyuda: {
            type: String,
        },
        ayuda: {
            type: String,
        },
        dinero: {
            type: Number,
            default: 0
        },
        estado: {
            type: String,
        },
        fecha: {
            type: Date,
            default: Date.now
        }
    },
    { _id: true }
);

const HelpSchema = new Schema(
    {
        Titulo: {
            type: String,
            default: ''
        },
        image: {
            type: String,
            default: null
        },
        esHistoria: {
            type: String,
            default: ''
        },
        nombredelAnimal: {
            type: String,
        },
        ubicacionAnimal: {
            type: String,
        },
        numeroDeContacto: {
            type: Number,
        },
        generoDeLaMascota: {
            type: String,
        }
        ,
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
        ayudasRecibidas: [AyudaSchema],
    },
    { timestamps: true }
);

module.exports = mongoose.model("Helps", HelpSchema);
