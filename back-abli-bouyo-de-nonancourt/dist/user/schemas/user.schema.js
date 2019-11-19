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
    firstname: {
        type: String,
        required: true,
        minlength: 2,
        trim: true,
    },
    lastname: {
        type: String,
        required: true,
        minlength: 2,
        trim: true,
    },
    phone: {
        type: String,
        required: true,
        match: /^(\+\d{11})$/,
    },
    address: {
        street: {
            type: String,
            required: true,
            trim: true,
        },
        postalCode: {
            type: Number,
            required: true,
        },
        city: {
            type: String,
            required: true,
            trim: true,
        },
    },
    picture: {
        type: String,
        required: true,
        minlength: 2,
        trim: true,
    },
}, {
    toJSON: { virtuals: true },
    versionKey: false,
});
//# sourceMappingURL=user.schema.js.map