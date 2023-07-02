import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    serialNumber: {type: Number, required: true},
    email: {type: String, required: true},
    phoneNumber: {type: String, required:true},
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    gender: {type: String, required: true},
    birthDay: {type: String, required: true},
    city: {type: String, required: true},
    country: {type: String, required: true},
    questionnaire: {type: Array, required: true},
    afterQues: {type: Array, required: true},
    beforeQues: {type: Array, required: true},
    history: {type: Array, required: true},
}
);

const User = mongoose.model('User', userSchema);

export default User;
