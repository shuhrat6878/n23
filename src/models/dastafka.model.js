import { Schema, model } from "mongoose";

const DastafkaSchema = new Schema({
    adress: { type: String, required: true},
    orderId: { type: Schema.Types.ObjectId, ref: 'Order' },
    sallerId: { type: Schema.Types.ObjectId, ref: 'Saller' }
}, {
    timestamps: true,versionKey: false
    });


const Dastafka = model('Dastafka', DastafkaSchema);
export default Dastafka;
