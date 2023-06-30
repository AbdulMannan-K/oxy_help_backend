import mongoose from "mongoose";

const capsuleSchema = new mongoose.Schema({
    title: {type: String, required: true},
    color: {type: String, required: true},
    start: {type: Date, required: true},
    date: {type: String, required: true},
    client: {type: String, required: true},
    employee: {type: String, required: true},
    otherClients: {type: String, required: true},
    status: {type: String, required: true},
    freeOfCost: {type: Boolean, required: true},
    treatment: {type: String, required: true},
    end: {type: Date, required: true},
    deletable: {type: Boolean, required: true},
    clientName: {type: String, required: true},
    comment: {type: String, required: true},
    treatmentNumber: {type: Number, required: true},
    payment: {type: String, required: true},
    treatmentId: {type: String, required: true},
}
);

const Capsule = mongoose.model('Capsule', capsuleSchema);

export default Capsule;