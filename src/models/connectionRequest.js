const mongoose = require("mongoose");

const connectionRequestSchema = new Schema({

    fromUserId:{
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    toUserId:{
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    status:{
        type: String,
        enum:{
            values: ["ignored","interested", "accepted", "rejected"],
            messaged: `${VALUE} is incorrect status type`
        }
    }

},{timestamps: true});


const ConnectionRequestModel = new mongoose("ConnectionRequestModel", connectionRequestSchema);

module.exports = ConnectionRequestModel;