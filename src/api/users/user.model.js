const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: [true, 'Debes introducir un email'],
            unique: true,
        },
        
        password: {
            type: String,
            required: [true, 'Debes introducir una contraseña'],
        },

        name: {
            type: String,
        },

        role: {
            type: String,
            default: 'user',
            enum: ['user', 'admin'],
        }
    },
    {
        timestamps: true,
    }
);

const User = mongoose.model('users', userSchema);

module.exports = User;