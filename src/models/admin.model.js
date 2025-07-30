import { Schema, model } from "mongoose";
import { Roles } from "../const/index.js";


const AdminSchema = new Schema({
    username: {type: String,unique: true, required: true},
    email: {type: String, required: true,unique: true},
    hashedPassword: {type: String, required: true},
    isActive: {type: Boolean, default: true},
    role: {type: String, enum: [Roles.SUPPERADMIN, Roles.ADMIN],  default: Roles.ADMIN}
},{ timestamps: true,versionKey: false});

export default model('Admin', AdminSchema);