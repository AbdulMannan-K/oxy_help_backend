import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema({
        email: {type: String, required: true},
        firstName: {type: String, required: true},
        secondName: {type: String, required: true},
        password: {type: String, required: true},
        role: {type: String, required: true},
}
);

const Employee = mongoose.model('Employee', employeeSchema);

export default Employee;