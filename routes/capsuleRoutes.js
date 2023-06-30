import express from "express";
import Capsule from "../models/capsule.js";
import Treatment from "../models/treatment.js";

const capsuleRoutes = express.Router();

capsuleRoutes.get("/", async (req, res) => {

    try {
        const events = await Capsule.find().exec();

        // Fetch all treatments from the database
        const treatments = await Treatment.find().exec();

        // Map events and attach treatment data
        const updatedEvents = events.map((event) => {
            const eventId = event._id;
            const eventData = event.toObject();
            const treatmentData = treatments.find(
                (treatment) => treatment._id.toString() === eventData.treatmentId.toString()
            );

            if (treatmentData) {
                return {
                    event_id: eventId,
                    completed: treatmentData.completed,
                    total: treatmentData.total,
                    ...eventData,
                };
            } else {
                return {
                    event_id: eventId,
                    completed: 0,
                    total: 0,
                    ...eventData,
                };
            }

        });
        res.status(200).json(events);
    } catch (err) {
        res.status(400).json(err);

    }

    }
);
// title: {type: String, required: true},
// color: {type: String, required: true},
// start: {type: Date, required: true},
// date: {type: String, required: true},
// client: {type: String, required: true},
// employee: {type: String, required: true},
// otherClients: {type: String, required: true},
// status: {type: String, required: true},
// freeOfCost: {type: Boolean, required: true},
// treatment: {type: String, required: true},
// end: {type: Date, required: true},
// deletable: {type: Boolean, required: true},
// clientName: {type: String, required: true},
// comment: {type: String, required: true},
// treatmentNumber: {type: Number, required: true},
// payment: {type: String, required: true},
// treatmentId: {type: String, required: true},
// }
capsuleRoutes.post("/", async (req, res) => {
    const capsule = new Capsule({
        title: req.body.title,
        color: req.body.color,
        start: req.body.start,
        date: req.body.date,
        client: req.body.client,
        employee: req.body.employee,
        otherClients: req.body.otherClients,
        status: req.body.status,
        freeOfCost: req.body.freeOfCost,
        treatment: req.body.treatment,
        end: req.body.end,
        deletable: req.body.deletable,
        clientName: req.body.clientName,
        comment: req.body.comment,
        treatmentNumber: req.body.treatmentNumber,
        payment: req.body.payment,
        treatmentId: req.body.treatmentId,
    });
    try {
        const data = await capsule.save();
        res.status(200).json(data);
    } catch (err) {
        res.status(400).json(err);

    }

}
);

capsuleRoutes.delete("/:id", async (req, res) => {
    try {
        const data = await Capsule.deleteOne({_id: req.params.id});
        res.status(200).json(data);
    } catch (err) {
        res.status(400).json(err);

    }

}
);

capsuleRoutes.put("/:id", async (req, res) => {

    try {
        const data = await Capsule.findByIdAndUpdate(req.params.id, {
            title: req.body.title,
            color: req.body.color,
            start: req.body.start,
            date: req.body.date,
            client: req.body.client,
            employee: req.body.employee,
            otherClients: req.body.otherClients,
            status: req.body.status,
            freeOfCost: req.body.freeOfCost,
            treatment: req.body.treatment,
            end: req.body.end,
            deletable: req.body.deletable,
            clientName: req.body.clientName,
            comment: req.body.comment,
            treatmentNumber: req.body.treatmentNumber,
            payment: req.body.payment,
            treatmentId: req.body.treatmentId,
        });
        res.status(200).json(data);
    } catch (err) {
        res.status(400).json(err);

    }
}
);
capsuleRoutes.get("/dateRange", async (req, res) => {
    try {
        const data = await Capsule.find({
            start: {
                $gte: req.body.start,
                $lt: req.body.end,
            },
        });
        res.status(200).json(data);
    } catch (err) {
        res.status(400).json(err);


    }
}
);

export default capsuleRoutes;