import { Schema, model } from "mongoose";


const AdminSchema = new Schema({
    username: {type: String,unique: true, required: true},
    email: {type: String, required: true,unique: true},
    hashedPassword: {type: String, required: true},
    isActive: {type: Boolean, default: true},
    role: {type: String, enum: ['SUPPERADMIN', 'ADMIN'],  default: "ADMIN"}
},{ timestamps: true,versionKey: false});

export default model('Admin', AdminSchema);