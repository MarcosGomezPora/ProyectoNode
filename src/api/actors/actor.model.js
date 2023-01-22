const mongoose = require('mongoose');

const actorSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Debes especificar un nombre para el bloque"],
            unique: true,
        },

        age: {
            type: Number
        },

        oscar: {
            type: Number
        },

        lastProject: {
            type: String
        }

    },
    {
        timestamps: true,
    }
);


const Actor = mongoose.model('actors', actorSchema);

module.exports = Actor;