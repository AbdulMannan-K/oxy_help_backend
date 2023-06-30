import express from "express";
import Employee from "../models/employee.js";

const employeeRoutes = express.Router();

employeeRoutes.get("/", (req, res) => {

    Employee.find({}).then((employees) => {
        res.status(200).json(employees);
    }
    ).catch((err) => {
        res.status(400).json(err);

    }
    );

});

employeeRoutes.delete("/:id", (req, res) => {

        Employee.findByIdAndDelete(req.params.id).then((employee) => {
            res.status(200).json(employee);
        }
        ).catch((err) => {
            res.status(400).json(err);

        }
        );

}
);

employeeRoutes.post("/", (req, res) => {
    const employee = new Employee({
        email: req.body.email,
        firstName: req.body.firstName,
        secondName: req.body.secondName,
        password: req.body.password,
        role: req.body.role,
    });
    employee.save().then((data) => {
        res.status(200).json(data);
    }
    ).catch((err) => {
        res.status(400).json(err);

    }
    );
}
);

employeeRoutes.put("/:id", (req, res) => {
    Employee.findByIdAndUpdate(req.params.id, {
        email: req.body.email,
        firstName: req.body.firstName,
        secondName: req.body.secondName,
        password: req.body.password,
        role: req.body.role,
    }).then((data) => {
        res.status(200).json(data);
    }
    ).catch((err) => {
        res.status(400).json(err);
    }
    );
}
);

export default employeeRoutes;