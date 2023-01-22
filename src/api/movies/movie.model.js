const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Debes especificar un nombre para el bloque"],
            unique: true,
        },

        genre: {
            type: [String],
            enum : ["action", "comedy", "drama", "fantasy", "horror", "thriller", "sci-fi", "musical", "romance", "western"]
        },

        director: {
            type: mongoose.Types.ObjectId,
            ref: "directors",
        },

        actor: {
            type: mongoose.Types.ObjectId,
            ref: "actors",
        },

        duration: {
            type: Number,
        },

        releaseDate: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);


const Movie = mongoose.model('movies', movieSchema);

module.exports = Movie;