import { model, Schema } from "mongoose";
import { Roles } from "../const/index.js";

const ClentSchema = new Schema ({
    email: {type: String,required: true},
    phoneNumber:{type: String,required: true},
    fullName: {type: String, required : true},
    hashedPassword:{type: String,required: true},
    userName: {type: String},
    role: { type: String, default: Roles.CLIENT },

},{ timeseries: true,versionKey: false ,
        virtuals: true,
    toObject: {
        virtuals: true
    },
    toJSON: {
        virtuals: true
    }
});

ClentSchema.virtual('orders', {
    ref: 'Order',
    localField: '_id',
    foreignField: 'clientId'
});




const Clent = model('Client', ClentSchema);
export default Clent