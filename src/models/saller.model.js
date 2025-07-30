import { Schema, model } from "mongoose";
import { Roles } from "../const/index.js";


const SallerSchema = new Schema({
    phoneNumber: {type: String,unique: true, required: true},
    fullName: {type: String, required: true},
    email: {type: String, required: true,required: true},
    hashedPassword: {type: String, required: true},
    image: {type: String},
    address: {type: String},
    isActive: {type: Boolean, default: true},
    role: {type: String, default: Roles.SALLER}
},{ timestamps: true,versionKey: false});

const Saller = model('Admin', SallerSchema);
export default Saller;