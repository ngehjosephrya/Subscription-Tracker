import mongoose from "mongoose";    

const blacklistToken = new mongoose.Schema({
    token: {
        type: String,
        required: true,
        unique: true
    },
    expiresAt: {
        type: Date,
        required: true,
        expires: 0
    }
})

const BlacklistToken = new mongoose.model('BlacklistToken', blacklistToken)

export default BlacklistToken