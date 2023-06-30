import mongoose from "mongoose";

const treatmentSchema = new mongoose.Schema({
    total : {type: Number, required: true},
    completed : {type: Number, required: true},
    events : {type: Array, required: true},
    currentRegistered : {type: Number, required: true},
}
);

const Treatment = mongoose.model('Treatment', treatmentSchema);

export default Treatment;