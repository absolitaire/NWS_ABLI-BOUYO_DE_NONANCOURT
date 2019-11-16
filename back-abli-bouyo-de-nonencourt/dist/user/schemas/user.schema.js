"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
exports.UserSchema = new mongoose.Schema({
    login: {
        type: String,
        required: true,
        minlength: 3,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 3,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
    },
}, {
    toJSON: { virtuals: true },
    versionKey: false,
});
//# sourceMappingURL=user.schema.js.map