"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const mongoose_1 = require("mongoose");
exports.MessageSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true,
    },
    content: {
        type: String,
        maxlength: 99999,
        required: true,
    },
    idUser: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    idChannel: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Channel',
        required: true,
    },
}, {
    toJSON: { virtuals: true },
    versionKey: false,
});
//# sourceMappingURL=message.schema.js.map