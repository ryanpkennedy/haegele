const mongoose = require('mongoose');
const config = require('config');
const maxPlayers = config.get('maxPlayers');

const UserSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        room: {
            type: String,
            required: true,
        },
        date: {
            type: Date,
            default: Date.now,
        },
    },
    {
        capped: {
            size: 10000,
            max: maxPlayers,
        },
    }
);

module.exports = User = mongoose.model('user', UserSchema);
