import express from "express";
import Capsule from "../models/capsule.js";
import Treatment from "../models/treatment.js";

const capsuleRoutes = express.Router();

capsuleRoutes.get("/", async (req, res) => {

    Capsule.find({}).then(data=>res.status(200).json(data)).catch(err=>res.status(400).json(err))

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
        event_id: req.body.event_id,
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
        clientId: req.body.clientId,
        deletable: req.body.deletable,
        clientName: req.body.clientName,
        treatmentId: req.body.treatmentId,
        comment: req.body.comment,
        treatmentNumber: req.body.treatmentNumber,
        payment: req.body.payment,
    });
    try {
        const data = await capsule.save();
        res.status(200).json(data);
    } catch (err) {
        console.log(err)
        res.status(400).json(err);

    }

}
);

capsuleRoutes.delete("/:id", async (req, res) => {
    console.log(req.params.id)
    try {
        const data = await Capsule.deleteOne({event_id: req.params.id});
        res.status(200).json(data);
    } catch (err) {
        res.status(400).json(err);

    }

}
);


capsuleRoutes.get("/:id",(req,res)=>{
    Capsule.findOne({event_id:req.params.id}).then(data=>res.status(200).json(data)).catch(err=>res.status(400).json(err))
})

capsuleRoutes.put("/:id", async (req, res) => {
    console.log(req.params.id)
    try {
        Capsule.findOneAndUpdate({event_id:req.params.id}, {
            event_id: req.body.event_id,
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
            clientId: req.body.clientId,
            comment: req.body.comment,
            treatmentNumber: req.body.treatmentNumber,
            payment: req.body.payment,
            treatmentId: req.body.treatmentId,
        }, {new: true}).then(data => {
            res.status(200).json(data)
        }).catch(err => res.status(400).json(err))
    } catch (err) {
        console.log(err)
        res.status(400).json(err);
    }
}
);
capsuleRoutes.post("/dateRange", async (req, res) => {
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