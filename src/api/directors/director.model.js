const mongoose = require('mongoose');

const directorSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Debes especificar un nombre para el bloque"],
            unique: true,
        },

        age: {
            type: Number,
        },

        favouriteGenre: {
            type: [String],
            enum : ["action", "comedy", "drama", "fantasy", "horror", "thriller", "sci-fi", "musical", "romance", "western"]
        },

        oscar: {
            type: Number
        }
        
    },
    {
        timestamps: true,
    }
);


const Director = mongoose.model('directors', directorSchema);

module.exports = Director;