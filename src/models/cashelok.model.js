import { Schema, model } from "mongoose";

const CashelokSchema = new Schema({
    cardNumber: { type: String, required: true},
    shot: { type: Number, required: true},
    clientId: { type: Schema.Types.ObjectId, ref: 'Client' },
    sallerId: { type: Schema.Types.ObjectId, ref: 'Saller' }
}, {
    timestamps: true,versionKey: false
    });


const Cashelok = model('Cashelok', CashelokSchema);
export default Cashelok;
